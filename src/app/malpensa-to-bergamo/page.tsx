import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Malpensa to Bergamo Transfer | Private Chauffeur | Italy Taxi Services',
  description: 'Private NCC transfer from Malpensa Airport to Bergamo. From €95. Professional chauffeur, meet & greet, fixed price. Book today.',
  alternates: { canonical: '/malpensa-to-bergamo' },
}

const route = getRouteBySlug('malpensa-to-bergamo')!

export default function MalpensaToBergamoPage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`Milan Malpensa Airport (MXP) is well connected to Bergamo, but public transport options involve at least one change and can take well over two hours door to door. A private chauffeur transfer covers the 65km via the A4 and A8 motorways in around 50–65 minutes, taking you directly to your hotel, apartment, or meeting in Bergamo — no station transfers, no waiting for connecting buses.

Bergamo is split between the medieval hilltop Città Alta (Upper Town), reached by funicular, and the modern Città Bassa (Lower Town) where most business and hotels are located. Our drivers know both areas well and will confirm your exact drop-off point when you book — including hotels right at the base of the funicular for guests wanting to explore the Upper Town on foot.

This route is also popular for travellers flying into Malpensa specifically because of Bergamo's own airport, Orio al Serio (BGY) — used by budget carriers for onward connections, or simply because Malpensa had the better fare. Either way, a fixed-price private transfer removes the uncertainty of connecting between two different transport systems.`}
      included={[
        'Meet & greet at Malpensa arrivals',
        'Direct transfer via A4/A8 motorway',
        'Città Alta or Città Bassa drop-off',
        'Flight monitoring for delays',
        'Fixed price — all tolls included',
        'Professional NCC chauffeur',
        'Bottled water',
        '24/7 availability',
      ]}
      faqs={[
        {
          q: 'How long does the transfer from Malpensa to Bergamo take?',
          a: 'Around 50–65 minutes under normal traffic conditions via the A4 and A8 motorways, depending on your exact destination in Bergamo.',
        },
        {
          q: 'Can you drop us off in the Città Alta (Upper Town)?',
          a: "Yes, where road access allows. Many of the Città Alta's streets are pedestrian-only, so we'll confirm the closest possible drop-off point — often right at the funicular station — when you book.",
        },
        {
          q: 'Do you also serve Bergamo Orio al Serio Airport (BGY)?',
          a: "Yes, we operate a separate dedicated service from Bergamo's own airport. This route specifically covers Malpensa Airport to Bergamo city centre.",
        },
        {
          q: 'Is the price different for early morning or late night pickups?',
          a: 'No, our fixed price applies 24/7 with no surcharges for early or late flights.',
        },
      ]}
    />
  )
}
