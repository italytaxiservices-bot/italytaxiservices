import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star, Shield, Users, Briefcase } from 'lucide-react'
import { vehicles } from '@/data/fleet'


export const metadata: Metadata = {
  title: 'Luxury Chauffeur Italy | Premium NCC Service',
  description: 'Luxury NCC chauffeur service across Italy. Mercedes S-Class, V-Class, luxury SUV. VIP airport transfers, private tours, corporate travel. Fixed prices.',
  alternates: { canonical: '/luxury-chauffeur-italy' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/luxury-chauffeur-italy',
    title: 'Luxury Chauffeur Italy | Premium NCC Service | Italy Taxi Services',
    description: 'Luxury NCC chauffeur service across Italy. Mercedes S-Class, V-Class, luxury SUV. VIP airport transfers, private tours, corporate travel. Fixed prices.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Chauffeur Italy | Premium NCC Service | Italy Taxi Services',
    description: 'Luxury NCC chauffeur service across Italy. Mercedes S-Class, V-Class, luxury SUV. VIP airport transfers, private tours, corporate travel. Fixed prices.',
    images: ['/logo.webp'],
  },
}

export default function LuxuryPage() {
  return (
    <div className="pt-20">
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6"><Star className="w-4 h-4" /> Premium Service</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Luxury Chauffeur Service — Italy</h1>
            <p className="text-gray-300 text-xl leading-relaxed">First-class private travel across Italy. Premium vehicles, senior licensed NCC chauffeurs, and a seamless experience from enquiry to destination.</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Premium Fleet</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Every vehicle is maintained to the highest standard. Maximum 4 years old, spotlessly clean, and driven by a professional NCC-licensed chauffeur.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {vehicles.map(v => (
              <div key={v.id} className="rounded-2xl overflow-hidden border border-gray-100 hover:border-green-200 hover:shadow-xl transition-all">
                <div className="h-36 bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                  <svg className="w-32 h-20 text-green-300" viewBox="0 0 200 80" fill="currentColor">
                    <path d="M20 55 C20 55 30 35 50 32 L80 28 C90 26 100 24 115 24 L145 24 C158 24 168 30 175 40 L182 50 C185 50 190 52 190 56 L190 60 C190 62 188 64 186 64 L174 64 C173 70 167 75 160 75 C153 75 147 70 146 64 L64 64 C63 70 57 75 50 75 C43 75 37 70 36 64 L24 64 C22 64 20 62 20 60 Z" />
                  </svg>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-0.5">{v.name}</h3>
                  <p className="text-xs text-gray-400 mb-3">{v.model}</p>
                  <div className="flex gap-3 mb-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-green-500" />Up to {v.passengers}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-green-500" />{v.luggage} bags</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Italy Taxi Services Standard</h2>
              <div className="space-y-4">
                {[
                  { icon: Star, title: 'Senior Chauffeurs', desc: 'Experienced, English-speaking, professional. Presented in formal attire.' },
                  { icon: Shield, title: 'NCC Licensed', desc: 'Every chauffeur holds a valid NCC (Noleggio con Conducente) ministerial licence.' },
                  { icon: Users, title: 'Discreet Service', desc: 'Your privacy is respected. We do not share client information or discuss journeys.' },
                  { icon: Briefcase, title: 'Turnkey Experience', desc: 'From first contact to final drop-off — professional, seamless, and punctual.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-white border border-green-200 rounded-xl flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-green-600" /></div>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">{title}</p>
                      <p className="text-sm text-gray-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: 'Licensed', label: 'NCC Operators' },
                { num: 'English', label: 'Speaking Drivers' },
                { num: '4 yrs', label: 'Max vehicle age' },
                { num: '24/7', label: 'Available' },
              ].map(({ num, label }) => (
                <div key={label} className="bg-white rounded-2xl p-6 text-center border border-green-100">
                  <p className="text-3xl font-black text-green-600 mb-1">{num}</p>
                  <p className="text-sm text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Experience Luxury Travel in Italy</h2>
          <p className="text-gray-400 mb-8">Fixed prices. Premium vehicles. Senior NCC chauffeurs. Available across Italy.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#quote-form" className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold px-8 py-4 rounded-xl hover:bg-gold-light transition-colors">Get a Luxury Quote <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
