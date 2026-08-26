import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Layout from "@/components/layout/Layout"
import ClosingCTA from "@/components/hm/ClosingCTA"
import Testimonials from "@/components/hm/Testimonials"
import { CaseStudyJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd"
import { pageMetadata, absoluteUrl } from "@/lib/seo"
import { caseStudies, getCaseStudy, getCaseStudyProject } from "@/lib/caseStudies"
import { resolveImg } from "@/lib/projects"
import { SITE } from "@/lib/seo"

export function generateStaticParams() {
	return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params
	const cs = getCaseStudy(slug)
	if (!cs) return {}
	return pageMetadata({
		title: `${cs.navLabel} case study`,
		description: cs.summary,
		path: `/case-studies/${cs.slug}`,
		tag: "Case study",
		ogTitle: cs.title,
	})
}

export default async function CaseStudyPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const cs = getCaseStudy(slug)
	if (!cs) notFound()

	const project = getCaseStudyProject(cs.slug)
	const others = caseStudies.filter((c) => c.slug !== cs.slug)

	return (
		<Layout headerStyle={1} footerStyle={1}>
			<CaseStudyJsonLd
				slug={cs.slug}
				title={cs.title}
				summary={cs.summary}
				image={resolveImg(cs.gallery[0])}
				year={cs.year}
				stack={cs.stack}
				projectUrl={project?.url}
			/>
			<BreadcrumbJsonLd
				trail={[
					{ name: "Work", path: "/work" },
					{ name: cs.navLabel, path: `/case-studies/${cs.slug}` },
				]}
			/>

			{/* Hero */}
			<section className="hm-section hm-section--tight">
				<div className="hm-wrap">
					<Link href="/work" className="hm-back">
						<i className="ri-arrow-left-line" aria-hidden="true" />
						All work
					</Link>

					<div className="hm-cs-hero">
						<div>
							<span className="hm-eyebrow">{cs.kind}</span>
							<h1 className="hm-h1 hm-cs-hero__title">{cs.title}</h1>
							<p className="hm-lede">{cs.summary}</p>

							<div className="hm-actions">
								{project?.url && (
									<a
										href={project.url}
										target="_blank"
										rel="noopener noreferrer"
										className="hm-btn hm-btn--primary"
									>
										Visit {cs.navLabel}
										<i className="ri-arrow-right-up-line" />
									</a>
								)}
								<Link href="/#contact" className="hm-btn hm-btn--ghost">
									Book a Call
								</Link>
							</div>
						</div>

						<dl className="hm-cs-facts">
							<div>
								<dt>Year</dt>
								<dd>{cs.year}</dd>
							</div>
							<div>
								<dt>Platforms</dt>
								<dd>{cs.platforms.join(", ")}</dd>
							</div>
							<div>
								<dt>My role</dt>
								<dd>{cs.role.join(" · ")}</dd>
							</div>
							<div>
								<dt>Stack</dt>
								<dd>{cs.stack.join(", ")}</dd>
							</div>
						</dl>
					</div>
				</div>
			</section>

			{/* Lead image */}
			<section className="hm-section hm-section--tight hm-section--flush-t">
				<div className="hm-wrap">
					<div className="hm-cs-lead" data-reveal>
						<img src={resolveImg(cs.gallery[0])} alt={`${cs.navLabel} — overview`} />
					</div>
				</div>
			</section>

			{/* Context + challenge */}
			<section className="hm-section hm-section--ruled">
				<div className="hm-wrap">
					<div className="hm-cs-body">
						<div className="hm-cs-prose">
							<div className="hm-cs-block">
								<span className="hm-eyebrow">The situation</span>
								<h2 className="hm-h3">Context</h2>
								<p>{cs.context}</p>
							</div>
							<div className="hm-cs-block">
								<h2 className="hm-h3">The problem</h2>
								<p className="hm-cs-pull">{cs.challenge}</p>
							</div>
						</div>

						<aside className="hm-cs-aside">
							<h2 className="hm-cs-aside__title">What shipped</h2>
							<ul className="hm-cs-shipped">
								{cs.shipped.map((s) => (
									<li key={s}>{s}</li>
								))}
							</ul>
							{project?.url && (
								<a
									href={project.url}
									target="_blank"
									rel="noopener noreferrer"
									className="hm-cs-aside__link"
								>
									See it live
									<i className="ri-arrow-right-up-line" />
								</a>
							)}
						</aside>
					</div>
				</div>
			</section>

			{/* Constraints */}
			<section className="hm-section hm-section--tight hm-section--sunk">
				<div className="hm-wrap">
					<span className="hm-eyebrow">What made it hard</span>
					<h2 className="hm-h2" style={{ marginBottom: "2rem" }}>
						The <span className="hm-accent">constraints</span>
					</h2>
					<ul className="hm-cs-constraints" data-reveal data-reveal-stagger>
						{cs.constraints.map((c) => (
							<li key={c}>{c}</li>
						))}
					</ul>
				</div>
			</section>

			{/* Decisions — each with its cost stated */}
			<section className="hm-section">
				<div className="hm-wrap">
					<span className="hm-eyebrow">Key decisions</span>
					<h2 className="hm-h2">
						Every choice has a <span className="hm-accent">cost</span>
					</h2>
					<p className="hm-lede" style={{ marginBottom: "2.5rem" }}>
						The tradeoff is stated next to each decision, because a case study
						that only lists wins isn&apos;t telling you anything useful.
					</p>

					<div className="hm-decisions" data-reveal data-reveal-stagger>
						{cs.decisions.map((d, i) => (
							<article className="hm-decision" key={d.decision}>
								<span className="hm-decision__n">{String(i + 1).padStart(2, "0")}</span>
								<div className="hm-decision__main">
									<h3 className="hm-h3">{d.decision}</h3>
									<p className="hm-decision__why">{d.why}</p>
									<p className="hm-decision__tradeoff">
										<span>Tradeoff</span>
										{d.tradeoff}
									</p>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* Architecture + narrative */}
			<section className="hm-section hm-section--ruled">
				<div className="hm-wrap">
					<div className="hm-cs-prose hm-cs-prose--wide">
						<div className="hm-cs-block">
							<span className="hm-eyebrow">How it works</span>
							<h2 className="hm-h3">Architecture</h2>
							<p>{cs.architecture}</p>
							<div className="hm-tags" style={{ marginTop: "1.25rem" }}>
								{cs.stack.map((t) => (
									<span className="hm-tag" key={t}>
										{t}
									</span>
								))}
							</div>
						</div>

						{cs.sections.map((sec) => (
							<div className="hm-cs-block" key={sec.heading}>
								<h2 className="hm-h3">{sec.heading}</h2>
								<p>{sec.body}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Delivery phases */}
			<section className="hm-section hm-section--sunk">
				<div className="hm-wrap">
					<span className="hm-eyebrow">How it ran</span>
					<h2 className="hm-h2" style={{ marginBottom: "2.5rem" }}>
						Build <span className="hm-accent">timeline</span>
					</h2>
					<ol className="hm-phases" data-reveal data-reveal-stagger>
						{cs.phases.map((ph) => (
							<li className="hm-phase" key={ph.label}>
								<span className="hm-phase__label">{ph.label}</span>
								<div>
									<h3 className="hm-h3">{ph.title}</h3>
									<p>{ph.body}</p>
								</div>
							</li>
						))}
					</ol>
				</div>
			</section>

			{/* Gallery */}
			<section className="hm-section hm-section--sunk">
				<div className="hm-wrap">
					<h2 className="hm-h2" style={{ marginBottom: "2rem" }}>
						Screens from <span className="hm-accent">{cs.navLabel}</span>
					</h2>
					<div className="hm-cs-gallery" data-reveal data-reveal-stagger>
						{cs.gallery.slice(1).map((n) => (
							<figure key={n}>
								<img src={resolveImg(n)} alt={`${cs.navLabel} screen`} loading="lazy" />
							</figure>
						))}
					</div>
				</div>
			</section>

			<Testimonials />

			{/* Retrospective */}
			<section className="hm-section hm-section--ruled">
				<div className="hm-wrap">
					<div className="hm-reflect" data-reveal>
						<span className="hm-eyebrow">In hindsight</span>
						<h2 className="hm-h2">
							What I&apos;d do <span className="hm-accent">differently</span>
						</h2>
						<p>{cs.reflection}</p>
					</div>
				</div>
			</section>

			{/* Other case studies */}
			<section className="hm-section hm-section--ruled">
				<div className="hm-wrap">
					<h2 className="hm-h2" style={{ marginBottom: "2rem" }}>
						Other <span className="hm-accent">case studies</span>
					</h2>
					<div className="hm-work">
						{others.map((o) => (
							<article className="hm-card" key={o.slug}>
								<Link href={`/case-studies/${o.slug}`} className="hm-card__media">
									<img src={resolveImg(o.gallery[0])} alt={o.navLabel} loading="lazy" />
								</Link>
								<div className="hm-card__body">
									<span className="hm-card__meta">{o.kind}</span>
									<h3 className="hm-h3">
										<Link href={`/case-studies/${o.slug}`} className="hm-card__link">
											{o.navLabel}
										</Link>
									</h3>
									<p>{o.summary}</p>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			<ClosingCTA
				title={
					<>
						Want something built <span className="hm-accent">like this</span>?
					</>
				}
				body="Tell me what you're making and who it's for. I'll tell you the smallest version worth shipping — and what it costs."
				secondary={{ label: "See all work", href: "/work" }}
			/>
		</Layout>
	)
}
