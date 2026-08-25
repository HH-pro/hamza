import { TESTIMONIALS } from "@/lib/proof"
import SectionHead from "./SectionHead"

/**
 * Renders nothing until real quotes exist in lib/proof.ts. An empty
 * testimonial section is worse than no testimonial section.
 */
export default function Testimonials() {
	if (!TESTIMONIALS.length) return null

	return (
		<section className="hm-section hm-section--ruled">
			<div className="hm-wrap">
				<SectionHead
					eyebrow="In their words"
					title={
						<>
							What clients say <span className="hm-accent">afterwards</span>
						</>
					}
				/>
				<div className="hm-quotes" data-reveal data-reveal-stagger>
					{TESTIMONIALS.map((t) => (
						<figure className="hm-quote" key={t.name + t.quote.slice(0, 20)}>
							{t.result && <p className="hm-quote__result">{t.result}</p>}
							<blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
							<figcaption className="hm-quote__who">
								<span className="hm-quote__name">{t.name}</span>
								<span className="hm-quote__role">{t.role}</span>
							</figcaption>
						</figure>
					))}
				</div>
			</div>
		</section>
	)
}
