import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Transfer Privato Aeroporto Venezia Marco Polo VCE | NCC Venezia | Italy Taxi Services',
  description: 'Transfer privato NCC dall\'aeroporto di Venezia Marco Polo (VCE). Mestre, Venezia, Padova, Verona, Treviso, Bologna. Prezzi fissi. Meet & greet. Prenota ora.',
  alternates: {
    canonical: '/it/transfer-aeroporto-venezia',
    languages: { en: '/marco-polo-airport-transfer', it: '/it/transfer-aeroporto-venezia' },
  },
}

const airport = getAirportByCode('VCE')!

export default function VeneziaMarcoPolo() {
  return (
    <AirportPageTemplate
      airport={airport}
      locale="it"
      baseHref="/it"
      airportTransfersHref="/it"
      popularDestinations={[
        { name: 'Venezia Mestre', href: '/marco-polo-airport-transfer', time: '20 min', priceFrom: 45 },
        { name: 'Piazzale Roma (Venezia)', href: '/marco-polo-airport-transfer', time: '25 min', priceFrom: 55 },
        { name: 'Terminal Crociere Venezia', href: '/it/servizio-chauffeur-venezia', time: '30 min', priceFrom: 65 },
        { name: 'Padova', href: '/marco-polo-airport-transfer', time: '45 min', priceFrom: 90 },
        { name: 'Verona', href: '/marco-polo-airport-transfer', time: '75 min', priceFrom: 130 },
        { name: 'Treviso', href: '/marco-polo-airport-transfer', time: '35 min', priceFrom: 80 },
      ]}
      about={`L'Aeroporto di Venezia Marco Polo (VCE) è il principale scalo aeroportuale del Veneto e del Nord-Est Italia. Situato sulla terraferma, a circa 12 km dal centro di Venezia Mestre e 15 km da Piazzale Roma, l'aeroporto serve oltre 10 milioni di passeggeri l'anno.

Il nostro servizio NCC dall'aeroporto di Venezia offre transfer privati verso Mestre, Piazzale Roma, il Terminal Crocieristico, Padova, Verona, Treviso e Bologna. L'autista attende all'uscita degli arrivi con cartello nominativo.

Una particolarità di Venezia: i veicoli non possono entrare nel centro storico. I nostri driver vi porteranno a Piazzale Roma (l'ultimo punto raggiungibile in auto), da dove potrete proseguire in vaporetto. Oppure possiamo organizzare un servizio in motoscafo privato.`}
      tips={[
        'I veicoli non possono accedere al centro storico di Venezia. Il punto di arrivo per i transfer in auto è Piazzale Roma, da cui potrete prendere il vaporetto o organizzare un water taxi.',
        'Il Ponte della Libertà (collegamento tra la terraferma e Venezia) è soggetto a pedaggio e a traffico intenso in alta stagione (giugno–settembre). Consigliamo di calcolare tempi extra.',
        'Per il Terminal Crocieristico di Venezia esistono due terminal principali (Marittima e San Basilio). Specificate sempre quale terminal di imbarco al momento della prenotazione.',
        'Dall\'aeroporto Marco Polo si può raggiungere il centro di Venezia anche con il vaporetto Alilaguna (circa 1h 15min). Il nostro transfer NCC è più rapido e porta fino a Piazzale Roma (25 min).',
        'Per Verona, considerate che l\'Arena di Verona ospita concerti ed eventi lirici estivi — prenotate il transfer con ampio anticipo in questi periodi.',
      ]}
    />
  )
}
