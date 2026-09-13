import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Cagliari Airport Transfer | Private Chauffeur CAG Elmas | Italy Taxi Services',
  description: 'Private NCC transfer from Cagliari Elmas Airport (CAG). Cagliari city €35, Villasimius €60, Pula €50, Costa Rei €80. Fixed prices, meet & greet. Book today.',
  alternates: { canonical: '/cagliari-airport-transfer' },
}

const airport = getAirportByCode('CAG')!

export default function CagliariAirportPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      popularDestinations={[
        { name: 'Cagliari City Centre', href: '/milan-chauffeur-service', time: '10–15 min', priceFrom: 35 },
        { name: 'Villasimius', href: '/milan-chauffeur-service', time: '50 min', priceFrom: 60 },
        { name: 'Pula / Nora', href: '/milan-chauffeur-service', time: '40 min', priceFrom: 50 },
        { name: 'Costa Rei', href: '/milan-chauffeur-service', time: '70 min', priceFrom: 80 },
        { name: 'Sant\'Antioco Island', href: '/milan-chauffeur-service', time: '80 min', priceFrom: 90 },
        { name: 'Chia Beach', href: '/milan-chauffeur-service', time: '45 min', priceFrom: 55 },
      ]}
      about={`Cagliari Elmas Airport (CAG) is Sardinia's main airport, located just 7km north of Cagliari city centre. It serves as the gateway to southern Sardinia — including the crystal waters of Villasimius, the Roman ruins at Nora, and some of Italy's finest unspoilt beaches.

Our private NCC transfers from CAG cover Cagliari city, Villasimius, Pula, Costa Rei, Chia, and the island of Sant'Antioco. Southern Sardinia has a distinct character from the Costa Smeralda north — quieter, more authentic, with dramatically beautiful coastline.

Cagliari city centre is just 10–15 minutes from the airport — one of Italy's shortest airport-to-city transfers.`}
      tips={[
        'Cagliari city centre is exceptionally close to the airport — 10 minutes. The historic Castello quarter, Roman amphitheatre, and waterfront are all easily reached.',
        'Villasimius and its beaches (Spiaggia del Riso, Campus beach) are 50 minutes east — popular summer destination with limited taxi availability.',
        'For beach resorts, book transfers in advance during July–August. Local taxi availability is limited outside Cagliari city.',
        'Chia beach in the south-west (45 minutes) has some of Sardinia\'s most beautiful white sand dunes and turquoise water.',
        'Sant\'Antioco is connected to the mainland by a Roman-era causeway — our transfer drives directly onto the island, no ferry needed.',
      ]}
    />
  )
}
