import ca from "../i18n/ca.json"
import es from "../i18n/es.json"
import en from "../i18n/en.json"
import type { Lang } from "./site"

const catalogs = { ca, es, en } as const

export type { Lang }

export function getTranslations(lang: Lang) {
	return catalogs[lang] ?? catalogs.es
}

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
