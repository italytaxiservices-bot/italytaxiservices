import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.italytaxiservices.com'

function getRoutes(dir: string, base = ''): string[] {
  const routes: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (entry.name === 'api') continue

    const fullPath = path.join(dir, entry.name)
    const routePath = `${base}/${entry.name}`

    if (fs.existsSync(path.join(fullPath, 'page.tsx'))) {
      routes.push(routePath)
    }
    routes.push(...getRoutes(fullPath, routePath))
  }

  return routes
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), 'src/app')
  const routes = ['/', ...getRoutes(appDir)]

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' || route === '/it' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : route === '/it' ? 0.9 : route.split('/').length > 2 ? 0.6 : 0.7,
  }))
}
