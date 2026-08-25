import type { Metadata } from "next"

/**
 * Central SEO configuration + a `pageMetadata()` helper so every page ships
 * consistent canonical URLs, Open Graph and Twitter cards, and a branded OG
 * image generated on the fly by /api/og.
 */

export const SITE = {
	name: "Hamza Manzoor",
	shortName: "Hamza",
	brand: "Hamza Manzoor",
	title: "Hamza Manzoor — Product Engineer: design, web, mobile, launched",
	description:
		"I build and launch products end-to-end — design, web, mobile and backend — so founders don't have to assemble a team. Marketplaces, fintech platforms and App Store apps, most of them live. Available for new work.",
	url: (process.env.NEXT_PUBLIC_SITE_URL || "https://hamzamanzoor.online").replace(/\/$/, ""),
	locale: "en_US",
	twitter: "@hamza",
	keywords: [
		"Hamza Manzoor",
		"end-to-end product developer",
		"freelance product engineer",
		"build and launch an app",
		"solo full stack developer",
		"React Native developer",
		"Next.js developer",
		"MVP developer for founders",
		"AI integration developer",
	],
} as const

/** Absolute URL for a path on this site. */
export function absoluteUrl(path = "/"): string {
	if (path.startsWith("http")) return path
	return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`
}

/** Build the dynamic OG image URL for a page. */
export function ogImageUrl(opts: { title?: string; tag?: string; subtitle?: string } = {}): string {
	const params = new URLSearchParams()
	if (opts.title) params.set("title", opts.title)
	if (opts.tag) params.set("tag", opts.tag)
	if (opts.subtitle) params.set("subtitle", opts.subtitle)
	const qs = params.toString()
	return `/api/og${qs ? `?${qs}` : ""}`
}

export interface PageMetaInput {
	/** Page-specific title. The brand name is appended automatically via the template. */
	title: string
	/** Meta description (aim for 140–160 chars). */
	description: string
	/** Route path, e.g. "/services". Used for canonical + og:url. */
	path: string
	/** Optional eyebrow shown on the OG image (e.g. "Services"). */
	tag?: string
	/** Large headline drawn on the OG image. Defaults to `title`. */
	ogTitle?: string
	/** Optional subtitle drawn on the OG image. Defaults to `description`. */
	ogSubtitle?: string
	/** Set false for private/utility pages. Defaults to true. */
	index?: boolean
	/** Additional keywords merged with the site defaults. */
	keywords?: string[]
}

export function pageMetadata(input: PageMetaInput): Metadata {
	const { title, description, path, tag, ogTitle, ogSubtitle, index = true, keywords = [] } = input
	const canonical = absoluteUrl(path)
	const image = ogImageUrl({
		title: ogTitle || title,
		tag,
		subtitle: ogSubtitle,
	})

	return {
		title,
		description,
		keywords: [...SITE.keywords, ...keywords],
		alternates: { canonical },
		robots: index
			? { index: true, follow: true }
			: { index: false, follow: false },
		openGraph: {
			type: "website",
			url: canonical,
			siteName: SITE.brand,
			title: `${title} · ${SITE.brand}`,
			description,
			locale: SITE.locale,
			images: [
				{
					url: image,
					width: 1200,
					height: 630,
					alt: `${title} — ${SITE.brand}`,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: `${title} · ${SITE.brand}`,
			description,
			images: [image],
		},
	}
}
