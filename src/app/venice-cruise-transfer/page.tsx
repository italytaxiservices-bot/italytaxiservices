import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Venice Cruise Port Transfer | Private Chauffeur | Italy Taxi Services',
  description: 'Private transfer from Venice Marco Polo Airport to the Venice cruise terminal. From €65. Direct NCC service for cruise passengers. Book today.',
  alternates: { canonical: '/venice-cruise-transfer' },
}

const route = getRouteBySlug('venice-cruise-transfer')!

export default function VeniceCruiseTransferPage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`Venice's cruise terminals — Marittima and the Tronchetto car and coach terminal — sit at the edge of the historic islands, roughly 15km from Marco Polo Airport. Since no cars can enter central Venice, a private chauffeur transfer drops you as close as road access allows, with your driver helping transfer luggage to the terminal or the connecting water taxi if needed.

This is one of our most requested routes given how many major cruise lines — MSC, Costa, Norwegian, Royal Caribbean, and others — use Venice as a home port. Timing matters more here than on most routes: cruise embarkation windows and flight schedules are both fixed, so we build in buffer time and track your flight in real time to adjust the pickup automatically if it's delayed.

We offer the Mercedes V-Class for groups with heavy cruise luggage, and can also arrange the return leg — cruise terminal to airport — for your journey home.`}
      included={[
        'Meet & greet at Marco Polo arrivals',
        'Direct transfer to Marittima or Tronchetto',
        'Large vehicles for cruise luggage',
        'Live flight monitoring and delay buffer',
        'Fixed price — all tolls included',
        'Professional NCC chauffeur',
        'Return (port-to-airport) transfers available',
        'Early morning and late departures',
      ]}
      faqs={[
        {
          q: 'Which cruise terminal do you serve — Marittima or Tronchetto?',
          a: "Both. Tell us your cruise line and terminal when booking (it's usually printed on your cruise documents) and we'll confirm the exact drop-off point.",
        },
        {
          q: 'How much luggage can the vehicle take?',
          a: "Our standard sedans handle 2–3 large suitcases comfortably. For larger groups or more luggage, we recommend the Mercedes V-Class — let us know your group size and luggage when booking.",
        },
        {
          q: 'What if our flight is delayed and we risk missing the ship?',
          a: 'We monitor your flight in real time and adjust the pickup accordingly at no extra charge. For very tight connections, let us know in advance so we can plan the fastest possible route.',
        },
        {
          q: 'Do you also transfer from the cruise terminal back to the airport?',
          a: 'Yes, we offer the return route at the end of your cruise at the same fixed price — just book both legs in advance if you know your dates.',
        },
      ]}
    />
  )
}
