import Link from "next/link"
import { CONTACT } from "@/lib/proof"

const points = [
	{ icon: "ri-time-line", text: "30 minutes, no commitment" },
	{ icon: "ri-file-list-3-line", text: "You leave with a scope and a real number" },
	{ icon: "ri-hand-heart-line", text: "No obligation to hire me afterwards" },
]

/**
 * Mid-page CTA. Deliberately a different object from the closing block —
 * a dark horizontal band that states what the call actually is, so the
 * middle ask reads as information rather than a repeated shout.
 */
export default function BookCallBand() {
	return (
		<section className="hm-section hm-section--tight">
			<div className="hm-wrap">
				<div className="hm-band" data-reveal>
					<div className="hm-band__text">
						<span className="hm-band__eyebrow">
							<span className="hm-band__dot" />
							{CONTACT.availability}
						</span>
						<h2 className="hm-band__title">
							Not sure what your idea costs to{" "}
							<span className="hm-accent">actually build</span>?
						</h2>
						<ul className="hm-band__points">
							{points.map((p) => (
								<li key={p.text}>
									<i className={p.icon} aria-hidden="true" />
									{p.text}
								</li>
							))}
						</ul>
					</div>

					<div className="hm-band__action">
						<Link href="/#contact" className="hm-band__cta">
							Book a Call
							<i className="ri-arrow-right-line" />
						</Link>
						<a className="hm-band__alt" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
							<i className="ri-whatsapp-line" aria-hidden="true" />
							Or message on WhatsApp
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}
