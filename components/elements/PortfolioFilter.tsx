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
						<button className={activeBtn("web")} onClick={handleFilterKeyChange("web")}>
							Web
						</button>
						<button className={activeBtn("mobile")} onClick={handleFilterKeyChange("mobile")}>
							Mobile Apps
						</button>
					</div>
				</div>

				<div className="row masonry-active justify-content-between mt-6">
					<div className="grid-sizer" />

					{/* Project 1 - Xiaomi Store (Web) */}
					<div className="filter-item col-lg-6 col-12 web">
						<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
							<a href="https://xiaomi.kg/" target="_blank" rel="noopener noreferrer">
								<img
									className="rounded-3 w-100 zoom-img"
									src="/assets/imgs/projects/projects-1/img-4.png"
									alt="Xiaomi Store"
								/>
							</a>
							<div className="d-flex align-items-center mt-4">
								<div className="project-card-content">
									<h3 className="fw-semibold">Ecommerce Store</h3>
									<p>Xiaomi.kg</p>
								</div>
								<a
									href="https://xiaomi.kg/"
									target="_blank"
									rel="noopener noreferrer"
									className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
								>
									<i className="ri-arrow-right-up-line" />
								</a>
							</div>
						</div>
					</div>

					{/* Project 2 - Visuals Blaze (Web) */}
					<div className="filter-item col-lg-6 col-12 web">
						<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
							<a href="https://visualsblaze.com" target="_blank" rel="noopener noreferrer">
								<img
									className="rounded-3 w-100 zoom-img"
									src="/assets/imgs/projects/projects-1/img-2.png"
									alt="Visuals Blaze"
								/>
							</a>
							<div className="d-flex align-items-center mt-4">
								<div className="project-card-content">
									<h3 className="fw-semibold">Portfolio Website</h3>
									<p>Visuals Blaze</p>
								</div>
								<a
									href="https://visualsblaze.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
								>
									<i className="ri-arrow-right-up-line" />
								</a>
							</div>
						</div>
					</div>

					{/* Project 3 - Wecinema (Web) */}
					<div className="filter-item col-lg-6 col-12 web">
						<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
							<a href="https://wecinema.co" target="_blank" rel="noopener noreferrer">
								<img
									className="rounded-3 w-100 zoom-img"
									src="/assets/imgs/projects/projects-1/img-1.png"
									alt="Wecinema"
								/>
							</a>
							<div className="d-flex align-items-center mt-4">
								<div className="project-card-content">
									<h3 className="fw-semibold">Social Website</h3>
									<p>Wecinema</p>
								</div>
								<a
									href="https://wecinema.co/"
									target="_blank"
									rel="noopener noreferrer"
									className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
								>
									<i className="ri-arrow-right-up-line" />
								</a>
							</div>
						</div>
					</div>

					{/* Project 4 - Voting Buddy (Web) */}
					<div className="filter-item col-lg-6 col-12 web">
						<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
							<a href="https://www.votingbuddy.com" target="_blank" rel="noopener noreferrer">
								<img
									className="rounded-3 w-100 zoom-img"
									src="/assets/imgs/projects/projects-1/img-3.png"
									alt="Voting Buddy"
								/>
							</a>
							<div className="d-flex align-items-center mt-4">
								<div className="project-card-content">
									<h3 className="fw-semibold">Quiz Website</h3>
									<p>Voting Buddy</p>
								</div>
								<a
									href="https://www.votingbuddy.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
								>
									<i className="ri-arrow-right-up-line" />
								</a>
							</div>
						</div>
					</div>

					{/* Project 5 - Bright Funded Traders (Web) */}
					<div className="filter-item col-lg-6 col-12 web">
						<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
							<a href="https://brightfundedtraders.com/" target="_blank" rel="noopener noreferrer">
								<img
									className="rounded-3 w-100 zoom-img"
									src="/assets/imgs/projects/projects-1/bright.png"
									alt="Bright Funded Traders"
								/>
							</a>
							<div className="d-flex align-items-center mt-4">
								<div className="project-card-content">
									<h3 className="fw-semibold">Trading Website</h3>
									<p>Bright Funded Traders</p>
								</div>
								<a
									href="https://brightfundedtraders.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
								>
									<i className="ri-arrow-right-up-line" />
								</a>
							</div>
						</div>
					</div>

					{/* Project 6 - Quantum Funding Traders (Web) */}
					<div className="filter-item col-lg-6 col-12 web">
						<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
							<a href="https://quantumfundingtraders.com/" target="_blank" rel="noopener noreferrer">
								<img
									className="rounded-3 w-100 zoom-img"
									src="/assets/imgs/projects/projects-1/break.png"
									alt="Quantum Funding Traders"
								/>
							</a>
							<div className="d-flex align-items-center mt-4">
								<div className="project-card-content">
									<h3 className="fw-semibold">Trading Website</h3>
									<p>Quantum Funding Traders</p>
								</div>
								<a
									href="https://quantumfundingtraders.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
								>
									<i className="ri-arrow-right-up-line" />
								</a>
							</div>
						</div>
					</div>

					{/* Project 7 - FacemeQuiz iOS App (Mobile) */}
					<div className="filter-item col-lg-6 col-12 mobile">
						<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
							<div className="text-center">
								<img
									className="rounded-3 zoom-img mx-auto"
									src="/assets/imgs/projects/projects-1/faceme.jpeg"
									alt="FacmeQuiz iOS App"
									style={{ width: "220px", height: "auto", maxWidth: "100%" }}
								/>
							</div>
							<div className="d-flex align-items-center mt-4">
								<div className="project-card-content">
									<h3 className="fw-semibold">FacemeQuiz</h3>
									<p className="mb-0">iOS Quiz App</p>
								</div>
								<a
									href="#"
									className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
									onClick={(e) => {
										e.preventDefault();
										alert('App store link coming soon!');
									}}
								>
									<i className="ri-arrow-right-up-line" />
								</a>
							</div>
						</div>
					</div>

					{/* Project 8 - Free Chat Freedom App (Mobile) */}
					<div className="filter-item col-lg-6 col-12 mobile">
						<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
							<div className="text-center">
								<img
									className="rounded-3 zoom-img mx-auto"
									src="/assets/imgs/projects/projects-1/chat.jpeg"
									alt="Free Chat Freedom App"
									style={{ width: "220px", height: "auto", maxWidth: "100%" }}
								/>
							</div>
							<div className="d-flex align-items-center mt-4">
								<div className="project-card-content">
									<h3 className="fw-semibold">Free Chat Freedom</h3>
									<p className="mb-0">Messaging App</p>
								</div>
								<a
									href="#"
									className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
									onClick={(e) => {
										e.preventDefault();
										alert('App store link coming soon!');
									}}
								>
									<i className="ri-arrow-right-up-line" />
								</a>
							</div>
						</div>
					</div>

					{/* Project 9 - Employee Wordplaze App (Mobile) */}
					<div className="filter-item col-lg-6 col-12 mobile">
						<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
							<div className="text-center">
								<img
									className="rounded-3 zoom-img mx-auto"
									src="/assets/imgs/projects/projects-1/work.jpeg"
									alt="Employee Wordplaze App"
									style={{ width: "220px", height: "auto", maxWidth: "100%" }}
								/>
							</div>
							<div className="d-flex align-items-center mt-4">
								<div className="project-card-content">
									<h3 className="fw-semibold">Employee Wordplaze</h3>
									<p className="mb-0">Business App</p>
								</div>
								<a
									href="#"
									className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
									onClick={(e) => {
										e.preventDefault();
										alert('App store link coming soon!');
									}}
								>
									<i className="ri-arrow-right-up-line" />
								</a>
							</div>
						</div>
					</div>

				</div>
			</div>
		</>
	)
}