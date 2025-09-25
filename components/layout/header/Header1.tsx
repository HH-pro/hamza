'use client'
import ThemeSwitch from '@/components/elements/ThemeSwitch'
import Link from 'next/link'
import Menu from '../Menu'
import MobileMenu from '../MobileMenu'
import OffCanvas from '../OffCanvas'

export default function Header1({
  scroll,
  isMobileMenu,
  handleMobileMenu,
  isOffCanvas,
  handleOffCanvas,
}: any) {
  return (
    <header>
      <nav
        className={`navbar navbar-expand-lg navbar-light w-100 flex-nowrap z-999 p-0 ${
          scroll ? 'navbar-stick' : ''
        }`}
        style={{
          position: scroll ? 'fixed' : 'relative',
          top: scroll ? '0' : 'auto',
        }}
      >
        {/* OffCanvas trigger */}
        <button
          className="navbar-menu p-4 text-center square-100 menu-tigger icon_80 icon-shape d-none d-md-flex"
          onClick={handleOffCanvas}
          aria-label="Toggle OffCanvas"
        >
          <i className="ri-menu-2-line" />
        </button>

        <div className="container py-3 px-0">
          {/* Logo */}
          <Link
            className="navbar-brand d-flex main-logo align-items-center ms-lg-0 ms-md-5 ms-3"
            href="/"
          >
            <img src="/assets/imgs/template/favicon.svg" alt="infinia" />
            <span className="fs-4 ms-2">Hamza Manzoor</span>
          </Link>

          {/* Desktop Menu */}
          <div className="d-none d-lg-flex">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <Menu />
            </div>
          </div>

          Right Side (Social + Mobile Burger)
          {/* <div className="navbar-social d-flex align-items-center pe-3">
            {/* Social Links */}
            <div className="d-md-flex d-none gap-3">
              <Link href="https://wa.link/ykd7rb" target="_blank">
                <i className="ri-whatsapp-fill fs-18" />
              </Link>
              <Link href="https://linkedin.com" target="_blank">
                <i className="ri-linkedin-fill fs-18" />
              </Link>
              <Link href="https://github.com/HH-PRO" target="_blank">
                <i className="ri-github-fill fs-18" />
              </Link>
            </div> */}

            {/* Mobile Burger Icon */}
            <div
              className="burger-icon border rounded-3 ms-3"
              onClick={handleMobileMenu}
            >
              <span className="burger-icon-top" />
              <span className="burger-icon-mid" />
              <span className="burger-icon-bottom" />
            </div>
          </div>
        </div>

        <ThemeSwitch />
      </nav>

      {/* OffCanvas Menu */}
      <OffCanvas isOffCanvas={isOffCanvas} handleOffCanvas={handleOffCanvas} />

      {/* Mobile Menu */}
      <MobileMenu
        isMobileMenu={isMobileMenu}
        handleMobileMenu={handleMobileMenu}
      />
    </header>
  )
}
