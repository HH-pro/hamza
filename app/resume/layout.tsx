import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
	title: "Resume",
	description:
		"The resume of Hamza Manzoor — Full Stack Developer with 4+ years building web & mobile applications, UI/UX, AI and ML solutions.",
	path: "/resume",
	tag: "Resume",
})

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
	return children
}
