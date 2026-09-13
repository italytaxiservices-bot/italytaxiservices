import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Transfer Privato Aeroporto Linate LIN | NCC Milano | Italy Taxi Services',
  description: 'Transfer privato NCC dall\'aeroporto di Linate (LIN). Centro Milano da €65, Malpensa €95, Lago di Como €150. Meet & greet incluso. Prenota ora.',
  alternates: {
    canonical: '/it/transfer-aeroporto-linate',
    languages: { en: '/linate-airport-transfer', it: '/it/transfer-aeroporto-linate', 'x-default': '/linate-airport-transfer' },
  },
}

const airport = getAirportByCode('LIN')!

export default function LinateItPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      locale="it"
      baseHref="/it"
      airportTransfersHref="/it"
      popularDestinations={[
        { name: 'Centro Milano', href: '/it/servizio-chauffeur-milano', time: '20–30 min', priceFrom: 65 },
        { name: 'Malpensa (MXP)', href: '/it/transfer-aeroporto-malpensa', time: '60 min', priceFrom: 95 },
        { name: 'Stazione Centrale Milano', href: '/it/servizio-chauffeur-milano', time: '25 min', priceFrom: 70 },
        { name: 'Bergamo (BGY)', href: '/it/transfer-aeroporto-bergamo', time: '55 min', priceFrom: 100 },
        { name: 'Lago di Como', href: '/it/malpensa-lago-como', time: '75 min', priceFrom: 150 },
        { name: 'Monza', href: '/it/servizio-chauffeur-milano', time: '35 min', priceFrom: 80 },
      ]}
      about={`L'Aeroporto di Milano Linate (LIN) è l'aeroporto più vicino al centro città, a soli 7 km — la scelta più comoda per chi viaggia per lavoro o soggiorna nel centro di Milano. Linate gestisce principalmente voli nazionali ed europei a corto raggio.

Il nostro transfer privato NCC da Linate è ideale per: chi deve raggiungere rapidamente un appuntamento di lavoro, ospiti di hotel che desiderano un servizio porta a porta, e passeggeri in coincidenza verso Malpensa (MXP) per voli intercontinentali.

Linate è in continua modernizzazione — la nuova linea M4 collega l'aeroporto al centro di Milano in meno di 15 minuti. Tuttavia, per un servizio porta a porta con bagagli, il nostro transfer privato NCC resta l'opzione più comoda.`}
      tips={[
        'Linate dista solo 7 km da Piazza San Babila (centro città) — il transfer richiede circa 20–30 minuti, rendendolo l\'aeroporto più veloce di Milano per le destinazioni centrali.',
        'La metro M4 collega Linate al centro città. Il nostro servizio NCC è ideale se hai più bagagli, una destinazione specifica, o desideri un\'esperienza più comoda.',
        'Per trasferimenti tra aeroporti (Linate-Malpensa per voli intercontinentali in coincidenza), calcola almeno 90 minuti. Consigliamo di prenotare in anticipo.',
        'Linate è molto utilizzato dai viaggiatori d\'affari — le partenze possono essere più intense il lunedì mattina e il venerdì sera. Pianifica di conseguenza il tuo transfer di partenza.',
        'Il nostro autista ti attende nel terminal arrivi con cartello nominativo. Nessuna necessità di cercare un taxi o orientarsi sui mezzi pubblici con i bagagli.',
      ]}
    />
  )
}
