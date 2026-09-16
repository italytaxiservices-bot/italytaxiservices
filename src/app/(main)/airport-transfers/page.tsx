import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, Shield, Plane, MapPin } from 'lucide-react'
import { airports } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Airport Transfers Italy — NCC Private Service',
  description: 'Rated 4.9★ by 847 travellers. Private NCC airport transfers across Italy — Malpensa, Fiumicino, Marco Polo & more. Meet & greet, flight monitoring, no hidden fees. Fixed price.',
  alternates: { canonical: '/airport-transfers' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/airport-transfers',
    title: 'Airport Transfers Italy — NCC Private Service | Italy Taxi Services',
    description: 'Rated 4.9★ by 847 travellers. Private NCC airport transfers across Italy — Malpensa, Fiumicino, Marco Polo & more. Meet & greet, flight monitoring, no hidden fees. Fixed price.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airport Transfers Italy — NCC Private Service | Italy Taxi Services',
    description: 'Rated 4.9★ by 847 travellers. Private NCC airport transfers across Italy — Malpensa, Fiumicino, Marco Polo & more. Meet & greet, flight monitoring, no hidden fees. Fixed price.',
    images: ['/logo.webp'],
  },
}

const airportsByRegion = [
  {
    region: 'Northern Italy',
    airports: airports.filter(a => ['MXP', 'LIN', 'BGY', 'VCE'].includes(a.code)),
  },
  {
    region: 'Central Italy',
    airports: airports.filter(a => ['FCO', 'CIA', 'FLR', 'PSA'].includes(a.code)),
  },
]

export default function AirportTransfersPage() {
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
              <Plane className="w-4 h-4" />
              All Italian Airports
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Private Airport Transfers — Italy
            </h1>
            <p className="text-gray-300 text-xl leading-relaxed mb-8">
              Fixed-price NCC chauffeur service from every major Italian airport. Meet & greet, flight monitoring, and direct transfers to your hotel or destination — included in every booking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/#quote-form"
                className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold px-6 py-3 rounded-xl hover:bg-gold-light transition-colors"
              >
                Book Airport Transfer <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-gold py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-6 text-navy text-sm font-semibold">
            {['Meet & Greet Included', 'Flight Monitoring', 'Fixed Prices', 'Licensed NCC', '24/7 Service', 'No Hidden Fees'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Airports by region */}
      {airportsByRegion.map(({ region, airports: regionAirports }) => (
        <section key={region} className="py-20 bg-white first:bg-white [&:nth-child(even)]:bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-10">
              <MapPin className="w-5 h-5 text-gold" />
              <h2 className="text-2xl font-bold text-gray-900">{region}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {regionAirports.map((airport) => {
                const pageHref = `/${airport.slug}-airport-transfer`
                return (
                  <Link
                    key={airport.code}
                    href={pageHref}
                    className="group bg-white border border-gray-100 hover:border-gold/40 hover:shadow-xl rounded-2xl p-6 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-navy rounded-xl flex items-center justify-center shrink-0">
                          <span className="text-gold font-bold">{airport.code}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{airport.name}</h3>
                          <p className="text-sm text-gray-500">{airport.cityName}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-gold transition-colors shrink-0 mt-1" />
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{airport.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {['Meet & Greet', 'Flight Monitoring', 'Fixed Price', '24/7'].map(t => (
                        <span key={t} className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      ))}

      {/* Why private transfer */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Private NCC Over Taxi or Shuttle?</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: 'No Waiting',
                desc: 'Your driver waits for you — not the other way around. Flight delayed? We track it. No extra charge for delays up to 60 min.',
              },
              {
                icon: Shield,
                title: 'Fixed Price',
                desc: 'Agreed before you board. No meter running, no traffic surcharges, no surprises. What we quote is what you pay.',
              },
              {
                icon: Plane,
                title: 'Door to Door',
                desc: 'Unlike trains or buses, we take you from the arrivals hall directly to your hotel, villa, or any address.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Icon className="w-8 h-8 text-gold mb-4" />
                <h3 className="text-white font-bold mb-3">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Book Your Airport Transfer</h2>
          <p className="text-gray-600 mb-8">
            Tell us your airport, arrival time, and destination. We&apos;ll send you a fixed-price quote within minutes.
          </p>
          <Link
            href="/#quote-form"
            className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold px-8 py-4 rounded-xl hover:bg-gold-light transition-colors"
          >
            Get a Quote Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
