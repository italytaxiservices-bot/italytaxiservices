import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Ciampino Airport Transfer | Private Chauffeur CIA Rome',
  description: 'Private NCC transfer from Rome Ciampino Airport (CIA). Rome city centre from €55. Fixed prices, meet & greet, flight monitoring. Book today.',
  alternates: { canonical: '/ciampino-airport-transfer' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/ciampino-airport-transfer',
    title: 'Ciampino Airport Transfer | Private Chauffeur CIA Rome | Italy Taxi Services',
    description: 'Private NCC transfer from Rome Ciampino Airport (CIA). Rome city centre from €55. Fixed prices, meet & greet, flight monitoring. Book today.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ciampino Airport Transfer | Private Chauffeur CIA Rome | Italy Taxi Services',
    description: 'Private NCC transfer from Rome Ciampino Airport (CIA). Rome city centre from €55. Fixed prices, meet & greet, flight monitoring. Book today.',
    images: ['/logo.webp'],
  },
}

const airport = getAirportByCode('CIA')!

export default function CiampinoPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      popularDestinations={[
        { name: 'Rome City Centre', href: '/rome-chauffeur-service', time: '30–45 min', priceFrom: 55 },
        { name: 'Rome Termini Station', href: '/rome-chauffeur-service', time: '35 min', priceFrom: 58 },
        { name: 'Vatican City', href: '/rome-chauffeur-service', time: '40 min', priceFrom: 60 },
        { name: 'Fiumicino Airport (FCO)', href: '/fiumicino-airport-transfer', time: '50 min', priceFrom: 90 },
        { name: 'Civitavecchia Port', href: '/fiumicino-to-civitavecchia', time: '90 min', priceFrom: 140 },
        { name: 'Naples', href: '/rome-chauffeur-service', time: '2h 30min', priceFrom: 260 },
      ]}
      about={`Rome Ciampino Airport (CIA) is Rome's second airport, located 15 km south-east of the city centre. It is primarily used by low-cost carriers including Ryanair and Wizz Air, serving a large volume of tourists and budget travellers visiting Rome.

Our private NCC transfer from Ciampino offers a comfortable alternative to the crowded public buses and overpriced taxis at the airport. The fixed price includes all tolls, and the journey to Rome centre takes approximately 30–45 minutes depending on traffic.

Ciampino is notoriously busy during peak tourist season (June–September), with large volumes of Ryanair and Wizz Air arrivals. Booking a private transfer in advance ensures you step out of the terminal into a waiting, private vehicle — no queuing, no stress.`}
      tips={[
        'Ciampino is 15 km from Rome centre. The journey time is 30–45 minutes under normal conditions, but can extend to 60+ minutes during rush hours (7:30–9:30, 17:00–19:30).',
        'The official taxi rate from Ciampino to central Rome (within Aurelian walls) is a fixed €31, but only for destinations within the historical centre. Our NCC covers any Rome address at a fixed pre-agreed price.',
        'The public COTRAL bus to Anagnina metro station takes 30 minutes + metro time. Our private transfer is door-to-door with no changes.',
        'If you need to connect to Fiumicino (FCO) for an onward flight, allow at least 2 hours for the Ciampino–Fiumicino inter-airport transfer.',
        'Ciampino is militarily managed — there is limited waiting space outside. Our driver coordinates arrival timing so you are met exactly when you clear customs.',
      ]}
    />
  )
}
