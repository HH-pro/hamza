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
		<>
			<div className="hm-filters" role="tablist" aria-label="Filter projects by type">
				{categories.map((c) => (
					<button
						key={c.key}
						type="button"
						role="tab"
						aria-selected={filter === c.key}
						className={`hm-filter${filter === c.key ? " is-active" : ""}`}
						onClick={() => setFilter(c.key)}
					>
						{c.label}
						<span className="hm-filter__count">{countFor(c.key)}</span>
					</button>
				))}
			</div>

			<div className="hm-work hm-mt" data-reveal data-reveal-stagger>
				{visible.map((p) => (
					<article className="hm-card" key={p.slug}>
						<button
							type="button"
							className="hm-card__media hm-card__button"
							onClick={() => setActive(p)}
							aria-label={`Open ${p.title} gallery`}
						>
							<img src={resolveImg(p.cover)} alt={p.title} loading="lazy" />
							<span className="hm-card__overlay">
								<i className="ri-gallery-line" />
								View gallery{p.gallery.length > 1 ? ` · ${p.gallery.length}` : ""}
							</span>
						</button>

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

			{visible.length === 0 && (
				<p className="hm-body hm-center hm-mt">No projects in this category yet.</p>
			)}

			{active && <ProjectLightbox project={active} onClose={() => setActive(null)} />}
		</>
	)
}
