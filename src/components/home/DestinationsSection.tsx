import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { destinations } from '@/lib/data/destinations'

const FEATURED = [
  { slug: 'lake-como',    emoji: '🏔️', highlight: 'Villa d\'Este · Bellagio · Varenna' },
  { slug: 'tuscany',      emoji: '🌾', highlight: 'Florence · Siena · Chianti' },
  { slug: 'amalfi-coast', emoji: '🌊', highlight: 'Positano · Ravello · Amalfi' },
  { slug: 'venice',       emoji: '🛶', highlight: 'Tronchetto · Mestre · Murano' },
  { slug: 'sicily',       emoji: '🌋', highlight: 'Taormina · Palermo · Etna' },
  { slug: 'cinque-terre', emoji: '🏘️', highlight: 'Monterosso · Vernazza · Riomaggiore' },
  { slug: 'portofino',    emoji: '⛵', highlight: 'Santa Margherita · Rapallo' },
  { slug: 'sorrento',     emoji: '🍋', highlight: 'Capri Ferry · Pompeii · Naples' },
]

export default function DestinationsSection() {
  const featured = FEATURED
    .map(({ slug, emoji, highlight }) => {
      const d = destinations.find((d) => d.slug === slug)
      return d ? { ...d, emoji, highlight } : null
    })
    .filter(Boolean) as (typeof destinations[number] & { emoji: string; highlight: string })[]

  return (
    <section className="py-28 overflow-hidden" style={{ background: '#F5F0E8' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase font-medium mb-4" style={{ color: '#C9A84C' }}>
              — Where We Take You
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-[1.1]">
              Italy&apos;s Most{' '}
              <br className="hidden sm:block" />
              <span className="italic font-bold" style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#A07830' }}>
                Beautiful Destinations
              </span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-xs leading-relaxed sm:text-right">
            Private door-to-door transfers to lakes, coastlines, hill towns and islands.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((d) => (
            <Link
              key={d.slug}
              href={`/destinations/${d.slug}`}
              className="group relative bg-white rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ border: '1px solid rgba(201,168,76,0.12)' }}
            >
              {/* Top colour strip */}
              <div className="h-1 w-0 group-hover:w-full transition-all duration-500" style={{ background: 'linear-gradient(90deg, #9A7A30, #C9A84C, #E0C070)' }} />

              <div className="p-6 flex flex-col flex-1">
                {/* Emoji + region */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{d.emoji}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm" style={{ background: 'rgba(201,168,76,0.08)', color: '#9A7A30', border: '1px solid rgba(201,168,76,0.15)' }}>
                    {d.region}
                  </span>
                </div>

                {/* Name */}
                <h3
                  className="font-black text-gray-900 text-lg mb-1 group-hover:text-amber-800 transition-colors"
                  style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
                >
                  {d.name}
                </h3>

                {/* Highlight */}
                <p className="text-xs mb-3" style={{ color: '#C9A84C' }}>{d.highlight}</p>

                {/* Summary */}
                <p className="text-xs text-gray-400 leading-relaxed flex-1 line-clamp-3">{d.summary}</p>

                {/* CTA */}
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all" style={{ color: '#9A7A30' }}>
                  View transfers <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-12">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-sm transition-all hover:-translate-y-0.5"
            style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#9A7A30', background: 'white' }}
          >
            View All {destinations.length}+ Destinations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
