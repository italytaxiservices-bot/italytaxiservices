import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Milan to Venice Private Transfer | Chauffeur Service',
  description: 'Private NCC transfer from Milan to Venice. From €280. Skip the train — direct door-to-door comfort. Fixed price chauffeur service. Book today.',
  alternates: { canonical: '/milan-to-venice' },
}

const route = getRouteBySlug('milan-to-venice')!

export default function MilanVenicePage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`The Milan to Venice private transfer is one of Italy's great long-distance journeys — two iconic cities connected by approximately 270km of northern Italian motorway and Po Valley landscape. The journey takes 2.5–3 hours via the A4 motorway, passing Brescia, Verona, and Vicenza.

Our NCC chauffeurs drive you directly from your Milan hotel or address to your Venice destination — be it a hotel in Mestre, Piazzale Roma (the last road point before the lagoon), or Venice's train station area.

For travellers with heavy luggage or families, private transfer is significantly more comfortable than the Frecciarossa train — and often faster door-to-door when accounting for travel to Milan Centrale station and from Venezia Santa Lucia to your hotel.`}
      included={[
        'Door-to-door service — hotel to hotel',
        'Direct route via A4 motorway',
        'Large luggage capacity',
        'Flexible departure time',
        'Fixed price — no meter',
        'Professional licensed NCC chauffeur',
        'Bottled water and refreshments',
        'Venice Mestre or Piazzale Roma drop-off',
      ]}
      faqs={[
        { q: 'Where in Venice can you drop me off?', a: 'Venice\'s historic centre is car-free. We drop off at Piazzale Roma (closest point by road), the Venice car parks (Tronchetto, P. Roma), or your hotel in Venice Mestre. From Piazzale Roma, vaporetti connect all parts of the city.' },
        { q: 'How does the price compare to the train?', a: 'The Frecciarossa train (Milan Centrale to Venezia Santa Lucia) costs €30–80 per person. A private transfer at €280 for 1–3 passengers works out similarly when you factor in taxi costs to/from stations and the convenience of door-to-door service.' },
        { q: 'Can I travel from Malpensa Airport to Venice directly?', a: 'Yes. We offer a direct Malpensa to Venice transfer — please use our quote form and specify Malpensa Airport as pickup. This avoids going into Milan city centre and saves 45–60 minutes.' },
        { q: 'What if I want to stop in Verona on the way?', a: 'Yes, we can include a Verona stop (1–2 hours sightseeing) en route to Venice. This adds approximately 2–3 hours and a supplement. Please request this at booking.' },
      ]}
    />
  )
}
