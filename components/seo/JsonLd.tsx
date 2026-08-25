import { SITE, absoluteUrl } from "@/lib/seo"
import { FAQS } from "@/lib/proof"

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

/** Person + WebSite + ProfessionalService graph for the homepage. */
export function HomeJsonLd() {
	const graph = [
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"@id": `${SITE.url}/#person`,
			name: SITE.name,
			url: SITE.url,
			image: absoluteUrl("/assets/imgs/hero/hero-1/profile.png"),
			jobTitle: "Product Engineer",
			description: SITE.description,
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
			],
		},
		{
			"@context": "https://schema.org",
			"@type": "WebSite",
			"@id": `${SITE.url}/#website`,
			url: SITE.url,
			name: SITE.brand,
			description: SITE.description,
			publisher: { "@id": `${SITE.url}/#person` },
			inLanguage: "en",
		},
		{
			"@context": "https://schema.org",
			"@type": "ProfessionalService",
			"@id": `${SITE.url}/#service`,
			name: `${SITE.name} — Web & App Development`,
			url: SITE.url,
			description:
				"End-to-end product builds — design, web app, mobile app and backend delivered by one person, from scope through launch.",
			provider: { "@id": `${SITE.url}/#person` },
			areaServed: "Worldwide",
			serviceType: [
				"Web Development",
				"Mobile App Development",
				"UI/UX Design",
				"AI/ML Development",
			],
		},
	]
	return <JsonLd data={graph} />
}

/**
 * FAQPage schema built from the same FAQ array the page renders, so the
 * markup and the visible answers can never drift apart.
 */
export function FaqJsonLd() {
	return (
		<JsonLd
			data={{
				"@context": "https://schema.org",
				"@type": "FAQPage",
				"@id": `${SITE.url}/#faq`,
				mainEntity: FAQS.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: { "@type": "Answer", text: f.a },
				})),
			}}
		/>
	)
}
