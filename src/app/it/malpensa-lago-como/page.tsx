import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Transfer Privato Malpensa Lago di Como | NCC Como | Italy Chauffeur',
  description: 'Transfer privato NCC dall\'aeroporto Malpensa al Lago di Como. Como, Bellagio, Varenna, Cernobbio. Da €130. Prezzo fisso. Prenota ora.',
  alternates: {
    canonical: '/it/malpensa-lago-como',
    languages: { en: '/malpensa-to-lake-como', it: '/it/malpensa-lago-como' },
  },
}

const route = getRouteBySlug('malpensa-to-lake-como')!

export default function MalpensaLagoComoPage() {
  return (
    <RoutePageTemplate
      route={route}
      locale="it"
      baseHref="/it"
      about={`Il transfer privato NCC da Malpensa al Lago di Como è uno dei percorsi più panoramici e richiesti del Nord Italia. Il Lago di Como, con le sue ville storiche, i borghi pittoreschi e le acque azzurre, è una delle destinazioni di lusso più famose d'Europa.

Il viaggio da Malpensa al Lago di Como richiede circa 60–75 minuti. Il percorso più diretto passa per la Pedemontana Lombarda verso Como città, da dove si può accedere a tutte le sponde del lago. Per Bellagio (punta del triangolo lariano), il tempo totale è di circa 90 minuti.

Serviamo tutte le principali località del lago: Como città, Bellagio, Varenna, Cernobbio, Menaggio, Tremezzo, Lenno e Villa del Balbianello. Offriamo anche transfer verso Lugano (Svizzera), a soli 50 minuti da Malpensa.`}
      included={[
        'Prelievo nel Terminal Arrivi di Malpensa',
        'Cartello nominativo personalizzato',
        'Monitoraggio volo in tempo reale',
        'Attesa gratuita fino a 60 minuti',
        'Tutte le località del Lago di Como servite',
        'Prezzo fisso — pedaggi inclusi',
        'Veicolo premium con bagagliaio capiente',
        'Acqua minerale in omaggio',
      ]}
      faqs={[
        {
          q: 'Quale borgo del Lago di Como servite?',
          a: 'Serviamo tutte le principali località: Como, Bellagio, Varenna, Cernobbio, Menaggio, Tremezzo, Lenno, Laglio, Ossuccio e altre. Indicate la destinazione specifica al momento della prenotazione.',
        },
        {
          q: 'Quanto costa il transfer da Malpensa a Bellagio?',
          a: 'Il transfer da Malpensa a Bellagio parte da €155 per berlina (fino a 3 passeggeri). Per il van V-Class (fino a 7 passeggeri) il prezzo è circa €230. I prezzi includono pedaggi e IVA.',
        },
        {
          q: 'Posso fermarmi a Como città prima di proseguire verso Bellagio?',
          a: 'Sì. Possiamo organizzare soste lungo il percorso a un prezzo supplementare. Indicate le vostre preferenze al momento della prenotazione e vi forniremo un preventivo completo.',
        },
        {
          q: 'Coprite anche Lugano, in Svizzera?',
          a: 'Sì. Malpensa → Lugano è uno dei nostri percorsi più richiesti (circa 50 minuti). Tenete presente che è necessario il passaporto o la carta d\'identità per attraversare il confine svizzero.',
        },
      ]}
    />
  )
}
