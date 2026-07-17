import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date()

	const routes: {
		path: string
		priority: number
		changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
	}[] = [
		{ path: "/", priority: 1.0, changeFrequency: "weekly" },
		{ path: "/services", priority: 0.9, changeFrequency: "monthly" },
		{ path: "/work", priority: 0.9, changeFrequency: "weekly" },
		{ path: "/website-plans", priority: 0.8, changeFrequency: "monthly" },
	]

	return routes.map((r) => ({
		url: absoluteUrl(r.path),
		lastModified: now,
		changeFrequency: r.changeFrequency,
		priority: r.priority,
	}))
}
