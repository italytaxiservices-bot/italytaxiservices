import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Linate Airport Transfer | Private Chauffeur LIN Milan | Italy Taxi Services',
  description: 'Private NCC transfer from Milan Linate Airport (LIN). Milan city centre, business districts, Lake Como. Fixed prices, meet & greet included. Book today.',
  alternates: { canonical: '/linate-airport-transfer' },
}

const airport = getAirportByCode('LIN')!

export default function LinatePage() {
  return (
    <AirportPageTemplate
      airport={airport}
      popularDestinations={[
        { name: 'Milan City Centre', href: '/milan-chauffeur-service', time: '20–30 min', priceFrom: 65 },
        { name: 'Milan Malpensa (MXP)', href: '/malpensa-airport-transfer', time: '60 min', priceFrom: 95 },
        { name: 'Milan Central Station', href: '/milan-chauffeur-service', time: '25 min', priceFrom: 70 },
        { name: 'Bergamo (BGY Airport)', href: '/milan-chauffeur-service', time: '55 min', priceFrom: 100 },
        { name: 'Lake Como', href: '/malpensa-to-lake-como', time: '75 min', priceFrom: 150 },
        { name: 'Monza', href: '/milan-chauffeur-service', time: '35 min', priceFrom: 80 },
      ]}
      about={`Milan Linate Airport (LIN) is Milan's closest airport, located just 7 km from the city centre — making it the most convenient option for business travellers and anyone staying in central Milan. Linate mainly handles domestic and short-haul European routes.

Our private NCC transfer from Linate is ideal for: business travellers needing to reach meetings quickly, hotel guests wanting door-to-door service, and passengers connecting to Malpensa (MXP) for long-haul onward flights.

Linate is undergoing continuous modernisation — the metro extension (M4 Blue Line) now connects the airport to central Milan in under 15 minutes. However, for door-to-door service with luggage, our private NCC transfer remains the most comfortable option.`}
      tips={[
        'Linate is just 7 km from Piazza San Babila (city centre) — the transfer takes approximately 20–30 minutes, making it the fastest Milan airport for central destinations.',
        'The M4 metro (Blue Line) connects Linate to the city. Our NCC service is ideal if you have multiple bags, are heading to a specific address, or want a smoother experience.',
        'For inter-airport transfers (Linate to Malpensa for onward international flights), allow 90 minutes minimum. We recommend booking this in advance.',
        'Linate is heavily used by business travellers — departures can be busiest on Monday mornings and Friday evenings. Plan your departure transfer accordingly.',
        'Our driver meets you inside the arrivals hall with a name board. No need to find a taxi rank or navigate public transport with your luggage.',
      ]}
    />
  )
}
