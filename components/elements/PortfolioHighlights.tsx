import Link from "next/link"
import { categoryLabel, featuredProjects, resolveImg } from "@/lib/projects"

export default function PortfolioHighlights() {
	return (
		<div className="container">
			<div className="row justify-content-between mt-6">
				{featuredProjects.map((p) => (
					<div key={p.slug} className="col-lg-6 col-12 mb-4">
						<div className="project-item pf-card rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white h-100">
							<Link href="/work" aria-label={`See ${p.title} in my work`}>
								<span className="pf-card-media rounded-3 overflow-hidden d-block">
									<img className="rounded-3 w-100 zoom-img" src={resolveImg(p.cover)} alt={p.title} loading="lazy" />
									<span className="pf-card-badge">{categoryLabel[p.category]}</span>
								</span>
							</Link>
							<div className="d-flex align-items-center mt-4">
								<div className="project-card-content">
									<h3 className="fw-semibold">{p.title}</h3>
									<p className="mb-0">{p.tagline}</p>
								</div>
								<Link
									href="/work"
									className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
									aria-label={`See ${p.title} in my work`}
								>
									<i className="ri-arrow-right-up-line" />
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
