import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { popularRoutes } from '@/data/routes'
import { formatPrice } from '@/lib/utils'

export default function PopularRoutes() {
  return (
    <section style={{ background: '#FAF7F2', borderTop: '1px solid #E8E2D9', padding: '96px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-medium mb-4" style={{ color: '#C9A84C' }}>
              Fixed Price Routes
            </p>
            <h2
              className="font-black leading-[1.05]"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: '#1a1410' }}
            >
              Popular Chauffeur Routes
            </h2>
          </div>
          <p className="text-sm leading-relaxed max-w-xs sm:text-right" style={{ color: '#7a7268' }}>
            Every price is fixed and confirmed before you book. No meter, no surge.
          </p>
        </div>

        {/* Routes table */}
        <div style={{ border: '1px solid #E8E2D9', borderRadius: '4px', overflow: 'hidden', background: '#fff' }}>

          {/* Header row */}
          <div className="grid grid-cols-[1fr_auto_auto_auto] px-6 py-3 text-[10px] uppercase tracking-widest font-semibold" style={{ background: '#F5F0E8', borderBottom: '1px solid #E8E2D9', color: '#9a8f83' }}>
            <span>Route</span>
            <span className="text-right hidden md:block">Distance</span>
            <span className="text-right hidden sm:block px-8">Duration</span>
            <span className="text-right">Price</span>
          </div>

          {popularRoutes.map((route, i) => (
            <Link
              key={route.id}
              href={`/${route.slug}`}
              className="group grid grid-cols-[1fr_auto_auto_auto] items-center px-6 py-5 transition-colors hover:bg-amber-50/50"
              style={i < popularRoutes.length - 1 ? { borderBottom: '1px solid #F0EBE1' } : {}}
            >
              {/* Route name */}
              <div className="flex items-center gap-3">
                <span className="font-bold text-sm group-hover:text-amber-800 transition-colors" style={{ color: '#1a1410', fontFamily: 'var(--font-serif), Georgia, serif' }}>
                  {route.fromName}
                </span>
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="#C9A84C" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                <span className="font-bold text-sm group-hover:text-amber-800 transition-colors" style={{ color: '#1a1410', fontFamily: 'var(--font-serif), Georgia, serif' }}>
                  {route.toName}
                </span>
              </div>

              {/* Distance */}
              <span className="text-xs text-right hidden md:block" style={{ color: '#9a8f83' }}>
                {route.distance}
              </span>

              {/* Duration */}
              <span className="text-xs text-right hidden sm:block px-8" style={{ color: '#9a8f83' }}>
                {route.estimatedTime}
              </span>

              {/* Price + arrow */}
              <div className="flex items-center gap-3">
                <span className="font-black text-base" style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#8B7340' }}>
                  {formatPrice(route.priceFrom)}
                </span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#8B7340' }} />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/routes"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-amber-800"
            style={{ color: '#8B7340' }}
          >
            View all routes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
