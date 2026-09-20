'use client'

import Link from 'next/link'
import Image from 'next/image'
import QuoteForm from './QuoteForm'
import { airports } from '@/data/airports'
import { destinations } from '@/lib/data/destinations'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '393148932631'

export default function Hero() {
  const waUrl = `https://wa.me/${WHATSAPP}?text=Hello%2C%20I%20would%20like%20to%20book%20a%20private%20transfer%20in%20Italy.`

  return (
    <section className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1920&q=80"
          alt="Italy private transfer"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Layered overlays */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,8,5,0.88) 0%, rgba(10,8,5,0.72) 50%, rgba(10,8,5,0.45) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,8,5,0.6) 0%, transparent 60%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full px-6 lg:px-12 pt-28 pb-10">
        <div className="w-full grid lg:grid-cols-[1fr_420px] gap-12 items-start">

          {/* LEFT — copy */}
          <div className="pt-4">
            <p className="text-xs uppercase tracking-[0.3em] mb-5 font-semibold" style={{ color: '#C9A84C' }}>
              Private Transfer Service
            </p>

            <h1
              className="font-black leading-[1.0] mb-6"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', color: '#FAF7F2' }}
            >
              Private Transfers<br />
              <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>Across Italy.</span><br />
              <span style={{ fontSize: '55%', fontStyle: 'italic', color: 'rgba(250,247,242,0.6)', fontWeight: 400 }}>
                Across the border, too.
              </span>
            </h1>

            <p className="text-base leading-relaxed mb-3 max-w-md" style={{ color: 'rgba(250,247,242,0.65)' }}>
              Private chauffeur transfers from every Italian airport, city, and cruise port.
              Licensed NCC drivers. Door-to-door. Fixed prices, 24/7.
            </p>

            <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: 'rgba(250,247,242,0.45)' }}>
              Rome · Milan · Venice · Florence · Naples · Amalfi Coast · Lake Como · Switzerland · France
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/#quote-form"
                className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 transition-all hover:-translate-y-0.5"
                style={{ background: '#C9A84C', color: '#0f0d0a', letterSpacing: '0.05em', borderRadius: '3px' }}
              >
                Reserve Your Transfer
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-sm px-6 py-3.5 transition-all"
                style={{ border: '1px solid rgba(250,247,242,0.25)', color: 'rgba(250,247,242,0.75)', borderRadius: '3px' }}
              >
                <svg className="w-3.5 h-3.5" fill="#25D366" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {['Licensed NCC Operators', 'Fixed Price Guaranteed', 'Meet & Greet Included', 'Free Cancellation'].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(250,247,242,0.4)' }}>
                  <span style={{ color: '#C9A84C' }}>✓</span> {t}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — form card */}
          <div>
            <QuoteForm />
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative z-10" style={{ background: 'rgba(10,8,5,0.85)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { v: '4.9★',               l: 'Avg. Rating' },
              { v: `${destinations.length}+`, l: 'Destinations' },
              { v: `${airports.length}+`,     l: 'Airports Covered' },
              { v: '24 / 7',             l: 'Always Available' },
            ].map(({ v, l }, i) => (
              <div key={l} className="py-5 px-4 text-center" style={{ borderRight: i < 3 ? '1px solid rgba(201,168,76,0.1)' : 'none' }}>
                <p className="font-black text-lg mb-0.5" style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#C9A84C' }}>{v}</p>
                <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'rgba(250,247,242,0.4)' }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
