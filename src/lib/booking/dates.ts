/** Calendar dates are plain YYYY-MM-DD strings; nights are half-open [check_in, check_out). */
export const isDate = (s: unknown): s is string =>
	typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s)) && new Date(s + "T00:00:00Z").toISOString().slice(0, 10) === s
export const addDays = (d: string, n: number) => new Date(Date.parse(d + "T00:00:00Z") + n * 86400000).toISOString().slice(0, 10)
export const nightsBetween = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000)
export const eachNight = (a: string, b: string) => Array.from({ length: Math.max(0, nightsBetween(a, b)) }, (_, i) => addDays(a, i))
export const weekday = (d: string) => new Date(d + "T00:00:00Z").getUTCDay()
export const overlaps = (a1: string, a2: string, b1: string, b2: string) => a1 < b2 && b1 < a2
export const today = (now = new Date()) =>
	new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid", year: "numeric", month: "2-digit", day: "2-digit" }).format(now)
const LOC: Record<string, string> = { es: "es-ES", ca: "ca-ES", en: "en-GB" }
export const fmtDate = (d: string, lang = "es", long = true) =>
	new Intl.DateTimeFormat(LOC[lang], { timeZone: "UTC", weekday: long ? "short" : undefined, day: "numeric", month: long ? "long" : "short", year: "numeric" }).format(new Date(d + "T00:00:00Z"))
export const fmtTime = (d: Date | string, lang = "es") =>
	new Intl.DateTimeFormat(LOC[lang], { timeZone: "Europe/Madrid", dateStyle: "medium", timeStyle: "short" }).format(new Date(d))
export const money = (cents: number, lang = "es") =>
	new Intl.NumberFormat(LOC[lang], { style: "currency", currency: "EUR" }).format(cents / 100)
export const fmtRange = (a: string, b: string, lang = "es") =>
	new Intl.DateTimeFormat(LOC[lang], { timeZone: "UTC", day: "numeric", month: "short", year: "numeric" }).formatRange(new Date(a + "T00:00:00Z"), new Date(b + "T00:00:00Z"))
