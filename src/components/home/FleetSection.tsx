import Link from 'next/link'
import { Users, Briefcase, ArrowRight } from 'lucide-react'
import { vehicles } from '@/data/fleet'

const categoryLabel: Record<string, string> = {
  sedan: 'Business', business: 'First Class', van: 'Group', luxury: 'Luxury',
}

export default function FleetSection() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase font-medium mb-4" style={{ color: '#C9A84C' }}>
              — Premium Fleet
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-[1.1]">
              Vehicles as<br />
              <span
                className="italic font-bold"
                style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#A07830' }}
              >
                Impressive
              </span>{' '}
              as the Journey
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-xs leading-relaxed lg:text-right">
            All vehicles max 4 years old. Immaculate presentation guaranteed — or we replace it.
          </p>
        </div>

        {/* Fleet cards — asymmetric grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {vehicles.map((vehicle, idx) => (
            <div
              key={vehicle.id}
              className="group rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                background: idx % 2 === 0 ? '#0f0f0f' : '#ffffff',
                border: idx % 2 === 0 ? '1px solid rgba(201,168,76,0.12)' : '1px solid #f0f0f0',
              }}
            >
              {/* Vehicle illustration */}
              <div
                className="relative h-44 flex items-center justify-center overflow-hidden"
                style={{
                  background: idx % 2 === 0
                    ? 'linear-gradient(135deg, #161616, #111111)'
                    : 'linear-gradient(135deg, #FAF6EE, #FDF8F2)',
                }}
              >
                {/* Category tag */}
                <div className="absolute top-3 left-3">
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest"
                    style={idx % 2 === 0
                      ? { background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.2)' }
                      : { background: 'rgba(201,168,76,0.1)', color: '#A07830', border: '1px solid rgba(201,168,76,0.15)' }
                    }
                  >
                    {categoryLabel[vehicle.category]}
                  </span>
                </div>

                {/* Car SVG */}
                <svg
                  className="w-40 h-24"
                  style={{ color: idx % 2 === 0 ? 'rgba(201,168,76,0.35)' : '#D4B86A' }}
                  viewBox="0 0 200 80"
                  fill="currentColor"
                >
                  <path d="M20 55 C20 55 30 35 50 32 L80 28 C90 26 100 24 115 24 L145 24 C158 24 168 30 175 40 L182 50 C185 50 190 52 190 56 L190 60 C190 62 188 64 186 64 L174 64 C173 70 167 75 160 75 C153 75 147 70 146 64 L64 64 C63 70 57 75 50 75 C43 75 37 70 36 64 L24 64 C22 64 20 62 20 60 Z" />
                  <circle cx="50" cy="70" r="9" fill={idx % 2 === 0 ? '#0f0f0f' : 'white'} />
                  <circle cx="160" cy="70" r="9" fill={idx % 2 === 0 ? '#0f0f0f' : 'white'} />
                  <circle cx="50" cy="70" r="4" fill="currentColor" opacity="0.4" />
                  <circle cx="160" cy="70" r="4" fill="currentColor" opacity="0.4" />
                </svg>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3
                  className="font-black text-base mb-0.5 transition-colors"
                  style={{ color: idx % 2 === 0 ? '#ffffff' : '#111111' }}
                >
                  {vehicle.name}
                </h3>
                <p className="text-xs mb-4" style={{ color: idx % 2 === 0 ? 'rgba(255,255,255,0.6)' : '#6b7280' }}>
                  {vehicle.model}
                </p>

                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: idx % 2 === 0 ? 'rgba(255,255,255,0.7)' : '#6b7280' }}>
                    <Users className="w-3.5 h-3.5" style={{ color: '#C9A84C' }} />
                    {vehicle.passengers} pax
                  </div>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: idx % 2 === 0 ? 'rgba(255,255,255,0.7)' : '#6b7280' }}>
                    <Briefcase className="w-3.5 h-3.5" style={{ color: '#C9A84C' }} />
                    {vehicle.luggage} bags
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {vehicle.features.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="text-[10px] px-2 py-0.5 rounded-full"
                      style={idx % 2 === 0
                        ? { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)' }
                        : { background: '#f3f4f6', color: '#4b5563', border: '1px solid #e5e7eb' }
                      }
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <Link
                  href="/#quote-form"
                  className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
                  style={{ color: '#C9A84C' }}
                >
                  Book this vehicle <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/fleet" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-amber-700 transition-colors">
            Explore full fleet <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
