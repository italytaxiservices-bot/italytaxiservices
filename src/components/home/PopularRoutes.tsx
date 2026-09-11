import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { popularRoutes } from '@/data/routes'
import { formatPrice } from '@/lib/utils'

export default function PopularRoutes() {
  return (
    <section className="py-28 overflow-hidden" style={{ background: '#FAF6EE' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase font-medium mb-4" style={{ color: '#C9A84C' }}>
              — Fixed Price Routes
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-[1.1]">
              Most Popular<br />
              <span
                className="italic font-bold"
                style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#A07830' }}
              >
                Transfers
              </span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-xs leading-relaxed sm:text-right">
            Every price is fixed and confirmed before you book. No meter. No surge.
          </p>
        </div>

        {/* Route list — editorial horizontal rows */}
        <div className="space-y-0 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.12)' }}>
          {popularRoutes.map((route, i) => (
            <Link
              key={route.id}
              href={`/${route.slug}`}
              className="group flex items-center gap-6 px-8 py-6 bg-white transition-all duration-200 hover:bg-amber-50/40"
              style={i < popularRoutes.length - 1 ? { borderBottom: '1px solid rgba(201,168,76,0.08)' } : {}}
            >
              {/* Index */}
              <span
                className="shrink-0 font-black text-xl w-8 select-none"
                style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: 'rgba(201,168,76,0.3)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Route */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900 text-sm group-hover:text-amber-800 transition-colors truncate">{route.fromName}</span>
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="#C9A84C" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                  <span className="font-bold text-gray-900 text-sm group-hover:text-amber-800 transition-colors truncate">{route.toName}</span>
                </div>
                <p className="text-xs text-gray-400 truncate hidden sm:block">{route.description}</p>
              </div>

              {/* Meta */}
              <div className="shrink-0 text-right hidden md:block">
                <p className="text-xs text-gray-400 mb-0.5">{route.estimatedTime}{route.distance ? ` · ${route.distance}` : ''}</p>
              </div>

              {/* Price */}
              <div className="shrink-0 text-right">
                <p className="text-xs text-gray-400 mb-0.5">from</p>
                <p
                  className="font-black text-lg"
                  style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#A07830' }}
                >
                  {formatPrice(route.priceFrom)}
                </p>
              </div>

              {/* Arrow */}
              <div
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                style={{ background: '#C9A84C' }}
              >
                <ArrowRight className="w-3.5 h-3.5 text-black" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
