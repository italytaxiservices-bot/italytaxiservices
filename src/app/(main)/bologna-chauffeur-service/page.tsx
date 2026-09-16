import type { Metadata } from 'next'
import CityPageTemplate from '@/components/templates/CityPageTemplate'
import { cities } from '@/data/cities'

export const metadata: Metadata = {
  title: 'Private Chauffeur Service Bologna | NCC Bologna',
  description: 'Private chauffeur NCC service in Bologna. Marconi airport transfers, Modena, Florence, Motor Valley tours, Rimini. Fixed prices, 24/7. Book today.',
  alternates: { canonical: '/bologna-chauffeur-service' },
}

const city = cities.find(c => c.slug === 'bologna')!

export default function BolognaPage() {
  return (
    <CityPageTemplate
      city={city}
      highlights={[
        'Bologna Marconi Airport BLQ',
        'Motor Valley — Ferrari, Lamborghini, Maserati',
        'Florence & Tuscany connections',
        'Adriatic Riviera (Rimini, Riccione)',
      ]}
      about={`Bologna is one of Italy's great but underrated cities — famous for its extraordinary food (tortellini, ragù, mortadella), its medieval towers and porticoes (a UNESCO World Heritage Site), one of the world's oldest universities, and a central position that makes it ideal for reaching northern and central Italy.

Our NCC chauffeur service in Bologna covers the city and all surrounding destinations: Florence (75 minutes south via the A1), Modena (35 minutes — Motor Valley HQ), Venice (90 minutes east), and the Adriatic coast (Rimini, Riccione) 75 minutes south-east.

Bologna Marconi Airport (BLQ) is just 6km from the city — one of Italy's most conveniently located airports. Our meet & greet transfers are available 24/7.`}
      services={[
        { title: 'Bologna Airport Transfer (BLQ)', description: 'Private NCC from Bologna Marconi Airport to the city and all Emilia-Romagna destinations. 15 minutes to the centre.' },
        { title: 'Motor Valley Tours', description: 'Private driver for Ferrari Museum (Maranello), Lamborghini Museum (Sant\'Agata), Pagani Atelier — the world\'s greatest car region.' },
        { title: 'Bologna to Florence', description: 'Direct private transfer between Bologna and Florence — 75 minutes via the A1 through the Apennine hills.' },
        { title: 'Corporate & Business Travel', description: 'Bologna hosts major trade fairs (EIMA, SANA, Artigiano). Reliable NCC transfers for business travellers and exhibition visitors.' },
        { title: 'Adriatic Riviera', description: 'Transfer from Bologna to Rimini, Riccione, and the Adriatic beach resorts. 75 minutes via the A14 motorway.' },
        { title: 'Long-Distance Routes', description: 'Bologna to Venice, Milan, Rome, or Naples — comfortable private transfers with professional NCC chauffeurs.' },
      ]}
    />
  )
}
