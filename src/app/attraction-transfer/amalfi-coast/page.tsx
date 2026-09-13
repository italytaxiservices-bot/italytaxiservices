import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock } from 'lucide-react'


export const metadata: Metadata = {
  title: 'Amalfi Coast Transfer | Private Chauffeur Positano Ravello',
  description: 'Private NCC transfer to the Amalfi Coast. Positano, Amalfi, Ravello, Praiano. From Rome, Naples, Sorrento. Expert drivers on the SS163. Book today.',
  alternates: { canonical: '/attraction-transfer/amalfi-coast' },
}

export default function AmalfiCoastTransferPage() {
  return (
    <div className="pt-20">
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link><span>/</span>
            <Link href="/naples-chauffeur-service" className="hover:text-gold transition-colors">Naples</Link><span>/</span>
            <span className="text-gray-300">Amalfi Coast Transfer</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6"><MapPin className="w-4 h-4" /> Campania, Italy</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Amalfi Coast Private Transfer</h1>
            <p className="text-gray-300 text-xl leading-relaxed">Private NCC chauffeur transfer to all Amalfi Coast towns — Positano, Amalfi, Ravello, Praiano. Our drivers are experienced on the SS163 coastal road.</p>
            <div className="flex gap-4 mt-8">
              <Link href="/rome-to-amalfi-coast" className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-6 py-3 rounded-xl">Rome → Amalfi Route <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Amalfi Coast Transfer Guide</h2>
              <p className="text-gray-600 leading-relaxed mb-4">The Amalfi Coast (Costiera Amalfitana) is a UNESCO World Heritage Site — one of the world's most spectacular coastal drives, winding between dramatic cliffs, colourful villages, and the Tyrrhenian Sea. The SS163 coastal road requires skilled, experienced local drivers.</p>
              <p className="text-gray-600 leading-relaxed mb-4">We serve all Amalfi Coast towns: Positano, Amalfi, Ravello, Praiano, Furore, Conca dei Marini, Atrani, Cetara, and Vietri sul Mare. We also cover Sorrento and Pompeii.</p>
              <p className="text-gray-600 leading-relaxed">Summer traffic (July–August) can add 30–60 minutes to coastal journeys. We advise early morning arrivals when possible.</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Transfer Prices — Amalfi Coast</h2>
              {[
                { from: 'Rome', to: 'Positano', time: '3–3.5 hrs', price: '€390' },
                { from: 'Rome', to: 'Amalfi', time: '3.5 hrs', price: '€410' },
                { from: 'Naples Airport', to: 'Positano', time: '80 min', price: '€120' },
                { from: 'Naples Airport', to: 'Amalfi', time: '90 min', price: '€130' },
                { from: 'Naples Airport', to: 'Ravello', time: '100 min', price: '€145' },
                { from: 'Sorrento', to: 'Positano', time: '45 min', price: '€70' },
                { from: 'Fiumicino Airport', to: 'Positano', time: '3.5 hrs', price: '€400' },
              ].map(r => (
                <div key={r.from + r.to} className="flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-xl text-sm">
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
          <h2 className="text-2xl font-bold text-white mb-4">Book Your Amalfi Coast Transfer</h2>
          <Link href="/#quote-form" className="btn-gold-shimmer inline-flex items-center gap-2 font-bold px-8 py-4 rounded-2xl text-sm">Get a Fixed-Price Quote <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
    </div>
  )
}
