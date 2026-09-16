import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { destinations, getDestinationBySlug } from '@/lib/data/destinations'
import { getAirportBySlug } from '@/lib/data/airports'
import { resolveAirportSlugHref, resolveRouteSlugHref } from '@/lib/linkResolve'
import { newRouteSlugs } from '@/lib/data/routesIndex'
import ContentPageTemplate from '@/components/templates/ContentPageTemplate'
import { JsonLd, breadcrumbSchema, serviceSchema } from '@/components/seo/JsonLd'
import { siteConfig } from '@/lib/siteConfig'

interface LinkItem {
  label: string
  href: string
}

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const destination = getDestinationBySlug(slug)
  if (!destination) return {}
  return {
    title: destination.metaTitle,
    description: destination.metaDescription,
    alternates: { canonical: `/destinations/${destination.slug}` },
  }
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const destination = getDestinationBySlug(slug)
  if (!destination) notFound()

  const airportLinks: LinkItem[] = destination.nearestAirports
    .map((airportSlug) => {
      const href = resolveAirportSlugHref(airportSlug)
      const airport = getAirportBySlug(airportSlug)
      return href && airport ? { label: `${airport.name} Transfer`, href } : null
    })
    .filter((l): l is LinkItem => l !== null)

  const routeLinks: LinkItem[] = destination.relatedRoutes
    .map((routeSlug) => {
      const href = resolveRouteSlugHref(routeSlug, newRouteSlugs)
      if (!href) return null
      const label = routeSlug
        .split('-to-')
        .map((s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()))
        .join(' → ')
      return { label, href }
    })
    .filter((l): l is LinkItem => l !== null)

  const relatedDestinationLinks: LinkItem[] = destination.relatedDestinations
    .map((destSlug) => {
      const rel = getDestinationBySlug(destSlug)
      return rel ? { label: rel.name, href: `/destinations/${rel.slug}` } : null
    })
    .filter((l): l is LinkItem => l !== null)

  const intro = destination.internationalNote ? [...destination.intro, destination.internationalNote] : destination.intro

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Destinations', href: '/destinations' },
    { label: destination.name },
  ]

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: siteConfig.domain },
          { name: 'Destinations', url: `${siteConfig.domain}/destinations` },
          { name: destination.name, url: `${siteConfig.domain}/destinations/${destination.slug}` },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: destination.heading,
          description: destination.metaDescription,
          areaServed: destination.region,
        })}
      />
      <ContentPageTemplate
        breadcrumbs={breadcrumbs}
        badge={destination.region}
        title={destination.heading}
        description={destination.summary}
        intro={intro}
        sections={[
          { title: 'Highlights', items: destination.highlights },
          ...(destination.popularPickups.length ? [{ title: 'Popular Pickup Points', items: destination.popularPickups }] : []),
        ]}
        sidebarTitle={[...airportLinks, ...routeLinks].length ? 'Direct Transfers' : undefined}
        sidebarLinks={[...airportLinks, ...routeLinks]}
        relatedTitle="Nearby Destinations"
        relatedLinks={relatedDestinationLinks}
        ctaTitle={`Book Your ${destination.name} Transfer`}
        ctaDescription={`Private chauffeur service to ${destination.name}. Fixed prices, professional drivers, door-to-door.`}
      />
    </>
  )
}
