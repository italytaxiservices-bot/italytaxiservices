import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Transfer Privato Roma Costiera Amalfitana | NCC Positano Amalfi | Italy Chauffeur',
  description: 'Transfer privato NCC da Roma alla Costiera Amalfitana. Positano, Amalfi, Ravello, Sorrento. Da €380. Autisti esperti sulla SS163. Prenota ora.',
  alternates: {
    canonical: '/it/roma-costiera-amalfitana',
    languages: { en: '/rome-to-amalfi-coast', it: '/it/roma-costiera-amalfitana' },
  },
}

const route = getRouteBySlug('rome-to-amalfi-coast')!

export default function RomaCostieraPage() {
  return (
    <RoutePageTemplate
      route={route}
      locale="it"
      baseHref="/it"
      about={`Il transfer privato NCC da Roma alla Costiera Amalfitana è uno dei percorsi più emozionanti d\'Italia. La Costiera Amalfitana (patrimonio UNESCO) è famosa in tutto il mondo per i suoi borghi arroccati sulle scogliere, le acque cristalline del Tirreno e la tortuosa SS163 — una delle strade costiere più scenografiche d\'Europa.

Il viaggio da Roma richiede circa 3–3,5 ore: prima via autostrada A1 verso Napoli, poi attraverso la Penisola Sorrentina e infine lungo la SS163 fino alle principali località della Costiera. I nostri autisti sono esperti su questo percorso specifico — fondamentale, dato che la SS163 è stretta, tortuosa e richiede grande abilità di guida.

Serviamo tutte le principali destinazioni della Costiera: Positano, Amalfi, Ravello, Praiano, Furore, Conca dei Marini, Atrani e Cetara. Operiamo anche verso Sorrento e il sito archeologico di Pompei.`}
      included={[
        'Transfer porta a porta Roma → Costiera Amalfitana',
        'Autisti esperti sulla SS163',
        'Tutte le località servite: Positano, Amalfi, Ravello, Praiano',
        'Prezzo fisso — pedaggi autostradali inclusi',
        'Veicolo confortevole per lunghe percorrenze',
        'Acqua minerale e refreshment',
        'Orario di partenza flessibile',
        'Sorrento e Pompei disponibili su richiesta',
      ]}
      faqs={[
        {
          q: 'Quali borghi della Costiera Amalfitana servite?',
          a: 'Serviamo tutti i borghi della Costiera: Positano, Amalfi, Ravello, Praiano, Atrani, Furore, Conca dei Marini e Cetara. Copriamo anche Sorrento e il sito archeologico di Pompei.',
        },
        {
          q: 'Quanto dura il viaggio da Roma a Positano?',
          a: 'Da Roma a Positano ci vogliono circa 3–3,5 ore in condizioni normali. Nei fine settimana di alta stagione (luglio–agosto), la SS163 può essere molto trafficata, aggiungendo 30–60 minuti. Consigliamo la partenza nelle prime ore del mattino.',
        },
        {
          q: 'La strada della Costiera Amalfitana è difficile?',
          a: 'La SS163 è stretta, tortuosa e spettacolare. Richiede un autista esperto e abituato a quel percorso specifico. I nostri driver conoscono la Costiera in ogni stagione e sanno come navigarla in sicurezza.',
        },
        {
          q: 'Posso partire direttamente da Fiumicino invece che da Roma?',
          a: 'Sì. Possiamo prelevare direttamente all\'aeroporto di Fiumicino e portarvi direttamente in Costiera, senza fare tappa a Roma. Il tempo di percorrenza è simile — circa 3–3,5 ore.',
        },
      ]}
    />
  )
}
