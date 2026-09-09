import {
	breadcrumbListJsonLd,
	guideArticleJsonLd,
	lodgingJsonLd,
	parkingLodgingJsonLd,
	schemaGraph,
} from "./schema"
import { absoluteUrl, localizedPath, type Lang } from "./site"
import { GUIDE_REVIEWED_AT } from "./montserratNotices"

export function homeJsonLd(lang: Lang, description: string, image: string) {
	return lodgingJsonLd(localizedPath(lang), description, lang, image)
}

export function lodgingLandingJsonLd(opts: {
	lang: Lang
	slug: string
	description: string
	image: string
	homeLabel: string
	currentLabel: string
}) {
	const path = localizedPath(opts.lang, opts.slug)
	return schemaGraph(
		lodgingJsonLd(path, opts.description, opts.lang, opts.image),
		breadcrumbListJsonLd([
			{ name: opts.homeLabel, path: localizedPath(opts.lang) },
			{ name: opts.currentLabel, path },
		]),
	)
}

export function parkingLandingJsonLd(opts: {
	lang: Lang
	slug: string
	description: string
	image: string
	homeLabel: string
	currentLabel: string
}) {
	const path = localizedPath(opts.lang, opts.slug)
	return schemaGraph(
		parkingLodgingJsonLd(path, opts.description, opts.lang, opts.image),
		breadcrumbListJsonLd([
			{ name: opts.homeLabel, path: localizedPath(opts.lang) },
			{ name: opts.currentLabel, path },
		]),
	)
}

export function guideLandingJsonLd(opts: {
	lang: Lang
	slug: string
	headline: string
	description: string
	image: string
	homeLabel: string
	currentLabel: string
	dateModified: string
}) {
	const path = localizedPath(opts.lang, opts.slug)
	return schemaGraph(
		guideArticleJsonLd({
			langPath: path,
			headline: opts.headline,
			description: opts.description,
			image: opts.image,
			dateModified: opts.dateModified,
		}),
		breadcrumbListJsonLd([
			{ name: opts.homeLabel, path: localizedPath(opts.lang) },
			{ name: opts.currentLabel, path },
		]),
	)
}

export { GUIDE_REVIEWED_AT, absoluteUrl }
