'use client'

import Link from "next/link"
import Layout from "@/components/layout/Layout"

export default function ResumePage() {
	return (
		<Layout headerStyle={1} footerStyle={1}>
			<section className="section-resume-page position-relative pt-150 pb-6 overflow-hidden">
				<div className="container position-relative z-2">
					<div className="row align-items-end">
						<div className="col-lg-7 me-auto">
							<span className="btn btn-gradient d-inline-block text-uppercase mb-3">Resume</span>
							<h2 className="ds-3 mb-3">Hamza</h2>
							<h5 className="text-primary fw-semibold mb-3">Full Stack Developer</h5>
							<p className="text-300 fs-5 mb-0">
								I specialize in building scalable web and mobile applications, with
								expertise in App Development, UI/UX design, and integrating advanced
								technologies such as Artificial Intelligence and Machine Learning.
							</p>
						</div>
						<div className="col-lg-auto d-flex gap-2 mt-5 mt-lg-0 no-print">
							<Link
								href="/assets/resume.pdf"
								target="_blank"
								download="Hamza-Resume.pdf"
								className="btn btn-outline-secondary d-inline-flex align-items-center"
							>
								<span>Download PDF</span>
								<i className="ri-download-line ms-2" />
							</Link>
							<Link href="/#contact" className="btn btn-gradient d-inline-flex align-items-center">
								<span>Hire me</span>
								<i className="ri-arrow-right-up-line ms-2" />
							</Link>
						</div>
					</div>

					{/* Contact Info */}
					<div className="row mt-6">
						<div className="col-md-4 d-flex align-items-center mb-4 mb-md-0 position-relative">
							<div className="bg-white icon-shape icon-xxl border-linear-2 border-2 rounded-4">
								<i className="ri-phone-fill text-primary fs-26" />
							</div>
							<div className="ps-3">
								<span className="text-400 fs-5">Phone Number</span>
								<h6 className="mb-0">+92 311 7836704</h6>
							</div>
							<Link href="tel:+923117836704" className="position-absolute top-0 start-0 w-100 h-100" />
						</div>
						<div className="col-md-4 d-flex align-items-center mb-4 mb-md-0 position-relative">
							<div className="bg-white icon-shape icon-xxl border-linear-2 border-2 rounded-4">
								<i className="ri-mail-fill text-primary fs-26" />
							</div>
							<div className="ps-3">
								<span className="text-400 fs-5">Email</span>
								<h6 className="mb-0">Info@hamzamanzoor.online</h6>
							</div>
							<Link href="mailto:Info@hamzamanzoor.online" className="position-absolute top-0 start-0 w-100 h-100" />
						</div>
						<div className="col-md-4 d-flex align-items-center position-relative">
							<div className="bg-white icon-shape icon-xxl border-linear-2 border-2 rounded-4">
								<i className="ri-map-2-fill text-primary fs-26" />
							</div>
							<div className="ps-3">
								<span className="text-400 fs-5">Location</span>
								<h6 className="mb-0">Narowal, Punjab</h6>
							</div>
						</div>
					</div>

					{/* Core Tools */}
					<div className="d-flex gap-3 flex-wrap mt-6">
						<div className="brand-logo icon-xl icon-shape rounded-3 bg-900">
							<i className="ri-smartphone-line fs-3 text-primary"></i>
						</div>
						<div className="brand-logo icon-xl icon-shape rounded-3 bg-900">
							<i className="ri-code-s-slash-line fs-3 text-primary"></i>
						</div>
						<div className="brand-logo icon-xl icon-shape rounded-3 bg-900">
							<i className="ri-brush-line fs-3 text-primary"></i>
						</div>
						<div className="brand-logo icon-xl icon-shape rounded-3 bg-900">
							<i className="ri-robot-2-line fs-3 text-primary"></i>
						</div>
						<div className="brand-logo icon-xl icon-shape rounded-3 bg-900">
							<i className="ri-brain-line fs-3 text-primary"></i>
						</div>
					</div>
				</div>
			</section>

			{/* Skills & Experience */}
			<section className="section-resume-1 position-relative pt-6 pb-6">
				<div className="container">
					<div className="row">
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

			{/* Featured Projects */}
			<section className="section-projects-1 position-relative pt-6 pb-150">
				<div className="container">
					<div className="row align-items-end mb-6">
						<div className="col-lg-7 me-auto">
							<h3 className="ds-3 mt-3 mb-3 text-primary">Featured Projects</h3>
							<span className="fs-5 fw-medium text-200">
								A selection of recent web and mobile work.
							</span>
						</div>
						<div className="col-lg-auto no-print">
							<Link href="/work" className="btn btn-gradient d-inline-flex align-items-center gap-2">
								<span>View All Projects</span>
								<i className="ri-arrow-right-up-line fs-6" />
							</Link>
						</div>
					</div>

					<div className="row justify-content-between">
						<div className="col-lg-6 col-12 mb-4">
							<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
								<img
									className="rounded-3 w-100"
									src="/assets/imgs/projects/projects-1/1.png"
									alt="Wecinema"
								/>
								<div className="d-flex align-items-center mt-4">
									<div className="project-card-content">
										<h3 className="fw-semibold">Bussiness Website</h3>
										<p>Wecinema</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-6 col-12 mb-4">
							<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
								<img
									className="rounded-3 w-100"
									src="/assets/imgs/projects/projects-1/3.png"
									alt="Risby Homes"
								/>
								<div className="d-flex align-items-center mt-4">
									<div className="project-card-content">
										<h3 className="fw-semibold">Property Development</h3>
										<p>Risby Homes</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-6 col-12 mb-4">
							<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
								<div className="text-center">
									<img
										className="rounded-3 mx-auto"
										src="/assets/imgs/projects/projects-1/glazeme.jpeg"
										alt="GlazeMe"
										style={{ width: "220px", height: "auto", maxWidth: "100%" }}
									/>
								</div>
								<div className="d-flex align-items-center mt-4">
									<div className="project-card-content">
										<h3 className="fw-semibold">GlazeMe</h3>
										<p className="mb-0">iOS • AI Glaze Generation &amp; Gifting App</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-6 col-12 mb-4">
							<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
								<div className="text-center">
									<img
										className="rounded-3 mx-auto"
										src="/assets/imgs/projects/projects-1/madeinpk.jpeg"
										alt="MadeInPK"
										style={{ width: "220px", height: "auto", maxWidth: "100%" }}
									/>
								</div>
								<div className="d-flex align-items-center mt-4">
									<div className="project-card-content">
										<h3 className="fw-semibold">MadeInPK</h3>
										<p className="mb-0">iOS &amp; Android • B2B Textile Trading Marketplace</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	)
}
