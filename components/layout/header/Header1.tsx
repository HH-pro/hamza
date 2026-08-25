'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ThemeSwitch from '@/components/elements/ThemeSwitch'
import { projects, resolveImg } from '@/lib/projects'
import { caseStudies } from '@/lib/caseStudies'

export default function Header1({ isMobileMenu, handleMobileMenu }: any) {
  const pathname = usePathname()
  const [openDrop, setOpenDrop] = useState(false)
  const dropRef = useRef<HTMLLIElement | null>(null)

  // Close everything on route change.
  useEffect(() => {
    setOpenDrop(false)
    if (isMobileMenu) handleMobileMenu()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Escape closes; outside click closes the dropdown.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpenDrop(false)
      if (isMobileMenu) handleMobileMenu()
    }
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setOpenDrop(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [isMobileMenu, handleMobileMenu])

  return (
    <header className="hm-header">
      <div className="hm-nav">
        <div className="hm-nav__inner">
          <Link href="/" className="hm-brand" aria-label="Hamza Manzoor — home">
            <span className="hm-logo-mark" aria-hidden="true" />
            <span className="hm-brand__text">
              Hamza<span className="hm-brand__accent">Manzoor</span>
            </span>
          </Link>

          {/* Desktop menu */}
          <nav className="hm-nav__menu" aria-label="Main">
            <ul className="hm-nav__list">
              <li
                className="hm-nav__has-drop"
                ref={dropRef}
                onMouseEnter={() => setOpenDrop(true)}
                onMouseLeave={() => setOpenDrop(false)}
              >
                <button
                  type="button"
                  className={`hm-nav__link hm-nav__droptoggle${openDrop ? ' is-open' : ''}`}
                  onClick={() => setOpenDrop((v) => !v)}
                  aria-expanded={openDrop}
                  aria-haspopup="true"
                >
                  <span>Case Studies</span>
                  <svg
                    className="hm-chev"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div className={`hm-dropdown${openDrop ? ' is-open' : ''}`}>
                  <p className="hm-dropdown__label">Selected builds</p>
                  <div className="hm-dropdown__grid">
                    {caseStudies.map((c) => (
                      <Link
                        href={`/case-studies/${c.slug}`}
                        className="hm-dropdown__card"
                        key={c.slug}
                      >
                        <span className="hm-dropdown__thumb">
                          <img src={resolveImg(c.gallery[0])} alt="" loading="lazy" />
                        </span>
                        <span className="hm-dropdown__body">
                          <span className="hm-dropdown__title">{c.navLabel}</span>
                          <span className="hm-dropdown__tag">{c.kind}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <Link href="/work" className="hm-dropdown__all">
                    View all {projects.length} projects
                    <i className="ri-arrow-right-line" aria-hidden="true" />
                  </Link>
                </div>
              </li>

              <li>
                <Link
                  href="/work"
                  className={`hm-nav__link${pathname === '/work' ? ' is-active' : ''}`}
                  aria-current={pathname === '/work' ? 'page' : undefined}
                >
                  Portfolio
                </Link>
              </li>
            </ul>

            <ThemeSwitch />

            <Link href="/#contact" className="hm-nav__cta">
              Book a Call
            </Link>
          </nav>

          {/* Mobile controls */}
          <div className="hm-nav__mobile">
            <ThemeSwitch />
            <button
              type="button"
              className={`hm-burger${isMobileMenu ? ' is-open' : ''}`}
              onClick={handleMobileMenu}
              aria-label={isMobileMenu ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenu}
              aria-controls="hm-mobile-panel"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        <div
          id="hm-mobile-panel"
          className={`hm-nav__panel${isMobileMenu ? ' is-open' : ''}`}
          hidden={!isMobileMenu}
        >
          <p className="hm-dropdown__label">Case studies</p>
          <ul className="hm-nav__panel-list">
            {caseStudies.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/case-studies/${c.slug}`}
                  className="hm-nav__link"
                  onClick={handleMobileMenu}
                >
                  {c.navLabel}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/work" className="hm-nav__link" onClick={handleMobileMenu}>
                Portfolio
              </Link>
            </li>
          </ul>
          <Link href="/#contact" className="hm-nav__cta" onClick={handleMobileMenu}>
            Book a Call
          </Link>
        </div>
      </div>

      {isMobileMenu && (
        <div className="hm-nav__scrim" onClick={handleMobileMenu} aria-hidden="true" />
      )}
    </header>
  )
}
