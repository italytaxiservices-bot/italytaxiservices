import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'
import { JsonLd, taxiServiceSchema, breadcrumbSchema } from '@/components/seo/JsonLd'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Naples Airport Transfer | Private Chauffeur NAP',
  description: 'Naples Airport (NAP) private transfer. From €60 Naples · €140 Sorrento · €145 Positano · €165 Amalfi. Meet & greet, no hidden fees. Fixed price — book now.',
  alternates: { canonical: '/naples-airport-transfer' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/naples-airport-transfer',
    title: 'Naples Airport Transfer | Private Chauffeur NAP | Italy Taxi Services',
    description: 'Naples Airport (NAP) private transfer. From €60 Naples · €140 Sorrento · €145 Positano · €165 Amalfi. Meet & greet, no hidden fees. Fixed price — book now.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naples Airport Transfer | Private Chauffeur NAP | Italy Taxi Services',
    description: 'Naples Airport (NAP) private transfer. From €60 Naples · €140 Sorrento · €145 Positano · €165 Amalfi. Meet & greet, no hidden fees. Fixed price — book now.',
    images: ['/logo.webp'],
  },
}

const airport = getAirportByCode('NAP')!

export default function NaplesAirportPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      popularDestinations={[
        { name: 'Naples City Centre', href: '/naples-chauffeur-service', time: '20–30 min', priceFrom: 60 },
        { name: 'Pompeii', href: '/naples-chauffeur-service', time: '40 min', priceFrom: 80 },
        { name: 'Sorrento', href: '/naples-chauffeur-service', time: '60 min', priceFrom: 140 },
        { name: 'Positano', href: '/naples-chauffeur-service', time: '80 min', priceFrom: 145 },
        { name: 'Amalfi', href: '/naples-chauffeur-service', time: '90 min', priceFrom: 165 },
        { name: 'Ravello', href: '/naples-chauffeur-service', time: '100 min', priceFrom: 175 },
      ]}
      about={`Naples International Airport — Capodichino (NAP) is the main gateway to southern Italy and the Campania region. Located just 7km from Naples city centre, it is the closest major Italian airport to the Amalfi Coast, Sorrento, Pompeii, and Capri.

Our private NCC transfers from Naples Airport cover the most scenic routes in southern Italy: Naples city, Pompeii archaeological site, Sorrento, Positano, Amalfi, and Ravello. All destinations include a professional driver familiar with the narrow roads of the Amalfi Coast.

Naples city centre is just 20–30 minutes by private transfer. For the Amalfi Coast, expect 80–100 minutes depending on traffic and the specific town. Summer weekends can add 20–30 minutes to Amalfi Coast journeys.`}
      tips={[
        'Naples Airport is just 7km from the historic centre (Spaccanapoli, Piazza del Plebiscito). Our transfer is faster and safer than unlicensed taxis at the airport.',
        'For the Amalfi Coast, our drivers are experienced on the SS163 coastal road — essential for the narrow, winding route through Positano, Amalfi, and Ravello.',
        'Pompeii is only 40 minutes from the airport — popular as a first stop before heading to your accommodation.',
        'The official taxi rate in Naples is subject to ongoing changes. Pre-booked NCC at a fixed price guarantees you pay what was agreed before the journey.',
        'For Capri, we transfer you to the Naples port (Molo Beverello or Mergellina) from where ferries and hydrofoils depart regularly.',
      ]}
      faqs={[
        { q: 'How much is a transfer from Naples Airport to the Amalfi Coast?', a: 'A fixed-price private transfer from Naples Airport (NAP) to Positano or Amalfi starts from around €120–130, depending on your exact destination. The price is agreed before you travel and includes tolls.' },
        { q: 'How do I get from Naples Airport to Sorrento or Positano?', a: 'The quickest and most comfortable way is a private transfer directly to your hotel — about 60–75 minutes to Sorrento and 75–90 minutes to Positano along the SS163 coastal road. No train changes or crowded buses.' },
        { q: 'Can you take me from Naples Airport to Pompeii?', a: 'Yes. Pompeii is about 30–40 minutes from Naples Airport and is a popular stop on the way to the Amalfi Coast or Sorrento. We can drop you at the site entrance or build it into your transfer.' },
        { q: 'How far is Naples Airport from the city centre?', a: 'Naples Capodichino Airport (NAP) is just 7 km from the city centre — about 15–20 minutes by private transfer, one of the shortest airport-to-city connections in Italy.' },
        { q: 'Do you serve the ferry ports for Capri and Ischia?', a: 'Yes. We transfer directly to Naples\' Molo Beverello and Calata di Massa ferry terminals for Capri, Ischia and Procida connections.' },
      ]}
    />
  )
}
