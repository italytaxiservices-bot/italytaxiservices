import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const steps = [
  { num: '01', title: 'Request a Booking', body: 'Fill in your route, date, and vehicle via the form or WhatsApp. Takes under 2 minutes.' },
  { num: '02', title: 'Get Fixed Quote',   body: 'We confirm your exact fare before any payment. Price locked — no meter, no surprises.' },
  { num: '03', title: 'Meet Your Chauffeur', body: 'Name board at arrivals. We track your flight live — delays handled automatically.' },
]

export default function HowItWorks() {
  return (
    <section style={{ background: '#ffffff', borderTop: '1px solid #E8E2D9', padding: '96px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid lg:grid-cols-[1fr_1fr] gap-20 items-center">

          {/* LEFT — steps */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-medium mb-5" style={{ color: '#C9A84C' }}>
              Simple Process
            </p>
            <h2
              className="font-black leading-[1.05] mb-12"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: '#1a1410' }}
            >
              How to Book Your<br />
              <span style={{ fontStyle: 'italic', color: '#6b5c3e' }}>Private Transfer</span>
            </h2>

            <div className="space-y-0">
              {steps.map(({ num, title, body }, i) => (
                <div
                  key={num}
                  className="flex gap-6 py-7"
                  style={i < steps.length - 1 ? { borderBottom: '1px solid #E8E2D9' } : {}}
                >
                  <span
                    className="font-black text-3xl leading-none shrink-0 mt-0.5"
                    style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#E0D8CC' }}
                  >
                    {num}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm mb-2" style={{ color: '#1a1410', fontFamily: 'var(--font-serif), Georgia, serif' }}>
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#7a7268' }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/#quote-form"
                className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-sm transition-all hover:-translate-y-0.5"
                style={{ background: '#1a1410', color: '#FAF7F2', letterSpacing: '0.04em' }}
              >
                Request a Transfer <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* RIGHT — blank phone/app mockup placeholder */}
          <div className="flex justify-center">
            <div
              style={{
                background: '#EDE8E0',
                borderRadius: '24px',
                width: '280px',
                height: '500px',
                border: '8px solid #D8D0C4',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Screen placeholder */}
              <div style={{ background: '#F5F0E8', margin: '16px', borderRadius: '16px', height: 'calc(100% - 32px)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
