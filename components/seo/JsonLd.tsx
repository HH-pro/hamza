import { SITE, absoluteUrl } from "@/lib/seo"

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
			jobTitle: "Full Stack Developer",
			description: SITE.description,
			knowsAbout: [
				"Web Development",
				"Mobile App Development",
				"UI/UX Design",
				"Artificial Intelligence",
				"Machine Learning",
				"React",
				"Next.js",
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
				"Freelance full-stack web & mobile development, UI/UX design and AI/ML solutions.",
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
