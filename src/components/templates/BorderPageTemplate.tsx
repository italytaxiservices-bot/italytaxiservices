import Link from 'next/link'
import { ArrowRight, Clock, MapPin, Shield, CreditCard, Plane } from 'lucide-react'
import type { BorderRoute } from '@/data/borders'
import { buildWhatsAppUrl } from '@/lib/utils'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+390000000000'

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

          <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-start">

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
                <Link href="/#quote-form" className="btn-primary">
                  Book This Transfer
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={buildWhatsAppUrl(WHATSAPP, `Hello, I would like to book a private transfer from ${route.fromName} to ${route.toName} (${route.toCountry}). Please provide a quote.`)}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-4 rounded-sm transition-all"
                  style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)', color: '#4ade80' }}
                >
                  <svg className="w-4 h-4" fill="#25D366" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp Quote
                </a>
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

            {/* Right — route card */}
            <div className="rounded-sm overflow-hidden sticky top-24" style={{ background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(201,168,76,0.05)' }}>
                <p className="text-white font-bold text-sm">Route Summary</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#C9A84C' }} />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>From</p>
                    <p className="text-white text-sm font-semibold">{route.fromName}</p>
                  </div>
                </div>
                <div className="ml-1 w-px h-6" style={{ background: 'rgba(201,168,76,0.2)' }} />
                <div className="flex items-center gap-3">
                  <div className="text-base shrink-0">{route.flag}</div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Border Crossing</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{route.crossingPoint}</p>
                  </div>
                </div>
                <div className="ml-1 w-px h-6" style={{ background: 'rgba(201,168,76,0.2)' }} />
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#E0C070' }} />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>To</p>
                    <p className="text-white text-sm font-semibold">{route.toName}, {route.toCountry}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Fixed price from</span>
                    <span className="font-black text-xl" style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#C9A84C' }}>€{route.priceFrom}</span>
                  </div>
                  <Link href="/#quote-form" className="btn-primary w-full justify-center rounded-sm py-3.5 text-xs">
                    Get Exact Price
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
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
