import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Shield, Star, Clock, Users, MapPin, CheckCircle } from 'lucide-react'


export const metadata: Metadata = {
  title: 'About Us — NCC Transfer Intermediary',
  description: 'Italy Taxi Services connects travellers with licensed NCC operators across Italy. Learn about our model, our standards, and why we are different from taxi booking platforms.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Shield className="w-4 h-4" />
              NCC Transfer Intermediary
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              About Italy Taxi Services
            </h1>
            <p className="text-gray-300 text-xl leading-relaxed">
              We connect international travellers with licensed NCC (Noleggio con Conducente) operators across Italy — providing a seamless, trusted booking experience for private chauffeur transfers.
            </p>
          </div>
        </div>
      </section>

      {/* What is NCC */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is NCC?</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong>NCC (Noleggio con Conducente)</strong> is Italy's legally regulated private hire vehicle service — distinct from taxis. NCC operators must hold a specific ministerial licence, maintain licensed vehicles, and operate with pre-agreed, fixed prices.
                </p>
                <p>
                  Unlike a taxi (which uses a meter and can be hailed on the street), NCC transfers are always pre-booked, always at a fixed price agreed before the journey, and always in a dedicated vehicle — no ride-sharing with strangers.
                </p>
                <p>
                  This makes NCC the premium, legal, and reliable choice for airport transfers, business travel, and luxury journeys across Italy.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, title: 'Ministerial Licence', desc: 'Every NCC operator holds a government-issued licence to operate private hire services' },
                { icon: MapPin, title: 'Pre-Booked Always', desc: 'NCC trips must be booked in advance — protecting you from surge pricing and uncertainty' },
                { icon: Star, title: 'Fixed Price', desc: 'Your price is agreed before the journey. No meters, no surprises at your destination' },
                { icon: CheckCircle, title: 'Fully Insured', desc: 'NCC vehicles carry specific commercial insurance covering all passengers' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-gray-50 rounded-2xl p-5">
                  <Icon className="w-6 h-6 text-gold mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Work</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We act as an intermediary between travellers and vetted NCC operators across Italy.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'You Request a Quote', desc: 'Fill in our transfer form or contact us via WhatsApp with your journey details.' },
              { step: '02', title: 'We Match You', desc: 'We find the best licensed NCC partner for your route, vehicle preference, and timing.' },
              { step: '03', title: 'Fixed Price Confirmed', desc: 'You receive a confirmed quote at a fixed price — including all tolls and taxes.' },
              { step: '04', title: 'Your Driver Arrives', desc: 'Your NCC chauffeur meets you as agreed, and takes you directly to your destination.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="text-4xl font-black text-gold/20 mb-4">{step}</div>
                <h3 className="font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Coverage */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Coverage</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We cover all major Italian cities, airports, and tourist destinations. Our partner network spans the entire country — from Milan in the north to Sicily in the south.
              </p>
              <div className="space-y-3">
                {[
                  'Milan — Malpensa, Linate, Bergamo airports',
                  'Rome — Fiumicino, Ciampino airports',
                  'Venice — Marco Polo, Treviso airports',
                  'Florence — Peretola, Pisa airports',
                  'Naples & Amalfi Coast',
                  'Bologna, Turin, Verona',
                  'Lake Como, Lake Garda',
                  'Cruise ports — Civitavecchia, Venice, Naples',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="w-3 h-3 text-gold" />
                    </div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Standards</h2>
              <div className="space-y-4">
                {[
                  { title: 'Verified NCC Licences', desc: 'Every partner operator has their NCC licence verified by us before joining our network.' },
                  { title: 'Vehicle Quality Check', desc: 'Partners must use vehicles less than 4 years old, maintained to commercial standards.' },
                  { title: 'Driver Background Checks', desc: 'All chauffeurs are background-checked and hold professional driving qualifications.' },
                  { title: 'Real Reviews', desc: 'We collect and publish genuine customer reviews to maintain quality accountability.' },
                  { title: '24/7 Support', desc: 'Our team is available around the clock to assist with bookings, changes, and emergencies.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                    <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">{title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { num: '10,000+', label: 'Transfers completed' },
              { num: '4.9/5', label: 'Average customer rating' },
              { num: '50+', label: 'NCC partner operators' },
              { num: '24/7', label: 'Service availability' },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="text-4xl font-black text-gold mb-2">{num}</p>
                <p className="text-gray-400 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Book Your Transfer?</h2>
          <p className="text-gray-600 mb-8">
            Contact us via WhatsApp or fill in our quote form. We&apos;ll reply within minutes with a fixed-price quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#quote-form"
              className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold px-8 py-4 rounded-xl hover:bg-gold-light transition-colors"
            >
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
