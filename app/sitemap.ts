import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/seo"
import { caseStudies } from "@/lib/caseStudies"
import { projects, projectImg } from "@/lib/projects"

/**
 * XML sitemap, served at /sitemap.xml.
 *
 * `lastModified` deliberately does NOT use `new Date()`. A sitemap that claims
 * every page changed at build time is a sitemap crawlers learn to ignore — the
 * signal only means something if it moves when the content moves. So each
 * route carries an explicit review date, bumped by hand when the page actually
 * changes. Case studies inherit theirs from the project year in the data.
 *
 * Keep CONTENT_REVIEWED honest: change the date when you change the page.
 */
const CONTENT_REVIEWED: Record<string, string> = {
	"/": "2026-08-26",
	"/services": "2026-08-26",
	"/work": "2026-08-26",
	"/website-plans": "2026-08-26",
}

/** Case studies get the last day of their build year; no finer date exists. */
const caseStudyDate = (year: string) => `${year}-12-31`

export default function sitemap(): MetadataRoute.Sitemap {
	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: absoluteUrl("/"),
			lastModified: CONTENT_REVIEWED["/"],
			changeFrequency: "weekly",
			priority: 1.0,
		},
		{
			url: absoluteUrl("/services"),
			lastModified: CONTENT_REVIEWED["/services"],
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: absoluteUrl("/work"),
			lastModified: CONTENT_REVIEWED["/work"],
			changeFrequency: "weekly",
			priority: 0.9,
			// Image sitemap entries: the portfolio grid is the point of this page.
			images: projects.map((p) => absoluteUrl(projectImg(p.cover))),
		},
		{
			url: absoluteUrl("/website-plans"),
			lastModified: CONTENT_REVIEWED["/website-plans"],
			changeFrequency: "monthly",
			priority: 0.8,
		},
	]

	const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((c) => ({
		url: absoluteUrl(`/case-studies/${c.slug}`),
		lastModified: caseStudyDate(c.year),
		changeFrequency: "yearly",
		priority: 0.85,
		images: c.gallery.slice(0, 6).map((n) => absoluteUrl(projectImg(n))),
	}))

	return [...staticRoutes, ...caseStudyRoutes]
}
