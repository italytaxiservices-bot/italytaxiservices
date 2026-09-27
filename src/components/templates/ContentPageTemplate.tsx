import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { RichText } from '@/components/ui/RichText'

interface Breadcrumb { label: string; href?: string }
interface RelatedLink { label: string; href: string }
interface Stat { label: string; value: string }
interface ListSection { title: string; items: string[] }
interface FaqEntry { question: string; answer: string }

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

const INK = '#1a1410'
const GOLD = '#8B7340'
const CREAM = '#FAF7F2'
const LINE = '#E8E2D9'
const MUTED = '#7a7268'
const serifHeading = { fontFamily: 'var(--font-serif), Georgia, serif' }

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
)

export default function ContentPageTemplate({
  breadcrumbs, badge, title, description, stats, intro, sections,
  sidebarTitle, sidebarLinks, faqTitle, faqs, relatedTitle, relatedLinks,
  ctaTitle, ctaDescription,
}: ContentPageTemplateProps) {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="pt-32 pb-20" style={{ background: '#0f0d0a' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <nav className="flex flex-wrap items-center gap-2 text-xs mb-8" style={{ color: 'rgba(250,247,242,0.4)' }}>
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-amber-400 transition-colors">{crumb.label}</Link>
                ) : (
                  <span style={{ color: GOLD }}>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-sm" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: GOLD }} />
              <span className="text-xs font-semibold tracking-wide" style={{ color: '#C9A84C' }}>{badge}</span>
            </div>
            <h1 className="font-black leading-[1.05] mb-5" style={{ ...serifHeading, fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: CREAM }}>{title}</h1>
            <p className="text-base leading-relaxed max-w-xl" style={{ color: 'rgba(250,247,242,0.65)' }}>{description}</p>
            <div className="mt-8">
              <Link href="/#quote-form" className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-sm transition-all hover:-translate-y-0.5" style={{ background: '#C9A84C', color: '#0f0d0a', letterSpacing: '0.04em' }}>
                Get a Fixed-Price Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-10 max-w-lg">
                {stats.map((s) => (
                  <div key={s.label} className="text-center py-3 px-2 rounded-sm" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)' }}>
                    <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'rgba(250,247,242,0.4)' }}>{s.label}</p>
                    <p className="font-bold text-sm" style={{ color: CREAM }}>{s.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── INTRO + SIDEBAR ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-4">
              {intro?.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed" style={{ color: MUTED }}><RichText text={para} /></p>
              ))}
            </div>
            {sidebarLinks && sidebarLinks.length > 0 && (
              <div>
                {sidebarTitle && <h2 className="text-lg font-black mb-5" style={{ ...serifHeading, color: INK }}>{sidebarTitle}</h2>}
                <div className="space-y-3">
                  {sidebarLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="flex items-center justify-between gap-2 p-4 rounded-sm text-sm font-semibold transition-all hover:shadow-md" style={{ background: CREAM, border: `1px solid ${LINE}`, color: INK }}>
                      {link.label}
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" style={{ color: GOLD }} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── LIST SECTIONS ── */}
      {sections && sections.length > 0 && (
        <section className="py-20" style={{ background: CREAM }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className={`grid gap-12 ${sections.length > 1 ? 'md:grid-cols-2' : ''}`}>
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-black mb-6" style={{ ...serifHeading, color: INK }}>{section.title}</h2>
                  <div className="space-y-3">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckIcon />
                        <p className="text-sm leading-relaxed" style={{ color: '#5a5248' }}><RichText text={item} /></p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED LINKS ── */}
      {relatedLinks && relatedLinks.length > 0 && (
        <section className="py-14 bg-white" style={{ borderTop: `1px solid ${LINE}` }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <h2 className="text-lg font-black mb-6" style={{ ...serifHeading, color: INK }}>{relatedTitle}</h2>
            <div className="flex flex-wrap gap-3">
              {relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-sm text-sm font-medium transition-all hover:shadow-md" style={{ background: CREAM, border: `1px solid ${LINE}`, color: '#5a5248' }}>
                  {link.label}
                  <ArrowRight className="w-3.5 h-3.5" style={{ color: GOLD, opacity: 0.6 }} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQs ── */}
      {faqs && faqs.length > 0 && (
        <section className="py-20" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <h2 className="text-2xl font-black mb-8" style={{ ...serifHeading, color: INK }}>{faqTitle ?? 'Frequently Asked Questions'}</h2>
            <div className="space-y-px">
              {faqs.map((faq, i) => (
                <div key={i} className="py-5" style={i < faqs.length - 1 ? { borderBottom: `1px solid ${LINE}` } : {}}>
                  <h3 className="font-bold text-sm mb-2" style={{ color: INK }}>{faq.question}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}><RichText text={faq.answer} /></p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-16" style={{ background: '#0f0d0a' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-2xl font-black mb-4" style={{ ...serifHeading, color: CREAM }}>{ctaTitle}</h2>
          <p className="text-sm mb-8" style={{ color: 'rgba(250,247,242,0.55)' }}>{ctaDescription}</p>
          <Link href="/#quote-form" className="inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-sm transition-all hover:-translate-y-0.5" style={{ background: '#C9A84C', color: '#0f0d0a', letterSpacing: '0.04em' }}>
            Get a Fixed-Price Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
