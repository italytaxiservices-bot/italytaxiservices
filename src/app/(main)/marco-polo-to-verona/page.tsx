import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Marco Polo to Verona Transfer | Private Chauffeur',
  description: 'Private NCC transfer from Venice Marco Polo Airport to Verona. From €150. Professional chauffeur, meet & greet, fixed price. Book today.',
  alternates: { canonical: '/marco-polo-to-verona' },
}

const route = getRouteBySlug('marco-polo-to-verona')!

export default function MarcoPoloToVeronaPage() {
  return (
    <RoutePageTemplate
      route={route}
      about={`Venice Marco Polo Airport (VCE) is the natural gateway for visitors heading to Verona, since Verona's own airport (Villafranca) has far fewer international connections. A private chauffeur transfer covers the 120km via the A4 motorway in around 90–110 minutes, taking you directly to your hotel, wedding venue, or the historic centre near the Arena di Verona.

This route is especially popular for wedding guests — Verona and the surrounding Valpolicella wine region host frequent destination weddings, and coordinating group arrivals with a fixed departure window from the airport is far more reliable than public transport. We can also arrange multiple vehicles for larger wedding parties travelling together.

Beyond weddings, Verona draws visitors for its opera season at the Roman Arena, its historic centre (a UNESCO World Heritage Site), and as a base for exploring Lake Garda, just 30 minutes further west.`}
      included={[
        'Meet & greet at Marco Polo arrivals',
        'Direct transfer via the A4 motorway',
        'Historic centre or venue drop-off',
        'Group vehicles available for weddings',
        'Fixed price — all tolls included',
        'Professional NCC chauffeur',
        'Bottled water',
        'Flight monitoring',
      ]}
      faqs={[
        {
          q: 'How long is the transfer from Marco Polo Airport to Verona?',
          a: 'Around 90 to 110 minutes via the A4 motorway, depending on traffic and your exact destination.',
        },
        {
          q: 'Can you organise transfers for a wedding party arriving on different flights?',
          a: 'Yes. We regularly coordinate multiple vehicles and staggered pickup times for wedding groups. Contact us with your guest list and flight details for a group quote.',
        },
        {
          q: 'Do you continue on to Lake Garda?',
          a: "Yes, Lake Garda is roughly 30 minutes beyond Verona and can be arranged as an extension of this route or booked separately.",
        },
        {
          q: 'Is Verona airport (Villafranca) a closer option?',
          a: "Verona's own airport has fewer international routes, so most travellers connect via Venice Marco Polo. We also serve Verona Airport directly if that's where you land.",
        },
      ]}
    />
  )
}
