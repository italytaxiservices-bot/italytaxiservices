import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock, Shield } from 'lucide-react'


export const metadata: Metadata = {
  title: 'Pompeii Transfer | Private Chauffeur to Pompeii',
  description: 'Private NCC transfer to Pompeii. From Rome, Naples airport, Naples city, Sorrento. Day trips with driver waiting. Fixed prices. Book today.',
  alternates: { canonical: '/attraction-transfer/pompeii' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/attraction-transfer/pompeii',
    title: 'Pompeii Transfer | Private Chauffeur to Pompeii | Italy Taxi Services',
    description: 'Private NCC transfer to Pompeii. From Rome, Naples airport, Naples city, Sorrento. Day trips with driver waiting. Fixed prices. Book today.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pompeii Transfer | Private Chauffeur to Pompeii | Italy Taxi Services',
    description: 'Private NCC transfer to Pompeii. From Rome, Naples airport, Naples city, Sorrento. Day trips with driver waiting. Fixed prices. Book today.',
    images: ['/logo.webp'],
  },
}

export default function PompeiiTransferPage() {
  return (
    <div className="pt-20">
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link><span>/</span>
            <Link href="/naples-chauffeur-service" className="hover:text-gold transition-colors">Naples</Link><span>/</span>
            <span className="text-gray-300">Pompeii Transfer</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6"><MapPin className="w-4 h-4" /> Campania, Italy</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Pompeii Private Transfer</h1>
            <p className="text-gray-300 text-xl leading-relaxed">Private NCC chauffeur transfer to Pompeii archaeological site. Day trips from Rome, Naples, Sorrento, and the Amalfi Coast — with driver waiting.</p>
            <div className="flex gap-4 mt-8">
              <Link href="/#quote-form" className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-6 py-3 rounded-xl">Book Transfer <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Pompeii Transfer</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Pompeii is one of the world's great archaeological sites — the Roman city buried by the eruption of Vesuvius in 79 AD and rediscovered in extraordinary preservation. A UNESCO World Heritage Site, Pompeii attracts 3–4 million visitors a year.</p>
              <p className="text-gray-600 leading-relaxed mb-4">Our NCC driver drops you at the Pompeii Scavi entrance and can wait while you explore (typically 2–4 hours). From Rome, the journey is approximately 2.5 hours; from Naples city, 40 minutes; from Sorrento, 30 minutes.</p>
              <p className="text-gray-600 leading-relaxed">We also offer combined Pompeii + Herculaneum tours, and Pompeii + Vesuvius (for the crater hike). Please mention at booking.</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Transfer Options to Pompeii</h2>
              {[
                { from: 'Naples Airport (NAP)', time: '40 min', price: '€55' },
                { from: 'Naples City', time: '40 min', price: '€55' },
                { from: 'Sorrento', time: '30 min', price: '€50' },
                { from: 'Rome (day trip)', time: '2.5 hrs', price: '€320' },
                { from: 'Amalfi / Positano', time: '60–80 min', price: '€90' },
                { from: 'Fiumicino Airport', time: '2.5 hrs', price: '€330' },
              ].map(r => (
                <div key={r.from} className="flex items-center justify-between p-4 bg-green-50 border border-green-100 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{r.from}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" />{r.time}</p>
                  </div>
                  <span className="text-green-600 font-black">from {r.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Book Your Pompeii Transfer</h2>
          <Link href="/#quote-form" className="btn-gold-shimmer inline-flex items-center gap-2 font-bold px-8 py-4 rounded-2xl text-sm">Get a Fixed-Price Quote <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
    </div>
  )
}
