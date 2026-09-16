import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Route as RouteIcon } from 'lucide-react'
import { newDomesticRoutes } from '@/lib/data/routesIndex'
import { internationalRoutes } from '@/lib/data/routes'
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Private Transfer Routes Across Italy',
  description:
    'Direct, door-to-door private chauffeur routes between Italian cities, plus international transfers to Switzerland, France, Austria and Slovenia. Fixed prices.',
  alternates: { canonical: '/routes' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/routes',
    title: 'Private Transfer Routes Across Italy | Italy Taxi Services',
    description: 'Direct, door-to-door private chauffeur routes between Italian cities, plus international transfers to Switzerland, France, Austria and Slovenia. Fixed prices.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private Transfer Routes Across Italy | Italy Taxi Services',
    description: 'Direct, door-to-door private chauffeur routes between Italian cities, plus international transfers to Switzerland, France, Austria and Slovenia. Fixed prices.',
    images: ['/logo.webp'],
  },
}

const HUB_GROUPS: { key: 'switzerland' | 'france' | 'austria' | 'slovenia'; label: string }[] = [
  { key: 'switzerland', label: 'Switzerland' },
  { key: 'france', label: 'France & Monaco' },
  { key: 'austria', label: 'Austria' },
  { key: 'slovenia', label: 'Slovenia' },
]

export default function RoutesPage() {
  return (
    <div className="pt-20">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: siteConfig.domain },
          { name: 'Routes', url: `${siteConfig.domain}/routes` },
        ])}
      />

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
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-300">Routes</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <RouteIcon className="w-4 h-4" /> Point-to-Point Transfers
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Private Transfer Routes</h1>
            <p className="text-gray-300 text-xl leading-relaxed">
              Direct, door-to-door private transfers between Italian cities — and beyond, into Switzerland, France, Austria and Slovenia.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Italy Routes</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {newDomesticRoutes.map((r) => (
              <Link
                key={r.slug}
                href={`/routes/${r.slug}`}
                className="group p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:border-gold/40 transition-colors"
              >
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-gold transition-colors">
                  {r.from} &rarr; {r.to}
                </h3>
                <p className="text-xs text-gray-500 mb-3">{r.distanceApprox} &middot; {r.durationApprox}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold">
                  View route <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">International Border Crossing Transfers</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Private chauffeur transfers connecting Italy with neighbouring countries. See our{' '}
            <Link href="/international-border-crossing-transfers" className="text-gold font-medium hover:underline">
              international transfers overview
            </Link>{' '}
            for how these journeys work.
          </p>
          {HUB_GROUPS.map((group) => {
            const items = internationalRoutes.filter((r) => r.international?.hubGroup === group.key)
            if (items.length === 0) return null
            return (
              <div key={group.key} className="mb-12">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{group.label}</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/routes/${r.slug}`}
                      className="group p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:border-gold/40 transition-colors"
                    >
                      <h4 className="font-bold text-gray-900 mb-1 group-hover:text-gold transition-colors">
                        {r.from} &rarr; {r.to}
                      </h4>
                      <p className="text-xs text-gray-500 mb-3">{r.distanceApprox} &middot; {r.durationApprox}</p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold">
                        View route <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Don&rsquo;t See Your Route?</h2>
          <p className="text-gray-400 mb-8">
            These are our most-requested journeys. Get in touch with your pickup, destination and travel dates and we&rsquo;ll confirm whether it can be arranged.
          </p>
          <Link
            href="/#quote-form"
            className="btn-gold-shimmer inline-flex items-center gap-2 font-bold px-8 py-4 rounded-2xl text-sm"
          >
            Get a Fixed-Price Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
