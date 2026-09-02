import { SITE_URL } from "./site"

const lodgingBase = {
	"@context": "https://schema.org",
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

export function lodgingJsonLd(langPath: string, description: string) {
	return {
		...lodgingBase,
		url: `${SITE_URL}${langPath}`,
		amenityFeature: [
			{ "@type": "LocationFeatureSpecification", name: "Parking privado" },
			{ "@type": "LocationFeatureSpecification", name: "Cargador eléctrico" },
			{ "@type": "LocationFeatureSpecification", name: "WiFi" },
			{ "@type": "LocationFeatureSpecification", name: "Cocina equipada" },
		],
		description,
	}
}

export function parkingLodgingJsonLd(langPath: string, description: string) {
	return {
		...lodgingBase,
		url: `${SITE_URL}${langPath}`,
		amenityFeature: [
			{ "@type": "LocationFeatureSpecification", name: "Parking privado" },
			{ "@type": "LocationFeatureSpecification", name: "Cargador eléctrico" },
		],
		description,
	}
}
