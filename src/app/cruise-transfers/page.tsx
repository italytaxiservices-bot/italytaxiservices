import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Ship, Shield, Clock, MapPin } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/utils'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+390000000000'

export const metadata: Metadata = {
  title: 'Cruise Port Transfers Italy | NCC Civitavecchia, Naples, Venice | Italy Taxi Services',
  description: 'Private NCC transfers to and from Italian cruise ports. Civitavecchia, Naples, Venice, Genoa, Livorno. Fixed prices, large vehicle options. Book today.',
}

const ports = [
  { port: 'Civitavecchia', serves: 'Rome & Vatican', airport: 'Fiumicino (FCO)', price: 110, desc: 'The main cruise port for Rome. 80km from Fiumicino Airport, 75km from Rome centre.' },
  { port: 'Naples', serves: 'Amalfi Coast & Pompeii', airport: 'Naples (NAP)', price: 55, desc: 'Gateway to the Amalfi Coast. Molo Beverello and Stazione Marittima terminals.' },
  { port: 'Venice', serves: 'Venice & Veneto', airport: 'Marco Polo (VCE)', price: 75, desc: 'Venezia Terminal Passeggeri. Transfer from airport or hotel to cruise terminal.' },
  { port: 'Genoa', serves: 'Italian Riviera & Cinque Terre', airport: 'Genoa (GOA)', price: 50, desc: 'Major Mediterranean cruise hub. Multiple terminals at Porto di Genova.' },
  { port: 'Livorno', serves: 'Florence & Tuscany', airport: 'Pisa (PSA)', price: 90, desc: 'The port for Florence and Tuscany. 80km from Florence, 20km from Pisa Airport.' },
  { port: 'Savona', serves: 'Italian Riviera', airport: 'Genoa (GOA)', price: 80, desc: 'Costa and MSC hub. 50km from Genoa Airport via A10 motorway.' },
]

export default function CruiseTransfersPage() {
  return (
    <div className="pt-20">
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6"><Ship className="w-4 h-4" /> Cruise Specialist</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Cruise Port Transfers — Italy</h1>
            <p className="text-gray-300 text-xl leading-relaxed">Private NCC transfers to and from all major Italian cruise ports. Fixed prices, large luggage capacity, and drivers who know every terminal.</p>
          </div>
        </div>
      </section>

      <section className="bg-gold py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-6 text-navy text-sm font-semibold">
            {['Ship Arrival Monitoring', 'Large Luggage Vehicles', 'Fixed Prices', 'Terminal-to-Terminal', '24/7 Service'].map(t => (
              <span key={t} className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> {t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Italian Cruise Ports — Transfer Guide</h2>
          <p className="text-gray-600 mb-10">Fixed-price private transfers from airports, hotels, and city centres to all major Italian cruise ports.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ports.map(p => (
              <div key={p.port} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center shrink-0"><Ship className="w-5 h-5 text-gold" /></div>
                  <div>
                    <h3 className="font-bold text-gray-900">{p.port}</h3>
                    <p className="text-green-600 text-xs font-semibold">{p.serves}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{p.desc}</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{p.airport}</span>
                  <span className="text-green-600 font-black">from €{p.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose NCC for Cruise Transfers?</h2>
              <div className="space-y-4">
                {[
                  { icon: Ship, title: 'Ship Monitoring', desc: 'We monitor your ship\'s arrival time via MarineTraffic. If the vessel is delayed, your driver adjusts accordingly.' },
                  { icon: Shield, title: 'Large Luggage Vehicles', desc: 'Cruise luggage is bulky. We offer Mercedes V-Class vans with large boot space for multiple suitcases.' },
                  { icon: Clock, title: 'Early & Late Service', desc: 'Cruise embarkation often requires early morning arrivals. We operate 24/7 including pre-dawn pickups.' },
                  { icon: MapPin, title: 'Right Terminal', desc: 'Italian ports have multiple terminals. Tell us your cruise line and ship name — we\'ll identify the correct berth.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                    <Icon className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">{title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Popular Cruise Routes</h2>
              <div className="space-y-3">
                {[
                  { from: 'Fiumicino Airport', to: 'Civitavecchia Port', time: '75 min', price: '€110' },
                  { from: 'Rome City', to: 'Civitavecchia Port', time: '75 min', price: '€120' },
                  { from: 'Naples Airport', to: 'Naples Port', time: '25 min', price: '€55' },
                  { from: 'Venice Airport', to: 'Venice Cruise Terminal', time: '30 min', price: '€75' },
                  { from: 'Pisa Airport', to: 'Livorno Port', time: '30 min', price: '€65' },
                  { from: 'Florence', to: 'Livorno Port', time: '80 min', price: '€110' },
                  { from: 'Genoa Airport', to: 'Genoa Port', time: '20 min', price: '€50' },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 text-sm">
                    <span className="text-gray-700">{r.from} → {r.to}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-xs flex items-center gap-1"><Clock className="w-3 h-3" />{r.time}</span>
                      <span className="text-green-600 font-bold">{r.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Book Your Cruise Transfer</h2>
          <p className="text-gray-400 mb-8">Tell us your cruise line, ship name, port, and arrival/departure time. We handle the rest.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#quote-form" className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold px-8 py-4 rounded-xl hover:bg-gold-light transition-colors">Get Cruise Transfer Quote <ArrowRight className="w-4 h-4" /></Link>
            <a href={buildWhatsAppUrl(WHATSAPP, 'Hello, I need a transfer to/from an Italian cruise port.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl">WhatsApp Us</a>
          </div>
        </div>
      </section>
    </div>
  )
}
