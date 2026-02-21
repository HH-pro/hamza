import Link from "next/link"
import Image from "next/image"

export default function Home1() {
	return (
		<section className="section-hero-1 position-relative pt-200 pb-120 overflow-hidden">
			<div className="container position-relative z-3">
				<div className="row align-items-center">
					{/* Left Content - Text Section */}
					<div className="col-lg-6 col-md-12 mb-5 mb-lg-0">
						<span className="text-dark">👋 Hi there, I'm Hamza</span>

						{/* Main Heading */}
						<h2 className="ds-3 mb-3">Full Stack Developer</h2>

						{/* Professional Summary */}
						<p className="text-300 mb-6">
							I specialize in building scalable <strong>web and mobile applications</strong>,
							with expertise in <strong>App Development</strong>, UI/UX design,
							and integrating advanced technologies such as Artificial Intelligence
							and Machine Learning.
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
							+ 4 years of professional experience in Web & App Development
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

					{/* Right Content - Image Section */}
					<div className="col-lg-6 col-md-12">
						<div className="hero-image-wrapper text-center text-lg-end">
							<div className="position-relative d-inline-block">
								{/* Main Profile Image */}
								<Image
									src="/assets/imgs/hero/hero-1/profile.jpeg"
									alt="Hamza - Full Stack Developer"
									width={500}
									height={500}
									className="img-fluid rounded-4 shadow-lg"
									priority
									style={{
										maxWidth: '100%',
										height: 'auto',
										objectFit: 'cover'
									}}
								/>
								
								{/* Optional: Floating Badge or Decorative Element */}
								<div className="position-absolute bottom-0 start-0 bg-white p-3 rounded-4 shadow-sm m-3 d-none d-lg-block">
									<div className="d-flex align-items-center gap-2">
										<div className="bg-success rounded-circle p-2"></div>
										<small className="fw-semibold">Available for work</small>
									</div>
								</div>
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