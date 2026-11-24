import ca from "../i18n/ca.json"
import es from "../i18n/es.json"
import en from "../i18n/en.json"
import { DIRECT_BOOKING } from "./links"
import type { Lang } from "./site"

// Copy that only applies once direct booking is switched on.
const directCopy: Record<Lang, [string, string][]> = {
	es: [
		["9,7 en Booking y 4,92 en Airbnb. Elige tu plataforma.", "9,7 en Booking. Reserva aquí o en Booking."],
		["desde los enlaces oficiales de QEhome en Booking y Airbnb", "en esta web o en Booking"],
		["en Booking o Airbnb", "en esta web o en Booking"],
	],
	ca: [
		["9,7 a Booking i 4,92 a Airbnb. Tria la teva plataforma.", "9,7 a Booking. Reserva aquí o a Booking."],
		["des dels enllaços oficials de QEhome a Booking i Airbnb", "en aquest web o a Booking"],
		["a Booking o Airbnb", "en aquest web o a Booking"],
	],
	en: [
		["9.7 on Booking and 4.92 on Airbnb. Choose your platform.", "9.7 on Booking. Book here or on Booking."],
		["through QEhome's official Booking and Airbnb links", "on this website or on Booking"],
		["on Booking or Airbnb", "on this website or on Booking"],
	],
}
function withDirect<T>(catalog: T, lang: Lang): T {
	if (!DIRECT_BOOKING) return catalog
	let text = JSON.stringify(catalog)
	for (const [from, to] of directCopy[lang]) text = text.replaceAll(from, to)
	return JSON.parse(text)
}

const catalogs = { ca: withDirect(ca, "ca"), es: withDirect(es, "es"), en: withDirect(en, "en") } as const

export type { Lang }

export function getTranslations(lang: Lang) {
	return catalogs[lang] ?? catalogs.es
}

export const directBookingLabel = { ca: "Reservar directament", es: "Reservar directamente", en: "Book direct" } as const

export const uiChrome = {
	ca: {
		langLabel: "Idioma",
		scrollExplore: "Explorar",
		scrollTop: "Tornar amunt",
	},
	es: {
		langLabel: "Idioma",
		scrollExplore: "Explorar",
		scrollTop: "Volver arriba",
	},
	en: {
		langLabel: "Language",
		scrollExplore: "Explore",
		scrollTop: "Back to top",
	},
} as const
