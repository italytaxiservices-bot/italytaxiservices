import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Rome to Amalfi Coast Transfer | Private Chauffeur',
  description: 'Rome to Amalfi Coast private transfer. From €575. Positano, Ravello, Amalfi served. SS163 experts — no rental car stress. Fixed price, licensed NCC. Book now.',
  alternates: { canonical: '/rome-to-amalfi-coast', languages: { en: '/rome-to-amalfi-coast', it: '/it/roma-costiera-amalfitana', 'x-default': '/rome-to-amalfi-coast' } },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/rome-to-amalfi-coast',
    title: 'Rome to Amalfi Coast Transfer | Private Chauffeur | Italy Taxi Services',
    description: 'Rome to Amalfi Coast private transfer. From €575. Positano, Ravello, Amalfi served. SS163 experts — no rental car stress. Fixed price, licensed NCC. Book now.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rome to Amalfi Coast Transfer | Private Chauffeur | Italy Taxi Services',
    description: 'Rome to Amalfi Coast private transfer. From €575. Positano, Ravello, Amalfi served. SS163 experts — no rental car stress. Fixed price, licensed NCC. Book now.',
    images: ['/logo.webp'],
  },
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
        {
          q: 'How much is a private transfer from Rome to the Amalfi Coast?',
          a: 'Our Rome to Amalfi Coast private transfer starts from €380 for a business sedan (up to 3 passengers). Larger Mercedes V-Class vehicles are available for groups of up to 7. The price is fixed, includes all tolls, and is agreed in writing before you book.',
        },
        {
          q: 'How far is Rome from the Amalfi Coast?',
          a: 'Rome to Positano is approximately 280 km by road — south on the A1 to Naples, then the A3 towards Salerno and finally the SS163 coastal road. Expect around 3.5–4 hours door to door depending on coastal traffic.',
        },
        {
          q: 'Is there a direct train from Rome to the Amalfi Coast?',
          a: 'No. There is no direct train to the Amalfi Coast. By public transport you would take a train from Rome to Naples or Salerno, then a local train and a crowded SITA bus along the coast. A private transfer is door-to-door with your luggage and far less stressful.',
        },
        {
          q: 'Can we stop at Pompeii on the way to the Amalfi Coast?',
          a: 'Yes — Pompeii is conveniently located between Naples and the coast, and a visit can be added to your Rome to Amalfi transfer. Let us know when booking and we will plan the timing and quote a fixed price.',
        },
      ]}
    />
  )
}
