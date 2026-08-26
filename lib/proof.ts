/**
 * Proof layer — everything on the site that makes a claim about real work.
 *
 * Rule for this file: only put things here that are TRUE and checkable.
 * Every number below is either derived from `lib/projects.ts` at build time or
 * documented inline with where it comes from. The testimonial list ships empty
 * on purpose — see TESTIMONIALS below.
 */

import { projects } from "./projects"

/* ------------------------------------------------------------------ *
 * Positioning
 * ------------------------------------------------------------------ */

export const POSITIONING = {
	/** The one-line promise. Used in the hero and the OG image. */
	promise: "One person. Design, web, mobile, backend. Launched.",
	/** Short form for nav/meta contexts. */
	role: "Product engineer — ships end-to-end",
	/** The buyer this site is written for. */
	audience:
		"Founders and small teams who need a product built and launched, not a team assembled.",
} as const

/* ------------------------------------------------------------------ *
 * Metrics — all derived, none invented
 * ------------------------------------------------------------------ */

/** Projects with a public URL you can click and verify right now. */
export const liveProjects = projects.filter((p) => p.url)

export interface Metric {
	value: string
	label: string
	/** Where the number comes from. Keeps this file honest. */
	source: string
}

/**
 * Total projects delivered across Hamza's career. This is HIS figure, not a
 * derived one — the catalogue in lib/projects.ts documents a curated subset.
 * Keep the two separate: this is a claim, the ones below are checkable.
 */
export const PROJECTS_DELIVERED = "50+"

export const METRICS: Metric[] = [
	{
		value: PROJECTS_DELIVERED,
		label: "Projects delivered",
		source: "Hamza's own count across all client work — update here when it changes",
	},
	{
		value: `${projects.length}`,
		label: "Documented here",
		source: "Count of entries in lib/projects.ts",
	},
	{
		value: `${liveProjects.length}`,
		label: "Live and verifiable",
		source: "Projects in lib/projects.ts carrying a public url",
	},
	{
		value: "4+",
		label: "Years shipping",
		source: "Stated experience — update in lib/proof.ts when this changes",
	},
]

/* ------------------------------------------------------------------ *
 * Client marks / proof strip
 * ------------------------------------------------------------------ */

export interface ClientMark {
	name: string
	url?: string
}

/**
 * Wordmark strip under the hero. These are shipped, publicly reachable
 * products — the strip links out so a visitor can check the claim.
 */
export const CLIENT_MARKS: ClientMark[] = liveProjects.map((p) => ({
	name: p.title,
	url: p.url,
}))

/* ------------------------------------------------------------------ *
 * Testimonials
 * ------------------------------------------------------------------ */

export interface Testimonial {
	/** The quote, verbatim. Keep the client's own words — don't polish them. */
	quote: string
	/** Person's name as they'd want it shown. */
	name: string
	/** Role and company, e.g. "Founder @ MadeInPK". */
	role: string
	/** Optional hard result to display above the quote, e.g. "Shipped in 6 weeks". */
	result?: string
	/** Optional project slug from lib/projects.ts to link the quote to the work. */
	project?: string
}

/**
 * ⚠️ EMPTY ON PURPOSE — fill this in with real quotes.
 *
 * Every testimonial block on the site reads from this array and hides itself
 * entirely when the array is empty, so the site is honest today and gets
 * stronger the moment you paste real quotes in. Nothing here is invented.
 *
 * The strongest quotes are specific and slightly unflattering — a client
 * admitting a doubt you overcame beats "great to work with" every time.
 * Aim for: a number, a named person, a real role.
 *
 * Example of the shape (delete this comment when you add the first one):
 *
 *   {
 *     result: "Shipped in 6 weeks",
 *     quote: "We'd been quoted three months by an agency. Hamza had it in the
 *             App Store before that contract would have started.",
 *     name: "Full Name",
 *     role: "Founder @ Company",
 *     project: "madeinpk",
 *   }
 */
export const TESTIMONIALS: Testimonial[] = []

export const hasTestimonials = TESTIMONIALS.length > 0

/* ------------------------------------------------------------------ *
 * Process — a real sequence, which is why it's numbered
 * ------------------------------------------------------------------ */

export interface ProcessStep {
	title: string
	body: string
}

export const PROCESS: ProcessStep[] = [
	{
		title: "We scope it down to what ships",
		body: "One call to find the smallest version of your product that's still worth launching. Most briefs arrive twice as large as they need to be — cutting that is the highest-value hour of the project.",
	},
	{
		title: "I design and build it, in public",
		body: "Design, frontend, backend, and mobile are one person's job here, so there's no handoff to lose things in. You see working software every week, not status updates.",
	},
	{
		title: "It goes live, and I stay on for the tail",
		body: "Launch is where most freelance engagements end and most problems start. App Store review, DNS, analytics, the first bug reports — that's part of the build, not a change request.",
	},
]

/* ------------------------------------------------------------------ *
 * FAQ — written against real objections, not to fill space
 * ------------------------------------------------------------------ */

export interface Faq {
	q: string
	a: string
}

export const FAQS: Faq[] = [
	{
		q: "Why one person instead of an agency?",
		a: "An agency puts a designer, a frontend dev, a backend dev, and a project manager between you and the product — and most of your budget goes to the coordination between them. I do all four roles, so the design decisions and the build decisions get made by the same person on the same day. For a product under roughly six months of work, that's faster and cheaper. Past that, you should hire a team, and I'll tell you so.",
	},
	{
		q: "What if I need mobile and web?",
		a: "That's the normal case, not the exception. MadeInPK runs on iOS, Android and web; GlazeMe and FaceMeQuiz ship on iOS with companion sites. Building both from one codebase decision is exactly where a single end-to-end developer saves you the most.",
	},
	{
		q: "How do I know you'll actually finish?",
		a: "Every project in the portfolio with a link next to it is live right now — you can open it and use it. That's the check I'd want too. The unlinked ones are client-internal and I can walk you through them on a call.",
	},
	{
		q: "What do you need from me to start?",
		a: "A clear idea of who the product is for, any brand assets you already have, and about an hour a week. I don't need a spec document — writing one is usually part of the first week's work.",
	},
	{
		q: "What does it cost?",
		a: "Fixed-price website builds start at $499 and are listed on the Plans page. Full product builds — anything with accounts, payments, or a mobile app — are quoted per project after the scoping call, and typically land between $4,000 and $20,000 depending on how much ships in v1. You get that number after one call, not three.",
	},
	{
		q: "Do you offer ongoing maintenance after launch?",
		a: "Yes — the Care Plan is $300 a month and it's optional on every tier. It covers hosting, domain and SSL renewals, monthly security and dependency updates, uptime monitoring, weekly offsite backups, a monthly Core Web Vitals and Search Console check, and up to four hours of content or design changes. It's month to month, so you can cancel any time. Plenty of clients don't take it and just email me when something needs doing — that's fine too, it's billed hourly instead.",
	},
	{
		q: "Do you work with existing codebases?",
		a: "Yes, and it's often the better first engagement. Picking up someone else's project tells you more about how I work than a greenfield build does.",
	},
]

/* ------------------------------------------------------------------ *
 * Contact — single source of truth
 * ------------------------------------------------------------------ */

export const CONTACT = {
	email: "info@hamzamanzoor.online",
	phone: "+92 311 7836704",
	phoneHref: "tel:+923117836704",
	whatsapp: "https://wa.me/923117836704",
	location: "Narowal, Punjab, Pakistan",
	/** Correct maps query for the stated location. */
	mapsUrl: "https://maps.google.com/maps?q=Narowal,+Punjab,+Pakistan",
	availability: "Available for new projects",
} as const
