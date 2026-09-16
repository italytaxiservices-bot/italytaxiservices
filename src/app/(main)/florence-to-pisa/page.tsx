import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Florence to Pisa Transfer | Private Chauffeur',
  description: 'Private transfer from Florence to Pisa. From €95. Day trips and one-way transfers. NCC chauffeur service. Book today.',
  alternates: { canonical: '/florence-to-pisa', languages: { en: '/florence-to-pisa', it: '/it/firenze-pisa', 'x-default': '/florence-to-pisa' } },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/florence-to-pisa',
    title: 'Florence to Pisa Transfer | Private Chauffeur | Italy Taxi Services',
    description: 'Private transfer from Florence to Pisa. From €95. Day trips and one-way transfers. NCC chauffeur service. Book today.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Florence to Pisa Transfer | Private Chauffeur | Italy Taxi Services',
    description: 'Private transfer from Florence to Pisa. From €95. Day trips and one-way transfers. NCC chauffeur service. Book today.',
    images: ['/logo.webp'],
  },
}

const route = getRouteBySlug('florence-to-pisa')!

export default function FlorenceToPisaPage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`The Florence to Pisa private transfer is a popular day trip and one-way transfer route in Tuscany. Pisa is home to the world-famous Leaning Tower in the Piazza dei Miracoli — one of Italy's most iconic sights.

The journey from Florence city centre to Pisa takes approximately 60–75 minutes via the Florence-Pisa (FI-PI-LI) motorway. Our NCC chauffeurs can drop you directly at the Piazza dei Miracoli area for easy access to the Tower, Cathedral, and Baptistery.

This route is popular as a day trip — your driver can wait for you in Pisa while you explore, and return you to Florence afterward. Alternatively, it is available as a one-way transfer, including connections from Florence to Pisa Airport (PSA).`}
      included={[
        'Door-to-door service Florence to Pisa',
        'Drop-off near Piazza dei Miracoli',
        'Fixed price — no meter',
        'Day trip (driver waits) option available',
        'Professional NCC chauffeur',
        'Bottled water',
        'Return transfer bookable at same time',
        'Pisa Airport connections available',
      ]}
      faqs={[
        {
          q: 'Can I book a day trip to Pisa from Florence?',
          a: 'Yes. Your driver can take you to Pisa, wait while you explore (typically 2–4 hours), and return you to Florence. Please request day trip pricing when booking, as it differs from a one-way transfer.',
        },
        {
          q: 'Can you drop me at Pisa Airport instead of the city?',
          a: 'Yes. Pisa Galileo Galilei Airport (PSA) is very close to the Leaning Tower — we can combine a Pisa sightseeing stop with a drop-off at the airport. Please mention this when booking.',
        },
        {
          q: 'Is the route scenic?',
          a: 'The motorway route is fast and efficient. For a more scenic Tuscan route, ask your driver about the alternative road via Empoli — it takes longer but passes through beautiful Tuscan countryside.',
        },
        {
          q: 'Can I visit other Tuscan towns on the way?',
          a: 'Yes. We can include stops at Lucca (en route) or other Tuscan towns. Please discuss your itinerary when booking so we can quote accordingly.',
        },
      ]}
    />
  )
}
