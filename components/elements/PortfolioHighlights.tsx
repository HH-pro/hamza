export default function PortfolioHighlights() {
	return (
		<div className="container">
			<div className="row justify-content-between mt-6">
				{/* Wecinema (Web) */}
				<div className="col-lg-6 col-12 mb-4">
					<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
						<a href="https://wecinema.co" target="_blank" rel="noopener noreferrer">
							<img
								className="rounded-3 w-100 zoom-img"
								src="/assets/imgs/projects/projects-1/1.png"
								alt="Wecinema"
							/>
						</a>
						<div className="d-flex align-items-center mt-4">
							<div className="project-card-content">
								<h3 className="fw-semibold">Bussiness Website</h3>
								<p>Wecinema</p>
							</div>
							<a
								href="https://wecinema.co/"
								target="_blank"
								rel="noopener noreferrer"
								className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
							>
								<i className="ri-arrow-right-up-line" />
							</a>
						</div>
					</div>
				</div>

				{/* Risby Homes (Web) */}
				<div className="col-lg-6 col-12 mb-4">
					<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
						<a href="https://risbyhomes.co.uk/" target="_blank" rel="noopener noreferrer">
							<img
								className="rounded-3 w-100 zoom-img"
								src="/assets/imgs/projects/projects-1/3.png"
								alt="Risby Homes"
							/>
						</a>
						<div className="d-flex align-items-center mt-4">
							<div className="project-card-content">
								<h3 className="fw-semibold">Property Development</h3>
								<p>Risby Homes</p>
							</div>
							<a
								href="https://risbyhomes.co.uk/"
								target="_blank"
								rel="noopener noreferrer"
								className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
							>
								<i className="ri-arrow-right-up-line" />
							</a>
						</div>
					</div>
				</div>

				{/* GlazeMe (App) */}
				<div className="col-lg-6 col-12 mb-4">
					<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
						<div className="text-center">
							<img
								className="rounded-3 zoom-img mx-auto"
								src="/assets/imgs/projects/projects-1/glazeme.jpeg"
								alt="GlazeMe"
								style={{ width: "220px", height: "auto", maxWidth: "100%" }}
							/>
						</div>
						<div className="d-flex align-items-center mt-4">
							<div className="project-card-content">
								<h3 className="fw-semibold">GlazeMe</h3>
								<p className="mb-0">iOS • AI Glaze Generation &amp; Gifting App</p>
							</div>
							<a
								href="#"
								className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
								onClick={(e) => {
									e.preventDefault();
									alert('App store link coming soon!');
								}}
							>
								<i className="ri-arrow-right-up-line" />
							</a>
						</div>
					</div>
				</div>

				{/* MadeInPK (App) */}
				<div className="col-lg-6 col-12 mb-4">
					<div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
						<div className="text-center">
							<img
								className="rounded-3 zoom-img mx-auto"
								src="/assets/imgs/projects/projects-1/madeinpk.jpeg"
								alt="MadeInPK"
								style={{ width: "220px", height: "auto", maxWidth: "100%" }}
							/>
						</div>
						<div className="d-flex align-items-center mt-4">
							<div className="project-card-content">
								<h3 className="fw-semibold">MadeInPK</h3>
								<p className="mb-0">iOS &amp; Android • B2B Textile Trading Marketplace</p>
							</div>
							<a
								href="#"
								className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
								onClick={(e) => {
									e.preventDefault();
									alert('App store link coming soon!');
								}}
							>
								<i className="ri-arrow-right-up-line" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
