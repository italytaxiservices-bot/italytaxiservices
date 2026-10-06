import Link from 'next/link'


export default function FinalCTA() {

  return (
    <section style={{ background: '#0f0d0a', padding: '80px 0' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-center">

          {/* Copy */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-medium mb-5" style={{ color: '#C9A84C' }}>
              Book Now
            </p>
            <h2
              className="font-black leading-[1.0] mb-6"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#FAF7F2' }}
            >
              Ready to book<br />
              <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>your transfer?</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: 'rgba(250,247,242,0.55)' }}>
              Fixed price. Licensed NCC. Meet & greet at every airport and port across Italy. Ready when you are.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#quote-form"
                className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-sm transition-all hover:-translate-y-0.5"
                style={{ background: '#C9A84C', color: '#0f0d0a', letterSpacing: '0.05em' }}
              >
                Request a Transfer
              </Link>
            </div>
          </div>

          {/* TODO: image */}
          <div style={{ background: '#1e1c18', borderRadius: '4px', height: '300px', border: '1px solid rgba(201,168,76,0.1)' }} />
        </div>
      </div>
    </section>
  )
}
