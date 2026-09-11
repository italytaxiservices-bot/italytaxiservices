import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Malpensa to Bellagio Transfer | Private Chauffeur | Italy Chauffeur',
  description: 'Private NCC transfer from Malpensa Airport to Bellagio, Lake Como. From €155. Direct service, meet & greet, fixed price. Book today.',
  alternates: { canonical: '/malpensa-to-bellagio' },
}

const route = getRouteBySlug('malpensa-to-bellagio')!

export default function MalpensaBellagioPage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`The Malpensa to Bellagio private transfer is one of the most scenic journeys in northern Italy. Bellagio — often called the pearl of Lake Como — sits at the tip of the Lariano triangle where the two southern branches of the lake meet. With its steep stepped lanes, waterfront cafés, and panoramic views, Bellagio is one of Italy's most beloved destinations.

The journey from Malpensa takes approximately 75–90 minutes. From the airport, we head north via the A8 motorway toward Varese, then east through Como along the SP583 lakeside road to Bellagio. The final stretch along the lake is particularly scenic.

Bellagio has no train station — private transfer is the most convenient option. We serve all Bellagio hotels, villas, and ferry ports. We also cover nearby Bellagio-area villages: Pescallo, San Giovanni, and Loppia.`}
      included={[
        'Meet & greet at Malpensa arrivals hall',
        'Name board at arrivals',
        'Flight monitoring in real time',
        'Direct route to Bellagio (no stops unless requested)',
        'Fixed price — all tolls included',
        'Premium vehicle with ample luggage space',
        'Bottled water',
        'Bellagio hotel, villa, or ferry pier drop-off',
      ]}
      faqs={[
        { q: 'Is there a train from Malpensa to Bellagio?', a: 'No. There is no direct train to Bellagio. The nearest train station is Varenna-Esino (on the eastern shore), requiring a change at Milan and a ferry from Varenna to Bellagio. Our direct private transfer is significantly faster and more convenient.' },
        { q: 'Can you drop me at the Bellagio ferry landing?', a: 'Yes. We drop off at the ferry landing (imbarcadero), hotels on the lakefront, or any specific address in Bellagio and the surrounding villages.' },
        { q: 'What is the difference between Lake Como and Bellagio transfer prices?', a: 'Our Lake Como transfer (€130) covers Como city and the southern shore. The Bellagio transfer (€155) covers the additional 25km to the tip of the Lariano triangle — a more scenic but longer route.' },
        { q: 'Can I stop in Como city on the way to Bellagio?', a: 'Yes. We can include a stop in Como city on request. This adds approximately 30–40 minutes to the journey and a small supplement. Please mention it at the time of booking.' },
      ]}
    />
  )
}
