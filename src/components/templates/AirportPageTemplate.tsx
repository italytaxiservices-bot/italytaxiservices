import Link from 'next/link'
import { ArrowRight, Clock, Shield, Plane } from 'lucide-react'
import type { Airport } from '@/types'
import { formatPrice } from '@/lib/utils'
import RelatedLinks from '@/components/RelatedLinks'
import { getAirportRelatedLinks } from '@/lib/internalLinks'

interface AirportPageTemplateProps {
  airport: Airport
  popularDestinations: { name: string; href: string; time: string; priceFrom: number }[]
  about: string
  tips: string[]
  locale?: 'en' | 'it'
  baseHref?: string
  airportTransfersHref?: string
}

const INK = '#1a1410'
const GOLD = '#8B7340'
const CREAM = '#FAF7F2'
const LINE = '#E8E2D9'
const MUTED = '#7a7268'
const serifHeading = { fontFamily: 'var(--font-serif), Georgia, serif' }

const T = {
  en: {
    home: 'Home', airportTransfers: 'Airport Transfers',
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
    bookBtn: 'Book Airport Transfer', from: 'from',
  },
  it: {
    home: 'Home', airportTransfers: 'Transfer Aeroporto',
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
    bookBtn: 'Prenota Transfer Aeroporto', from: 'da',
  },
}

export default function AirportPageTemplate({
  airport, popularDestinations, about, tips, locale = 'en', baseHref = '', airportTransfersHref,
}: AirportPageTemplateProps) {
  const t = T[locale]
  const hubHref = airportTransfersHref ?? `${baseHref}/airport-transfers`
  const relatedLinks = locale === 'en' ? getAirportRelatedLinks(airport) : []

  return (
    <div>
      {/* ── HERO ── */}
      <section className="pt-32 pb-20" style={{ background: '#0f0d0a' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: 'rgba(250,247,242,0.4)' }}>
            <Link href={`${baseHref}/`} className="hover:text-amber-400 transition-colors">{t.home}</Link>
            <span>/</span>
            <Link href={hubHref} className="hover:text-amber-400 transition-colors">{t.airportTransfers}</Link>
            <span>/</span>
            <span style={{ color: GOLD }}>{airport.name}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-sm" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}>
              <Plane className="w-3.5 h-3.5" style={{ color: GOLD }} />
              <span className="text-xs font-semibold tracking-wide" style={{ color: '#C9A84C' }}>{airport.code} · {airport.cityName}</span>
            </div>
            <h1 className="font-black leading-[1.05] mb-5" style={{ ...serifHeading, fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: CREAM }}>
              {airport.name} <span style={{ color: GOLD, fontStyle: 'italic' }}>Private Transfer</span>
            </h1>
            <p className="text-base leading-relaxed mb-8 max-w-xl" style={{ color: 'rgba(250,247,242,0.65)' }}>
              {airport.description} {t.suffix}
            </p>
            <Link href={`${baseHref}/#quote-form`} className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-sm transition-all hover:-translate-y-0.5" style={{ background: '#C9A84C', color: '#0f0d0a', letterSpacing: '0.04em' }}>
              {t.bookTransfer} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="py-4" style={{ background: '#C9A84C' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold" style={{ color: '#0f0d0a' }}>
            {t.trust.map(item => (
              <span key={item} className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> {item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR DESTINATIONS ── */}
      {popularDestinations.length > 0 && (
        <section className="py-20" style={{ background: CREAM }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <h2 className="text-2xl font-black mb-3" style={{ ...serifHeading, color: INK }}>{t.destTitle(airport.name)}</h2>
            <p className="mb-10 text-sm" style={{ color: MUTED }}>{t.destSubtitle}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularDestinations.map((dest) => (
                <Link key={dest.name} href={dest.href} className="group bg-white rounded-sm p-5 transition-all hover:shadow-lg" style={{ border: `1px solid ${LINE}` }}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: '#9a8f83' }}>{t.privateTransfer}</p>
                      <p className="font-semibold text-sm" style={{ color: INK, ...serifHeading }}>{airport.code} → {dest.name}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: GOLD }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs flex items-center gap-1" style={{ color: MUTED }}><Clock className="w-3.5 h-3.5" /> {dest.time}</span>
                    <span className="font-bold text-sm" style={{ color: GOLD }}>{t.from} {formatPrice(dest.priceFrom)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ABOUT + TIPS ── */}
      <section className="py-20 bg-white" style={{ borderTop: `1px solid ${LINE}` }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-black mb-6" style={{ ...serifHeading, color: INK }}>{t.aboutTitle(airport.name)}</h2>
              {about.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm leading-relaxed mb-4" style={{ color: MUTED }}>{para}</p>
              ))}
            </div>
            {tips.length > 0 && (
              <div>
                <h3 className="text-lg font-black mb-5" style={{ ...serifHeading, color: INK }}>{t.tipsTitle(airport.name)}</h3>
                <div className="space-y-3">
                  {tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-sm p-4" style={{ background: CREAM, border: `1px solid ${LINE}` }}>
                      <div className="w-6 h-6 rounded-sm flex items-center justify-center shrink-0 mt-0.5" style={{ background: '#C9A84C' }}>
                        <span className="font-bold text-xs" style={{ color: '#0f0d0a' }}>{i + 1}</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── RELATED LINKS ── */}
      <RelatedLinks title="Chauffeur Services & Nearby Airports" links={relatedLinks} />

      {/* ── CTA ── */}
      <section className="py-16" style={{ background: '#0f0d0a' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-2xl font-black mb-4" style={{ ...serifHeading, color: CREAM }}>{t.ctaTitle(airport.code)}</h2>
          <p className="text-sm mb-8" style={{ color: 'rgba(250,247,242,0.55)' }}>{t.ctaDesc(airport.name)}</p>
          <Link href={`${baseHref}/#quote-form`} className="inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-sm transition-all hover:-translate-y-0.5" style={{ background: '#C9A84C', color: '#0f0d0a', letterSpacing: '0.04em' }}>
            {t.bookBtn} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
