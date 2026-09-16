import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Olbia Airport Transfer | Private Chauffeur OLB Costa Smeralda',
  description: 'Private NCC transfer from Olbia Costa Smeralda Airport (OLB). Porto Cervo €80, Olbia €35, Porto Rotondo €60, La Maddalena €70. Fixed prices. Book today.',
  alternates: { canonical: '/olbia-airport-transfer' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/olbia-airport-transfer',
    title: 'Olbia Airport Transfer | Private Chauffeur OLB Costa Smeralda | Italy Taxi Services',
    description: 'Private NCC transfer from Olbia Costa Smeralda Airport (OLB). Porto Cervo €80, Olbia €35, Porto Rotondo €60, La Maddalena €70. Fixed prices. Book today.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Olbia Airport Transfer | Private Chauffeur OLB Costa Smeralda | Italy Taxi Services',
    description: 'Private NCC transfer from Olbia Costa Smeralda Airport (OLB). Porto Cervo €80, Olbia €35, Porto Rotondo €60, La Maddalena €70. Fixed prices. Book today.',
    images: ['/logo.webp'],
  },
}

const airport = getAirportByCode('OLB')!

export default function OlbiaAirportPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      popularDestinations={[
        { name: 'Porto Cervo', href: '/milan-chauffeur-service', time: '30 min', priceFrom: 80 },
        { name: 'Olbia City', href: '/milan-chauffeur-service', time: '10 min', priceFrom: 35 },
        { name: 'Porto Rotondo', href: '/milan-chauffeur-service', time: '25 min', priceFrom: 60 },
        { name: 'Arzachena', href: '/milan-chauffeur-service', time: '20 min', priceFrom: 50 },
        { name: 'La Maddalena (port)', href: '/milan-chauffeur-service', time: '40 min', priceFrom: 70 },
        { name: 'Palau (ferry to La Maddalena)', href: '/milan-chauffeur-service', time: '35 min', priceFrom: 65 },
      ]}
      about={`Olbia Costa Smeralda Airport (OLB) is the main gateway to north-east Sardinia and the exclusive Costa Smeralda — one of the Mediterranean's most glamorous resort areas. The airport is located just 4km from Olbia city and 30 minutes from Porto Cervo.

During summer (June–September), OLB is one of Italy's busiest airports with direct flights from major European cities. Our private NCC transfers reach Porto Cervo and the Costa Smeralda hotels in 25–35 minutes.

The Costa Smeralda was developed in the 1960s by the Aga Khan and remains a byword for luxury — home to world-class yachts, beach clubs, and high-end villas. Our fleet is suited to the clientele: immaculate premium vehicles driven by professional, discreet chauffeurs.`}
      tips={[
        'Porto Cervo and the Costa Smeralda hotels are just 25–35 minutes from OLB. Our transfers meet clients directly in the arrivals hall with a name board.',
        'Summer demand at OLB is very high — especially July and August. Book your transfer as early as possible. We operate 24/7 including late-night arrivals.',
        'La Maddalena Archipelago is reached via the ferry from Palau port — our transfer brings you directly to the Palau ferry terminal (35 minutes).',
        'Many large yachts moor at Porto Cervo or Portisco. Our drivers are familiar with all marina drop-off points across the Costa Smeralda.',
        'Sardinia\'s roads are scenic but often narrow and winding. Our drivers know the local roads — particularly the coastal routes of Gallura.',
      ]}
    />
  )
}
