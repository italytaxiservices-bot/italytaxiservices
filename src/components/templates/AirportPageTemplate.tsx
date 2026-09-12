import Link from 'next/link'
import { ArrowRight, Clock, Shield, Plane } from 'lucide-react'
import type { Airport } from '@/types'
import { formatPrice } from '@/lib/utils'

interface AirportPageTemplateProps {
  airport: Airport
  popularDestinations: { name: string; href: string; time: string; priceFrom: number }[]
  about: string
  tips: string[]
  locale?: 'en' | 'it'
  baseHref?: string
  airportTransfersHref?: string
}

const T = {
  en: {
    home: 'Home',
    airportTransfers: 'Airport Transfers',
    h1: (name: string) => `${name} Private Transfer`,
    suffix: 'Professional NCC chauffeur service with meet & greet, flight monitoring, and fixed prices.',
    bookTransfer: 'Book Airport Transfer',
    trust: ['Meet & Greet Included', 'Flight Monitoring', 'Fixed Prices', 'Licensed NCC', '24/7 Service'],
    destTitle: (name: string) => `Popular Destinations from ${name}`,
    destSubtitle: 'Fixed-price private transfers to the most popular destinations.',
    privateTransfer: 'Private Transfer',
    aboutTitle: (name: string) => `Private Transfers from ${name}`,
    tipsTitle: (name: string) => `Useful Information — ${name}`,
    ctaTitle: (code: string) => `Book Your ${code} Transfer Now`,
    ctaDesc: (name: string) => `Professional NCC chauffeur service from ${name}. Fixed prices, meet & greet, flight monitoring.`,
    bookBtn: 'Book Airport Transfer',
    from: 'from',
  },
  it: {
    home: 'Home',
    airportTransfers: 'Transfer Aeroporto',
    h1: (name: string) => `Transfer Privato ${name}`,
    suffix: 'Servizio NCC professionale con meet & greet, monitoraggio volo e prezzi fissi.',
    bookTransfer: 'Prenota Transfer Aeroporto',
    trust: ['Meet & Greet Incluso', 'Monitoraggio Volo', 'Prezzi Fissi', 'NCC Autorizzato', 'Servizio 24/7'],
    destTitle: (name: string) => `Destinazioni Popolari da ${name}`,
    destSubtitle: 'Transfer privati a prezzo fisso verso le destinazioni più richieste.',
    privateTransfer: 'Transfer Privato',
    aboutTitle: (name: string) => `Transfer Privati da ${name}`,
    tipsTitle: (name: string) => `Informazioni Utili — ${name}`,
    ctaTitle: (code: string) => `Prenota il Tuo Transfer da ${code}`,
    ctaDesc: (name: string) => `Servizio chauffeur NCC professionale da ${name}. Prezzi fissi, meet & greet, monitoraggio volo.`,
    bookBtn: 'Prenota Transfer Aeroporto',
    from: 'da',
  },
}

export default function AirportPageTemplate({
  airport,
  popularDestinations,
  about,
  tips,
  locale = 'en',
  baseHref = '',
  airportTransfersHref,
}: AirportPageTemplateProps) {
  const t = T[locale]
  const hubHref = airportTransfersHref ?? `${baseHref}/airport-transfers`

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
            <Link href={hubHref} className="hover:text-gold transition-colors">{t.airportTransfers}</Link>
            <span>/</span>
            <span className="text-gray-300">{airport.name}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Plane className="w-4 h-4" />
              {airport.code} · {airport.cityName}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {t.h1(airport.name)}
            </h1>
            <p className="text-gray-300 text-xl leading-relaxed mb-8">
              {airport.description} {t.suffix}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`${baseHref}/#quote-form`}
                className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold px-6 py-3 rounded-xl hover:bg-gold-light transition-colors"
              >
                {t.bookTransfer} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-gold py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-6 text-navy text-sm font-semibold">
            {t.trust.map(item => (
              <span key={item} className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Popular destinations */}
      {popularDestinations.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {t.destTitle(airport.name)}
            </h2>
            <p className="text-gray-600 mb-10">{t.destSubtitle}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {popularDestinations.map((dest) => (
                <Link
                  key={dest.name}
                  href={dest.href}
                  className="group bg-white hover:border-gold/40 border border-gray-100 hover:shadow-lg rounded-2xl p-5 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">{t.privateTransfer}</p>
                      <p className="font-semibold text-gray-900">{airport.code} → {dest.name}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gold transition-colors" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {dest.time}
                    </span>
                    <span className="font-bold text-gold">{t.from} {formatPrice(dest.priceFrom)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About + Tips */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t.aboutTitle(airport.name)}
              </h2>
              {about.split('\n\n').map((para, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4">{para}</p>
              ))}
            </div>

            {tips.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-5">
                  {t.tipsTitle(airport.name)}
                </h3>
                <div className="space-y-4">
                  {tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                      <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-navy font-bold text-xs">{i + 1}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t.ctaTitle(airport.code)}
          </h2>
          <p className="text-gray-400 mb-8">
            {t.ctaDesc(airport.name)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${baseHref}/#quote-form`}
              className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold px-8 py-4 rounded-xl hover:bg-gold-light transition-colors"
            >
              {t.bookBtn} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
