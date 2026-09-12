'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function LanguageSelector() {
  const [show, setShow] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.startsWith('/it')) return
    const saved = localStorage.getItem('preferred-lang')
    if (!saved) {
      const t = setTimeout(() => setShow(true), 400)
      return () => clearTimeout(t)
    }
  }, [pathname])

  const choose = (lang: 'en' | 'it') => {
    localStorage.setItem('preferred-lang', lang)
    setShow(false)
    if (lang === 'it') router.push('/it')
  }

  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(5,5,5,0.95)', backdropFilter: 'blur(12px)' }}
    >
      {/* Top gold line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent 5%, #C9A84C 40%, #E0C070 60%, #C9A84C 80%, transparent 95%)' }}
      />

      <div className="text-center px-8 max-w-md w-full">

        {/* Logo */}
        <p
          className="font-black text-white mb-1"
          style={{ fontSize: '2rem', fontFamily: 'var(--font-serif), Georgia, serif', fontStyle: 'italic' }}
        >
          Italy Taxi Services
        </p>
        <p className="section-label mb-12" style={{ fontSize: '0.6rem', letterSpacing: '0.25em' }}>
          Private NCC Transfers
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 justify-center mb-10">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4))' }} />
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Choose your language
          </p>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.4))' }} />
        </div>

        {/* Language buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => choose('en')}
            className="group flex flex-col items-center gap-3 py-8 px-6 rounded-sm transition-all duration-300"
            style={{ border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(255,255,255,0.03)' }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)'
              e.currentTarget.style.background = 'rgba(201,168,76,0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
            }}
          >
            <span className="text-4xl">🇬🇧</span>
            <span className="font-bold text-white text-base tracking-wide">English</span>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Continue in English</span>
          </button>

          <button
            onClick={() => choose('it')}
            className="group flex flex-col items-center gap-3 py-8 px-6 rounded-sm transition-all duration-300"
            style={{ border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(255,255,255,0.03)' }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)'
              e.currentTarget.style.background = 'rgba(201,168,76,0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
            }}
          >
            <span className="text-4xl">🇮🇹</span>
            <span className="font-bold text-white text-base tracking-wide">Italiano</span>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Continua in italiano</span>
          </button>
        </div>

        <p className="text-[11px] mt-8" style={{ color: 'rgba(255,255,255,0.2)' }}>
          You can change this anytime from the navigation bar
        </p>
      </div>
    </div>
  )
}
