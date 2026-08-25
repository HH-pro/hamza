import { PROCESS } from "@/lib/proof"
import SectionHead from "./SectionHead"

/** Numbered because it is a real sequence — order carries information here. */
export default function ProcessList() {
	return (
		<section className="hm-section hm-section--sunk">
			<div className="hm-wrap">
				<SectionHead
					eyebrow="How it runs"
					title={
						<>
							Three steps, and <span className="hm-accent">no handoffs</span>
						</>
					}
					lede="The whole reason to hire one person instead of four is that nothing gets lost between them."
				/>
				<ol className="hm-process" data-reveal data-reveal-stagger>
					{PROCESS.map((s) => (
						<li className="hm-process__item" key={s.title}>
							<div>
								<h3 className="hm-h3">{s.title}</h3>
								<p>{s.body}</p>
							</div>
						</li>
					))}
				</ol>
			</div>
		</section>
	)
}
