import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Phone, Mail, MessageCircle, Clock } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/utils'
import ContactForm from '@/components/ContactForm'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+390000000000'
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'info@italytaxiservices.com'

export const metadata: Metadata = {
  title: 'Contact Italy Taxi Services | Book a Private Transfer in Italy',
  description: 'Contact Italy Taxi Services for private NCC transfers. WhatsApp, email, or use our quote form. We reply within minutes.',
}

export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-gray-300 text-xl leading-relaxed">Get in touch for a quote, a question, or to book your private NCC transfer in Italy. We reply within minutes via WhatsApp.</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              <div className="space-y-5">
                <a href={buildWhatsAppUrl(WHATSAPP, 'Hello, I would like to book a private transfer in Italy.')} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-5 p-6 bg-green-50 border border-green-200 rounded-2xl hover:bg-green-100 transition-all group">
                  <div className="w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center shrink-0">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">WhatsApp</p>
                    <p className="text-gray-500 text-sm">Fastest response — we reply within minutes</p>
                    <p className="text-green-700 font-semibold text-sm mt-1">{WHATSAPP}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-green-600 ml-auto transition-colors" />
                </a>

                <a href={`mailto:${EMAIL}`}
                  className="flex items-center gap-5 p-6 bg-gray-50 border border-gray-100 rounded-2xl hover:border-green-200 hover:bg-green-50/40 transition-all group">
                  <div className="w-14 h-14 bg-navy rounded-2xl flex items-center justify-center shrink-0">
                    <Mail className="w-7 h-7 text-gold" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Email</p>
                    <p className="text-gray-500 text-sm">For detailed enquiries and corporate requests</p>
                    <p className="text-green-700 font-semibold text-sm mt-1">{EMAIL}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-green-600 ml-auto transition-colors" />
                </a>

                <a href={`tel:${WHATSAPP}`}
                  className="flex items-center gap-5 p-6 bg-gray-50 border border-gray-100 rounded-2xl hover:border-green-200 hover:bg-green-50/40 transition-all group">
                  <div className="w-14 h-14 bg-navy rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="w-7 h-7 text-gold" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Phone</p>
                    <p className="text-gray-500 text-sm">Call us directly for urgent bookings</p>
                    <p className="text-green-700 font-semibold text-sm mt-1">{WHATSAPP}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-green-600 ml-auto transition-colors" />
                </a>
              </div>

              <div className="mt-8 p-5 bg-green-50 border border-green-100 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  <p className="font-semibold text-gray-900 text-sm">Response Times</p>
                </div>
                <p className="text-sm text-gray-600">WhatsApp: within minutes (24/7) · Email: within 2 hours · Urgent bookings: call directly</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Or Get an Instant Quote</h2>
              <p className="text-gray-600 mb-6">Fill in our transfer form and we'll send your fixed-price quote via WhatsApp within minutes.</p>
              <Link href="/#quote-form" className="btn-gold-shimmer inline-flex items-center gap-2 font-bold px-8 py-4 rounded-2xl text-sm">
                Go to Quote Form <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="mt-10 pt-10 border-t border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Frequently Asked Before Booking</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  {[
                    'Do you need exact addresses or is airport/hotel name enough?',
                    'Can you provide a VAT invoice for business travel?',
                    'How far in advance do I need to book?',
                    'What if my flight is delayed?',
                  ].map(q => (
                    <div key={q} className="flex items-start gap-2">
                      <span className="text-green-500 font-bold shrink-0">→</span>
                      <span>{q}</span>
                    </div>
                  ))}
                  <p className="text-gray-400 text-xs mt-4">Ask us any of these via WhatsApp — we'll answer immediately.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Send Us a Message</h2>
            <p className="text-gray-600">General enquiries, corporate requests, or feedback — we reply within 2 hours.</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
