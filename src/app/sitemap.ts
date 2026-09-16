import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { destinations } from '@/lib/data/destinations'
import { fleet } from '@/lib/data/fleet'
import { newRoutes } from '@/lib/data/routesIndex'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.italytaxiservices.com'

function getRoutes(dir: string, base = ''): string[] {
  const routes: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    // Never expose the private CRM to the public sitemap.
    if (entry.name === 'api' || entry.name === 'admin') continue
    // Dynamic segments ([id], [[...slug]]) have no fixed URL to list.
    if (entry.name.startsWith('[')) continue

    const fullPath = path.join(dir, entry.name)
    // Route groups "(name)" are a Next.js organizational device and add no
    // path segment to the actual URL — recurse without extending `base`.
    const isRouteGroup = entry.name.startsWith('(') && entry.name.endsWith(')')
    const routePath = isRouteGroup ? base : `${base}/${entry.name}`

    if (!isRouteGroup && fs.existsSync(path.join(fullPath, 'page.tsx'))) {
      routes.push(routePath)
    }
    routes.push(...getRoutes(fullPath, routePath))
  }

  return routes
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), 'src/app')
  const staticRoutes = ['/', ...getRoutes(appDir)]

  // generateStaticParams-driven routes ([slug] segments) aren't picked up by
  // the directory walk above, so their real slugs are listed explicitly.
  const dynamicRoutes = [
    ...destinations.map((d) => `/destinations/${d.slug}`),
    ...fleet.map((f) => `/fleet/${f.slug}`),
    ...newRoutes.map((r) => `/routes/${r.slug}`),
  ]

  const routes = [...staticRoutes, ...dynamicRoutes]

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' || route === '/it' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : route === '/it' ? 0.9 : route.split('/').length > 2 ? 0.6 : 0.7,
  }))
}
