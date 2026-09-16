import { routes, internationalRoutes } from '@/lib/data/routes'
import { EXISTING_FLAT_ROUTE_SLUGS } from '@/lib/linkResolve'

/**
 * `routes` (domestic) mixes some slugs that already have a live flat page
 * (e.g. rome-to-florence) with genuinely new city pairs (e.g. florence-to-rome,
 * milan-to-lake-como). Only the new ones — plus every international route —
 * get a page under /routes/[slug], so we never publish duplicate content
 * against an existing flat page.
 */
export const newDomesticRoutes = routes.filter((r) => !EXISTING_FLAT_ROUTE_SLUGS.has(r.slug))

export const newRoutes = [...newDomesticRoutes, ...internationalRoutes]

export const newRouteSlugs: ReadonlySet<string> = new Set(newRoutes.map((r) => r.slug))

export function getNewRouteBySlug(slug: string) {
  return newRoutes.find((r) => r.slug === slug)
}
