import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Genoa Airport Transfer | Private Chauffeur GOA | Italy Taxi Services',
  description: 'Private NCC transfer from Genoa Cristoforo Colombo Airport (GOA). Genoa city €40, Portofino €65, Cinque Terre €90, Santa Margherita €60. Fixed prices. Book today.',
  alternates: { canonical: '/genoa-airport-transfer' },
}

const airport = getAirportByCode('GOA')!

export default function GenoaAirportPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      popularDestinations={[
        { name: 'Genoa City Centre', href: '/milan-chauffeur-service', time: '15 min', priceFrom: 40 },
        { name: 'Portofino', href: '/milan-chauffeur-service', time: '50 min', priceFrom: 65 },
        { name: 'Santa Margherita Ligure', href: '/milan-chauffeur-service', time: '45 min', priceFrom: 60 },
        { name: 'Cinque Terre (La Spezia)', href: '/milan-chauffeur-service', time: '80 min', priceFrom: 90 },
        { name: 'Rapallo', href: '/milan-chauffeur-service', time: '40 min', priceFrom: 55 },
        { name: 'Milan', href: '/milan-chauffeur-service', time: '90 min', priceFrom: 130 },
      ]}
      about={`Genoa Cristoforo Colombo Airport (GOA) is one of Italy's most unique airports — built on a sea platform jutting into the Ligurian Sea, 6km west of Genoa city centre. It serves the Italian Riviera, Cinque Terre, Portofino, and connections to Milan.

Our private NCC transfers from GOA cover the entire Italian Riviera: Genoa, Portofino, Santa Margherita Ligure, Rapallo, Camogli, and the Cinque Terre (via La Spezia). All are within 90 minutes.

Portofino is one of Italy's most exclusive destinations — a small fishing village turned luxury retreat. Our driver knows the narrow approach roads and seasonal access restrictions.`}
      tips={[
        'Genoa city centre is just 15 minutes from GOA — one of the shortest airport-to-city transfers in Italy.',
        'Portofino has no direct road access for standard vehicles in peak season (April–October). Our drivers know the authorised approach via Santa Margherita.',
        'Cinque Terre is best accessed via La Spezia — approximately 80 minutes from GOA. From La Spezia, local trains connect all five villages.',
        'The airport is compact with limited taxi availability. Pre-booking an NCC transfer is especially important at GOA.',
        'Milan is 90 minutes via the A7 motorway — a practical alternative to flying into Milan if Genoa flights suit your schedule better.',
      ]}
    />
  )
}
