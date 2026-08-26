import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { pageMetadata } from "@/lib/seo"
import { services } from "@/lib/services"
import { projects } from "@/lib/projects"
import SectionHead from "@/components/hm/SectionHead"
import ProcessList from "@/components/hm/ProcessList"
import Testimonials from "@/components/hm/Testimonials"
import FaqList from "@/components/hm/FaqList"
import ClosingCTA from "@/components/hm/ClosingCTA"
import Metrics from "@/components/hm/Metrics"
import { ServicesJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd"

export const metadata = pageMetadata({
	title: "Services",
	description:
		"End-to-end product builds, websites, mobile apps and AI integration — designed, built and launched by one person instead of an agency team.",
	path: "/services",
	tag: "Services",
	ogTitle: "Hire the whole team, as one person",
})

/** Look up the projects that prove a given service. */
const proofFor = (slugs: string[]) =>
	slugs.map((s) => projects.find((p) => p.slug === s)).filter(Boolean)

export default function Services() {
	return (
		<Layout headerStyle={1} footerStyle={1}>
			<ServicesJsonLd />
			<BreadcrumbJsonLd trail={[{ name: "Services", path: "/services" }]} />
			<section className="hm-section hm-section--tight">
				<div className="hm-wrap">
					<div className="hm-narrow">
						<span className="hm-eyebrow">Services</span>
						<h1 className="hm-h1">
							Hire the whole team,{" "}
							<span className="hm-accent">as one person</span>
						</h1>
						<p className="hm-lede">
							Design, web, mobile and backend are four hires at an agency and four
							invoices on your side. Here they&apos;re one conversation — which is
							why things ship in weeks rather than quarters.
						</p>
						<div className="hm-actions">
							<Link href="/#contact" className="hm-btn hm-btn--primary">
								Book a Call
								<i className="ri-arrow-right-line" />
							</Link>
							<Link href="/website-plans" className="hm-btn hm-btn--ghost">
								Fixed-price website tiers
							</Link>
						</div>
					</div>

					<div className="hm-mt">
						<Metrics />
					</div>
				</div>
			</section>

			<section className="hm-section hm-section--ruled">
				<div className="hm-wrap">
					<SectionHead
						eyebrow="What I take on"
						title={
							<>
								Four kinds of work, <span className="hm-accent">one owner</span>
							</>
						}
						lede="Each of these is proven by something in the portfolio you can open and use."
					/>

					<div className="hm-services" data-reveal data-reveal-stagger>
						{services.map((s) => {
							const proof = proofFor(s.proof)
							return (
								<article className="hm-service" key={s.slug} id={s.slug}>
									<div>
										<div className="hm-service__title">
											<i className={s.icon} aria-hidden="true" />
											<h2 className="hm-h3">{s.title}</h2>
										</div>
										<p className="hm-service__outcome">{s.outcome}</p>

										{proof.length > 0 && (
											<div className="hm-tags" style={{ marginTop: "1.1rem" }}>
												{proof.map((p) =>
													p!.url ? (
														<a
															key={p!.slug}
															className="hm-tag"
															href={p!.url}
															target="_blank"
															rel="noopener noreferrer"
															style={{ textDecoration: "none" }}
														>
															{p!.title} ↗
														</a>
													) : (
														<span key={p!.slug} className="hm-tag">
															{p!.title}
														</span>
													),
												)}
											</div>
										)}
									</div>

									<div>
										<p className="hm-body">{s.body}</p>
										<ul className="hm-service__list">
											{s.delivers.map((d) => (
												<li key={d}>{d}</li>
											))}
										</ul>
									</div>
								</article>
							)
						})}
					</div>
				</div>
			</section>

			<ProcessList />
			<Testimonials />
			<FaqList />

			<ClosingCTA
				title={
					<>
						Not sure which of these <span className="hm-accent">you need</span>?
					</>
				}
				body="Describe the product in a couple of sentences. I'll tell you what it actually takes to launch it — and if it's outside what I should be doing, I'll say that too."
				secondary={{ label: "See the work", href: "/work" }}
			/>
		</Layout>
	)
}
