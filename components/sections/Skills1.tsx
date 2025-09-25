'use client'
import CountUp from 'react-countup'

export default function Skills1() {
	return (
		<section className="section-skills-1 position-relative section-padding bg-900">
			<div className="container">
				<div className="row">
					<div className="text-center mb-7">
						<h3 className="ds-3 mt-3 mb-3 text-primary">My Skills</h3>
						<span className="fs-5 fw-medium text-200">
							I thrive on turning complex problems into simple, beautiful
							<br className="d-md-block d-none" />
							solutions that enhance user satisfaction.
						</span>
					</div>

					{/* Skills Grid */}
					<div className="d-flex flex-wrap flex-lg-nowrap justify-content-center gap-3 mb-7 px-6">

						{/* App Development */}
						<div className="skills text-center">
							<div className="skills-icon mb-5 fs-1 text-primary">
								<i className="ri-smartphone-line"></i>
							</div>
							<div className="skills-ratio">
								<h3 className="count fw-semibold my-0">
									<CountUp enableScrollSpy={true} end={95} />%
								</h3>
								<p className="text-400 fw-medium text-uppercase">APP DEVELOPMENT</p>
							</div>
						</div>

						{/* Web Development */}
						<div className="skills text-center">
							<div className="skills-icon mb-5 fs-1 text-primary">
								<i className="ri-code-s-slash-line"></i>
							</div>
							<div className="skills-ratio">
								<h3 className="count fw-semibold my-0">
									<CountUp enableScrollSpy={true} end={90} />%
								</h3>
								<p className="text-400 fw-medium text-uppercase">WEB DEVELOPMENT</p>
							</div>
						</div>

						{/* UI / UX Design */}
						<div className="skills text-center">
							<div className="skills-icon mb-5 fs-1 text-primary">
								<i className="ri-brush-line"></i>
							</div>
							<div className="skills-ratio">
								<h3 className="count fw-semibold my-0">
									<CountUp enableScrollSpy={true} end={85} />%
								</h3>
								<p className="text-400 fw-medium text-uppercase">UI / UX DESIGN</p>
							</div>
						</div>

						{/* Artificial Intelligence */}
						<div className="skills text-center">
							<div className="skills-icon mb-5 fs-1 text-primary">
								<i className="ri-robot-2-line"></i>
							</div>
							<div className="skills-ratio">
								<h3 className="count fw-semibold my-0">
									<CountUp enableScrollSpy={true} end={88} />%
								</h3>
								<p className="text-400 fw-medium text-uppercase">AI DEVELOPMENT</p>
							</div>
						</div>

						{/* Machine Learning */}
						<div className="skills text-center">
							<div className="skills-icon mb-5 fs-1 text-primary">
								<i className="ri-brain-line"></i>
							</div>
							<div className="skills-ratio">
								<h3 className="count fw-semibold my-0">
									<CountUp enableScrollSpy={true} end={80} />%
								</h3>
								<p className="text-400 fw-medium text-uppercase">MACHINE LEARNING</p>
							</div>
						</div>
					</div>

					{/* Extra Tech Stack */}
					<div className="text-center">
						<p className="fs-5 text-200 mb-0">I also work with supporting tools & frameworks:</p>
						<div className="d-flex justify-content-center gap-2 flex-wrap">
							<span className="fs-6 fw-bold">Firebase</span>,
							<span className="fs-6 fw-bold">Next.js</span>,
							<span className="fs-6 fw-bold">TailwindCSS</span>,
							<span className="fs-6 fw-bold">WordPress</span>,
							<span className="fs-6 fw-bold">Shopify</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
