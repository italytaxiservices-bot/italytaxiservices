import Link from 'next/link'
import Image from 'next/image'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '393148932631'

export default function FinalCTA() {
  const waUrl = `https://wa.me/${WHATSAPP}?text=Hello%2C%20I%20would%20like%20to%20book%20a%20private%20transfer%20in%20Italy.`

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
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-sm px-6 py-3.5 rounded-sm"
                style={{ border: '1px solid rgba(250,247,242,0.15)', color: 'rgba(250,247,242,0.65)' }}
              >
                <svg className="w-4 h-4" fill="#25D366" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative overflow-hidden" style={{ borderRadius: '4px', height: '300px', border: '1px solid rgba(201,168,76,0.15)' }}>
            <Image
              src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=900&q=80"
              alt="Italy at night"
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
