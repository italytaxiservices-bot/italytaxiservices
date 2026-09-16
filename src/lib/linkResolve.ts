/**
 * The reusable destinations/services/fleet/routes data (originally drafted
 * for a fully nested URL architecture) links internally using paths like
 * `/airport-transfers/milan-malpensa`. The live site keeps its existing
 * flat URLs (e.g. `/malpensa-airport-transfer`) to avoid disturbing indexed
 * pages, so this module maps the aspirational nested paths back to the real
 * live ones. Anything not listed here is assumed to resolve as written
 * (true for the new /destinations, /fleet/[slug] and /routes/[slug] pages).
 */

export const AIRPORT_URL_BY_SLUG: Record<string, string> = {
  'rome-fiumicino': '/fiumicino-airport-transfer',
  'rome-ciampino': '/ciampino-airport-transfer',
  'milan-malpensa': '/malpensa-airport-transfer',
  'milan-linate': '/linate-airport-transfer',
  'venice-marco-polo': '/marco-polo-airport-transfer',
  florence: '/florence-airport-transfer',
  bologna: '/bologna-airport-transfer',
  naples: '/naples-airport-transfer',
  pisa: '/pisa-airport-transfer',
  palermo: '/palermo-airport-transfer',
  catania: '/catania-airport-transfer',
  bergamo: '/bergamo-airport-transfer',
}

// Route slugs that already have a live flat page — new /routes/[slug] pages
// are only generated for slugs NOT in this set, to avoid duplicate content.
export const EXISTING_FLAT_ROUTE_SLUGS = new Set([
  'malpensa-to-milan',
  'malpensa-to-lake-como',
  'malpensa-to-bellagio',
  'malpensa-to-bergamo',
  'malpensa-to-lugano',
  'malpensa-to-turin',
  'fiumicino-to-rome',
  'fiumicino-to-civitavecchia',
  'fiumicino-to-tivoli',
  'rome-to-amalfi-coast',
  'rome-to-florence',
  'rome-to-naples',
  'florence-to-pisa',
  'florence-to-siena',
  'milan-to-venice',
  'marco-polo-to-padua',
  'marco-polo-to-treviso',
  'marco-polo-to-venice',
  'marco-polo-to-verona',
  'venice-to-bologna',
])

const STATIC_OVERRIDES: Record<string, string> = {
  ...Object.fromEntries(
    Object.entries(AIRPORT_URL_BY_SLUG).map(([slug, url]) => [`/airport-transfers/${slug}`, url])
  ),
  '/hourly-chauffeur': '/hourly-chauffeur-italy',
  '/corporate-chauffeur': '/corporate-chauffeur-italy',
  '/chauffeur-service': '/chauffeur-service-italy',
  '/cruise-port-transfers': '/cruise-transfers',
  // Referenced by the source content as dedicated instruction pages that
  // haven't been built yet — point to the FAQ page rather than 404.
  '/airport-meeting-instructions': '/faq',
  '/cruise-arrival-instructions': '/faq',
}

/** Resolves an internal link from the reusable content data to a real, live URL. */
export function resolveLink(href: string): string {
  if (!href.startsWith('/')) return href
  return STATIC_OVERRIDES[href] ?? href
}

/**
 * A plain destination-page `relatedRoutes`/route slug (no markdown, no
 * leading slash) resolves to either the existing flat route page or the new
 * /routes/[slug] page — or is dropped if neither exists.
 */
export function resolveRouteSlugHref(slug: string, newRouteSlugs: ReadonlySet<string>): string | null {
  if (EXISTING_FLAT_ROUTE_SLUGS.has(slug)) return `/${slug}`
  if (newRouteSlugs.has(slug)) return `/routes/${slug}`
  return null
}

/** A plain airport slug (from `nearestAirports`) resolves to its live airport page, or null. */
export function resolveAirportSlugHref(slug: string): string | null {
  return AIRPORT_URL_BY_SLUG[slug] ?? null
}
