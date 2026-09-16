import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Italy Taxi Services',
  description: 'Our refund and cancellation policy for private transfer bookings across Italy. Free cancellation available on most bookings.',
  alternates: { canonical: '/refund-policy' },
}

const sections = [
  {
    heading: 'Free Cancellation Window',
    body: 'All bookings may be cancelled free of charge up to 24 hours before the scheduled pickup time. Cancellations made within this window receive a full refund of any deposit paid.',
  },
  {
    heading: 'Late Cancellation (Under 24 Hours)',
    body: 'Cancellations made less than 24 hours before the scheduled pickup time may be subject to a cancellation fee of up to 50% of the agreed transfer price, to cover driver allocation costs.',
  },
  {
    heading: 'No-Show Policy',
    body: 'If a passenger fails to appear at the agreed pickup location within 60 minutes of the scheduled time (without prior notice), the transfer will be treated as a no-show and the full amount may be charged.',
  },
  {
    heading: 'Flight & Train Delays',
    body: 'We monitor all flights and trains in real time. If your inbound service is delayed, your driver will wait at no extra charge. This applies to delays of up to 90 minutes. For longer delays, we will contact you to reschedule at no cost.',
  },
  {
    heading: 'Driver Non-Arrival',
    body: 'In the unlikely event that your driver fails to arrive, you are entitled to a full refund of any amount paid. We will also assist in finding an alternative transfer at no additional cost wherever possible.',
  },
  {
    heading: 'How to Cancel',
    body: 'To cancel a booking, contact us by email at info@italytaxiservices.com or via WhatsApp with your booking reference. Cancellation requests must be received in writing to be valid.',
  },
  {
    heading: 'Refund Processing',
    body: 'Approved refunds are processed within 5–10 business days to the original payment method. Processing times may vary depending on your bank or payment provider.',
  },
  {
    heading: 'Changes to Booking',
    body: 'Date, time, or route changes are permitted free of charge up to 24 hours before departure, subject to driver availability. Changes requested with less than 24 hours notice may not always be possible.',
  },
]

export default function RefundPolicyPage() {
  return (
    <div className="pt-16">
      <section className="relative overflow-hidden grain" style={{ background: '#080808' }}>
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 5%, #C9A84C 40%, #E0C070 60%, #C9A84C 80%, transparent 95%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 py-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="gold-line" />
            <span className="section-label">Policy</span>
          </div>
          <h1 className="font-black text-white leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-serif), Georgia, serif' }}>
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Last updated: January 2026</p>
        </div>
      </section>

      <section className="py-16" style={{ background: '#F5F0E8' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="space-y-10">
            {sections.map(({ heading, body }) => (
              <div key={heading} className="pb-10" style={{ borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
                <h2 className="font-black text-gray-900 text-lg mb-3" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>{heading}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-sm" style={{ background: '#080808', border: '1px solid rgba(201,168,76,0.15)' }}>
            <p className="text-white font-bold text-sm mb-2">Questions about a booking?</p>
            <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>Contact us and we&apos;ll resolve it quickly.</p>
            <Link href="/contact" className="btn-primary text-xs px-5 py-3">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
