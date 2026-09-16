import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Catania Airport Transfer | Private Chauffeur CTA Fontanarossa',
  description: 'Private NCC transfer from Catania Fontanarossa Airport (CTA). Catania €35, Taormina €65, Syracuse €70, Etna €80. Fixed prices, meet & greet. Book today.',
  alternates: { canonical: '/catania-airport-transfer' },
}

const airport = getAirportByCode('CTA')!

export default function CataniaAirportPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      popularDestinations={[
        { name: 'Catania City Centre', href: '/milan-chauffeur-service', time: '15 min', priceFrom: 35 },
        { name: 'Taormina', href: '/milan-chauffeur-service', time: '55 min', priceFrom: 65 },
        { name: 'Syracuse (Siracusa)', href: '/milan-chauffeur-service', time: '60 min', priceFrom: 70 },
        { name: 'Mount Etna', href: '/milan-chauffeur-service', time: '50 min', priceFrom: 80 },
        { name: 'Ragusa / Ibla', href: '/milan-chauffeur-service', time: '90 min', priceFrom: 100 },
        { name: 'Agrigento (Valley of Temples)', href: '/milan-chauffeur-service', time: '120 min', priceFrom: 130 },
      ]}
      about={`Catania Fontanarossa Airport (CTA) is Sicily's busiest airport, handling over 12 million passengers a year. Located just 7km south of Catania city centre, it is the main gateway to eastern Sicily — including Taormina, Mount Etna, Syracuse, and the Baroque towns of the Val di Noto.

Our private NCC transfers from CTA cover all key Sicilian destinations. Taormina — perched dramatically above the Ionian Sea — is 55 minutes north. Syracuse, with its extraordinary Greek and Roman heritage, is 60 minutes south.

Mount Etna, one of Europe's most active volcanoes, is approximately 50 minutes from the airport. We offer full-day Etna tours with driver included.`}
      tips={[
        'Taormina has very limited parking and strict ZTL restrictions. Our driver knows the authorised drop-off points in the historic centre.',
        'Mount Etna excursions are best arranged as a full day with driver waiting. The summit area (Rifugio Sapienza) is the typical base — 50 minutes from CTA.',
        'Syracuse\'s Ortigia island has ZTL restrictions. Our driver will arrange the closest permitted drop-off to your accommodation.',
        'CTA is a busy airport with good taxi availability, but unlicensed taxis operate around airports. Our pre-booked NCC guarantees a fixed price and legal service.',
        'For Agrigento and the Valley of the Temples, consider an overnight — the drive is 2 hours. We can arrange a one-way transfer with a pick-up from Palermo (PMO).',
      ]}
    />
  )
}
