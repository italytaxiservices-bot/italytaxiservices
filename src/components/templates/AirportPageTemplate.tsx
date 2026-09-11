import Link from 'next/link'
import { ArrowRight, Clock, Shield, Plane } from 'lucide-react'
import type { Airport } from '@/types'
import { formatPrice } from '@/lib/utils'
import { buildWhatsAppUrl } from '@/lib/utils'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+390000000000'

const WA_SVG = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

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
    whatsapp: 'WhatsApp',
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
    whatsapp: 'Scrivici su WhatsApp',
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
              <a
                href={buildWhatsAppUrl(WHATSAPP, `Hello, I need a private transfer from ${airport.name} (${airport.code}).`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#20BA5A] transition-colors"
              >
                {WA_SVG}
                {t.whatsapp}
              </a>
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
