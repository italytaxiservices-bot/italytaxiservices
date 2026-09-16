import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Fiumicino to Tivoli Transfer | Private Chauffeur',
  description: "Private NCC transfer from Fiumicino Airport to Tivoli. From €120. Villa d'Este, Hadrian's Villa. Professional chauffeur. Book today.",
  alternates: { canonical: '/fiumicino-to-tivoli' },
}

const route = getRouteBySlug('fiumicino-to-tivoli')!

export default function FiumicinoToTivoliPage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`Tivoli sits about 90km northeast of Fiumicino Airport, on the opposite side of Rome — a route that public transport handles poorly, usually requiring a train into central Rome followed by a bus or regional train back out. A private chauffeur transfer takes 70–90 minutes by bypassing central Rome traffic entirely, going directly to your hotel or straight to one of Tivoli's two UNESCO World Heritage sites.

Villa d'Este, with its Renaissance gardens and hundreds of fountains, and Hadrian's Villa, the sprawling 2nd-century imperial retreat, are the main draws — many visitors arrange a direct transfer from the airport straight to the sites with luggage stored in the vehicle, followed by a separate transfer on to their Rome hotel afterwards.

This route works equally well as a direct arrival transfer for guests staying in Tivoli itself, or as a day-trip pickup for those based in central Rome who'd rather not deal with parking or public transport connections.`}
      included={[
        'Meet & greet at Fiumicino arrivals',
        'Direct route bypassing central Rome',
        "Villa d'Este or Hadrian's Villa drop-off",
        'Luggage storage for day-trip itineraries',
        'Fixed price — all tolls included',
        'Professional NCC chauffeur',
        'Bottled water',
        'Flight monitoring',
      ]}
      faqs={[
        {
          q: 'How long does the transfer from Fiumicino to Tivoli take?',
          a: 'Approximately 70 to 90 minutes, depending on traffic conditions around Rome.',
        },
        {
          q: 'Can we visit both Villa d\'Este and Hadrian\'s Villa in one trip?',
          a: 'Yes, though the sites are a short drive apart in Tivoli itself. Let us know your itinerary when booking so we can plan timing and any waiting time between stops.',
        },
        {
          q: 'Can you store our luggage while we visit the sites?',
          a: 'Yes, for day-trip bookings we can keep luggage secured in the vehicle while you visit, then continue on to your Rome hotel afterwards.',
        },
        {
          q: 'Do you also offer transfers from central Rome to Tivoli?',
          a: 'Yes, this is a popular day-trip route from Rome hotels as well as directly from the airport.',
        },
      ]}
    />
  )
}
