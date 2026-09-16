import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Fiumicino to Rome Transfer | Private Chauffeur FCO',
  description: 'Private NCC transfer from Fiumicino Airport to Rome. From €65. Meet & greet, flight monitoring. All Rome areas. Book your Rome airport transfer today.',
  alternates: { canonical: '/fiumicino-to-rome', languages: { en: '/fiumicino-to-rome', it: '/it/fiumicino-roma', 'x-default': '/fiumicino-to-rome' } },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/fiumicino-to-rome',
    title: 'Fiumicino to Rome Transfer | Private Chauffeur FCO | Italy Taxi Services',
    description: 'Private NCC transfer from Fiumicino Airport to Rome. From €65. Meet & greet, flight monitoring. All Rome areas. Book your Rome airport transfer today.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fiumicino to Rome Transfer | Private Chauffeur FCO | Italy Taxi Services',
    description: 'Private NCC transfer from Fiumicino Airport to Rome. From €65. Meet & greet, flight monitoring. All Rome areas. Book your Rome airport transfer today.',
    images: ['/logo.webp'],
  },
}

const route = getRouteBySlug('fiumicino-to-rome')!

export default function FiumicinoToRomePage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`The Fiumicino to Rome airport transfer is the classic gateway to the Eternal City. Rome Fiumicino Airport (FCO) — Leonardo da Vinci International — is located 32km southwest of Rome city centre. The journey takes 40–60 minutes under normal traffic conditions.

Our professional NCC chauffeurs meet you at arrivals in your specific terminal (Fiumicino has Terminals 1, 2, 3, and 5). We monitor your flight live and wait if you are delayed — at no extra charge. From there, your driver takes you directly to your hotel, apartment, or any other address across Rome.

We cover all of Rome: the historic centre, Vatican, Trastevere, Prati, Parioli, EUR, Testaccio, Tivoli, and everywhere in between. For cruise passengers, we also offer direct transfers from Fiumicino to Civitavecchia port.`}
      included={[
        'Meet & greet at arrivals hall with name board',
        'Real-time flight monitoring',
        'Fixed price — no meter, no surprises',
        'All areas of Rome covered',
        'Professional, licensed NCC chauffeur',
        'Bottled water provided',
        'All tolls and highway fees included',
        'Luggage assistance',
      ]}
      faqs={[
        {
          q: 'How long is the drive from Fiumicino to Rome?',
          a: 'Approximately 40–60 minutes under normal conditions. During morning rush hour (07:30–09:30) and evening rush (17:00–19:30), the journey can take 60–90 minutes. Our drivers know the fastest routes.',
        },
        {
          q: 'Which terminal will my driver meet me?',
          a: 'Fiumicino has multiple terminals. Most intercontinental flights use Terminal 3; European flights use Terminals 1, 2, and 3. Please provide your flight number when booking and we will confirm your terminal.',
        },
        {
          q: 'Do you serve the Vatican and surrounding areas?',
          a: 'Yes. We cover all parts of Rome including the Vatican, Prati, Trastevere, the historic centre, Testaccio, EUR, and residential areas.',
        },
        {
          q: 'Can I book a transfer from Rome back to Fiumicino?',
          a: 'Yes. Return transfers from Rome to Fiumicino are available at any time — including very early morning departures from 03:00 onwards. Book both directions together for guaranteed availability.',
        },
      ]}
    />
  )
}
