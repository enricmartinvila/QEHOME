export const SITE_URL = "https://qehomemanresa.com"

export const LANGS = ["ca", "es", "en"] as const
export type Lang = (typeof LANGS)[number]
export const DEFAULT_LANG = "es" as const

export const HTML_LANG: Record<Lang, string> = {
	ca: "ca",
	es: "es",
	en: "en",
}

export const OG_LOCALE: Record<Lang, string> = {
	ca: "ca_ES",
	es: "es_ES",
	en: "en_GB",
}

export const LANDING_SLUGS = [
	"apartamento-parking-manresa",
	"alojamiento-umanresa",
	"que-ver-manresa",
	"alojamiento-camino-ignaciano-manresa",
	"visitar-montserrat-desde-manresa",
	"enoturismo-pla-de-bages",
] as const

export function localizedPath(lang: Lang, pathAfterLang = "") {
	const suffix = pathAfterLang.replace(/^\//, "")
	if (!suffix) return `/${lang}/`
	return `/${lang}/${suffix.endsWith("/") ? suffix : `${suffix}/`}`
}

export function absoluteUrl(lang: Lang, pathAfterLang = "") {
	return `${SITE_URL}${localizedPath(lang, pathAfterLang)}`
}

export function switchLangPath(pathname: string, newLang: Lang) {
	const match = pathname.match(/^\/(ca|es|en)(\/.*)?$/)
	if (!match) return localizedPath(newLang)
	const rest = match[2] || "/"
	return `/${newLang}${rest.endsWith("/") ? rest : `${rest}/`}`
}
