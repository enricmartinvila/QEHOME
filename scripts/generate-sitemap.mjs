import { writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const SITE_URL = "https://qehomemanresa.com"
const LANGS = ["ca", "es", "en"]
const LANDING_SLUGS = [
	"apartamento-parking-manresa",
	"alojamiento-umanresa",
	"que-ver-manresa",
	"alojamiento-camino-ignaciano-manresa",
	"visitar-montserrat-desde-manresa",
	"enoturismo-pla-de-bages",
	"apartamento-familias-manresa",
]

/** Keep in sync with src/constants/sitemap.ts */
const SITEMAP_LASTMOD = {
	home: "2026-09-09",
	"apartamento-parking-manresa": "2026-09-09",
	"alojamiento-umanresa": "2026-09-09",
	"que-ver-manresa": "2026-09-07",
	"alojamiento-camino-ignaciano-manresa": "2026-09-09",
	"visitar-montserrat-desde-manresa": "2026-09-07",
	"enoturismo-pla-de-bages": "2026-09-09",
	"apartamento-familias-manresa": "2026-09-05",
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const out = join(root, "public", "sitemap.xml")

function alternateLinks(pathAfterLang) {
	const suffix = pathAfterLang ? `${pathAfterLang}/` : ""
	return [
		...LANGS.map(
			(l) =>
				`    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}/${suffix}" />`,
		),
		`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/es/${suffix}" />`,
	].join("\n")
}

function urlEntry(lang, pathAfterLang, lastmod, priority) {
	const suffix = pathAfterLang ? `${pathAfterLang}/` : ""
	const loc = `${SITE_URL}/${lang}/${suffix}`
	return `  <url>
    <loc>${loc}</loc>
${alternateLinks(pathAfterLang)}
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`
}

const entries = []

for (const lang of LANGS) {
	entries.push(urlEntry(lang, "", SITEMAP_LASTMOD.home, "1.0"))
}

for (const slug of LANDING_SLUGS) {
	const lastmod = SITEMAP_LASTMOD[slug]
	for (const lang of LANGS) {
		entries.push(urlEntry(lang, slug, lastmod, "0.9"))
	}
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`

writeFileSync(out, xml)
console.log(`Wrote ${entries.length} URLs to public/sitemap.xml`)
