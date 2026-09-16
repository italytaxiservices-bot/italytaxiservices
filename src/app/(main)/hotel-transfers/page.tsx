import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, Shield, Clock, Star, MapPin, CreditCard } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Hotel Transfers Italy | Private Door-to-Door Transfer Service',
  description: 'Private hotel transfers across Italy. Door-to-door service with luggage assistance, professional NCC drivers, and fixed prices. Any hotel, any city, 24/7.',
  alternates: { canonical: '/hotel-transfers' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/hotel-transfers',
    title: 'Hotel Transfers Italy | Private Door-to-Door Transfer Service | Italy Taxi Services',
    description: 'Private hotel transfers across Italy. Door-to-door service with luggage assistance, professional NCC drivers, and fixed prices.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hotel Transfers Italy | Private Door-to-Door Transfer Service | Italy Taxi Services',
    description: 'Private hotel transfers across Italy. Door-to-door service with luggage assistance, professional NCC drivers, and fixed prices.',
    images: ['/logo.webp'],
  },
}

const destinations = [
  { city: 'Rome',         note: 'ZTL access arranged',        desc: 'Hotel Hassler, Hotel Eden, Palazzo Manfredi — every historic-centre entrance covered.' },
  { city: 'Milan',        note: 'City & suburbs',             desc: 'Mandarin Oriental, Four Seasons, Armani Hotel — centre and Navigli district.' },
  { city: 'Florence',     note: 'ZTL access arranged',        desc: 'Belmond Villa San Michele, Portrait Firenze — historic-centre drop-off points known.' },
  { city: 'Venice',       note: 'Piazzale Roma handover',     desc: 'Gritti Palace, Ca\' Sagredo — we coordinate with your hotel\'s water-taxi service.' },
  { city: 'Amalfi Coast', note: 'SS163 specialists',          desc: 'Le Sirenuse, Hotel Caruso, Santa Caterina — experienced on every hairpin of the coastal road.' },
  { city: 'Lake Como',    note: 'All lakeshore addresses',    desc: 'Villa d\'Este, Grand Hotel Tremezzo — Bellagio, Varenna, Menaggio all covered.' },
]

const included = [
  { icon: Building2,   title: 'Door-to-Door',     desc: 'Picked up from your exact address — airport, port, station, or previous hotel — delivered to your hotel entrance.' },
  { icon: Shield,      title: 'Luggage Handling', desc: 'Your driver loads and unloads every bag. No wrestling with trolleys on cobblestones or crowded buses.' },
  { icon: Clock,       title: 'Live Tracking',    desc: 'For airport and station pickups we track your flight or train in real time. Your driver waits, whatever happens.' },
  { icon: CreditCard,  title: 'Fixed Price',      desc: 'Quoted before departure. No meter, no traffic charge, no surprise extras. What you see is what you pay.' },
  { icon: Star,        title: 'Name Board',       desc: 'Your driver holds a personalised name board at arrivals — no hunting through the crowd.' },
  { icon: MapPin,      title: '24 / 7 Service',   desc: 'Early check-ins, late night arrivals, bank holidays — we operate around the clock, every day of the year.' },
]

const routes = [
  { label: 'Fiumicino Airport → Rome Hotels',        href: '/fiumicino-airport-transfer' },
  { label: 'Malpensa Airport → Milan Hotels',        href: '/malpensa-airport-transfer' },
  { label: 'Marco Polo Airport → Venice Hotels',     href: '/marco-polo-airport-transfer' },
  { label: 'Florence Airport → Florence Hotels',     href: '/florence-airport-transfer' },
  { label: 'Naples Airport → Amalfi Coast Hotels',   href: '/naples-airport-transfer' },
  { label: 'Rome → Positano / Ravello Hotels',       href: '/rome-to-amalfi-coast' },
  { label: 'Malpensa Airport → Lake Como Hotels',    href: '/malpensa-to-lake-como' },
  { label: 'Rome → Florence Hotels',                 href: '/rome-to-florence' },
]

export default function HotelTransfersPage() {
  return (
    <div className="pt-16">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden grain" style={{ background: '#080808' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 60%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 5%, #C9A84C 40%, #E0C070 60%, #C9A84C 80%, transparent 95%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-28">
          <div className="flex items-center gap-4 mb-6">
            <div className="gold-line" />
            <span className="section-label">Hotel Transfer · Italy · 24 / 7</span>
          </div>
          <h1 className="font-black text-white leading-[1.05] mb-6" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)' }}>
            Private Hotel{' '}
            <span className="text-gold-gradient italic" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
              Transfer Service
            </span>
          </h1>
          <p className="text-base leading-relaxed max-w-xl mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Door-to-door transfers to any hotel across Italy. Professional NCC chauffeurs, full luggage assistance, and fixed prices — from any airport, cruise port, station, or city address.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/#quote-form" className="btn-primary">
              Book Hotel Transfer <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ──────────────────────────────── */}
      <section className="py-24" style={{ background: '#F5F0E8' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-14">
            <div className="gold-line" />
            <span className="section-label">Every Booking Includes</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {included.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-sm p-7" style={{ border: '1px solid rgba(201,168,76,0.12)' }}>
                <Icon className="w-5 h-5 mb-4" style={{ color: '#C9A84C' }} />
                <h3 className="font-black text-gray-900 text-base mb-2" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS + ROUTES ────────────────────────── */}
      <section className="py-24 grain" style={{ background: '#080808' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Destinations */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="gold-line" />
                <span className="section-label">Hotel Destinations</span>
              </div>
              <div className="space-y-4">
                {destinations.map(({ city, note, desc }) => (
                  <div key={city} className="p-5 rounded-sm" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-bold text-white text-sm">{city}</p>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm" style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C' }}>{note}</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular routes */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="gold-line" />
                <span className="section-label">Popular Routes</span>
              </div>
              <div className="space-y-2">
                {routes.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center justify-between p-4 rounded-sm transition-all group"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: '#C9A84C' }} />
                      <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-30 group-hover:opacity-100 group-hover:text-amber-400 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24" style={{ background: '#F5F0E8' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="gold-line" />
            <span className="section-label">Book Your Transfer</span>
            <div className="gold-line" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
            Tell Us Your Hotel — We Handle the Rest
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Pickup point, destination hotel, travel date. Fixed price confirmed in minutes.
          </p>
          <Link href="/#quote-form" className="btn-primary">
            Get a Hotel Transfer Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
