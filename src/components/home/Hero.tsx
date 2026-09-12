import Link from 'next/link'
import QuoteForm from './QuoteForm'

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
