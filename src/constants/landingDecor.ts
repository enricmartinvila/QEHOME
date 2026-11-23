import type { IconName } from "../components/landing/icons"

export type IllustrationVariant = "montserrat" | "vineyard" | "city" | "cardona"

export interface SectionDecor {
	icon: IconName
	/** Apartment photo shown as a banner at the top of the section */
	image?: string
	imageAltKey?: "menjador12" | "menjador11" | "hab2" | "hab3" | "cuina2" | "lavabo1"
	/** "timeline" renders subsections (or labelled items) as consecutive steps */
	variant?: "timeline"
}

export interface LandingDecor {
	/** Guides use an illustrated hero instead of an apartment photo */
	illustration?: IllustrationVariant
	keyFactIcons?: IconName[]
	/** Show the "where is QEhome" card (lodging landings) */
	location?: boolean
	/** Positional: same section order in every language */
	sections: SectionDecor[]
}

const photo = (id: NonNullable<SectionDecor["imageAltKey"]>) => ({
	image: `/images/${id}.webp`,
	imageAltKey: id,
})

export const LANDING_DECOR: Record<string, LandingDecor> = {
	parking: {
		keyFactIcons: ["car", "key", "bolt", "pin"],
		sections: [
			{ icon: "key" },
			{ icon: "pin" },
			{ icon: "map" },
			{ icon: "bolt" },
			{ icon: "mountain" },
		],
	},
	umanresa: {
		location: true,
		keyFactIcons: ["academic", "train", "key", "car"],
		sections: [
			{ icon: "users" },
			{ icon: "clock" },
			{ icon: "train" },
			{ icon: "calendar" },
			{ icon: "home", ...photo("hab3") },
			{ icon: "briefcase", ...photo("menjador11") },
			{ icon: "map" },
		],
	},
	camino: {
		location: true,
		keyFactIcons: ["route", "landmark", "sparkles", "key"],
		sections: [
			{ icon: "landmark" },
			{ icon: "map" },
			{ icon: "mountain" },
			{ icon: "pin" },
			{ icon: "bed", ...photo("hab2") },
			{ icon: "clock" },
			{ icon: "train" },
			{ icon: "car" },
			{ icon: "sun" },
		],
	},
	queVer: {
		illustration: "city",
		keyFactIcons: ["landmark", "calendar", "pin", "sparkles"],
		sections: [
			{ icon: "landmark" },
			{ icon: "clock" },
			{ icon: "sun", variant: "timeline" },
			{ icon: "calendar" },
			{ icon: "smile" },
			{ icon: "sparkles" },
			{ icon: "music" },
			{ icon: "bulb" },
		],
	},
	montserrat: {
		illustration: "montserrat",
		keyFactIcons: ["car", "train", "landmark", "clock"],
		sections: [
			{ icon: "mountain" },
			{ icon: "car" },
			{ icon: "train" },
			{ icon: "landmark" },
			{ icon: "clock" },
			{ icon: "sun", variant: "timeline" },
			{ icon: "info" },
			{ icon: "smile" },
			{ icon: "route" },
		],
	},
	enoturismo: {
		illustration: "vineyard",
		keyFactIcons: ["wine", "sparkles", "car", "calendar"],
		sections: [
			{ icon: "home" },
			{ icon: "wine" },
			{ icon: "landmark" },
			{ icon: "pin" },
			{ icon: "calendar", variant: "timeline" },
			{ icon: "clock" },
			{ icon: "key", ...photo("cuina2") },
			{ icon: "sun" },
			{ icon: "bulb" },
			{ icon: "landmark" },
			{ icon: "map" },
		],
	},
	familias: {
		location: true,
		keyFactIcons: ["bed", "car", "clock", "info"],
		sections: [
			{ icon: "users", ...photo("hab2") },
			{ icon: "home", ...photo("menjador12") },
			{ icon: "car" },
			{ icon: "map" },
			{ icon: "smile" },
			{ icon: "heart" },
			{ icon: "sparkles", ...photo("cuina2") },
		],
	},
	hospital: {
		location: true,
		keyFactIcons: ["heart", "key", "car", "bed"],
		sections: [
			{ icon: "heart", ...photo("hab2") },
			{ icon: "route" },
			{ icon: "home", ...photo("menjador12") },
			{ icon: "bulb" },
			{ icon: "academic" },
			{ icon: "map" },
		],
	},
	trabajo: {
		location: true,
		keyFactIcons: ["wifi", "bed", "briefcase", "bolt"],
		sections: [
			{ icon: "briefcase" },
			{ icon: "route" },
			{ icon: "home", ...photo("menjador11") },
			{ icon: "clock" },
			{ icon: "bolt" },
			{ icon: "calendar" },
		],
	},
	cardona: {
		illustration: "cardona",
		keyFactIcons: ["car", "mountain", "clock", "smile"],
		sections: [
			{ icon: "sparkles" },
			{ icon: "car" },
			{ icon: "mountain" },
			{ icon: "landmark" },
			{ icon: "pin" },
			{ icon: "sun", variant: "timeline" },
			{ icon: "smile" },
			{ icon: "bulb" },
		],
	},
}

export function getLandingDecor(key: string): LandingDecor {
	return LANDING_DECOR[key] ?? { sections: [] }
}
