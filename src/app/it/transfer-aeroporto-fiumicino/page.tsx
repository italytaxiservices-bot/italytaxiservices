import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Transfer Privato Aeroporto Fiumicino FCO | NCC Roma',
  description: 'Transfer privato NCC dall\'aeroporto di Fiumicino Leonardo da Vinci (FCO). Roma da €65, Civitavecchia €110, Napoli €280. Meet & greet incluso. Prenota ora.',
  alternates: {
    canonical: '/it/transfer-aeroporto-fiumicino',
    languages: { en: '/fiumicino-airport-transfer', it: '/it/transfer-aeroporto-fiumicino', 'x-default': '/fiumicino-airport-transfer' },
  },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/it/transfer-aeroporto-fiumicino',
    title: 'Transfer Privato Aeroporto Fiumicino FCO | NCC Roma | Italy Taxi Services',
    description: 'Transfer privato NCC dall\'aeroporto di Fiumicino Leonardo da Vinci (FCO). Roma da €65, Civitavecchia €110, Napoli €280. Meet & greet incluso. Prenota ora.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transfer Privato Aeroporto Fiumicino FCO | NCC Roma | Italy Taxi Services',
    description: 'Transfer privato NCC dall\'aeroporto di Fiumicino Leonardo da Vinci (FCO). Roma da €65, Civitavecchia €110, Napoli €280. Meet & greet incluso. Prenota ora.',
    images: ['/logo.webp'],
  },
}

const airport = getAirportByCode('FCO')!

export default function FiumicinoItPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      locale="it"
      baseHref="/it"
      airportTransfersHref="/it"
      popularDestinations={[
        { name: 'Roma Centro Storico', href: '/it/fiumicino-roma', time: '40–55 min', priceFrom: 65 },
        { name: 'Porto di Civitavecchia', href: '/it/fiumicino-civitavecchia', time: '75 min', priceFrom: 110 },
        { name: 'Città del Vaticano', href: '/fiumicino-to-rome', time: '45 min', priceFrom: 70 },
        { name: 'Napoli', href: '/rome-to-naples', time: '2h 30min', priceFrom: 260 },
        { name: 'Costiera Amalfitana', href: '/it/roma-costiera-amalfitana', time: '3h', priceFrom: 380 },
        { name: 'Firenze', href: '/it/servizio-chauffeur-firenze', time: '2h 45min', priceFrom: 320 },
      ]}
      about={`L'Aeroporto Internazionale Leonardo da Vinci di Fiumicino (FCO) è il principale aeroporto di Roma e il più trafficato d'Italia, con oltre 40 milioni di passeggeri l'anno. Situato a circa 30 km a ovest del centro di Roma, Fiumicino è lo scalo principale per i voli intercontinentali da e per l'Italia.

Il nostro servizio NCC da Fiumicino offre transfer privati a prezzo fisso verso il centro di Roma, Civitavecchia (porto crociere), Napoli, la Costiera Amalfitana e Firenze. L'autista attende nel Terminal Arrivi con cartello nominativo.

A differenza delle navette collettive o dei taxi, il nostro servizio NCC è esclusivo: il veicolo è riservato solo a voi, nessuna attesa per altri passeggeri, percorso diretto verso la vostra destinazione.`}
      tips={[
        'Fiumicino ha 4 terminal principali. L\'autista si posiziona nel Terminal Arrivi corrispondente al vostro volo. Verificate il terminal di arrivo sul vostro biglietto.',
        'Il monitoraggio del volo è automatico: se il volo è in ritardo, il driver aspetta senza costi aggiuntivi fino a 60 minuti dal nuovo orario di atterraggio.',
        'Per il porto crocieristico di Civitavecchia, molti crocieristi preferiscono il transfer diretto da Fiumicino anziché passare per Roma — più rapido ed economico.',
        'L\'autostrada A91 (Fiumicino–Roma) è soggetta a traffico intenso nelle ore di punta (7:30–9:30 e 17:00–19:30). Consigliamo di pianificare i transfer in anticipo.',
        'Per i voli in partenza, il check-in a Fiumicino richiede almeno 2-3 ore (internazionali). Prenota il transfer NCC con almeno 3,5 ore di anticipo rispetto al check-in.',
      ]}
    />
  )
}
