import type { MetadataRoute } from "next"
import blog from "@/util/blog.json"
import { absoluteUrl } from "@/lib/seo"

type BlogPost = { id: number }

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date()

	const staticRoutes: {
		path: string
		priority: number
		changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
	}[] = [
		{ path: "/", priority: 1.0, changeFrequency: "weekly" },
		{ path: "/services", priority: 0.9, changeFrequency: "monthly" },
		{ path: "/work", priority: 0.9, changeFrequency: "weekly" },
		{ path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
		{ path: "/website-plans", priority: 0.8, changeFrequency: "monthly" },
		{ path: "/resume", priority: 0.6, changeFrequency: "yearly" },
		{ path: "/blog", priority: 0.7, changeFrequency: "weekly" },
	]

	const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
		url: absoluteUrl(r.path),
		lastModified: now,
		changeFrequency: r.changeFrequency,
		priority: r.priority,
	}))

	const blogEntries: MetadataRoute.Sitemap = (blog as BlogPost[]).map((p) => ({
		url: absoluteUrl(`/blog/${p.id}`),
		lastModified: now,
		changeFrequency: "monthly",
		priority: 0.5,
	}))

	return [...staticEntries, ...blogEntries]
}
