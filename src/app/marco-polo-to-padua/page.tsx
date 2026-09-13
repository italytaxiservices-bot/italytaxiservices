import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Marco Polo to Padua Transfer | Private Chauffeur | Italy Taxi Services',
  description: 'Private NCC transfer from Venice Marco Polo Airport to Padua. From €80. Professional chauffeur, fixed price, meet & greet. Book today.',
  alternates: { canonical: '/marco-polo-to-padua' },
}

const route = getRouteBySlug('marco-polo-to-padua')!

export default function MarcoPoloToPaduaPage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`Padua (Padova) sits just 45km from Venice Marco Polo Airport, and a private chauffeur transfer via the A4 motorway takes only 40–55 minutes — quicker and more direct than the train, which requires getting from the airport into Venice first before backtracking to Padua.

This route is used by business travellers visiting Padua's university and its many companies in the surrounding industrial zone, as well as leisure travellers heading to see Giotto's frescoes in the Scrovegni Chapel or the Basilica of St. Anthony. Padua also makes a convenient, quieter base for exploring the wider Veneto region without staying in busier and pricier Venice.

We drop off directly at your hotel or office address in Padua, with no need to navigate Venice's traffic-restricted zones or parking.`}
      included={[
        'Meet & greet at Marco Polo arrivals',
        'Direct transfer via the A4 motorway',
        'Hotel or office drop-off',
        'Flight monitoring for delays',
        'Fixed price — all tolls included',
        'Professional NCC chauffeur',
        'Bottled water',
        '24/7 availability',
      ]}
      faqs={[
        {
          q: 'How long does the transfer from Marco Polo Airport to Padua take?',
          a: 'Around 40 to 55 minutes via the A4 motorway under normal traffic conditions.',
        },
        {
          q: 'Is this faster than taking the train from the airport?',
          a: 'Usually yes — the train requires travelling into Venice first before connecting to Padua, while a private transfer goes directly via motorway.',
        },
        {
          q: 'Can you drop us at a specific business address, not just a hotel?',
          a: 'Yes, we regularly serve business travellers and can drop off at any address in Padua or the surrounding industrial areas.',
        },
        {
          q: 'Do you offer the reverse route, Padua to Marco Polo Airport?',
          a: 'Yes, we operate this route in both directions at the same fixed price, including early morning departures for flights.',
        },
      ]}
    />
  )
}
