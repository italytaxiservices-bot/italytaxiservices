'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'

const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'info@italytaxiservices.com'

const navLinks = [
  {
    label: 'Services',
    children: [
      { label: 'Airport Transfers',   href: '/airport-transfers' },
      { label: 'Chauffeur Service',   href: '/chauffeur-service-italy' },
      { label: 'Corporate Travel',    href: '/corporate-chauffeur-italy' },
      { label: 'Cruise Transfers',    href: '/cruise-transfers' },
      { label: 'Wedding Cars',        href: '/wedding-chauffeur-italy' },
      { label: 'Hourly Hire',         href: '/hourly-chauffeur-italy' },
      { label: 'Luxury Transfers',    href: '/luxury-chauffeur-italy' },
      { label: 'City-to-City Transfers', href: '/city-to-city-transfers' },
      { label: 'Private Tours',       href: '/italy-private-tours' },
      { label: 'Event Transportation', href: '/event-transportation' },
      { label: 'International Transfers', href: '/international-border-crossing-transfers' },
    ],
  },
  {
    label: 'Airports',
    children: [
      { label: 'Malpensa (MXP)',      href: '/malpensa-airport-transfer' },
      { label: 'Fiumicino (FCO)',     href: '/fiumicino-airport-transfer' },
      { label: 'Marco Polo (VCE)',    href: '/marco-polo-airport-transfer' },
      { label: 'Linate (LIN)',        href: '/linate-airport-transfer' },
      { label: 'Ciampino (CIA)',      href: '/ciampino-airport-transfer' },
      { label: 'Florence (FLR)',      href: '/florence-airport-transfer' },
      { label: 'Pisa (PSA)',          href: '/pisa-airport-transfer' },
      { label: 'Naples (NAP)',        href: '/naples-airport-transfer' },
    ],
  },
  {
    label: 'Destinations',
    href: '/destinations',
  },
  {
    label: 'Cities',
    children: [
      { label: 'Milan',     href: '/milan-chauffeur-service' },
      { label: 'Rome',      href: '/rome-chauffeur-service' },
      { label: 'Venice',    href: '/venice-chauffeur-service' },
      { label: 'Florence',  href: '/florence-chauffeur-service' },
      { label: 'Naples',    href: '/naples-chauffeur-service' },
      { label: 'Bologna',   href: '/bologna-chauffeur-service' },
    ],
  },
  {
    label: 'Routes',
    children: [
      { label: 'Malpensa → Milan',           href: '/malpensa-to-milan' },
      { label: 'Malpensa → Lake Como',       href: '/malpensa-to-lake-como' },
      { label: 'Fiumicino → Rome',           href: '/fiumicino-to-rome' },
      { label: 'Fiumicino → Civitavecchia', href: '/fiumicino-to-civitavecchia' },
      { label: 'Rome → Amalfi Coast',        href: '/rome-to-amalfi-coast' },
      { label: 'Milan → Venice',             href: '/milan-to-venice' },
      { label: 'Florence → Pisa',            href: '/florence-to-pisa' },
      { label: 'Florence → Siena',           href: '/florence-to-siena' },
      { label: 'All Routes',                 href: '/routes' },
    ],
  },
  {
    label: 'Tours',
    children: [
      { label: 'Amalfi Coast',    href: '/attraction-transfer/amalfi-coast' },
      { label: 'Lake Como',       href: '/attraction-transfer/lake-como' },
      { label: 'Colosseum',       href: '/attraction-transfer/colosseum' },
      { label: 'Vatican Museums', href: '/attraction-transfer/vatican-museums' },
      { label: 'Pompeii',         href: '/attraction-transfer/pompeii' },
      { label: 'Cinque Terre',    href: '/attraction-transfer/cinque-terre' },
    ],
  },
  { label: 'Fleet', href: '/fleet' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [activeDropdown, setDD]       = useState<string | null>(null)
  const [scrolled, setScrolled]       = useState(false)
  const [mobileSub, setMobileSub]     = useState<string | null>(null)
  const pathname = usePathname()
  const isHome    = pathname === '/' || pathname === '/it'
  const isItalian = pathname.startsWith('/it')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const transparent = isHome && !scrolled

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">

      {/* ── Top micro-bar ── */}
      <div
        className="hidden lg:flex items-center justify-between px-8 py-2 text-[10px] tracking-widest uppercase transition-all duration-500"
        style={{
          background: transparent ? 'rgba(0,0,0,0.5)' : '#080808',
          color: 'rgba(255,255,255,0.4)',
          borderBottom: '1px solid rgba(201,168,76,0.08)',
        }}
      >
        <div className="flex items-center gap-8">
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-amber-400 transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            {EMAIL}
          </a>
        </div>
        <Link href={isItalian ? '/' : '/it'} className="hover:text-amber-400 transition-colors" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {isItalian ? '🇬🇧 English' : '🇮🇹 Italiano'}
        </Link>
      </div>

      {/* ── Main nav bar ── */}
      <nav
        className="transition-all duration-500"
        style={{
          background: transparent ? 'rgba(8,8,8,0.5)' : 'rgba(8,8,8,0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: transparent ? '1px solid rgba(201,168,76,0.08)' : '1px solid rgba(201,168,76,0.12)',
          boxShadow: transparent ? 'none' : '0 8px 40px rgba(0,0,0,0.4)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 leading-none">
            <Image
              src="/logo.webp"
              alt="Italy Taxi Services"
              width={48}
              height={48}
              className="h-11 w-11 shrink-0 transition-transform group-hover:scale-105"
              priority
            />
            <span className="flex flex-col">
              <span
                className="font-black text-white tracking-tight group-hover:text-amber-300 transition-colors"
                style={{ fontSize: '1.15rem', fontFamily: 'var(--font-serif), Georgia, serif', fontStyle: 'italic' }}
              >
                Italy Taxi Services
              </span>
              <span className="section-label" style={{ fontSize: '0.58rem', letterSpacing: '0.22em' }}>
                Private NCC Transfers
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => 'children' in link && setDD(link.label)}
                onMouseLeave={() => setDD(null)}
              >
                {'children' in link ? (
                  <>
                    <button
                      className="flex items-center gap-1 px-3.5 py-2 text-xs font-medium tracking-wide uppercase transition-colors rounded"
                      style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                    >
                      {link.label}
                      <ChevronDown className="w-3 h-3 opacity-60" />
                    </button>
                    {activeDropdown === link.label && (
                      <div
                        className="absolute top-full left-0 mt-1 w-56 py-2 z-50 rounded-sm"
                        style={{
                          background: '#0f0f0f',
                          border: '1px solid rgba(201,168,76,0.15)',
                          boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
                        }}
                      >
                        {link.children?.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex items-center gap-2 px-5 py-2.5 text-xs transition-all duration-150 group/item"
                            style={{ color: 'rgba(255,255,255,0.5)' }}
                            onMouseEnter={e => { e.currentTarget.style.color = '#C9A84C'; e.currentTarget.style.paddingLeft = '24px' }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.paddingLeft = '20px' }}
                          >
                            <span className="w-1 h-1 rounded-full shrink-0" style={{ background: '#C9A84C', opacity: 0.5 }} />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={(link as { href: string }).href}
                    className="px-3.5 py-2 text-xs font-medium uppercase tracking-wide transition-colors block rounded"
                    style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/#quote-form" className="btn-primary text-xs py-2.5 px-6 rounded-sm" style={{ fontSize: '0.7rem' }}>
              Book Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 transition-colors"
            style={{ color: 'rgba(255,255,255,0.7)' }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div
          className="lg:hidden overflow-y-auto max-h-[80vh]"
          style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(201,168,76,0.12)' }}
        >
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                {'children' in link ? (
                  <>
                    <button
                      className="w-full text-left px-2 py-3 text-xs uppercase tracking-widest flex items-center justify-between"
                      style={{ color: 'rgba(255,255,255,0.65)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                      onClick={() => setMobileSub(mobileSub === link.label ? null : link.label)}
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 opacity-50 transition-transform ${mobileSub === link.label ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileSub === link.label && (
                      <div className="pl-4 py-2 space-y-2">
                        {link.children?.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block py-1.5 text-xs transition-colors"
                            style={{ color: 'rgba(255,255,255,0.4)' }}
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={(link as { href: string }).href}
                    className="block px-2 py-3 text-xs uppercase tracking-widest"
                    style={{ color: 'rgba(255,255,255,0.65)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="px-6 pb-6 pt-2 flex flex-col gap-3">
            <Link
              href="/#quote-form"
              className="btn-primary flex items-center justify-center rounded-sm py-4 text-sm"
              onClick={() => setMobileOpen(false)}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
