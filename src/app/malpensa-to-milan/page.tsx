import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Malpensa to Milan Transfer | Private Chauffeur | Italy Taxi Services',
  description: 'Private NCC transfer from Malpensa Airport to Milan. From €85. Professional chauffeur, meet & greet, flight monitoring included. Book today.',
  alternates: { canonical: '/malpensa-to-milan', languages: { en: '/malpensa-to-milan', it: '/it/malpensa-milano' } },
}

const route = getRouteBySlug('malpensa-to-milan')!

export default function MalpensaToMilanPage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`The Malpensa to Milan transfer is one of the most popular airport transfers in Italy. Milan Malpensa Airport (MXP) is located approximately 48km northwest of Milan city centre, and the journey takes between 45 and 60 minutes under normal traffic conditions.

Our professional NCC chauffeurs handle thousands of Malpensa to Milan transfers each year. Your driver will be waiting at the arrivals hall with a name board — no hunting for taxis, no queues, no confusion. We monitor your flight in real time, so if your flight is delayed, your driver waits at no extra charge.

We cover all areas of Milan: the city centre, Duomo, Navigli, Porta Nuova, Brera, CityLife, the trade fair (Fiera Milano), and every hotel and business district in the metropolitan area.`}
      included={[
        'Meet & greet at arrivals with name board',
        'Real-time flight monitoring — we wait if you are delayed',
        'Fixed price agreed before travel — no meter running',
        'Door-to-door service to any address in Milan',
        'Professional, English-speaking NCC chauffeur',
        'Bottled water provided',
        'All taxes and tolls included',
        'Luggage assistance',
      ]}
      faqs={[
        {
          q: 'How long does the Malpensa to Milan transfer take?',
          a: 'Under normal conditions, the journey takes 45–60 minutes. During peak rush hours (07:00–09:30 and 17:00–19:30), allow 60–75 minutes. We always plan for traffic to ensure you arrive on time.',
        },
        {
          q: 'Which terminal does my driver meet me at?',
          a: 'Malpensa has two terminals: Terminal 1 (international flights) and Terminal 2 (primarily easyJet). Please confirm your terminal when booking, or provide your flight number and we will check automatically.',
        },
        {
          q: 'What happens if my flight is delayed?',
          a: 'We monitor your flight in real time. If your flight is delayed, your driver will wait — at no extra charge. We ask that you WhatsApp us if your delay is more than 2 hours.',
        },
        {
          q: 'Can I get a return transfer from Milan to Malpensa?',
          a: 'Yes. We recommend booking both directions at the same time to secure availability, especially during peak summer months and holiday periods.',
        },
      ]}
    />
  )
}
