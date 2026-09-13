import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportBySlug } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Malpensa Airport Transfer | Private Chauffeur MXP | Italy Taxi Services',
  description: 'Private chauffeur transfers from Milan Malpensa Airport (MXP). Meet & greet, flight monitoring. Milan city, Lake Como, Bellagio, Lugano. Fixed prices. Book today.',
  alternates: { canonical: '/malpensa-airport-transfer', languages: { en: '/malpensa-airport-transfer', it: '/it/transfer-aeroporto-malpensa', 'x-default': '/malpensa-airport-transfer' } },
}

const airport = getAirportBySlug('malpensa')!

export default function MalpensaTransferPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      popularDestinations={[
        { name: 'Milan City Centre', href: '/malpensa-to-milan', time: '45–60 min', priceFrom: 85 },
        { name: 'Lake Como', href: '/malpensa-to-lake-como', time: '60–80 min', priceFrom: 130 },
        { name: 'Bellagio', href: '/malpensa-to-bellagio', time: '75–90 min', priceFrom: 155 },
        { name: 'Lugano (CH)', href: '/malpensa-to-lugano', time: '60–75 min', priceFrom: 145 },
        { name: 'Bergamo City', href: '/malpensa-to-bergamo', time: '50–65 min', priceFrom: 95 },
        { name: 'Turin', href: '/malpensa-to-turin', time: '90–110 min', priceFrom: 195 },
      ]}
      about={`Milan Malpensa Airport (MXP) is the largest international airport in northern Italy, handling over 28 million passengers per year. Located 48km northwest of Milan city centre, it serves as the primary gateway for visitors to Milan, Lake Como, Lombardy, and the wider northern Italy region.

Malpensa has two terminals: Terminal 1 handles most international flights, while Terminal 2 is used primarily by easyJet and other low-cost carriers. Both terminals are connected by a free shuttle. Our drivers operate from both terminals and will meet you at the arrivals hall with a name board.

We monitor your flight in real time. Whether your flight arrives on time, early, or delayed, your professional NCC chauffeur will be ready and waiting — at no extra charge for delays. Transfer to Milan, Lake Como, Lugano, Bergamo, Turin, or anywhere else in northern Italy.`}
      tips={[
        'Terminal 1 handles most international flights; Terminal 2 is primarily easyJet. Both are connected by free shuttle. Please confirm your terminal when booking.',
        'Your driver will be waiting in the arrivals hall with a name board displaying your name. Baggage claim and customs take approximately 30–60 minutes after landing.',
        'We monitor your flight live. If delayed, your driver waits at no extra charge. If significantly early, please WhatsApp us and we will do our best to bring your pickup forward.',
        'The journey to Milan city centre takes 45–60 minutes under normal conditions, and 60–80 minutes to Lake Como. Allow extra time during rush hours (07:00–09:30 and 17:00–19:30).',
        'Our vehicles comfortably accommodate all standard luggage plus extra bags. If you have oversized items (golf clubs, skis, wheelchairs), please mention this when booking.',
      ]}
    />
  )
}
