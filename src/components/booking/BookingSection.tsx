import QuoteForm from '@/components/home/QuoteForm'

const INK  = '#1a1410'
const GOLD = '#8B7340'
const LINE = '#E4DED3'

const T = {
  en: {
    eyebrow: 'Book online',
    title: 'Request your transfer',
    subtitle: 'Tell us your route, date and passengers — we reply with a fixed price within 2 hours. No payment now.',
    points: ['Fixed price, no surprises', 'Meet & greet included', 'Flight monitoring at no extra cost', 'Free cancellation'],
  },
  it: {
    eyebrow: 'Prenota online',
    title: 'Richiedi il tuo transfer',
    subtitle: 'Indicaci percorso, data e passeggeri — rispondiamo con un prezzo fisso entro 2 ore. Nessun pagamento ora.',
    points: ['Prezzo fisso, nessuna sorpresa', 'Accoglienza inclusa', 'Monitoraggio del volo senza costi extra', 'Cancellazione gratuita'],
  },
} as const

/**
 * The homepage booking form, embedded on a service/route/airport page so
 * visitors can book without leaving it. The page's "Book" buttons point at
 * "#quote-form" (the form's id). Pre-fill the route where the page knows it.
 */
export default function BookingSection({
  title,
  subtitle,
  defaultPickup,
  defaultDropoff,
  locale = 'en',
}: {
  title?: string
  subtitle?: string
  defaultPickup?: string
  defaultDropoff?: string
  locale?: 'en' | 'it'
}) {
  const t = T[locale]
  return (
    <section className="py-16" style={{ background: '#FAF7F2', borderBottom: `1px solid ${LINE}` }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1fr_420px] gap-10 items-start">
        <div className="lg:pt-6">
          <p className="text-xs uppercase tracking-[0.3em] mb-4 font-semibold" style={{ color: GOLD }}>
            {t.eyebrow}
          </p>
          <h2
            className="font-black leading-tight mb-4"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: INK }}
          >
            {title ?? t.title}
          </h2>
          <p className="text-base leading-relaxed mb-6 max-w-md" style={{ color: '#5a5248' }}>
            {subtitle ?? t.subtitle}
          </p>
          <ul className="space-y-2">
            {t.points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm" style={{ color: '#5a5248' }}>
                <span style={{ color: GOLD }}>✓</span> {p}
              </li>
            ))}
          </ul>
        </div>
        <QuoteForm defaultPickup={defaultPickup} defaultDropoff={defaultDropoff} />
      </div>
    </section>
  )
}
