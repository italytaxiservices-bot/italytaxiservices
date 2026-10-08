'use client'

import Link from 'next/link'
import Image from 'next/image'
import QuoteForm from './QuoteForm'
import { airports } from '@/data/airports'
import { destinations } from '@/lib/data/destinations'


const INK  = '#1a1410'
const GOLD = '#8B7340'

export default function Hero() {

  return (
    <section className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FAF7F2' }}>

      {/* Background photo — car sits on the right, sunset sky on the left under the copy */}
      <Image
        src="/images/home/amalfi-coast-sunset-drive.webp"
        alt="Black Mercedes chauffeur car on the Amalfi Coast road at sunset"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: '70% center' }}
      />
      {/* Cream wash: solid enough behind the copy to read, clear on the right so the car shows */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{ background: 'linear-gradient(180deg, rgba(250,247,242,0.94) 0%, rgba(250,247,242,0.86) 55%, rgba(250,247,242,0.7) 100%)' }}
      />
      <div
        className="absolute inset-0 hidden lg:block"
        style={{ background: 'linear-gradient(90deg, rgba(250,247,242,0.97) 0%, rgba(250,247,242,0.9) 38%, rgba(250,247,242,0.35) 62%, rgba(250,247,242,0) 80%)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center max-w-6xl mx-auto w-full px-6 lg:px-10 pt-40 pb-14">
        <div className="w-full grid lg:grid-cols-[1fr_420px] gap-12 items-start">

          {/* LEFT — copy */}
          <div className="pt-4">
            <p className="text-xs uppercase tracking-[0.3em] mb-5 font-semibold" style={{ color: GOLD }}>
              Licensed NCC Private Transfers
            </p>

            <h1
              className="font-black leading-[1.05] mb-6"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(1.9rem, 3.6vw, 3.2rem)', color: INK }}
            >
              Private Chauffeur{' '}
              <span style={{ color: GOLD, fontStyle: 'italic' }}>Service Across Italy</span>
            </h1>

            <p className="text-base leading-relaxed mb-5 max-w-md" style={{ color: '#5a5248' }}>
              Door-to-door transfers from every Italian airport, city, and cruise port —
              and across the border. Licensed drivers, fixed prices, available 24/7.
            </p>

            <p className="text-xs leading-relaxed mb-8 max-w-sm uppercase tracking-wider" style={{ color: '#9a8f83' }}>
              Rome · Milan · Venice · Florence · Naples · Amalfi Coast · Lake Como
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/#quote-form"
                className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 transition-all hover:-translate-y-0.5"
                style={{ background: INK, color: '#FAF7F2', letterSpacing: '0.05em', borderRadius: '3px' }}
              >
                Reserve Your Transfer
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {['Licensed NCC Operators', 'Fixed Price Guaranteed', 'Meet & Greet Included', 'Free Cancellation'].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs" style={{ color: '#9a8f83' }}>
                  <span style={{ color: GOLD }}>✓</span> {t}
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
      <div className="relative z-10" style={{ background: '#fff', borderTop: '1px solid #E8E2D9' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { v: '4.9★',               l: 'Avg. Rating' },
              { v: `${destinations.length}+`, l: 'Destinations' },
              { v: `${airports.length}+`,     l: 'Airports Covered' },
              { v: '24 / 7',             l: 'Always Available' },
            ].map(({ v, l }, i) => (
              <div key={l} className="py-5 px-4 text-center" style={{ borderRight: i < 3 ? '1px solid #E8E2D9' : 'none' }}>
                <p className="font-black text-lg mb-0.5" style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: GOLD }}>{v}</p>
                <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: '#9a8f83' }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
