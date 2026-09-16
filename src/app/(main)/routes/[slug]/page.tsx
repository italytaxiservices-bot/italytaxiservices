import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { newRoutes, getNewRouteBySlug } from '@/lib/data/routesIndex'
import { getDestinationBySlug } from '@/lib/data/destinations'
import ContentPageTemplate from '@/components/templates/ContentPageTemplate'
import { JsonLd, breadcrumbSchema, serviceSchema } from '@/components/seo/JsonLd'
import { siteConfig } from '@/lib/siteConfig'

export function generateStaticParams() {
  return newRoutes.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const route = getNewRouteBySlug(slug)
  if (!route) return {}
  const fullTitle = `${route.metaTitle} | Italy Taxi Services`
  const url = `/routes/${route.slug}`
  return {
    title: route.metaTitle,
    description: route.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: 'Italy Taxi Services',
      url,
      title: fullTitle,
      description: route.metaDescription,
      images: ['/logo.webp'],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: route.metaDescription,
      images: ['/logo.webp'],
    },
  }
}

export default async function RouteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const route = getNewRouteBySlug(slug)
  if (!route) notFound()

  const relatedLinks = route.relatedDestinations
    .map((destSlug) => {
      const rel = getDestinationBySlug(destSlug)
      return rel ? { label: rel.name, href: `/destinations/${rel.slug}` } : null
    })
    .filter((l): l is { label: string; href: string } => l !== null)

  const intro = route.international ? [...route.intro, route.international.borderNote] : route.intro

  const sections = [
    { title: 'Highlights', items: route.highlights },
    ...(route.international
      ? [
          { title: 'Pickup Points', items: route.international.pickupPoints },
          { title: 'Destination Points', items: route.international.destinationPoints },
        ]
      : []),
  ]

  const badge = route.international ? `Private Transfer to ${route.international.country}` : 'Private Transfer'

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Routes', href: '/routes' },
    { label: `${route.from} → ${route.to}` },
  ]

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: siteConfig.domain },
          { name: 'Routes', url: `${siteConfig.domain}/routes` },
          { name: `${route.from} to ${route.to}`, url: `${siteConfig.domain}/routes/${route.slug}` },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: `${route.from} to ${route.to} Private Transfer`,
          description: route.metaDescription,
        })}
      />
      <ContentPageTemplate
        breadcrumbs={breadcrumbs}
        badge={badge}
        title={`${route.from} to ${route.to} Private Transfer`}
        description={route.summary}
        stats={[
          { label: 'Distance', value: route.distanceApprox },
          { label: 'Duration', value: route.durationApprox },
        ]}
        intro={intro}
        sections={sections}
        relatedTitle="Related Destinations"
        relatedLinks={relatedLinks}
        ctaTitle={`Book: ${route.from} → ${route.to}`}
        ctaDescription="Fixed-price quote. Professional NCC chauffeur. Door to door."
      />
    </>
  )
}
