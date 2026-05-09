import { Fragment } from "react"
import type { Metadata } from "next"
import Layout from "@/components/layout/Layout"
import ProposalCover from "@/components/proposal/ProposalCover"
import FeaturesGrid from "@/components/proposal/FeaturesGrid"
import PagesList from "@/components/proposal/PagesList"
import Reveal from "@/components/proposal/Reveal"
import { proposalData } from "@/util/proposalData"

export const metadata: Metadata = {
	title: "Project Proposal — Art Marketplace",
	description: "Private project proposal for ArtSpace.",
	robots: { index: false, follow: false },
}

export default function ArtMarketplaceProposal() {
	const {
		cover,
		vision,
		features,
		pages,
		whyNow,
		market,
		revenue,
		comparison,
		visionFuture,
		bentoBenefits,
		imagine,
		tech,
		timeline,
		design,
	} = proposalData

	return (
		<Layout headerStyle={1} footerStyle={1}>
			<link
				href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap"
				rel="stylesheet"
			/>
			<link rel="stylesheet" href="/styles/proposal.css" />

			<div className="proposal-doc">
				{/* COVER */}
				<ProposalCover {...cover} />

				{/* PAGE 1 — VISION & FEATURES */}
				<div className="page">
					{/* Vision Section */}
					<Reveal>
						<div className="sec-eyebrow">{vision.eyebrow}</div>
						<h2 className="sec-title">{vision.title}</h2>
					</Reveal>

					<Reveal delay={120}>
						<div className="overview-box">
							<p className="overview-text">{vision.overview}</p>
						</div>
					</Reveal>

					<div className="two-col">
						<Reveal variant="left" delay={80}>
							<div className="col-card col-card-blue">
								<div className="col-card-label col-card-label-blue">{vision.problemCard.label}</div>
								<div className="col-card-title">{vision.problemCard.title}</div>
								<p>{vision.problemCard.description}</p>
							</div>
						</Reveal>
						<Reveal variant="right" delay={160}>
							<div className="col-card col-card-pink">
								<div className="col-card-label col-card-label-pink">{vision.answerCard.label}</div>
								<div className="col-card-title">{vision.answerCard.title}</div>
								<p>{vision.answerCard.description}</p>
							</div>
						</Reveal>
					</div>

					<hr className="page-divider" />

					{/* Why Now — 3-step narrative */}
					<Reveal>
						<div className="sec-eyebrow">{whyNow.eyebrow}</div>
						<h2 className="sec-title">{whyNow.title}</h2>
					</Reveal>

					<Reveal delay={100}>
						<p style={{ fontSize: 14, color: "var(--ink-light)", lineHeight: 1.75, marginBottom: 28, maxWidth: 680 }}>
							{whyNow.description}
						</p>
					</Reveal>

					<Reveal delay={150}>
						<div className="why-now-grid">
							{whyNow.steps.map((step, i) => (
								<Fragment key={i}>
									<div className={`why-step ${step.variant === 'warm' ? 'warm' : ''}`}>
										<div className="why-num">{step.num}</div>
										<div className="why-stat" dangerouslySetInnerHTML={{ __html: step.stat }} />
										<div className="why-headline">{step.headline}</div>
										<p className="why-body">{step.body}</p>
									</div>
									{i < whyNow.steps.length - 1 && (
										<div className="why-arrow" aria-hidden="true">
											<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
												<path d="M5 12h14M13 6l6 6-6 6" />
											</svg>
										</div>
									)}
								</Fragment>
							))}
						</div>
					</Reveal>

					<hr className="page-divider" />

					{/* Features Section */}
					<Reveal>
						<div className="sec-eyebrow">{features.eyebrow}</div>
						<h2 className="sec-title">{features.title}</h2>
					</Reveal>
					<Reveal delay={120}>
						<FeaturesGrid features={features.items} />
					</Reveal>

					<hr className="page-divider" />

					{/* Pages Section */}
					<Reveal>
						<div className="sec-eyebrow">{pages.eyebrow}</div>
						<h2 className="sec-title">{pages.title}</h2>
					</Reveal>
					<Reveal delay={120}>
						<PagesList pages={pages.items} />
					</Reveal>
				</div>

				{/* PAGE 2 — MARKET & BUSINESS */}
				<div className="page" style={{ paddingTop: 48 }}>
					{/* Market Opportunity */}
					<Reveal>
						<div className="sec-eyebrow">{market.eyebrow}</div>
						<h2 className="sec-title">{market.title}</h2>
					</Reveal>

					<Reveal delay={100}>
						<p style={{ fontSize: 14, color: "var(--ink-light)", lineHeight: 1.75, marginBottom: 28, maxWidth: 680 }}>
							{market.description}
						</p>
					</Reveal>

					<div className="stats-grid">
						{market.stats.map((stat, i) => (
							<Reveal key={i} variant="scale" delay={i * 80}>
								<div className="stat-card">
									<div className="stat-num" dangerouslySetInnerHTML={{ __html: stat.value }} />
									<div className="stat-label">{stat.label}</div>
									<div className="stat-source">{stat.source}</div>
								</div>
							</Reveal>
						))}
					</div>

					<Reveal>
						<div className="market-callout">
							<div className="market-callout-label">The Window Is Open Right Now</div>
							<p className="market-callout-text">{market.callout}</p>
						</div>
					</Reveal>

					<hr className="page-divider" />

					{/* Revenue Streams */}
					<Reveal>
						<div className="sec-eyebrow">{revenue.eyebrow}</div>
						<h2 className="sec-title">{revenue.title}</h2>
					</Reveal>

					<Reveal delay={100}>
						<p style={{ fontSize: 14, color: "var(--ink-light)", lineHeight: 1.75, marginBottom: 28, maxWidth: 680 }}>
							{revenue.description}
						</p>
					</Reveal>

					<div className="revenue-grid">
						{revenue.streams.map((stream, i) => (
							<Reveal key={i} delay={(i % 2) * 80}>
								<div className="revenue-card">
									<div className="revenue-card-head">
										<div className="revenue-card-title">{stream.title}</div>
										<span className={`revenue-tag revenue-tag-${stream.tag.variant}`}>{stream.tag.text}</span>
									</div>
									<p>{stream.description}</p>
									<div className="revenue-figure">{stream.figure}</div>
								</div>
							</Reveal>
						))}
					</div>

					<hr className="page-divider" />

					{/* Projections */}
					<Reveal>
						<div className="sec-eyebrow">06 — Asset Value</div>
						<h2 className="sec-title">What This Becomes,<br /><em>Year By Year</em></h2>
					</Reveal>

					<Reveal delay={100}>
						<p style={{ fontSize: 14, color: "var(--ink-light)", lineHeight: 1.75, marginBottom: 28, maxWidth: 680 }}>
							The numbers below are deliberately conservative — based on comparable marketplace launches in adjacent niches. Marketplaces are valued on GMV (Gross Merchandise Value) and recurring revenue, both of which compound with every artist added.
						</p>
					</Reveal>

					<div className="projection-grid">
						<Reveal variant="left" delay={60}>
							<div className="projection-card">
								<div className="proj-year">Year 1 — Foundation</div>
								<div className="proj-headline">Lean launch, first traction</div>
								<div className="proj-metric"><span className="proj-metric-label">Active Artists</span><span className="proj-metric-value">~250</span></div>
								<div className="proj-metric"><span className="proj-metric-label">Listings</span><span className="proj-metric-value">~2,000</span></div>
								<div className="proj-metric"><span className="proj-metric-label">GMV</span><span className="proj-metric-value">$60K–$120K</span></div>
								<div className="proj-metric"><span className="proj-metric-label">Net revenue</span><span className="proj-metric-value">$8K–$18K</span></div>
							</div>
						</Reveal>

						<Reveal variant="up" delay={150}>
							<div className="projection-card year2">
								<div className="proj-year">Year 2 — Growth</div>
								<div className="proj-headline">Compounding network effect</div>
								<div className="proj-metric"><span className="proj-metric-label">Active Artists</span><span className="proj-metric-value">~1,500</span></div>
								<div className="proj-metric"><span className="proj-metric-label">Listings</span><span className="proj-metric-value">~12,000</span></div>
								<div className="proj-metric"><span className="proj-metric-label">GMV</span><span className="proj-metric-value">$500K–$900K</span></div>
								<div className="proj-metric"><span className="proj-metric-label">Net revenue</span><span className="proj-metric-value">$70K–$140K</span></div>
							</div>
						</Reveal>

						<Reveal variant="right" delay={240}>
							<div className="projection-card year3">
								<div className="proj-year">Year 3 — Scale</div>
								<div className="proj-headline">Established, defensible asset</div>
								<div className="proj-metric"><span className="proj-metric-label">Active Artists</span><span className="proj-metric-value">~6,000</span></div>
								<div className="proj-metric"><span className="proj-metric-label">Listings</span><span className="proj-metric-value">~50,000</span></div>
								<div className="proj-metric"><span className="proj-metric-label">GMV</span><span className="proj-metric-value">$3M–$6M</span></div>
								<div className="proj-metric"><span className="proj-metric-label">Net revenue</span><span className="proj-metric-value">$400K–$800K</span></div>
							</div>
						</Reveal>
					</div>

					<Reveal delay={120}>
						<div className="exit-box">
							<div className="exit-title">Asset Value at <em>Year 3</em></div>
							<p className="exit-text">
								Marketplaces with strong GMV and recurring revenue typically transact at <strong style={{ color: "var(--ink)" }}>4–8× annual revenue</strong>. At a conservative Year 3 net revenue of $400K–$800K, the platform itself becomes a <strong style={{ color: "var(--ink)" }}>$2M–$6M asset</strong> — independent of cash already earned. This is the real prize: building something that has standalone value beyond its monthly income.
							</p>
							<p className="exit-text" style={{ marginBottom: 16 }}>
								Possible acquisition or investor interest naturally comes from companies already serving the creator economy:
							</p>
							<div className="exit-buyers">
								{['Etsy', 'Shopify', 'Adobe', 'Saatchi Art', 'Squarespace', 'Print-on-demand groups', 'Gallery chains', 'Creator-economy VCs'].map((buyer, i) => (
									<span key={i} className="exit-pill">{buyer}</span>
								))}
							</div>
						</div>
					</Reveal>

					<hr className="page-divider" />

					{/* Competitive Edge — Score Bars */}
					<Reveal>
						<div className="sec-eyebrow">{comparison.eyebrow}</div>
						<h2 className="sec-title">{comparison.title}</h2>
					</Reveal>

					<Reveal delay={100}>
						<p style={{ fontSize: 14, color: "var(--ink-light)", lineHeight: 1.75, marginBottom: 28, maxWidth: 680 }}>
							{comparison.description}
						</p>
					</Reveal>

					<Reveal delay={150}>
						<div className="compare-scores">
							{comparison.competitors.map((comp, i) => (
								<div key={i} className={`compare-score-row ${comp.isUs ? 'us' : ''}`}>
									<div className="compare-score-name">
										{comp.name}
										<small>{comp.detail}</small>
									</div>
									<div className="compare-score-bar">
										<div
											className={`compare-score-fill ${comp.fillVariant}`}
											style={{ '--score-width': `${comp.score * 10}%` } as React.CSSProperties}
										/>
									</div>
									<div className="compare-score-num">
										{comp.score}<small> /10</small>
									</div>
								</div>
							))}
						</div>
					</Reveal>

					<div className="value-pillars">
						{[
							{ icon: 'A', title: 'Defensible Niche', desc: '"Verified human-made" is not a feature anyone else can copy without rebuilding their core. It is a position, and positions are durable.' },
							{ icon: 'B', title: 'Network Effect', desc: 'Each artist brings their own audience. Each buyer browses many artists. Both sides grow each other — the standard marketplace flywheel.' },
							{ icon: 'C', title: 'Low Operating Cost', desc: 'No inventory. No shipping desk. Artists fulfill their own pieces. The platform stays lean — most revenue flows to margin.' },
							{ icon: 'D', title: 'Brand-Led Growth', desc: 'A clean, gallery-feeling brand attracts press, Instagram features, and word-of-mouth far cheaper than paid ads. The aesthetic is the marketing.' },
						].map((pillar, i) => (
							<Reveal key={i} variant="scale" delay={i * 80}>
								<div className="pillar">
									<div className={`pillar-icon pillar-icon-${i % 2 === 0 ? 'blue' : 'pink'}`}>{pillar.icon}</div>
									<div>
										<div className="pillar-title">{pillar.title}</div>
										<p className="pillar-desc">{pillar.desc}</p>
									</div>
								</div>
							</Reveal>
						))}
					</div>

					<hr className="page-divider" />

					{/* Future Vision — 12/24/36 months */}
					<Reveal>
						<div className="sec-eyebrow">{visionFuture.eyebrow}</div>
						<h2 className="sec-title">{visionFuture.title}</h2>
					</Reveal>

					<Reveal delay={100}>
						<p style={{ fontSize: 14, color: "var(--ink-light)", lineHeight: 1.75, marginBottom: 28, maxWidth: 680 }}>
							{visionFuture.description}
						</p>
					</Reveal>

					<div className="future-grid">
						{visionFuture.cards.map((card, i) => (
							<Reveal key={i} variant="up" delay={i * 120}>
								<div className={`future-card ${card.variant === 'warm' ? 'warm' : ''} ${card.variant === 'peak' ? 'peak' : ''}`}>
									<div className="future-marker">{card.marker}</div>
									<div className="future-headline">{card.headline}</div>
									<p className="future-body">{card.body}</p>
								</div>
							</Reveal>
						))}
					</div>

					<hr className="page-divider" />

					{/* Bento Benefits */}
					<Reveal>
						<div className="sec-eyebrow">{bentoBenefits.eyebrow}</div>
						<h2 className="sec-title">{bentoBenefits.title}</h2>
					</Reveal>

					<Reveal delay={100}>
						<p style={{ fontSize: 14, color: "var(--ink-light)", lineHeight: 1.75, marginBottom: 28, maxWidth: 680 }}>
							{bentoBenefits.description}
						</p>
					</Reveal>

					<div className="benefits-bento">
						{bentoBenefits.items.map((item, i) => (
							<Reveal key={i} variant="scale" delay={i * 90} className={`${item.span}${item.tall ? ' tall' : ''}`}>
								<div className={`benefit-bento-card ${item.variant}`}>
									<div>
										<span className="bento-tag">{item.tag}</span>
										{item.stat && <div className="bento-stat">{item.stat}</div>}
										<div className="bento-title">{item.title}</div>
									</div>
									<p className="bento-desc">{item.description}</p>
								</div>
							</Reveal>
						))}
					</div>

					<hr className="page-divider" />

					{/* Imagine — Motivational banner */}
					<Reveal variant="scale">
						<div className="imagine-banner">
							<div className="imagine-label">{imagine.label}</div>
							<h3 className="imagine-headline">{imagine.headline}</h3>
							<p className="imagine-body">{imagine.body}</p>
						</div>
					</Reveal>
				</div>

				{/* PAGE 3 — TECHNICAL & CLOSING */}
				<div className="page" style={{ paddingTop: 0 }}>
					<hr className="page-divider" style={{ marginTop: 0 }} />

					{/* Tech Stack */}
					<Reveal>
						<div className="sec-eyebrow">{tech.eyebrow}</div>
						<h2 className="sec-title">{tech.title}</h2>
					</Reveal>

					<div style={{ marginBottom: 48 }}>
						{tech.stack.map((item, i) => (
							<Reveal key={i} variant="left" delay={i * 70}>
								<div className="tech-row">
									<div className="tech-layer-label">{item.layer}</div>
									<div className="tech-name">{item.name}</div>
									<div className="tech-why">{item.why}</div>
									<span className={`tech-badge tb-${item.badgeVariant}`}>{item.badge}</span>
								</div>
							</Reveal>
						))}
					</div>

					<hr className="page-divider" />

					{/* Design */}
					<Reveal>
						<div className="sec-eyebrow">{design.eyebrow}</div>
						<h2 className="sec-title">{design.title}</h2>
					</Reveal>

					<Reveal delay={120}>
						<div className="design-palette">
							{design.colors.map((color, i) => (
								<div key={i} className="swatch">
									<div className="swatch-circle" style={{ background: color.hex }} />
									<div className="swatch-name">{color.name}</div>
								</div>
							))}
						</div>
					</Reveal>

					<div className="two-col" style={{ marginTop: 20 }}>
						<Reveal variant="left" delay={80}>
							<div className="col-card col-card-blue">
								<div className="col-card-label col-card-label-blue">Visual Identity</div>
								<div className="col-card-title">Soft, airy, gallery-like</div>
								<p>Light backgrounds. Generous white space. Artwork takes center stage — the interface steps back and lets the art breathe. A leaf motif in the top-left corner gives the brand a gentle, organic signature.</p>
							</div>
						</Reveal>
						<Reveal variant="right" delay={160}>
							<div className="col-card col-card-pink">
								<div className="col-card-label col-card-label-pink">Typography</div>
								<div className="col-card-title">Cormorant + DM Sans</div>
								<p>A refined serif for headings gives the platform a fine-art gallery feeling. A clean sans-serif for body text keeps reading comfortable and modern. Together they feel both elegant and accessible.</p>
							</div>
						</Reveal>
					</div>

					<hr className="page-divider" />

					{/* Timeline */}
					<Reveal>
						<div className="sec-eyebrow">{timeline.eyebrow}</div>
						<h2 className="sec-title">{timeline.title}</h2>
					</Reveal>

					<div className="timeline">
						{timeline.phases.map((phase, i) => (
							<Reveal key={i} variant="left" delay={i * 100}>
								<div className="tl-item">
									<div className={`tl-dot tl-dot-${phase.dotVariant}`} />
									<div className="tl-phase">{phase.phase}</div>
									<div className="tl-title">{phase.title}</div>
									<p className="tl-desc">{phase.description}</p>
								</div>
							</Reveal>
						))}
					</div>

					<hr className="page-divider" />

					{/* Closing */}
					<Reveal>
						<div className="sec-eyebrow">12 — Our Commitment</div>
					</Reveal>
					<Reveal variant="scale" delay={120}>
						<div className="closing-box">
							<div className="closing-title">Simplicity is the point.<br />The art does the talking.</div>
							<p className="closing-body">
								This platform will not compete on features. It will compete on focus. A clean, beautiful, trustworthy space where artists can list their work and buyers can find it — without noise, without distraction, without AI-generated clutter.
								<br /><br />
								We will build with care, launch lean, and grow with the community it serves. In sha Allah, the success will follow naturally — because the platform will genuinely help people.
							</p>
							<div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32, position: "relative", zIndex: 1 }}>
								<span style={{ fontSize: 12, padding: "6px 14px", borderRadius: 30, border: "1px solid rgba(184,216,240,0.4)", color: "rgba(255,255,255,0.7)" }}>Human art only</span>
								<span style={{ fontSize: 12, padding: "6px 14px", borderRadius: 30, border: "1px solid rgba(242,196,208,0.4)", color: "rgba(255,255,255,0.7)" }}>Simplicity first</span>
								<span style={{ fontSize: 12, padding: "6px 14px", borderRadius: 30, border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}>Artists supported</span>
								<span style={{ fontSize: 12, padding: "6px 14px", borderRadius: 30, border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}>Built with purpose</span>
							</div>
							<div className="closing-sig">Ready to build something meaningful.</div>
						</div>
					</Reveal>
				</div>
			</div>
		</Layout>
	)
}
