'use client'

import { useEffect, useState } from 'react'

/**
 * Mobile-only booking bar. Appears once the visitor has scrolled past the
 * hero, and steps aside while the quote form itself is on screen so it never
 * covers the fields.
 */
export default function StickyQuoteBar({ label, hint }: { label: string; hint: string }) {
  const [pastHero, setPastHero] = useState(false)
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const form = document.getElementById('quote-form')
    const observer = form ? new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.15 }) : null
    if (form && observer) observer.observe(form)

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer?.disconnect()
    }
  }, [])

  const show = pastHero && !formVisible

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${show ? 'translate-y-0' : 'translate-y-full'}`}
      style={{ background: 'rgba(15,13,10,0.96)', borderTop: '1px solid rgba(201,168,76,0.25)', paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-hidden={!show}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <p className="text-xs leading-snug" style={{ color: 'rgba(250,247,242,0.65)' }}>{hint}</p>
        <a
          href="#quote-form"
          tabIndex={show ? 0 : -1}
          className="shrink-0 text-sm font-bold px-5 py-2.5 rounded-sm"
          style={{ background: '#C9A84C', color: '#0f0d0a' }}
        >
          {label}
        </a>
      </div>
    </div>
  )
}
