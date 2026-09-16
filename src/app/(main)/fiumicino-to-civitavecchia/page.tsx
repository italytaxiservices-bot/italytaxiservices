import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Fiumicino to Civitavecchia Transfer | Cruise Port',
  description: 'Private transfer from Fiumicino Airport to Civitavecchia cruise port. From €110. Direct NCC service. Perfect for cruise passengers. Book today.',
  alternates: { canonical: '/fiumicino-to-civitavecchia', languages: { en: '/fiumicino-to-civitavecchia', it: '/it/fiumicino-civitavecchia', 'x-default': '/fiumicino-to-civitavecchia' } },
}

const route = getRouteBySlug('fiumicino-to-civitavecchia')!

export default function FiumicinoToCivitavecchiaPage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`The Fiumicino to Civitavecchia transfer is the most popular cruise passenger route in central Italy. Civitavecchia is Rome's main cruise port, serving major cruise lines including MSC, Royal Caribbean, Norwegian, Costa, and many others. A direct private transfer is the most convenient and stress-free way to connect between the airport and port.

The journey from Fiumicino Airport to Civitavecchia port takes approximately 60–75 minutes via the A12 motorway. Our professional NCC chauffeurs handle this route daily and know exactly which pier or terminal your ship is docking at — please provide your cruise ship name and pier when booking.

We offer large vehicle options (Mercedes V-Class) for passengers with multiple suitcases, as is common with cruise luggage. Early morning departures (from 04:00) are available — please specify your required pickup time when booking.`}
      included={[
        'Meet & greet at Fiumicino arrivals',
        'Direct transfer to Civitavecchia pier',
        'Large vehicles for cruise luggage',
        'Early morning departures available',
        'Fixed price — all tolls included',
        'Professional NCC chauffeur',
        'Bottled water',
        'Flight monitoring',
      ]}
      faqs={[
        {
          q: 'How far is Fiumicino Airport from Civitavecchia cruise port?',
          a: 'The distance is approximately 80km via the A12 motorway. The journey takes 60–75 minutes under normal conditions.',
        },
        {
          q: 'Can you accommodate a lot of cruise luggage?',
          a: 'Yes. We offer the Mercedes V-Class (minivan) for groups with large amounts of luggage — standard for cruise passengers. Please mention luggage quantity when booking.',
        },
        {
          q: 'Do you offer the reverse route — Civitavecchia to Fiumicino?',
          a: 'Yes. We provide transfers from Civitavecchia cruise terminal to Fiumicino Airport, Rome city, and other destinations. This is very popular for cruise-to-flight connections.',
        },
        {
          q: 'Can you drop us at a specific pier in Civitavecchia?',
          a: 'Yes. Please provide your cruise ship name and terminal/pier details when booking, and we will drop you as close as possible to your vessel.',
        },
      ]}
    />
  )
}
