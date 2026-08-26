import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { pageMetadata } from "@/lib/seo"
import { plans, MAINTENANCE } from "@/lib/plans"
import SectionHead from "@/components/hm/SectionHead"
import FaqList from "@/components/hm/FaqList"
import Testimonials from "@/components/hm/Testimonials"
import ClosingCTA from "@/components/hm/ClosingCTA"
import { PlansJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd"

export const metadata = pageMetadata({
	title: "Website Plans & Pricing",
	description:
		"Fixed-price website packages from $499 — scope, timeline and cost stated up front. Business sites, portfolios, stores and custom web apps.",
	path: "/website-plans",
	tag: "Pricing",
	ogTitle: "The price is on the page",
})


export default function WebsitePlans() {
	return (
		<Layout headerStyle={1} footerStyle={1}>
			<PlansJsonLd />
			<BreadcrumbJsonLd trail={[{ name: "Website Plans", path: "/website-plans" }]} />
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
							timeline stated up front, plus a monthly care plan if you want me to
							keep it running. Product builds are quoted per project.
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

					<p className="hm-mono hm-center hm-mt-sm">
						All tiers include the build, launch, and the support window listed.
						Hosting beyond year one is billed at cost.
					</p>

					{/* The recurring line. Sits under the grid, not inside it — a
					    retainer is a different kind of thing from a one-off build. */}
					<div className="hm-care hm-mt" data-reveal>
						<div>
							<span className="hm-care__flag">Optional, ongoing</span>
							<h2 className="hm-h3">{MAINTENANCE.name}</h2>
							<p className="hm-care__price">
								{MAINTENANCE.price}
								<span className="hm-care__per"> /month</span>
							</p>
							<p className="hm-care__for">{MAINTENANCE.tagline}</p>
							<p className="hm-body" style={{ fontSize: ".92rem" }}>
								{MAINTENANCE.details}
							</p>
							<p className="hm-care__terms">{MAINTENANCE.terms}</p>
						</div>

						<div>
							<ul className="hm-care__list">
								{MAINTENANCE.features.map((f) => (
									<li key={f}>{f}</li>
								))}
							</ul>
							<Link
								href="/#contact"
								className="hm-btn hm-btn--ghost hm-mt-sm"
								style={{ marginTop: "1.75rem" }}
							>
								Add the care plan
								<i className="ri-arrow-right-line" aria-hidden="true" />
							</Link>
						</div>
					</div>
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
						lede="Anything with accounts, payments, or a mobile app is too variable for a price tag. Those land between $4,000 and $20,000 depending on how much ships in v1 — and I'll give you the number after one call, not three."
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
