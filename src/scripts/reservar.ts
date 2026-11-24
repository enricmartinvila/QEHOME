import { addDays, eachNight, fmtDate, fmtRange, money, weekday } from "../lib/booking/dates"
import { minNightsFor, nightPrice, quote, type Quote, type Season, type Settings } from "../lib/booking/pricing"

interface Data {
	enabled: boolean; mode: "test" | "live"; today: string; seasons: Season[]; settings: Settings; busy: [string, string][]
	registration: string; requestHours: number; freeCancelDays: number | null; stripe: boolean; cancellation: string[]
}
const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T
/** The bar is on the home and on the booking page; `page` only exists on the latter. */
const bar = $<HTMLFormElement>("fechas"), dlg = $<HTMLDialogElement>("bk-dlg"), page = document.getElementById("rv")
const api = bar.dataset.api!, lang = bar.dataset.lang as "es" | "ca" | "en"
const t = JSON.parse($("rvt").textContent!)
const loc = { es: "es-ES", ca: "ca-ES", en: "en-GB" }[lang]
const el = <K extends keyof HTMLElementTagNameMap>(tag: K, cls = "", text = "") => { const x = document.createElement(tag); if (cls) x.className = cls; if (text) x.textContent = text; return x }
const euros = (cents: number) => new Intl.NumberFormat(loc, { style: "currency", currency: "EUR", minimumFractionDigits: cents % 100 ? 2 : 0 }).format(cents / 100)
const count = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`
const nightsText = (n: number) => count(n, t.night, t.nights)
const shortDate = (d: string, wd = false) => new Intl.DateTimeFormat(loc, { timeZone: "UTC", weekday: wd ? "short" : undefined, day: "numeric", month: "short" }).format(new Date(d + "T00:00:00Z"))
const addMonth = (m: string, n: number) => { const d = new Date(m + "-01T00:00:00Z"); d.setUTCMonth(d.getUTCMonth() + n); return d.toISOString().slice(0, 7) }

let D: Data, S: Settings, taken = new Set<string>(), first = "", last = "", month = ""
let from: string | null = null, to: string | null = null, current: Quote | null = null

const free = (n: string) => n >= first && n < last && !taken.has(n) && !!nightPrice(n, S, D.seasons)
/** Furthest departure for an arrival: up to the first taken night. */
const limit = (a: string) => { let d = a; while (free(d) && d < addDays(a, S.max_nights)) d = addDays(d, 1); return d }
const minOut = (a: string) => addDays(a, minNightsFor(a, S, D.seasons))
const fits = (a: string) => free(a) && limit(a) >= minOut(a)
const adults = () => Number($<HTMLSelectElement>("adults").value), children = () => Number($<HTMLSelectElement>("children").value)

async function load(): Promise<Data> {
	const r = await fetch(`${api}/api/booking?property=qehome&lang=${lang}`, { signal: AbortSignal.timeout(20_000) })
	if (!r.ok) throw new Error(String(r.status))
	return r.json()
}
function use(data: Data) {
	D = data; S = D.settings
	taken = new Set(D.busy.flatMap(([a, b]) => eachNight(a, b)))
	first = addDays(D.today, S.lead_days); last = addDays(D.today, S.horizon_days)
}
function state(x: string) { dlg.dataset.state = x; if (page) page.dataset.state = x }
function block(title: string, text: string, retry = false) {
	state("blocked")
	for (const box of document.querySelectorAll(".rv-msg")) {
		box.replaceChildren(el("b", "", title), el("p", "", text))
		if (retry) { const b = el("button", "btn btn-amber mt-3", t.retry); b.type = "button"; b.onclick = () => { state("loading"); started = undefined; init() }; box.append(b) }
		box.append($<HTMLTemplateElement>("bk-help").content.cloneNode(true))
	}
}

let started: Promise<void> | undefined
const init = () => (started ??= start())
async function start() {
	let data: Data
	try { data = await load() } catch (e) { console.error(e); return block(t.downTitle, t.downText, true) }
	if (page && data.mode === "test") { $("test").textContent = t.test; $("test").hidden = false }
	if (!data.enabled) return block(t.closedTitle, t.closedText)
	use(data)
	const max = S.max_guests ?? 1, q = new URLSearchParams(location.search)
	const n = (k: string, def: number) => { const v = Number(q.get(k) ?? def); return Number.isInteger(v) && v >= 0 ? v : def }
	const a = Math.min(Math.max(1, n("adults", Math.min(2, max))), max)
	options($("adults"), 1, max, a); options($("children"), 0, max - a, Math.min(n("children", 0), max - a))
	const iso = (k: string) => (/^\d{4}-\d{2}-\d{2}$/.test(q.get(k) ?? "") ? q.get(k)! : "")
	month = first.slice(0, 7)
	if (iso("in") && fits(iso("in"))) { from = iso("in"); month = from.slice(0, 7); const o = iso("out"); if (o && o >= minOut(from) && o <= limit(from)) to = o }
	state("open"); facts(); draw(); price()
}
function options(sel: HTMLElement, a: number, b: number, value: number) {
	sel.replaceChildren(...Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => { const o = el("option", "", String(a + i)); o.value = String(a + i); return o }))
	;(sel as HTMLSelectElement).value = String(Math.min(Math.max(value, a), b))
}
function facts() {
	$("minstay").textContent = `${t.perNight}. ${t.minStay.replace("{n}", nightsText(S.min_nights))} ${t.maxGuests.replace("{n}", String(S.max_guests))}`
	if (!page) return
	for (const ul of document.querySelectorAll("[data-trust]")) {
		const items = [t.trustReview.replace("{n}", String(D.requestHours))]
		if (D.freeCancelDays != null) items.push(t.trustCancel.replace("{n}", String(D.freeCancelDays)))
		if (D.stripe) items.push(t.trustStripe)
		ul.replaceChildren(...items.map((x) => el("li", "", x)))
	}
	$("cancel").replaceChildren(...D.cancellation.map((x) => el("li", "", x)))
	$("cancelBox").hidden = D.cancellation.length === 0
	$("reg").hidden = !D.registration
	$("reg").querySelector("span")!.textContent = D.registration
}

function draw(focus?: string) {
	const picking = !!from && !to, max = picking ? limit(from!) : "", min = picking ? minOut(from!) : ""
	$("months").replaceChildren(...[0, 1].map((i) => {
		const m = addMonth(month, i), box = el("div", i ? "second" : "")
		const name = new Intl.DateTimeFormat(loc, { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(m + "-01T00:00:00Z"))
		box.append(el("div", "rv-mname", name[0].toUpperCase() + name.slice(1)))
		const grid = el("div", "rv-grid")
		for (let k = 0; k < 7; k++) grid.append(el("span", "wd", new Intl.DateTimeFormat(loc, { weekday: "narrow", timeZone: "UTC" }).format(new Date(Date.UTC(2024, 0, 1 + k)))))
		for (let k = 0; k < (weekday(m + "-01") + 6) % 7; k++) grid.append(el("span"))
		for (let d = m + "-01"; d.startsWith(m); d = addDays(d, 1)) {
			const b = el("button", "day")
			b.type = "button"; b.dataset.d = d
			b.append(el("b", "", String(Number(d.slice(8)))))
			const asOut = picking && d >= min && d <= max
			// While choosing the departure, too-short stays are not clickable.
			const ok = asOut || d === from || (fits(d) && !(picking && d > from! && d < min))
			const edge = d === from || d === to, busy = d >= D.today && taken.has(d), cents = nightPrice(d, S, D.seasons)
			b.disabled = !ok
			if (busy && !edge && !asOut) { b.classList.add("occ"); b.append(el("small", "", t.takenDay)) }
			else if (!free(d) && !edge && !asOut) b.classList.add("past")
			else if (cents && free(d)) b.append(el("small", "", euros(cents)))
			b.classList.toggle("sel", edge); b.classList.toggle("mid", !!(from && to && d > from && d < to)); b.classList.toggle("off", !ok && free(d))
			b.setAttribute("aria-pressed", String(edge))
			b.setAttribute("aria-label", [fmtDate(d, lang), cents && free(d) ? `${euros(cents)} ${t.fromAfter}` : "", d === from ? t.arrival : d === to ? t.departure : "", !ok && !edge ? (busy ? t.takenDay : t.unavailable) : ""].filter(Boolean).join(", "))
			b.onclick = () => pick(d, asOut)
			grid.append(b)
		}
		box.append(grid)
		return box
	}))
	$<HTMLButtonElement>("prev").disabled = month <= first.slice(0, 7)
	$<HTMLButtonElement>("next").disabled = month >= last.slice(0, 7)
	$("status").textContent = from && to ? `${t.arrival} ${shortDate(from)} · ${t.departure} ${shortDate(to)} · ${nightsText(eachNight(from, to).length)}` : from ? t.pickOut : t.pickIn
	$("clear").hidden = !from
	if (focus) document.querySelector<HTMLElement>(`[data-d="${focus}"]`)?.focus()
}
function pick(d: string, asOut: boolean) {
	$("dateError").textContent = ""
	if (from && !to && d === from) from = null
	else if (asOut) to = d
	else { from = d; to = null }
	draw(d); price()
}
function price() {
	current = null
	let message = t.empty, bad = false, lines: [string, string, number][] = []
	if (from && to) {
		const r = quote({ checkIn: from, checkOut: to, adults: adults(), children: children() }, S, D.seasons, D.today)
		if (!r.ok) { message = t.err[r.error] ?? t.err.generic; bad = true }
		else {
			const q = (current = r.quote), same = q.nightly.every((n) => n.cents === q.nightly[0].cents)
			lines.push([same ? `${nightsText(q.nights)} × ${euros(q.nightly[0].cents)}` : `${t.accommodation} · ${nightsText(q.nights)}`, "", q.accommodation])
			if (q.discount) lines.push([`${t.discount} (${q.discountPct} %)`, "", -q.discount])
			if (q.extraGuests) lines.push([t.extra, "", q.extraGuests])
			if (q.cleaning) lines.push([t.cleaning, "", q.cleaning])
			if (q.tax) lines.push([t.tax, `${count(adults(), t.adult, t.adults)} × ${nightsText(q.taxNights)} × ${euros(q.taxRate)}`, q.tax])
		}
	}
	for (const box of document.querySelectorAll("[data-sum]")) {
		if (!current) { box.replaceChildren(el("p", bad ? "rv-bad" : "rv-empty", message)); continue }
		const dl = el("dl"), tot = el("dl", "tot")
		for (const [k, sub, c] of lines) { const dt = el("dt", "", k); if (sub) dt.append(el("small", "", sub)); dl.append(dt, el("dd", "", money(c, lang))) }
		tot.append(el("dt", "", t.total), el("dd", "", money(current.total, lang)))
		box.replaceChildren(el("p", "when", `${fmtRange(from!, to!, lang)} · ${nightsText(current.nights)} · ${peopleText()}`), dl, tot, el("p", "fin", t.final))
	}
	const people = peopleText(), total = current ? money(current.total, lang) : ""
	const set = (id: string, d: string | null) => ($(id).textContent = d ? shortDate(d, true) : $(id).dataset.empty!)
	set("bk-in", from); set("bk-out", to)
	$("bk-guests").textContent = people
	$("bk-sum").textContent = current ? `${t.total} · ${nightsText(current.nights)}` : bad ? message : from ? t.pickOut : t.pickIn
	$("bk-price").textContent = total
	if (!page) { $("bk-total").hidden = !current; $("bk-total").textContent = current ? `${nightsText(current.nights)} · ${t.total} ${total}` : ""; return }
	$("mtext").textContent = current ? `${t.total} · ${nightsText(current.nights)}` : t.pickIn
	$("mtotal").textContent = total
	$("mgo").textContent = current ? $("mgo").dataset.full! : $("mgo").dataset.empty!
	// Keep the address in step, so a reload or another language keeps the choice.
	const url = new URL(location.href)
	for (const [k, v] of Object.entries(params())) v ? url.searchParams.set(k, v) : url.searchParams.delete(k)
	history.replaceState(null, "", url)
	for (const a of document.querySelectorAll<HTMLAnchorElement>("header nav a[hreflang]")) a.search = url.search
}
const params = () => ({ in: from ?? "", out: to ?? "", adults: String(adults()), children: String(children()) })
const peopleText = () => [count(adults(), t.adult, t.adults), children() ? count(children(), t.child, t.children) : ""].filter(Boolean).join(", ")

function open(focusGuests = false) {
	if (!dlg.open) dlg.showModal()
	init().then(() => { if (focusGuests && dlg.dataset.state === "open") { $("adults").scrollIntoView({ block: "nearest" }); $("adults").focus() } })
}
for (const b of bar.querySelectorAll<HTMLElement>("[data-open]")) b.onclick = () => open(b.dataset.open === "guests")
for (const b of dlg.querySelectorAll<HTMLElement>("[data-close]")) b.onclick = () => dlg.close()
dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close() })
bar.onsubmit = (e) => {
	e.preventDefault()
	if (current) location.href = `${bar.action}?${new URLSearchParams(params())}`
	else open()
}
$("prev").onclick = () => { month = addMonth(month, -1); draw() }
$("next").onclick = () => { month = addMonth(month, 1); draw() }
$("clear").onclick = () => { from = to = null; draw(); price() }
$("adults").onchange = () => { options($("children"), 0, (S.max_guests ?? 1) - adults(), children()); price() }
$("children").onchange = price

if (page) {
$("mgo").onclick = () => { if (current) $("datos").scrollIntoView(); else open() }
const FIELDS = ["name", "phone", "email", "message", "terms"]
function mark(ids: string[]) {
	for (const id of FIELDS) { const bad = ids.includes(id); $(id).toggleAttribute("aria-invalid", false); if (bad) $(id).setAttribute("aria-invalid", "true"); $("e-" + id).textContent = bad ? t.fields[id] : "" }
	const firstBad = FIELDS.find((x) => ids.includes(x))
	if (firstBad) $(firstBad).focus()
}
for (const id of FIELDS) $(id).addEventListener("input", () => { $(id).removeAttribute("aria-invalid"); $("e-" + id).textContent = "" })

$<HTMLFormElement>("rvf").onsubmit = async (e) => {
	e.preventDefault()
	if (page!.dataset.state !== "open") return
	const err = $("error"), btn = $<HTMLButtonElement>("send")
	err.textContent = ""
	if (!from || !to || !current) { $("dateError").textContent = t.err[from && to ? "guests" : "dates"]; open(); return }
	const v = (id: string) => $<HTMLInputElement>(id).value.trim()
	const bad = ["name", "email", "phone", "terms"].filter((id) => !$<HTMLInputElement>(id).checkValidity())
	if (!v("name")) bad.push("name")
	if (v("phone") && !/^\+?[\d\s().-]{7,25}$/.test(v("phone"))) bad.push("phone")
	mark(bad)
	if (bad.length) { err.textContent = t.err.form; return }
	btn.disabled = true; btn.textContent = t.sending
	try {
		const r = await fetch(`${api}/api/requests`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ property: "qehome", lang, checkIn: from, checkOut: to, adults: adults(), children: children(), name: v("name"), email: v("email"), phone: v("phone"), message: v("message"), website: v("website"), terms: true, expectedTotal: current.total }) })
		const j = await r.json()
		if (r.ok) { location.href = new URL(j.url, api).href; return }
		if (j.fields) mark(j.fields)
		err.textContent = t.err[j.error] ?? t.err.generic
		if (["taken", "price_changed", "closed"].includes(j.error)) {
			const next = await load()
			if (!next.enabled) block(t.closedTitle, t.closedText)
			else {
				use(next)
				if (j.error === "taken") { from = to = null; err.textContent = ""; $("dateError").textContent = t.err.taken; open() }
				facts(); draw(); price()
			}
		}
	} catch { err.textContent ||= t.err.generic }
	btn.disabled = false; btn.textContent = t.send
}
// Coming back with the browser's Back button after sending.
addEventListener("pageshow", (e) => { if (e.persisted) location.reload() })
init()
}
