/**
 * Data-driven internal-linking resolver.
 *
 * Builds contextual "related links" for route, airport, and city pages from
 * the live data models. Every link it emits is validated against pages that
 * actually exist (airport data, the city-chauffeur allow-list, the destination
 * data, and the EXISTING_FLAT_ROUTE_SLUGS set) — it never invents URLs.
 *
 * Used by RoutePageTemplate, AirportPageTemplate and CityPageTemplate to give
 * commercial landing pages a hub → spoke → cross-link structure.
 */
import { airports, getAirportBySlug } from '@/data/airports'
import { routes } from '@/data/routes'
import { destinations } from '@/lib/data/destinations'
import { EXISTING_FLAT_ROUTE_SLUGS } from '@/lib/linkResolve'
import type { Route, Airport } from '@/types'

export interface RelatedLink {
  label: string
  href: string
}

/** Cities that have a live `/{slug}-chauffeur-service` page. */
const CITY_CHAUFFEUR = new Set(['rome', 'milan', 'venice', 'florence', 'naples', 'bologna'])

/** Destination slugs with a live `/destinations/{slug}` page. */
const DEST = new Set(destinations.map((d) => d.slug))

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/**
 * Resolve one route endpoint (fromSlug/toSlug) to a real page:
 *  - `<x>-airport`  → `/<x>-airport-transfer`   (validated against airport data)
 *  - a chauffeur city → `/<city>-chauffeur-service`
 *  - a destination    → `/destinations/<slug>`
 * Returns null when no genuine page exists for that endpoint.
 */
function endpointLink(slug: string, name: string): RelatedLink | null {
  if (slug.endsWith('-airport')) {
    const a = getAirportBySlug(slug.replace(/-airport$/, ''))
    return a ? { label: `${a.name} Transfer`, href: `/${a.slug}-airport-transfer` } : null
  }
  if (CITY_CHAUFFEUR.has(slug)) return { label: `${name} Chauffeur Service`, href: `/${slug}-chauffeur-service` }
  if (DEST.has(slug)) return { label: `${name} Private Transfers`, href: `/destinations/${slug}` }
  return null
}

function dedupe(links: (RelatedLink | null)[], excludeHref?: string): RelatedLink[] {
  const seen = new Set<string>()
  const out: RelatedLink[] = []
  for (const l of links) {
    if (!l || l.href === excludeHref || seen.has(l.href)) continue
    seen.add(l.href)
    out.push(l)
  }
  return out
}

const touchesAirport = (r: Route) => r.fromSlug.endsWith('-airport') || r.toSlug.endsWith('-airport')

/**
 * Contextual links for a flat route page (e.g. /rome-to-florence):
 * origin page, destination page, up to 3 sibling routes sharing an endpoint,
 * and the relevant national hub.
 */
export function getRouteRelatedLinks(route: Route): RelatedLink[] {
  const selfHref = `/${route.slug}`

  const siblings = routes
    .filter((r) => r.slug !== route.slug && EXISTING_FLAT_ROUTE_SLUGS.has(r.slug))
    .filter(
      (r) =>
        r.fromSlug === route.fromSlug ||
        r.toSlug === route.toSlug ||
        r.fromSlug === route.toSlug ||
        r.toSlug === route.fromSlug
    )
    .slice(0, 3)
    .map<RelatedLink>((r) => ({ label: `${r.fromName} → ${r.toName}`, href: `/${r.slug}` }))

  const hub: RelatedLink = touchesAirport(route)
    ? { label: 'Italy Airport Transfers', href: '/airport-transfers' }
    : { label: 'Italy Chauffeur Service', href: '/chauffeur-service-italy' }

  return dedupe(
    [
      endpointLink(route.fromSlug, route.fromName),
      endpointLink(route.toSlug, route.toName),
      ...siblings,
      hub,
    ],
    selfHref
  ).slice(0, 6)
}

/**
 * Contextual links for an airport page (e.g. /fiumicino-airport-transfer):
 * the city chauffeur page, sibling airports serving the same city, and hubs.
 */
export function getAirportRelatedLinks(airport: Airport): RelatedLink[] {
  const selfHref = `/${airport.slug}-airport-transfer`
  const cityName = airport.cityName.split(' / ')[0]

  const cityLink: RelatedLink | null = CITY_CHAUFFEUR.has(airport.citySlug)
    ? { label: `${cityName} Chauffeur Service`, href: `/${airport.citySlug}-chauffeur-service` }
    : null

  const siblingAirports = airports
    .filter((a) => a.citySlug === airport.citySlug && a.slug !== airport.slug)
    .map<RelatedLink>((a) => ({ label: `${a.name} Transfer`, href: `/${a.slug}-airport-transfer` }))

  return dedupe(
    [
      cityLink,
      ...siblingAirports,
      { label: 'All Italy Airport Transfers', href: '/airport-transfers' },
      { label: 'Italy Chauffeur Service', href: '/chauffeur-service-italy' },
    ],
    selfHref
  ).slice(0, 6)
}

/**
 * Cross-links for a city chauffeur page (e.g. /rome-chauffeur-service):
 * national hubs plus sibling city chauffeur pages.
 */
export function getCityRelatedLinks(citySlug: string): RelatedLink[] {
  const siblings = [...CITY_CHAUFFEUR]
    .filter((s) => s !== citySlug)
    .map<RelatedLink>((s) => ({ label: `${cap(s)} Chauffeur Service`, href: `/${s}-chauffeur-service` }))

  return dedupe(
    [
      { label: 'Italy Chauffeur Service', href: '/chauffeur-service-italy' },
      { label: 'Italy Airport Transfers', href: '/airport-transfers' },
      ...siblings,
    ],
    `/${citySlug}-chauffeur-service`
  ).slice(0, 7)
}
