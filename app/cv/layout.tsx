import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
	title: "CV",
	description:
		"Curriculum vitae of Hamza Manzoor — Full Stack Developer specialising in web & mobile applications, UI/UX, AI and ML.",
	path: "/cv",
	tag: "CV",
	// Canonical résumé lives at /resume; keep the CV out of the index to avoid duplication.
	index: false,
})

export default function CvLayout({ children }: { children: React.ReactNode }) {
	return children
}
