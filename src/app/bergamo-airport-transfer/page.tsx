import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Bergamo Airport Transfer | Private Chauffeur BGY Orio al Serio | Italy Chauffeur',
  description: 'Private NCC transfer from Bergamo Orio al Serio Airport (BGY). Milan from €90, Lake Como €130, Brescia €80. Fixed prices, meet & greet. Book today.',
}

const airport = getAirportByCode('BGY')!

export default function BergamoAirportPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      popularDestinations={[
        { name: 'Milan City Centre', href: '/milan-chauffeur-service', time: '50–65 min', priceFrom: 90 },
        { name: 'Milan Malpensa (MXP)', href: '/malpensa-airport-transfer', time: '60 min', priceFrom: 100 },
        { name: 'Bergamo City', href: '/milan-chauffeur-service', time: '15 min', priceFrom: 40 },
        { name: 'Lake Como', href: '/malpensa-to-lake-como', time: '80 min', priceFrom: 140 },
        { name: 'Brescia', href: '/milan-chauffeur-service', time: '45 min', priceFrom: 80 },
        { name: 'Lake Garda', href: '/milan-chauffeur-service', time: '75 min', priceFrom: 120 },
      ]}
      about={`Bergamo Orio al Serio Airport (BGY) is one of Italy's busiest low-cost hubs, handling over 15 million passengers a year — primarily Ryanair flights from across Europe. Despite being named Milan Bergamo by Ryanair, it is actually located 45km from Milan city centre and just 5km from Bergamo's stunning upper city.

Our private NCC transfer from BGY covers all key destinations: Milan city centre, Milan Malpensa for connecting flights, Lake Como, Lake Garda, Brescia, and Bergamo city itself.

The airport has a single terminal with clear arrivals signage. Our driver meets you in the arrivals hall with a name board. Unlike the shared bus services to Milan, our private transfer takes you directly to your exact destination — hotel, office, or address — with no waiting for other passengers.`}
      tips={[
        'BGY is marketed as "Milan Bergamo" by Ryanair but is 45km from Milan. Our transfer to Milan city centre takes 50–65 minutes via the A4 motorway.',
        'Bergamo\'s beautiful upper city (Città Alta) is just 5km from the airport. If you\'re staying in Bergamo rather than Milan, transfer time is only 15 minutes.',
        'For connections to Malpensa (MXP) for long-haul flights, allow at least 90 minutes plus security. We recommend booking the transfer well in advance.',
        'BGY has very limited official taxi availability — private NCC transfers booked in advance are the most reliable option, especially late at night.',
        'The airport has no direct train or metro link to Milan. The bus takes 60+ minutes. Our private transfer is the most efficient option.',
      ]}
    />
  )
}
