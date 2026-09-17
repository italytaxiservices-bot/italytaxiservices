import Link from 'next/link'
import { ExternalLink, Star } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'

export default function Reviews() {
  return (
    <section className="py-28 overflow-hidden" style={{ background: '#F5F0E8' }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="gold-line" />
          <span className="section-label">Client Reviews</span>
          <div className="gold-line" />
        </div>

        <h2 className="font-black leading-[0.95] mb-6" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#080808' }}>
          What Passengers
          <br />
          <span className="italic font-bold text-gold-gradient" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
            Say About Us
          </span>
        </h2>

        <p className="max-w-xl mx-auto text-sm leading-relaxed mb-12" style={{ color: 'rgba(0,0,0,0.55)' }}>
          Every client is invited to leave a review after their trip. Read genuine, verified feedback directly on
          Trustpilot &mdash; nothing curated or filtered on our end.
        </p>

        <Link
          href={siteConfig.trustpilotUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-4 rounded-sm px-8 py-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background: '#080808', border: '1px solid rgba(201,168,76,0.2)' }}
        >
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4" fill="#C9A84C" stroke="none" />
            ))}
          </div>
          <span className="font-bold text-sm text-white">Read Our Reviews on Trustpilot</span>
          <ExternalLink className="w-4 h-4 transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }} />
        </Link>
      </div>
    </section>
  )
}
