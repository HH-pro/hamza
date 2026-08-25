'use client'

import { useEffect } from 'react'

/**
 * Scroll reveal.
 *
 * Elements marked `data-reveal` fade and rise once as they enter the viewport.
 *
 * The overriding requirement is that content must never stay invisible, so
 * there are four independent ways an element gets revealed:
 *   1. the inline script in app/layout.tsx only adds `reveal-ready` before
 *      paint when motion is allowed — with JS off, nothing is ever hidden;
 *   2. IntersectionObserver, the normal path;
 *   3. a throttled scroll/resize check, in case the observer misses an element
 *      after a jump-scroll or a late layout shift;
 *   4. a hard failsafe that reveals everything after a few seconds regardless.
 *
 * Honours prefers-reduced-motion, including if it changes mid-session.
 */
export default function Reveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const body = document.body
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    /** Drop every reveal style at once — used for reduced motion and failsafe. */
    const revealAll = () => {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'))
    }

    if (mq.matches) {
      body.classList.remove('reveal-ready')
      revealAll()
      return
    }

    const onMotionChange = () => {
      if (!mq.matches) return
      body.classList.remove('reveal-ready')
      revealAll()
    }
    mq.addEventListener('change', onMotionChange)

    if (!body.classList.contains('reveal-ready')) {
      mq.removeEventListener('change', onMotionChange)
      return
    }

    const show = (el: Element) => el.classList.add('is-in')

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          show(e.target)
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.01 },
    )

    const seen = new WeakSet<Element>()
    const attach = () => {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        if (seen.has(el)) return
        seen.add(el)
        io.observe(el)
      })
    }

    // Fallback: anything within (or above) the viewport is revealed directly.
    let ticking = false
    const sweep = () => {
      ticking = false
      const h = window.innerHeight
      document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < h * 0.94 && r.bottom > 0) show(el)
        // Anything scrolled past entirely should never be left hidden.
        else if (r.bottom <= 0) show(el)
      })
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(sweep)
    }

    attach()
    sweep()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    // Catch content that mounts later (filters, route changes, lightbox).
    const mo = new MutationObserver(() => {
      attach()
      onScroll()
    })
    mo.observe(body, { childList: true, subtree: true })

    // Hard failsafe. If anything above has gone wrong, show everything.
    const failsafe = window.setTimeout(revealAll, 6000)

    return () => {
      io.disconnect()
      mo.disconnect()
      window.clearTimeout(failsafe)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      mq.removeEventListener('change', onMotionChange)
    }
  }, [])

  return null
}
