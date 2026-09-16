'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setTimeout(() => setVisible(true), 1500)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 animate-fade-up"
      style={{ background: 'rgba(8,8,8,0.97)', borderTop: '1px solid rgba(201,168,76,0.2)', backdropFilter: 'blur(20px)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex-1">
          <p className="text-sm font-semibold text-white mb-1">We use cookies 🍪</p>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            We use cookies to improve your experience, analyse site traffic, and personalise content.
            See our{' '}
            <Link href="/privacy-policy" className="underline hover:text-amber-400 transition-colors" style={{ color: '#C9A84C' }}>Privacy Policy</Link>
            {' '}and{' '}
            <Link href="/cookie-policy" className="underline hover:text-amber-400 transition-colors" style={{ color: '#C9A84C' }}>Cookie Policy</Link>.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="text-xs font-semibold px-5 py-2.5 rounded-sm transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-xs font-bold px-6 py-2.5 rounded-sm transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #9A7A30, #C9A84C)', color: '#000', letterSpacing: '0.05em' }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}
