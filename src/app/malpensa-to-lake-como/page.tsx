import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Malpensa to Lake Como Transfer | Private Chauffeur',
  description: 'Private transfer from Malpensa Airport to Lake Como. From €130. Direct NCC chauffeur to Como, Bellagio, Varenna, Menaggio. Book today.',
  alternates: { canonical: '/malpensa-to-lake-como', languages: { en: '/malpensa-to-lake-como', it: '/it/malpensa-lago-como', 'x-default': '/malpensa-to-lake-como' } },
}

const route = getRouteBySlug('malpensa-to-lake-como')!

export default function MalpensaToLakeComoPage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`The Malpensa to Lake Como private transfer is one of the most scenic and popular routes in northern Italy. From the airport, your professional NCC chauffeur will take you directly to your chosen Lake Como destination — whether that is the town of Como itself, the glamorous Bellagio, the charming Varenna, the peaceful Menaggio, or any other lakeside village.

The journey from Malpensa to Lake Como takes approximately 60–80 minutes via the A8/A9 motorway, depending on your specific destination on the lake. The route passes through the Brianza hills and provides beautiful early glimpses of the pre-Alpine landscape.

We serve all towns and villages on Lake Como: Como, Bellagio, Varenna, Menaggio, Tremezzo, Lenno, Cernobbio, Laglio, Moltrasio, Nesso, Gravedona, and more. If you are staying at a villa or private property, please share the address when booking.`}
      included={[
        'Meet & greet at Malpensa arrivals with name board',
        'Real-time flight monitoring',
        'Fixed price to your chosen Lake Como destination',
        'Professional NCC chauffeur',
        'All Lake Como towns served',
        'Bottled water provided',
        'All motorway tolls included',
        'Luggage assistance',
      ]}
      faqs={[
        {
          q: 'Do you serve all towns on Lake Como?',
          a: 'Yes — we cover every town and village on Lake Como including Como, Bellagio, Varenna, Menaggio, Tremezzo, Lenno, Cernobbio, Laglio, and more. Please specify your exact destination when booking.',
        },
        {
          q: 'How long does it take from Malpensa to Bellagio?',
          a: 'To Bellagio specifically, the journey takes approximately 80–95 minutes from Malpensa. The route goes via the A8/A9 motorway and then along the lake road.',
        },
        {
          q: 'Can I stop in Como town before continuing to Bellagio?',
          a: 'Yes. If you would like a brief stop in Como town before continuing along the lake, we can arrange this. Please mention it when booking and we will factor it into the journey.',
        },
        {
          q: 'Can I also book a return from Lake Como to Malpensa?',
          a: 'Absolutely. Return transfers from Lake Como to Malpensa are available. Book both directions at the same time for peace of mind — especially important during summer when demand is high.',
        },
      ]}
    />
  )
}
