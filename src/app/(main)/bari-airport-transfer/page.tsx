import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Bari Airport Transfer | Private Chauffeur BRI Karol Wojtyla',
  description: 'Private NCC transfer from Bari Karol Wojtyla Airport (BRI). Bari city €40, Alberobello €65, Matera €90, Lecce €110, Polignano €55. Fixed prices. Book today.',
  alternates: { canonical: '/bari-airport-transfer' },
}

const airport = getAirportByCode('BRI')!

export default function BariAirportPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      popularDestinations={[
        { name: 'Bari City Centre', href: '/milan-chauffeur-service', time: '20 min', priceFrom: 40 },
        { name: 'Alberobello (Trulli)', href: '/milan-chauffeur-service', time: '55 min', priceFrom: 65 },
        { name: 'Matera', href: '/milan-chauffeur-service', time: '75 min', priceFrom: 90 },
        { name: 'Polignano a Mare', href: '/milan-chauffeur-service', time: '35 min', priceFrom: 55 },
        { name: 'Lecce', href: '/milan-chauffeur-service', time: '90 min', priceFrom: 110 },
        { name: 'Ostuni (White City)', href: '/milan-chauffeur-service', time: '70 min', priceFrom: 85 },
      ]}
      about={`Bari Karol Wojtyla Airport (BRI) serves Puglia — one of Italy's most rapidly growing tourist destinations. Located 9km north-west of Bari city centre, it is the main gateway to Alberobello (UNESCO trulli), Matera (European Capital of Culture 2019), Polignano a Mare, Lecce (Baroque architecture), and the Adriatic coast.

Our private NCC transfers from BRI cover the entire Valle d'Itria and Salento region — an area characterised by white-painted villages, dry-stone walls, olive groves, and some of Italy's most dramatic coastal scenery.

Alberobello's unique trulli houses are just 55 minutes from the airport. Matera's sassi cave dwellings — one of the world's oldest continuously inhabited settlements — are 75 minutes.`}
      tips={[
        'Puglia\'s road network is good but rural. Our drivers know the local roads — especially important for reaching smaller towns like Locorotondo, Cisternino, and Ostuni.',
        'Alberobello has ZTL restrictions in the Rione Monti trulli area. Our driver will drop you at the nearest permitted point.',
        'Matera is in Basilicata (different region) but easily accessible from BRI — 75 minutes. Many travellers combine both regions in one trip.',
        'Polignano a Mare is 35 minutes from BRI and is one of Puglia\'s most photogenic towns. Worth a stop en route to your accommodation.',
        'Lecce is 90 minutes from BRI — Puglia\'s "Florence of the South." If you\'re staying in Salento, it\'s worth considering Brindisi airport (BDS) as an alternative.',
      ]}
    />
  )
}
