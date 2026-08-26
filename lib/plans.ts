/**
 * Fixed-price website packages — the single source of truth for pricing.
 *
 * Read by /website-plans, by the Offer schema in components/seo/JsonLd.tsx and
 * by /llms.txt. Change a number here and it changes in all three, so the page,
 * the structured data and the AI-readable summary can never disagree.
 *
 * `priceValue` is the same figure as `price` in the plain form Schema.org
 * needs. Keep the two in step.
 */

export type Plan = {
	projectName: string
	tagline: string
	price: string
	/** Numeric form of `price`, for schema.org Offer. */
	priceValue: number
	billing: string
	timeline: string
	details: string
	features: string[]
	highlight?: boolean
}

/** Bespoke product builds sit outside the fixed tiers. */
export const CUSTOM_BUILD_RANGE = { min: 4000, max: 20000, currency: "USD" } as const

export const plans: Plan[] = [
	{
		projectName: "Starter Business Site",
		tagline: "Small businesses and personal brands",
		price: "$499",
		priceValue: 499,
		billing: "one-time",
		timeline: "1–2 weeks",
		details:
			"A five-page responsive site on Next.js, built the way this one was — real technical SEO, real Core Web Vitals, a contact form that actually delivers. Not a template with your logo dropped in.",
		features: [
			"Up to 5 pages (Home, About, Services, Contact, Blog)",
			"Free domain name for 1 year",
			"Mobile responsive design",
			"Technical SEO: schema, sitemap, social preview images",
			"Core Web Vitals tuned before launch, not after",
			"Contact form + WhatsApp integration",
			"1 month of support after launch",
		],
	},
	{
		projectName: "Professional Portfolio",
		tagline: "Freelancers, designers and agencies",
		price: "$999",
		priceValue: 999,
		billing: "one-time",
		timeline: "2–3 weeks",
		details:
			"A portfolio with custom branding, a project showcase and a CMS behind it, so you add work yourself without calling me every time. Designed for the version of you that gets hired, not the one that lists skills.",
		features: [
			"Up to 10 pages with custom animation",
			"Brand direction: type, palette, the whole design layer",
			"Free domain + premium hosting (1 year)",
			"Project showcase with galleries",
			"Blog with admin dashboard (CMS)",
			"Technical SEO + Google Analytics + Search Console",
			"Social + WhatsApp integration",
			"3 months of support after launch",
		],
		highlight: true,
	},
	{
		projectName: "E-Commerce Store",
		tagline: "Selling products, taking payments",
		price: "$1,899",
		priceValue: 1899,
		billing: "one-time",
		timeline: "3–5 weeks",
		details:
			"A complete store — catalogue, secure checkout, multiple payment gateways, and an admin panel for orders, stock and customers. The unglamorous half is the half that decides whether you can actually run it.",
		features: [
			"Unlimited products and categories",
			"Free domain + business hosting (1 year)",
			"Stripe / PayPal / JazzCash integration",
			"Admin dashboard for orders and inventory",
			"Customer accounts + order tracking",
			"Product schema so items can win rich results",
			"Email notifications and invoices",
			"6 months of support after launch",
		],
	},
	{
		projectName: "Custom Web Application",
		tagline: "SaaS, dashboards, booking systems",
		price: "$3,499+",
		priceValue: 3499,
		billing: "project-based",
		timeline: "6 weeks+",
		details:
			"Built around your business logic rather than a template — dashboards, booking systems, CRMs or a SaaS product. Scoped and quoted after a free call, and the number you get is the number you pay.",
		features: [
			"Custom UI/UX design from scratch",
			"Authentication and role management",
			"Database design + REST/GraphQL APIs",
			"Admin panel and analytics",
			"AI integration where it earns its place",
			"Cloud deployment (Vercel / AWS / DO)",
			"12 months of support and updates",
		],
	},
]
