import Layout from "@/components/layout/Layout"

export default function Services() {
	return (
		<>
			<Layout headerStyle={1} footerStyle={1}>
				<div>
					{/* Services Section */}
					<section className="section-service-list pt-120 pb-150">
						<div className="container">
							<div className="row">
								<div className="col-lg-8 mx-lg-auto">
									<div className="text-center">
										<span className="btn btn-gradient d-inline-block text-uppercase">
											My Services
										</span>
										<h3 className="ds-3 mt-3 mb-4 text-dark">
											App, Web, AI/ML &{" "}
											<span className="text-300">IT Solutions</span>
										</h3>
										<p className="text-300 fs-5">
											I provide complete digital solutions including modern web
											applications, mobile app development (iOS & Android),
											automation bots, and advanced AI/ML services. My focus is
											on delivering user-friendly, scalable, and intelligent
											solutions tailored to your needs.
										</p>
									</div>

									{/* Service Cards */}
									<div className="card-scroll mt-8">
										<div className="cards">
											{/* Web Development */}
											<div className="card-custom">
												<div className="card__inner bg-6 px-md-5 py-md-6 px-3 py-4">
													<div className="card__title mb-md-4 mb-3">
														<h3 className="fw-semibold mb-2">Web Development</h3>
														<p className="mb-0">Creative. Scalable. Reliable.</p>
													</div>
													<div className="card__image-container zoom-img">
														<img
															className="card__image"
															src="/assets/imgs/services-list/img-4.png"
															alt="Web Development"
														/>
													</div>
													<div className="card__content mt-4 pb-4">
														<div className="d-md-flex content">
															<p className="fs-7 text-dark w-md-40 pe-8 mb-2">
																Front-End
															</p>
															<p className="card__description text-300 fs-6 mb-0">
																React, Next.js, and modern UI frameworks to
																build responsive and interactive websites.
															</p>
														</div>
														<div className="d-md-flex content">
															<p className="fs-7 text-dark w-md-40 pe-8 mb-2">
																Back-End
															</p>
															<p className="card__description text-300 fs-6 mb-0">
																Node.js, Python, and databases (SQL/NoSQL) for
																robust, scalable backends.
															</p>
														</div>
														<div className="d-md-flex content">
															<p className="fs-7 text-dark w-md-40 pe-8 mb-2">
																CMS & eCommerce
															</p>
															<p className="card__description text-300 fs-6 mb-0">
																WordPress, Shopify, and custom CMS for easy
																content & online store management.
															</p>
														</div>
													</div>
												</div>
											</div>

											{/* Mobile App Development */}
											<div className="card-custom">
												<div className="card__inner bg-6 px-md-5 py-md-6 px-3 py-4">
													<div className="card__title mb-md-4 mb-3">
														<h3 className="fw-semibold mb-2">
															App Development (iOS & Android)
														</h3>
														<p className="mb-0">Native. Cross-Platform. Modern.</p>
													</div>
													<div className="card__image-container zoom-img">
														<img
															className="card__image"
															src="/assets/imgs/services-list/img-2.png"
															alt="App Development"
														/>
													</div>
													<div className="card__content mt-4 pb-4">
														<div className="d-md-flex content">
															<p className="fs-7 text-dark w-md-40 pe-8 mb-2">
																iOS Development
															</p>
															<p className="card__description text-300 fs-6 mb-0">
																Swift & SwiftUI based apps with seamless
																Apple ecosystem integration.
															</p>
														</div>
														<div className="d-md-flex content">
															<p className="fs-7 text-dark w-md-40 pe-8 mb-2">
																Android Development
															</p>
															<p className="card__description text-300 fs-6 mb-0">
																Kotlin/Java-based apps designed for
																performance and compatibility.
															</p>
														</div>
														<div className="d-md-flex content">
															<p className="fs-7 text-dark w-md-40 pe-8 mb-2">
																Cross-Platform
															</p>
															<p className="card__description text-300 fs-6 mb-0">
																React Native and Flutter for cost-effective,
																single-codebase mobile apps.
															</p>
														</div>
													</div>
												</div>
											</div>

											{/* AI & ML Solutions */}
											<div className="card-custom">
												<div className="card__inner bg-6 px-md-5 py-md-6 px-3 py-4">
													<div className="card__title mb-md-4 mb-3">
														<h3 className="fw-semibold mb-2">AI & ML Solutions</h3>
														<p className="mb-0">Smart. Predictive. Scalable.</p>
													</div>
													<div className="card__image-container zoom-img">
														<img
															className="card__image"
															src="/assets/imgs/services-list/img-1.png"
															alt="AI & ML"
														/>
													</div>
													<div className="card__content mt-4 pb-4">
														<div className="d-md-flex content">
															<p className="fs-7 text-dark w-md-40 pe-8 mb-2">
																Machine Learning
															</p>
															<p className="card__description text-300 fs-6 mb-0">
																Custom ML models for predictions, automation,
																and data insights.
															</p>
														</div>
														<div className="d-md-flex content">
															<p className="fs-7 text-dark w-md-40 pe-8 mb-2">
																AI Automation
															</p>
															<p className="card__description text-300 fs-6 mb-0">
																Chatbots, workflow automation, and AI-driven
																tools for efficiency.
															</p>
														</div>
														<div className="d-md-flex content">
															<p className="fs-7 text-dark w-md-40 pe-8 mb-2">
																Computer Vision
															</p>
															<p className="card__description text-300 fs-6 mb-0">
																Image/video recognition and processing with
																state-of-the-art AI frameworks.
															</p>
														</div>
													</div>
												</div>
											</div>

											{/* Bot Automation */}
											<div className="card-custom">
												<div className="card__inner bg-6 px-md-5 py-md-6 px-3 py-4">
													<div className="card__title mb-md-4 mb-3">
														<h3 className="fw-semibold mb-2">Bot Automation</h3>
														<p className="mb-0">Efficient. Scalable. Reliable.</p>
													</div>
													<div className="card__image-container zoom-img">
														<img
															className="card__image"
															src="/assets/imgs/services-list/img-2.png"
															alt="Bot Automation"
														/>
													</div>
													<div className="card__content mt-4 pb-4">
														<div className="d-md-flex content">
															<p className="fs-7 text-dark w-md-40 pe-8 mb-2">
																Chatbots
															</p>
															<p className="card__description text-300 fs-6 mb-0">
																Conversational bots for customer support and
																engagement.
															</p>
														</div>
														<div className="d-md-flex content">
															<p className="fs-7 text-dark w-md-40 pe-8 mb-2">
																Process Automation
															</p>
															<p className="card__description text-300 fs-6 mb-0">
																Automating repetitive workflows to save time
																and costs.
															</p>
														</div>
														<div className="d-md-flex content">
															<p className="fs-7 text-dark w-md-40 pe-8 mb-2">
																Integration Bots
															</p>
															<p className="card__description text-300 fs-6 mb-0">
																Custom bots to integrate multiple apps and
																platforms seamlessly.
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									{/* End of Cards */}
								</div>
							</div>
						</div>
					</section>

					{/* Stats Section */}
					<div className="section-static-1 position-relative overflow-hidden z-0 py-8 bg-6">
						<div className="container">
							<div className="row align-items-center justify-content-between">
								<div className="col-lg-auto col-md-6">
									<div className="content text-center d-flex align-items-center">
										<span className="ds-3 text-primary fw-medium my-0">
											+<span className="odometer ds-1 text-dark fw-semibold">4</span>
										</span>
										<div className="text-start ms-2">
											<p className="fs-5 mb-0 text-300">Years of</p>
											<p className="fs-5 mb-0 fw-bold">Experience</p>
										</div>
									</div>
								</div>
								<div className="col-lg-auto col-md-6">
									<div className="content text-center d-flex align-items-center">
										<span className="ds-3 text-primary fw-medium my-0">
											+<span className="odometer ds-1 text-dark fw-semibold">120</span>
										</span>
										<div className="text-start ms-2">
											<p className="fs-5 mb-0 text-300">Projects</p>
											<p className="fs-5 mb-0 fw-bold">Completed</p>
										</div>
									</div>
								</div>
								<div className="col-lg-auto col-md-6">
									<div className="content text-center d-flex align-items-center">
										<span className="ds-3 text-primary fw-medium my-0">
											+<span className="odometer ds-1 text-dark fw-semibold">70</span>
										</span>
										<div className="text-start ms-2">
											<p className="fs-5 mb-0 text-300">Happy</p>
											<p className="fs-5 mb-0 fw-bold">Clients</p>
										</div>
									</div>
								</div>
								<div className="col-lg-auto col-md-6">
									<div className="content text-center d-flex align-items-center">
										<span className="ds-3 text-primary fw-medium my-0">
											+<span className="odometer ds-1 text-dark fw-semibold">5</span>
										</span>
										<div className="text-start ms-2">
											<p className="fs-5 mb-0 text-300">Awards</p>
											<p className="fs-5 mb-0 fw-bold">Won</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Contact Section */}
					<section
						id="contact"
						className="section-contact-1 bg-900 position-relative pt-150 pb-lg-250 pb-150 overflow-hidden"
					>
						<div className="container position-relative z-1">
							<h3 className="ds-3 mt-3 mb-3 text-primary">Get in touch</h3>
							<span className="fs-5 fw-medium text-200">
								I’m always excited to take on new projects and collaborate with
								innovative minds. Reach out today to discuss your ideas!
							</span>
							<div className="row mt-8">
								<div className="col-lg-4 d-flex flex-column">
									<div className="d-flex align-items-center mb-4">
										<div className="bg-white icon-shape icon-xxl border rounded-4">
											<i className="ri-phone-fill text-primary fs-26" />
										</div>
										<div className="ps-3">
											<span className="text-400 fs-5">Phone</span>
											<h6 className="mb-0">+92 311 7836704</h6>
										</div>
									</div>
									<div className="d-flex align-items-center mb-4">
										<div className="bg-white icon-shape icon-xxl border rounded-4">
											<i className="ri-mail-fill text-primary fs-26" />
										</div>
										<div className="ps-3">
											<span className="text-400 fs-5">Email</span>
											<h6 className="mb-0">hamzamanzoor0011@gmail.com</h6>
										</div>
									</div>
									<div className="d-flex align-items-center mb-4">
										<div className="bg-white icon-shape icon-xxl border rounded-4">
											<i className="ri-map-2-fill text-primary fs-26" />
										</div>
										<div className="ps-3">
											<span className="text-400 fs-5">Address</span>
											<h6 className="mb-0">Narowal, Punjab, Pakistan</h6>
										</div>
									</div>
								</div>

								<div className="col-lg-7 offset-lg-1">
									<h3>Leave a message</h3>
									<form>
										<div className="row mt-3">
											<div className="col-md-6">
												<label className="mb-1 mt-3 text-dark" htmlFor="name">
													Your name <span className="text-primary">*</span>
												</label>
												<input
													type="text"
													className="form-control border rounded-3"
													id="name"
													placeholder="Hamza"
												/>
											</div>
											<div className="col-md-6">
												<label className="mb-1 mt-3 text-dark" htmlFor="email">
													Email <span className="text-primary">*</span>
												</label>
												<input
													type="email"
													className="form-control border rounded-3"
													id="email"
													placeholder="contact.hamza@gmail.com"
												/>
											</div>
											<div className="col-md-6">
												<label className="mb-1 mt-3 text-dark" htmlFor="phone">
													Phone <span className="text-primary">*</span>
												</label>
												<input
													type="text"
													className="form-control border rounded-3"
													id="phone"
													placeholder="+92 343 4783677"
												/>
											</div>
											<div className="col-md-6">
												<label
													className="mb-1 mt-3 text-dark"
													htmlFor="subject"
												>
													Subject <span className="text-primary">*</span>
												</label>
												<input
													type="text"
													className="form-control border rounded-3"
													id="subject"
													placeholder="Project discussion..."
												/>
											</div>
											<div className="col-12">
												<label
													className="mb-1 mt-3 text-dark"
													htmlFor="message"
												>
													Message <span className="text-primary">*</span>
												</label>
												<textarea
													className="form-control border rounded-3 pb-10"
													id="message"
													placeholder="Your message here..."
												/>
											</div>
											<div className="col-12">
												<button type="submit" className="btn btn-gradient mt-3">
													Send Message{" "}
													<i className="ri-arrow-right-up-line"></i>
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</section>
				</div>
			</Layout>
		</>
	)
}
