import type { Metadata } from 'next'
import CityPageTemplate from '@/components/templates/CityPageTemplate'
import { getCityBySlug } from '@/data/cities'

export const metadata: Metadata = {
  title: 'Private Chauffeur Service Venice | NCC Venice | Italy Taxi Services',
  description: 'Professional private chauffeur and NCC service in Venice. Marco Polo airport transfers, cruise port connections, Mestre. Fixed prices, meet & greet.',
  alternates: { canonical: '/venice-chauffeur-service', languages: { en: '/venice-chauffeur-service', it: '/it/servizio-chauffeur-venezia', 'x-default': '/venice-chauffeur-service' } },
}

const city = getCityBySlug('venice')!

export default function VeniceChauffeurPage() {
  return (
    <CityPageTemplate
      city={city}
      highlights={[
        'Marco Polo Airport (VCE)',
        'Cruise terminal connections',
        'Mestre & Tronchetto',
        'Veneto region transfers',
      ]}
      about={`Venice is one of the world's most extraordinary cities — and reaching it requires a little planning. Private transfers arrive at the mainland (Mestre/Tronchetto), from where you can access the historic islands by water taxi or on foot. Our NCC chauffeurs specialise in seamless Venice connections.

Whether you're arriving at Venice Marco Polo Airport, departing from a cruise ship at the Venice Cruise Terminal, or need a private transfer between Venice and other Italian cities, our professional NCC partners provide door-to-door mainland service.

We handle all aspects of your Venice transfer — from the airport to your hotel's closest point on the mainland, or to Tronchetto for easy water taxi or people mover connections. We also offer long-distance transfers to Verona, Padua, Bologna, and beyond.`}
      services={[
        {
          title: 'Marco Polo Airport Transfer',
          description: 'Private NCC transfers from Venice Marco Polo (VCE) to Mestre, Tronchetto, and the wider Veneto region.',
        },
        {
          title: 'Venice Cruise Terminal Transfer',
          description: 'Private transfers to and from Venice Cruise Terminal. Perfect for cruise passengers with luggage.',
        },
        {
          title: 'Venice to Verona',
          description: 'Private long-distance transfer from Venice to Verona — home of Romeo and Juliet and the famous Arena.',
        },
        {
          title: 'Venice to Bologna',
          description: "Private long-distance transfer from Venice to Bologna, Italy's gastronomic capital.",
        },
        {
          title: 'Venice to Padua',
          description: 'Private transfers between Venice and Padua (Padova) — fast, comfortable, door to door.',
        },
        {
          title: 'Venice Group Transfers',
          description: 'Large group and family transfers with spacious vehicles. Cruise groups and wedding parties welcome.',
        },
      ]}
    />
  )
}
