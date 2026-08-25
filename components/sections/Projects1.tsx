"use client"

import Link from "next/link"
import PortfolioHighlights from "../elements/PortfolioHighlights"
import SectionHead from "@/components/hm/SectionHead"

export default function Projects1() {
	return (
		<section className="hm-section" id="projects">
			<div className="hm-wrap">
				<SectionHead
					eyebrow="Selected work"
					title={
						<>
							Products that are <span className="hm-accent">live right now</span>
						</>
					}
					lede="Marketplaces, fintech platforms, and App Store apps. Every one of these has a link you can open."
					action={{ label: "All projects", href: "/work" }}
				/>
				<PortfolioHighlights />
			</div>
		</section>
	)
}
