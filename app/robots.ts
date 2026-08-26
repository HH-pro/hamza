import type { MetadataRoute } from "next"
import { SITE } from "@/lib/seo"

/**
 * robots.txt.
 *
 * Two fixes worth knowing about if you edit this:
 *
 * 1. `/api/` is no longer blanket-disallowed. /api/og generates every social
 *    preview image on this site, and disallowing it told Google's image
 *    crawler not to fetch the one image each page advertises as og:image.
 *    Only /api/contact — a POST endpoint with nothing to index — is blocked.
 *
 * 2. The AI crawlers are listed explicitly and allowed. Silence already means
 *    "allowed", so this changes no access; what it changes is legibility. An
 *    explicit allow is the convention answer engines document, and it makes
 *    the decision reviewable — if Hamza ever wants to opt out of training
 *    crawls while staying in the answer surfaces, the two groups below are
 *    already separated for exactly that.
 */

/** Crawlers that fetch pages to answer a live user question. Keep allowed: */
/** blocking these removes the site from AI answers and their citations. */
const ANSWER_ENGINE_BOTS = [
	"OAI-SearchBot", // ChatGPT search index
	"ChatGPT-User", // ChatGPT browsing on a user's behalf
	"Claude-User", // Claude browsing on a user's behalf
	"Claude-SearchBot", // Claude search index
	"PerplexityBot", // Perplexity index
	"Perplexity-User", // Perplexity fetching a cited page
	"DuckAssistBot",
	"Applebot", // Powers Siri and Spotlight results
]

/**
 * Crawlers whose primary purpose is gathering training data. Allowed today —
 * for a portfolio, being in the models is a distribution win, not a leak.
 * Flip any of these to `disallow: "/"` to opt out without touching the group
 * above, which is what keeps the site citable.
 */
const TRAINING_BOTS = [
	"GPTBot",
	"ClaudeBot",
	"Google-Extended",
	"Applebot-Extended",
	"CCBot",
	"meta-externalagent",
	"Amazonbot",
	"Bytespider",
	"cohere-ai",
	"Timpibot",
	"YouBot",
	"Diffbot",
]

export default function robots(): MetadataRoute.Robots {
	const allowAll = {
		allow: "/",
		disallow: ["/api/contact"],
	}

	return {
		rules: [
			{ userAgent: "*", ...allowAll },
			...ANSWER_ENGINE_BOTS.map((userAgent) => ({ userAgent, ...allowAll })),
			...TRAINING_BOTS.map((userAgent) => ({ userAgent, ...allowAll })),
		],
		sitemap: `${SITE.url}/sitemap.xml`,
		host: SITE.url,
	}
}
