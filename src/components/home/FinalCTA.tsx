import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden grain" style={{ background: '#050505' }}>

      {/* Background image — subtle */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.12,
          }}
        />
      </div>

      {/* Top gold line */}
      <div className="h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.4) 40%, rgba(224,192,112,0.6) 60%, rgba(201,168,76,0.4) 80%, transparent 95%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-36">
        <div className="grid lg:grid-cols-[1fr_320px] gap-20 items-center">

          {/* Copy */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="gold-line" />
              <span className="section-label">Book Today</span>
            </div>

            <h2 className="text-white font-black leading-[0.95] mb-8" style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)' }}>
              Your Private<br />
              <span
                className="text-gold-gradient italic font-bold"
                style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
              >
                Chauffeur
              </span>
              <br />
              Awaits.
            </h2>

            <p
              className="text-lg leading-relaxed mb-0 max-w-md italic"
              style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-serif), Georgia, serif' }}
            >
              Fixed prices. Licensed NCC. Meet &amp; greet at every airport and
              port across Italy. Ready when you are.
            </p>
          </div>

          {/* Action */}
          <div className="flex flex-col gap-4">
            <Link href="/#quote-form" className="btn-primary justify-center text-center rounded-sm py-5">
              Get a Free Quote
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>

            <div className="grid grid-cols-3 gap-3 pt-2">
              {['No booking fee', 'Fast reply', 'Free cancel'].map((t) => (
                <div key={t} className="text-center py-3 rounded-sm" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.15)' }}>
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.65)' }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
