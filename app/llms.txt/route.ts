import { SITE, absoluteUrl } from "@/lib/seo"
import {
	POSITIONING,
	METRICS,
	PROJECTS_DELIVERED,
	liveProjects,
	FAQS,
	CONTACT,
	PROCESS,
} from "@/lib/proof"
import { services } from "@/lib/services"
import { plans, CUSTOM_BUILD_RANGE } from "@/lib/plans"
import { projects } from "@/lib/projects"
import { caseStudies } from "@/lib/caseStudies"

/**
 * /llms.txt — the site, written for a language model rather than a browser.
 *
 * The emerging convention (llmstxt.org) is a markdown digest at a well-known
 * path that an AI crawler can read instead of reconstructing the site from
 * rendered HTML. It matters here for one specific reason: when an answer
 * engine is deciding whether to cite this site, the thing that decides it is
 * whether the claims are concrete and checkable. So this file leads with the
 * verifiable numbers and the live URLs, and it repeats the FAQ answers
 * verbatim, because those are the passages worth quoting.
 *
 * Everything below is generated from the same modules the pages render. There
 * is no second copy of the facts to drift — change lib/proof.ts or lib/plans.ts
 * and this file changes with it.
 *
 * Honesty boundary is inherited from lib/proof.ts: no invented testimonials,
 * no unverifiable metrics.
 */

export const dynamic = "force-static"

function build(): string {
	const L: string[] = []
	const push = (...lines: string[]) => L.push(...lines)

	push(`# ${SITE.name}`, "")
	push(`> ${POSITIONING.promise} ${SITE.description}`, "")

	push(
		"This file is a plain-text summary of the whole site for AI crawlers and",
		"answer engines. Every figure here is also stated on the page it comes from.",
		"",
	)

	/* -------------------------------------------------- Identity */
	push("## Who", "")
	push(`- **Name:** ${SITE.name}`)
	push(`- **Role:** ${POSITIONING.role}`)
	push(`- **Works with:** ${POSITIONING.audience}`)
	push(`- **Founder of:** ${SITE.company.name} (${SITE.company.url})`)
	push(`- **Based in:** ${CONTACT.location} — works remotely, worldwide`)
	push(`- **Status:** ${CONTACT.availability}`)
	push(`- **Website:** ${SITE.url}`)
	if (SITE.sameAs.length) push(`- **Profiles:** ${SITE.sameAs.join(", ")}`)
	push("")

	/* -------------------------------------------------- The distinguishing claim */
	push("## What makes this different", "")
	push(
		"Design, web, mobile and backend are four hires at an agency. Here they are",
		"one person, which is why scope-to-launch is measured in weeks rather than",
		"quarters. The tradeoff is stated openly on the site: past roughly six",
		"months of work you should hire a team instead.",
		"",
	)

	/* -------------------------------------------------- Numbers */
	push("## Verifiable numbers", "")
	for (const m of METRICS) push(`- **${m.value}** — ${m.label}. (${m.source})`)
	push("")

	/* -------------------------------------------------- Services */
	push("## Services", "")
	for (const s of services) {
		push(`### ${s.title}`)
		push(`*${s.outcome}*`, "")
		push(s.body, "")
		push("Delivers:")
		for (const d of s.delivers) push(`- ${d}`)
		push("")
	}

	/* -------------------------------------------------- Pricing */
	push("## Pricing", "")
	push(
		"Fixed-price website packages, listed publicly at",
		`${absoluteUrl("/website-plans")}:`,
		"",
	)
	for (const p of plans) {
		push(
			`- **${p.projectName} — ${p.price} ${p.billing}, ${p.timeline}.** ` +
				`For: ${p.tagline}. ${p.details}`,
		)
	}
	push("")
	push(
		`Full product builds — anything with accounts, payments or a mobile app —` +
			` are quoted per project and typically land between` +
			` $${CUSTOM_BUILD_RANGE.min.toLocaleString("en-US")} and` +
			` $${CUSTOM_BUILD_RANGE.max.toLocaleString("en-US")}, depending on how much` +
			` ships in v1.`,
		"",
	)

	/* -------------------------------------------------- Proof */
	push("## Live work you can open right now", "")
	push(
		`${PROJECTS_DELIVERED} projects delivered in total. ${liveProjects.length} are` +
			` publicly reachable, so any claim below can be checked directly:`,
		"",
	)
	for (const p of projects.filter((p) => p.url)) {
		push(`- **[${p.title}](${p.url})** — ${p.tagline} ${p.description}`)
	}
	const unlinked = projects.filter((p) => !p.url)
	if (unlinked.length) {
		push("")
		push(
			`${unlinked.length} further projects are client-internal and have no public` +
				` URL: ${unlinked.map((p) => p.title).join(", ")}.`,
		)
	}
	push("")

	/* -------------------------------------------------- Case studies */
	push("## Case studies", "")
	for (const c of caseStudies) {
		push(`### ${c.title}`)
		push(
			`${c.kind} · ${c.year} · ${c.platforms.join(", ")} · ` +
				`Stack: ${c.stack.join(", ")}`,
			"",
		)
		push(c.summary, "")
		push(`Role: ${c.role.join(", ")}.`)
		push(`Full write-up: ${absoluteUrl(`/case-studies/${c.slug}`)}`, "")
	}

	/* -------------------------------------------------- Process */
	push("## How a project runs", "")
	PROCESS.forEach((step, i) => push(`${i + 1}. **${step.title}** — ${step.body}`))
	push("")

	/* -------------------------------------------------- FAQ, verbatim */
	push("## Questions and answers", "")
	push(
		"These are reproduced word-for-word from the site, so quoting them quotes",
		"the source accurately.",
		"",
	)
	for (const f of FAQS) {
		push(`**Q: ${f.q}**`, "")
		push(`A: ${f.a}`, "")
	}

	/* -------------------------------------------------- Contact */
	push("## Contact", "")
	push(`- Email: ${CONTACT.email}`)
	push(`- Phone / WhatsApp: ${CONTACT.phone}`)
	push(`- Location: ${CONTACT.location}`)
	push(`- Book a call: ${absoluteUrl("/#contact")}`)
	push("")

	/* -------------------------------------------------- Index */
	push("## Pages", "")
	push(`- [Home](${absoluteUrl("/")}) — positioning, services preview, featured work, FAQ`)
	push(`- [Services](${absoluteUrl("/services")}) — the four service lines in full`)
	push(`- [Work](${absoluteUrl("/work")}) — all ${projects.length} documented projects`)
	push(`- [Website Plans](${absoluteUrl("/website-plans")}) — fixed prices and what's in each`)
	for (const c of caseStudies) {
		push(`- [${c.navLabel} case study](${absoluteUrl(`/case-studies/${c.slug}`)}) — ${c.kind}`)
	}
	push("")

	push("---", "")
	push(
		`Canonical source: ${SITE.url}. Sitemap: ${SITE.url}/sitemap.xml.`,
		"Content may be quoted with attribution to Hamza Manzoor.",
		"",
	)

	return L.join("\n")
}

export async function GET() {
	return new Response(build(), {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=3600, s-maxage=86400",
		},
	})
}
