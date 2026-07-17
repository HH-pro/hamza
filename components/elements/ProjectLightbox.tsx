'use client'

import { useCallback, useEffect, useRef, useState } from "react"
import { categoryLabel, resolveImg, type Project } from "@/lib/projects"

interface ProjectLightboxProps {
	project: Project
	onClose: () => void
}

export default function ProjectLightbox({ project, onClose }: ProjectLightboxProps) {
	const [index, setIndex] = useState(0)
	const total = project.gallery.length
	const touchStartX = useRef<number | null>(null)
	const thumbsRef = useRef<HTMLDivElement | null>(null)

	const go = useCallback(
		(dir: number) => {
			setIndex((i) => (i + dir + total) % total)
		},
		[total],
	)

	// Keyboard navigation + body scroll lock
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose()
			else if (e.key === "ArrowRight") go(1)
			else if (e.key === "ArrowLeft") go(-1)
		}
		document.addEventListener("keydown", onKey)
		const prevOverflow = document.body.style.overflow
		document.body.style.overflow = "hidden"
		return () => {
			document.removeEventListener("keydown", onKey)
			document.body.style.overflow = prevOverflow
		}
	}, [go, onClose])

	// Keep the active thumbnail in view
	useEffect(() => {
		const strip = thumbsRef.current
		if (!strip) return
		const active = strip.children[index] as HTMLElement | undefined
		active?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
	}, [index])

	const onTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX
	}
	const onTouchEnd = (e: React.TouchEvent) => {
		if (touchStartX.current === null) return
		const dx = e.changedTouches[0].clientX - touchStartX.current
		if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
		touchStartX.current = null
	}

	return (
		<div className="pf-lightbox" role="dialog" aria-modal="true" aria-label={`${project.title} gallery`} onClick={onClose}>
			<div className="pf-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
				{/* Header */}
				<div className="pf-lightbox-head">
					<div className="pf-lightbox-meta">
						<span className="pf-chip">{categoryLabel[project.category]}</span>
						<div>
							<h3 className="pf-lightbox-title">{project.title}</h3>
							<p className="pf-lightbox-sub">{project.tagline}</p>
						</div>
					</div>
					<div className="pf-lightbox-actions">
						{project.url && (
							<a className="pf-lightbox-link" href={project.url} target="_blank" rel="noopener noreferrer">
								<span>Visit site</span>
								<i className="ri-arrow-right-up-line" />
							</a>
						)}
						<button className="pf-lightbox-close" onClick={onClose} aria-label="Close gallery">
							<i className="ri-close-line" />
						</button>
					</div>
				</div>

				{/* Stage */}
				<div className="pf-lightbox-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
					{total > 1 && (
						<button className="pf-nav pf-nav-prev" onClick={() => go(-1)} aria-label="Previous image">
							<i className="ri-arrow-left-s-line" />
						</button>
					)}
					{/* key forces a fresh fade on change */}
					<img
						key={index}
						className="pf-lightbox-img"
						src={resolveImg(project.gallery[index])}
						alt={`${project.title} — screen ${index + 1} of ${total}`}
					/>
					{total > 1 && (
						<button className="pf-nav pf-nav-next" onClick={() => go(1)} aria-label="Next image">
							<i className="ri-arrow-right-s-line" />
						</button>
					)}
					<span className="pf-lightbox-counter">
						{index + 1} / {total}
					</span>
				</div>

				{/* Footer: description + thumbnails */}
				<div className="pf-lightbox-foot">
					<p className="pf-lightbox-desc">{project.description}</p>
					{total > 1 && (
						<div className="pf-thumbs" ref={thumbsRef}>
							{project.gallery.map((n, i) => (
								<button
									key={n}
									className={`pf-thumb${i === index ? " is-active" : ""}`}
									onClick={() => setIndex(i)}
									aria-label={`Go to image ${i + 1}`}
								>
									<img src={resolveImg(n)} alt="" loading="lazy" />
								</button>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
