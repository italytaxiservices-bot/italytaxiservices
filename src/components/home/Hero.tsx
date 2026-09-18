import Link from 'next/link'
import QuoteForm from './QuoteForm'
import { airports } from '@/data/airports'
import { destinations } from '@/lib/data/destinations'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '393148932631'

const stats = [
  { value: '4.9★',               label: 'Avg. Rating' },
  { value: `${destinations.length}+`, label: 'Destinations' },
  { value: `${airports.length}+`,     label: 'Airports Covered' },
  { value: '24 / 7',             label: 'Always Available' },
]

export default function Hero() {
  const waUrl = `https://wa.me/${WHATSAPP}?text=Hello%2C%20I%20would%20like%20to%20book%20a%20private%20transfer%20in%20Italy.%20Can%20you%20send%20me%20a%20quote%3F`

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden grain"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 75% 20%, rgba(201,168,76,0.10), transparent), linear-gradient(160deg, #0d0d0d 0%, #080808 55%, #050505 100%)' }}
    >
      {/* Car background image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        />
        {/* Dark overlay — heavy on left for text, lighter on right to show car */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.88) 35%, rgba(5,5,5,0.65) 60%, rgba(5,5,5,0.4) 100%)' }} />
        {/* Top & bottom vignette */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.5) 0%, transparent 30%, transparent 65%, rgba(5,5,5,0.7) 100%)' }} />
        {/* Subtle gold tint on right */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(201,168,76,0.07), transparent)' }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 5%, #C9A84C 40%, #E0C070 60%, #C9A84C 80%, transparent 95%)' }} />

      <div className="relative z-10 flex-1 flex items-center w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-8">
        <div className="w-full grid lg:grid-cols-[1fr_440px] gap-14 items-center">

          {/* LEFT */}
          <div>

            {/* Trust badge */}
            <div className="inline-flex items-center gap-3 mb-10 px-4 py-2.5 rounded-sm" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.22)' }}>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3" viewBox="0 0 24 24" fill="#C9A84C"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <span className="section-label" style={{ fontSize: '0.6rem' }}>4.9 Rating · 847+ Passengers · Licensed NCC</span>
            </div>

            {/* H1 */}
            <h1 className="mb-6 leading-[0.95] tracking-tight">
              <span className="block text-white font-black" style={{ fontSize: 'clamp(1.9rem, 4.2vw, 3.8rem)' }}>
                Italy&apos;s Premier
              </span>
              <span
                className="block italic font-bold text-gold-gradient"
                style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', fontFamily: 'var(--font-serif), Georgia, serif', lineHeight: 1.0 }}
              >
                Private Transfer
              </span>
              <span className="block font-black text-white" style={{ fontSize: 'clamp(1.9rem, 4.2vw, 3.8rem)' }}>
                Service
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base leading-relaxed mb-10 max-w-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Licensed NCC chauffeurs across all of Italy. Airport pickups, city-to-city, Amalfi Coast, Lake Como and beyond —
              fixed price confirmed before you travel, door-to-door with no hidden fees.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/#quote-form" className="btn-primary">
                Get a Free Quote
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 font-semibold text-sm px-6 py-4 rounded-sm transition-all hover:-translate-y-0.5"
                style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)', color: '#4ade80' }}
              >
                <svg className="w-4 h-4" fill="#25D366" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Quote
              </a>
            </div>

            {/* Trust items */}
            <div className="flex flex-wrap gap-x-7 gap-y-3">
              {[
                'No booking fee',
                'Fixed price guaranteed',
                'Flight delay monitoring',
                'Meet & greet included',
                'Free cancellation',
              ].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '0.03em' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="w-full">
            <QuoteForm />
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative z-10" style={{ background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(201,168,76,0.12)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {stats.map(({ value, label }, i) => (
              <div
                key={label}
                className="py-5 px-6 text-center"
                style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(201,168,76,0.1)' : 'none' }}
              >
                <p className="font-black text-xl mb-0.5" style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#C9A84C' }}>
                  {value}
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
