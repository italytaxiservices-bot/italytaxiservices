import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock } from 'lucide-react'


export const metadata: Metadata = {
  title: 'Cinque Terre Transfer | Private Chauffeur to Cinque Terre | Italy Taxi Services',
  description: 'Private NCC transfer to Cinque Terre. La Spezia, Riomaggiore, Vernazza. From Genoa, Pisa airport, Florence. Fixed prices. Book today.',
}

export default function CinqueTerreTransferPage() {
  return (
    <div className="pt-20">
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link><span>/</span>
            <span className="text-gray-300">Cinque Terre Transfer</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6"><MapPin className="w-4 h-4" /> Liguria, Italy</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Cinque Terre Private Transfer</h1>
            <p className="text-gray-300 text-xl leading-relaxed">Private NCC transfer to Cinque Terre. We drop you at La Spezia or Monterosso — the main access points for the five villages. From Genoa, Pisa, and Florence.</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cinque Terre Transfer Guide</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Cinque Terre — the five colourful fishing villages of Riomaggiore, Manarola, Corniglia, Vernazza, and Monterosso — is one of Italy's most photographed destinations and a UNESCO World Heritage Site on the Ligurian coast.</p>
              <p className="text-gray-600 leading-relaxed mb-4">Private vehicles cannot enter the village centres. Our NCC driver drops you at La Spezia station (for the local train to all five villages) or at Monterosso al Mare (the most accessible village by road). From either point, the other villages are 5–20 minutes by train.</p>
              <p className="text-gray-600 leading-relaxed">The nearest airports are Genoa (GOA, 80 minutes) and Pisa (PSA, 90 minutes). Florence is approximately 2.5 hours via the A12 motorway.</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Transfer Prices to Cinque Terre</h2>
              {[
                { from: 'Genoa Airport (GOA)', time: '80 min', price: '€90' },
                { from: 'Pisa Airport (PSA)', time: '90 min', price: '€100' },
                { from: 'Florence', time: '2.5 hrs', price: '€150' },
                { from: 'Genoa city', time: '70 min', price: '€80' },
                { from: 'Livorno', time: '75 min', price: '€90' },
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
          <h2 className="text-2xl font-bold text-white mb-4">Book Your Cinque Terre Transfer</h2>
          <Link href="/#quote-form" className="btn-gold-shimmer inline-flex items-center gap-2 font-bold px-8 py-4 rounded-2xl text-sm">Get a Fixed-Price Quote <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
    </div>
  )
}
