import type { Metadata } from "next"
import data from "@/util/blog.json"
import { pageMetadata } from "@/lib/seo"

type BlogPost = { id: number; title: string; category?: string; author?: string; date?: string }

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>
}): Promise<Metadata> {
	const { id } = await params
	const post = (data as BlogPost[]).find((p) => String(p.id) === String(id))

	if (!post) {
		return pageMetadata({
			title: "Article",
			description: "Read the latest articles by Hamza Manzoor on web development, mobile apps and UI/UX.",
			path: `/blog/${id}`,
			tag: "Blog",
		})
	}

	return pageMetadata({
		title: post.title,
		description:
			`${post.title}${post.category ? ` — ${post.category}.` : "."} An article by ${post.author || "Hamza Manzoor"} on web development, mobile apps and design.`.slice(
				0,
				160,
			),
		path: `/blog/${post.id}`,
		tag: post.category || "Blog",
		ogSubtitle: post.category ? `${post.category} · ${post.date || ""}`.trim() : undefined,
	})
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
	return children
}
