import { METRICS } from "@/lib/proof"

/** Numbers derived from the project catalogue — nothing hand-typed. */
export default function Metrics() {
	return (
		<div className="hm-metrics" data-reveal data-reveal-stagger>
			{METRICS.map((m) => (
				<div className="hm-metric" key={m.label}>
					<span className="hm-metric__value">{m.value}</span>
					<span className="hm-metric__label">{m.label}</span>
				</div>
			))}
		</div>
	)
}
