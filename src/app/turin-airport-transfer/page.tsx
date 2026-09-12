import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Turin Airport Transfer | Private Chauffeur TRN Caselle | Italy Taxi Services',
  description: 'Private NCC transfer from Turin Caselle Airport (TRN). Turin city €50, Aosta €90, Lake Maggiore €100, Sestriere ski resort €120. Fixed prices. Book today.',
}

const airport = getAirportByCode('TRN')!

export default function TurinAirportPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      popularDestinations={[
        { name: 'Turin City Centre', href: '/milan-chauffeur-service', time: '25–35 min', priceFrom: 50 },
        { name: 'Milan (MXP/MIL)', href: '/milan-chauffeur-service', time: '90 min', priceFrom: 130 },
        { name: 'Aosta', href: '/milan-chauffeur-service', time: '75 min', priceFrom: 90 },
        { name: 'Sestriere / Ski Resorts', href: '/milan-chauffeur-service', time: '90 min', priceFrom: 120 },
        { name: 'Lake Maggiore', href: '/milan-chauffeur-service', time: '80 min', priceFrom: 100 },
        { name: 'Barolo / Langhe Wine Region', href: '/milan-chauffeur-service', time: '60 min', priceFrom: 80 },
      ]}
      about={`Turin Caselle International Airport (TRN) serves the Piedmont capital and the surrounding Alpine region. Located 15km north of Turin city centre, it is the gateway to the Valle d'Aosta, the Alpine ski resorts (Sestriere, Courmayeur), and the Langhe wine region — home to Barolo and Barbaresco.

Our private NCC transfer from TRN covers Turin city, the Langhe wine area, Alpine resorts, and Lake Maggiore. Turin itself is one of Italy's most underrated cities — elegant Baroque architecture, world-class museums (Egyptian Museum, Museo dell'Automobile), and exceptional food.

For ski season transfers to Sestriere or Courmayeur, our vehicles have large boot space for ski equipment. Chains or winter tyres are fitted as required.`}
      tips={[
        'Turin city centre is 25–35 minutes from TRN via the A55 motorway. Our private NCC is much faster than the GTT city bus, especially with luggage.',
        'For ski resorts (Sestriere, Sauze d\'Oulx, Courmayeur), pre-book transfers well in advance during ski season — demand is very high December–March.',
        'The Langhe wine region (Barolo, Barbaresco, Asti) is a popular day trip from Turin — we can arrange winery visits with transfer from the airport.',
        'Milan Malpensa (MXP) is 90 minutes from TRN — for connecting international flights between Piedmont and Milan.',
        'Turin\'s Porta Nuova and Porta Susa train stations are both served from the airport — our transfer goes door to door to your exact address.',
      ]}
    />
  )
}
