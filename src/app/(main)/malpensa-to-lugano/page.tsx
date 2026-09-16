import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Malpensa to Lugano Transfer | Private Chauffeur',
  description: 'Private NCC transfer from Malpensa Airport to Lugano, Switzerland. From €145. Direct cross-border service. Fixed price. Book today.',
  alternates: { canonical: '/malpensa-to-lugano' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/malpensa-to-lugano',
    title: 'Malpensa to Lugano Transfer | Private Chauffeur | Italy Taxi Services',
    description: 'Private NCC transfer from Malpensa Airport to Lugano, Switzerland. From €145. Direct cross-border service. Fixed price. Book today.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malpensa to Lugano Transfer | Private Chauffeur | Italy Taxi Services',
    description: 'Private NCC transfer from Malpensa Airport to Lugano, Switzerland. From €145. Direct cross-border service. Fixed price. Book today.',
    images: ['/logo.webp'],
  },
}

const route = getRouteBySlug('malpensa-to-lugano')!

export default function MalpensaToLuganoPage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`Milan Malpensa is the closest major international airport to Lugano, Switzerland, and many travellers to Ticino fly into Malpensa specifically because of its wider choice of international routes compared to Lugano's own small regional airport. A private chauffeur transfer covers the 80km cross-border journey in around 60–75 minutes, taking you directly to your hotel, villa, or business meeting without the hassle of connecting trains and a border crossing on public transport.

Our chauffeurs handle this cross-border route routinely, so there are no customs delays or paperwork for you to manage — just a comfortable, direct drive across the Swiss border. This route is popular with business travellers visiting Lugano's banking and finance sector, as well as leisure travellers heading to Lake Lugano.

Please note that as an international cross-border transfer, a valid passport or ID card is required, exactly as it would be for any other means of crossing into Switzerland.`}
      included={[
        'Meet & greet at Malpensa arrivals',
        'Direct cross-border transfer',
        'No customs delays or paperwork to manage',
        'Hotel or business address drop-off',
        'Fixed price — all tolls included',
        'Professional NCC chauffeur',
        'Bottled water',
        'Flight monitoring',
      ]}
      faqs={[
        {
          q: 'How long does the transfer from Malpensa to Lugano take?',
          a: 'Around 60 to 75 minutes depending on traffic and border conditions.',
        },
        {
          q: 'Do I need my passport for this transfer?',
          a: 'Yes, since this crosses the Swiss border you will need a valid passport or national ID card, as required for any crossing into Switzerland.',
        },
        {
          q: 'Is this a shared shuttle or a private vehicle?',
          a: 'This is always a private, direct transfer in a dedicated vehicle — no other passengers, no shared stops.',
        },
        {
          q: 'Can you also pick us up in Lugano for the return to Malpensa?',
          a: 'Yes, we operate this route in both directions at the same fixed price.',
        },
      ]}
    />
  )
}
