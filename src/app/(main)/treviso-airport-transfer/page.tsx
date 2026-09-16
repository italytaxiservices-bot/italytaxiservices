import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Treviso Airport Transfer | Private Chauffeur TSF',
  description: 'Private NCC transfer from Treviso Antonio Canova Airport (TSF). Venice €70, Treviso city €25, Padova €65, Verona €120. Fixed prices, meet & greet. Book today.',
  alternates: { canonical: '/treviso-airport-transfer' },
}

const airport = getAirportByCode('TSF')!

export default function TrevisoAirportPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      popularDestinations={[
        { name: 'Venice (Piazzale Roma)', href: '/venice-chauffeur-service', time: '35–45 min', priceFrom: 70 },
        { name: 'Treviso City Centre', href: '/venice-chauffeur-service', time: '10 min', priceFrom: 25 },
        { name: 'Padova', href: '/venice-chauffeur-service', time: '45 min', priceFrom: 65 },
        { name: 'Venice Mestre', href: '/venice-chauffeur-service', time: '25 min', priceFrom: 50 },
        { name: 'Verona', href: '/verona-airport-transfer', time: '90 min', priceFrom: 120 },
        { name: 'Cortina d\'Ampezzo', href: '/venice-chauffeur-service', time: '120 min', priceFrom: 160 },
      ]}
      about={`Treviso Antonio Canova Airport (TSF) is a secondary airport near Venice, primarily used by Ryanair for European low-cost routes. Located 4km from Treviso city and 30km from Venice, it offers an affordable entry point to the Veneto region.

Our private NCC transfer from TSF covers Venice (Piazzale Roma), Venice Mestre, Treviso city, Padova, and destinations beyond. Venice is 35–45 minutes depending on traffic — and our driver goes directly to Piazzale Roma, the last road point before the lagoon.

Treviso itself is a charming medieval town often overlooked by tourists — worth a visit before heading to Venice.`}
      tips={[
        'Venice historic centre is car-free — our transfer brings you to Piazzale Roma, the closest point by road. From there, take a vaporetto or arrange a water taxi.',
        'TSF is primarily a Ryanair hub. Flights to European destinations are frequent and often cheaper than Venice Marco Polo (VCE).',
        'Treviso city centre is just 10 minutes and €25 — a great base for exploring the Veneto, with easy train connections to Venice.',
        'For Cortina d\'Ampezzo and the Dolomites, TSF is a useful gateway — approximately 2 hours by private transfer.',
        'Venice water taxis from the vaporetto stops are expensive. A private transfer to Piazzale Roma + vaporetto is often more economical.',
      ]}
    />
  )
}
