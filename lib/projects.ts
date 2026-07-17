/**
 * Portfolio project catalogue.
 *
 * Every project maps to a marketing "cover" image plus a gallery of app/website
 * screens under /assets/imgs/portfolio/<n>.png. Consumed by the /work grid +
 * lightbox (components/elements/PortfolioFilter + ProjectLightbox) and the home
 * Featured Work section (components/elements/PortfolioHighlights).
 */

export type ProjectCategory = "mobile" | "web" | "ai"

export interface Project {
	slug: string
	title: string
	tagline: string
	category: ProjectCategory
	tags: string[]
	/** External live link. Omit when the project isn't publicly linkable. */
	url?: string
	/** Image number used for the card thumbnail. */
	cover: number
	/** All image numbers for this project, shown in the lightbox. */
	gallery: number[]
	/** Surface on the home "Featured Work" section. */
	featured?: boolean
	description: string
}

/** Build the public path for a portfolio image by its number. */
export const projectImg = (n: number): string => `/assets/imgs/portfolio/${n}.png`

export const categories: { key: "all" | ProjectCategory; label: string }[] = [
	{ key: "all", label: "All Projects" },
	{ key: "mobile", label: "Mobile Apps" },
	{ key: "web", label: "Web" },
	{ key: "ai", label: "AI & Chatbots" },
]

export const categoryLabel: Record<ProjectCategory, string> = {
	mobile: "Mobile App",
	web: "Web",
	ai: "AI & Chatbot",
}

export const projects: Project[] = [
	{
		slug: "facemequiz",
		title: "FaceMeQuiz",
		tagline: "iOS memory & face-quiz game",
		category: "mobile",
		tags: ["iOS", "SwiftUI", "Game"],
		url: "https://facemequiz.com",
		cover: 1,
		gallery: [1, 2, 3, 4, 5, 6, 42, 43, 44, 45, 46],
		featured: true,
		description:
			"A playful iOS memory game with face-flip quizzes, quiz battles and daily challenges — from the app UI to the full marketing website.",
	},
	{
		slug: "glazeme",
		title: "GlazeMe",
		tagline: "AI compliments & real-money gifting",
		category: "mobile",
		tags: ["iOS", "AI", "Payments"],
		url: "https://glazeme.com",
		cover: 7,
		gallery: [7, 8, 9, 10, 11, 47, 48, 49, 50, 51, 52],
		featured: false,
		description:
			"An iOS social app that turns AI-generated compliments into real-money gifts, complete with wallet, top-ups and a companion website.",
	},
	{
		slug: "madeinpk",
		title: "MadeInPK",
		tagline: "B2B textile trading marketplace",
		category: "mobile",
		tags: ["iOS", "Android", "Marketplace"],
		url: "https://made-in-pk.com",
		cover: 12,
		gallery: [12, 13, 14, 15, 16, 53, 54, 55, 56, 57, 58],
		featured: true,
		description:
			"Pakistan's verified B2B textile marketplace — audited sellers, secure escrow payments and in-app deal chat across mobile apps and web.",
	},
	{
		slug: "food-order-app",
		title: "Food Order App",
		tagline: "Location-based restaurant ordering",
		category: "mobile",
		tags: ["Flutter", "Cross-platform"],
		cover: 17,
		gallery: [17],
		description:
			"A Flutter food-ordering app that surfaces nearby food points and lets users order from their zone.",
	},
	{
		slug: "free-chat-app",
		title: "Free Chat Freedom",
		tagline: "Anonymous location messaging",
		category: "mobile",
		tags: ["Flutter", "Realtime"],
		cover: 18,
		gallery: [18],
		description: "A messaging app that lets people place and discover messages anywhere, freely.",
	},
	{
		slug: "plant-scanner-app",
		title: "Plant Scanner",
		tagline: "AI plant-disease diagnosis",
		category: "mobile",
		tags: ["Flutter", "AI", "Vision"],
		cover: 19,
		gallery: [19],
		description: "Scan a plant and get answers about diseases and care using on-device AI vision.",
	},
	{
		slug: "employee-wordplaze",
		title: "Employee Wordplaze",
		tagline: "Team & employee management",
		category: "mobile",
		tags: ["Flutter", "Business"],
		cover: 20,
		gallery: [20],
		description: "A business app for managing employee profiles, workplace data and team performance.",
	},
	{
		slug: "wecinema",
		title: "WeCinema",
		tagline: "Video marketplace platform",
		category: "web",
		tags: ["Next.js", "Marketplace"],
		url: "https://wecinema.co",
		cover: 21,
		gallery: [21, 22, 23, 24, 25, 26, 27, 28, 29],
		featured: true,
		description:
			"A full video marketplace where creators buy, sell and share work — end-to-end product build and business website.",
	},
	{
		slug: "paintedbyus",
		title: "PaintedByUs",
		tagline: "A home for human art",
		category: "web",
		tags: ["Next.js", "E-commerce"],
		cover: 30,
		gallery: [30, 31, 32, 33, 34, 35],
		description: "An art marketplace connecting collectors with human-made, commissioned artwork.",
	},
	{
		slug: "visualsblaze",
		title: "VisualsBlaze",
		tagline: "Graphic-artist portfolio",
		category: "web",
		tags: ["Web", "Portfolio"],
		url: "https://visualsblaze.com",
		cover: 36,
		gallery: [36, 37, 38, 39, 40, 41],
		description: "A bold personal portfolio site for a graphic and motion designer.",
	},
	{
		slug: "risbyhomes",
		title: "Risby Homes",
		tagline: "Property development & sales",
		category: "web",
		tags: ["WordPress", "Real Estate"],
		url: "https://risbyhomes.co.uk",
		cover: 59,
		gallery: [59, 60, 61, 62, 63, 64, 65, 73],
		featured: true,
		description:
			"A property-development brand site — from concept to conversion — showcasing homes and communities.",
	},
	{
		slug: "zynhive",
		title: "ZynHive",
		tagline: "Software agency site",
		category: "web",
		tags: ["Next.js", "Agency"],
		url: "https://zynhive.com",
		cover: 66,
		gallery: [66, 67, 68, 69, 70, 71, 72],
		description: "Clean code, smart design, real results — a modern software agency website.",
	},
	{
		slug: "brightfunded",
		title: "BrightFunded Trader",
		tagline: "Prop-firm trading platform",
		category: "web",
		tags: ["Next.js", "Fintech"],
		url: "https://brightfundedtraders.com",
		cover: 74,
		gallery: [74, 75, 76],
		description: "A prop-trading firm site engineered to support and fund traders.",
	},
	{
		slug: "quantumfunding",
		title: "QuantumFunding Traders",
		tagline: "Funded-trader platform",
		category: "web",
		tags: ["Next.js", "Fintech"],
		url: "https://quantumfundingtraders.com",
		cover: 77,
		gallery: [77, 78, 79, 80, 81],
		description: "A funded-trader platform with challenges, dashboards and a high-impact marketing site.",
	},
	{
		slug: "votingbuddy",
		title: "VottingBuddy",
		tagline: "Political-match web app",
		category: "web",
		tags: ["Next.js", "Web App"],
		url: "https://votingbuddy.com",
		cover: 82,
		gallery: [82, 83, 84, 85, 86, 87],
		description: "A fast, reliable tool that helps voters discover and compare their political match.",
	},
	{
		slug: "landbot-chatbot",
		title: "Family-Planning Chatbot",
		tagline: "GPT-powered guidance bot",
		category: "ai",
		tags: ["Landbot", "GPT", "NLP"],
		cover: 88,
		gallery: [88, 89, 90],
		description: "A GPT-powered conversational chatbot delivering sensitive family-planning guidance.",
	},
	{
		slug: "whatsapp-ai-chatbot",
		title: "AI WhatsApp Chatbot",
		tagline: "Conversational assistant",
		category: "ai",
		tags: ["WhatsApp", "GPT", "Automation"],
		cover: 91,
		gallery: [91],
		description: "An AI conversational assistant that handles customer chats end-to-end on WhatsApp.",
	},
	// Existing client sites (kept & updated — reuse current thumbnails, no new mockups)
	{
		slug: "xiaomi-store",
		title: "Xiaomi Store",
		tagline: "E-commerce storefront",
		category: "web",
		tags: ["E-commerce", "Web"],
		url: "https://xiaomi.kg",
		cover: -8,
		gallery: [-8],
		description: "A full e-commerce storefront for a Xiaomi retail brand.",
	},
	{
		slug: "betto-lettings",
		title: "Betto Lettings",
		tagline: "Property lettings platform",
		category: "web",
		tags: ["WordPress", "Real Estate"],
		url: "https://bettolettings.co.uk",
		cover: -6,
		gallery: [-6],
		description: "A property-lettings website for a UK letting agency.",
	},
]

/**
 * Resolve an image number to its path. Positive numbers map to the new
 * portfolio set; negatives map to the legacy `projects-1/<n>.png` thumbnails
 * kept for the two existing client sites.
 */
export const resolveImg = (n: number): string =>
	n < 0 ? `/assets/imgs/projects/projects-1/${-n}.png` : projectImg(n)

export const featuredProjects = projects.filter((p) => p.featured)
