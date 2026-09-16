import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Bologna Airport Transfer | Private Chauffeur BLQ Marconi',
  description: 'Private NCC transfer from Bologna Marconi Airport (BLQ). Bologna city €35, Florence €95, Rimini €110, Modena €55. Fixed prices, meet & greet. Book today.',
  alternates: { canonical: '/bologna-airport-transfer' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/bologna-airport-transfer',
    title: 'Bologna Airport Transfer | Private Chauffeur BLQ Marconi | Italy Taxi Services',
    description: 'Private NCC transfer from Bologna Marconi Airport (BLQ). Bologna city €35, Florence €95, Rimini €110, Modena €55. Fixed prices, meet & greet. Book today.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bologna Airport Transfer | Private Chauffeur BLQ Marconi | Italy Taxi Services',
    description: 'Private NCC transfer from Bologna Marconi Airport (BLQ). Bologna city €35, Florence €95, Rimini €110, Modena €55. Fixed prices, meet & greet. Book today.',
    images: ['/logo.webp'],
  },
}

const airport = getAirportByCode('BLQ')!

export default function BolognaAirportPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      popularDestinations={[
        { name: 'Bologna City Centre', href: '/bologna-chauffeur-service', time: '15 min', priceFrom: 35 },
        { name: 'Florence', href: '/florence-chauffeur-service', time: '75 min', priceFrom: 95 },
        { name: 'Modena', href: '/bologna-chauffeur-service', time: '35 min', priceFrom: 55 },
        { name: 'Ferrara', href: '/bologna-chauffeur-service', time: '45 min', priceFrom: 65 },
        { name: 'Rimini', href: '/bologna-chauffeur-service', time: '75 min', priceFrom: 110 },
        { name: 'Venice', href: '/venice-chauffeur-service', time: '90 min', priceFrom: 130 },
      ]}
      about={`Bologna Guglielmo Marconi Airport (BLQ) is the main airport of Emilia-Romagna, located just 6km north of Bologna city centre. Compact, efficient, and well-connected, BLQ serves as a convenient gateway to Florence, Venice, Modena (Ferrari, Lamborghini, Maserati country), and the Adriatic Riviera.

Bologna city is one of Italy's great food cities — home to tortellini, mortadella, and ragù alla bolognese. Our private NCC transfer from BLQ gets you to your hotel in under 15 minutes.

For Florence, the transfer takes about 75 minutes via the A1 motorway through the Apennine hills — a scenic drive. Modena with its Motor Valley museums (Ferrari, Lamborghini, Pagani) is 35 minutes south.`}
      tips={[
        'BLQ is just 6km from Bologna\'s historic centre and the famous porticoes — our transfer is 15 minutes, making it one of Italy\'s most convenient airports.',
        'Florence is a popular transfer destination from BLQ, approximately 75 minutes via the A1. Alternative to FLR if your flights route through Bologna.',
        'Modena is only 35 minutes from BLQ — ideal for Motor Valley tours (Ferrari Museum, Lamborghini Museum, Pagani Atelier). We can arrange day trips.',
        'The aerobus to the city centre is an option, but with luggage or a group, our private NCC is faster and more convenient.',
        'BLQ has good connections from across Europe. The compact single terminal means short walking distances from gate to arrivals.',
      ]}
    />
  )
}
