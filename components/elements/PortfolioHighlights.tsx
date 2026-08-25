import Link from "next/link"
import { categoryLabel, featuredProjects, resolveImg } from "@/lib/projects"

/** Featured work grid on the home page. */
export default function PortfolioHighlights() {
	return (
		<div className="hm-work" data-reveal data-reveal-stagger>
			{featuredProjects.map((p) => (
				<article className="hm-card" key={p.slug}>
					<Link href="/work" className="hm-card__media" aria-label={`See ${p.title} in my work`}>
						<img src={resolveImg(p.cover)} alt={p.title} loading="lazy" />
					</Link>
					<div className="hm-card__body">
						<span className="hm-card__meta">{categoryLabel[p.category]}</span>
						<h3 className="hm-h3">
							{p.url ? (
								<a
									className="hm-card__link"
									href={p.url}
									target="_blank"
									rel="noopener noreferrer"
								>
									{p.title}
									<i className="ri-arrow-right-up-line" style={{ fontSize: ".85em", marginLeft: ".25rem" }} />
								</a>
							) : (
								p.title
							)}
						</h3>
						<p>{p.description}</p>
						<div className="hm-tags">
							{p.tags.map((t) => (
								<span className="hm-tag" key={t}>
									{t}
								</span>
							))}
						</div>
					</div>
				</article>
			))}
		</div>
	)
}
