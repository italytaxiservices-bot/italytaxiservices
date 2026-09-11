import type { Metadata } from 'next'
import AirportPageTemplate from '@/components/templates/AirportPageTemplate'
import { getAirportByCode } from '@/data/airports'

export const metadata: Metadata = {
  title: 'Transfer Privato Aeroporto Malpensa MXP | NCC Malpensa | Italy Chauffeur',
  description: 'Transfer privato NCC dall\'aeroporto di Malpensa (MXP). Milano da €85, Lago di Como €130, Lugano €170. Meet & greet, monitoraggio volo. Prenota ora.',
  alternates: {
    canonical: '/it/transfer-aeroporto-malpensa',
    languages: { en: '/malpensa-airport-transfer', it: '/it/transfer-aeroporto-malpensa' },
  },
}

const airport = getAirportByCode('MXP')!

export default function MalpensaItPage() {
  return (
    <AirportPageTemplate
      airport={airport}
      locale="it"
      baseHref="/it"
      airportTransfersHref="/it"
      popularDestinations={[
        { name: 'Milano Centro', href: '/it/malpensa-milano', time: '45–60 min', priceFrom: 85 },
        { name: 'Lago di Como', href: '/it/malpensa-lago-como', time: '60–75 min', priceFrom: 130 },
        { name: 'Bellagio', href: '/malpensa-to-bellagio', time: '90 min', priceFrom: 155 },
        { name: 'Lugano (CH)', href: '/malpensa-to-milan', time: '50 min', priceFrom: 120 },
        { name: 'Bergamo', href: '/malpensa-airport-transfer', time: '65 min', priceFrom: 110 },
        { name: 'Milano Stazione Centrale', href: '/it/malpensa-milano', time: '50 min', priceFrom: 90 },
      ]}
      about={`L'Aeroporto di Milano Malpensa (MXP) è il più grande aeroporto della Lombardia e il secondo d'Italia per traffico passeggeri. Situato a circa 50 km a nord-ovest di Milano, Malpensa serve voli intercontinentali verso le principali destinazioni mondiali con oltre 25 milioni di passeggeri all'anno.

Il nostro servizio NCC da Malpensa offre transfer privati a prezzo fisso verso Milano, il Lago di Como, Bellagio, Lugano, Bergamo e tutte le principali destinazioni del Nord Italia. L'autista attende nel Terminal Arrivi con cartello nominativo personalizzato.

Il servizio include monitoraggio del volo in tempo reale: se il volo arriva in ritardo, il driver adegua automaticamente l'orario di prelievo senza costi aggiuntivi. Il prezzo concordato è sempre fisso — nessun supplemento per il traffico o le soste.`}
      tips={[
        'Il Terminal 1 serve la maggior parte dei voli intercontinentali e di lungo raggio. Il Terminal 2 è usato da easyJet. Assicurati di indicarci il terminal corretto al momento della prenotazione.',
        'Il nostro autista attende nel Terminal Arrivi con cartello nominativo per 60 minuti dopo l\'atterraggio — il tempo sufficiente per il ritiro bagagli e i controlli doganali.',
        'Per i voli in partenza, consigliamo di prenotare il transfer almeno 3 ore prima dell\'orario di check-in. Monitoriamo il traffico e adeguiamo l\'orario di partenza.',
        'Il parcheggio a Malpensa è molto costoso. Il nostro servizio include il ritiro diretto davanti al terminal, senza attese in parcheggio.',
        'Per destinazioni come il Lago di Como o Lugano, il viaggio da Malpensa è particolarmente comodo — evitando del tutto il caos del centro di Milano.',
      ]}
    />
  )
}
