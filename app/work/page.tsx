'use client'
import Layout from "@/components/layout/Layout"
import PortfolioFilter from "@/components/elements/PortfolioFilter"
import Metrics from "@/components/hm/Metrics"
import { projects } from "@/lib/projects"
import { liveProjects, PROJECTS_DELIVERED } from "@/lib/proof"
import ClosingCTA from "@/components/hm/ClosingCTA"

export default function Work() {
	return (
		<Layout headerStyle={1} footerStyle={1}>
			<section className="hm-section hm-section--tight">
				<div className="hm-wrap">
					<div className="hm-narrow">
						<span className="hm-eyebrow">Portfolio</span>
						<h1 className="hm-h1">
							{PROJECTS_DELIVERED} projects delivered,{" "}
							<span className="hm-accent">{liveProjects.length} you can open right now</span>
						</h1>
						<p className="hm-lede">
							B2B marketplaces, fintech platforms, App Store games and AI assistants —
							designed, built and launched end-to-end. The {projects.length} below are
							the ones worth documenting; open any card for the full screen gallery,
							or click a title to visit the real thing.
						</p>
					</div>

					<div className="hm-mt">
						<Metrics />
					</div>
				</div>
			</section>

			<section className="hm-section hm-section--tight hm-section--sunk">
				<div className="hm-wrap">
					<PortfolioFilter />
				</div>
			</section>

			<ClosingCTA
				title={
					<>
						Want something like these, <span className="hm-accent">but yours</span>?
					</>
				}
				body="Every project here started with one call about what the smallest launchable version looked like."
				secondary={{ label: "See pricing", href: "/website-plans" }}
			/>
		</Layout>
	)
}
