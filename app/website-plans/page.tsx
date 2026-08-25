import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { pageMetadata } from "@/lib/seo"
import SectionHead from "@/components/hm/SectionHead"
import FaqList from "@/components/hm/FaqList"
import Testimonials from "@/components/hm/Testimonials"
import ClosingCTA from "@/components/hm/ClosingCTA"

export const metadata = pageMetadata({
	title: "Website Plans & Pricing",
	description:
		"Fixed-price website packages from $199 — scope, timeline and cost stated up front. Business sites, portfolios, e-commerce stores and custom web apps.",
	path: "/website-plans",
	tag: "Pricing",
	ogTitle: "The price is on the page",
})

type Plan = {
	projectName: string
	tagline: string
	price: string
	billing: string
	timeline: string
	details: string
	features: string[]
	highlight?: boolean
}

const plans: Plan[] = [
	{
		projectName: "Starter Business Site",
		tagline: "Small businesses and personal brands",
		price: "$199",
		billing: "one-time",
		timeline: "1–2 weeks",
		details:
			"A clean five-page responsive site on Next.js. Domain setup, on-page SEO and a working contact form so enquiries actually reach you.",
		features: [
			"Up to 5 pages (Home, About, Services, Contact, Blog)",
			"Free domain name for 1 year",
			"Mobile responsive design",
			"On-page SEO setup",
			"Contact form + WhatsApp integration",
			"1 month of support after launch",
		],
	},
	{
		projectName: "Professional Portfolio",
		tagline: "Freelancers, designers and agencies",
		price: "$399",
		billing: "one-time",
		timeline: "2–3 weeks",
		details:
			"A portfolio site with custom branding, a project showcase and a CMS, so you can add work yourself without calling me every time.",
		features: [
			"Up to 10 pages with custom animation",
			"Free domain + premium hosting (1 year)",
			"Project showcase with galleries",
			"Blog with admin dashboard (CMS)",
			"Technical SEO + Google Analytics",
			"Social + WhatsApp integration",
			"3 months of support after launch",
		],
		highlight: true,
	},
	{
		projectName: "E-Commerce Store",
		tagline: "Selling products, taking payments",
		price: "$799",
		billing: "one-time",
		timeline: "3–5 weeks",
		details:
			"A complete store — catalogue, secure checkout, multiple payment gateways, and an admin panel for orders, stock and customers.",
		features: [
			"Unlimited products and categories",
			"Free domain + business hosting (1 year)",
			"Stripe / PayPal / JazzCash integration",
			"Admin dashboard for orders and inventory",
			"Customer accounts + order tracking",
			"Email notifications and invoices",
			"6 months of support after launch",
		],
	},
	{
		projectName: "Custom Web Application",
		tagline: "SaaS, dashboards, booking systems",
		price: "$1,499+",
		billing: "project-based",
		timeline: "6 weeks+",
		details:
			"Built around your business logic rather than a template — dashboards, booking systems, CRMs or a SaaS product. Scoped and quoted after a free call.",
		features: [
			"Custom UI/UX design from scratch",
			"Authentication and role management",
			"Database design + REST/GraphQL APIs",
			"Admin panel and analytics",
			"Cloud deployment (Vercel / AWS / DO)",
			"12 months of support and updates",
		],
	},
]

export default function WebsitePlans() {
	return (
		<Layout headerStyle={1} footerStyle={1}>
			<section className="hm-section hm-section--tight">
				<div className="hm-wrap">
					<div className="hm-narrow">
						<span className="hm-eyebrow">Pricing</span>
						<h1 className="hm-h1">
							The price is <span className="hm-accent">on the page</span>
						</h1>
						<p className="hm-lede">
							Most developers make you book a call to find out what anything costs.
							These four tiers cover the majority of website work, with scope and
							timeline stated up front. Product builds are quoted per project.
						</p>
					</div>
				</div>
			</section>

			<section className="hm-section hm-section--tight hm-section--sunk">
				<div className="hm-wrap">
					<div className="hm-plans" data-reveal data-reveal-stagger>
						{plans.map((p) => (
							<div
								className={`hm-plan${p.highlight ? " hm-plan--featured" : ""}`}
								key={p.projectName}
							>
								<span
									className={`hm-plan__flag${p.highlight ? "" : " hm-plan__flag--ghost"}`}
									aria-hidden={!p.highlight}
								>
									Most chosen
								</span>
								<h2 className="hm-h3">{p.projectName}</h2>
								<p className="hm-plan__price">{p.price}</p>
								<p className="hm-plan__for">
									{p.billing} &middot; {p.timeline}
								</p>
								<p
									className="hm-body"
									style={{ fontSize: ".92rem", marginBottom: "1.35rem" }}
								>
									{p.details}
								</p>
								<ul className="hm-plan__list">
									{p.features.map((f) => (
										<li key={f}>{f}</li>
									))}
								</ul>
								<Link
									href="/#contact"
									className={`hm-btn ${p.highlight ? "hm-btn--primary" : "hm-btn--ghost"}`}
								>
									Start this plan
								</Link>
							</div>
						))}
					</div>

					<p className="hm-mono hm-center hm-mt-sm" style={{ marginBottom: 0 }}>
						All tiers include the build, launch, and the support window listed.
						Hosting beyond year one is billed at cost.
					</p>
				</div>
			</section>

			<section className="hm-section hm-section--ruled">
				<div className="hm-wrap">
					<SectionHead
						eyebrow="Beyond these tiers"
						title={
							<>
								Products get <span className="hm-accent">quoted, not listed</span>
							</>
						}
						lede="Anything with accounts, payments, or a mobile app is too variable for a price tag. Those land between $1,500 and $8,000 depending on how much ships in v1 — and I'll give you the number after one call, not three."
						action={{ label: "Book that call", href: "/#contact" }}
					/>
				</div>
			</section>

			<Testimonials />
			<FaqList />

			<ClosingCTA
				title={
					<>
						Know which tier <span className="hm-accent">fits you</span>?
					</>
				}
				body="Tell me which one and what your site needs to do. If a cheaper tier would cover it, I'll point you there instead."
				secondary={{ label: "See the work", href: "/work" }}
			/>
		</Layout>
	)
}
