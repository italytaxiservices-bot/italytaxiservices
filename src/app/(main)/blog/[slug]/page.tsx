import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowLeft, Clock, BookOpen } from 'lucide-react'
import { blogPosts, getBlogPostBySlug, blogContent } from '@/lib/data/blog'

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}
  const title = `${post.title} | Italy Taxi Services`
  const url = `/blog/${post.slug}`
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: { type: 'article', siteName: 'Italy Taxi Services', url, title, description: post.excerpt, images: ['/logo.webp'] },
    twitter: { card: 'summary_large_image', title, description: post.excerpt, images: ['/logo.webp'] },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  const content = blogContent[slug]
  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3)

  return (
    <div className="pt-16">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden grain" style={{ background: '#080808' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 60%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 5%, #C9A84C 40%, #E0C070 60%, #C9A84C 80%, transparent 95%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-amber-400 transition-colors">Blog</Link>
            <span>/</span>
            <span style={{ color: '#C9A84C' }}>{post.category}</span>
          </nav>

          <div className="flex items-center gap-4 mb-5">
            <div className="gold-line" />
            <span className="section-label">{post.category}</span>
          </div>

          <h1 className="font-black text-white leading-tight mb-6" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontFamily: 'var(--font-serif), Georgia, serif' }}>
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</div>
            <span>·</span>
            <span>{new Date(post.publishDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </section>

      {/* ── ARTICLE ──────────────────────────────────────── */}
      <section className="py-20" style={{ background: '#F5F0E8' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_260px] gap-12 items-start">

            {/* Main content */}
            <article>
              {content ? (
                <>
                  <p className="text-base text-gray-700 leading-relaxed mb-8 font-medium">{content.intro}</p>
                  {content.sections.map((section) => (
                    <div key={section.heading} className="mb-10">
                      <h2
                        className="text-xl font-black text-gray-900 mb-4 pb-3"
                        style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', fontFamily: 'var(--font-serif), Georgia, serif' }}
                      >
                        {section.heading}
                      </h2>
                      {section.body.split('\n\n').map((para, i) => (
                        <p key={i} className="text-sm text-gray-600 leading-relaxed mb-4">{para}</p>
                      ))}
                    </div>
                  ))}
                </>
              ) : (
                <div className="space-y-4">
                  <p className="text-base text-gray-700 leading-relaxed font-medium">{post.excerpt}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    This full article is coming soon. In the meantime, you can explore our other travel guides or contact us for personalised advice on travelling in Italy.
                  </p>
                </div>
              )}

              {/* Inline CTA */}
              <div
                className="mt-12 p-8 rounded-sm text-center grain"
                style={{ background: '#080808' }}
              >
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="gold-line" />
                  <span className="section-label">Planning a Trip to Italy?</span>
                  <div className="gold-line" />
                </div>
                <p className="text-white font-black text-lg mb-2" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
                  Book a Private Transfer
                </p>
                <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>Fixed prices · Professional drivers · Door to door</p>
                <Link href="/#quote-form" className="btn-primary">
                  Get a Free Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="sticky top-24 space-y-5">
              <div className="bg-white rounded-sm p-5" style={{ border: '1px solid rgba(201,168,76,0.15)' }}>
                <p className="section-label mb-4">Article Info</p>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpen className="w-3.5 h-3.5 shrink-0" style={{ color: '#C9A84C' }} />
                    <span>{post.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: '#C9A84C' }} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>

              {related.length > 0 && (
                <div className="bg-white rounded-sm p-5" style={{ border: '1px solid rgba(201,168,76,0.15)' }}>
                  <p className="section-label mb-4">Related Articles</p>
                  <div className="space-y-4">
                    {related.map((r) => (
                      <Link key={r.slug} href={`/blog/${r.slug}`} className="block group">
                        <p className="text-sm text-gray-800 font-semibold group-hover:text-gold-dark transition-colors leading-snug mb-0.5" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
                          {r.title}
                        </p>
                        <p className="text-xs text-gray-400">{r.readTime}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-sm p-5 text-center grain" style={{ background: '#080808' }}>
                <p className="font-bold text-white text-sm mb-1">Book a Transfer</p>
                <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>Fixed prices. Professional drivers.</p>
                <Link href="/#quote-form" className="btn-primary text-xs px-4 py-3 w-full justify-center">
                  Get Quote <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── BACK TO BLOG ─────────────────────────────────── */}
      <section className="py-8 border-t" style={{ background: '#F5F0E8', borderColor: 'rgba(201,168,76,0.15)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold transition-colors" style={{ color: '#9A7A30' }}>
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </section>
    </div>
  )
}
