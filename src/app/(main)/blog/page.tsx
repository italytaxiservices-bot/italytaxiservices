import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, BookOpen } from 'lucide-react'
import { blogPosts, blogCategories } from '@/lib/data/blog'

export const metadata: Metadata = {
  title: 'Blog | Italy Travel Guides, Airport Tips & Transfer Advice',
  description: 'Italy travel guides, airport arrival tips, city itineraries, transport advice, and local secrets from the Italy Taxi Services team.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/blog',
    title: 'Blog | Italy Travel Guides, Airport Tips & Transfer Advice | Italy Taxi Services',
    description: 'Italy travel guides, airport arrival tips, city itineraries, transport advice, and local secrets.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Italy Travel Guides, Airport Tips & Transfer Advice | Italy Taxi Services',
    description: 'Italy travel guides, airport arrival tips, city itineraries, transport advice, and local secrets.',
    images: ['/logo.webp'],
  },
}

const featured = blogPosts.filter((p) => p.featured)
const rest = blogPosts.filter((p) => !p.featured)

export default function BlogPage() {
  return (
    <div className="pt-16">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden grain" style={{ background: '#080808' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 60%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 5%, #C9A84C 40%, #E0C070 60%, #C9A84C 80%, transparent 95%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-28">
          <div className="flex items-center gap-4 mb-6">
            <div className="gold-line" />
            <span className="section-label">Travel Blog · Italy</span>
          </div>
          <h1 className="font-black text-white leading-[1.05] mb-6" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)' }}>
            Italy Travel Guides{' '}
            <span className="text-gold-gradient italic" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
              &amp; Tips
            </span>
          </h1>
          <p className="text-base leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Airport arrival guides, city itineraries, transport advice, and local tips from drivers who know Italy inside out.
          </p>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────── */}
      <section className="py-5 border-b" style={{ background: '#F5F0E8', borderColor: 'rgba(201,168,76,0.15)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-2">
            {blogCategories.map((cat) => (
              <span
                key={cat}
                className="text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-sm cursor-default"
                style={{ border: '1px solid rgba(201,168,76,0.2)', color: '#9A7A30', background: 'white' }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ─────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="py-20" style={{ background: '#F5F0E8' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-4 mb-10">
              <div className="gold-line" />
              <span className="section-label">Featured Articles</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-white rounded-sm p-7 transition-all hover:-translate-y-1 hover:shadow-2xl"
                  style={{ border: '1px solid rgba(201,168,76,0.15)' }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm"
                      style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.2)' }}
                    >
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(0,0,0,0.35)' }}>
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </div>
                  </div>
                  <h3
                    className="font-black text-gray-900 text-lg leading-snug mb-3 flex-1 group-hover:text-gold-dark transition-colors"
                    style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all" style={{ color: '#C9A84C' }}>
                    Read article <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ALL POSTS ────────────────────────────────────── */}
      <section className="py-20 grain" style={{ background: '#080808' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="gold-line" />
            <span className="section-label">All Articles</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col p-6 rounded-sm transition-all"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm" style={{ background: 'rgba(201,168,76,0.1)', color: '#C9A84C' }}>
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </div>
                </div>
                <h3 className="font-black text-white text-base leading-snug mb-3 flex-1 group-hover:text-amber-300 transition-colors" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
                  {post.title}
                </h3>
                <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: 'rgba(255,255,255,0.45)' }}>{post.excerpt}</p>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all" style={{ color: '#C9A84C' }}>
                  Read <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24" style={{ background: '#F5F0E8' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="gold-line" />
            <span className="section-label">Ready to Travel?</span>
            <div className="gold-line" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
            Book Your Private Transfer — Italy
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Fixed prices, professional drivers, door-to-door service. Get a confirmed quote in under 2 minutes.
          </p>
          <Link href="/#quote-form" className="btn-primary">
            Get a Free Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
