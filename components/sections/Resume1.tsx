import Metrics from "@/components/hm/Metrics"
import SectionHead from "@/components/hm/SectionHead"

const track = [
	{
		period: "2024 — now",
		title: "Independent product engineer",
		body: "Full products end-to-end for founders — B2B marketplaces, fintech platforms, and AI-integrated iOS apps. Also founded ZynHive.",
	},
	{
		period: "2022 — 2024",
		title: "Full-stack developer, freelance",
		body: "Production websites and platforms for international clients across React/Node and WordPress, including UK property and e-commerce brands.",
	},
	{
		period: "2020 — 2022",
		title: "Web developer",
		body: "Responsive sites for small businesses. Where the foundation in modern JavaScript frameworks got built.",
	},
]

export default function Resume1() {
	return (
		<section className="hm-section hm-section--ruled" id="track-record">
			<div className="hm-wrap">
				<SectionHead
					eyebrow="Track record"
					title={
						<>
							Four years of <span className="hm-accent">things going live</span>
						</>
					}
					lede="The numbers below come straight from the project catalogue that powers this site — nothing is typed in by hand."
					action={{ label: "Download CV", href: "/assets/resume.pdf" }}
				/>

				<Metrics />

				<ol className="hm-process hm-process--plain hm-mt" data-reveal data-reveal-stagger>
					{track.map((t) => (
						<li className="hm-process__item" key={t.period}>
							<span className="hm-mono" style={{ paddingTop: ".3rem" }}>
								{t.period}
							</span>
							<div>
								<h3 className="hm-h3">{t.title}</h3>
								<p>{t.body}</p>
							</div>
						</li>
					))}
				</ol>
			</div>
		</section>
	)
}
