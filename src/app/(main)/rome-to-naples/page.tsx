import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Rome to Naples Private Transfer | Chauffeur Service',
  description: 'Rated 4.9★ · Rome to Naples private transfer. From €260. Door-to-door in 2.5 hrs — no train changes. Licensed NCC chauffeur. Fixed price, no hidden fees. Instant quote.',
  alternates: { canonical: '/rome-to-naples' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/rome-to-naples',
    title: 'Rome to Naples Private Transfer | Chauffeur Service | Italy Taxi Services',
    description: 'Rated 4.9★ · Rome to Naples private transfer. From €260. Door-to-door in 2.5 hrs — no train changes. Licensed NCC chauffeur. Fixed price, no hidden fees. Instant quote.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rome to Naples Private Transfer | Chauffeur Service | Italy Taxi Services',
    description: 'Rated 4.9★ · Rome to Naples private transfer. From €260. Door-to-door in 2.5 hrs — no train changes. Licensed NCC chauffeur. Fixed price, no hidden fees. Instant quote.',
    images: ['/logo.webp'],
  },
}

const route = getRouteBySlug('rome-to-naples')!

export default function RomeNaplesPage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`The Rome to Naples private transfer covers 225km of Italian motorway — primarily the A1 (Autostrada del Sole) south through Lazio and into Campania. The journey takes approximately 2–2.5 hours under normal conditions.

Naples is one of Italy's most compelling cities — chaotic, passionate, and unforgettable. Beyond the city itself, Naples is the gateway to the Amalfi Coast, Sorrento, Pompeii, Herculaneum, and the islands of Capri and Ischia. Our private transfer drops you directly at your hotel or address.

Compared to the Frecciarossa train (60–70 minutes station to station but requiring taxi rides at each end), private transfer is often preferable for families, travellers with luggage, or those heading directly to coastal resorts beyond Naples city.`}
      included={[
        'Door-to-door Rome to Naples',
        'Direct route via A1 motorway',
        'Hotel, cruise port, or any Naples address',
        'Comfortable long-distance vehicle',
        'Fixed price — tolls included',
        'Professional NCC chauffeur',
        'Bottled water and refreshments',
        'Onward connections to Amalfi Coast available',
      ]}
      faqs={[
        { q: 'Can I continue from Naples to the Amalfi Coast?', a: 'Yes. We can continue from Naples to Positano, Amalfi, Ravello, or Sorrento after your Rome pickup. The combined Rome to Amalfi Coast transfer takes approximately 3–3.5 hours. Please specify your final destination when booking.' },
        { q: 'How does it compare to the high-speed train?', a: 'The Frecciarossa Rome–Naples takes 70 minutes (Termini to Napoli Centrale). However, private transfer is door-to-door — no taxis to/from train stations. For hotels not near the station, or with heavy luggage, private transfer is often faster overall.' },
        { q: 'Can you pick up from Fiumicino Airport instead of Rome centre?', a: 'Yes. We offer a direct Fiumicino to Naples transfer (slightly longer — 2.5–3 hours via A1). Great for arriving international passengers who want to skip Rome entirely.' },
        { q: 'What time should I book for the transfer?', a: 'Rome to Naples takes 2–2.5 hours. Traffic on the A1 near Rome can add 30–45 minutes in peak hours (7:30–9:30 and 17:00–19:30). We recommend allowing extra time if you have a connection in Naples.' },
      ]}
    />
  )
}
