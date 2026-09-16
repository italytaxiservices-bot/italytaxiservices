import type { Metadata } from 'next'
import CityPageTemplate from '@/components/templates/CityPageTemplate'
import { cities } from '@/data/cities'

export const metadata: Metadata = {
  title: 'Private Chauffeur Service Naples | NCC Naples & Amalfi',
  description: 'Private chauffeur NCC service in Naples. Capodichino airport transfers, Amalfi Coast, Positano, Sorrento, Pompeii. Fixed prices, 24/7. Book today.',
  alternates: { canonical: '/naples-chauffeur-service' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/naples-chauffeur-service',
    title: 'Private Chauffeur Service Naples | NCC Naples & Amalfi | Italy Taxi Services',
    description: 'Private chauffeur NCC service in Naples. Capodichino airport transfers, Amalfi Coast, Positano, Sorrento, Pompeii. Fixed prices, 24/7. Book today.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private Chauffeur Service Naples | NCC Naples & Amalfi | Italy Taxi Services',
    description: 'Private chauffeur NCC service in Naples. Capodichino airport transfers, Amalfi Coast, Positano, Sorrento, Pompeii. Fixed prices, 24/7. Book today.',
    images: ['/logo.webp'],
  },
}

const city = cities.find(c => c.slug === 'naples')!

export default function NaplesPage() {
  return (
    <CityPageTemplate
      city={city}
      highlights={[
        'Naples Capodichino Airport NAP',
        'Amalfi Coast — Positano, Ravello, Amalfi',
        'Pompeii & Herculaneum',
        'Cruise port & Capri ferry connections',
      ]}
      about={`Naples (Napoli) is one of Italy's most vibrant and historic cities — a UNESCO-listed historic centre, extraordinary street food, world-class museums, and the gateway to some of southern Italy's most spectacular destinations.

Our NCC chauffeur service in Naples covers the city and all surrounding areas: the Amalfi Coast (Positano, Amalfi, Ravello, Praiano), Sorrento, Pompeii, Herculaneum, and the port connections to Capri and Ischia. We also serve Naples Capodichino Airport (NAP) with professional meet & greet.

Naples has a reputation for chaotic traffic — our drivers are experienced locals who know every shortcut, including how to navigate the historic ZTL centre safely and efficiently.`}
      services={[
        { title: 'Naples Airport Transfer (NAP)', description: 'Private NCC transfer from Capodichino Airport to Naples city, Amalfi Coast, and all Campania destinations. Meet & greet included.' },
        { title: 'Amalfi Coast Transfers', description: 'Expert drivers for the scenic SS163. Positano, Amalfi, Ravello, Praiano — all destinations served from Naples.' },
        { title: 'Pompeii & Herculaneum', description: 'Day trips to the Roman archaeological sites — one of southern Italy\'s most impressive historical experiences.' },
        { title: 'Sorrento Transfers', description: 'Private NCC from Naples to Sorrento — gateway to Capri and the Amalfi Peninsula. 60 minutes from NAP airport.' },
        { title: 'Cruise Port Connections', description: 'Transfer from Naples cruise terminals (Molo Beverello, Stazione Marittima) to airport, hotels, and Campania destinations.' },
        { title: 'Capri & Ischia Ferry Links', description: 'Transfer to Naples port (Beverello or Mergellina) for hydrofoils to Capri and Ischia. We coordinate timing with your ferry.' },
      ]}
    />
  )
}
