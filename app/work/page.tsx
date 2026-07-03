'use client'
import Layout from "@/components/layout/Layout"
import dynamic from 'next/dynamic'

const PortfolioFilter = dynamic(() => import('@/components/elements/PortfolioFilter'), {
	ssr: false,
	loading: () => <div className="text-center py-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>
})

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

						<div className="fillter-project position-relative" data-background="assets/imgs/projects/projects-1/background.png">
							<PortfolioFilter />
						</div>
					</section>
				</div>
			</Layout>
		</>
	)
}
