'use client'
import Isotope from "isotope-layout"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"

export default function PortfolioFilter() {
	// Isotope
	const isotope = useRef<Isotope | null>(null)
	const [filterKey, setFilterKey] = useState<string>("*")

	useEffect(() => {
		const timeout = setTimeout(() => {
			isotope.current = new Isotope(".masonry-active", {
				itemSelector: ".filter-item",
				percentPosition: true,
				masonry: {
					columnWidth: ".filter-item",
				},
			})
		}, 1000)

		// Cleanup on unmount
		return () => clearTimeout(timeout)
	}, [])

	useEffect(() => {
		if (isotope.current) {
			isotope.current.arrange({ filter: filterKey === "*" ? "*" : `.${filterKey}` })
		}
	}, [filterKey])

	const handleFilterKeyChange = useCallback((key: string) => () => {
		setFilterKey(key)
	}, [])

	const activeBtn = (value: string) =>
		value === filterKey
			? "active btn btn-md btn-filter mb-2 me-2 text-uppercase"
			: "btn btn-md btn-filter mb-2 me-2 text-uppercase"

	return (
		<>
			<div className="container">
				<div className="text-start">
					<div className="button-group filter-button-group filter-menu-active">
						<button className={activeBtn("*")} onClick={handleFilterKeyChange("*")}>
							All Projects
						</button>
					</div>
				</div>

				<div className="row masonry-active justify-content-between mt-6">
					<div className="grid-sizer" />

					{/* Project 1 */}
					<div className="filter-item col-lg-6 col-12 app app dataanalysis brand">
						<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
							<Link href="https://xiaomi.kg/">
								<img
									className="rounded-3 w-100 zoom-img"
									src="/assets/imgs/projects/projects-1/img-4.png"
									alt="infinia"
								/>
							</Link>
							<div className="d-flex align-items-center mt-4">
								<Link href="/work-single" className="project-card-content">
									<h3 className="fw-semibold">Ecommerece Store</h3>
									<p>Xiaomi.kg</p>
								</Link>
								<Link
									href="https://xiaomi.kg/"
									className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
								>
									<i className="ri-arrow-right-up-line" />
								</Link>
							</div>
						</div>
					</div>

					{/* Project 2 */}
					<div className="filter-item col-lg-6 col-12 webdesign brand dataanalysis brand">
						<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
							<Link href="https://visualsblaze.com">
								<img
									className="rounded-3 w-100 zoom-img"
									src="/assets/imgs/projects/projects-1/img-2.png"
									alt="infinia"
								/>
							</Link>
							<div className="d-flex align-items-center mt-4">
								<Link href="/work-single" className="project-card-content">
									<h3 className="fw-semibold">Portfolio Website</h3>
									<p>Visualsblaze</p>
								</Link>
								<Link
									href="https://visualsblaze.com/"
									className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
								>
									<i className="ri-arrow-right-up-line" />
								</Link>
							</div>
						</div>
					</div>

					{/* Project 3 */}
					<div className="filter-item col-lg-6 col-12 brand ui app">
						<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
							<Link href="https://wecinema.co">
								<img
									className="rounded-3 w-100 zoom-img"
									src="/assets/imgs/projects/projects-1/img-1.png"
									alt="infinia"
								/>
							</Link>
							<div className="d-flex align-items-center mt-4">
								<Link href="/work-single" className="project-card-content">
									<h3 className="fw-semibold">Socail Website</h3>
									<p>Wecinema </p>
								</Link>
								<Link
									href="https://wecinema.co/"
									className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
								>
									<i className="ri-arrow-right-up-line" />
								</Link>
							</div>
						</div>
					</div>

					{/* Project 4 */}
					<div className="filter-item col-lg-6 col-12 ui app">
						<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
							<Link href="https://www.votingbuddy.com">
								<img
									className="rounded-3 w-100 zoom-img"
									src="/assets/imgs/projects/projects-1/img-3.png"
									alt="infinia"
								/>
							</Link>
							<div className="d-flex align-items-center mt-4">
								<Link href="/work-single" className="project-card-content">
									<h3 className="fw-semibold">Quiz Website</h3>
									<p>Voting Buddy</p>
								</Link>
								<Link
									href="https://www.votingbuddy.com/"
									className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
								>
									<i className="ri-arrow-right-up-line" />
								</Link>
							</div>
						</div>
					</div>

					{/* Project 5 - Bright Funded Traders */}
					<div className="filter-item col-lg-6 col-12 ui app">
						<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
							<Link href="https://brightfundedtraders.com/">
								<img
									className="rounded-3 w-100 zoom-img"
									src="/assets/imgs/projects/projects-1/brightfunded.png"
									alt="Bright Funded Traders"
								/>
							</Link>
							<div className="d-flex align-items-center mt-4">
								<Link href="/work-single" className="project-card-content">
									<h3 className="fw-semibold">Trading Website</h3>
									<p>Bright Funded Traders</p>
								</Link>
								<Link
									href="https://brightfundedtraders.com/"
									className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
								>
									<i className="ri-arrow-right-up-line" />
								</Link>
							</div>
						</div>
					</div>

					{/* Project 6 - Quantum Funding Traders */}
					<div className="filter-item col-lg-6 col-12 ui app">
						<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
							<Link href="https://quantumfundingtraders.com/">
								<img
									className="rounded-3 w-100 zoom-img"
									src="/assets/imgs/projects/projects-1/break.png"
									alt="Quantum Funding Traders"
								/>
							</Link>
							<div className="d-flex align-items-center mt-4">
								<Link href="/work-single" className="project-card-content">
									<h3 className="fw-semibold">Trading Website</h3>
									<p>Quantum Funding Traders</p>
								</Link>
								<Link
									href="https://quantumfundingtraders.com/"
									className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
								>
									<i className="ri-arrow-right-up-line" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
