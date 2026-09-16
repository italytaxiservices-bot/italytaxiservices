import type { Metadata } from 'next'
import RoutePageTemplate from '@/components/templates/RoutePageTemplate'
import { getRouteBySlug } from '@/data/routes'

export const metadata: Metadata = {
  title: 'Transfer Privato Malpensa Milano | NCC MXP Milano',
  description: 'Transfer privato NCC dall\'aeroporto Malpensa a Milano. Da €85. Prezzo fisso, meet & greet, monitoraggio volo inclusi. Prenota ora.',
  alternates: {
    canonical: '/it/malpensa-milano',
    languages: { en: '/malpensa-to-milan', it: '/it/malpensa-milano', 'x-default': '/malpensa-to-milan' },
  },
  openGraph: {
    type: 'website',
    siteName: 'Italy Taxi Services',
    url: '/it/malpensa-milano',
    title: 'Transfer Privato Malpensa Milano | NCC MXP Milano | Italy Taxi Services',
    description: 'Transfer privato NCC dall\'aeroporto Malpensa a Milano. Da €85. Prezzo fisso, meet & greet, monitoraggio volo inclusi. Prenota ora.',
    images: ['/logo.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transfer Privato Malpensa Milano | NCC MXP Milano | Italy Taxi Services',
    description: 'Transfer privato NCC dall\'aeroporto Malpensa a Milano. Da €85. Prezzo fisso, meet & greet, monitoraggio volo inclusi. Prenota ora.',
    images: ['/logo.webp'],
  },
}

const route = getRouteBySlug('malpensa-to-milan')!

export default function MalpensaMilanoPage() {
  return (
    <RoutePageTemplate
      route={route}
      locale="it"
      baseHref="/it"
      about={`Il transfer privato NCC dall\'aeroporto di Malpensa a Milano è uno dei percorsi più richiesti del Nord Italia. L\'aeroporto di Milano Malpensa (MXP) è il principale hub intercontinentale della Lombardia, e il collegamento con il centro di Milano è fondamentale per milioni di viaggiatori ogni anno.

Il percorso da Malpensa al centro di Milano è di circa 50 km e richiede circa 45–60 minuti, a seconda del traffico. L\'autostrada A8 (Varese–Milano) è il percorso principale — ben collaudato dai nostri autisti che lo percorrono quotidianamente.

Il nostro servizio include l\'autista in attesa nel Terminal Arrivi con cartello nominativo personalizzato. Il prezzo concordato è fisso — nessun supplemento per traffico, ZTL o eventuali soste.`}
      included={[
        'Prelievo diretto nel Terminal Arrivi di Malpensa',
        'Cartello nominativo personalizzato',
        'Monitoraggio volo in tempo reale',
        'Attesa gratuita fino a 60 minuti dall\'atterraggio',
        'Prezzo fisso — pedaggi e IVA inclusi',
        'Veicolo premium (berlina E-Class o superiore)',
        'Acqua minerale in omaggio',
        'Consegna al vostro albergo, indirizzo o stazione',
      ]}
      faqs={[
        {
          q: 'Quanto tempo ci vuole da Malpensa a Milano?',
          a: 'In condizioni normali, il viaggio dura circa 45–60 minuti via autostrada A8. Nelle ore di punta (7:30–9:30 e 17:00–19:30), il traffico può aggiungere 15–30 minuti. Il nostro autista monitora il traffico e ottimizza il percorso.',
        },
        {
          q: 'Dove ci aspetterà l\'autista a Malpensa?',
          a: 'L\'autista vi aspetterà nell\'area arrivi del vostro terminal (T1 o T2), con cartello nominativo. Riceverete un messaggio WhatsApp con tutti i dettagli del driver prima dell\'arrivo.',
        },
        {
          q: 'Il prezzo è fisso anche se il volo è in ritardo?',
          a: 'Sì, assolutamente. Monitoriamo il volo in tempo reale e l\'autista adegua automaticamente l\'orario. Non ci sono costi aggiuntivi per i ritardi del volo fino a 60 minuti dall\'atterraggio. Per ritardi eccezionali, vi contatteremo.',
        },
        {
          q: 'Posso portare bagagli voluminosi o sci?',
          a: 'Sì. La berlina E-Class può contenere 3 valigie grandi. Per bagagli extra, attrezzatura sportiva o sci, vi consigliamo di prenotare il van Mercedes V-Class, più spazioso e versatile.',
        },
      ]}
    />
  )
}
