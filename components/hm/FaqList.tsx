import { FAQS, CONTACT } from "@/lib/proof"
import { FaqJsonLd } from "@/components/seo/JsonLd"

/**
 * Two-column FAQ: a static headline block on the left, a numbered accordion
 * in a tinted panel on the right that bleeds to the viewport edge on wide
 * screens. Native details/summary — keyboard accessible, works without JS.
 */
export default function FaqList() {
	return (
		<section className="hm-section hm-section--ruled" id="faq">
			<FaqJsonLd />
			<div className="hm-wrap">
				<div className="hm-faq-split">
					<div className="hm-faq-intro" data-reveal>
						<span className="hm-eyebrow">Before you ask</span>
						<h2 className="hm-h2">
							Frequently asked <span className="hm-accent">questions</span>
						</h2>
						<p className="hm-lede">
							Everything you need to know before getting in touch — including the
							one about price.
						</p>
						<p className="hm-faq-intro__contact">
							More questions?{" "}
							<a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
						</p>
					</div>

					<div className="hm-faq-panel" data-reveal>
						{FAQS.map((f, i) => (
							<details className="hm-faq__item" key={f.q}>
								<summary>
									<span className="hm-faq__num">{i + 1}.</span>
									<span>{f.q}</span>
								</summary>
								<p className="hm-faq__answer">{f.a}</p>
							</details>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
