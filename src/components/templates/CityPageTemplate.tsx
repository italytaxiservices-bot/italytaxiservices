import Link from 'next/link'
import { ArrowRight, MapPin, Plane, Clock, Shield } from 'lucide-react'
import type { City } from '@/types'
import { airports } from '@/data/airports'
import { routes } from '@/data/routes'
import { formatPrice } from '@/lib/utils'
import RelatedLinks from '@/components/RelatedLinks'
import { getCityRelatedLinks } from '@/lib/internalLinks'

interface CityPageTemplateProps {
  city: City
  highlights: string[]
  about: string
  services: { title: string; description: string }[]
  locale?: 'en' | 'it'
  baseHref?: string
  airportHrefFn?: (slug: string) => string
  routeHrefFn?: (slug: string) => string
}

const INK = '#1a1410'
const GOLD = '#8B7340'
const CREAM = '#FAF7F2'
const LINE = '#E8E2D9'
const MUTED = '#7a7268'
const serifHeading = { fontFamily: 'var(--font-serif), Georgia, serif' }

const T = {
  en: {
    home: 'Home', breadcrumb: (n: string) => `Private Chauffeur ${n}`,
    h1: (n: string) => `Private Chauffeur Service ${n}`,
    suffix: 'Professional NCC chauffeur service with fixed prices, meet & greet, and 24/7 availability.',
    bookTransfer: 'Book a Transfer',
    aboutSection: (n: string) => `Private Chauffeur & NCC Service in ${n}`,
    airportsTitle: (n: string) => `Airport Transfers — ${n}`,
    servicesTitle: (n: string) => `Our Services in ${n}`,
    routesTitle: (n: string) => `Popular Routes from ${n}`,
    transferLabel: 'Transfer', from: 'from',
    ctaTitle: (n: string) => `Book Your ${n} Transfer Today`,
    ctaDesc: (n: string, r: string) => `Fixed prices, professional NCC chauffeurs, and 24/7 availability across ${n} and ${r}.`,
    getQuote: 'Get a Free Quote',
  },
  it: {
    home: 'Home', breadcrumb: (n: string) => `Chauffeur Privato ${n}`,
    h1: (n: string) => `Servizio Chauffeur Privato ${n}`,
    suffix: 'Servizio NCC professionale con prezzi fissi, meet & greet e disponibilità 24/7.',
    bookTransfer: 'Prenota un Transfer',
    aboutSection: (n: string) => `Servizio Chauffeur Privato & NCC a ${n}`,
    airportsTitle: (n: string) => `Transfer Aeroporto — ${n}`,
    servicesTitle: (n: string) => `I Nostri Servizi a ${n}`,
    routesTitle: (n: string) => `Percorsi Popolari da ${n}`,
    transferLabel: 'Transfer', from: 'da',
    ctaTitle: (n: string) => `Prenota il Tuo Transfer a ${n}`,
    ctaDesc: (n: string, r: string) => `Prezzi fissi, chauffeur NCC professionali e disponibilità 24/7 in ${n} e ${r}.`,
    getQuote: 'Richiedi un Preventivo Gratuito',
  },
}

export default function CityPageTemplate({
  city, highlights, about, services, locale = 'en', baseHref = '',
  airportHrefFn = (slug) => `/${slug}-airport-transfer`,
  routeHrefFn = (slug) => `/${slug}`,
}: CityPageTemplateProps) {
  const t = T[locale]
  const relatedLinks = locale === 'en' ? getCityRelatedLinks(city.slug) : []
  const cityAirports = airports.filter(a => a.citySlug === city.slug)
  const cityRoutes = routes.filter(r =>
    r.fromSlug.includes(city.slug) || r.toSlug === city.slug ||
    cityAirports.some(a => r.fromSlug.includes(a.slug) || r.toSlug.includes(a.slug))
  ).slice(0, 6)

  return (
    <div>
      {/* ── HERO ── */}
      <section className="pt-32 pb-20" style={{ background: '#0f0d0a' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: 'rgba(250,247,242,0.4)' }}>
            <Link href={`${baseHref}/`} className="hover:text-amber-400 transition-colors">{t.home}</Link>
            <span>/</span>
            <span style={{ color: GOLD }}>{t.breadcrumb(city.name)}</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-sm" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: GOLD }} />
              <span className="text-xs font-semibold tracking-wide" style={{ color: '#C9A84C' }}>{city.region}, Italy</span>
            </div>
            <h1 className="font-black leading-[1.05] mb-5" style={{ ...serifHeading, fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: CREAM }}>
              Private Chauffeur <span style={{ color: GOLD, fontStyle: 'italic' }}>{city.name}</span>
            </h1>
            <p className="text-base leading-relaxed mb-8 max-w-xl" style={{ color: 'rgba(250,247,242,0.65)' }}>
              {city.description} {t.suffix}
            </p>
            <Link href={`${baseHref}/#quote-form`} className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-sm transition-all hover:-translate-y-0.5" style={{ background: '#C9A84C', color: '#0f0d0a', letterSpacing: '0.04em' }}>
              {t.bookTransfer} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="py-14" style={{ background: CREAM }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((h, i) => (
              <div key={i} className="bg-white rounded-sm p-4 flex items-center gap-3" style={{ border: `1px solid ${LINE}` }}>
                <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0" style={{ background: 'rgba(139,115,64,0.1)' }}>
                  <Shield className="w-4 h-4" style={{ color: GOLD }} />
                </div>
                <span className="text-sm font-medium" style={{ color: '#5a5248' }}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT + AIRPORTS ── */}
      <section className="py-20 bg-white" style={{ borderTop: `1px solid ${LINE}` }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-2xl font-black mb-6" style={{ ...serifHeading, color: INK }}>{t.aboutSection(city.name)}</h2>
              {about.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm leading-relaxed mb-4" style={{ color: MUTED }}>{para}</p>
              ))}
            </div>
            {cityAirports.length > 0 && (
              <div>
                <h3 className="text-lg font-black mb-5 flex items-center gap-2" style={{ ...serifHeading, color: INK }}>
                  <Plane className="w-5 h-5" style={{ color: GOLD }} /> {t.airportsTitle(city.name)}
                </h3>
                <div className="space-y-3">
                  {cityAirports.map((airport) => (
                    <Link key={airport.code} href={airportHrefFn(airport.slug)} className="group flex items-center justify-between rounded-sm p-4 transition-all hover:shadow-md" style={{ background: CREAM, border: `1px solid ${LINE}` }}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ background: '#0f0d0a' }}>
                          <span className="font-bold text-xs" style={{ color: GOLD }}>{airport.code}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: INK }}>{airport.name}</p>
                          <p className="text-xs" style={{ color: '#9a8f83' }}>{airport.cityName}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: GOLD }} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      {services.length > 0 && (
        <section className="py-20" style={{ background: CREAM }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <h2 className="text-2xl font-black mb-10" style={{ ...serifHeading, color: INK }}>{t.servicesTitle(city.name)}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s) => (
                <div key={s.title} className="bg-white rounded-sm p-6" style={{ border: `1px solid ${LINE}` }}>
                  <h3 className="font-bold mb-3" style={{ ...serifHeading, color: INK }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── POPULAR ROUTES ── */}
      {cityRoutes.length > 0 && (
        <section className="py-20 bg-white" style={{ borderTop: `1px solid ${LINE}` }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <h2 className="text-2xl font-black mb-10" style={{ ...serifHeading, color: INK }}>{t.routesTitle(city.name)}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cityRoutes.map((route) => (
                <Link key={route.id} href={routeHrefFn(route.slug)} className="group rounded-sm p-5 transition-all hover:shadow-lg" style={{ background: CREAM, border: `1px solid ${LINE}` }}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: '#9a8f83' }}>{t.transferLabel}</p>
                      <p className="font-semibold text-sm" style={{ color: INK, ...serifHeading }}>{route.fromName} → {route.toName}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: GOLD }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs flex items-center gap-1" style={{ color: MUTED }}><Clock className="w-3 h-3" /> {route.estimatedTime}</span>
                    <span className="font-bold text-sm" style={{ color: GOLD }}>{t.from} {formatPrice(route.priceFrom)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED LINKS ── */}
      <RelatedLinks title="Chauffeur Service Across Italy" links={relatedLinks} />

      {/* ── CTA ── */}
      <section className="py-16" style={{ background: '#0f0d0a' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-2xl font-black mb-4" style={{ ...serifHeading, color: CREAM }}>{t.ctaTitle(city.name)}</h2>
          <p className="text-sm mb-8" style={{ color: 'rgba(250,247,242,0.55)' }}>{t.ctaDesc(city.name, city.region)}</p>
          <Link href={`${baseHref}/#quote-form`} className="inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-sm transition-all hover:-translate-y-0.5" style={{ background: '#C9A84C', color: '#0f0d0a', letterSpacing: '0.04em' }}>
            {t.getQuote} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
