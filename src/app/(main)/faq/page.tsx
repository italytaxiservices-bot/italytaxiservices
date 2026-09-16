import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, HelpCircle } from 'lucide-react'
import { faqCategories } from '@/lib/data/faqs'
import { RichText } from '@/components/ui/RichText'
import { JsonLd, breadcrumbSchema, faqSchema } from '@/components/seo/JsonLd'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions about booking a private chauffeur in Italy — pricing, airport pickups, luggage, vehicles, cross-border travel and more.',
  alternates: { canonical: '/faq' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/faq',
    title: 'Frequently Asked Questions | Italy Taxi Services',
    description: 'Answers to common questions about booking a private chauffeur in Italy — pricing, airport pickups, luggage, vehicles, cross-border travel and more.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions | Italy Taxi Services',
    description: 'Answers to common questions about booking a private chauffeur in Italy — pricing, airport pickups, luggage, vehicles, cross-border travel and more.',
    images: ['/logo.webp'],
  },
}

export default function FaqPage() {
  const allFaqs = faqCategories.flatMap((c) => c.items)

  return (
    <div className="pt-20">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: siteConfig.domain },
          { name: 'FAQ', url: `${siteConfig.domain}/faq` },
        ])}
      />
      <JsonLd data={faqSchema(allFaqs)} />

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
            <span className="text-gray-300">FAQ</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h1>
            <p className="text-gray-300 text-xl leading-relaxed">
              Everything you need to know about booking a private chauffeur in Italy. Can&rsquo;t find your answer? Get in touch directly.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">
          {faqCategories.map((category) => (
            <div key={category.title}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h2>
              <div className="space-y-5">
                {category.items.map((faq, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      <RichText text={faq.answer} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-gray-400 mb-8">Get in touch and we&rsquo;ll answer directly, or request a fixed-price quote for your route.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-bold px-8 py-4 rounded-2xl text-sm hover:border-gold/40 transition-colors"
            >
              Contact Us
            </Link>
            <Link href="/#quote-form" className="btn-gold-shimmer inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-2xl text-sm">
              Get a Fixed-Price Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
