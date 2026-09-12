import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/utils'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+390000000000'

export const metadata: Metadata = {
  title: 'Lake Como Transfer | Private Chauffeur Como, Bellagio, Varenna | Italy Taxi Services',
  description: 'Private NCC transfer to Lake Como. Como, Bellagio, Varenna, Menaggio, Cernobbio from Malpensa, Linate, Milan. Fixed prices. Book today.',
}

export default function LacomoTransferPage() {
  return (
    <div className="pt-20">
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link><span>/</span>
            <Link href="/milan-chauffeur-service" className="hover:text-gold transition-colors">Milan</Link><span>/</span>
            <span className="text-gray-300">Lake Como Transfer</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6"><MapPin className="w-4 h-4" /> Lombardy, Italy</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Lake Como Private Transfer</h1>
            <p className="text-gray-300 text-xl leading-relaxed">Private NCC transfer to all Lake Como destinations — Como, Bellagio, Varenna, Menaggio, Cernobbio. From Malpensa, Linate, Milan, and Lugano.</p>
            <div className="flex gap-4 mt-8">
              <Link href="/malpensa-to-lake-como" className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-6 py-3 rounded-xl">See Malpensa → Como Route <ArrowRight className="w-4 h-4" /></Link>
              <a href={buildWhatsAppUrl(WHATSAPP, 'Hello, I need a transfer to Lake Como.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Lake Como — Transfer Guide</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Lake Como (Lago di Como) is one of Italy's most beautiful and exclusive destinations — home to celebrity villas, luxury hotels, charming lakeside villages, and breathtaking mountain scenery. Bellagio, Varenna, Menaggio, and Cernobbio are among the most popular towns.</p>
              <p className="text-gray-600 leading-relaxed mb-4">The lake has no direct train connection from Malpensa Airport, making private NCC transfer the most practical option for most visitors. We serve all Como lake towns — specify your destination when booking.</p>
              <p className="text-gray-600 leading-relaxed">Popular day trip: Milan → Bellagio (ferry at Como) → back to Milan. We can arrange flexible day-trip itineraries.</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Transfer Prices to Lake Como</h2>
              {[
                { from: 'Malpensa Airport (MXP)', to: 'Como / Cernobbio', time: '60–75 min', price: '€130' },
                { from: 'Malpensa Airport (MXP)', to: 'Bellagio', time: '75–90 min', price: '€155' },
                { from: 'Malpensa Airport (MXP)', to: 'Varenna', time: '90 min', price: '€165' },
                { from: 'Milan City', to: 'Como', time: '45 min', price: '€90' },
                { from: 'Milan City', to: 'Bellagio', time: '75 min', price: '€130' },
                { from: 'Lugano (CH)', to: 'Bellagio / Varenna', time: '50 min', price: '€110' },
              ].map(r => (
                <div key={r.from + r.to} className="flex items-center justify-between p-4 bg-green-50 border border-green-100 rounded-xl text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">{r.from} → {r.to}</p>
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
          <h2 className="text-2xl font-bold text-white mb-4">Book Your Lake Como Transfer</h2>
          <Link href="/#quote-form" className="btn-gold-shimmer inline-flex items-center gap-2 font-bold px-8 py-4 rounded-2xl text-sm">Get a Fixed-Price Quote <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
    </div>
  )
}
