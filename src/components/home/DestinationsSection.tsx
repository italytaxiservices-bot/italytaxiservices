import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { destinations } from '@/lib/data/destinations'

const FEATURED_SLUGS = ['lake-como', 'tuscany', 'amalfi-coast', 'venice', 'sicily', 'cinque-terre', 'portofino', 'sorrento']

export default function DestinationsSection() {
  const featured = FEATURED_SLUGS.map((slug) => destinations.find((d) => d.slug === slug)).filter(
    (d): d is (typeof destinations)[number] => Boolean(d)
  )

  return (
    <section className="py-28 overflow-hidden" style={{ background: '#FAF6EE' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase font-medium mb-4" style={{ color: '#C9A84C' }}>
              — Where We Take You
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-[1.1]">
              Popular<br />
              <span className="italic font-bold" style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#A07830' }}>
                Destinations
              </span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-xs leading-relaxed sm:text-right">
            Private transfers and touring drivers to Italy&rsquo;s most-requested lakes, coastlines and hill towns.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((d) => (
            <Link
              key={d.slug}
              href={`/destinations/${d.slug}`}
              className="group p-6 bg-white rounded-2xl transition-all duration-200 hover:bg-amber-50/40"
              style={{ border: '1px solid rgba(201,168,76,0.12)' }}
            >
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-amber-800 transition-colors">{d.name}</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-3">{d.summary}</p>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#A07830' }}>
                View transfers <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl border transition-colors hover:bg-amber-50/40"
            style={{ borderColor: 'rgba(201,168,76,0.3)', color: '#A07830' }}
          >
            View All Destinations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
