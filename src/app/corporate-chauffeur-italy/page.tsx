import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Briefcase, Shield, Clock, Star, Users, CreditCard } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/utils'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+390000000000'

export const metadata: Metadata = {
  title: 'Corporate Chauffeur Italy | Business Travel & NCC Service | Italy Chauffeur',
  description: 'Corporate NCC chauffeur service across Italy. Business travel, roadshows, executive transfers, trade fair logistics. Fixed prices, invoiced billing. Book today.',
}

export default function CorporatePage() {
  return (
    <div className="pt-20">
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6"><Briefcase className="w-4 h-4" /> Business Travel</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Corporate Chauffeur Service — Italy</h1>
            <p className="text-gray-300 text-xl leading-relaxed">Professional NCC chauffeur service for businesses operating in Italy. Executive airport transfers, trade fair logistics, roadshows, and multi-city itineraries — all at fixed prices with business invoicing.</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Corporate Travel Done Right</h2>
              <p className="text-gray-600 leading-relaxed mb-6">Italy hosts some of Europe's largest trade fairs and business events — Salone del Mobile (Milan), Vinitaly (Verona), EIMA (Bologna), and hundreds more. Reliable, professional ground transport is essential for corporate visitors.</p>
              <p className="text-gray-600 leading-relaxed mb-8">Our corporate NCC service offers fixed pricing, business invoicing, and a dedicated account manager for companies requiring regular Italian ground transport.</p>
              <div className="space-y-3">
                {['Fixed prices with business invoice (VAT receipt)', 'Dedicated account management for repeat bookings', 'Multi-vehicle coordination for events', 'English-speaking senior chauffeurs', 'Confidentiality and discretion assured', 'Same-day bookings accepted where possible'].map(p => (
                  <div key={p} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-green-100 border border-green-200">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-gray-700 text-sm">{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Briefcase, title: 'Executive Transfers', desc: 'Airport pickups, hotel-to-meeting, inter-city. Senior chauffeurs in premium vehicles.' },
                { icon: Users, title: 'Group Logistics', desc: 'Multi-vehicle coordination for teams, delegations, and trade fair groups.' },
                { icon: Star, title: 'VIP & Roadshows', desc: 'Discrete, professional service for senior executives, investors, and VIP guests.' },
                { icon: CreditCard, title: 'Business Invoicing', desc: 'Proper Italian VAT invoices. Monthly billing available for corporate accounts.' },
                { icon: Clock, title: '24/7 Availability', desc: 'Early flights, late arrivals, last-minute requests — we operate around your schedule.' },
                { icon: Shield, title: 'Licensed & Insured', desc: 'NCC licensed operators. Full commercial insurance. Verifiable documentation.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-all">
                  <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center mb-3"><Icon className="w-5 h-5 text-gold" /></div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Key Business Events We Serve</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { event: 'Salone del Mobile', city: 'Milan', desc: 'Europe\'s largest furniture & design fair. April, Fiera Milano.' },
              { event: 'Vinitaly', city: 'Verona', desc: 'Italy\'s premier wine exhibition. April, Veronafiere.' },
              { event: 'EIMA International', city: 'Bologna', desc: 'Agricultural machinery exhibition. November, BolognaFiere.' },
              { event: 'MIPIM', city: 'Multiple cities', desc: 'Real estate events across Italian cities.' },
              { event: 'Medical congresses', city: 'Rome / Milan', desc: 'Major hospital and pharma group transfers.' },
              { event: 'Fashion Week', city: 'Milan', desc: 'September and February collections. Show transfers for buyers and press.' },
            ].map(({ event, city, desc }) => (
              <div key={event} className="bg-white rounded-2xl p-5 border border-green-100">
                <h3 className="font-bold text-gray-900 mb-1">{event}</h3>
                <p className="text-green-600 text-xs font-semibold mb-2">{city}</p>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Set Up a Corporate Account</h2>
          <p className="text-gray-400 mb-8">Contact us to discuss your company's Italian ground transport requirements. We offer volume pricing and monthly invoicing for regular clients.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#quote-form" className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-bold px-8 py-4 rounded-xl hover:bg-gold-light transition-colors">Get a Corporate Quote <ArrowRight className="w-4 h-4" /></Link>
            <a href={buildWhatsAppUrl(WHATSAPP, 'Hello, I need corporate chauffeur services in Italy for my company.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl">WhatsApp Us</a>
          </div>
        </div>
      </section>
    </div>
  )
}
