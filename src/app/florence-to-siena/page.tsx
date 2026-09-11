import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Florence to Siena Transfer | Private Chauffeur Chianti | Italy Chauffeur',
  description: 'Private NCC transfer from Florence to Siena through the Chianti hills. From €105. Day trips available. Scenic Tuscan route. Book today.',
  alternates: { canonical: '/florence-to-siena' },
}

const route = getRouteBySlug('florence-to-siena')!

export default function FlorenceSienaPage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`The Florence to Siena private transfer is one of Tuscany's most beautiful drives — through rolling hills, cypress-lined roads, vineyards, and medieval villages. Siena is one of Italy's finest Gothic cities: the fan-shaped Piazza del Campo, the striped cathedral (Duomo), and the Contrade culture of the famous Palio horse race.

The journey from Florence to Siena takes 70–80 minutes. We offer two routes: the fast route via the Siena-Florence expressway (raccordo), or the scenic Chiantigiana road (SS222) through the heart of the Chianti Classico wine region — passing Greve in Chianti, Panzano, and Castelnuovo Berardenga.

This route is ideal as a day trip (driver waits in Siena) or as a one-way transfer. We also offer combined tours — Siena plus San Gimignano or Montalcino.`}
      included={[
        'Door-to-door Florence to Siena',
        'Choice of scenic Chianti route or fast expressway',
        'Day trip option — driver waits in Siena',
        'Fixed price — no hidden extras',
        'Professional NCC chauffeur',
        'Bottled water',
        'Return trip bookable at same time',
        'San Gimignano combo available',
      ]}
      faqs={[
        { q: 'Which route is more scenic — the expressway or the Chiantigiana?', a: 'The SS222 Chiantigiana through Chianti is far more scenic — rolling vineyards, cypress trees, medieval villages. It adds 20–30 minutes but is highly recommended for first-time visitors to Tuscany.' },
        { q: 'Can I book a day trip with driver waiting in Siena?', a: 'Yes. Your driver takes you to Siena, waits while you explore (typically 3–5 hours), and returns you to Florence. Request the day trip option when booking — pricing is different from one-way.' },
        { q: 'Can we combine Siena and San Gimignano in one day?', a: 'Yes. We regularly combine Siena and San Gimignano in a full-day tour from Florence. The two towns are 35 minutes apart. Please request the combined tour when booking.' },
        { q: 'Is Siena walkable from where you drop me off?', a: 'Siena\'s historic centre is pedestrian-only. We drop you at the nearest authorised point (typically Piazza San Domenico or Campo carpark), from where the main sights are all walkable within 10–15 minutes.' },
      ]}
    />
  )
}
