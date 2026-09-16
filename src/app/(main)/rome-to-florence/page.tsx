import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Rome to Florence Transfer | Private Chauffeur',
  description: 'Rated 4.9★ · Rome to Florence private transfer. From €350. Skip the Frecciarossa — door-to-door, no luggage stress. Licensed NCC chauffeur. Fixed price, instant quote.',
  alternates: { canonical: '/rome-to-florence' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/rome-to-florence',
    title: 'Rome to Florence Transfer | Private Chauffeur | Italy Taxi Services',
    description: 'Rated 4.9★ · Rome to Florence private transfer. From €350. Skip the Frecciarossa — door-to-door, no luggage stress. Licensed NCC chauffeur. Fixed price, instant quote.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rome to Florence Transfer | Private Chauffeur | Italy Taxi Services',
    description: 'Rated 4.9★ · Rome to Florence private transfer. From €350. Skip the Frecciarossa — door-to-door, no luggage stress. Licensed NCC chauffeur. Fixed price, instant quote.',
    images: ['/logo.webp'],
  },
}

const route = getRouteBySlug('rome-to-florence')!

export default function RomeToFlorencePage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`The high-speed Frecciarossa train covers Rome to Florence in around 90 minutes, but that figure only counts station to station — not the time getting to Roma Termini with luggage, through security, and then from Firenze Santa Maria Novella to your final destination. A private chauffeur transfer takes 3–3.5 hours covering the full 280km via the A1 motorway, but delivers you directly to your hotel or villa door, with no station transfers at either end.

This route suits families and groups travelling with luggage, business travellers who want to work en route, and anyone arriving into Rome late or departing Florence early when train schedules are inconvenient. It's also popular as part of a wider Tuscany itinerary — many clients ask to stop at Orvieto or another hilltop town along the way, which we're happy to arrange in advance.

Our chauffeurs drive this route regularly and use Mercedes E-Class, S-Class, or V-Class vehicles depending on your group size and luggage — all with air conditioning, phone chargers, and bottled water included as standard.`}
      included={[
        'Door-to-door service, both ends',
        'Direct route via the A1 motorway',
        'Optional scenic stops (agreed in advance)',
        'Comfortable long-distance vehicles',
        'Fixed price — all tolls included',
        'Professional NCC chauffeur',
        'Bottled water',
        'Flexible departure time',
      ]}
      faqs={[
        {
          q: 'How long does the drive from Rome to Florence take?',
          a: 'Approximately 3 to 3.5 hours via the A1 motorway, depending on traffic around both cities and any agreed stops en route.',
        },
        {
          q: 'Can we stop somewhere along the way, like Orvieto?',
          a: 'Yes. Many clients add a stop at Orvieto or another town along the A1. Let us know when booking so we can plan timing and any extra cost.',
        },
        {
          q: 'Is this faster than the train?',
          a: "The train is faster centre-to-centre, but a private transfer saves the time and hassle of getting to and from stations with luggage, and takes you directly door to door — often similar total time with far more comfort.",
        },
        {
          q: 'Do you offer the reverse route, Florence to Rome?',
          a: 'Yes, we operate this route in both directions at the same fixed price.',
        },
      ]}
    />
  )
}
