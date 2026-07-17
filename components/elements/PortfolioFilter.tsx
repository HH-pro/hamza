'use client'

import { useMemo, useState } from "react"
import { categories, categoryLabel, projects, resolveImg, type Project } from "@/lib/projects"
import ProjectLightbox from "./ProjectLightbox"

export default function PortfolioFilter() {
	const [filter, setFilter] = useState<(typeof categories)[number]["key"]>("all")
	const [active, setActive] = useState<Project | null>(null)

	const visible = useMemo(
		() => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
		[filter],
	)

	const countFor = (key: (typeof categories)[number]["key"]) =>
		key === "all" ? projects.length : projects.filter((p) => p.category === key).length

	return (
		<div className="container">
			{/* Filter bar */}
			<div className="text-center">
				<div className="button-group filter-button-group filter-menu-active d-inline-flex flex-wrap justify-content-center">
					{categories.map((c) => (
						<button
							key={c.key}
							className={`btn btn-md btn-filter mb-2 me-2 text-uppercase${filter === c.key ? " active" : ""}`}
							onClick={() => setFilter(c.key)}
						>
							{c.label}
							<span className="pf-count">{countFor(c.key)}</span>
						</button>
					))}
				</div>
			</div>

			{/* Grid */}
			<div className="row mt-6">
				{visible.map((p) => (
					<div key={p.slug} className="col-lg-4 col-md-6 col-12 mb-4">
						<div className="project-item pf-card rounded-4 overflow-hidden position-relative p-3 bg-white h-100">
							<button
								type="button"
								className="pf-card-media rounded-3 overflow-hidden w-100 border-0 p-0"
								onClick={() => setActive(p)}
								aria-label={`Open ${p.title} gallery`}
							>
								<img className="rounded-3 w-100 zoom-img" src={resolveImg(p.cover)} alt={p.title} loading="lazy" />
								<span className="pf-card-badge">{categoryLabel[p.category]}</span>
								<span className="pf-card-overlay">
									<span className="pf-card-view">
										<i className="ri-gallery-line" />
										View gallery{p.gallery.length > 1 ? ` · ${p.gallery.length}` : ""}
									</span>
								</span>
							</button>

							<div className="d-flex align-items-start mt-4">
								<div className="project-card-content pe-2">
									<h3 className="fw-semibold mb-1">{p.title}</h3>
									<p className="mb-2">{p.tagline}</p>
									<div className="pf-tags">
										{p.tags.map((t) => (
											<span key={t} className="pf-tag">
												{t}
											</span>
										))}
									</div>
								</div>
								{p.url && (
									<a
										href={p.url}
										target="_blank"
										rel="noopener noreferrer"
										className="project-card-icon icon-shape ms-auto icon-md rounded-circle flex-shrink-0"
										aria-label={`Visit ${p.title}`}
									>
										<i className="ri-arrow-right-up-line" />
									</a>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{visible.length === 0 && <p className="text-center text-300 py-6">No projects in this category yet.</p>}

			{active && <ProjectLightbox project={active} onClose={() => setActive(null)} />}
		</div>
	)
}
