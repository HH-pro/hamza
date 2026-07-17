import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
	title: "Work",
	description:
		"Selected projects and case studies by Hamza Manzoor — web apps, mobile apps and product design work shipped for clients across industries.",
	path: "/work",
	tag: "Portfolio",
})

export default function WorkLayout({ children }: { children: React.ReactNode }) {
	return children
}
