/** Editorial lastmod dates (YYYY-MM-DD). Update when content is actually reviewed. */
export const SITEMAP_LASTMOD = {
	home: "2026-11-23",
	"apartamento-parking-manresa": "2026-11-23",
	"alojamiento-umanresa": "2026-11-23",
	"que-ver-manresa": "2026-11-23",
	"alojamiento-camino-ignaciano-manresa": "2026-11-23",
	"visitar-montserrat-desde-manresa": "2026-11-23",
	"enoturismo-pla-de-bages": "2026-11-23",
	"apartamento-familias-manresa": "2026-11-23",
	"alojamiento-hospital-manresa": "2026-11-23",
	"apartamento-trabajo-manresa": "2026-11-23",
	"visitar-cardona-desde-manresa": "2026-11-23",
} as const

export type SitemapPageKey = keyof typeof SITEMAP_LASTMOD
