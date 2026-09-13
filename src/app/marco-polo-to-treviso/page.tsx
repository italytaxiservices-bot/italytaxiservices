import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Marco Polo to Treviso Transfer | Private Chauffeur',
  description: 'Private NCC transfer from Venice Marco Polo Airport to Treviso. From €65. Fast, direct service. Fixed price. Book today.',
  alternates: { canonical: '/marco-polo-to-treviso' },
}

const route = getRouteBySlug('marco-polo-to-treviso')!

export default function MarcoPoloToTrevisoPage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`Treviso sits just 25km from Venice Marco Polo Airport, and this is one of our shortest and most frequently booked routes — a 30–40 minute direct transfer, ideal for business travellers visiting Treviso's companies, or leisure travellers using it as a quieter, less touristy base for exploring the Veneto and the nearby Prosecco hills.

Treviso is also home to its own airport (Treviso Antonio Canova, TSF), used by some low-cost carriers, but many international flights connect through Venice Marco Polo instead, making this a common onward route. Whichever airport you land at, we cover both — this page covers Marco Polo to Treviso specifically.

Treviso's compact historic centre, canals, and arcaded streets are easy to explore on foot once you arrive, and we drop off directly at your hotel or the address of your choice with no need to navigate parking in the centre.`}
      included={[
        'Meet & greet at Marco Polo arrivals',
        'Short, direct 25km transfer',
        'Hotel or business address drop-off',
        'Flight monitoring for delays',
        'Fixed price — all tolls included',
        'Professional NCC chauffeur',
        'Bottled water',
        '24/7 availability',
      ]}
      faqs={[
        {
          q: 'How long does the transfer from Marco Polo Airport to Treviso take?',
          a: 'Around 30 to 40 minutes under normal traffic conditions — one of our shortest routes.',
        },
        {
          q: 'Do you also serve Treviso Airport (TSF) directly?',
          a: "Yes, we operate a dedicated Treviso Airport service as well. This particular route covers transfers from Venice Marco Polo Airport specifically.",
        },
        {
          q: 'Can you take us on to the Prosecco hills or Valdobbiadene?',
          a: 'Yes, the Prosecco wine region is a short additional drive from Treviso and can be arranged as an extension of this route.',
        },
        {
          q: 'Is the price the same for a return transfer to the airport?',
          a: 'Yes, the same fixed price applies in both directions, including early morning departures for flights.',
        },
      ]}
    />
  )
}
