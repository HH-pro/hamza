'use client'
import CountUp from 'react-countup'

export default function Skills1() {
	return (
		<>
			<section className="section-skills-1 position-relative section-padding bg-900">
				<div className="container">
					<div className="row">
						<div className="text-center mb-7">
							<h3 className="ds-3 mt-3 mb-3 text-primary">My Skills</h3>
							<span className="fs-5 fw-medium text-200">
								I specialize in building modern web applications, mobile apps,
								and AI-driven solutions. My expertise spans across full-stack
								development and intelligent automation.
							</span>
						</div>

						{/* Skills Grid */}
						<div className="d-flex flex-wrap flex-lg-nowrap justify-content-center gap-3 mb-7 px-6">

							{/* Python */}
							<div className="skills">
								<div className="skills-icon mb-5">
									<img src="/assets/imgs/skills/skills-1/icon-1.png" alt="Python" />
								</div>
								<div className="skills-ratio text-center">
									<h3 className="count fw-semibold my-0">
										<CountUp enableScrollSpy end={98} />%
									</h3>
									<p className="text-400 fw-medium text-uppercase">PYTHON</p>
								</div>
							</div>

							{/* React JS */}
							<div className="skills">
								<div className="skills-icon mb-5">
									<img src="/assets/imgs/skills/skills-1/icon-2.png" alt="React" />
								</div>
								<div className="skills-ratio text-center">
									<h3 className="count fw-semibold my-0">
										<CountUp enableScrollSpy end={90} />%
									</h3>
									<p className="text-400 fw-medium text-uppercase">REACT JS</p>
								</div>
							</div>

							{/* Node.js */}
							<div className="skills">
								<div className="skills-icon mb-5">
									<img src="/assets/imgs/skills/skills-1/icon-4.png" alt="Node.js" />
								</div>
								<div className="skills-ratio text-center">
									<h3 className="count fw-semibold my-0">
										<CountUp enableScrollSpy end={78} />%
									</h3>
									<p className="text-400 fw-medium text-uppercase">NODE JS</p>
								</div>
							</div>

							{/* Django */}
							<div className="skills">
								<div className="skills-icon mb-5">
									<img src="/assets/imgs/skills/skills-1/icon-6.png" alt="Django" />
								</div>
								<div className="skills-ratio text-center">
									<h3 className="count fw-semibold my-0">
										<CountUp enableScrollSpy end={72} />%
									</h3>
									<p className="text-400 fw-medium text-uppercase">DJANGO</p>
								</div>
							</div>

							{/* AI & Machine Learning */}
							<div className="skills">
								<div className="skills-icon mb-5">
									<img src="/assets/imgs/skills/skills-1/icon-ml.png" alt="AI & ML" />
								</div>
								<div className="skills-ratio text-center">
									<h3 className="count fw-semibold my-0">
										<CountUp enableScrollSpy end={85} />%
									</h3>
									<p className="text-400 fw-medium text-uppercase">AI & ML</p>
								</div>
							</div>

							{/* Mobile App Dev */}
							<div className="skills">
								<div className="skills-icon mb-5">
									<img src="/assets/imgs/skills/skills-1/icon-app.png" alt="App Development" />
								</div>
								<div className="skills-ratio text-center">
									<h3 className="count fw-semibold my-0">
										<CountUp enableScrollSpy end={87} />%
									</h3>
									<p className="text-400 fw-medium text-uppercase">APP DEVELOPMENT</p>
								</div>
							</div>

							{/* Web Development */}
							<div className="skills">
								<div className="skills-icon mb-5">
									<img src="/assets/imgs/skills/skills-1/icon-web.png" alt="Web Development" />
								</div>
								<div className="skills-ratio text-center">
									<h3 className="count fw-semibold my-0">
										<CountUp enableScrollSpy end={95} />%
									</h3>
									<p className="text-400 fw-medium text-uppercase">WEB DEVELOPMENT</p>
								</div>
							</div>
						</div>

						{/* Extra Knowledge */}
						<div className="text-center">
							<p className="fs-5 text-200 mb-0">
								In addition, I also have strong knowledge in:
							</p>
							<div className="d-flex justify-content-center gap-2 flex-wrap">
								<span className="fs-5 fw-bold">HTML</span>,
								<span className="fs-5 fw-bold">CSS</span>,
								<span className="fs-5 fw-bold">JavaScript</span>,
								<span className="fs-5 fw-bold">Bootstrap</span>,
								<span className="fs-5 fw-bold">TailwindCSS</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
