import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Verona Airport Transfer | Private Chauffeur VRN Villafranca',
  description: 'Private NCC transfer from Verona Villafranca Airport (VRN). Verona city €45, Lake Garda €55, Venice €130, Dolomites €180. Fixed prices, meet & greet. Book today.',
  alternates: { canonical: '/verona-airport-transfer' },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/verona-airport-transfer',
    title: 'Verona Airport Transfer | Private Chauffeur VRN Villafranca | Italy Taxi Services',
    description: 'Private NCC transfer from Verona Villafranca Airport (VRN). Verona city €45, Lake Garda €55, Venice €130, Dolomites €180. Fixed prices, meet & greet. Book today.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verona Airport Transfer | Private Chauffeur VRN Villafranca | Italy Taxi Services',
    description: 'Private NCC transfer from Verona Villafranca Airport (VRN). Verona city €45, Lake Garda €55, Venice €130, Dolomites €180. Fixed prices, meet & greet. Book today.',
    images: ['/logo.webp'],
  },
}

const airport = getAirportByCode('VRN')!

export default function VeronaAirportPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      popularDestinations={[
        { name: 'Verona City Centre', href: '/venice-chauffeur-service', time: '15–20 min', priceFrom: 45 },
        { name: 'Lake Garda (Sirmione)', href: '/venice-chauffeur-service', time: '30 min', priceFrom: 55 },
        { name: 'Lake Garda (Riva del Garda)', href: '/venice-chauffeur-service', time: '60 min', priceFrom: 90 },
        { name: 'Venice', href: '/venice-chauffeur-service', time: '90 min', priceFrom: 130 },
        { name: 'Dolomites / Bolzano', href: '/venice-chauffeur-service', time: '120 min', priceFrom: 180 },
        { name: 'Brescia', href: '/milan-chauffeur-service', time: '45 min', priceFrom: 70 },
      ]}
      about={`Verona Villafranca Airport (VRN) — officially Valerio Catullo Airport — serves the Veneto and Lake Garda region, located 12km south-west of Verona city centre. It is the most convenient airport for Lake Garda, the Dolomites, and Verona itself.

Verona is one of Italy's most romantic cities — home to the Arena di Verona (open-air opera), Juliet's balcony, and a beautiful Roman and medieval heritage. Our NCC transfer from VRN reaches Verona's historic centre in just 15–20 minutes.

Lake Garda is even closer — Sirmione, with its famous thermal baths and castle, is just 30 minutes. For the Dolomites, VRN is a practical gateway, with Bolzano reachable in approximately 2 hours.`}
      tips={[
        'VRN is the best airport for Lake Garda — Sirmione is only 30 minutes, Desenzano 25 minutes, and Riva del Garda about 60 minutes.',
        'During the Arena di Verona opera season (June–September), demand for transfers is high. Book well in advance.',
        'For the Dolomites, VRN is one of the most practical airports — less traffic than via Venice or Milan.',
        'Venice is 90 minutes via the A4 motorway — a good alternative if VCE flights don\'t suit your schedule.',
        'The airport has one terminal and is compact. Our driver meets you in the arrivals hall with a name board.',
      ]}
    />
  )
}
