import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Naples Airport Transfer | Private Chauffeur NAP',
  description: 'Private NCC transfer from Naples Capodichino Airport (NAP). Naples €45, Pompeii €55, Amalfi Coast €130, Sorrento €90, Positano €120. Fixed prices. Book today.',
  alternates: { canonical: '/naples-airport-transfer' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/naples-airport-transfer',
    title: 'Naples Airport Transfer | Private Chauffeur NAP | Italy Taxi Services',
    description: 'Private NCC transfer from Naples Capodichino Airport (NAP). Naples €45, Pompeii €55, Amalfi Coast €130, Sorrento €90, Positano €120. Fixed prices. Book today.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naples Airport Transfer | Private Chauffeur NAP | Italy Taxi Services',
    description: 'Private NCC transfer from Naples Capodichino Airport (NAP). Naples €45, Pompeii €55, Amalfi Coast €130, Sorrento €90, Positano €120. Fixed prices. Book today.',
    images: ['/logo.webp'],
  },
}

const airport = getAirportByCode('NAP')!

export default function NaplesAirportPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      popularDestinations={[
        { name: 'Naples City Centre', href: '/naples-chauffeur-service', time: '20–30 min', priceFrom: 45 },
        { name: 'Pompeii', href: '/naples-chauffeur-service', time: '40 min', priceFrom: 55 },
        { name: 'Sorrento', href: '/naples-chauffeur-service', time: '60 min', priceFrom: 90 },
        { name: 'Positano', href: '/naples-chauffeur-service', time: '80 min', priceFrom: 120 },
        { name: 'Amalfi', href: '/naples-chauffeur-service', time: '90 min', priceFrom: 130 },
        { name: 'Ravello', href: '/naples-chauffeur-service', time: '100 min', priceFrom: 145 },
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
    />
  )
}
