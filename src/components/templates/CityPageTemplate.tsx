import Link from 'next/link'
import { ArrowRight, MapPin, Plane, Clock, Shield } from 'lucide-react'
import type { City } from '@/types'
import { airports } from '@/data/airports'
import { routes } from '@/data/routes'
import { formatPrice } from '@/lib/utils'
import { buildWhatsAppUrl } from '@/lib/utils'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+390000000000'

const WA_SVG = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

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

const T = {
  en: {
    home: 'Home',
    breadcrumb: (n: string) => `Private Chauffeur ${n}`,
    h1: (n: string) => `Private Chauffeur Service ${n}`,
    suffix: 'Professional NCC chauffeur service with fixed prices, meet & greet, and 24/7 availability.',
    bookTransfer: 'Book a Transfer',
    whatsapp: 'WhatsApp',
    aboutSection: (n: string) => `Private Chauffeur & NCC Service in ${n}`,
    airportsTitle: (n: string) => `Airport Transfers — ${n}`,
    servicesTitle: (n: string) => `Our Services in ${n}`,
    routesTitle: (n: string) => `Popular Routes from ${n}`,
    transferLabel: 'Transfer',
    from: 'from',
    ctaTitle: (n: string) => `Book Your ${n} Transfer Today`,
    ctaDesc: (n: string, r: string) => `Fixed prices, professional NCC chauffeurs, and 24/7 availability across ${n} and ${r}.`,
    getQuote: 'Get a Free Quote',
    whatsappUs: 'WhatsApp Us',
  },
  it: {
    home: 'Home',
    breadcrumb: (n: string) => `Chauffeur Privato ${n}`,
    h1: (n: string) => `Servizio Chauffeur Privato ${n}`,
    suffix: 'Servizio NCC professionale con prezzi fissi, meet & greet e disponibilità 24/7.',
    bookTransfer: 'Prenota un Transfer',
    whatsapp: 'Scrivici su WhatsApp',
    aboutSection: (n: string) => `Servizio Chauffeur Privato & NCC a ${n}`,
    airportsTitle: (n: string) => `Transfer Aeroporto — ${n}`,
    servicesTitle: (n: string) => `I Nostri Servizi a ${n}`,
    routesTitle: (n: string) => `Percorsi Popolari da ${n}`,
    transferLabel: 'Transfer',
    from: 'da',
    ctaTitle: (n: string) => `Prenota il Tuo Transfer a ${n}`,
    ctaDesc: (n: string, r: string) => `Prezzi fissi, chauffeur NCC professionali e disponibilità 24/7 in ${n} e ${r}.`,
    getQuote: 'Richiedi un Preventivo Gratuito',
    whatsappUs: 'Scrivici su WhatsApp',
  },
}

export default function CityPageTemplate({
  city,
  highlights,
  about,
  services,
  locale = 'en',
  baseHref = '',
  airportHrefFn = (slug) => `/${slug}-airport-transfer`,
  routeHrefFn = (slug) => `/${slug}`,
}: CityPageTemplateProps) {
  const t = T[locale]
  const cityAirports = airports.filter(a => a.citySlug === city.slug)
  const cityRoutes = routes.filter(r =>
    r.fromSlug.includes(city.slug) || r.toSlug === city.slug ||
    cityAirports.some(a => r.fromSlug.includes(a.slug) || r.toSlug.includes(a.slug))
  ).slice(0, 6)

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
            <span className="text-gray-300">{t.breadcrumb(city.name)}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <MapPin className="w-4 h-4" />
              {city.region}, Italy
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {t.h1(city.name)}
            </h1>
            <p className="text-gray-300 text-xl leading-relaxed mb-8">
              {city.description} {t.suffix}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`${baseHref}/#quote-form`}
                className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold px-6 py-3 rounded-xl hover:bg-gold-light transition-colors"
              >
                {t.bookTransfer} <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={buildWhatsAppUrl(WHATSAPP, `Hello, I need a private chauffeur in ${city.name}.`)}
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

      {/* Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((h, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-gold" />
                </div>
                <span className="text-sm font-medium text-gray-700">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t.aboutSection(city.name)}
              </h2>
              <div className="prose prose-gray max-w-none">
                {about.split('\n\n').map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed mb-4">{para}</p>
                ))}
              </div>
            </div>

            {cityAirports.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-5">
                  <Plane className="inline w-5 h-5 text-gold mr-2" />
                  {t.airportsTitle(city.name)}
                </h3>
                <div className="space-y-3">
                  {cityAirports.map((airport) => (
                    <Link
                      key={airport.code}
                      href={airportHrefFn(airport.slug)}
                      className="group flex items-center justify-between bg-gray-50 hover:bg-gold/5 border border-gray-100 hover:border-gold/30 rounded-xl p-4 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center">
                          <span className="text-gold font-bold text-xs">{airport.code}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{airport.name}</p>
                          <p className="text-xs text-gray-500">{airport.cityName}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gold transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services */}
      {services.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">
              {t.servicesTitle(city.name)}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <div key={s.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-3">{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Routes */}
      {cityRoutes.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">
              {t.routesTitle(city.name)}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cityRoutes.map((route) => (
                <Link
                  key={route.id}
                  href={routeHrefFn(route.slug)}
                  className="group bg-gray-50 hover:bg-white border border-gray-100 hover:border-gold/40 hover:shadow-lg rounded-2xl p-5 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">{t.transferLabel}</p>
                      <p className="font-semibold text-gray-900 text-sm">{route.fromName} → {route.toName}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gold transition-colors" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {route.estimatedTime}
                    </span>
                    <span className="text-gold font-bold">{t.from} {formatPrice(route.priceFrom)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t.ctaTitle(city.name)}
          </h2>
          <p className="text-gray-400 mb-8">
            {t.ctaDesc(city.name, city.region)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${baseHref}/#quote-form`}
              className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold px-8 py-4 rounded-xl hover:bg-gold-light transition-colors"
            >
              {t.getQuote} <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={buildWhatsAppUrl(WHATSAPP, `Hello, I need a private chauffeur in ${city.name}, Italy.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#20BA5A] transition-colors"
            >
              {t.whatsappUs}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
