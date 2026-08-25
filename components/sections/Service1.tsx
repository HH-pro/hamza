import { services, pillars } from "@/lib/services"
import SectionHead from "@/components/hm/SectionHead"

/** Home page: the three pillars, then the service list. */
export default function Service1() {
	return (
		<section className="hm-section hm-section--ruled" id="services">
			<div className="hm-wrap">
				<SectionHead
					eyebrow="What end-to-end means"
					title={
						<>
							Four roles, <span className="hm-accent">one person</span>
						</>
					}
					lede="An agency puts a designer, two developers and a project manager between you and the product. Most of the budget goes to the coordination between them."
					action={{ label: "All services", href: "/services" }}
				/>

				<div className="hm-pillars" data-reveal data-reveal-stagger>
					{pillars.map((p) => (
						<div className="hm-pillar" key={p.title}>
							<i className={`${p.icon} hm-pillar__icon`} aria-hidden="true" />
							<h3 className="hm-h3">{p.title}</h3>
							<p>{p.body}</p>
						</div>
					))}
				</div>

				<div className="hm-services hm-mt" data-reveal data-reveal-stagger>
					{services.map((s) => (
						<article className="hm-service" key={s.slug}>
							<div>
								<div className="hm-service__title">
									<i className={s.icon} aria-hidden="true" />
									<h3 className="hm-h3">{s.title}</h3>
								</div>
								<p className="hm-service__outcome">{s.outcome}</p>
							</div>
							<div>
								<p className="hm-body">{s.body}</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}
