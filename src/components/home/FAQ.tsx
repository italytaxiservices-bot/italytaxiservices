'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What is NCC and how is it different from a taxi?',
    a: "NCC (Noleggio con Conducente) is Italy's licensed private chauffeur service. Unlike taxis, NCC vehicles must be pre-booked — they cannot be hailed on the street. NCC services operate on fixed, agreed prices, with professional drivers and premium vehicles. This makes them the preferred choice for airport transfers, business travel, and luxury transfers across Italy.",
  },
  {
    q: 'Do you monitor my flight for delays?',
    a: 'Yes. For all airport pickup transfers, we monitor your flight in real time. If your flight is delayed, your driver will wait — at no extra charge. We track both arrivals and any connecting flight delays.',
  },
  {
    q: 'Is the price fixed or does a meter run?',
    a: "All prices are fixed and agreed before your transfer. There are no meters, no surprise charges, and no surge pricing. The price you are quoted is the price you pay — regardless of traffic or journey time.",
  },
  {
    q: 'What does meet & greet mean?',
    a: 'For airport pickups, your driver will be waiting in the arrivals hall with a sign displaying your name. You do not need to look for them — they come to you. This service is included as standard for all airport transfers.',
  },
  {
    q: 'How do I book a transfer?',
    a: 'Simply fill in the quote form on this page, or message us directly on WhatsApp. We will confirm your transfer details and send a fixed price quote. Once you confirm, your booking is secured.',
  },
  {
    q: 'Can I book a one-way transfer to a specific hotel or villa?',
    a: 'Yes. We offer full door-to-door service — from any pickup point to any destination in Italy. Hotels, villas, apartments, cruise ports, railway stations — if you can name it, we can get you there.',
  },
  {
    q: 'Do you cover the Amalfi Coast, Positano, and Sorrento?',
    a: 'Yes. Our partner drivers are experienced on the Amalfi Coast road. We cover Positano, Amalfi, Ravello, Praiano, Sorrento, and the wider Campania region.',
  },
  {
    q: 'Can I book a return transfer?',
    a: 'Absolutely. You can book both legs of your journey at the same time for a seamless experience. We recommend booking your return transfer at the same time as your arrival to secure availability.',
  },
  {
    q: 'What vehicles are available?',
    a: 'We offer business sedans (Mercedes E-Class or similar), first class sedans (Mercedes S-Class or similar), premium vans (Mercedes V-Class for groups and families), and luxury SUVs. All vehicles are immaculately presented and regularly inspected.',
  },
  {
    q: 'How far in advance should I book?',
    a: "We recommend booking at least 24–48 hours in advance to guarantee availability. For peak summer dates, weekends, and public holidays in Italy, we recommend booking as early as possible. We do accept last-minute bookings subject to availability — contact us via WhatsApp.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(201,168,76,0.1)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.2)' }}>
            FAQs
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Everything you need to know about our private chauffeur and NCC transfer service in Italy.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                open === i ? 'border-gold/40 shadow-sm' : 'border-gray-100'
              }`}
            >
              <button
                className="w-full text-left flex items-center justify-between p-5 gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-gray-900 text-sm leading-snug">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gold shrink-0 transition-transform duration-200 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
