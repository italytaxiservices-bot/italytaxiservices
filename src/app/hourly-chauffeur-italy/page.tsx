import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, MapPin, Star, Shield } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/utils'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+390000000000'

export const metadata: Metadata = {
  title: 'Hourly Chauffeur Italy | Hire by the Hour | Italy Taxi Services',
  description: 'Hire a private NCC chauffeur by the hour in Italy. City tours, business meetings, shopping trips, half-day or full-day hire. Milan, Rome, Florence, Venice.',
}

export default function HourlyPage() {
  return (
    <div className="pt-20">
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6"><Clock className="w-4 h-4" /> Flexible Hire</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Hourly Chauffeur Hire — Italy</h1>
            <p className="text-gray-300 text-xl leading-relaxed">Your own private driver and vehicle for as long as you need. City tours, business meetings, shopping, sightseeing — complete flexibility with a professional NCC chauffeur at your disposal.</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How Hourly Hire Works</h2>
              <p className="text-gray-600 leading-relaxed mb-6">Hourly hire gives you a private NCC chauffeur and vehicle for a set number of hours. Your driver stays with you, waits while you visit meetings or attractions, and is ready whenever you need to move. No meters — just a fixed hourly rate agreed in advance.</p>
              <div className="space-y-4">
                {[
                  { icon: Clock, title: 'Minimum 3 hours', desc: 'Our hourly hire starts from 3 hours. Half-day (4h) and full-day (8h) packages also available.' },
                  { icon: MapPin, title: 'Multiple stops', desc: 'Meetings, hotels, restaurants, shops, attractions — your driver moves with you throughout the day.' },
                  { icon: Star, title: 'Fixed hourly rate', desc: 'One agreed rate covers everything — fuel, tolls, parking, driver time. No surprises.' },
                  { icon: Shield, title: 'Premium vehicles', desc: 'Mercedes E-Class, S-Class, V-Class. All NCC licensed and fully insured.' },
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Popular Hourly Hire Uses</h2>
              <div className="space-y-3">
                {[
                  { use: 'Business meetings tour', desc: 'Multiple client visits or office meetings across a city in one day.' },
                  { use: 'Shopping trip', desc: 'Milan fashion district, Rome\'s Via Condotti — driver waits while you shop.' },
                  { use: 'City sightseeing', desc: 'Rome\'s monuments, Florence\'s piazzas — efficient private city tour.' },
                  { use: 'Vineyard tour (Tuscany)', desc: 'Three or four Chianti wineries in one day with driver.' },
                  { use: 'Airport + sightseeing', desc: 'Airport arrival, city sightseeing, hotel drop-off — all in one booking.' },
                  { use: 'Day trip with driver', desc: 'Florence to Siena and San Gimignano — driver guides logistics.' },
                ].map(({ use, desc }) => (
                  <div key={use} className="flex items-start gap-3 py-3 border-b border-gray-100">
                    <div className="w-5 h-5 rounded-full bg-green-100 border border-green-200 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{use}</p>
                      <p className="text-xs text-gray-400">{desc}</p>
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
          <h2 className="text-3xl font-bold text-white mb-4">Request Hourly Hire</h2>
          <p className="text-gray-400 mb-8">Tell us your city, date, approximate hours needed, and your itinerary. We'll send you a fixed price within minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#quote-form" className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold px-8 py-4 rounded-xl hover:bg-gold-light transition-colors">Get Hourly Hire Quote <ArrowRight className="w-4 h-4" /></Link>
            <a href={buildWhatsAppUrl(WHATSAPP, 'Hello, I need a chauffeur by the hour in Italy.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl">WhatsApp Us</a>
          </div>
        </div>
      </section>
    </div>
  )
}
