import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportBySlug } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Venice Marco Polo Airport Transfer | Private Chauffeur VCE | Italy Chauffeur',
  description: 'Private chauffeur transfers from Venice Marco Polo Airport (VCE). Mestre, Tronchetto, cruise terminal. Meet & greet included. Fixed price NCC service.',
}

const airport = getAirportBySlug('marco-polo')!

export default function MarcoPoloTransferPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      popularDestinations={[
        { name: 'Mestre / Tronchetto', href: '/marco-polo-to-venice', time: '20–30 min', priceFrom: 50 },
        { name: 'Venice Cruise Terminal', href: '/venice-cruise-transfer', time: '30–40 min', priceFrom: 65 },
        { name: 'Padua (Padova)', href: '/marco-polo-to-padua', time: '40–55 min', priceFrom: 80 },
        { name: 'Verona', href: '/marco-polo-to-verona', time: '90–110 min', priceFrom: 150 },
        { name: 'Treviso', href: '/marco-polo-to-treviso', time: '30–40 min', priceFrom: 65 },
        { name: 'Bologna', href: '/venice-to-bologna', time: '2–2.5 hrs', priceFrom: 220 },
      ]}
      about={`Venice Marco Polo Airport (VCE) is the main international airport serving Venice and the wider Veneto region, located on the mainland 13km from Venice's historic islands. The airport is served by most major European and international airlines.

Because Venice's historic centre is car-free, private vehicle transfers serve the mainland — specifically Piazzale Roma (the main road terminus), Tronchetto (the parking island), or Mestre (the mainland Venice district). From these points, you can easily access the historic islands by water taxi, vaporetto (waterbus), or on foot.

Our NCC drivers know exactly which mainland access point best suits your hotel or accommodation, and can advise on the easiest onward connection to your specific destination within Venice. For groups and families with heavy luggage, we recommend Tronchetto for the People Mover connection or private water taxi access.`}
      tips={[
        'Venice historic centre is car-free. Private vehicles serve Piazzale Roma, Tronchetto, or Mestre. Your driver will advise the best option for your specific hotel.',
        'From Mestre or Tronchetto, you can reach most Venice hotels via water taxi (private, expensive), vaporetto (ACTV waterbus, cheaper), or on foot across the Ponte della Libertà bridge.',
        'For cruise ship passengers, Venice Cruise Terminal (Marittima or San Basilio) is accessible by private vehicle. Please specify your cruise terminal when booking.',
        'The airport is small and efficient. Baggage reclaim usually takes 15–30 minutes after landing. Your driver will be in the arrivals area.',
        'For Verona, Padua, or other Veneto cities, we provide direct long-distance private transfers from Marco Polo — no train connections required.',
      ]}
    />
  )
}
