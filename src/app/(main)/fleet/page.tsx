import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Users, Briefcase, Star, Shield } from 'lucide-react'
import { vehicles } from '@/data/fleet'
import { fleet as fleetCategories } from '@/lib/data/fleet'

export const metadata: Metadata = {
  title: 'Our Fleet — Luxury & Business Vehicles',
  description: 'Explore our premium fleet: Mercedes E-Class, S-Class, V-Class van, and luxury SUV. All NCC licensed, fully insured, available across Italy.',
  alternates: { canonical: '/fleet' },
}

const vehicleDetails = [
  {
    id: 'sedan',
    images: null,
    category: 'Business',
    features: ['Professional chauffeur', 'Leather interior', 'Climate control', 'Bottled water', 'Phone charger', 'WiFi on request'],
    ideal: 'Airport transfers, business travel, city tours',
  },
  {
    id: 'business',
    images: null,
    category: 'First Class',
    features: ['Senior chauffeur', 'Premium leather', 'Privacy partition on request', 'Champagne on request', 'Newspapers', 'WiFi'],
    ideal: 'VIP transfers, executive travel, special occasions',
  },
  {
    id: 'van',
    images: null,
    category: 'Group',
    features: ['Professional driver', '7 individual seats', 'Large luggage capacity', 'Climate control', 'USB chargers', 'Group comfort'],
    ideal: 'Groups, families, cruise transfers, airport runs',
  },
  {
    id: 'luxury',
    images: null,
    category: 'SUV Luxury',
    features: ['Elite chauffeur', 'Panoramic sunroof', 'Massaging seats', 'Premium audio', 'Ambient lighting', 'Champagne on arrival'],
    ideal: 'Luxury transfers, weddings, corporate VIP',
  },
]

export default function FleetPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Star className="w-4 h-4" />
              NCC Licensed Fleet
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Our Premium Fleet
            </h1>
            <p className="text-gray-300 text-xl leading-relaxed">
              All vehicles are maintained to the highest standards, NCC licensed, fully insured, and available with professional chauffeurs across Italy.
            </p>
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="space-y-16">
            {vehicles.map((v, idx) => {
              const det = vehicleDetails.find(d => d.id === v.id)
              return (
                <div key={v.id} className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Vehicle illustration */}
                  <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="relative h-64 bg-gradient-to-br from-navy to-navy-800 rounded-3xl flex items-center justify-center overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-[0.06]"
                        style={{
                          backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
                          backgroundSize: '30px 30px',
                        }}
                      />
                      <svg className="w-64 h-32 text-gold/50" viewBox="0 0 200 80" fill="currentColor">
                        <path d="M20 55 C20 55 30 35 50 32 L80 28 C90 26 100 24 115 24 L145 24 C158 24 168 30 175 40 L182 50 C185 50 190 52 190 56 L190 60 C190 62 188 64 186 64 L174 64 C173 70 167 75 160 75 C153 75 147 70 146 64 L64 64 C63 70 57 75 50 75 C43 75 37 70 36 64 L24 64 C22 64 20 62 20 60 Z" />
                      </svg>
                      <div className="absolute top-4 left-4 bg-gold/20 border border-gold/30 rounded-lg px-3 py-1">
                        <span className="text-gold text-xs font-semibold uppercase tracking-wider">{det?.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{v.name}</h2>
                    <p className="text-gold font-semibold mb-1">{v.model}</p>
                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
                      <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-gold" /> Up to {v.passengers} passengers</span>
                      <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-gold" /> {v.luggage} large bags</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">{v.description}</p>

                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Included</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {(det?.features ?? v.features).map((f) => (
                          <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-4 h-4 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                              <svg className="w-2.5 h-2.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-6">
                      <span className="font-medium text-gray-700">Ideal for:</span> {det?.ideal}
                    </p>

                    <div className="flex gap-3">
                      <Link
                        href="/#quote-form"
                        className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-5 py-3 rounded-xl hover:bg-gold-light transition-colors text-sm"
                      >
                        Book {v.name} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Fleet Standards</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Fully Insured', desc: 'All vehicles carry comprehensive NCC insurance — passengers included.' },
              { icon: Star, title: 'Max 3 Years Old', desc: 'Our fleet is maintained new. No ageing vehicles — only premium condition.' },
              { icon: Users, title: 'Vetted Chauffeurs', desc: 'Every driver is background-checked, NCC-licensed, and professionally trained.' },
              { icon: Briefcase, title: 'Maintained Daily', desc: 'Vehicles are cleaned and inspected before every transfer — no exceptions.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category detail pages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Compare Vehicle Categories</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            A closer look at capacity, luggage space and who each category suits best.
          </p>
          <div className="flex flex-wrap gap-3">
            {fleetCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/fleet/${c.slug}`}
                className="px-5 py-2.5 bg-gray-50 border border-gray-100 rounded-full text-sm font-medium text-gray-700 hover:border-gold/40 hover:text-gray-900 transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Book?</h2>
          <p className="text-gray-400 mb-8">
            Get an instant quote for any vehicle. Fixed prices, professional NCC chauffeurs, across all of Italy.
          </p>
          <Link
            href="/#quote-form"
            className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-8 py-4 rounded-xl hover:bg-gold-light transition-colors"
          >
            Get a Free Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
