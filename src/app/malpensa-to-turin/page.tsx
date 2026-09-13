import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Malpensa to Turin Transfer | Private Chauffeur',
  description: 'Private NCC transfer from Malpensa Airport to Turin. From €195. Professional chauffeur, fixed price. Book your Turin transfer today.',
  alternates: { canonical: '/malpensa-to-turin' },
}

const route = getRouteBySlug('malpensa-to-turin')!

export default function MalpensaToTurinPage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`Turin's own airport has a more limited international schedule than Milan Malpensa, so many visitors — especially those connecting through major international hubs — fly into Malpensa and continue on to Turin by road. A private chauffeur transfer covers the 150km via the A4 and A26 motorways in around 90–110 minutes, delivering you directly to your hotel or the address of your choice in Turin.

This route is used by business travellers visiting Turin's automotive and technology sectors, as well as leisure travellers exploring the former capital of Italy — home to the Egyptian Museum, the Mole Antonelliana, and the surrounding Piedmont wine region including Barolo and Barbaresco.

Our chauffeurs know the fastest route depending on time of day and can also arrange a stop in the Piedmont countryside en route if you'd like to combine the transfer with a wine region visit — just let us know when booking.`}
      included={[
        'Meet & greet at Malpensa arrivals',
        'Direct route via A4/A26 motorways',
        'City centre or hotel drop-off',
        'Optional Piedmont wine region stops',
        'Fixed price — all tolls included',
        'Professional NCC chauffeur',
        'Bottled water',
        'Flight monitoring',
      ]}
      faqs={[
        {
          q: 'How long is the drive from Malpensa to Turin?',
          a: 'Approximately 90 to 110 minutes via the A4 and A26 motorways, depending on traffic.',
        },
        {
          q: 'Why fly into Malpensa instead of Turin Airport directly?',
          a: "Malpensa has a wider range of international routes than Turin's own airport, so it's often the more convenient or cheaper option for long-haul connections — with a private transfer covering the final leg.",
        },
        {
          q: 'Can we stop in the Piedmont wine region on the way?',
          a: "Yes, the Barolo and Barbaresco wine areas are a short detour from the main route. Let us know when booking so we can plan timing and any extra cost.",
        },
        {
          q: 'Do you offer the reverse route, Turin to Malpensa Airport?',
          a: 'Yes, we operate this route in both directions at the same fixed price, including early morning departures for flights.',
        },
      ]}
    />
  )
}
