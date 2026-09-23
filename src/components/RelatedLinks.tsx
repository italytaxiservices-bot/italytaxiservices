import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { RelatedLink } from '@/lib/internalLinks'

/**
 * Contextual internal-links strip rendered near the foot of commercial
 * landing pages (routes, airports, cities). Descriptive anchor text, no
 * generic "click here" — built for both crawlability and user navigation.
 */
export default function RelatedLinks({ title, links }: { title: string; links: RelatedLink[] }) {
  if (!links.length) return null

  return (
    <section className="py-14 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">{title}</h2>
        <nav className="flex flex-wrap gap-3" aria-label="Related pages">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:border-gold/40 hover:text-amber-800 hover:bg-gold/5 transition-all"
            >
              {l.label}
              <ArrowRight className="w-3.5 h-3.5 opacity-50" />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  )
}
