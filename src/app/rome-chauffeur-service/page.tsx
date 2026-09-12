import type { Metadata } from 'next'
import CityPageTemplate from '@/components/templates/CityPageTemplate'
import { getCityBySlug } from '@/data/cities'

export const metadata: Metadata = {
  title: 'Private Chauffeur Service Rome | NCC Rome | Italy Taxi Services',
  description: 'Professional private chauffeur and NCC service in Rome. Fiumicino & Ciampino airport transfers, Vatican, Civitavecchia cruise port, Amalfi Coast. Fixed prices.',
}

const city = getCityBySlug('rome')!

export default function RomeChauffeurPage() {
  return (
    <CityPageTemplate
      city={city}
      highlights={[
        'Fiumicino & Ciampino airports',
        'Civitavecchia cruise port',
        'Amalfi Coast & Naples',
        'Vatican & historic centre',
      ]}
      about={`Rome is Italy's Eternal City — and one of the world's great travel destinations. Whether you're arriving at Fiumicino (Leonardo da Vinci) or Ciampino Airport, our professional NCC chauffeurs are waiting to welcome you with a name board at arrivals.

We provide private chauffeur service throughout Rome and the wider Lazio region. From the historic centre and Vatican to Civitavecchia cruise port, Tivoli, and long-distance transfers to the Amalfi Coast, Naples, and Florence — our licensed NCC partners cover every route.

Rome's traffic can be unpredictable. Our drivers know the city inside-out — the best routes, the right timing, and how to get you where you need to be on time. All vehicles are modern, air-conditioned, and immaculately maintained. Flight delays? Our drivers monitor your flight in real time and wait at no extra charge.`}
      services={[
        {
          title: 'Fiumicino Airport Transfer',
          description: 'Private NCC transfers from Rome Fiumicino (FCO) to Rome city, Vatican, and beyond. Meet & greet, flight monitoring.',
        },
        {
          title: 'Ciampino Airport Transfer',
          description: 'Private transfers from Ciampino Airport (CIA) to Rome and surrounding areas. Fixed price, professional driver.',
        },
        {
          title: 'Civitavecchia Cruise Port',
          description: 'Private transfers between Fiumicino Airport and Civitavecchia cruise port. Perfect for cruise passengers.',
        },
        {
          title: 'Rome to Amalfi Coast',
          description: 'Long-distance private transfer from Rome to Positano, Amalfi, Ravello, and Sorrento. Direct, door to door.',
        },
        {
          title: 'Rome Corporate Chauffeur',
          description: 'Professional corporate chauffeur service in Rome. Embassy, government, and business travel specialists.',
        },
        {
          title: 'Rome Private Tours',
          description: 'Hourly chauffeur hire for Vatican, Colosseum, and wider Rome tours. Full flexibility, professional driver.',
        },
      ]}
    />
  )
}
