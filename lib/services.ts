/**
 * Service catalogue — shared by the home page preview and /services.
 *
 * Each entry leads with the outcome the client gets, not the technology used.
 * The stack belongs in `delivers`, underneath.
 */

export interface Service {
	slug: string
	title: string
	/** The outcome, in the client's language. Rendered as the serif italic line. */
	outcome: string
	body: string
	delivers: string[]
	icon: string
	/** Project slugs from lib/projects.ts that prove this service. */
	proof: string[]
}

export const services: Service[] = [
	{
		slug: "product-builds",
		title: "End-to-end product builds",
		outcome: "An idea becomes something people can sign up for.",
		body: "The full job: interface design, web app, mobile app, backend, payments, and the launch itself. This is the work I'm actually for — you describe the product, and one person builds all of it rather than four people building a quarter each.",
		delivers: [
			"Product and UI design from scratch",
			"Web app in React / Next.js",
			"iOS and Android from one decision, not two projects",
			"Accounts, payments, admin, and the unglamorous parts",
			"Launch, App Store review, and the first weeks after",
		],
		icon: "ri-rocket-2-line",
		proof: ["madeinpk", "wecinema", "glazeme"],
	},
	{
		slug: "web-development",
		title: "Websites that do a job",
		outcome: "A site that loads fast and converts, not a brochure.",
		body: "Marketing sites, portfolios, and company sites where performance and search visibility are part of the build rather than a phase afterwards. Fixed-price tiers are on the Plans page, so you know the number before we talk.",
		delivers: [
			"Next.js or WordPress, chosen by who maintains it after",
			"Technical SEO built in — schema, sitemaps, OG images",
			"Real Core Web Vitals, not a Lighthouse screenshot",
			"CMS setup so you can edit without calling me",
		],
		icon: "ri-code-s-slash-line",
		proof: ["risbyhomes", "quantumfunding", "votingbuddy"],
	},
	{
		slug: "mobile-apps",
		title: "Mobile apps, shipped to the store",
		outcome: "Your app is in the App Store — not in review limbo.",
		body: "Native SwiftUI where the platform matters and Flutter or React Native where reach matters. Getting an app built is the easy half; getting it through review and out to users is where most projects stall, so that's included.",
		delivers: [
			"SwiftUI, Flutter, or React Native",
			"Offline, push, deep links, in-app purchase",
			"App Store and Play Store submission handled",
			"Companion marketing site where it helps",
		],
		icon: "ri-smartphone-line",
		proof: ["facemequiz", "glazeme", "madeinpk"],
	},
	{
		slug: "ai-integration",
		title: "AI that earns its place",
		outcome: "A feature that works, not a demo that impresses.",
		body: "Bringing language models and vision into products where they genuinely improve the thing — generation, classification, conversational support — and being honest with you when a simpler solution would do the job better and cheaper.",
		delivers: [
			"LLM features inside real product flows",
			"Conversational agents on web and WhatsApp",
			"Vision and classification where it fits",
			"Cost and latency budgeted before it ships",
		],
		icon: "ri-sparkling-2-line",
		proof: ["glazeme", "plant-scanner-app", "whatsapp-ai-chatbot"],
	},
]

/** The three-pillar summary on the home page. */
export const pillars = [
	{
		icon: "ri-compasses-2-line",
		title: "Design and build are the same conversation",
		body: "No spec thrown over a wall. The person choosing the layout is the person writing the component, so decisions get made once.",
	},
	{
		icon: "ri-stack-line",
		title: "Web and mobile from one plan",
		body: "Most products need both. Deciding that up front — instead of bolting mobile on later — is where the real time and money get saved.",
	},
	{
		icon: "ri-flight-takeoff-line",
		title: "Launch is part of the job",
		body: "Store review, DNS, analytics, the first bug reports. The engagement ends when it's live and working, not when the code is written.",
	},
]
