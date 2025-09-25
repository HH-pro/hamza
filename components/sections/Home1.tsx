import Link from "next/link"

export default function Home1() {
	return (
		<section className="section-hero-1 position-relative pt-200 pb-120 overflow-hidden">
			<div className="container position-relative z-3">
				<div className="row">
					<div className="col-lg-6 col-md-12">
						<span className="text-dark">👋 Hi there, I'm Hamza</span>

						{/* Main Heading */}
						<h2 className="ds-3 mb-3">Full Stack Developer</h2>

						{/* Professional Summary */}
						<p className="text-300 mb-6">
							I specialize in building modern applications across web and mobile,
							with expertise in UI/UX, artificial intelligence, and machine learning.
							My goal is to deliver scalable, user-friendly, and intelligent solutions 
							that create real impact.
							<br />
							<span className="fw-semibold text-primary">
								Skills: App Development • Web Development • UI/UX • AI • ML
							</span>
						</p>

						{/* Action Buttons */}
						<Link
							href="/assets/resume.pdf"
							className="btn btn-gradient me-2"
							target="_blank"
						>
							Download CV
							<i className="ri-download-line ms-2" />
						</Link>
						<Link
							href="/#contact"
							className="btn btn-outline-secondary d-inline-flex align-items-center"
						>
							<span>Hire me</span>
							<i className="ri-arrow-right-line ms-2" />
						</Link>

						{/* Experience Note */}
						<p className="text-400 mt-6 mb-3">
							+ 2 years of professional experience in Web & App Development
						</p>

						{/* Tech Logos */}
						<div className="d-flex gap-3 flex-wrap">
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
				</div>
			</div>

			{/* Decorative Background */}
			<div className="shape-1 position-absolute bottom-0 start-50 z-1 ms-10 d-none d-md-block">
				<div className="position-absolute top-50 start-0 translate-middle z-0 mt-8 ms-10 ps-8">
					<img
						className="ribbonRotate"
						src="/assets/imgs/hero/hero-1/decorate.png"
						alt=""
					/>
				</div>
			</div>
			<div
				className="position-absolute top-0 start-0 w-100 h-100 filter-invert"
				data-background="assets/imgs/hero/hero-1/background.png"
			/>
		</section>
	)
}
