import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { borderRoutes, getBorderRouteBySlug } from '@/data/borders'
import { getBorderContent } from '@/lib/data/borderContent'
import BorderPageTemplate from '@/components/templates/BorderPageTemplate'
import { JsonLd, breadcrumbSchema, serviceSchema, faqSchema } from '@/components/seo/JsonLd'
import { siteConfig } from '@/lib/siteConfig'

export function generateStaticParams() {
  return borderRoutes.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const route = getBorderRouteBySlug(slug)
  if (!route) return {}
  const title = `${route.fromName} to ${route.toName} Private Transfer | Italy–${route.toCountry}`
  const description = `Private cross-border transfer from ${route.fromName} to ${route.toName} (${route.toCountry}). From €${route.priceFrom}. Border crossing, tolls & meet-and-greet included. Fixed price, licensed NCC.`
  const url = `/border-crossings/${route.slug}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: 'website', siteName: 'Italy Taxi Services', url, title, description, images: ['/logo.webp'] },
    twitter: { card: 'summary_large_image', title, description, images: ['/logo.webp'] },
  }
}

export default async function BorderCrossingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const route = getBorderRouteBySlug(slug)
  if (!route) notFound()

  const { about, tips, faqs } = getBorderContent(route)
  const url = `${siteConfig.domain}/border-crossings/${route.slug}`

  // Related: other crossings into the same country, then any others.
  const related = [
    ...borderRoutes.filter((r) => r.slug !== route.slug && r.toCountryCode === route.toCountryCode),
    ...borderRoutes.filter((r) => r.slug !== route.slug && r.toCountryCode !== route.toCountryCode),
  ]
    .slice(0, 5)
    .map((r) => ({ name: `${r.fromName} → ${r.toName}`, href: `/border-crossings/${r.slug}` }))

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: siteConfig.domain },
        { name: 'Border Crossings', url: `${siteConfig.domain}/border-crossings` },
        { name: `${route.fromName} to ${route.toName}`, url },
      ])} />
      <JsonLd data={serviceSchema({
        name: `${route.fromName} to ${route.toName} Private Cross-Border Transfer`,
        description: route.description,
        areaServed: route.toCountry,
      })} />
      <JsonLd data={faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <BorderPageTemplate route={route} about={about} tips={tips} faqs={faqs} relatedRoutes={related} />
    </>
  )
}
