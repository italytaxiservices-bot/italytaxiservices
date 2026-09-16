import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Plane, Car, Ship, Building2, Heart, Umbrella, Landmark, Clock, Star, Shield, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Services | Italy Taxi Services — NCC Private Transfers',
  description: 'Explore all private transfer services offered by Italy Taxi Services. Airport transfers, city-to-city, cruise ports, hotel transfers, corporate, weddings, beach, and tours.',
  alternates: { canonical: '/services' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/services',
    title: 'Our Services | Italy Taxi Services — NCC Private Transfers',
    description: 'Explore all private transfer services offered by Italy Taxi Services.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | Italy Taxi Services — NCC Private Transfers',
    description: 'Explore all private transfer services offered by Italy Taxi Services.',
    images: ['/logo.webp'],
  },
}

const services = [
  { icon: Plane,    title: 'Airport Transfers',       desc: 'Fixed-price NCC transfers from every major Italian airport. Meet & greet, flight monitoring, direct hotel drop-off.', href: '/airport-transfers',            badge: 'Most Popular' },
  { icon: Car,      title: 'City to City',             desc: 'Rome to Florence, Milan to Venice, Naples to Amalfi. No train changes — direct, door to door.',                     href: '/city-to-city-transfers',       badge: null },
  { icon: Ship,     title: 'Cruise Port Transfers',    desc: 'Civitavecchia, Venice, Naples, Livorno — seamless transfers timed to your ship schedule.',                           href: '/cruise-transfers',             badge: null },
  { icon: Building2,title: 'Hotel Transfers',          desc: 'Door-to-door transfers to any Italian hotel. Luggage assistance and fixed prices from any pickup.',                  href: '/hotel-transfers',              badge: null },
  { icon: Star,     title: 'Business & Corporate',     desc: 'Premium chauffeur for executives. Discreet, punctual, NCC-compliant across all Italian cities.',                     href: '/corporate-chauffeur-italy',    badge: null },
  { icon: Heart,    title: 'Wedding Transfers',        desc: 'Bridal cars, guest shuttles, and full wedding-day logistics — Tuscany, Lake Como, Amalfi, Rome.',                   href: '/wedding-chauffeur-italy',      badge: null },
  { icon: Umbrella, title: 'Beach Transfers',          desc: 'Amalfi Coast, Cinque Terre, Sardinia, Sicily — private transfers with space for all your beach gear.',              href: '/beach-transfers',              badge: null },
  { icon: Landmark, title: 'Attraction Transfers',     desc: 'Colosseum, Vatican, Pompeii, Amalfi Coast. Skip public transport and go directly to the attraction.',              href: '/attraction-transfer/colosseum',badge: null },
  { icon: Clock,    title: 'Hourly Chauffeur',         desc: 'Book a professional NCC driver by the hour for meetings, sightseeing, shopping, or flexible itineraries.',          href: '/hourly-chauffeur-italy',       badge: null },
  { icon: Globe,    title: 'Private Tours',            desc: 'Tuscany, Amalfi, Sicily, Italian Lakes — fully customised private tours at your pace.',                             href: '/italy-private-tours',          badge: null },
]

const pillars = [
  { icon: Shield, label: 'Licensed NCC Operators',   sub: 'Every driver holds an official Italian NCC licence' },
  { icon: Star,   label: 'Fixed Prices',              sub: 'Agreed upfront — no meter, no surprises' },
  { icon: Clock,  label: '24 / 7 Availability',      sub: 'Early flights, late arrivals, public holidays' },
  { icon: Globe,  label: 'English Speaking',          sub: 'All drivers communicate in English' },
]

export default function ServicesPage() {
  return (
    <div className="pt-16">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden grain" style={{ background: '#080808' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 55%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 5%, #C9A84C 40%, #E0C070 60%, #C9A84C 80%, transparent 95%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-28">
          <div className="flex items-center gap-4 mb-6">
            <div className="gold-line" />
            <span className="section-label">Private Transfer Services · Italy</span>
          </div>
          <h1 className="font-black text-white leading-[1.05] mb-6" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)' }}>
            Every Transfer,{' '}
            <span className="text-gold-gradient italic" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
              Covered
            </span>
          </h1>
          <p className="text-base leading-relaxed max-w-xl mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Airport pickups to cross-country journeys, beach trips to bespoke tours — every service is operated by licensed NCC chauffeurs at fixed, agreed prices.
          </p>
          <Link href="/#quote-form" className="btn-primary">
            Get a Free Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── SERVICES GRID ────────────────────────────────── */}
      <section className="py-24" style={{ background: '#F5F0E8' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-14">
            <div className="gold-line" />
            <span className="section-label">What We Offer</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, title, desc, href, badge }) => (
              <Link
                key={href}
                href={href}
                className="group relative flex flex-col bg-white rounded-sm p-7 transition-all hover:-translate-y-1 hover:shadow-2xl"
                style={{ border: '1px solid rgba(201,168,76,0.12)' }}
              >
                {badge && (
                  <span
                    className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm"
                    style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)' }}
                  >
                    {badge}
                  </span>
                )}
                <div
                  className="w-11 h-11 rounded-sm flex items-center justify-center mb-5"
                  style={{ background: '#080808' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#C9A84C' }} />
                </div>
                <h2 className="font-black text-gray-900 text-lg mb-2 leading-tight" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
                  {title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{desc}</p>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all" style={{ color: '#C9A84C' }}>
                  View service <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILLARS ──────────────────────────────────────── */}
      <section className="py-20 grain" style={{ background: '#080808' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-14">
            <div className="gold-line" />
            <span className="section-label">Our Standard</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="p-6 rounded-sm" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <Icon className="w-5 h-5 mb-4" style={{ color: '#C9A84C' }} />
                <p className="font-bold text-white text-sm mb-1">{label}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24" style={{ background: '#F5F0E8' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="gold-line" />
            <span className="section-label">Ready to Travel?</span>
            <div className="gold-line" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
            Book Your Transfer — Fixed Price, Guaranteed
          </h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed max-w-md mx-auto">
            Get a confirmed quote in under 2 minutes. Licensed drivers, door-to-door service, no hidden fees.
          </p>
          <Link href="/#quote-form" className="btn-primary">
            Get a Free Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
