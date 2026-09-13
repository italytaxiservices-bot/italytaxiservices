import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Transfer Privato Fiumicino Roma | NCC FCO Roma',
  description: 'Transfer privato NCC dall\'aeroporto di Fiumicino FCO a Roma. Da €65. Prezzo fisso, meet & greet, monitoraggio volo. Prenota ora.',
  alternates: {
    canonical: '/it/fiumicino-roma',
    languages: { en: '/fiumicino-to-rome', it: '/it/fiumicino-roma', 'x-default': '/fiumicino-to-rome' },
  },
}

const route = getRouteBySlug('fiumicino-to-rome')!

export default function FiumicinoRomaPage() {
  return (
    <RoutePageTemplate
      route={route}
      locale="it"
      baseHref="/it"
      about={`Il transfer privato NCC dall\'aeroporto di Fiumicino (Leonardo da Vinci) a Roma è il collegamento aeroportuale più richiesto d\'Italia. L\'aeroporto FCO è il principale scalo italiano, con oltre 40 milioni di passeggeri l'anno, e il trasferimento verso il centro di Roma è un percorso fondamentale per milioni di viaggiatori.

Il percorso da Fiumicino al centro di Roma (Termini, Colosseo, Navona, Trevi) è di circa 30 km via autostrada A91, con un tempo di percorrenza di 40–55 minuti in condizioni normali. Nelle ore di punta, il traffico sull\'Autostrada Roma–Fiumicino può aggiungere 20–40 minuti.

A differenza dei taxi (tariffa fissa ufficiale di €48 ma solo per il centro storico) o dei treni Leonardo Express (solo per la stazione Termini), il nostro NCC vi porta esattamente dove ne avete bisogno — hotel, villa, palazzo dei congressi — a prezzo fisso concordato.`}
      included={[
        'Prelievo nel Terminal Arrivi di Fiumicino',
        'Cartello nominativo personalizzato',
        'Monitoraggio volo in tempo reale',
        'Attesa gratuita fino a 60 minuti',
        'Prezzo fisso — pedaggio A91 incluso',
        'Veicolo premium climatizzato',
        'Consegna all\'indirizzo esatto (hotel, appartamento, ecc.)',
        'Acqua minerale in omaggio',
      ]}
      faqs={[
        {
          q: 'Qual è la differenza tra il vostro NCC e il taxi a Roma?',
          a: 'I taxi romani hanno una tariffa fissa di €48 solo per le destinazioni nel perimetro del centro storico. Per gli alberghi fuori dal centro, il tassametro scatta. Il nostro NCC ha un prezzo fisso concordato prima del viaggio, indipendentemente dalla destinazione esatta.',
        },
        {
          q: 'Il transfer è disponibile di notte o all\'alba?',
          a: 'Sì, operiamo 24 ore su 24, 7 giorni su 7. Non ci sono supplementi notturni oltre quelli standard — il prezzo fisso è sempre quello concordato.',
        },
        {
          q: 'Posso prenotare anche il ritorno verso Fiumicino?',
          a: 'Assolutamente sì. Potete prenotare andata e ritorno insieme ottenendo spesso una tariffa combinata. Indicate l\'orario del volo in partenza e il luogo di prelievo.',
        },
        {
          q: 'Servite tutti i terminal di Fiumicino?',
          a: 'Sì. Fiumicino ha Terminal 1, 2, 3 (passeggeri) e il Terminal 5 (voli extra-Schengen). Indicateci il vostro terminal di arrivo e l\'autista vi aspetterà nell\'esatta area arrivi.',
        },
      ]}
    />
  )
}
