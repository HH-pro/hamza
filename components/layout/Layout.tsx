'use client'
import { useEffect, useState } from "react"
import AddClassBody from '../elements/AddClassBody'
import BackToTop from '../elements/BackToTop'
import DataBg from '../elements/DataBg'
import ImageHoverEffects from '../elements/ImageHoverEffects'
import Breadcrumb from './Breadcrumb'
import MobileMenu from './MobileMenu'
import Footer1 from './footer/Footer1'
import Footer2 from './footer/Footer2'
import Footer3 from './footer/Footer3'
import Header1 from "./header/Header1"
import Header2 from './header/Header2'
import Header3 from './header/Header3'

interface LayoutProps {
  headerStyle?: Number
  footerStyle?: Number
  children?: React.ReactNode
  breadcrumbTitle?: string
}

export default function Layout({ headerStyle, footerStyle, breadcrumbTitle, children }: LayoutProps) {
  const [scroll, setScroll] = useState<boolean>(false)
  const [wowInitialized, setWowInitialized] = useState<boolean>(false)

  // Mobile Menu
  const [isMobileMenu, setMobileMenu] = useState<boolean>(false)
  const handleMobileMenu = (): void => {
    setMobileMenu(!isMobileMenu)
    !isMobileMenu
      ? document.body.classList.add("mobile-menu-active")
      : document.body.classList.remove("mobile-menu-active")
  }

  // Search
  const [isSearch, setSearch] = useState<boolean>(false)
  const handleSearch = (): void => setSearch(!isSearch)

  // OffCanvas
  const [isOffCanvas, setOffCanvas] = useState<boolean>(false)
  const handleOffCanvas = (): void => setOffCanvas(!isOffCanvas)

  // Initialize WOW.js
  useEffect(() => {
    // Check if we're on the client side and WOW hasn't been initialized
    if (typeof window !== 'undefined' && !wowInitialized) {
      // Dynamic import of wowjs
      import('wowjs').then((WOW) => {
        // Make sure to clean up any existing instance
        if ((window as any).wow) {
          (window as any).wow = null
        }
        
        // Initialize new WOW instance
        (window as any).wow = new WOW.WOW({
          live: false,
          offset: 100, // Add default offset
          mobile: true, // Enable on mobile
          callback: function(box: Element) {
            // Optional callback when animation completes
            console.log('WOW animation completed:', box)
          }
        })
        
        // Initialize WOW
        (window as any).wow.init()
        setWowInitialized(true)
      }).catch((error) => {
        console.error('Failed to load WOW.js:', error)
      })
    }

    // Cleanup function
    return () => {
      if ((window as any).wow) {
        // Optional: Clean up WOW instance if needed
        (window as any).wow = null
      }
    }
  }, [wowInitialized])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = (): void => {
      const scrollCheck: boolean = window.scrollY > 100
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck)
      }
    }

    document.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [scroll])

  return (
    <>
      <div id="top" />
      <AddClassBody />
      <DataBg />
      <ImageHoverEffects />

      {/* Headers */}
      {!headerStyle && <Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isOffCanvas={isOffCanvas} handleOffCanvas={handleOffCanvas} />}
      {headerStyle == 1 ? <Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isOffCanvas={isOffCanvas} handleOffCanvas={handleOffCanvas} /> : null}
      {headerStyle == 2 ? <Header2 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isOffCanvas={isOffCanvas} handleOffCanvas={handleOffCanvas} /> : null}
      {headerStyle == 3 ? <Header3 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isOffCanvas={isOffCanvas} handleOffCanvas={handleOffCanvas} /> : null}

      {/* Mobile Menu */}
      <MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />

      <main className="main">
        {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}
        {children}
      </main>

      {/* Footers */}
      {!footerStyle && <Footer1 />}
      {footerStyle == 1 ? <Footer1 /> : null}
      {footerStyle == 2 ? <Footer2 /> : null}
      {footerStyle == 3 ? <Footer3 /> : null}

      <BackToTop target="#top" />
    </>
  )
}