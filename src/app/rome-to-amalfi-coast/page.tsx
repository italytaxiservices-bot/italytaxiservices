import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Rome to Amalfi Coast Transfer | Private Chauffeur | Italy Taxi Services',
  description: 'Private chauffeur transfer from Rome to Amalfi Coast. From €380. Positano, Amalfi, Ravello served. Direct NCC service. Book today.',
  alternates: { canonical: '/rome-to-amalfi-coast' },
}

const route = getRouteBySlug('rome-to-amalfi-coast')!

export default function RomeToAmalfiPage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`The Rome to Amalfi Coast private transfer is a long-distance journey through some of Italy's most spectacular scenery. The Amalfi Coast (Costiera Amalfitana) — a UNESCO World Heritage Site — is one of the world's most famous coastal roads, winding between dramatic cliffs, colourful villages, and the deep blue Tyrrhenian Sea.

The journey from Rome takes approximately 3–3.5 hours via the A1 motorway south toward Naples, then along the state roads through the Sorrentine Peninsula and down the SS163 Amalfi Coast road. Our drivers are experienced on this famous road — essential, as it requires skill, local knowledge, and patience.

We serve all Amalfi Coast destinations: Positano, Amalfi, Ravello, Praiano, Furore, Conca dei Marini, Atrani, and more. We also cover Sorrento and the nearby Pompei archaeological site.`}
      included={[
        'Door-to-door Rome to Amalfi Coast',
        'Experienced Amalfi Coast drivers',
        'All Amalfi towns served: Positano, Amalfi, Ravello',
        'Fixed price — all tolls included',
        'Comfortable long-distance vehicle',
        'Bottled water and refreshments',
        'Flexible departure time',
        'Sorrento and Pompei also available',
      ]}
      faqs={[
        {
          q: 'Which Amalfi Coast towns do you serve?',
          a: 'We serve all towns on the Amalfi Coast including Positano, Amalfi, Ravello, Praiano, Atrani, Furore, and Conca dei Marini. We also cover Sorrento and the Pompei archaeological site.',
        },
        {
          q: 'How long does the Rome to Positano transfer take?',
          a: 'Rome to Positano takes approximately 3–3.5 hours under normal conditions. Traffic on the Amalfi Coast road can add 30–60 minutes in peak summer season (July–August weekends).',
        },
        {
          q: 'Is the Amalfi Coast road difficult?',
          a: 'The SS163 Amalfi Coast road is narrow, winding, and dramatic — requiring an experienced driver. Our partner drivers are experienced on this specific road and know how to navigate it safely and efficiently.',
        },
        {
          q: 'Can I book Fiumicino to Amalfi instead of Rome?',
          a: 'Yes. We can pick you up directly from Fiumicino Airport or any Rome hotel and transfer you to the Amalfi Coast. The journey time from Fiumicino is similar — approximately 3–3.5 hours.',
        },
      ]}
    />
  )
}
