import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'

const reviews = [
  { name: 'James H.',       country: 'United Kingdom', route: 'Malpensa → Lake Como',     text: 'Driver was waiting when we landed, name board ready, helped with all luggage. Price was exactly as quoted — no extras. Will absolutely use again.',  stars: 5 },
  { name: 'Sophie M.',      country: 'United States',  route: 'Fiumicino → Rome',          text: 'After a long flight the last thing you want is hunting for a taxi. Driver was there, friendly, perfect English. Car spotless. Worth every euro.',        stars: 5 },
  { name: 'Claire D.',      country: 'France',         route: 'Rome → Florence',           text: 'Used for a business trip. Professional driver, punctual. Arrived 10 minutes early. Invoice issued immediately. Exactly what corporate travel should be.', stars: 5 },
  { name: 'David & Anita',  country: 'Australia',      route: 'Venice Port → Marco Polo',  text: 'Booked two days before via WhatsApp — replied in minutes. Driver at the port exactly on time. Took all 6 bags. Saved us enormous stress.',             stars: 5 },
]

export default function Reviews() {
  return (
    <section style={{ background: '#FAF7F2', borderTop: '1px solid #E8E2D9', padding: '96px 0' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-medium mb-4" style={{ color: '#C9A84C' }}>
              Client Reviews
            </p>
            <h2
              className="font-black leading-[1.05]"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: '#1a1410' }}
            >
              What Our Passengers Say
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="#C9A84C"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            ))}
            <span className="font-black text-xl ml-1" style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#1a1410' }}>4.9</span>
            <span className="text-sm ml-1" style={{ color: '#9a8f83' }}>/ 847+ reviews</span>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-6 flex flex-col" style={{ border: '1px solid #E8E2D9', borderRadius: '4px' }}>
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(r.stars)].map((_, s) => (
                  <svg key={s} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#C9A84C"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>

              {/* Route */}
              <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: '#8B7340' }}>{r.route}</p>

              {/* Quote */}
              <p className="text-sm leading-relaxed flex-1 mb-5 italic" style={{ color: '#5a5248' }}>
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-2.5 pt-4" style={{ borderTop: '1px solid #F0EBE1' }}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0"
                  style={{ background: '#EDE8E0', color: '#8B7340' }}
                >
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-xs" style={{ color: '#1a1410' }}>{r.name}</p>
                  <p className="text-xs" style={{ color: '#9a8f83' }}>{r.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={siteConfig.trustpilotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ border: '1px solid #E8E2D9', color: '#1a1410', borderRadius: '4px', background: '#fff' }}
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#C9A84C"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            Read all reviews on Trustpilot
            <ExternalLink className="w-3.5 h-3.5" style={{ color: '#9a8f83' }} />
          </Link>
        </div>
      </div>
    </section>
  )
}
