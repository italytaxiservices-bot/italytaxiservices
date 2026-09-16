import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { destinations } from '@/lib/data/destinations'

const FEATURED = [
  { slug: 'lake-como',    highlight: 'Villa d\'Este · Bellagio · Varenna',     photo: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80' },
  { slug: 'tuscany',      highlight: 'Florence · Siena · Chianti',              photo: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80' },
  { slug: 'amalfi-coast', highlight: 'Positano · Ravello · Amalfi',             photo: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80' },
  { slug: 'venice',       highlight: 'Tronchetto · Mestre · Murano',            photo: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80' },
  { slug: 'sicily',       highlight: 'Taormina · Palermo · Etna',               photo: 'https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?w=600&q=80' },
  { slug: 'cinque-terre', highlight: 'Monterosso · Vernazza · Riomaggiore',     photo: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=600&q=80' },
  { slug: 'portofino',    highlight: 'Santa Margherita · Rapallo',              photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { slug: 'sorrento',     highlight: 'Capri Ferry · Pompeii · Naples',          photo: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&q=80' },
]

export default function DestinationsSection() {
  const featured = FEATURED
    .map(({ slug, highlight, photo }) => {
      const d = destinations.find((d) => d.slug === slug)
      return d ? { ...d, highlight, photo } : null
    })
    .filter(Boolean) as (typeof destinations[number] & { highlight: string; photo: string })[]

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
              {/* Photo */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={d.photo}
                  alt={d.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />
                {/* Region badge on photo */}
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm" style={{ background: 'rgba(8,8,8,0.7)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)', backdropFilter: 'blur(8px)' }}>
                  {d.region}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-black text-gray-900 text-base mb-1 group-hover:text-amber-800 transition-colors" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
                  {d.name}
                </h3>
                <p className="text-xs mb-3" style={{ color: '#C9A84C' }}>{d.highlight}</p>
                <p className="text-xs text-gray-400 leading-relaxed flex-1 line-clamp-2">{d.summary}</p>
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
