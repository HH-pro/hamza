import Layout from "@/components/layout/Layout"

export default function Work() {
	return (
		<>
			<Layout headerStyle={1} footerStyle={1}>
				<div>
					<section className="section-work pt-120 pb-150">
						<div className="container">
							<div className="row">
								<div className="col-lg-8 mx-lg-auto">
									<div className="text-center">
										<span className="btn btn-gradient d-inline-block text-uppercase">Recent Work</span>
										<h3 className="ds-3 mt-3 mb-4 text-dark">
											Explore <span className="text-300">My Latest Work</span>
										</h3>
										<p className="text-300 fs-5">
											Dive into my portfolio and discover the technical expertise and innovative solutions behind each design. 
											Experience how I transform ideas into seamless, functional, and visually engaging websites and applications.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="container">
							<div className="row">
								<div className="card-scroll mt-8">
									<div className="cards">

										{/* Social Website */}
										<div className="card-custom" data-index={0}>
											<div className="card__inner bg-6 p-lg-6 p-md-4 p-3">
												<div className="card__image-container zoom-img position-relative">
													<img className="card__image" src="/assets/imgs/work/img-1.png" alt="Social Website" />
												</div>
												<div className="card__content px-md-4 px-3">
													<div className="card__title d-md-flex align-items-center mb-0 mb-lg-2">
														<p className="text-primary mb-0 mb-md-2">WEB DEVELOPMENT</p>
														<h3 className="fw-semibold">Social Website</h3>
													</div>
													<p className="text-300 mb-lg-auto mb-md-4 mb-3">
														Your ultimate destination for exploring the world of cinema! At WeCinema.co, we bring you a seamless 
														and immersive experience to discover, watch, and enjoy your favorite movies and shows.
													</p>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Client</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">Scott M</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Completion Time</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">3 months</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Tools</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">Reactjs, Nodejs, Mongodb, TypeScript</p>
													</div>
												</div>
											</div>
										</div>

										{/* Voting Buddy Website */}
										<div className="card-custom" data-index={0}>
											<div className="card__inner bg-6 p-lg-6 p-md-4 p-3">
												<div className="card__image-container zoom-img position-relative">
													<img className="card__image" src="/assets/imgs/work/img-3.png" alt="Voting Buddy Website" />
												</div>
												<div className="card__content px-md-4 px-3">
													<div className="card__title d-md-flex align-items-center mb-0 mb-lg-2">
														<p className="text-primary mb-0 mb-md-2">WEB DEVELOPMENT</p>
														<h3 className="fw-semibold">Voting Buddy Website</h3>
													</div>
													<p className="text-300 mb-lg-auto mb-md-4 mb-3">
														VotingBuddy.com is an online platform designed to make voting simpler and more accessible for everyone. 
														It provides election reminders, guides, and personalized resources.
													</p>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Client</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">Conceptual JSC</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Completion Time</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">2 months</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Tools</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">Django, SQL, Bootstrap</p>
													</div>
												</div>
											</div>
										</div>

										{/* Portfolio Website */}
										<div className="card-custom" data-index={0}>
											<div className="card__inner bg-6 p-lg-6 p-md-4 p-3">
												<div className="card__image-container zoom-img position-relative">
													<img className="card__image" src="/assets/imgs/work/img-2.png" alt="Portfolio Website" />
												</div>
												<div className="card__content px-md-4 px-3">
													<div className="card__title d-md-flex align-items-center mb-0 mb-lg-2">
														<p className="text-primary mb-0 mb-md-2">WEB DEVELOPMENT</p>
														<h3 className="fw-semibold">Portfolio Website</h3>
													</div>
													<p className="text-300 mb-lg-auto mb-md-4 mb-3">
														A digital portfolio website to showcase personal projects, skills, and achievements. 
														Designed to be minimal yet engaging for clients and recruiters.
													</p>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Client</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">Husnain Manzoor</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Completion Time</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">1 month</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Tools</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">Reactjs</p>
													</div>
												</div>
											</div>
										</div>

										{/* Ecommerce Store */}
										<div className="card-custom" data-index={0}>
											<div className="card__inner bg-6 p-lg-6 p-md-4 p-3">
												<div className="card__image-container zoom-img position-relative">
													<img className="card__image" src="/assets/imgs/work/img-4.png" alt="Ecommerce Store" />
												</div>
												<div className="card__content px-md-4 px-3">
													<div className="card__title d-md-flex align-items-center mb-0 mb-lg-2">
														<p className="text-primary mb-0 mb-md-2">WEB DEVELOPMENT</p>
														<h3 className="fw-semibold">Ecommerce Store</h3>
													</div>
													<p className="text-300 mb-lg-auto mb-md-4 mb-3">
														An e-commerce platform featuring product catalog, shopping cart, secure checkout, 
														and user-friendly experience for buyers.
													</p>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Client</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">Asiya U</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Completion Time</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">4 months</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Tools</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">Django, SQL, Bootstrap, JavaScript</p>
													</div>
												</div>
											</div>
										</div>

										{/* Freeform Chat App */}
										<div className="card-custom" data-index={0}>
											<div className="card__inner bg-6 p-lg-6 p-md-4 p-3">
												<div className="card__image-container zoom-img position-relative">
													<img className="card__image" src="/assets/imgs/work/chat-app.png" alt="Freeform Chat App" />
												</div>
												<div className="card__content px-md-4 px-3">
													<div className="card__title d-md-flex align-items-center mb-0 mb-lg-2">
														<p className="text-primary mb-0 mb-md-2">APP DEVELOPMENT</p>
														<h3 className="fw-semibold">Freeform Chat App</h3>
													</div>
													<p className="text-300 mb-lg-auto mb-md-4 mb-3">
														A real-time chat application that supports group messaging, media sharing, and end-to-end encryption. 
														Built for seamless communication with a modern, intuitive interface.
													</p>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Client</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">Internal Project</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Completion Time</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">2.5 months</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Tools</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">React Native, Firebase, TypeScript</p>
													</div>
												</div>
											</div>
										</div>

										{/* Plant Caring App */}
										<div className="card-custom" data-index={0}>
											<div className="card__inner bg-6 p-lg-6 p-md-4 p-3">
												<div className="card__image-container zoom-img position-relative">
													<img 
  className="card__image w-4 h-40 object-cover rounded-lg mx-auto" 
  src="/assets/imgs/work/plants.jpeg" 
  alt="Plant Caring App" 
/>

												</div>
												<div className="card__content px-md-4 px-3">
													<div className="card__title d-md-flex align-items-center mb-0 mb-lg-2">
														<p className="text-primary mb-0 mb-md-2">APP DEVELOPMENT</p>
														<h3 className="fw-semibold">Plant Caring App</h3>
													</div>
													<p className="text-300 mb-lg-auto mb-md-4 mb-3">
														An intelligent plant care assistant that reminds users to water, fertilize, and monitor their plants. 
														Includes plant recognition and a care database for personalized gardening tips.
													</p>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Client</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">Green Life Co.</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Completion Time</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">3 months</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Tools</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">Flutter, Firebase, TensorFlow Lite</p>
													</div>
												</div>
											</div>
										</div>

										{/* Worker Performance App */}
										<div className="card-custom" data-index={0}>
											<div className="card__inner bg-6 p-lg-6 p-md-4 p-3">
												<div className="card__image-container zoom-img position-relative">
													<img className="card__image" src="/assets/imgs/work/worker-app.png" alt="Worker Performance App" />
												</div>
												<div className="card__content px-md-4 px-3">
													<div className="card__title d-md-flex align-items-center mb-0 mb-lg-2">
														<p className="text-primary mb-0 mb-md-2">APP DEVELOPMENT</p>
														<h3 className="fw-semibold">Worker Performance App</h3>
													</div>
													<p className="text-300 mb-lg-auto mb-md-4 mb-3">
														A company workforce performance tracker that monitors employee productivity, assigns tasks, 
														and generates detailed analytics dashboards for HR and management.
													</p>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Client</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">Techno Solutions</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Completion Time</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">5 months</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Tools</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">React Native, Node.js, PostgreSQL</p>
													</div>
												</div>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</Layout>
		</>
	)
}
