import { pageMetadata } from "@/lib/seo"
import { WorkJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd"

export const metadata = pageMetadata({
	title: "Work",
	description:
		"Selected projects and case studies by Hamza Manzoor — web apps, mobile apps and product design work shipped for clients across industries.",
	path: "/work",
	tag: "Portfolio",
	ogTitle: "50+ projects delivered. 12 you can open right now.",
})

export default function WorkLayout({ children }: { children: React.ReactNode }) {
	// The page itself is a client component, so the structured data lives here
	// where it can be rendered on the server and reach a crawler in the HTML.
	return (
		<>
			<WorkJsonLd />
			<BreadcrumbJsonLd trail={[{ name: "Work", path: "/work" }]} />
			{children}
		</>
	)
}
