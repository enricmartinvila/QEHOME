import { addDays, eachNight, nightsBetween, weekday } from "./dates"
import type { Lang } from "../../constants/site"

/** Same calculation as the booking app, which checks the total again before accepting a request. */
export interface Settings {
	max_guests: number | null
	included_guests: number | null
	extra_guest_cents: number
	base_price_cents: number | null
	weekend_price_cents: number | null
	cleaning_cents: number
	weekly_discount_pct: number
	monthly_discount_pct: number
	min_nights: number
	max_nights: number
	lead_days: number
	horizon_days: number
	tax_rates: { from: string; cents: number }[]
	tax_max_nights: number
	no_arrival: number[]
	no_departure: number[]
	weekday_prices: (number | null)[]
	weekend_min_nights: number | null
	stay_discounts: { n: number; pct: number }[]
	last_minute: { n: number; pct: number }[]
	early_bird: { n: number; pct: number }[]
	extras: { id: string; name: Record<Lang, string>; cents: number; per: "stay" | "night" | "guest" | "guest_night"; max: number; active: boolean }[]
}

export interface Season {
	id?: number
	name: string
	start_date: string
	end_date: string
	price_cents: number
	weekend_price_cents: number | null
	min_nights: number | null
}
export interface Quote {
	nights: number
	nightly: { date: string; cents: number }[]
	accommodation: number
	discount: number
	discountPct: number
	extraGuests: number
	cleaning: number
	tax: number
	taxNights: number
	taxRate: number
	total: number
	coupon: string
	couponOff: number
	extras: { id: string; qty: number; cents: number; name: Record<Lang, string> }[]
	extrasTotal: number
}
export type QuoteError = "dates" | "past" | "lead" | "horizon" | "min_nights" | "max_nights" | "guests" | "price" | "no_arrival" | "no_departure"
/** Checked by the server; `code` is what the guest typed. */
export interface Coupon { code: string; pct: number; cents: number; from_date: string | null; to_date: string | null; min_nights: number | null }
export const couponFits = (c: Coupon, checkIn: string, nights: number) => (!c.from_date || checkIn >= c.from_date) && (!c.to_date || checkIn <= c.to_date) && nights >= (c.min_nights ?? 1)

/** When seasons overlap, the shortest one wins (a festival inside summer). */
export function seasonFor(date: string, seasons: Season[]) {
	return seasons
		.filter((s) => s.start_date <= date && date <= s.end_date)
		.sort((a, b) => nightsBetween(a.start_date, a.end_date) - nightsBetween(b.start_date, b.end_date) || b.start_date.localeCompare(a.start_date))[0]
}
export function nightPrice(date: string, s: Settings, seasons: Season[]): number | null {
	const season = seasonFor(date, seasons)
	const weekend = weekday(date) === 5 || weekday(date) === 6
	if (season) return (weekend && season.weekend_price_cents) || season.price_cents
	const day = s.weekday_prices[weekday(date)]
	if (day) return day
	return (weekend && s.weekend_price_cents) || s.base_price_cents || null
}
export const minNightsFor = (date: string, s: Settings, seasons: Season[]) => seasonFor(date, seasons)?.min_nights ?? (s.weekend_min_nights && [5, 6].includes(weekday(date)) ? s.weekend_min_nights : s.min_nights)

/** Discounts do not add up: the best one counts. */
export function discountFor(nights: number, daysAhead: number, s: Settings) {
	const best = (l: number[]) => Math.max(0, ...l)
	return best([
		nights >= 28 ? s.monthly_discount_pct : 0, nights >= 7 ? s.weekly_discount_pct : 0,
		...s.stay_discounts.filter((x) => nights >= x.n).map((x) => x.pct),
		...s.last_minute.filter((x) => daysAhead <= x.n).map((x) => x.pct),
		...s.early_bird.filter((x) => daysAhead >= x.n).map((x) => x.pct),
	])
}
export function quote(
	i: { checkIn: string; checkOut: string; adults: number; children: number; extras?: Record<string, number>; coupon?: Coupon | null },
	s: Settings,
	seasons: Season[],
	today: string,
): { ok: true; quote: Quote } | { ok: false; error: QuoteError; n?: number } {
	const nights = nightsBetween(i.checkIn, i.checkOut)
	if (!(nights > 0)) return { ok: false, error: "dates" }
	if (i.checkIn < today) return { ok: false, error: "past" }
	if (i.checkIn < addDays(today, s.lead_days)) return { ok: false, error: "lead", n: s.lead_days }
	if (i.checkOut > addDays(today, s.horizon_days)) return { ok: false, error: "horizon" }
	if (s.no_arrival.includes(weekday(i.checkIn))) return { ok: false, error: "no_arrival" }
	if (s.no_departure.includes(weekday(i.checkOut))) return { ok: false, error: "no_departure" }
	const min = minNightsFor(i.checkIn, s, seasons)
	if (nights < min) return { ok: false, error: "min_nights", n: min }
	if (nights > s.max_nights) return { ok: false, error: "max_nights", n: s.max_nights }
	const guests = i.adults + i.children
	if (!s.max_guests || i.adults < 1 || i.children < 0 || guests > s.max_guests) return { ok: false, error: "guests", n: s.max_guests ?? 0 }

	const nightly: Quote["nightly"] = []
	for (const date of eachNight(i.checkIn, i.checkOut)) {
		const cents = nightPrice(date, s, seasons)
		if (!cents) return { ok: false, error: "price" }
		nightly.push({ date, cents })
	}
	const accommodation = nightly.reduce((t, n) => t + n.cents, 0)
	const discountPct = discountFor(nights, nightsBetween(today, i.checkIn), s)
	const discount = Math.round((accommodation * discountPct) / 100)
	const extraGuests = Math.max(0, guests - (s.included_guests ?? s.max_guests)) * s.extra_guest_cents * nights
	const cleaning = s.cleaning_cents
	const extras: Quote["extras"] = []
	for (const x of s.extras) {
		const qty = Math.min(Math.max(0, Math.floor(i.extras?.[x.id] ?? 0)), x.max)
		if (!x.active || !qty) continue
		extras.push({ id: x.id, qty, name: x.name, cents: x.cents * qty * (x.per.includes("night") ? nights : 1) * (x.per.startsWith("guest") ? guests : 1) })
	}
	const extrasTotal = extras.reduce((t, x) => t + x.cents, 0)
	const c = i.coupon && couponFits(i.coupon, i.checkIn, nights) ? i.coupon : null
	const couponOff = c ? Math.min(accommodation - discount, c.pct ? Math.round(((accommodation - discount) * c.pct) / 100) : c.cents) : 0
	const taxRate = [...s.tax_rates].filter((r) => r.from <= i.checkIn).sort((a, b) => b.from.localeCompare(a.from))[0]?.cents ?? 0
	const taxNights = Math.min(nights, s.tax_max_nights)
	const tax = taxRate * taxNights * i.adults
	return {
		ok: true,
		quote: { nights, nightly, accommodation, discount, discountPct, extraGuests, cleaning, tax, taxNights, taxRate, coupon: c ? c.code : "", couponOff, extras, extrasTotal, total: accommodation - discount - couponOff + extraGuests + cleaning + extrasTotal + tax },
	}
}
