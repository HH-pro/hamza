import { CLIENT_MARKS } from "@/lib/proof"

/**
 * Wordmarks of shipped products. Each links out, so the claim is checkable —
 * which is the only reason a proof strip is worth the vertical space.
 */
export default function ProofStrip() {
	if (!CLIENT_MARKS.length) return null

	return (
		<section className="hm-marks">
			<div className="hm-wrap">
				<p className="hm-marks__label">Shipped and live — click any of them</p>
				<ul className="hm-marks__list" data-reveal data-reveal-stagger>
					{CLIENT_MARKS.map((m) => (
						<li key={m.name}>
							{m.url ? (
								<a href={m.url} target="_blank" rel="noopener noreferrer">
									{m.name}
								</a>
							) : (
								<span>{m.name}</span>
							)}
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
