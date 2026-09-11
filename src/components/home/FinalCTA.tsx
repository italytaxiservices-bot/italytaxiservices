import Link from 'next/link'
import { buildWhatsAppUrl } from '@/lib/utils'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+390000000000'

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
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-serif), Georgia, serif' }}
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

            <a
              href={buildWhatsAppUrl(WHATSAPP, 'Hello, I would like to book a private chauffeur transfer in Italy.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 font-semibold py-5 rounded-sm text-sm transition-all"
              style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)', color: '#4ade80', letterSpacing: '0.05em' }}
            >
              <svg className="w-5 h-5" fill="#25D366" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us Now
            </a>

            <div className="grid grid-cols-3 gap-3 pt-2">
              {['No booking fee', 'Instant reply', 'Free cancel'].map((t) => (
                <div key={t} className="text-center py-3 rounded-sm" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
