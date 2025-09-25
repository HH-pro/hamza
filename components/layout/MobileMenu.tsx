'use client'
import Link from 'next/link'
import PerfectScrollbar from 'react-perfect-scrollbar'

interface MobileMenuProps {
	isMobileMenu: boolean
	handleMobileMenu: () => void
}

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: MobileMenuProps) {
	return (
		<div
			className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar button-bg-2 ${
				isMobileMenu ? 'sidebar-visible' : ''
			}`}
		>
			<div className="mobile-header-wrapper-inner">
				{/* Logo & Close Button */}
				<div className="mobile-header-logo d-flex justify-between align-items-center">
					<Link className="d-flex main-logo align-items-center d-inline-flex" href="/">
						<img src="/assets/imgs/footer-1/logo.svg" alt="logo" />
						<span className="fs-5 ms-2 text-dark fw-semibold">Hamza Manzoor</span>
					</Link>
					<div
						className={`burger-icon border rounded-3 ${isMobileMenu ? 'burger-close' : ''}`}
						onClick={handleMobileMenu}
					>
						<span className="burger-icon-top" />
						<span className="burger-icon-mid" />
						<span className="burger-icon-bottom" />
					</div>
				</div>

				{/* Scrollable Menu */}
				<div className="mobile-header-content-area mt-4">
					<PerfectScrollbar className="perfect-scroll">
						<div className="mobile-menu-wrap mobile-header-border">
							<nav>
								<ul className="mobile-menu font-heading ps-0">
									<li className="nav-item">
										<Link className="nav-link" href="/" onClick={handleMobileMenu}>
											Home
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" href="/services" onClick={handleMobileMenu}>
											Services
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" href="/work" onClick={handleMobileMenu}>
											Portfolio
										</Link>
									</li>
									
									
									<li className="nav-item">
										<Link className="nav-link" href="/#contact" onClick={handleMobileMenu}>
											Contact
										</Link>
									</li>
								</ul>
							</nav>
						</div>
					</PerfectScrollbar>
				</div>
			</div>
		</div>
	)
}
