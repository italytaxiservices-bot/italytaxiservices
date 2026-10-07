import Link from 'next/link'
import QuoteForm from '@/components/home/QuoteForm'
import { ArrowRight, Clock, MapPin, Shield, CreditCard, Plane } from 'lucide-react'
import type { BorderRoute } from '@/data/borders'


interface Props {
  route: BorderRoute
  about: string
  tips: string[]
  faqs: { q: string; a: string }[]
  relatedRoutes?: { name: string; href: string }[]
}

export default function BorderPageTemplate({ route, about, tips, faqs, relatedRoutes = [] }: Props) {
  return (
    <div className="pt-16">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden grain" style={{ background: '#080808' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.04) 0%, transparent 60%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 5%, #C9A84C 40%, #E0C070 60%, #C9A84C 80%, transparent 95%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs mb-10" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/border-crossings" className="hover:text-amber-400 transition-colors">Border Crossings</Link>
            <span>/</span>
            <span style={{ color: '#C9A84C' }}>{route.fromName} → {route.toName}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start">

            {/* Left */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="gold-line" />
                <span className="section-label">Cross-Border Private Transfer · Italy {route.flag} {route.toCountry}</span>
              </div>

              <h1 className="font-black text-white leading-[1] mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
                {route.fromName} to{' '}
                <span className="text-gold-gradient italic font-bold" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
                  {route.toName}
                </span>
                <br />
                <span className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.6)' }}>Private Transfer</span>
              </h1>

              <p className="text-base leading-relaxed mb-8 max-w-xl" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {route.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mb-10">
                {[
                  { icon: Clock, label: 'Journey Time', value: route.estimatedTime },
                  { icon: MapPin, label: 'Distance', value: route.distance },
                  { icon: Shield, label: 'Border crossing', value: route.crossingPoint },
                  { icon: CreditCard, label: 'Price From', value: `€${route.priceFrom}`, gold: true },
                ].map(({ icon: Icon, label, value, gold }) => (
                  <div key={label} className="flex items-center gap-3 px-5 py-3 rounded-sm" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Icon className="w-4 h-4 shrink-0" style={{ color: '#C9A84C' }} />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
                      <p className={`font-bold text-sm ${gold ? '' : 'text-white'}`} style={gold ? { color: '#C9A84C' } : {}}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="#quote-form" className="btn-primary">
                  Book This Transfer
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-3">
                {route.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2.5">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — booking form (replaces the old route-summary card; its border crossing moved into the stats) */}
            <div className="w-full max-w-[480px] mx-auto lg:max-w-none lg:mx-0">
              <QuoteForm defaultPickup={route.fromName} defaultDropoff={route.toName} />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="gold-line" />
                <span className="section-label">About This Route</span>
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 leading-tight">
                {route.fromName} to {route.toName} —<br />
                <span className="italic font-bold text-gold-gradient" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
                  Private Cross-Border Transfer
                </span>
              </h2>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                {about.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="gold-line" />
                <span className="section-label">Border Crossing Tips</span>
              </div>
              <div className="space-y-4">
                {tips.map((tip, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-sm" style={{ background: '#FAF6EE', border: '1px solid rgba(201,168,76,0.12)' }}>
                    <span className="font-black text-lg shrink-0 leading-none" style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: 'rgba(201,168,76,0.4)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm text-gray-600 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INCLUDED ── */}
      <section className="py-20 grain" style={{ background: '#080808' }}>
        <div className="h-[1px] absolute left-0 right-0" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.2) 50%, transparent 95%)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="gold-line" />
            <span className="section-label">What's Included in Every Booking</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Shield, title: 'Licensed NCC Operator', desc: 'Your Italian leg is operated by a licensed NCC partner — legally compliant and fully insured.' },
              { icon: CreditCard, title: 'Fixed Price', desc: 'Border crossings, motorway tolls, and waiting time included. The price quoted is final.' },
              { icon: Plane, title: 'Flight Monitoring', desc: 'For airport pickups: we track your flight. If it delays, your driver waits at no extra charge.' },
              { icon: MapPin, title: 'Door to Door', desc: 'We pick you up at your exact address and drop you at your final destination — no intermediate stops.' },
              { icon: Clock, title: '24/7 Availability', desc: 'Cross-border transfers available any hour of any day — early morning, late night, public holidays.' },
              { icon: ArrowRight, title: 'Meet & Greet', desc: 'For airport pickups: your driver waits in arrivals with a name board before you clear customs.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-sm" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                <Icon className="w-5 h-5 mb-3" style={{ color: '#C9A84C' }} />
                <h3 className="font-bold text-white text-sm mb-2">{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQS ── */}
      {faqs.length > 0 && (
        <section className="py-24" style={{ background: '#F5F0E8' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-4 mb-10">
              <div className="gold-line" />
              <span className="section-label">Frequently Asked Questions</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-10">
              {route.fromName} to {route.toName} — FAQs
            </h2>
            <div className="space-y-px">
              {faqs.map((faq, i) => (
                <div key={i} className="py-6" style={i < faqs.length - 1 ? { borderBottom: '1px solid rgba(201,168,76,0.15)' } : {}}>
                  <h3 className="font-bold text-gray-900 mb-3 text-sm">{faq.q}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED ROUTES ── */}
      {relatedRoutes.length > 0 && (
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <p className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: '#C9A84C' }}>Related Border Crossings</p>
            <div className="flex flex-wrap gap-3">
              {relatedRoutes.map(({ name, href }) => (
                <Link key={href} href={href} className="flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm font-medium transition-all hover:bg-amber-50" style={{ border: '1px solid rgba(201,168,76,0.2)', color: '#A07830' }}>
                  {name} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
              <Link href="/border-crossings" className="flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm font-medium transition-all" style={{ border: '1px solid #e5e7eb', color: '#6b7280' }}>
                All Border Crossings <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
