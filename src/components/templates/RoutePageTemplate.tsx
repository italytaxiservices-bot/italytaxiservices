import Link from 'next/link'
import HeroWithForm from '@/components/booking/HeroWithForm'
import { ArrowRight, Clock, MapPin, Users, Briefcase } from 'lucide-react'
import type { Route } from '@/types'
import { vehicles } from '@/data/fleet'
import { formatPrice } from '@/lib/utils'
import RelatedLinks from '@/components/RelatedLinks'
import { getRouteRelatedLinks } from '@/lib/internalLinks'

interface RoutePageTemplateProps {
  route: Route
  about: string
  included: string[]
  faqs: { q: string; a: string }[]
  locale?: 'en' | 'it'
  baseHref?: string
}

// ── Cream editorial palette ──
const INK = '#1a1410'
const GOLD = '#8B7340'
const CREAM = '#FAF7F2'
const LINE = '#E8E2D9'
const MUTED = '#7a7268'

const T = {
  en: {
    home: 'Home', routes: 'Routes', badge: 'Private Transfer',
    h1: (from: string, to: string) => `${from} to ${to} Private Transfer`,
    journeyTime: 'Journey Time', distance: 'Distance', priceFrom: 'Price From',
    pickup: 'Pickup', destination: 'Destination',
    bookTransfer: 'Book This Transfer', vehicles: 'Choose Your Vehicle',
    aboutTitle: 'About This Transfer', includedTitle: "What's Included",
    faqTitle: (from: string, to: string) => `FAQs — ${from} to ${to}`,
    ctaTitle: (from: string, to: string) => `Book: ${from} → ${to}`,
    ctaDesc: (price: string) => `Fixed price from ${price}. Professional NCC chauffeur. Door to door.`,
    bookNow: (price: string) => `Book Now — from ${price}`, from: 'from', bags: 'bags',
  },
  it: {
    home: 'Home', routes: 'Percorsi', badge: 'Transfer Privato',
    h1: (from: string, to: string) => `Transfer Privato ${from} - ${to}`,
    journeyTime: 'Durata Viaggio', distance: 'Distanza', priceFrom: 'A Partire Da',
    pickup: 'Partenza', destination: 'Destinazione',
    bookTransfer: 'Prenota Questo Transfer', vehicles: 'Scegli il Tuo Veicolo',
    aboutTitle: 'Informazioni sul Transfer', includedTitle: 'Cosa è Incluso',
    faqTitle: (from: string, to: string) => `Domande Frequenti — ${from} - ${to}`,
    ctaTitle: (from: string, to: string) => `Prenota: ${from} → ${to}`,
    ctaDesc: (price: string) => `Prezzo fisso da ${price}. Chauffeur NCC professionale. Porta a porta.`,
    bookNow: (price: string) => `Prenota Ora — da ${price}`, from: 'da', bags: 'bagagli',
  },
}

const serifHeading = { fontFamily: 'var(--font-serif), Georgia, serif' }

export default function RoutePageTemplate({ route, about, included, faqs, locale = 'en', baseHref = '' }: RoutePageTemplateProps) {
  const t = T[locale]
  const relatedLinks = locale === 'en' ? getRouteRelatedLinks(route) : []

  return (
    <div>
      {/* ── HERO ── */}
      <section className="pt-32 pb-20" style={{ background: '#0f0d0a' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: 'rgba(250,247,242,0.4)' }}>
            <Link href={`${baseHref}/`} className="hover:text-amber-400 transition-colors">{t.home}</Link>
            <span>/</span>
            <span style={{ color: GOLD }}>{route.fromName} → {route.toName}</span>
          </nav>

          <HeroWithForm defaultPickup={route.fromName} defaultDropoff={route.toName}>
              <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-5" style={{ color: GOLD }}>{t.badge}</p>
              <h1 className="font-black leading-[1.05] mb-5" style={{ ...serifHeading, fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: CREAM }}>
                {route.fromName} to <span style={{ color: GOLD, fontStyle: 'italic' }}>{route.toName}</span>
              </h1>
              <p className="text-base leading-relaxed mb-8 max-w-lg" style={{ color: 'rgba(250,247,242,0.65)' }}>
                {route.description}
              </p>

              <div className="grid grid-cols-3 gap-3 mb-8 max-w-md">
                {[
                  { l: t.journeyTime, v: route.estimatedTime },
                  ...(route.distance ? [{ l: t.distance, v: route.distance }] : []),
                  { l: t.priceFrom, v: formatPrice(route.priceFrom), gold: true },
                ].map(({ l, v, gold }) => (
                  <div key={l} className="text-center py-3 px-2 rounded-sm" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)' }}>
                    <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'rgba(250,247,242,0.4)' }}>{l}</p>
                    <p className="font-bold text-sm" style={{ color: gold ? GOLD : CREAM }}>{v}</p>
                  </div>
                ))}
              </div>

              <Link href="#quote-form" className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-sm transition-all hover:-translate-y-0.5" style={{ background: '#C9A84C', color: '#0f0d0a', letterSpacing: '0.04em' }}>
                {t.bookTransfer} <ArrowRight className="w-4 h-4" />
              </Link>

            {/* Route card — under the copy, since the booking form takes the right column */}
            <div className="mt-8 rounded-sm p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: 'rgba(250,247,242,0.4)' }}>{t.pickup}</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 shrink-0" style={{ color: GOLD }} />
                    <p className="font-semibold text-sm" style={{ color: CREAM }}>{route.fromName}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 shrink-0" style={{ color: GOLD }} />
                <div className="flex-1 min-w-0 text-right">
                  <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: 'rgba(250,247,242,0.4)' }}>{t.destination}</p>
                  <div className="flex items-center justify-end gap-2">
                    <p className="font-semibold text-sm" style={{ color: CREAM }}>{route.toName}</p>
                    <MapPin className="w-4 h-4 shrink-0" style={{ color: GOLD }} />
                  </div>
                </div>
              </div>
              <div className="space-y-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                {route.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(250,247,242,0.7)' }}>
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    {h}
                  </div>
                ))}
              </div>
            </div>
          </HeroWithForm>
        </div>
      </section>

      {/* ── VEHICLES ── */}
      <section className="py-20" style={{ background: CREAM }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <h2 className="text-2xl font-black mb-10" style={{ ...serifHeading, color: INK }}>{t.vehicles}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {vehicles.map((v) => (
              <div key={v.id} className="bg-white rounded-sm p-5" style={{ border: `1px solid ${LINE}` }}>
                <div className="h-20 rounded-sm flex items-center justify-center mb-4" style={{ background: '#F0EBE1' }}>
                  <svg className="w-20 h-12" style={{ color: '#D4B86A' }} viewBox="0 0 200 80" fill="currentColor">
                    <path d="M20 55 C20 55 30 35 50 32 L80 28 C90 26 100 24 115 24 L145 24 C158 24 168 30 175 40 L182 50 C185 50 190 52 190 56 L190 60 C190 62 188 64 186 64 L174 64 C173 70 167 75 160 75 C153 75 147 70 146 64 L64 64 C63 70 57 75 50 75 C43 75 37 70 36 64 L24 64 C22 64 20 62 20 60 Z" />
                  </svg>
                </div>
                <h3 className="font-bold text-sm mb-0.5" style={{ ...serifHeading, color: INK }}>{v.name}</h3>
                <p className="text-xs mb-3" style={{ color: '#9a8f83' }}>{v.model}</p>
                <div className="flex gap-4 mb-3 text-xs" style={{ color: MUTED }}>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" style={{ color: GOLD }} /> {v.passengers}</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" style={{ color: GOLD }} /> {v.luggage} {t.bags}</span>
                </div>
                <p className="font-bold text-sm" style={{ color: GOLD }}>
                  {t.from} {formatPrice(Math.round(route.priceFrom * v.priceMultiplier))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT + INCLUDED ── */}
      <section className="py-20 bg-white" style={{ borderTop: `1px solid ${LINE}` }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-black mb-6" style={{ ...serifHeading, color: INK }}>{t.aboutTitle}</h2>
              {about.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm leading-relaxed mb-4" style={{ color: MUTED }}>{para}</p>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-black mb-5" style={{ ...serifHeading, color: INK }}>{t.includedTitle}</h3>
              <div className="space-y-3">
                {included.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    <p className="text-sm" style={{ color: '#5a5248' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      {faqs.length > 0 && (
        <section className="py-20" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <h2 className="text-2xl font-black mb-8" style={{ ...serifHeading, color: INK }}>{t.faqTitle(route.fromName, route.toName)}</h2>
            <div className="space-y-px">
              {faqs.map((faq, i) => (
                <div key={i} className="py-5" style={i < faqs.length - 1 ? { borderBottom: `1px solid ${LINE}` } : {}}>
                  <h3 className="font-bold text-sm mb-2" style={{ color: INK }}>{faq.q}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED LINKS ── */}
      <RelatedLinks title="Related Transfers & Services" links={relatedLinks} />

      {/* ── CTA ── */}
      <section className="py-16" style={{ background: '#0f0d0a' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-2xl font-black mb-4" style={{ ...serifHeading, color: CREAM }}>{t.ctaTitle(route.fromName, route.toName)}</h2>
          <p className="text-sm mb-8" style={{ color: 'rgba(250,247,242,0.55)' }}>{t.ctaDesc(formatPrice(route.priceFrom))}</p>
          <Link href="#quote-form" className="inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-sm transition-all hover:-translate-y-0.5" style={{ background: '#C9A84C', color: '#0f0d0a', letterSpacing: '0.04em' }}>
            {t.bookNow(formatPrice(route.priceFrom))} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
