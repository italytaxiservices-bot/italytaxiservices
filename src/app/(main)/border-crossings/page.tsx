import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, MapPin } from 'lucide-react'
import { bordersByCountry, borderRoutes } from '@/data/borders'

export const metadata: Metadata = {
  title: 'Cross-Border Transfers from Italy | Switzerland, France, Austria & Slovenia',
  description: `Private cross-border chauffeur transfers from Italy to Switzerland, France, Austria, Slovenia and Monaco. ${borderRoutes.length}+ routes — border crossing, tolls and meet-and-greet included. Fixed prices, licensed NCC.`,
  alternates: { canonical: '/border-crossings' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/border-crossings',
    title: 'Cross-Border Transfers from Italy | Switzerland, France, Austria & Slovenia',
    description: 'Private cross-border chauffeur transfers from Italy to Switzerland, France, Austria, Slovenia and Monaco. Fixed prices, border crossing included.',
    images: ['/logo.webp'],
  },
}

const flagByCountry: Record<string, string> = { Switzerland: '🇨🇭', France: '🇫🇷', Austria: '🇦🇹', Slovenia: '🇸🇮' }

export default function BorderCrossingsListingPage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="pt-32 pb-20" style={{ background: '#0f0d0a' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: 'rgba(250,247,242,0.4)' }}>
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: '#8B7340' }}>Border Crossings</span>
          </nav>
          <div className="flex items-center gap-4 mb-6">
            <div className="gold-line" />
            <span className="section-label">Cross-Border Transfers · Italy</span>
          </div>
          <h1 className="font-black leading-[1.05] mb-6" style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', color: '#FAF7F2' }}>
            Private Transfers{' '}
            <span className="italic" style={{ color: '#C9A84C' }}>Across the Border</span>
          </h1>
          <p className="text-base leading-relaxed max-w-xl" style={{ color: 'rgba(250,247,242,0.65)' }}>
            Door-to-door cross-border chauffeur transfers from Italy to Switzerland, France, Austria, Slovenia and Monaco.
            Border crossing, motorway tolls and vignettes all included in a fixed price.
          </p>
        </div>
      </section>

      {/* ── GROUPS BY COUNTRY ── */}
      {Object.entries(bordersByCountry).map(([country, routes], gi) => {
        if (!routes.length) return null
        return (
          <section key={country} className="py-16" style={{ background: gi % 2 === 0 ? '#FAF7F2' : '#ffffff', borderTop: '1px solid #E8E2D9' }}>
            <div className="max-w-6xl mx-auto px-6 lg:px-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="gold-line" />
                <span className="section-label">{flagByCountry[country] ?? ''} Italy → {country}</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {routes.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/border-crossings/${r.slug}`}
                    className="group flex flex-col bg-white rounded-sm p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
                    style={{ border: '1px solid #E8E2D9' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-black text-sm" style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#1a1410' }}>
                        {r.fromName} → {r.toName}
                      </span>
                      <span className="text-lg">{r.flag}</span>
                    </div>
                    <div className="flex items-center gap-4 mb-4 text-xs" style={{ color: '#7a7268' }}>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" style={{ color: '#8B7340' }} /> {r.estimatedTime}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" style={{ color: '#8B7340' }} /> {r.distance}</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-bold text-sm" style={{ color: '#8B7340' }}>From €{r.priceFrom}</span>
                      <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: '#8B7340' }} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* ── CTA ── */}
      <section className="py-16" style={{ background: '#0f0d0a' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#FAF7F2' }}>
            Need a cross-border transfer not listed here?
          </h2>
          <p className="text-sm mb-8" style={{ color: 'rgba(250,247,242,0.55)' }}>
            We cover every Italian frontier. Tell us your route and we&apos;ll send a fixed-price quote.
          </p>
          <Link href="/#quote-form" className="inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-sm transition-all hover:-translate-y-0.5" style={{ background: '#C9A84C', color: '#0f0d0a', letterSpacing: '0.04em' }}>
            Get a Free Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
