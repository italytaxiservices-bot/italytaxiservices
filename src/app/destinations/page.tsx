import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { destinations } from '@/lib/data/destinations'
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Private Transfers to Italy’s Top Destinations | Italy Taxi Services',
  description:
    'Private chauffeur transfers and touring drivers to Italy’s most-requested destinations — Lake Como, Tuscany, the Amalfi Coast, Sicily and more. Fixed prices, English-speaking drivers.',
  alternates: { canonical: '/destinations' },
}

const REGION_ORDER = [
  'Lazio',
  'Lombardy',
  'Veneto',
  'Tuscany',
  'Campania',
  'Liguria',
  'Piedmont',
  'Emilia-Romagna',
  'Sicily',
  'Sardinia',
  'Puglia',
]

export default function DestinationsPage() {
  const grouped = REGION_ORDER.map((region) => ({
    region,
    items: destinations.filter((d) => d.region === region),
  })).filter((g) => g.items.length > 0)

  return (
    <div className="pt-20">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: siteConfig.domain },
          { name: 'Destinations', url: `${siteConfig.domain}/destinations` },
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
            <span className="text-gray-300">Destinations</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <MapPin className="w-4 h-4" /> Italy-Wide Coverage
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Private Transfers to Italy&rsquo;s Top Destinations</h1>
            <p className="text-gray-300 text-xl leading-relaxed">
              From lakeside villages to coastal towns and wine country, our chauffeurs handle the roads so you don&rsquo;t have to
              &mdash; direct from your airport, hotel, or the city you&rsquo;re already visiting.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
          {grouped.map((group) => (
            <div key={group.region}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{group.region}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.items.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/destinations/${d.slug}`}
                    className="group p-6 bg-gray-50 border border-gray-100 rounded-2xl hover:border-gold/40 transition-colors"
                  >
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-gold transition-colors">{d.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{d.summary}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold">
                      View transfers <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Don&rsquo;t See Your Destination?</h2>
          <p className="text-gray-400 mb-8">
            We arrange private transfers across Italy beyond this list &mdash; get in touch with your route and we&rsquo;ll confirm availability and pricing.
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
