import type { MetadataRoute } from "next"
import { SITE } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/admin", "/portal", "/clients", "/api/", "/index-2", "/index-3", "/work-single", "/blog-list", "/blog-details", "/cv"],
			},
		],
		sitemap: `${SITE.url}/sitemap.xml`,
		host: SITE.url,
	}
}
