/** Editorial lastmod dates (YYYY-MM-DD). Update when content is actually reviewed. */
export const SITEMAP_LASTMOD = {
	home: "2026-09-09",
	"apartamento-parking-manresa": "2026-09-09",
	"alojamiento-umanresa": "2026-09-09",
	"que-ver-manresa": "2026-09-07",
	"alojamiento-camino-ignaciano-manresa": "2026-09-09",
	"visitar-montserrat-desde-manresa": "2026-09-07",
	"enoturismo-pla-de-bages": "2026-09-09",
	"apartamento-familias-manresa": "2026-09-05",
} as const

export type SitemapPageKey = keyof typeof SITEMAP_LASTMOD
