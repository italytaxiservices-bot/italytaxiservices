import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock } from 'lucide-react'


export const metadata: Metadata = {
  title: 'Vatican Museums Transfer | Private Chauffeur to Vatican Rome | Italy Taxi Services',
  description: 'Private NCC transfer to the Vatican Museums, Sistine Chapel & St Peter\'s Basilica in Rome. From Fiumicino, hotels, cruise ships. Fixed prices. Book today.',
  alternates: { canonical: '/attraction-transfer/vatican-museums' },
}

export default function VaticanTransferPage() {
  return (
    <div className="pt-20">
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link><span>/</span>
            <Link href="/rome-chauffeur-service" className="hover:text-gold transition-colors">Rome</Link><span>/</span>
            <span className="text-gray-300">Vatican Transfer</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6"><MapPin className="w-4 h-4" /> Vatican City / Rome</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Vatican Museums Private Transfer</h1>
            <p className="text-gray-300 text-xl leading-relaxed">Private NCC transfer to the Vatican Museums, Sistine Chapel, and St Peter's Basilica. Drop-off at the Vatican Museums entrance on Viale Vaticano.</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Vatican Transfer Guide</h2>
              <p className="text-gray-600 leading-relaxed mb-4">The Vatican Museums and Sistine Chapel are among the world's most visited attractions. The complex is located just across the Tiber from central Rome, in Vatican City. Our driver drops you directly at the Museums entrance on Viale Vaticano — a 2-minute walk from the ticket gates.</p>
              <p className="text-gray-600 leading-relaxed mb-4">For cruise passengers visiting the Vatican as a day excursion from Civitavecchia, we offer a complete Vatican day trip — transfer from port, Vatican visit (3–4 hours), and return to port. Total approximately 6–7 hours.</p>
              <p className="text-gray-600 leading-relaxed">We also offer Vatican + Colosseum combined day trips for travellers who want to see Rome's two headline sights in one day.</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Transfer Options to the Vatican</h2>
              {[
                { from: 'Fiumicino Airport (FCO)', time: '40–55 min', price: '€70' },
                { from: 'Ciampino Airport (CIA)', time: '45–60 min', price: '€65' },
                { from: 'Rome city hotel (central)', time: '15–25 min', price: '€45+' },
                { from: 'Civitavecchia Port (day trip)', time: '75 min', price: '€140' },
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
          <h2 className="text-2xl font-bold text-white mb-4">Book Your Vatican Transfer</h2>
          <Link href="/#quote-form" className="btn-gold-shimmer inline-flex items-center gap-2 font-bold px-8 py-4 rounded-2xl text-sm">Get a Fixed-Price Quote <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
    </div>
  )
}
