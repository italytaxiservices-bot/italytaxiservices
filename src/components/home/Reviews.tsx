import Link from 'next/link'
import { ExternalLink, Star } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'

const reviews = [
  {
    name: 'James H.',
    country: '🇬🇧 United Kingdom',
    route: 'Malpensa → Lake Como',
    text: 'Driver was waiting when we landed, name board, helped with all luggage. Price was exactly as quoted — no extras. Comfortable Mercedes, smooth ride. Will use again for our next Italy trip.',
    stars: 5,
  },
  {
    name: 'Sophie M.',
    country: '🇺🇸 United States',
    route: 'Fiumicino → Rome Hotel',
    text: 'After a long transatlantic flight the last thing you want is hunting for a taxi. Driver was there, friendly, spoke perfect English. Car was spotless. Absolutely worth every euro.',
    stars: 5,
  },
  {
    name: 'Marco B.',
    country: '🇩🇪 Germany',
    route: 'Naples → Amalfi Coast',
    text: 'The coastal road is not for the faint-hearted but our driver handled it perfectly. Knew every bend, pointed out sights, got us to Positano safely. Excellent service.',
    stars: 5,
  },
  {
    name: 'Claire D.',
    country: '🇫🇷 France',
    route: 'Rome → Florence',
    text: 'Used for a business trip. Professional driver, suited up, quiet and punctual. Arrived 10 minutes early. Invoice issued for expenses. Exactly what corporate travel should be.',
    stars: 5,
  },
  {
    name: 'David & Anita K.',
    country: '🇦🇺 Australia',
    route: 'Venice Cruise Port → Marco Polo',
    text: 'Booked two days before departure via WhatsApp — replied in minutes. Driver at the port exactly on time. Took all 6 bags without any issue. Saved us enormous stress.',
    stars: 5,
  },
  {
    name: 'Lena V.',
    country: '🇨🇭 Switzerland',
    route: 'Milan → Lugano',
    text: 'Cross-border transfer booked for my parents. They don\'t speak Italian or English well — but the driver was patient and kind, handled the border with no fuss. Truly professional.',
    stars: 5,
  },
]

export default function Reviews() {
  return (
    <section className="py-28 overflow-hidden" style={{ background: '#F5F0E8' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-line" />
              <span className="section-label">Client Reviews</span>
            </div>
            <h2 className="font-black leading-[0.95]" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#080808' }}>
              What Passengers
              <br />
              <span className="italic font-bold text-gold-gradient" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
                Say About Us
              </span>
            </h2>
          </div>
          <div className="lg:text-right">
            <div className="flex items-center gap-2 lg:justify-end mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="#C9A84C"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
              <span className="font-black text-2xl ml-1" style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#080808' }}>4.9</span>
            </div>
            <p className="text-sm text-gray-500">Based on 847+ verified reviews</p>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-sm p-7 flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ border: '1px solid rgba(201,168,76,0.12)' }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[...Array(r.stars)].map((_, s) => (
                  <svg key={s} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#C9A84C"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>

              {/* Route badge */}
              <span
                className="self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm mb-4"
                style={{ background: 'rgba(201,168,76,0.08)', color: '#9A7A30', border: '1px solid rgba(201,168,76,0.15)' }}
              >
                {r.route}
              </span>

              {/* Quote */}
              <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-5" style={{ fontStyle: 'italic' }}>
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
                <div
                  className="w-9 h-9 rounded-sm flex items-center justify-center font-black text-sm shrink-0"
                  style={{ background: '#080808', color: '#C9A84C', fontFamily: 'var(--font-serif), Georgia, serif' }}
                >
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trustpilot CTA */}
        <div className="text-center">
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
            <span className="font-bold text-sm text-white">Read All Reviews on Trustpilot</span>
            <ExternalLink className="w-4 h-4 transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }} />
          </Link>
        </div>
      </div>
    </section>
  )
}
