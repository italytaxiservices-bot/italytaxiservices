import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Pisa Airport Transfer | Private Chauffeur PSA Galileo Galilei',
  description: 'Private NCC transfer from Pisa Galileo Galilei Airport (PSA). Florence from €95, Pisa city €30, Siena €130, Cinque Terre €120. Fixed prices. Book today.',
  alternates: { canonical: '/pisa-airport-transfer' },
}

const airport = getAirportByCode('PSA')!

export default function PisaAirportPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      popularDestinations={[
        { name: 'Florence City', href: '/florence-chauffeur-service', time: '60–75 min', priceFrom: 95 },
        { name: 'Pisa City Centre', href: '/florence-chauffeur-service', time: '10 min', priceFrom: 30 },
        { name: 'Siena', href: '/florence-chauffeur-service', time: '90 min', priceFrom: 130 },
        { name: 'Lucca', href: '/florence-chauffeur-service', time: '25 min', priceFrom: 50 },
        { name: 'Cinque Terre', href: '/florence-chauffeur-service', time: '90 min', priceFrom: 120 },
        { name: 'Florence Airport (FLR)', href: '/florence-airport-transfer', time: '60 min', priceFrom: 90 },
      ]}
      about={`Pisa Galileo Galilei Airport (PSA) is the main gateway to Tuscany for many travellers, serving Florence, Pisa, Lucca, Siena, and the Cinque Terre. The airport is located just 2km from the Leaning Tower of Pisa and 80km west of Florence.

Our private NCC transfer from PSA connects you directly to all Tuscan destinations. Many travellers combine a stop at the Leaning Tower with their transfer to Florence — we can arrange this as a flexible route.

The airport is compact and easy to navigate. Our driver meets you in the arrivals area. Florence is approximately 60–75 minutes via the FI-PI-LI motorway.`}
      tips={[
        'Pisa Airport is walking distance from the Leaning Tower (15 minutes on foot). Ask us to include a Piazza dei Miracoli stop en route to Florence.',
        'Florence is the primary destination from PSA — the journey via the A11 or FI-PI-LI motorway takes 60–75 minutes depending on traffic.',
        'Lucca is only 25 minutes from PSA — a very popular stop for travellers heading into Tuscany.',
        'For Cinque Terre, PSA is actually closer than Florence Airport. Transfer time is around 90 minutes via the A12 motorway.',
        'The train to Florence from Pisa takes about 60 minutes but requires a change at Pisa Centrale station. Our door-to-door transfer is more convenient with luggage.',
      ]}
    />
  )
}
