/**
 * Temporary / changeable notices for the Montserrat guide.
 * Set `active: false` when the official status changes.
 */
export const MONTSERRAT_NOTICES = {
	reviewedAt: "2026-09",
	reviewedAtIso: "2026-09-01",
	temporary: [
		{
			id: "funiculars",
			active: true,
		},
	],
} as const

export const GUIDE_REVIEWED_AT = {
	queVer: "2026-09-01",
	montserrat: "2026-09-01",
	enoturismo: "2026-09-09",
	camino: "2026-09-09",
} as const
