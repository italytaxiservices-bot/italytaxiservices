import Link from 'next/link'
import { ArrowRight, Clock, MapPin, Users, Briefcase } from 'lucide-react'
import type { Route } from '@/types'
import { vehicles } from '@/data/fleet'
import { formatPrice } from '@/lib/utils'

interface RoutePageTemplateProps {
  route: Route
  about: string
  included: string[]
  faqs: { q: string; a: string }[]
  locale?: 'en' | 'it'
  baseHref?: string
}

const T = {
  en: {
    home: 'Home',
    badge: 'Private Transfer',
    h1: (from: string, to: string) => `${from} to ${to} Private Transfer`,
    journeyTime: 'Journey Time',
    distance: 'Distance',
    priceFrom: 'Price From',
    pickup: 'Pickup',
    destination: 'Destination',
    bookTransfer: 'Book This Transfer',
    vehicles: 'Choose Your Vehicle',
    aboutTitle: 'About This Transfer',
    includedTitle: "What's Included",
    faqTitle: (from: string, to: string) => `FAQs — ${from} to ${to}`,
    ctaTitle: (from: string, to: string) => `Book: ${from} → ${to}`,
    ctaDesc: (price: string) => `Fixed price from ${price}. Professional NCC chauffeur. Door to door.`,
    bookNow: (price: string) => `Book Now — from ${price}`,
    from: 'from',
    bags: 'bags',
  },
  it: {
    home: 'Home',
    badge: 'Transfer Privato',
    h1: (from: string, to: string) => `Transfer Privato ${from} - ${to}`,
    journeyTime: 'Durata Viaggio',
    distance: 'Distanza',
    priceFrom: 'A Partire Da',
    pickup: 'Partenza',
    destination: 'Destinazione',
    bookTransfer: 'Prenota Questo Transfer',
    vehicles: 'Scegli il Tuo Veicolo',
    aboutTitle: 'Informazioni sul Transfer',
    includedTitle: 'Cosa è Incluso',
    faqTitle: (from: string, to: string) => `Domande Frequenti — ${from} - ${to}`,
    ctaTitle: (from: string, to: string) => `Prenota: ${from} → ${to}`,
    ctaDesc: (price: string) => `Prezzo fisso da ${price}. Chauffeur NCC professionale. Porta a porta.`,
    bookNow: (price: string) => `Prenota Ora — da ${price}`,
    from: 'da',
    bags: 'bagagli',
  },
}

export default function RoutePageTemplate({ route, about, included, faqs, locale = 'en', baseHref = '' }: RoutePageTemplateProps) {
  const t = T[locale]

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
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href={`${baseHref}/`} className="hover:text-gold transition-colors">{t.home}</Link>
            <span>/</span>
            <span className="text-gray-300">{route.fromName} → {route.toName}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                {t.badge}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                {t.h1(route.fromName, route.toName)}
              </h1>
              <p className="text-gray-300 text-xl leading-relaxed mb-8">
                {route.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-400 mb-1">{t.journeyTime}</p>
                  <p className="text-white font-bold">{route.estimatedTime}</p>
                </div>
                {route.distance && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">{t.distance}</p>
                    <p className="text-white font-bold">{route.distance}</p>
                  </div>
                )}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-400 mb-1">{t.priceFrom}</p>
                  <p className="text-gold font-bold text-xl">{formatPrice(route.priceFrom)}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`${baseHref}/#quote-form`}
                  className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold px-6 py-3 rounded-xl hover:bg-gold-light transition-colors"
                >
                  {t.bookTransfer} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Route card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">{t.pickup}</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold shrink-0" />
                    <p className="text-white font-semibold">{route.fromName}</p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-gold" />
                </div>
                <div className="flex-1 min-w-0 text-right">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">{t.destination}</p>
                  <div className="flex items-center justify-end gap-2">
                    <p className="text-white font-semibold">{route.toName}</p>
                    <MapPin className="w-4 h-4 text-gold shrink-0" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {route.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="w-4 h-4 bg-gold/20 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {h}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle options */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">{t.vehicles}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {vehicles.map((v) => (
              <div key={v.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="h-24 bg-gradient-to-br from-navy to-navy-800 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-20 h-12 text-gold/60" viewBox="0 0 200 80" fill="currentColor">
                    <path d="M20 55 C20 55 30 35 50 32 L80 28 C90 26 100 24 115 24 L145 24 C158 24 168 30 175 40 L182 50 C185 50 190 52 190 56 L190 60 C190 62 188 64 186 64 L174 64 C173 70 167 75 160 75 C153 75 147 70 146 64 L64 64 C63 70 57 75 50 75 C43 75 37 70 36 64 L24 64 C22 64 20 62 20 60 Z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-0.5">{v.name}</h3>
                <p className="text-xs text-gray-400 mb-3">{v.model}</p>
                <div className="flex gap-4 mb-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-gold" /> {v.passengers}</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-gold" /> {v.luggage} {t.bags}</span>
                </div>
                <p className="text-gold font-bold text-sm">
                  {t.from} {formatPrice(Math.round(route.priceFrom * v.priceMultiplier))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About + Included */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.aboutTitle}</h2>
              {about.split('\n\n').map((para, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4">{para}</p>
              ))}
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-5">{t.includedTitle}</h3>
              <div className="space-y-3">
                {included.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">
              {t.faqTitle(route.fromName, route.toName)}
            </h2>
            <div className="space-y-5">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3">{faq.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t.ctaTitle(route.fromName, route.toName)}
          </h2>
          <p className="text-gray-400 mb-8">
            {t.ctaDesc(formatPrice(route.priceFrom))}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${baseHref}/#quote-form`}
              className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold px-8 py-4 rounded-xl hover:bg-gold-light transition-colors"
            >
              {t.bookNow(formatPrice(route.priceFrom))} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
