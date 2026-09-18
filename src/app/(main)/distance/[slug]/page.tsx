import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Clock, MapPin, Car, Train, CreditCard, ChevronDown } from 'lucide-react'
import { distanceRoutes, getDistanceRouteBySlug } from '@/lib/data/distances'
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd'
import { siteConfig } from '@/lib/siteConfig'

export function generateStaticParams() {
  return distanceRoutes.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const route = getDistanceRouteBySlug(slug)
  if (!route) return {}
  const title = `${route.from} to ${route.to} Distance — ${route.distanceKm} km | How Far?`
  const description = `${route.from} to ${route.to} is ${route.distanceKm} km by road. Drive takes ${route.driveTime}. Private transfer from €${route.priceFrom} — door-to-door, fixed price.`
  return {
    title,
    description,
    alternates: { canonical: `/distance/${route.slug}` },
    openGraph: { type: 'website', siteName: 'Italy Taxi Services', url: `/distance/${route.slug}`, title, description, images: ['/logo.webp'] },
    twitter: { card: 'summary_large_image', title, description, images: ['/logo.webp'] },
  }
}

export default async function DistancePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const route = getDistanceRouteBySlug(slug)
  if (!route) notFound()

  const related = distanceRoutes.filter((r) => route.relatedSlugs.includes(r.slug))
  const transferHref = route.transferSlug ? `/${route.transferSlug}` : '/#quote-form'

  return (
    <div className="pt-16">
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: siteConfig.domain },
        { name: 'Distance Guides', url: `${siteConfig.domain}/distance` },
        { name: `${route.from} to ${route.to}`, url: `${siteConfig.domain}/distance/${route.slug}` },
      ])} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden grain" style={{ background: '#080808' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 60%)' }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 5%, #C9A84C 40%, #E0C070 60%, #C9A84C 80%, transparent 95%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <nav className="flex items-center gap-2 text-xs mb-10" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/distance" className="hover:text-amber-400 transition-colors">Distance Guides</Link>
            <span>/</span>
            <span style={{ color: '#C9A84C' }}>{route.from} → {route.to}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_360px] gap-16 items-start">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="gold-line" />
                <span className="section-label">Distance Guide · Italy</span>
              </div>

              <h1 className="font-black text-white leading-[1.0] mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}>
                {route.from} to{' '}
                <span className="text-gold-gradient italic font-bold" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
                  {route.to}
                </span>
                <br />
                <span className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.55)' }}>Distance &amp; Transfer Guide</span>
              </h1>

              {/* Key stats */}
              <div className="flex flex-wrap gap-4 mb-10">
                {[
                  { icon: MapPin,    label: 'Distance',      value: `${route.distanceKm} km`,  gold: false },
                  { icon: Car,       label: 'Drive Time',    value: route.driveTime,            gold: false },
                  { icon: Train,     label: 'By Train',      value: route.trainTime,            gold: false },
                  { icon: CreditCard,label: 'Transfer From', value: `€${route.priceFrom}`,     gold: true  },
                ].map(({ icon: Icon, label, value, gold }) => (
                  <div key={label} className="flex items-center gap-3 px-5 py-3 rounded-sm" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Icon className="w-4 h-4 shrink-0" style={{ color: '#C9A84C' }} />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
                      <p className="font-bold text-sm" style={{ color: gold ? '#C9A84C' : 'white' }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href={transferHref} className="btn-primary">
                  Book Private Transfer
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/#quote-form" className="btn-ghost-dark">
                  Get a Quote
                </Link>
              </div>
            </div>

            {/* Route card */}
            <div className="rounded-sm overflow-hidden" style={{ background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(201,168,76,0.05)' }}>
                <p className="text-white font-bold text-sm">Route Summary</p>
              </div>
              <div className="p-6 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#C9A84C' }} />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>From</p>
                    <p className="text-white text-sm font-semibold">{route.from}</p>
                  </div>
                </div>
                <div className="ml-1 w-px h-5" style={{ background: 'rgba(201,168,76,0.2)' }} />
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#E0C070' }} />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>To</p>
                    <p className="text-white text-sm font-semibold">{route.to}</p>
                  </div>
                </div>

                <div className="pt-4 space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  {[
                    { label: 'Road distance', value: `${route.distanceKm} km` },
                    { label: 'Drive time',    value: route.driveTime },
                    { label: 'By train',      value: route.trainTime },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center text-xs">
                      <span style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</span>
                      <span className="font-semibold text-white">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Private transfer from</span>
                    <span className="font-black text-xl" style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#C9A84C' }}>€{route.priceFrom}</span>
                  </div>
                  <Link href={transferHref} className="btn-primary w-full justify-center rounded-sm py-3.5 text-xs">
                    Book This Transfer
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="py-24" style={{ background: '#F5F0E8' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="gold-line" />
                <span className="section-label">About This Route</span>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-5 leading-tight" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
                {route.from} to {route.to} —<br />
                <span className="italic text-gold-gradient">Distance &amp; Travel Options</span>
              </h2>
              <div className="space-y-4">
                {route.about.split('. ').reduce((acc: string[], sentence, i, arr) => {
                  if (i % 3 === 0) acc.push(arr.slice(i, i + 3).join('. ') + '.')
                  return acc
                }, []).map((para, i) => (
                  <p key={i} className="text-sm text-gray-600 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="gold-line" />
                <span className="section-label">Why Private Transfer?</span>
              </div>
              <div className="space-y-3">
                {route.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-4 p-4 rounded-sm bg-white" style={{ border: '1px solid rgba(201,168,76,0.12)' }}>
                    <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <p className="text-sm text-gray-700">{h}</p>
                  </div>
                ))}
              </div>

              {/* Train note */}
              <div className="mt-6 p-4 rounded-sm" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Train className="w-4 h-4" style={{ color: '#C9A84C' }} />
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#C9A84C' }}>Train Note</p>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{route.trainNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="py-20 grain" style={{ background: '#080808' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="gold-line" />
            <span className="section-label">Transport Comparison</span>
          </div>
          <div className="rounded-sm overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="grid grid-cols-4 text-[10px] font-bold uppercase tracking-widest px-6 py-4" style={{ background: 'rgba(201,168,76,0.08)', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}>
              <span>Option</span><span>Time</span><span>Price</span><span>Convenience</span>
            </div>
            {[
              { option: 'Private Transfer', time: route.driveTime, price: `From €${route.priceFrom}`, conv: 'Door-to-door ✓', highlight: true },
              { option: 'Train',            time: route.trainTime, price: '€15–80',                  conv: 'Station to station', highlight: false },
              { option: 'Public Bus',       time: 'Varies',        price: '€5–20',                  conv: 'Slow, crowded', highlight: false },
              { option: 'Rental Car',       time: route.driveTime, price: '€80–150/day + fuel',     conv: 'Parking stress', highlight: false },
            ].map(({ option, time, price, conv, highlight }, i) => (
              <div
                key={option}
                className="grid grid-cols-4 px-6 py-4 text-xs"
                style={{
                  background: highlight ? 'rgba(201,168,76,0.06)' : 'transparent',
                  borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}
              >
                <span className="font-semibold" style={{ color: highlight ? '#C9A84C' : 'rgba(255,255,255,0.7)' }}>{option}</span>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>{time}</span>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>{price}</span>
                <span style={{ color: highlight ? '#C9A84C' : 'rgba(255,255,255,0.45)' }}>{conv}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      {route.faqs.length > 0 && (
        <section className="py-24" style={{ background: '#F5F0E8' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-4 mb-10">
              <div className="gold-line" />
              <span className="section-label">Frequently Asked Questions</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-8" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
              {route.from} to {route.to} — FAQs
            </h2>
            <div className="space-y-px">
              {route.faqs.map((faq, i) => (
                <div key={i} className="py-5" style={i < route.faqs.length - 1 ? { borderBottom: '1px solid rgba(201,168,76,0.15)' } : {}}>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">{faq.q}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="py-16 grain" style={{ background: '#080808' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <p className="section-label mb-6">Related Distance Guides</p>
            <div className="flex flex-wrap gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/distance/${r.slug}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm font-medium transition-all"
                  style={{ border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C' }}
                >
                  {r.from} → {r.to} ({r.distanceKm} km) <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
              <Link href="/distance" className="flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm font-medium transition-all" style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
                All Distance Guides <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: '#F5F0E8' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="gold-line" /><span className="section-label">Book Your Transfer</span><div className="gold-line" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
            {route.from} to {route.to} — From €{route.priceFrom}
          </h2>
          <p className="text-gray-500 text-sm mb-8">Fixed price · Door-to-door · Licensed NCC · Instant quote</p>
          <Link href={transferHref} className="btn-primary">
            Book Private Transfer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
