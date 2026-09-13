import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Transfer Privato Fiumicino Civitavecchia | Porto Crociere',
  description: 'Transfer privato NCC da Fiumicino FCO al porto crociere di Civitavecchia. Da €110. Ideale per imbarco e sbarco crociere. Prenota ora.',
  alternates: {
    canonical: '/it/fiumicino-civitavecchia',
    languages: { en: '/fiumicino-to-civitavecchia', it: '/it/fiumicino-civitavecchia', 'x-default': '/fiumicino-to-civitavecchia' },
  },
}

const route = getRouteBySlug('fiumicino-to-civitavecchia')!

export default function FiumicinoCivitavecchiaPage() {
  return (
    <RoutePageTemplate
      route={route}
      locale="it"
      baseHref="/it"
      about={`Il transfer privato NCC da Fiumicino al porto di Civitavecchia è il percorso ideale per i crocieristi che arrivano all\'aeroporto di Roma e devono raggiungere il porto per l\'imbarco. Civitavecchia è il principale porto crocieristico del Mediterraneo Centrale, con oltre 2 milioni di passeggeri all\'anno.

Il percorso da Fiumicino a Civitavecchia è di circa 80 km e richiede circa 60–75 minuti via autostrada A12 (Roma–Civitavecchia). È un percorso semplice e ben gestibile — molto più comodo rispetto all\'alternativa di fare prima il transfer a Roma e poi prendere il treno verso il porto.

Offriamo anche il percorso inverso: dall\'arrivo al porto di Civitavecchia verso l\'aeroporto di Fiumicino per i voli di rientro.`}
      included={[
        'Transfer diretto Fiumicino → Civitavecchia (senza passare per Roma)',
        'Prelievo nel Terminal Arrivi di Fiumicino',
        'Consegna direttamente alla banchina crocieristica',
        'Prezzo fisso — pedaggi A12 inclusi',
        'Monitoraggio volo in tempo reale',
        'Disponibile anche percorso inverso (porto → aeroporto)',
        'Veicolo con ampio bagagliaio per i bagagli da crociera',
        'Acqua minerale in omaggio',
      ]}
      faqs={[
        {
          q: 'È più conveniente passare per Roma o prendere il diretto per Civitavecchia?',
          a: 'Il transfer diretto Fiumicino–Civitavecchia (senza passare per Roma) è la soluzione più rapida ed economica per i crocieristi. Evitate il traffico di Roma, risparmiando tempo e denaro. Il costo è simile a quello del transfer Fiumicino–Roma.',
        },
        {
          q: 'A quale terminal del porto ci consegnate?',
          a: 'Il porto di Civitavecchia ha diversi terminal crocieristici. Indicateci la compagnia di navigazione e il nome della nave al momento della prenotazione — vi porteremo esattamente al terminal corretto.',
        },
        {
          q: 'Coprite anche il percorso inverso (porto → aeroporto)?',
          a: 'Sì, assolutamente. Il percorso di ritorno Civitavecchia → Fiumicino è disponibile alla stessa tariffa. Molti crocieristi prenotano andata e ritorno insieme.',
        },
        {
          q: 'Che succede se la nave arriva in ritardo?',
          a: 'Monitoriamo l\'arrivo della nave via MarineTraffic. Se la nave è in ritardo, l\'autista attende. Per ritardi superiori a 2 ore, vi contatteremo per concordare la gestione. Il prezzo rimane fisso.',
        },
      ]}
    />
  )
}
