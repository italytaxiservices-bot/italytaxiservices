import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Marco Polo to Venice Transfer | Private Chauffeur | Italy Taxi Services',
  description: 'Private NCC transfer from Venice Marco Polo Airport to Venice. From €50. Fast, direct, fixed price. Book your Venice airport transfer today.',
  alternates: { canonical: '/marco-polo-to-venice' },
}

const route = getRouteBySlug('marco-polo-to-venice')!

export default function MarcoPoloToVenicePage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`This is our most-booked Venice route — the short 13km hop from Venice Marco Polo Airport (VCE) to the mainland at Mestre, or to the Tronchetto car and coach terminal at the edge of the historic islands. Since no vehicles can enter central Venice itself, your chauffeur takes you as far as road access allows, in around 20–30 minutes, saving you the queues for the airport bus or water taxi.

For hotels in Mestre or on the mainland, we drop off directly at the door. For hotels within the historic islands, we take you to Piazzale Roma or Tronchetto, from where it's a short walk or vaporetto (water bus) ride to most central locations — your driver can advise on the best onward option based on your specific hotel.

This route is also frequently combined with onward connections — many clients continue from Marco Polo Airport to Padua, Treviso, or Verona on the same trip, or arrange a return transfer for their departure flight.`}
      included={[
        'Meet & greet at Marco Polo arrivals',
        'Fastest available route into Venice',
        'Mestre, Piazzale Roma, or Tronchetto drop-off',
        'Guidance on onward vaporetto connections',
        'Fixed price — all tolls included',
        'Professional NCC chauffeur',
        'Bottled water',
        'Flight monitoring',
      ]}
      faqs={[
        {
          q: 'Can the car take us all the way to our hotel in Venice?',
          a: "Vehicles cannot enter the historic centre of Venice — we take you to Piazzale Roma or Tronchetto, the closest point by road, from where it's typically a short walk or vaporetto ride to central hotels.",
        },
        {
          q: 'How long does the transfer from the airport take?',
          a: 'Around 20 to 30 minutes to Mestre or the Tronchetto/Piazzale Roma area, depending on traffic and your exact drop-off point.',
        },
        {
          q: 'What if our hotel is in Mestre, not the historic islands?',
          a: "We drop off directly at your hotel door in Mestre — no water taxi or vaporetto needed for mainland accommodation.",
        },
        {
          q: 'Can you also arrange onward transfers to Padua, Treviso, or Verona?',
          a: 'Yes, we operate dedicated routes to all of these from Marco Polo Airport, and can combine bookings if you have a wider itinerary.',
        },
      ]}
    />
  )
}
