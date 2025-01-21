
import Layout from "@/components/layout/Layout"
import Link from "next/link"
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
										<Link href="/#" className="btn btn-gradient d-inline-block text-uppercase"> recent Work </Link>
										<h3 className="ds-3 mt-3 mb-4 text-dark">Explore <span className="text-300">My Latest Work</span> </h3>
										<p className="text-300 fs-5">
										Dive into my portfolio and discover the technical expertise and innovative solutions behind each design. Experience how I transform ideas into seamless, functional, and visually engaging websites.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="container">
							<div className="row">
								<div className="card-scroll mt-8">
									<div className="cards">
										{/* prettier-ignore */}
										<div className="card-custom" data-index={0}>
											<div className="card__inner bg-6 p-lg-6 p-md-4 p-3">
												<div className="card__image-container zoom-img position-relative">
													<img className="card__image" src="/assets/imgs/work/img-1.png" alt="" />
													<Link href="/work-single" className="card-image-overlay position-absolute start-0 end-0 w-100 h-100" />
												</div>
												<div className="card__content px-md-4 px-3">
													<div className="card__title d-md-flex align-items-center mb-0 mb-lg-2">
														<Link href="/work-single" className="card_title_link">
															<p className="text-primary mb-0 mb-md-2">WEB DEVELOPMENT</p>
															<h3 className="fw-semibold">Social Website</h3>
														</Link>
														<Link href="/work-single" className="card-icon d-none d-md-inline-flex border text-dark border-dark icon-shape ms-auto icon-md rounded-circle">
															<i className="ri-arrow-right-up-line" />
														</Link>
													</div>
													<p className="text-300 mb-lg-auto mb-md-4 mb-3">Your ultimate destination for exploring the world of cinema! At WeCinema.co, we bring you a seamless and immersive experience to discover, watch, and enjoy your favorite movies and shows. Dive into diverse genres, stay updated with the latest releases, and let us enhance your entertainment journey like never before.</p>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">
															Client
														</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">
															Scott M
														</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">
															Completion Time
														</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">
															3 months
														</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">
															Tools
														</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">
															Reactjs, Nodejs, Mongodb, TypeScript 
														</p>
													</div>
												</div>
											</div>
										</div>
										<div className="card-custom" data-index={0}>
											<div className="card__inner bg-6 p-lg-6 p-md-4 p-3">
												<div className="card__image-container zoom-img position-relative">
													<img className="card__image" src="/assets/imgs/work/img-3.png" alt="" />
													<Link href="/work-single" className="card-image-overlay position-absolute start-0 end-0 w-100 h-100" />
												</div>
												<div className="card__content px-md-4 px-3">
													<div className="card__title d-md-flex align-items-center mb-0 mb-lg-2">
														<Link href="/work-single" className="card_title_link">
															<p className="text-primary mb-0 mb-md-2">WEB DEVELOPMENT</p>
															<h3 className="fw-semibold">Voting Buddy Website</h3>
														</Link>
														<Link href="/work-single" className="card-icon d-none d-md-inline-flex border text-dark border-dark icon-shape ms-auto icon-md rounded-circle">
															<i className="ri-arrow-right-up-line" />
														</Link>
													</div>
													<p className="text-300 mb-lg-auto mb-md-4 mb-3">VotingBuddy.com is an online platform designed to make voting simpler and more accessible for everyone. It offers tools and resources to help users understand voting processes, track election dates, and make informed decisions. Whether you're a first-time voter or an experienced participant, VotingBuddy provides personalized guidance to ensure you never miss an election or important updates.</p>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">
															Client
														</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">
															Conceptual JSC
														</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">
															Completion Time
														</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">
															2 months
														</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">
															Tools
														</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">
															Django, sql, bootstrap
														</p>
													</div>
												</div>
											</div>
										</div>
										<div className="card-custom" data-index={0}>
											<div className="card__inner bg-6 p-lg-6 p-md-4 p-3">
												<div className="card__image-container zoom-img position-relative">
													<img className="card__image" src="/assets/imgs/work/img-2.png" alt="" />
													<Link href="/work-single" className="card-image-overlay position-absolute start-0 end-0 w-100 h-100" />
												</div>
												<div className="card__content px-md-4 px-3">
													<div className="card__title d-md-flex align-items-center mb-0 mb-lg-2">
														<Link href="/work-single" className="card_title_link">
															<p className="text-primary mb-0 mb-md-2">WEB DEVELOPMENT</p>
															<h3 className="fw-semibold">Portfoilio Website</h3>
														</Link>
														<Link href="/work-single" className="card-icon d-none d-md-inline-flex border text-dark border-dark icon-shape ms-auto icon-md rounded-circle">
															<i className="ri-arrow-right-up-line" />
														</Link>
													</div>
													<p className="text-300 mb-lg-auto mb-md-4 mb-3">A portfolio website is a personalized online platform where individuals showcase their skills, work, and accomplishments. It serves as a digital resume, featuring projects, experiences, and creative work in an organized and visually appealing way. Ideal for professionals like designers, developers, photographers, and writers, a portfolio website highlights expertise, builds credibility, and connects with potential clients or employers.</p>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">
															Client
														</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">
															Husnain Manzoor
														</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">
															Completion Time
														</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">
															1 month
														</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">
															Tools
														</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">
															Reactjs
														</p>
													</div>
												</div>
											</div>
										</div>
										<div className="card-custom" data-index={0}>
											<div className="card__inner bg-6 p-lg-6 p-md-4 p-3">
												<div className="card__image-container zoom-img position-relative">
													<img className="card__image" src="/assets/imgs/work/img-4.png" alt="" />
													<Link href="/work-single" className="card-image-overlay position-absolute start-0 end-0 w-100 h-100" />
												</div>
												<div className="card__content px-md-4 px-3">
													<div className="card__title d-md-flex align-items-center mb-0 mb-lg-2">
														<Link href="/work-single" className="card_title_link">
															<p className="text-primary mb-0 mb-md-2">WEB DEVELOPMENT</p>
															<h3 className="fw-semibold">Ecommerce STORE</h3>
														</Link>
														<Link href="/work-single" className="card-icon d-none d-md-inline-flex border text-dark border-dark icon-shape ms-auto icon-md rounded-circle">
															<i className="ri-arrow-right-up-line" />
														</Link>
													</div>
													<p className="text-300 mb-lg-auto mb-md-4 mb-3">An e-commerce store is an online platform where businesses sell products or services directly to customers over the internet. It offers a convenient shopping experience, allowing users to browse, select, and purchase items from anywhere, anytime. E-commerce stores often include features like product catalogs, secure payment options, and customer reviews. They cater to various industries, from fashion and electronics to groceries and digital products, making shopping easy and accessible for everyone.</p>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">
															Client
														</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">
															Asiya U
														</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">
															Completion Time
														</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">
															4 months
														</p>
													</div>
													<div className="d-md-flex content">
														<p className="mb-0 fs-7 text-dark text-uppercase w-40">
															Tools
														</p>
														<p className="mb-0 card__description text-300 fs-6 mb-0">
															Django, sql, bootstrap, javascript
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