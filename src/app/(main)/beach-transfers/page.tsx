import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Umbrella, Shield, Clock, MapPin, Sun, Wind } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Beach Transfers Italy | Private Transfer to Italian Beaches',
  description: 'Private beach transfers across Italy. Amalfi Coast, Positano, Cinque Terre, Sardinia, Sicily and more. Fixed prices, space for beach gear, professional NCC drivers.',
  alternates: { canonical: '/beach-transfers' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/beach-transfers',
    title: 'Beach Transfers Italy | Private Transfer to Italian Beaches | Italy Taxi Services',
    description: 'Private beach transfers across Italy. Fixed prices, space for beach gear, professional NCC drivers.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beach Transfers Italy | Private Transfer to Italian Beaches | Italy Taxi Services',
    description: 'Private beach transfers across Italy. Fixed prices, space for beach gear, professional NCC drivers.',
    images: ['/logo.webp'],
  },
}

const destinations = [
  { name: 'Amalfi Coast',    beaches: 'Positano · Amalfi · Ravello · Praiano',     from: 'Naples or Rome',               href: '/rome-to-amalfi-coast',      note: 'SS163 specialists' },
  { name: 'Cinque Terre',    beaches: 'Monterosso · Vernazza · Manarola',           from: 'Milan or Florence',            href: '/destinations/cinque-terre', note: 'No train changes' },
  { name: 'Sardinia',        beaches: 'Costa Smeralda · Stintino · Villasimius',    from: 'Cagliari or Olbia Airport',    href: '/cagliari-airport-transfer', note: 'Airport direct' },
  { name: 'Sicily',          beaches: 'Taormina · Cefalù · San Vito Lo Capo',      from: 'Palermo or Catania Airport',   href: '/palermo-airport-transfer',  note: 'Airport direct' },
  { name: 'Italian Riviera', beaches: 'Portofino · Santa Margherita · Alassio',    from: 'Milan or Genoa',               href: '/destinations/portofino',    note: 'Coastal route' },
  { name: 'Lake Garda',      beaches: 'Sirmione · Desenzano · Riva del Garda',     from: 'Milan or Verona',              href: '/destinations/lake-como',    note: 'Mediterranean microclimate' },
]

const reasons = [
  { icon: Sun,      title: 'No Luggage Stress',      desc: 'Beach bags, towels, snorkels, inflatables — we carry it all. No overhead racks or checked luggage fees.' },
  { icon: MapPin,   title: 'Drop-Off at the Sand',   desc: 'We take you as close to the beach as the road allows. No long walks from train stations.' },
  { icon: Clock,    title: 'Return Transfers',        desc: 'Book round-trip and we collect you at your chosen time. Sunburned and sleepy? We handle the drive.' },
  { icon: Wind,     title: 'Air-Conditioned Comfort', desc: 'Italian summers are intense. Arrive refreshed, not exhausted, in a cool, modern vehicle.' },
  { icon: Shield,   title: 'Fixed Price',             desc: 'Agreed before you leave. No meter running in coastal traffic. What you quote is what you pay.' },
  { icon: Umbrella, title: 'Flexible Timing',         desc: 'Leave early to beat the crowds or late for a quiet afternoon. We work around your schedule.' },
]

const routes = [
  { label: 'Rome → Amalfi Coast',          href: '/rome-to-amalfi-coast' },
  { label: 'Naples → Positano',            href: '/naples-airport-transfer' },
  { label: 'Florence → Cinque Terre',      href: '/florence-chauffeur-service' },
  { label: 'Milan → Portofino / Riviera',  href: '/destinations/portofino' },
  { label: 'Catania Airport → Taormina',   href: '/catania-airport-transfer' },
  { label: 'Palermo Airport → Cefalù',     href: '/palermo-airport-transfer' },
  { label: 'Olbia Airport → Costa Smeralda', href: '/olbia-airport-transfer' },
  { label: 'Milan / Verona → Lake Garda',  href: '/milan-chauffeur-service' },
]

export default function BeachTransfersPage() {
  return (
    <div className="pt-16">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden grain" style={{ background: '#080808' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 60%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 5%, #C9A84C 40%, #E0C070 60%, #C9A84C 80%, transparent 95%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-28">
          <div className="flex items-center gap-4 mb-6">
            <div className="gold-line" />
            <span className="section-label">Beach Transfers · Italy</span>
          </div>
          <h1 className="font-black text-white leading-[1.05] mb-6" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)' }}>
            From City to{' '}
            <span className="text-gold-gradient italic" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
              Coastline
            </span>
          </h1>
          <p className="text-base leading-relaxed max-w-xl mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Private transfers to Italy&apos;s finest beaches — Amalfi, Positano, Cinque Terre, Sardinia, and beyond. Space for all your gear, air-conditioned comfort, fixed prices.
          </p>
          <Link href="/#quote-form" className="btn-primary">
            Book Beach Transfer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── WHY PRIVATE ──────────────────────────────────── */}
      <section className="py-24" style={{ background: '#F5F0E8' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-14">
            <div className="gold-line" />
            <span className="section-label">Why Private Over Public Transport</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reasons.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-sm p-7" style={{ border: '1px solid rgba(201,168,76,0.12)' }}>
                <Icon className="w-5 h-5 mb-4" style={{ color: '#C9A84C' }} />
                <h3 className="font-black text-gray-900 text-base mb-2" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ─────────────────────────────────── */}
      <section className="py-24 grain" style={{ background: '#080808' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">

            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="gold-line" />
                <span className="section-label">Beach Destinations</span>
              </div>
              <div className="space-y-4">
                {destinations.map(({ name, beaches, from, href, note }) => (
                  <Link
                    key={name}
                    href={href}
                    className="flex items-start justify-between p-5 rounded-sm transition-all group"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1.5">
                        <p className="font-bold text-white text-sm">{name}</p>
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm" style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C' }}>{note}</span>
                      </div>
                      <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{beaches}</p>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>From: {from}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 shrink-0 mt-1 opacity-20 group-hover:opacity-100 group-hover:text-amber-400 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

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
            <span className="section-label">Book Your Beach Transfer</span>
            <div className="gold-line" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
            Your Beach is Waiting
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Tell us your pickup, destination, and date. Fixed price confirmed in minutes — no surprises on the day.
          </p>
          <Link href="/#quote-form" className="btn-primary">
            Get a Beach Transfer Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
