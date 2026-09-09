import { SITE_URL, type Lang } from "./site"

const lodgingBase = {
	"@type": "LodgingBusiness",
	name: "QEhome Manresa",
	telephone: "+34 640 95 55 72",
	address: {
		"@type": "PostalAddress",
		streetAddress: "Carrer Doctor Esteve 9, 1º 2ª",
		addressLocality: "Manresa",
		addressRegion: "Catalunya",
		postalCode: "08241",
		addressCountry: "ES",
	},
	aggregateRating: {
		"@type": "AggregateRating",
		ratingValue: "9.7",
		bestRating: "10",
		ratingCount: "50",
	},
	checkinTime: "15:00",
	checkoutTime: "11:00",
	petsAllowed: false,
	priceRange: "€€",
}

const AMENITIES = {
	parking: {
		es: "Parking privado",
		ca: "Pàrquing privat",
		en: "Private parking",
	},
	charger: {
		es: "Cargador eléctrico",
		ca: "Carregador elèctric",
		en: "Electric car charger",
	},
	wifi: {
		es: "WiFi",
		ca: "WiFi",
		en: "WiFi",
	},
	kitchen: {
		es: "Cocina equipada",
		ca: "Cuina equipada",
		en: "Equipped kitchen",
	},
} as const

function amenity(name: string) {
	return { "@type": "LocationFeatureSpecification", name }
}

export function lodgingJsonLd(
	langPath: string,
	description: string,
	lang: Lang = "es",
	image?: string,
) {
	return {
		"@context": "https://schema.org",
		...lodgingBase,
		url: `${SITE_URL}${langPath}`,
		description,
		...(image ? { image: image.startsWith("http") ? image : `${SITE_URL}${image}` } : {}),
		amenityFeature: [
			amenity(AMENITIES.parking[lang]),
			amenity(AMENITIES.charger[lang]),
			amenity(AMENITIES.wifi[lang]),
			amenity(AMENITIES.kitchen[lang]),
		],
	}
}

export function parkingLodgingJsonLd(
	langPath: string,
	description: string,
	lang: Lang = "es",
	image?: string,
) {
	return {
		"@context": "https://schema.org",
		...lodgingBase,
		url: `${SITE_URL}${langPath}`,
		description,
		...(image ? { image: image.startsWith("http") ? image : `${SITE_URL}${image}` } : {}),
		amenityFeature: [
			amenity(AMENITIES.parking[lang]),
			amenity(AMENITIES.charger[lang]),
		],
	}
}

export function guideArticleJsonLd(opts: {
	langPath: string
	headline: string
	description: string
	image: string
	dateModified: string
	datePublished?: string
}) {
	const url = `${SITE_URL}${opts.langPath}`
	const image = opts.image.startsWith("http")
		? opts.image
		: `${SITE_URL}${opts.image}`

	return {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: opts.headline,
		description: opts.description,
		image,
		dateModified: opts.dateModified,
		datePublished: opts.datePublished || opts.dateModified,
		author: {
			"@type": "Organization",
			name: "QEhome Manresa",
			url: SITE_URL,
		},
		publisher: {
			"@type": "Organization",
			name: "QEhome Manresa",
			url: SITE_URL,
			logo: {
				"@type": "ImageObject",
				url: `${SITE_URL}/logo/logosintexto.webp`,
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": url,
		},
	}
}

export function breadcrumbListJsonLd(
	items: Array<{ name: string; path: string }>,
) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: item.path.startsWith("http")
				? item.path
				: `${SITE_URL}${item.path}`,
		})),
	}
}

/** Combine multiple JSON-LD objects into one @graph payload */
export function schemaGraph(
	...nodes: Array<Record<string, unknown> | null | undefined>
) {
	const graph = nodes
		.filter((n): n is Record<string, unknown> => Boolean(n))
		.map(({ ["@context"]: _c, ...rest }) => rest)

	return {
		"@context": "https://schema.org",
		"@graph": graph,
	}
}
