import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { RichText } from '@/components/ui/RichText'

interface Breadcrumb {
  label: string
  href?: string
}

interface RelatedLink {
  label: string
  href: string
}

interface Stat {
  label: string
  value: string
}

interface ListSection {
  title: string
  items: string[]
}

interface FaqEntry {
  question: string
  answer: string
}

interface ContentPageTemplateProps {
  breadcrumbs: Breadcrumb[]
  badge: string
  title: string
  description: string
  stats?: Stat[]
  intro?: string[]
  sections?: ListSection[]
  sidebarTitle?: string
  sidebarLinks?: RelatedLink[]
  faqTitle?: string
  faqs?: FaqEntry[]
  relatedTitle?: string
  relatedLinks?: RelatedLink[]
  ctaTitle: string
  ctaDescription: string
}

const CheckIcon = () => (
  <svg className="w-2.5 h-2.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
)

export default function ContentPageTemplate({
  breadcrumbs,
  badge,
  title,
  description,
  stats,
  intro,
  sections,
  sidebarTitle,
  sidebarLinks,
  faqTitle,
  faqs,
  relatedTitle,
  relatedLinks,
  ctaTitle,
  ctaDescription,
}: ContentPageTemplateProps) {
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
          <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-8">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-gold transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-300">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <MapPin className="w-4 h-4" /> {badge}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">{title}</h1>
            <p className="text-gray-300 text-xl leading-relaxed">{description}</p>
            <div className="flex gap-4 mt-8">
              <Link
                href="/#quote-form"
                className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-6 py-3 rounded-xl hover:bg-gold-light transition-colors"
              >
                Get a Fixed-Price Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
                {stats.map((s) => (
                  <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                    <p className="text-white font-bold">{s.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Intro + sidebar */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-4">
              {intro?.map((para, i) => (
                <p key={i} className="text-gray-600 leading-relaxed">
                  <RichText text={para} />
                </p>
              ))}
            </div>
            {sidebarLinks && sidebarLinks.length > 0 && (
              <div>
                {sidebarTitle && <h2 className="text-lg font-bold text-gray-900 mb-5">{sidebarTitle}</h2>}
                <div className="space-y-3">
                  {sidebarLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center justify-between gap-2 p-4 bg-green-50 border border-green-100 rounded-xl text-sm font-semibold text-gray-900 hover:border-gold/40 transition-colors"
                    >
                      {link.label}
                      <ArrowRight className="w-3.5 h-3.5 text-gold shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* List sections (highlights / benefits / who it's for / included / amenities) */}
      {sections && sections.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className={`grid gap-12 ${sections.length > 1 ? 'md:grid-cols-2' : ''}`}>
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                  <div className="space-y-3">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-gold/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <CheckIcon />
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          <RichText text={item} />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related links */}
      {relatedLinks && relatedLinks.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{relatedTitle}</h2>
            <div className="flex flex-wrap gap-3">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-5 py-2.5 bg-gray-50 border border-gray-100 rounded-full text-sm font-medium text-gray-700 hover:border-gold/40 hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs && faqs.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">{faqTitle ?? 'Frequently Asked Questions'}</h2>
            <div className="space-y-5">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    <RichText text={faq.answer} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{ctaTitle}</h2>
          <p className="text-gray-400 mb-8">{ctaDescription}</p>
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
