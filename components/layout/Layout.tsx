'use client'
import { useEffect, useState } from "react"
import AddClassBody from '../elements/AddClassBody'
import BackToTop from '../elements/BackToTop'
import DataBg from '../elements/DataBg'
import ImageHoverEffects from '../elements/ImageHoverEffects'
import Reveal from '../elements/Reveal'
import WhatsAppButton from '../elements/WhatsAppButton'
import Breadcrumb from './Breadcrumb'
import Footer1 from './footer/Footer1'
import Header1 from "./header/Header1"

interface LayoutProps {
  headerStyle?: Number
  footerStyle?: Number
  children?: React.ReactNode
  breadcrumbTitle?: string
}

export default function Layout({ headerStyle, footerStyle, breadcrumbTitle, children }: LayoutProps) {
  const [scroll, setScroll] = useState<boolean>(false)

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

  // Initialize WOW.js
  useEffect(() => {
    // Check if WOW is available globally and not initialized
    if (typeof window !== 'undefined' && window.WOW && !(window as any).wowInitialized) {
      // Initialize new WOW instance
      (window as any).wow = new window.WOW({
        live: false,
        offset: 100,
        mobile: true,
        boxClass: 'wow',
        animateClass: 'animated'
      })
      
      // Initialize WOW
      (window as any).wow.init()
      (window as any).wowInitialized = true
    }
  }, [])

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
      <Reveal />

      {/* Header */}
      <Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />

      <main className="main">
        {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}
        {children}
      </main>

      {/* Footer */}
      <Footer1 />

      <BackToTop target="#top" />
      <WhatsAppButton />
    </>
  )
}

// Add type declaration for window.WOW
declare global {
  interface Window {
    WOW: any;
    wow: any;
    wowInitialized?: boolean;
  }
}