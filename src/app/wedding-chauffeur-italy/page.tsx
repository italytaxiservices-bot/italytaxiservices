import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Heart, Star, Shield, Car } from 'lucide-react'


export const metadata: Metadata = {
  title: 'Wedding Chauffeur Italy | Luxury Wedding Cars & Transfers | Italy Taxi Services',
  description: 'Luxury NCC wedding chauffeur service across Italy. Bridal car, guest transfers, Tuscany weddings, Lake Como, Amalfi Coast. Fixed prices. Book today.',
}

export default function WeddingPage() {
  return (
    <div className="pt-20">
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6"><Heart className="w-4 h-4" /> Wedding Specialist</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Wedding Chauffeur Service — Italy</h1>
            <p className="text-gray-300 text-xl leading-relaxed">Immaculate luxury vehicles and professional NCC chauffeurs for your Italian wedding. Bridal cars, guest transfers, and full wedding-day logistics — across Tuscany, Lake Como, Amalfi Coast, and beyond.</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Perfect Wedding Car in Italy</h2>
              <p className="text-gray-600 leading-relaxed mb-6">Italy is one of the world's most popular wedding destinations — Lake Como villas, Tuscan farmhouses, Amalfi Coast terraces, and Rome's historic palazzi attract thousands of destination weddings each year. Ground transport is a critical part of the day.</p>
              <div className="space-y-4">
                {[
                  { icon: Car, title: 'Bridal Car', desc: 'Immaculate Mercedes S-Class or luxury SUV for the bride and groom. Decorated on request.' },
                  { icon: Heart, title: 'Guest Shuttles', desc: 'Multiple V-Class vans and sedans for transporting guests between venues, hotels, and airports.' },
                  { icon: Star, title: 'Venue Knowledge', desc: 'We know access restrictions, parking logistics, and the best routes to every major wedding venue in Italy.' },
                  { icon: Shield, title: 'Guaranteed Reliability', desc: 'Your wedding day transport is too important to leave to chance. We confirm every vehicle and driver in advance.' },
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Popular Wedding Destinations</h2>
              <div className="space-y-3">
                {[
                  { place: 'Lake Como', desc: 'Villa del Balbianello, Villa Erba, Villa Pizzo. Our drivers know every Villa access route.' },
                  { place: 'Tuscany', desc: 'Chianti farmhouses, Montalcino vineyards, Siena\'s Piazza del Campo. Expert drivers throughout.' },
                  { place: 'Amalfi Coast', desc: 'Ravello\'s Villa Rufolo, Positano cliffside venues. Experienced on the SS163.' },
                  { place: 'Rome', desc: 'Historic palazzi, Villa Borghese, Frascati wine estates. ZTL access arranged.' },
                  { place: 'Venice', desc: 'Palazzo venues and transfers to Piazzale Roma. Coordination with water taxis.' },
                  { place: 'Florence', desc: 'Renaissance villas, Fiesole hillside venues, Chianti estates. Expert Florentine drivers.' },
                ].map(({ place, desc }) => (
                  <div key={place} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="font-bold text-gray-900 text-sm mb-1">{place}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Enquire About Wedding Transport</h2>
          <p className="text-gray-400 mb-8">Tell us your wedding date, venue, and guest numbers. We'll provide a tailored transport proposal.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#quote-form" className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold px-8 py-4 rounded-xl hover:bg-gold-light transition-colors">Wedding Transport Enquiry <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
