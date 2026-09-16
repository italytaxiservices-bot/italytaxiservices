import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Venice to Bologna Transfer | Private Chauffeur',
  description: 'Private chauffeur transfer from Venice to Bologna. From €220. Direct NCC service via the A13. Door-to-door comfort. Book today.',
  alternates: { canonical: '/venice-to-bologna' },
}

const route = getRouteBySlug('venice-to-bologna')!

export default function VeniceToBolognaPage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`Venice and Bologna are connected by regular trains, but a private chauffeur transfer offers a genuine door-to-door alternative — covering the 150km via the A13 motorway in around 2 to 2.5 hours, with no need to get to Venice's Santa Lucia station with luggage or navigate Bologna Centrale on arrival.

This route is popular with business travellers moving between Venice and Bologna's trade fair and exhibition circuit, as well as leisure travellers combining both cities in one trip — Bologna's food scene, historic university, and central location in Emilia-Romagna make it a natural add-on to a Venice stay.

We can arrange pickup from any Venice-area location, including Mestre hotels or directly from Marco Polo Airport if you're arriving by air before continuing to Bologna, and drop off anywhere in Bologna including Bologna Guglielmo Marconi Airport (BLQ) if you're connecting onward by air.`}
      included={[
        'Door-to-door service, both ends',
        'Direct route via the A13 motorway',
        'Pickup from Mestre or Marco Polo Airport',
        'Drop-off anywhere in Bologna, including BLQ airport',
        'Fixed price — all tolls included',
        'Professional NCC chauffeur',
        'Bottled water',
        'Flexible departure time',
      ]}
      faqs={[
        {
          q: 'How long does the drive from Venice to Bologna take?',
          a: 'Approximately 2 to 2.5 hours via the A13 motorway, depending on traffic.',
        },
        {
          q: 'Can you pick us up directly from Marco Polo Airport instead of a Venice hotel?',
          a: "Yes, we can start this route from the airport if you're arriving by air and continuing straight on to Bologna.",
        },
        {
          q: 'Can you drop us at Bologna Airport (BLQ) instead of the city centre?',
          a: 'Yes, we can drop off at Bologna Guglielmo Marconi Airport if you have an onward flight, at no extra cost compared to a city centre drop-off.',
        },
        {
          q: 'Do you offer the reverse route, Bologna to Venice?',
          a: 'Yes, we operate this route in both directions at the same fixed price.',
        },
      ]}
    />
  )
}
