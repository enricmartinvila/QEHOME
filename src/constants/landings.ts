export const PARKING_LANDING = {
	key: "parking",
	slug: "apartamento-parking-manresa",
	heroImage: "/images/menjador12.webp",
	/** Add real photos to public/images/ then set these paths */
	parkingImage: null as string | null,
	evImage: null as string | null,
	pageKey: "parkingPage",
	seoKey: "parking",
} as const

export const TOPIC_LANDINGS_CONFIG = [
	{
		key: "umanresa",
		slug: "alojamiento-umanresa",
		heroImage: "/images/hab2.webp",
		pageKey: "umanresaPage",
		seoKey: "umanresa",
	},
	{
		key: "camino",
		slug: "alojamiento-camino-ignaciano-manresa",
		heroImage: "/images/hab3.webp",
		pageKey: "caminoPage",
		seoKey: "camino",
	},
	{
		key: "queVer",
		slug: "que-ver-manresa",
		heroImage: "/images/menjador11.webp",
		pageKey: "queVerPage",
		seoKey: "queVer",
	},
	{
		key: "montserrat",
		slug: "visitar-montserrat-desde-manresa",
		heroImage: "/images/menjador12.webp",
		pageKey: "montserratPage",
		seoKey: "montserrat",
	},
	{
		key: "enoturismo",
		slug: "enoturismo-pla-de-bages",
		heroImage: "/images/cuina2.webp",
		pageKey: "enoturismoPage",
		seoKey: "enoturismo",
	},
] as const

export type TopicLandingKey = (typeof TOPIC_LANDINGS_CONFIG)[number]["key"]

/** @deprecated Use TOPIC_LANDINGS_CONFIG */
export const TRANSACTIONAL_TOPIC_LANDINGS = TOPIC_LANDINGS_CONFIG.filter(
	(l) => l.key === "umanresa" || l.key === "camino",
)

export type TransactionalTopicKey = "umanresa" | "camino"

export function getTopicLanding(key: TopicLandingKey) {
	return TOPIC_LANDINGS_CONFIG.find((l) => l.key === key)
}

export function getTransactionalTopic(key: TransactionalTopicKey) {
	return getTopicLanding(key)
}

export const ALL_INDEXABLE_SLUGS = [
	PARKING_LANDING.slug,
	...TOPIC_LANDINGS_CONFIG.map((l) => l.slug),
] as const
