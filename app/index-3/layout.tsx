import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
	title: "Hamza Manzoor — Full Stack Developer",
	description:
		"Alternate home layout for Hamza Manzoor's portfolio — full stack web & mobile development, UI/UX and AI/ML.",
	path: "/index-3",
	index: false,
})

export default function Index3Layout({ children }: { children: React.ReactNode }) {
	return children
}
