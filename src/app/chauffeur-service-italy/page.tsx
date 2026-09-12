import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Car, MapPin, Shield, Star } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/utils'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+390000000000'

export const metadata: Metadata = {
  title: 'Private Chauffeur Service Italy | NCC Transfers Across Italy | Italy Taxi Services',
  description: 'Professional private chauffeur and NCC service across Italy. Airport transfers, city rides, long-distance, tours. Milan, Rome, Venice, Florence, Naples. Fixed prices.',
}

const services = [
  { title: 'Airport Transfers', desc: 'Meet & greet at 19+ Italian airports. Flight monitoring, fixed prices.', href: '/airport-transfers', price: 'From €35' },
  { title: 'City Chauffeur', desc: 'Professional driver for your time in the city — hotel, meetings, restaurants.', href: '/hourly-chauffeur-italy', price: 'From €80/hr' },
  { title: 'Long-Distance', desc: 'Milan to Venice, Rome to Naples, Florence to Amalfi — door to door.', href: '/airport-transfers', price: 'From €95' },
  { title: 'Corporate Travel', desc: 'Business transfers, trade fair logistics, executive airport runs.', href: '/corporate-chauffeur-italy', price: 'Invoice billing' },
  { title: 'Cruise Ports', desc: 'Civitavecchia, Naples, Venice, Genoa — all cruise port connections.', href: '/cruise-transfers', price: 'From €50' },
  { title: 'Luxury & VIP', desc: 'S-Class, luxury SUV, senior chauffeur. Discreet, first-class service.', href: '/luxury-chauffeur-italy', price: 'Premium' },
  { title: 'Wedding Cars', desc: 'Bridal vehicles and guest transfers for Italian destination weddings.', href: '/wedding-chauffeur-italy', price: 'Custom quote' },
  { title: 'Hourly Hire', desc: 'Your own driver for half a day or a full day — total flexibility.', href: '/hourly-chauffeur-italy', price: 'From €80/hr' },
]

const cities = [
  { name: 'Milan', href: '/milan-chauffeur-service', airports: 'MXP · LIN · BGY' },
  { name: 'Rome', href: '/rome-chauffeur-service', airports: 'FCO · CIA' },
  { name: 'Venice', href: '/venice-chauffeur-service', airports: 'VCE · TSF' },
  { name: 'Florence', href: '/florence-chauffeur-service', airports: 'FLR · PSA' },
  { name: 'Naples', href: '/naples-chauffeur-service', airports: 'NAP' },
  { name: 'Bologna', href: '/bologna-chauffeur-service', airports: 'BLQ' },
]

export default function ChauffeurItalyPage() {
  return (
    <div className="pt-20">
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6"><Car className="w-4 h-4" /> Nationwide Service</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Private Chauffeur Service — Italy</h1>
            <p className="text-gray-300 text-xl leading-relaxed">Professional NCC private chauffeur and transfer service across Italy. Fixed prices, licensed operators, premium vehicles. Available in every major Italian city and airport.</p>
            <div className="flex gap-4 mt-8">
              <Link href="/#quote-form" className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-6 py-3 rounded-xl hover:bg-gold-light transition-colors">Get a Quote <ArrowRight className="w-4 h-4" /></Link>
              <a href={buildWhatsAppUrl(WHATSAPP, 'Hello, I need a private chauffeur service in Italy.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">All Our Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map(s => (
              <Link key={s.title} href={s.href} className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all">
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">{s.title}</h3>
                <p className="text-sm text-gray-500 mb-3 leading-relaxed">{s.desc}</p>
                <span className="text-green-600 font-bold text-sm">{s.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Cities We Serve</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.map(c => (
              <Link key={c.name} href={c.href} className="group flex items-center justify-between p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:border-green-200 hover:bg-green-50/40 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center"><MapPin className="w-4 h-4 text-gold" /></div>
                  <div>
                    <p className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.airports}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-green-500 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { icon: Shield, stat: 'Licensed NCC', desc: 'All operators hold ministerial NCC licence' },
              { icon: Star, stat: '4.9/5 Rating', desc: 'From 500+ verified customer reviews' },
              { icon: Car, stat: '10,000+ Transfers', desc: 'Completed across Italy' },
              { icon: MapPin, stat: '19 Airports', desc: 'All major Italian airports covered' },
            ].map(({ icon: Icon, stat, desc }) => (
              <div key={stat} className="bg-white rounded-2xl p-6 border border-green-100">
                <Icon className="w-7 h-7 text-green-600 mx-auto mb-3" />
                <p className="font-black text-gray-900 text-lg">{stat}</p>
                <p className="text-xs text-gray-500 mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Book Your Italian Transfer</h2>
          <p className="text-gray-400 mb-8">Fixed prices. Licensed NCC operators. Available across all of Italy.</p>
          <Link href="/#quote-form" className="btn-gold-shimmer inline-flex items-center gap-2 font-bold px-8 py-4 rounded-2xl text-sm">
            Get a Free Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
