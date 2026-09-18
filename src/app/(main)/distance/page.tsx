import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { distanceRoutes } from '@/lib/data/distances'

export const metadata: Metadata = {
  title: 'Italy Distance Guide | How Far Between Italian Cities?',
  description: 'Distances between major Italian cities. Rome to Florence, Milan to Venice, Naples to Amalfi Coast and more — with drive times, train times, and private transfer prices.',
  alternates: { canonical: '/distance' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/distance',
    title: 'Italy Distance Guide | How Far Between Italian Cities?',
    description: 'Distances between major Italian cities — with drive times, train times, and private transfer prices.',
    images: ['/logo.webp'],
  },
}

const groups = [
  { label: 'From Rome',       slugs: ['rome-to-florence-distance','rome-to-naples-distance','rome-to-amalfi-coast-distance','rome-to-venice-distance','rome-to-milan-distance','fiumicino-to-rome-distance'] },
  { label: 'From Milan',      slugs: ['milan-to-venice-distance','milan-to-florence-distance','milan-lake-como-distance','malpensa-to-milan-distance','malpensa-to-lake-como-distance','milan-to-turin-distance'] },
  { label: 'From Florence',   slugs: ['florence-to-pisa-distance','florence-to-siena-distance','bologna-to-florence-distance'] },
  { label: 'From Naples',     slugs: ['naples-to-amalfi-coast-distance','naples-to-pompeii-distance','naples-to-sorrento-distance'] },
  { label: 'From Venice',     slugs: ['venice-to-verona-distance','venice-to-florence-distance'] },
]

export default function DistanceListingPage() {
  return (
    <div className="pt-16">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden grain" style={{ background: '#080808' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 60%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 5%, #C9A84C 40%, #E0C070 60%, #C9A84C 80%, transparent 95%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="gold-line" />
            <span className="section-label">Distance Guides · Italy</span>
          </div>
          <h1 className="font-black text-white leading-[1.05] mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
            How Far Between{' '}
            <span className="text-gold-gradient italic font-bold" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
              Italian Cities?
            </span>
          </h1>
          <p className="text-base leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Exact road distances, drive times, train times, and private transfer prices for {distanceRoutes.length}+ routes across Italy.
          </p>
        </div>
      </section>

      {/* ── GROUPS ── */}
      {groups.map(({ label, slugs }) => {
        const routes = slugs.map((s) => distanceRoutes.find((r) => r.slug === s)).filter(Boolean) as typeof distanceRoutes
        if (!routes.length) return null
        return (
          <section key={label} className="py-16" style={{ background: label.includes('Milan') || label.includes('Venice') ? '#F5F0E8' : 'white' }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="gold-line" />
                <span className="section-label">{label}</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {routes.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/distance/${r.slug}`}
                    className="group flex flex-col bg-white rounded-sm p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
                    style={{ border: '1px solid rgba(201,168,76,0.12)' }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 shrink-0" style={{ color: '#C9A84C' }} />
                      <span className="font-black text-gray-900 text-sm group-hover:text-amber-800 transition-colors" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
                        {r.from} → {r.to}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[
                        { label: 'Distance', value: `${r.distanceKm} km` },
                        { label: 'By Car',   value: r.driveTime },
                        { label: 'Transfer', value: `€${r.priceFrom}+` },
                      ].map(({ label: l, value }) => (
                        <div key={l} className="text-center p-2 rounded-sm" style={{ background: '#F5F0E8' }}>
                          <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-0.5">{l}</p>
                          <p className="text-xs font-bold text-gray-800">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mt-auto group-hover:gap-3 transition-all" style={{ color: '#C9A84C' }}>
                      View guide <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* ── CTA ── */}
      <section className="py-20 grain" style={{ background: '#080808' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="gold-line" /><span className="section-label">Book a Transfer</span><div className="gold-line" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
            Ready to Travel? Get a Fixed Price.
          </h2>
          <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Door-to-door private transfer across Italy. Licensed NCC drivers. Fixed price confirmed before you travel.
          </p>
          <Link href="/#quote-form" className="btn-primary">
            Get a Free Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
