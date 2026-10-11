import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Rome to Florence Transfer | Private Chauffeur',
  description: 'Rome to Florence private transfer. From €580. Skip the Frecciarossa — door-to-door, no luggage stress. Licensed NCC chauffeur. Fixed price, instant quote.',
  alternates: { canonical: '/rome-to-florence' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/rome-to-florence',
    title: 'Rome to Florence Transfer | Private Chauffeur | Italy Taxi Services',
    description: 'Rome to Florence private transfer. From €580. Skip the Frecciarossa — door-to-door, no luggage stress. Licensed NCC chauffeur. Fixed price, instant quote.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rome to Florence Transfer | Private Chauffeur | Italy Taxi Services',
    description: 'Rome to Florence private transfer. From €580. Skip the Frecciarossa — door-to-door, no luggage stress. Licensed NCC chauffeur. Fixed price, instant quote.',
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
        {
          q: 'How much is a private transfer from Rome to Florence?',
          a: 'Our Rome to Florence private transfer starts from €350 for a business sedan (up to 3 passengers). Larger vehicles such as the Mercedes V-Class are available for groups of up to 7. The price is fixed, includes all motorway tolls, and is confirmed in writing before you book — no meter and no surprise surcharges.',
        },
        {
          q: 'How far is Rome from Florence by road?',
          a: 'Rome to Florence is approximately 280 km by road via the A1 "Autostrada del Sole", Italy\'s main north–south motorway. The drive takes around 3–3.5 hours depending on traffic.',
        },
        {
          q: 'Can you collect us from Fiumicino or Ciampino Airport?',
          a: 'Yes. We regularly collect passengers directly from Rome Fiumicino (FCO) and Ciampino (CIA) airports and drive straight to Florence, so you avoid changing from airport to train station. Just give us your flight number and we will track it and wait if the flight is delayed.',
        },
        {
          q: 'Is the Rome to Florence transfer suitable for families with children?',
          a: 'Absolutely. We provide child and booster seats on request at no extra charge, and our vehicles have plenty of room for luggage, prams and travel gear. Let us know the ages of your children when booking.',
        },
        {
          q: 'Can the driver wait and take us back to Rome the same day?',
          a: 'Yes — a round trip with waiting time is available, which works well for a day visit to Florence. Tell us your plans and we will quote a fixed price for the full day.',
        },
      ]}
    />
  )
}
