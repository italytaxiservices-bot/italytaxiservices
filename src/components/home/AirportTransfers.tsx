import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { airports } from '@/data/airports'

const priceMap: Record<string, string> = {
  MXP: '€85', LIN: '€65', BGY: '€90',
  FCO: '€65', CIA: '€55', VCE: '€55',
  FLR: '€55', PSA: '€95',
}

const slugMap: Record<string, string> = {
  MXP: 'malpensa', LIN: 'linate', BGY: 'bergamo',
  FCO: 'fiumicino', CIA: 'ciampino', VCE: 'marco-polo',
  FLR: 'florence', PSA: 'pisa',
}

const featured = ['MXP', 'FCO', 'VCE']

const cityDesc: Record<string, string> = {
  MXP: 'Gateway to Milan, Lake Como & the Lakes',
  FCO: 'Gateway to Rome, Civitavecchia & Lazio',
  VCE: 'Gateway to Venice, Verona & the Veneto',
}

export default function AirportTransfers() {
  const featuredAirports = airports.filter(a => featured.includes(a.code))
  const otherAirports = airports.filter(a => !featured.includes(a.code))

  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header — asymmetric */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.25em] uppercase font-medium mb-4" style={{ color: '#C9A84C' }}>
              — 30+ Airports Covered
            </p>
            <h2
              className="text-4xl sm:text-5xl font-black text-gray-900 leading-[1.1]"
            >
              Every Major<br />
              <span
                className="italic font-bold"
                style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#A07830' }}
              >
                Italian Airport
              </span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs lg:text-right">
            Meet &amp; greet included. Flight monitored in real time.
            Fixed price agreed before you travel.
          </p>
        </div>

        {/* Featured airports — horizontal large cards */}
        <div className="grid lg:grid-cols-3 gap-4 mb-4">
          {featuredAirports.map((airport) => (
            <Link
              key={airport.code}
              href={`/${slugMap[airport.code]}-airport-transfer`}
              className="group relative rounded-2xl overflow-hidden flex flex-col justify-between min-h-[220px] p-7 transition-all duration-500 hover:-translate-y-1"
              style={{ background: '#0f0f0f', border: '1px solid rgba(201,168,76,0.12)' }}
            >
              {/* Large code watermark */}
              <span
                className="absolute right-4 top-4 font-black select-none pointer-events-none transition-all duration-500 group-hover:opacity-30"
                style={{
                  fontSize: '7rem',
                  lineHeight: 1,
                  color: 'rgba(201,168,76,0.06)',
                  fontFamily: 'var(--font-serif), Georgia, serif',
                }}
              >
                {airport.code}
              </span>

              <div>
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl font-black text-sm mb-5 transition-all duration-300"
                  style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C' }}
                >
                  {airport.code}
                </div>
                <h3 className="text-white font-bold text-lg leading-snug mb-1">{airport.name}</h3>
                <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>{cityDesc[airport.code]}</p>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>From</p>
                  <p
                    className="text-2xl font-black"
                    style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#C9A84C' }}
                  >
                    {priceMap[airport.code]}
                  </p>
                </div>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                  style={{ background: '#C9A84C' }}
                >
                  <ArrowRight className="w-4 h-4 text-black" />
                </div>
              </div>

              {/* Bottom gold border accent on hover */}
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] transition-all duration-500" style={{ background: 'linear-gradient(90deg, #A07830, #C9A84C)' }} />
            </Link>
          ))}
        </div>

        {/* Other airports — compact horizontal list */}
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #f3f4f6' }}>
          {otherAirports.map((airport, i) => (
            <Link
              key={airport.code}
              href={`/${slugMap[airport.code]}-airport-transfer`}
              className="group flex items-center justify-between px-6 py-4 bg-white transition-all duration-200 hover:bg-gray-50"
              style={i < otherAirports.length - 1 ? { borderBottom: '1px solid #f3f4f6' } : {}}
            >
              <div className="flex items-center gap-5">
                <span
                  className="text-xs font-black w-10 shrink-0"
                  style={{ color: '#C9A84C', fontFamily: 'var(--font-serif)' }}
                >
                  {airport.code}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-amber-800 transition-colors">{airport.name}</p>
                  <p className="text-xs text-gray-400">{airport.cityName}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-sm" style={{ color: '#A07830' }}>{priceMap[airport.code]}</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-amber-500 transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom trust tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2">
          {['Meet & Greet Included', 'Flight Monitoring', 'Fixed Prices', 'Licensed NCC', '24/7 Available'].map((item) => (
            <span key={item} className="flex items-center gap-2 text-xs text-gray-400">
              <span className="w-1 h-1 rounded-full" style={{ background: '#C9A84C' }} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
