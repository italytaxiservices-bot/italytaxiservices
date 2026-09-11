import Link from 'next/link'
import QuoteForm from './QuoteForm'
import { buildWhatsAppUrl } from '@/lib/utils'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+390000000000'

const stats = [
  { value: '10,000+', label: 'Transfers' },
  { value: '4.9 / 5', label: 'Rating' },
  { value: '30+', label: 'Airports' },
  { value: '24 / 7', label: 'Support' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden grain" style={{ background: '#080808' }}>

      {/* Background image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        />
        {/* Layered dark overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(8,8,8,0.82) 0%, rgba(8,8,8,0.60) 50%, rgba(8,8,8,0.35) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.75) 0%, transparent 55%)' }} />
      </div>

      {/* Top gold accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 5%, #C9A84C 40%, #E0C070 60%, #C9A84C 80%, transparent 95%)' }} />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-8">
        <div className="w-full grid lg:grid-cols-[1fr_420px] gap-16 items-center">

          {/* LEFT — Cinematic copy */}
          <div>

            {/* Section label */}
            <div className="flex items-center gap-4 mb-10">
              <div className="gold-line" />
              <span className="section-label">Est. Italy &middot; Licensed NCC Operators</span>
            </div>

            {/* Display heading */}
            <h1 className="mb-8 leading-[0.95] tracking-tight">
              <span
                className="block text-white font-black"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
              >
                The Finest
              </span>
              <span
                className="block italic font-bold text-gold-gradient"
                style={{
                  fontSize: 'clamp(2.2rem, 5.5vw, 5rem)',
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  lineHeight: 1.05,
                }}
              >
                Italian
              </span>
              <span
                className="block font-black text-white"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
              >
                Chauffeur Service
              </span>
            </h1>

            {/* Divider */}
            <div className="flex items-center gap-6 mb-8">
              <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, #C9A84C, transparent)' }} />
              <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-serif), Georgia, serif', fontStyle: 'italic' }}>
                Fixed prices. Licensed drivers. Meet &amp; greet at every arrival.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-14">
              <Link href="/#quote-form" className="btn-primary">
                Reserve Your Transfer
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <a
                href={buildWhatsAppUrl(WHATSAPP, 'Hello, I would like to book a private transfer in Italy.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm font-semibold px-7 py-4 rounded-sm transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.05em' }}
              >
                <svg className="w-4 h-4" fill="#25D366" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {['NCC Licensed', 'Fixed Prices', 'Flight Tracking', 'Meet & Greet'].map((t) => (
                <div key={t} className="flex items-center gap-2.5">
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Quote form */}
          <div className="w-full">
            <QuoteForm />
          </div>
        </div>
      </div>

      {/* Bottom stats strip */}
      <div className="relative z-10 glass-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
            {stats.map(({ value, label }) => (
              <div key={label} className="py-5 px-6 text-center" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
                <p
                  className="font-black text-xl mb-0.5"
                  style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#C9A84C' }}
                >
                  {value}
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
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
