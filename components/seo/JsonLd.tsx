import { SITE, absoluteUrl } from "@/lib/seo"
import { FAQS, CONTACT, PROJECTS_DELIVERED, liveProjects } from "@/lib/proof"
import { services } from "@/lib/services"
import { plans, CUSTOM_BUILD_RANGE, MAINTENANCE } from "@/lib/plans"
import { projects, projectImg, categoryLabel } from "@/lib/projects"

/**
 * Structured data for the whole site.
 *
 * Two audiences, one graph. Google reads it for rich results; the AI answer
 * engines (AI Overviews, ChatGPT search, Perplexity) read it to decide what
 * this site *is* and whether a claim on it is safe to repeat. That second
 * audience is why everything here is stable-@id'd and cross-referenced rather
 * than emitted as four unrelated islands of JSON.
 *
 * Honesty rule, same as lib/proof.ts: nothing is asserted here that isn't
 * asserted on the page a human sees. No invented ratings, no aggregate review
 * counts, no fake availability windows.
 */

/** Stable node ids, so every block can point at the same entities. */
export const ID = {
	person: `${SITE.url}/#person`,
	website: `${SITE.url}/#website`,
	service: `${SITE.url}/#service`,
	company: `${SITE.url}/#zynhive`,
} as const

/** Renders a JSON-LD <script> block. Safe for Server Components. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
	return (
		<script
			type="application/ld+json"
			// JSON.stringify output is safe to inline; no user input is interpolated.
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	)
}

/* ------------------------------------------------------------------ *
 * Shared entities
 * ------------------------------------------------------------------ */

/**
 * The Person node. Everything else on the site points back at this.
 *
 * `sameAs` is the strongest identity signal available and it stays omitted
 * while SITE.sameAs is empty — see the note there. Emitting an empty array is
 * worse than emitting nothing, since it reads as "no profiles exist".
 */
function personNode() {
	return {
		"@type": "Person",
		"@id": ID.person,
		name: SITE.name,
		url: SITE.url,
		image: absoluteUrl("/assets/imgs/hero/hero-1/profile.png"),
		jobTitle: "Product Engineer",
		description: SITE.description,
		email: `mailto:${CONTACT.email}`,
		telephone: CONTACT.phoneHref.replace("tel:", ""),
		address: {
			"@type": "PostalAddress",
			addressLocality: "Narowal",
			addressRegion: "Punjab",
			addressCountry: "PK",
		},
		worksFor: { "@id": ID.company },
		founder: { "@id": ID.company },
		knowsAbout: [
			"End-to-end product development",
			"Web Development",
			"Mobile App Development",
			"UI/UX Design",
			"AI integration",
			"React",
			"Next.js",
			"React Native",
			"Flutter",
			"SwiftUI",
			"Node.js",
		],
		...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
	}
}

function companyNode() {
	return {
		"@type": "Organization",
		"@id": ID.company,
		name: SITE.company.name,
		url: SITE.company.url,
		founder: { "@id": ID.person },
	}
}

/** ProfessionalService, with the real service catalogue and real price floor. */
function serviceNode() {
	return {
		"@type": "ProfessionalService",
		"@id": ID.service,
		name: `${SITE.name} — Web & App Development`,
		url: SITE.url,
		description:
			"End-to-end product builds — design, web app, mobile app and backend delivered by one person, from scope through launch.",
		provider: { "@id": ID.person },
		founder: { "@id": ID.person },
		image: absoluteUrl("/assets/imgs/hero/hero-1/profile.png"),
		email: `mailto:${CONTACT.email}`,
		telephone: CONTACT.phoneHref.replace("tel:", ""),
		address: {
			"@type": "PostalAddress",
			addressLocality: "Narowal",
			addressRegion: "Punjab",
			addressCountry: "PK",
		},
		// Remote work: the service area is global, which is a real claim here.
		areaServed: { "@type": "Place", name: "Worldwide" },
		availableLanguage: ["en", "ur"],
		priceRange: `$${plans[0].priceValue}–$${CUSTOM_BUILD_RANGE.max.toLocaleString("en-US")}`,
		currenciesAccepted: "USD",
		serviceType: [
			"Web Development",
			"Mobile App Development",
			"UI/UX Design",
			"AI/ML Development",
		],
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Services",
			itemListElement: services.map((s) => ({
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					"@id": `${SITE.url}/services#${s.slug}`,
					name: s.title,
					description: s.body,
					serviceType: s.title,
					provider: { "@id": ID.person },
				},
			})),
		},
	}
}

/* ------------------------------------------------------------------ *
 * Page-level blocks
 * ------------------------------------------------------------------ */

/** Person + Organization + WebSite + ProfessionalService graph for the homepage. */
export function HomeJsonLd() {
	return (
		<JsonLd
			data={{
				"@context": "https://schema.org",
				"@graph": [
					personNode(),
					companyNode(),
					{
						"@type": "WebSite",
						"@id": ID.website,
						url: SITE.url,
						name: SITE.brand,
						description: SITE.description,
						publisher: { "@id": ID.person },
						inLanguage: "en",
					},
					serviceNode(),
					{
						"@type": "WebPage",
						"@id": `${SITE.url}/#webpage`,
						url: SITE.url,
						name: SITE.title,
						description: SITE.description,
						isPartOf: { "@id": ID.website },
						about: { "@id": ID.person },
						primaryImageOfPage: absoluteUrl("/assets/imgs/hero/hero-1/profile.png"),
						inLanguage: "en",
						// Tells voice and answer surfaces which passages carry the claim.
						speakable: {
							"@type": "SpeakableSpecification",
							cssSelector: [".hm-h1", ".hm-lede"],
						},
					},
				],
			}}
		/>
	)
}

/**
 * FAQPage schema built from the same FAQ array the page renders, so the
 * markup and the visible answers can never drift apart.
 *
 * These answers are the site's most quotable passages — specific, numeric, and
 * willing to say when the answer is "hire someone else". That is exactly the
 * shape an answer engine cites, which is why the ids are stable.
 */
export function FaqJsonLd() {
	return (
		<JsonLd
			data={{
				"@context": "https://schema.org",
				"@type": "FAQPage",
				"@id": `${SITE.url}/#faq`,
				inLanguage: "en",
				mainEntity: FAQS.map((f, i) => ({
					"@type": "Question",
					"@id": `${SITE.url}/#faq-${i + 1}`,
					name: f.q,
					acceptedAnswer: { "@type": "Answer", text: f.a },
				})),
			}}
		/>
	)
}

/**
 * BreadcrumbList. Google renders it in the SERP in place of a raw URL, and
 * answer engines use it to work out where a page sits in the site.
 */
export function BreadcrumbJsonLd({
	trail,
}: {
	/** Ordered, excluding Home — that is prepended here. */
	trail: { name: string; path: string }[]
}) {
	const items = [{ name: "Home", path: "/" }, ...trail]
	return (
		<JsonLd
			data={{
				"@context": "https://schema.org",
				"@type": "BreadcrumbList",
				itemListElement: items.map((item, i) => ({
					"@type": "ListItem",
					position: i + 1,
					name: item.name,
					item: absoluteUrl(item.path),
				})),
			}}
		/>
	)
}

/** /services — the catalogue as an ItemList of Service nodes. */
export function ServicesJsonLd() {
	return (
		<JsonLd
			data={{
				"@context": "https://schema.org",
				"@graph": [
					{
						"@type": "CollectionPage",
						"@id": `${SITE.url}/services#webpage`,
						url: absoluteUrl("/services"),
						name: "Services",
						description:
							"End-to-end product builds, websites, mobile apps and AI integration — designed, built and launched by one person.",
						isPartOf: { "@id": ID.website },
						about: { "@id": ID.service },
						inLanguage: "en",
					},
					{
						"@type": "ItemList",
						"@id": `${SITE.url}/services#list`,
						name: "Services offered",
						numberOfItems: services.length,
						itemListElement: services.map((s, i) => ({
							"@type": "ListItem",
							position: i + 1,
							item: {
								"@type": "Service",
								"@id": `${SITE.url}/services#${s.slug}`,
								name: s.title,
								description: s.body,
								serviceType: s.title,
								provider: { "@id": ID.person },
								areaServed: { "@type": "Place", name: "Worldwide" },
							},
						})),
					},
				],
			}}
		/>
	)
}

/**
 * /work — a CollectionPage listing the portfolio.
 *
 * Only projects with a public URL become `CreativeWork` nodes with a `url`;
 * the client-internal ones are still listed but make no linkable claim.
 */
export function WorkJsonLd() {
	return (
		<JsonLd
			data={{
				"@context": "https://schema.org",
				"@graph": [
					{
						"@type": "CollectionPage",
						"@id": `${SITE.url}/work#webpage`,
						url: absoluteUrl("/work"),
						name: "Work",
						description: `${PROJECTS_DELIVERED} projects delivered, ${liveProjects.length} of them publicly live and verifiable.`,
						isPartOf: { "@id": ID.website },
						about: { "@id": ID.person },
						inLanguage: "en",
					},
					{
						"@type": "ItemList",
						"@id": `${SITE.url}/work#list`,
						name: "Portfolio",
						numberOfItems: projects.length,
						itemListElement: projects.map((p, i) => ({
							"@type": "ListItem",
							position: i + 1,
							item: {
								"@type": "CreativeWork",
								"@id": `${SITE.url}/work#${p.slug}`,
								name: p.title,
								description: p.description,
								genre: categoryLabel[p.category],
								keywords: p.tags.join(", "),
								image: absoluteUrl(projectImg(p.cover)),
								creator: { "@id": ID.person },
								...(p.url ? { url: p.url } : {}),
							},
						})),
					},
				],
			}}
		/>
	)
}

/**
 * /website-plans — real Offers with real prices.
 *
 * Every figure comes from lib/plans.ts, the same array the page renders, so a
 * price can never be right on the page and stale in the markup. Google treats
 * a mismatch between the two as a reason to drop the rich result entirely.
 */
export function PlansJsonLd() {
	/** One-off build tiers. */
	const tierOffers: Record<string, unknown>[] = plans.map((plan, i) => ({
		"@type": "Offer",
		"@id": `${SITE.url}/website-plans#plan-${i + 1}`,
		position: i + 1,
		name: plan.projectName,
		description: plan.details,
		price: plan.priceValue,
		priceCurrency: "USD",
		// "+" tiers are a floor, not a fixed price. Say which it is.
		...(plan.price.endsWith("+")
			? {
					priceSpecification: {
						"@type": "PriceSpecification",
						minPrice: plan.priceValue,
						priceCurrency: "USD",
					},
				}
			: {}),
		availability: "https://schema.org/InStock",
		seller: { "@id": ID.person },
		itemOffered: {
			"@type": "Service",
			name: plan.projectName,
			description: plan.details,
			serviceType: "Web Development",
			provider: { "@id": ID.person },
		},
		eligibleCustomerType: plan.tagline,
	}))

	/**
	 * The retainer. A UnitPriceSpecification billed per MON is what marks this
	 * as recurring — a bare `price: 300` alongside the one-off tiers would be
	 * read as $300 total, which undersells it by an order of magnitude.
	 */
	const careOffer: Record<string, unknown> = {
		"@type": "Offer",
		"@id": `${SITE.url}/website-plans#care-plan`,
		position: plans.length + 1,
		name: MAINTENANCE.name,
		description: MAINTENANCE.details,
		priceCurrency: "USD",
		priceSpecification: {
			"@type": "UnitPriceSpecification",
			price: MAINTENANCE.priceValue,
			priceCurrency: "USD",
			billingDuration: 1,
			billingIncrement: 1,
			unitCode: "MON",
			referenceQuantity: {
				"@type": "QuantitativeValue",
				value: 1,
				unitCode: "MON",
			},
		},
		availability: "https://schema.org/InStock",
		seller: { "@id": ID.person },
		itemOffered: {
			"@type": "Service",
			name: MAINTENANCE.name,
			description: MAINTENANCE.details,
			serviceType: "Website maintenance",
			provider: { "@id": ID.person },
		},
		eligibleCustomerType: MAINTENANCE.tagline,
	}

	return (
		<JsonLd
			data={{
				"@context": "https://schema.org",
				"@graph": [
					{
						"@type": "CollectionPage",
						"@id": `${SITE.url}/website-plans#webpage`,
						url: absoluteUrl("/website-plans"),
						name: "Website Plans & Pricing",
						description: `Fixed-price website packages from $${plans[0].priceValue}, with scope, timeline and cost stated up front. Optional ${MAINTENANCE.name} at $${MAINTENANCE.priceValue}/month.`,
						isPartOf: { "@id": ID.website },
						inLanguage: "en",
					},
					{
						"@type": "OfferCatalog",
						"@id": `${SITE.url}/website-plans#catalog`,
						name: "Website packages",
						url: absoluteUrl("/website-plans"),
						provider: { "@id": ID.person },
						numberOfItems: tierOffers.length + 1,
						itemListElement: [...tierOffers, careOffer],
					},
				],
			}}
		/>
	)
}

/**
 * A single case study. Richer than a bare Article: dates so freshness is
 * legible, `about` so the subject is an entity rather than a string, and
 * `isPartOf` so it hangs off the site graph.
 */
export function CaseStudyJsonLd({
	slug,
	title,
	summary,
	image,
	year,
	stack,
	projectUrl,
}: {
	slug: string
	title: string
	summary: string
	image: string
	year: string
	stack: string[]
	projectUrl?: string
}) {
	const url = absoluteUrl(`/case-studies/${slug}`)
	return (
		<JsonLd
			data={{
				"@context": "https://schema.org",
				"@graph": [
					{
						"@type": "Article",
						"@id": `${url}#article`,
						headline: title,
						description: summary,
						image: absoluteUrl(image),
						// The build year is the honest date here; there is no per-post
						// publish timestamp in the data, so don't invent one.
						datePublished: `${year}-01-01`,
						dateModified: `${year}-12-31`,
						author: { "@id": ID.person },
						publisher: { "@id": ID.person },
						isPartOf: { "@id": ID.website },
						mainEntityOfPage: { "@id": `${url}#webpage` },
						keywords: stack.join(", "),
						inLanguage: "en",
						articleSection: "Case study",
					},
					{
						"@type": "WebPage",
						"@id": `${url}#webpage`,
						url,
						name: title,
						description: summary,
						isPartOf: { "@id": ID.website },
						primaryImageOfPage: absoluteUrl(image),
						inLanguage: "en",
					},
					{
						"@type": "CreativeWork",
						"@id": `${SITE.url}/work#${slug}`,
						name: title,
						creator: { "@id": ID.person },
						keywords: stack.join(", "),
						...(projectUrl ? { url: projectUrl } : {}),
						subjectOf: { "@id": `${url}#article` },
					},
				],
			}}
		/>
	)
}
