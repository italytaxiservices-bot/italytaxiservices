import type { Metadata } from 'next'
import CityPageTemplate from '@/components/templates/CityPageTemplate'
import { getCityBySlug } from '@/data/cities'

export const metadata: Metadata = {
  title: 'Private Chauffeur Service Florence | NCC Florence',
  description: 'Professional private chauffeur and NCC service in Florence. Airport transfers, Tuscany tours, Siena, Pisa, Chianti. Fixed prices, licensed operators.',
  alternates: { canonical: '/florence-chauffeur-service', languages: { en: '/florence-chauffeur-service', it: '/it/servizio-chauffeur-firenze', 'x-default': '/florence-chauffeur-service' } },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/florence-chauffeur-service',
    title: 'Private Chauffeur Service Florence | NCC Florence | Italy Taxi Services',
    description: 'Professional private chauffeur and NCC service in Florence. Airport transfers, Tuscany tours, Siena, Pisa, Chianti. Fixed prices, licensed operators.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private Chauffeur Service Florence | NCC Florence | Italy Taxi Services',
    description: 'Professional private chauffeur and NCC service in Florence. Airport transfers, Tuscany tours, Siena, Pisa, Chianti. Fixed prices, licensed operators.',
    images: ['/logo.webp'],
  },
}

const city = getCityBySlug('florence')!

export default function FlorenceChauffeurPage() {
  return (
    <CityPageTemplate
      city={city}
      highlights={[
        'Florence & Pisa airports',
        'Tuscany day trips',
        'Siena, Pisa, Chianti',
        'Luxury villa transfers',
      ]}
      about={`Florence — the cradle of the Renaissance — is one of Italy's most beloved destinations. Our professional NCC chauffeurs serve Florence city, Florence Peretola Airport, Pisa Galileo Galilei Airport, and the entire Tuscany region.

Whether you need an airport transfer, a private day trip to Siena and the Chianti hills, or a long-distance transfer to Rome, Venice, or the Cinque Terre, our licensed NCC partners provide seamless, comfortable service throughout Tuscany.

Florence is a compact historic city where private chauffeur hire gives you the freedom to explore at your own pace — from the Uffizi and Ponte Vecchio to the vineyards of Chianti and the medieval towers of San Gimignano. Our drivers know Tuscany intimately and can suggest the most scenic routes.`}
      services={[
        {
          title: 'Florence Airport Transfer',
          description: 'Private NCC transfers from Florence Peretola (FLR) to city centre and Tuscany. Meet & greet included.',
        },
        {
          title: 'Pisa Airport Transfer',
          description: 'Private transfers from Pisa Galileo Galilei (PSA) to Florence, Pisa, Lucca, and across Tuscany.',
        },
        {
          title: 'Florence to Siena',
          description: 'Private transfer from Florence to Siena, through the Chianti hills. Day trips and one-way available.',
        },
        {
          title: 'Tuscany Private Tours',
          description: 'Full-day Tuscany tours — Chianti vineyards, San Gimignano, Montepulciano, Montalcino. Hourly hire.',
        },
        {
          title: 'Florence to Pisa',
          description: 'Private transfer to Pisa and the Leaning Tower. Day trip or one-way. Fixed price.',
        },
        {
          title: 'Florence to Rome',
          description: 'Long-distance private transfer from Florence to Rome. Skip the train — door to door comfort.',
        },
      ]}
      faqs={[
        { q: 'How much is a private chauffeur in Florence?', a: 'Airport transfers from Florence (FLR) start from €30 and from Pisa (PSA) from around €95. Tuscany day tours and full-day chauffeur hire are quoted at a fixed price for your itinerary — agreed before you travel.' },
        { q: 'Can your Florence driver access the historic-centre ZTL?', a: 'Yes. Florence\'s entire historic centre is a ZTL limited-traffic zone. Our licensed NCC drivers hold the required permits and drop you as close to your hotel entrance as the rules allow.' },
        { q: 'Do you offer Tuscany wine tours from Florence?', a: 'Yes. We provide private chauffeur tours through Chianti, to Siena, San Gimignano, Montalcino and the Tuscan vineyards — a comfortable, flexible alternative to a group bus tour.' },
        { q: 'Can you drive us from Florence to Pisa or Cinque Terre?', a: 'Yes. Florence to Pisa starts from around €95, and we also run transfers to Siena, Lucca and the Cinque Terre gateway towns — all door-to-door at fixed prices.' },
      ]}
    />
  )
}
