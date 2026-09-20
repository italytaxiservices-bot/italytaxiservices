import Link from 'next/link'
import { Users, Briefcase, ArrowRight } from 'lucide-react'
import { vehicles } from '@/data/fleet'

export default function FleetSection() {
  return (
    <section style={{ background: '#ffffff', borderTop: '1px solid #E8E2D9', padding: '96px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-medium mb-4" style={{ color: '#C9A84C' }}>
              Our Fleet
            </p>
            <h2
              className="font-black leading-[1.05]"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: '#1a1410' }}
            >
              A vehicle for every trip
            </h2>
          </div>
          <p className="text-sm max-w-xs sm:text-right" style={{ color: '#7a7268' }}>
            All vehicles max 4 years old. Immaculate presentation guaranteed.
          </p>
        </div>

        {/* Vehicle cards — horizontal scroll on mobile */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              style={{ border: '1px solid #E8E2D9', borderRadius: '4px', overflow: 'hidden', background: '#FAF7F2' }}
            >
              {/* Blank vehicle image area */}
              <div style={{ background: '#EDE8E0', height: '140px' }} />

              <div className="p-5">
                <h3
                  className="font-bold text-sm mb-1"
                  style={{ color: '#1a1410', fontFamily: 'var(--font-serif), Georgia, serif' }}
                >
                  {vehicle.name}
                </h3>
                <p className="text-xs mb-4" style={{ color: '#9a8f83' }}>{vehicle.model}</p>

                <div className="flex gap-4 mb-4">
                  <span className="flex items-center gap-1 text-xs" style={{ color: '#7a7268' }}>
                    <Users className="w-3.5 h-3.5" style={{ color: '#8B7340' }} /> {vehicle.passengers} pax
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: '#7a7268' }}>
                    <Briefcase className="w-3.5 h-3.5" style={{ color: '#8B7340' }} /> {vehicle.luggage} bags
                  </span>
                </div>

                <Link
                  href="/#quote-form"
                  className="flex items-center gap-1.5 text-xs font-semibold"
                  style={{ color: '#8B7340' }}
                >
                  Book <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/fleet" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: '#8B7340' }}>
            View full fleet <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
