import { addDays, eachNight, nightsBetween, weekday } from "./dates"

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
}
export type QuoteError = "dates" | "past" | "lead" | "horizon" | "min_nights" | "max_nights" | "guests" | "price"

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
	return (weekend && s.weekend_price_cents) || s.base_price_cents || null
}
export const minNightsFor = (date: string, s: Settings, seasons: Season[]) => seasonFor(date, seasons)?.min_nights ?? s.min_nights

export function quote(
	i: { checkIn: string; checkOut: string; adults: number; children: number },
	s: Settings,
	seasons: Season[],
	today: string,
): { ok: true; quote: Quote } | { ok: false; error: QuoteError; n?: number } {
	const nights = nightsBetween(i.checkIn, i.checkOut)
	if (!(nights > 0)) return { ok: false, error: "dates" }
	if (i.checkIn < today) return { ok: false, error: "past" }
	if (i.checkIn < addDays(today, s.lead_days)) return { ok: false, error: "lead", n: s.lead_days }
	if (i.checkOut > addDays(today, s.horizon_days)) return { ok: false, error: "horizon" }
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
	const discountPct = nights >= 28 && s.monthly_discount_pct ? s.monthly_discount_pct : nights >= 7 ? s.weekly_discount_pct : 0
	const discount = Math.round((accommodation * discountPct) / 100)
	const extraGuests = Math.max(0, guests - (s.included_guests ?? s.max_guests)) * s.extra_guest_cents * nights
	const cleaning = s.cleaning_cents
	const taxRate = [...s.tax_rates].filter((r) => r.from <= i.checkIn).sort((a, b) => b.from.localeCompare(a.from))[0]?.cents ?? 0
	const taxNights = Math.min(nights, s.tax_max_nights)
	const tax = taxRate * taxNights * i.adults
	return {
		ok: true,
		quote: { nights, nightly, accommodation, discount, discountPct, extraGuests, cleaning, tax, taxNights, taxRate, total: accommodation - discount + extraGuests + cleaning + tax },
	}
}
