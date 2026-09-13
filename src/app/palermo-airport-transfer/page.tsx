import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Palermo Airport Transfer | Private Chauffeur PMO Falcone-Borsellino',
  description: 'Private NCC transfer from Palermo Falcone-Borsellino Airport (PMO). Palermo €55, Cefalù €60, Agrigento €90, Trapani €70. Fixed prices, meet & greet. Book today.',
  alternates: { canonical: '/palermo-airport-transfer' },
}

const airport = getAirportByCode('PMO')!

export default function PalermoAirportPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      popularDestinations={[
        { name: 'Palermo City Centre', href: '/milan-chauffeur-service', time: '35–45 min', priceFrom: 55 },
        { name: 'Cefalù', href: '/milan-chauffeur-service', time: '50 min', priceFrom: 60 },
        { name: 'Agrigento (Valley of Temples)', href: '/milan-chauffeur-service', time: '100 min', priceFrom: 90 },
        { name: 'Trapani', href: '/milan-chauffeur-service', time: '60 min', priceFrom: 70 },
        { name: 'Mondello Beach', href: '/milan-chauffeur-service', time: '45 min', priceFrom: 60 },
        { name: 'Monreale', href: '/milan-chauffeur-service', time: '35 min', priceFrom: 50 },
      ]}
      about={`Palermo Falcone-Borsellino Airport (PMO) serves western Sicily and is named after the two anti-Mafia judges assassinated in 1992. The airport is located 35km west of Palermo city centre — the longest airport-to-city transfer of any major Sicilian airport.

Our private NCC transfers from PMO cover Palermo city, Cefalù (famous for its Norman Cathedral and beach), Agrigento's Valley of the Temples, Trapani, and Mondello beach.

Palermo is one of Italy's most vibrant and underrated cities — a rich mix of Norman, Arab, and Baroque architecture, outstanding street food, and a genuine Sicilian character. Our driver gets you to the city centre in 35–45 minutes.`}
      tips={[
        'PMO is 35km from Palermo city centre — one of the longer airport-to-city distances in Italy. Allow 35–45 minutes without traffic, longer in peak hours.',
        'Cefalù is only 50 minutes from the airport — popular as a first stop before heading to Palermo, or as a base for the northern Sicilian coast.',
        'The Valley of the Temples at Agrigento is 100 minutes from PMO — best as a dedicated day trip with your driver waiting.',
        'Trapani is 60 minutes west of PMO — from there, hydrofoils connect to the Egadi Islands (Favignana, Levanzo) during summer.',
        'PMO has a shuttle bus to Palermo city (Trinacria Express train), but with luggage or a group, our private NCC is significantly more comfortable.',
      ]}
    />
  )
}
