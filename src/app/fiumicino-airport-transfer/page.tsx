import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportBySlug } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Fiumicino Airport Transfer | Private Chauffeur FCO | Italy Taxi Services',
  description: 'Private chauffeur transfers from Rome Fiumicino Airport (FCO). Meet & greet, flight monitoring. Rome city, Vatican, Civitavecchia cruise port. Fixed prices.',
  alternates: { canonical: '/fiumicino-airport-transfer' },
}

const airport = getAirportBySlug('fiumicino')!

export default function FiumicinoTransferPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      popularDestinations={[
        { name: 'Rome City Centre', href: '/fiumicino-to-rome', time: '40–60 min', priceFrom: 65 },
        { name: 'Civitavecchia Port', href: '/fiumicino-to-civitavecchia', time: '60–75 min', priceFrom: 110 },
        { name: 'Vatican City', href: '/fiumicino-to-rome', time: '50–65 min', priceFrom: 65 },
        { name: 'Tivoli', href: '/fiumicino-to-tivoli', time: '70–90 min', priceFrom: 120 },
        { name: 'Naples', href: '/rome-to-naples', time: '2.5–3 hrs', priceFrom: 280 },
        { name: 'Florence', href: '/rome-to-florence', time: '3–3.5 hrs', priceFrom: 350 },
      ]}
      about={`Rome Fiumicino Airport (FCO) — officially Leonardo da Vinci International Airport — is Italy's largest airport and one of Europe's major hubs, handling over 40 million passengers annually. Located 32km southwest of Rome city centre, it is the primary gateway for visitors to Rome, Lazio, and central Italy.

Fiumicino has four terminals (1, 2, 3, and 5). Most international flights arrive at Terminal 3 (intercontinental) or Terminal 1 (European). Your driver will be waiting in the arrivals hall of your specific terminal with a name board.

Rome's traffic can be unpredictable, particularly on major ring roads. Our professional NCC drivers know exactly which routes to take at different times of day, ensuring you arrive at your destination on time and in comfort. We cover all areas of Rome, the Vatican, Civitavecchia cruise port, and long-distance routes to Naples, Florence, and the Amalfi Coast.`}
      tips={[
        'Most intercontinental flights arrive at Terminal 3. European flights use Terminals 1, 2, and 3. Please confirm your arrival terminal when booking, or provide your flight number and we will check.',
        'Your driver will be waiting in the arrivals hall with a name board. After baggage claim and customs, allow 30–60 minutes — your driver will track your flight and wait.',
        'Rome traffic is heaviest weekdays 07:30–09:30 and 17:00–19:30. We factor this into journey time estimates. Always allow extra buffer time for onward connections.',
        'For Civitavecchia cruise port transfers, we recommend booking well in advance. We can accommodate early morning departures (04:00 onwards) — please specify when booking.',
        'NCC (pre-booked private chauffeur) is distinct from and must not be confused with Rome taxis. NCC services must be pre-booked and do not operate as street taxis.',
      ]}
    />
  )
}
