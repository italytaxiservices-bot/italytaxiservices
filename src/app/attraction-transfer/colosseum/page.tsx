import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock, Shield } from 'lucide-react'


export const metadata: Metadata = {
  title: 'Colosseum Transfer | Private Chauffeur to Colosseo Rome | Italy Taxi Services',
  description: 'Private NCC transfer to the Colosseum in Rome. From Fiumicino, Ciampino, hotels, and cruise ships. Fixed prices. Book today.',
  alternates: { canonical: '/attraction-transfer/colosseum' },
}

export default function ColosseumTransferPage() {
  return (
    <div className="pt-20">
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link><span>/</span>
            <Link href="/rome-chauffeur-service" className="hover:text-gold transition-colors">Rome</Link><span>/</span>
            <span className="text-gray-300">Colosseum Transfer</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6"><MapPin className="w-4 h-4" /> Rome, Italy</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Colosseum Private Transfer</h1>
            <p className="text-gray-300 text-xl leading-relaxed">Private NCC chauffeur transfer to the Colosseum (Colosseo) and the Roman Forum in Rome. Door-to-door from your hotel, airport, or cruise ship.</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Colosseum Transfer</h2>
              <p className="text-gray-600 leading-relaxed mb-4">The Colosseum (Colosseo) is Rome's most iconic landmark — a 2,000-year-old amphitheatre and one of the world's most visited monuments. Located in the heart of Rome, in the Celio neighbourhood, it is accessible by private transfer from any Rome hotel, airport, or cruise ship port.</p>
              <p className="text-gray-600 leading-relaxed mb-4">Our NCC driver drops you at the entrance area of the Colosseum on Via Sacra. The nearby Roman Forum and Palatine Hill are within walking distance. We can arrange a half-day tour with driver waiting, or a one-way drop-off.</p>
              <p className="text-gray-600 leading-relaxed">For cruise passengers at Civitavecchia, we offer a Colosseum day trip — transfer from the port, time at the Colosseum and Roman Forum, and return to port. Approximately 5–6 hours total.</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Transfer Options to the Colosseum</h2>
              {[
                { from: 'Fiumicino Airport (FCO)', time: '40–50 min', price: '€70' },
                { from: 'Ciampino Airport (CIA)', time: '30–40 min', price: '€60' },
                { from: 'Rome city hotel', time: '15–30 min', price: '€45+' },
                { from: 'Civitavecchia Cruise Port', time: '75 min', price: '€130' },
              ].map(r => (
                <div key={r.from} className="flex items-center justify-between p-4 bg-green-50 border border-green-100 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{r.from}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" />{r.time}</p>
                  </div>
                  <span className="text-green-600 font-black">from {r.price}</span>
                </div>
              ))}
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                <div className="flex items-center gap-2 mb-2"><Shield className="w-4 h-4 text-green-600" /><span className="font-semibold text-gray-900 text-sm">What&apos;s included</span></div>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Professional NCC licensed driver</li>
                  <li>• Drop-off near Colosseum entrance</li>
                  <li>• Fixed price — no meter</li>
                  <li>• Driver waiting option available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Book Your Colosseum Transfer</h2>
          <Link href="/#quote-form" className="btn-gold-shimmer inline-flex items-center gap-2 font-bold px-8 py-4 rounded-2xl text-sm">Get a Fixed-Price Quote <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
    </div>
  )
}
