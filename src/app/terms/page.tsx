import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Italy Taxi Services',
  description: 'Terms and conditions for Italy Taxi Services NCC private transfer booking service.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <div className="pt-20">
      <section className="bg-navy py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-white mb-2">Terms &amp; Conditions</h1>
          <p className="text-gray-400 text-sm">Last updated: January 2025</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-8 text-gray-700 leading-relaxed">
            {[
              { title: '1. Service Description', body: 'Italy Taxi Services acts as an intermediary service connecting travellers with licensed NCC (Noleggio con Conducente) operators in Italy. We are not the direct transport provider but arrange transfers on behalf of our partner operators.' },
              { title: '2. Booking & Confirmation', body: 'Bookings are confirmed only after written confirmation from Italy Taxi Services via WhatsApp or email. A booking reference will be provided. No booking is confirmed until you receive explicit written confirmation from us.' },
              { title: '3. Pricing', body: 'All prices quoted are fixed and inclusive of: vehicle, professional driver, tolls (autostrada), and VAT where applicable. Prices do not include: parking (where driver must pay on-site), additional stops not agreed at time of booking, or waiting time beyond 60 minutes for airport pickups.' },
              { title: '4. Cancellation Policy', body: 'Cancellations made more than 24 hours before the transfer: full refund. Cancellations within 24 hours: 50% charge. No-shows: full charge. Changes to bookings (date, time, destination) are accepted subject to availability and may incur a price adjustment.' },
              { title: '5. Flight Delays', body: 'For airport pickups, we monitor your flight in real time. The driver will wait up to 60 minutes after the updated arrival time at no extra charge. For delays exceeding 60 minutes, we will contact you to arrange an adjusted pickup time.' },
              { title: '6. Passenger Responsibility', body: 'Passengers are responsible for ensuring they are at the agreed pickup location at the agreed time. For non-airport pickups, if the passenger is more than 30 minutes late without prior notification, the booking may be treated as a no-show.' },
              { title: '7. Luggage', body: 'Standard luggage allowances apply per vehicle type (listed on our website). Oversized items (skis, surfboards, large musical instruments) must be declared at the time of booking. We reserve the right to refuse transport of undisclosed oversized luggage if the vehicle cannot safely carry it.' },
              { title: '8. Liability', body: 'Italy Taxi Services\' liability is limited to the value of the transfer booking. We are not liable for: delays caused by traffic, weather, or force majeure; indirect losses; or losses arising from missed connections.' },
              { title: '9. Governing Law', body: 'These terms are governed by Italian law. Any disputes shall be subject to the jurisdiction of Italian courts.' },
              { title: '10. Contact', body: 'For any questions about these terms: info@italytaxiservices.com' },
            ].map(({ title, body }) => (
              <div key={title}>
                <h2 className="text-lg font-bold text-gray-900 mb-3">{title}</h2>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
