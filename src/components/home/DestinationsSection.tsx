import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { destinations } from '@/lib/data/destinations'

const FEATURED = [
  { slug: 'lake-como',    highlight: 'Bellagio · Varenna · Menaggio' },
  { slug: 'tuscany',      highlight: 'Florence · Siena · Chianti' },
  { slug: 'amalfi-coast', highlight: 'Positano · Ravello · Amalfi' },
  { slug: 'venice',       highlight: 'Tronchetto · Mestre · Murano' },
  { slug: 'sicily',       highlight: 'Taormina · Palermo · Catania' },
  { slug: 'cinque-terre', highlight: 'Monterosso · Vernazza · Riomaggiore' },
]

const borders = [
  { label: 'Italy → Switzerland', href: '/international-border-crossing-transfers' },
  { label: 'Italy → France',      href: '/international-border-crossing-transfers' },
  { label: 'Italy → Austria',     href: '/international-border-crossing-transfers' },
  { label: 'Italy → Slovenia',    href: '/international-border-crossing-transfers' },
  { label: 'Italy → Monaco',      href: '/international-border-crossing-transfers' },
]

export default function DestinationsSection() {
  const featured = FEATURED
    .map(({ slug, highlight }) => {
      const d = destinations.find((d) => d.slug === slug)
      return d ? { ...d, highlight } : null
    })
    .filter(Boolean) as (typeof destinations[number] & { highlight: string })[]

  return (
    <section style={{ background: '#ffffff', borderTop: '1px solid #E8E2D9', padding: '96px 0' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Popular Destinations */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-medium mb-4" style={{ color: '#C9A84C' }}>
              Destinations
            </p>
            <h2
              className="font-black leading-[1.05] mb-8"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#1a1410' }}
            >
              Popular Italian<br />
              <span style={{ fontStyle: 'italic', color: '#6b5c3e' }}>Destinations</span>
            </h2>

            <div className="space-y-0">
              {featured.map((d, i) => (
                <Link
                  key={d.slug}
                  href={`/destinations/${d.slug}`}
                  className="group flex items-center justify-between py-4 transition-colors hover:bg-amber-50/40 -mx-3 px-3 rounded-sm"
                  style={i < featured.length - 1 ? { borderBottom: '1px solid #F0EBE1' } : {}}
                >
                  <div>
                    <p className="font-semibold text-sm group-hover:text-amber-800 transition-colors" style={{ color: '#1a1410', fontFamily: 'var(--font-serif), Georgia, serif' }}>
                      {d.name}
                    </p>
                    <p className="text-xs" style={{ color: '#9a8f83' }}>{d.highlight}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all" style={{ color: '#8B7340' }} />
                </Link>
              ))}
            </div>

            <Link href="/destinations" className="inline-flex items-center gap-2 mt-6 text-sm font-semibold" style={{ color: '#8B7340' }}>
              View all destinations <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Cross-border */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-medium mb-4" style={{ color: '#C9A84C' }}>
              Cross-Border
            </p>
            <h2
              className="font-black leading-[1.05] mb-4"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#1a1410' }}
            >
              Cross-Border Chauffeur<br />
              <span style={{ fontStyle: 'italic', color: '#6b5c3e' }}>Transfers from Italy</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: '#7a7268' }}>
              Licensed NCC operators for cross-border private transfers. Border crossing included, fixed price, door-to-door.
            </p>

            {/* TODO: image */}
            <div style={{ background: '#F0EBE1', borderRadius: '4px', height: '180px', marginBottom: '20px', border: '1px solid #E8E2D9' }} />

            <div className="space-y-0">
              {borders.map(({ label, href }, i) => (
                <Link
                  key={label}
                  href={href}
                  className="group flex items-center justify-between py-3.5 transition-colors hover:bg-amber-50/40 -mx-3 px-3 rounded-sm"
                  style={i < borders.length - 1 ? { borderBottom: '1px solid #F0EBE1' } : {}}
                >
                  <span className="text-sm font-medium group-hover:text-amber-800 transition-colors" style={{ color: '#1a1410' }}>
                    {label}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all" style={{ color: '#8B7340' }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
