import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Shield, Star, Globe, Clock, Award, Car } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Drivers | Professional NCC Chauffeurs — Italy Taxi Services',
  description: 'Meet the professional NCC-licensed chauffeurs behind Italy Taxi Services. English-speaking, fully vetted, locally expert drivers across Italy.',
  alternates: { canonical: '/our-drivers' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/our-drivers',
    title: 'Our Drivers | Professional NCC Chauffeurs — Italy Taxi Services',
    description: 'Meet the professional NCC-licensed chauffeurs behind Italy Taxi Services.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Drivers | Professional NCC Chauffeurs — Italy Taxi Services',
    description: 'Meet the professional NCC-licensed chauffeurs behind Italy Taxi Services.',
    images: ['/logo.webp'],
  },
}

const standards = [
  { icon: Award,  title: 'NCC Licensed',           desc: 'Every driver holds an official Italian NCC licence — the legal requirement for all private hire chauffeur operations in Italy.' },
  { icon: Shield, title: 'Fully Vetted',            desc: 'Criminal record checks, driving licence verification, and vehicle inspections completed before any driver joins our network.' },
  { icon: Globe,  title: 'English Speaking',        desc: 'All drivers communicate fluently in English. French, German, Spanish, and Arabic also available in selected cities.' },
  { icon: Star,   title: 'Passenger-Rated',         desc: 'Every transfer is rated after completion. Only drivers maintaining a consistently high score remain active on our platform.' },
  { icon: Clock,  title: 'Punctuality Guaranteed',  desc: 'Flights, trains, cruise schedules — all tracked in real time. Your driver arrives before you do.' },
  { icon: Car,    title: 'Smart & Professional',    desc: 'Smart dress, name board at arrivals, and a professional manner are non-negotiable standards for every driver in our network.' },
]

const conductRules = [
  'Arrive at least 10 minutes before the agreed pickup time',
  'Hold a personalised name board at all airport and station arrivals',
  'Assist with all luggage loading and unloading',
  'Maintain a clean, odour-free, well-presented vehicle at all times',
  'No personal phone calls during the journey (hands-free only)',
  'Never charge for detours or request tips',
  'Report all flight and train delays proactively to the passenger',
  'Dress professionally — no casual or sportswear on duty',
]

const coverage = [
  { city: 'Rome',             drivers: '12+ drivers', note: 'ZTL · Airport · Vatican · Colosseum' },
  { city: 'Milan',            drivers: '10+ drivers', note: 'Malpensa · Linate · Corporate · Lake Como' },
  { city: 'Florence',         drivers: '8+ drivers',  note: 'Airport · Tuscany Tours · Historic Centre' },
  { city: 'Venice',           drivers: '6+ drivers',  note: 'Marco Polo · Cruise Port · Dolomites' },
  { city: 'Naples',           drivers: '8+ drivers',  note: 'Airport · Amalfi Coast · Pompeii' },
  { city: 'Bologna',          drivers: '5+ drivers',  note: 'Airport · Emilia-Romagna Routes' },
  { city: 'Turin',            drivers: '4+ drivers',  note: 'Airport · French & Swiss Border' },
  { city: 'Palermo / Catania',drivers: '5+ drivers',  note: 'Sicily Airports · Coastal Transfers' },
]

export default function OurDriversPage() {
  return (
    <div className="pt-16">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden grain" style={{ background: '#080808' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 60%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 5%, #C9A84C 40%, #E0C070 60%, #C9A84C 80%, transparent 95%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-28">
          <div className="flex items-center gap-4 mb-6">
            <div className="gold-line" />
            <span className="section-label">NCC Chauffeurs · Italy</span>
          </div>
          <h1 className="font-black text-white leading-[1.05] mb-6" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)' }}>
            The Drivers{' '}
            <span className="text-gold-gradient italic" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
              Behind Every Transfer
            </span>
          </h1>
          <p className="text-base leading-relaxed max-w-xl mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Licensed, vetted, English-speaking NCC chauffeurs. They don&apos;t just drive — they know Italy, arrive before you do, and hold a name board at every arrival.
          </p>
          <Link href="/#quote-form" className="btn-primary">
            Book a Transfer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── STANDARDS ────────────────────────────────────── */}
      <section className="py-24" style={{ background: '#F5F0E8' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-14">
            <div className="gold-line" />
            <span className="section-label">Driver Standards</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {standards.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-sm p-7" style={{ border: '1px solid rgba(201,168,76,0.12)' }}>
                <Icon className="w-5 h-5 mb-4" style={{ color: '#C9A84C' }} />
                <h3 className="font-black text-gray-900 text-base mb-2" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCAL KNOWLEDGE + CODE OF CONDUCT ───────────── */}
      <section className="py-24 grain" style={{ background: '#080808' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Local knowledge */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="gold-line" />
                <span className="section-label">Local Knowledge That Matters</span>
              </div>
              <h2 className="text-2xl font-black text-white mb-5 leading-tight" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
                Knowing Italy Is Half the Job
              </h2>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <p>Knowing how to drive is not enough. Our drivers know every ZTL restricted zone in Rome and Florence, every hairpin on the Amalfi Coast, every hotel entrance in Venice&apos;s waterway network.</p>
                <p>They know which Malpensa route avoids morning traffic, how early to leave for FCO in August, and which pickup point outside Fiumicino is faster than the official taxi rank.</p>
                <p>This is the kind of local knowledge that only comes from years of operating on Italian roads — and it&apos;s what separates our service from booking a random ride.</p>
              </div>
            </div>

            {/* Code of conduct */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="gold-line" />
                <span className="section-label">Code of Conduct</span>
              </div>
              <div className="space-y-px">
                {conductRules.map((rule, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 py-4"
                    style={i < conductRules.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.06)' } : {}}
                  >
                    <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COVERAGE ─────────────────────────────────────── */}
      <section className="py-24" style={{ background: '#F5F0E8' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-14">
            <div className="gold-line" />
            <span className="section-label">Driver Coverage Across Italy</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coverage.map(({ city, drivers, note }) => (
              <div key={city} className="bg-white rounded-sm p-6" style={{ border: '1px solid rgba(201,168,76,0.12)' }}>
                <p className="font-black text-gray-900 text-base mb-1" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>{city}</p>
                <p className="text-xs font-bold mb-2" style={{ color: '#C9A84C' }}>{drivers}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24 grain" style={{ background: '#080808' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="gold-line" />
            <span className="section-label">Book Your Transfer</span>
            <div className="gold-line" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
            Professional Drivers. Fixed Prices. Zero Surprises.
          </h2>
          <p className="text-sm leading-relaxed mb-8 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Every booking is matched to the best available driver in your area — licensed, rated, and ready.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/#quote-form" className="btn-primary">
              Book Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-4 rounded-sm transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' }}
            >
              About Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
