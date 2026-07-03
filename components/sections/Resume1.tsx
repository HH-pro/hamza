import Link from "next/link"

export default function Resume1() {
	return (
		<>
			<section
				id="resume"
				className="section-resume-1 position-relative pt-150 overflow-hidden"
				data-background="assets/imgs/projects/projects-1/background.png"
			>
				<div className="container">
					<div className="row align-items-end">
						<div className="col-lg-7 me-auto">
							<h3 className="ds-3 mt-3 mb-3 text-primary">My Resume</h3>
							<span className="fs-5 fw-medium text-200">
								A passionate developer with hands-on experience in modern web
								technologies, automation, and business-driven solutions. I
								believe in continuous learning and delivering value through
								creative problem solving.
							</span>
						</div>
						<div className="col-lg-auto">
							<Link
								href="/#contact"
								className="btn btn-gradient mt-lg-0 mt-5 ms-lg-auto"
							>
								Get in touch
								<i className="ri-arrow-right-up-line" />
							</Link>
						</div>
					</div>

					<div className="row mt-6">
						{/* Skills & Learning */}
						<div className="col-lg-6 col-12">
							<div className="resume-card p-lg-6 p-4 mb-lg-0 mb-6 h-100">
								<div className="resume-card-header d-flex align-items-center">
									<span className="resume-card-icon icon-shape icon-md rounded-circle d-flex align-items-center justify-content-center">
										<i className="ri-code-s-slash-line" />
									</span>
									<h3 className="fw-semibold mb-0 border-bottom border-600 border-3 pb-2 w-100">
										Skills &amp; Learning
									</h3>
								</div>
								<div className="resume-card-body">
									<div className="resume-card-item d-flex align-items-center px-4 py-3 mt-5">
										<span className="resume-item-icon icon-shape icon-sm rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
											<i className="ri-code-s-slash-line" />
										</span>
										<div>
											<p className="fw-extra-bold text-linear-1 mb-2">Core Focus</p>
											<h5>Full-Stack Web &amp; Mobile Development</h5>
											<p className="text-300 mb-0">
												React, Next.js, Node.js, React Native &amp; Flutter — shipping
												production apps like MadeInPK and GlazeMe end-to-end.
											</p>
										</div>
									</div>
									<div className="resume-card-item d-flex align-items-center px-4 py-3 mt-5">
										<span className="resume-item-icon icon-shape icon-sm rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
											<i className="ri-brain-line" />
										</span>
										<div>
											<p className="fw-extra-bold text-linear-1 mb-2">Applied Learning</p>
											<h5>AI &amp; Machine Learning Integration</h5>
											<p className="text-300 mb-0">
												Self-taught through hands-on work, including AI-driven
												features in GlazeMe.
											</p>
										</div>
									</div>
									<div className="resume-card-item d-flex align-items-center px-4 py-3 mt-5">
										<span className="resume-item-icon icon-shape icon-sm rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
											<i className="ri-brush-line" />
										</span>
										<div>
											<p className="fw-extra-bold text-linear-1 mb-2">Continuous Growth</p>
											<h5>UI/UX Design &amp; Modern Design Systems</h5>
											<p className="text-300 mb-0">
												Sharpened through real client projects rather than formal
												coursework — design by building.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Experience */}
						<div className="col-lg-6 col-12">
							<div className="resume-card p-lg-6 p-4 h-100">
								<div className="resume-card-header d-flex align-items-center">
									<span className="resume-card-icon icon-shape icon-md rounded-circle d-flex align-items-center justify-content-center">
										<i className="ri-briefcase-line" />
									</span>
									<h3 className="fw-semibold mb-0 border-bottom border-600 border-3 pb-2 w-100">
										Experience
									</h3>
								</div>
								<div className="resume-card-body">
									<div className="resume-card-item d-flex align-items-center px-4 py-3 mt-5">
										<span className="resume-item-icon icon-shape icon-sm rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
											<i className="ri-rocket-2-line" />
										</span>
										<div>
											<p className="fw-extra-bold text-linear-1 mb-2">2024 - 2026</p>
											<h5>Senior Full-Stack Developer (Freelance)</h5>
											<p className="text-300 mb-0">
												Architecting and shipping full-stack web &amp; mobile products
												end-to-end, including AI-integrated apps and B2B marketplace
												platforms.
											</p>
										</div>
									</div>
									<div className="resume-card-item d-flex align-items-center px-4 py-3 mt-5">
										<span className="resume-item-icon icon-shape icon-sm rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
											<i className="ri-code-box-line" />
										</span>
										<div>
											<p className="fw-extra-bold text-linear-1 mb-2">2022 - 2024</p>
											<h5>Full-Stack Developer (Freelance)</h5>
											<p className="text-300 mb-0">
												Delivered production websites and platforms for international
												clients across React/Node stacks and WordPress.
											</p>
										</div>
									</div>
									<div className="resume-card-item d-flex align-items-center px-4 py-3 mt-5">
										<span className="resume-item-icon icon-shape icon-sm rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
											<i className="ri-global-line" />
										</span>
										<div>
											<p className="fw-extra-bold text-linear-1 mb-2">2020 - 2022</p>
											<h5>Web Developer</h5>
											<p className="text-300 mb-0">
												Built responsive websites and optimized user experience for
												small businesses, laying the foundation in modern JS
												frameworks.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
