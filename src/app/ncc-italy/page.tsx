import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Shield, CheckCircle, FileText, Car } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/utils'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+390000000000'

export const metadata: Metadata = {
  title: 'NCC Italy — What is NCC? Licensed Private Hire in Italy | Italy Taxi Services',
  description: 'NCC (Noleggio con Conducente) explained. Italy\'s legal private hire vehicle service — licensed, fixed prices, pre-booked. Not a taxi. Find out why NCC is the right choice.',
}

export default function NccItalyPage() {
  return (
    <div className="pt-20">
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <FileText className="w-4 h-4" /> Legal Private Hire — Italy
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">NCC Italy — What is NCC?</h1>
            <p className="text-gray-300 text-xl leading-relaxed">NCC (Noleggio con Conducente) is Italy's legally regulated private hire vehicle service — the professional, licensed alternative to taxis for pre-booked transfers at fixed prices.</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">NCC vs Taxi — The Key Differences</h2>
              <div className="space-y-5">
                {[
                  { label: 'Booking', ncc: 'Always pre-booked', taxi: 'Hailed on street or via app' },
                  { label: 'Price', ncc: 'Fixed — agreed before journey', taxi: 'Meter — unpredictable' },
                  { label: 'Licence', ncc: 'Specific NCC ministerial licence', taxi: 'Taxi licence (different regulation)' },
                  { label: 'Vehicle', ncc: 'Dedicated to your group only', taxi: 'May carry other passengers (some apps)' },
                  { label: 'Meet & Greet', ncc: 'Standard — name board at arrivals', taxi: 'Not standard' },
                  { label: 'Flight monitoring', ncc: 'Included — driver adapts to delays', taxi: 'Not standard' },
                ].map(row => (
                  <div key={row.label} className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100 text-sm">
                    <span className="font-semibold text-gray-700">{row.label}</span>
                    <span className="text-green-700 font-medium flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" />{row.ncc}</span>
                    <span className="text-gray-400">{row.taxi}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why NCC is the Right Choice</h2>
              <div className="space-y-4">
                {[
                  { icon: Shield, title: 'Fully Licensed & Insured', desc: 'NCC operators hold a specific government-issued licence (Decreto Legislativo 285/1992). All vehicles carry commercial insurance covering all passengers.' },
                  { icon: Car, title: 'Premium Vehicles', desc: 'NCC regulations require well-maintained, premium vehicles. Our partners use Mercedes E-Class, S-Class, V-Class, and luxury SUVs — not standard economy cars.' },
                  { icon: CheckCircle, title: 'Fixed Price — Always', desc: 'Italian law requires NCC prices to be agreed before the journey begins. You know exactly what you pay — no meter surprises.' },
                  { icon: FileText, title: 'Transparent & Legal', desc: 'Unlike unlicensed private drivers (increasingly common at airports), NCC operators issue proper receipts and are accountable under Italian transport law.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-gold" /></div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1 text-sm">{title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Where We Operate NCC Service</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { city: 'Milan', desc: 'Malpensa, Linate, Bergamo airports. Lake Como, Lugano.', href: '/milan-chauffeur-service' },
              { city: 'Rome', desc: 'Fiumicino, Ciampino airports. Vatican, Civitavecchia.', href: '/rome-chauffeur-service' },
              { city: 'Venice', desc: 'Marco Polo Airport, Cruise Terminal. Verona, Padova.', href: '/venice-chauffeur-service' },
              { city: 'Florence', desc: 'Peretola & Pisa airports. Tuscany, Siena, Chianti.', href: '/florence-chauffeur-service' },
              { city: 'Naples', desc: 'Capodichino Airport. Amalfi Coast, Pompeii, Sorrento.', href: '/naples-chauffeur-service' },
              { city: 'Bologna', desc: 'Marconi Airport. Motor Valley, Rimini, Florence.', href: '/bologna-chauffeur-service' },
            ].map(({ city, desc, href }) => (
              <Link key={city} href={href} className="group bg-white rounded-2xl p-5 border border-green-100 hover:border-green-300 hover:shadow-lg transition-all">
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">{city}</h3>
                <p className="text-sm text-gray-500 mb-3">{desc}</p>
                <span className="text-green-600 text-sm font-semibold flex items-center gap-1">View service <ArrowRight className="w-3.5 h-3.5" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Book a Licensed NCC Transfer</h2>
          <p className="text-gray-400 mb-8">Fixed price. Licensed operator. Professional chauffeur. Available across Italy.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#quote-form" className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold px-8 py-4 rounded-xl hover:bg-gold-light transition-colors">Get a Free Quote <ArrowRight className="w-4 h-4" /></Link>
            <a href={buildWhatsAppUrl(WHATSAPP, 'Hello, I would like to book an NCC transfer in Italy.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#20BA5A] transition-colors">WhatsApp Us</a>
          </div>
        </div>
      </section>
    </div>
  )
}
