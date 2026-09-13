import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Transfer Privato Aeroporto Bergamo BGY | NCC Orio al Serio | Italy Taxi Services',
  description: 'Transfer privato NCC dall\'aeroporto di Bergamo Orio al Serio (BGY). Milano da €90, Lago di Como €140, Brescia €80. Meet & greet incluso. Prenota ora.',
  alternates: {
    canonical: '/it/transfer-aeroporto-bergamo',
    languages: { en: '/bergamo-airport-transfer', it: '/it/transfer-aeroporto-bergamo', 'x-default': '/bergamo-airport-transfer' },
  },
}

const airport = getAirportByCode('BGY')!

export default function BergamoItPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      locale="it"
      baseHref="/it"
      airportTransfersHref="/it"
      popularDestinations={[
        { name: 'Centro Milano', href: '/it/servizio-chauffeur-milano', time: '50–65 min', priceFrom: 90 },
        { name: 'Malpensa (MXP)', href: '/it/transfer-aeroporto-malpensa', time: '60 min', priceFrom: 100 },
        { name: 'Città di Bergamo', href: '/it/servizio-chauffeur-milano', time: '15 min', priceFrom: 40 },
        { name: 'Lago di Como', href: '/it/malpensa-lago-como', time: '80 min', priceFrom: 140 },
        { name: 'Brescia', href: '/it/servizio-chauffeur-milano', time: '45 min', priceFrom: 80 },
        { name: 'Lago di Garda', href: '/it/servizio-chauffeur-milano', time: '75 min', priceFrom: 120 },
      ]}
      about={`L'Aeroporto di Bergamo Orio al Serio (BGY) è uno degli hub low-cost più trafficati d'Italia, con oltre 15 milioni di passeggeri all'anno — principalmente voli Ryanair da tutta Europa. Nonostante il nome commerciale "Milan Bergamo", si trova in realtà a 45 km da Milano e a soli 5 km dalla splendida Città Alta di Bergamo.

Il nostro transfer privato NCC da BGY copre tutte le destinazioni principali: centro di Milano, Malpensa per voli in coincidenza, Lago di Como, Lago di Garda, Brescia e la città di Bergamo stessa.

L'aeroporto ha un unico terminal con segnaletica chiara per gli arrivi. Il nostro autista ti attende nel terminal arrivi con cartello nominativo. A differenza dei bus navetta condivisi per Milano, il nostro transfer privato ti porta direttamente alla tua destinazione esatta — hotel, ufficio o indirizzo — senza attese per altri passeggeri.`}
      tips={[
        'BGY viene commercializzato come "Milan Bergamo" da Ryanair ma dista 45 km da Milano. Il nostro transfer verso il centro città richiede 50–65 minuti via autostrada A4.',
        'La splendida Città Alta di Bergamo dista solo 5 km dall\'aeroporto. Se soggiorni a Bergamo invece che a Milano, il transfer richiede solo 15 minuti.',
        'Per le coincidenze verso Malpensa (MXP) per voli intercontinentali, calcola almeno 90 minuti più i controlli di sicurezza. Consigliamo di prenotare il transfer con largo anticipo.',
        'BGY ha una disponibilità di taxi ufficiali molto limitata. I transfer privati NCC prenotati in anticipo sono l\'opzione più affidabile, specialmente in tarda serata.',
        'L\'aeroporto non ha un collegamento diretto in treno o metro con Milano. Il bus impiega oltre 60 minuti. Il nostro transfer privato è l\'opzione più efficiente.',
      ]}
    />
  )
}
