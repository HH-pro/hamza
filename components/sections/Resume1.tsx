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
						{/* Education */}
						<div className="col-lg-6 col-12">
							<div className="resume-card p-lg-6 p-4 mb-lg-0 mb-6">
								<div className="resume-card-header d-flex align-items-end">
									<img
										className="border-linear-1 border-3 pb-2 pe-2"
										src="/assets/imgs/resume/resume-1/icon-1.svg"
										alt="Education"
									/>
									<h3 className="fw-semibold mb-0 border-bottom border-600 border-3 pb-2 w-100">
										Education
									</h3>
								</div>
								<div className="resume-card-body">
									<div className="resume-card-item px-4 py-3 mt-5">
										<p className="fw-extra-bold text-linear-1 mb-2">2020 - 2021</p>
										<h5>Certification in Python Programming</h5>
										<p className="text-300 mb-0">Computer College</p>
									</div>
									<div className="resume-card-item px-4 py-3 mt-5">
										<p className="fw-extra-bold text-linear-1 mb-2">2021 - 2022</p>
										<h5>Certification in Web Development</h5>
										<p className="text-300 mb-0">Tech Solutions Institute</p>
									</div>
									<div className="resume-card-item px-4 py-3 mt-5">
										<p className="fw-extra-bold text-linear-1 mb-2">2022 - 2023</p>
										<h5>Advanced Programming & Software Design</h5>
										<p className="text-300 mb-0">Programming Academy</p>
									</div>
								</div>
							</div>
						</div>

						{/* Experience */}
						<div className="col-lg-6 col-12">
							<div className="resume-card p-lg-6 p-4 h-100">
								<div className="resume-card-header d-flex align-items-end">
									<img
										className="border-linear-1 border-3 pb-2 pe-2"
										src="/assets/imgs/resume/resume-1/icon-2.svg"
										alt="Experience"
									/>
									<h3 className="fw-semibold mb-0 border-bottom border-600 border-3 pb-2 w-100">
										Experience
									</h3>
								</div>
								<div className="resume-card-body">
									<div className="resume-card-item px-4 py-3 mt-5">
										<p className="fw-extra-bold text-linear-1 mb-2">2024 - Present</p>
										<h5>Senior Software Developer</h5>
										<p className="text-300 mb-0">
											Leading development of scalable web applications and
											automation solutions.
										</p>
									</div>
									<div className="resume-card-item px-4 py-3 mt-5">
										<p className="fw-extra-bold text-linear-1 mb-2">2021 - 2024</p>
										<h5>Freelance Full-Stack Developer</h5>
										<p className="text-300 mb-0">
											Delivered custom web solutions, automation bots, and
											marketing tools for global clients.
										</p>
									</div>
									<div className="resume-card-item px-4 py-3 mt-5">
										<p className="fw-extra-bold text-linear-1 mb-2">2020 - 2022</p>
										<h5>Web Developer</h5>
										<p className="text-300 mb-0">
											Built responsive websites and optimized user experience for
											small businesses.
										</p>
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
