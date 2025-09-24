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
										<span className="btn btn-gradient d-inline-block text-uppercase"> recent Work </span>
										<h3 className="ds-3 mt-3 mb-4 text-dark">
											Explore <span className="text-300">My Latest Work</span>
										</h3>
										<p className="text-300 fs-5">
											Here are some of the mobile apps I have built for both Android and iOS, 
											designed to deliver high performance, smooth UI, and practical solutions.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="container">
							<div className="row">
								<div className="card-scroll mt-8">
									<div className="cards">

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
														A real-time chat app available on both Android and iOS. Supports group chats, media sharing, 
														and end-to-end encryption with a modern interface.
													</p>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Platforms</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">Android, iOS</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Completion Time</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">2.5 months</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Tools</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">
															React Native, Firebase, TypeScript
														</p>
													</div>
												</div>
											</div>
										</div>

										{/* Plant Caring App */}
										<div className="card-custom" data-index={1}>
											<div className="card__inner bg-6 p-lg-6 p-md-4 p-3">
												<div className="card__image-container zoom-img position-relative">
													<img className="card__image" src="/assets/imgs/work/plant-app.png" alt="Plant Caring App" />
												</div>
												<div className="card__content px-md-4 px-3">
													<div className="card__title d-md-flex align-items-center mb-0 mb-lg-2">
														<p className="text-primary mb-0 mb-md-2">APP DEVELOPMENT</p>
														<h3 className="fw-semibold">Plant Caring App</h3>
													</div>
													<p className="text-300 mb-lg-auto mb-md-4 mb-3">
														A mobile app for Android and iOS that helps users take care of plants with reminders, 
														plant identification, and care guides.
													</p>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Platforms</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">Android, iOS</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Completion Time</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">3 months</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Tools</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">
															Flutter, Firebase, TensorFlow Lite
														</p>
													</div>
												</div>
											</div>
										</div>

										{/* Workers Data & Performance App */}
										<div className="card-custom" data-index={2}>
											<div className="card__inner bg-6 p-lg-6 p-md-4 p-3">
												<div className="card__image-container zoom-img position-relative">
													<img className="card__image" src="/assets/imgs/work/workers-app.png" alt="Workers Performance App" />
												</div>
												<div className="card__content px-md-4 px-3">
													<div className="card__title d-md-flex align-items-center mb-0 mb-lg-2">
														<p className="text-primary mb-0 mb-md-2">APP DEVELOPMENT</p>
														<h3 className="fw-semibold">Workers Data & Performance App</h3>
													</div>
													<p className="text-300 mb-lg-auto mb-md-4 mb-3">
														A workforce management app for Android and iOS that tracks employee attendance, 
														performance, and project progress with real-time analytics.
													</p>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Platforms</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">Android, iOS</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Completion Time</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">4 months</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">Tools</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">
															React Native, Node.js, PostgreSQL, AWS
														</p>
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
