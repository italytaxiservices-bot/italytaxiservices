import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Florence Airport Transfer | Peretola FLR Private Chauffeur | Italy Taxi Services',
  description: 'Private NCC transfer from Florence Peretola Airport (FLR). Florence city, Pisa, Siena, Tuscany tours. Fixed prices, meet & greet. Book today.',
  alternates: { canonical: '/florence-airport-transfer' },
}

const airport = getAirportByCode('FLR')!

export default function FlorenceAirportPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      popularDestinations={[
        { name: 'Florence City Centre', href: '/florence-chauffeur-service', time: '15–20 min', priceFrom: 55 },
        { name: 'Pisa (Leaning Tower)', href: '/florence-to-pisa', time: '60 min', priceFrom: 95 },
        { name: 'Siena', href: '/florence-chauffeur-service', time: '75 min', priceFrom: 110 },
        { name: 'San Gimignano', href: '/florence-chauffeur-service', time: '80 min', priceFrom: 120 },
        { name: 'Rome', href: '/florence-chauffeur-service', time: '2h 45min', priceFrom: 320 },
        { name: 'Chianti Wine Region', href: '/florence-chauffeur-service', time: '45 min', priceFrom: 90 },
      ]}
      about={`Florence Peretola Airport (FLR), officially named Amerigo Vespucci Airport, is located just 4 km from the historic centre of Florence — making it one of Italy's most convenient airports for central city access. The airport handles mainly domestic Italian routes and a selection of European connections.

Our private NCC transfer from Peretola is the most comfortable way to start or end your Tuscany trip. The journey to the Florence centre takes just 15–20 minutes, and we serve all destinations across Tuscany — Siena, Pisa, San Gimignano, and the Chianti wine region.

Please note: Florence's historic centre has strict ZTL (Limited Traffic Zone) restrictions. Our NCC drivers know exactly which entry points and timing rules apply — you will be dropped at your hotel with no risk of ZTL fines.`}
      tips={[
        'Peretola (FLR) is just 4 km from Piazza del Duomo. The transfer to central Florence takes 15–20 minutes — one of the shortest airport-to-centre distances in Italy.',
        "Florence's ZTL zones are strictly enforced. Our NCC drivers know the authorised routes and are registered to enter restricted areas for drop-offs. You will never be left outside the ZTL.",
        'Pisa Airport (PSA) is 90 km from Florence — about 60–75 minutes via the FI-PI-LI motorway. If you have a choice of airport, FLR is much more convenient for central Florence.',
        'Tuscany day trips from Peretola: Siena (75 min), San Gimignano (80 min), Chianti (45 min), Montepulciano (90 min). We can organise combined sightseeing transfers.',
        'Peretola has limited expansion capacity and is often busy during summer. Booking your transfer in advance guarantees a vehicle and avoids waiting at peak arrival times.',
      ]}
    />
  )
}
