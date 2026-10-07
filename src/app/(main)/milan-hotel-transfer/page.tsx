import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowDown } from 'lucide-react'
import QuoteForm from '@/components/home/QuoteForm'
import ImageSlot from '@/components/editorial/ImageSlot'
import StickyQuoteBar from '@/components/editorial/StickyQuoteBar'
import { JsonLd, breadcrumbSchema, faqSchema } from '@/components/seo/JsonLd'
import { siteConfig } from '@/lib/siteConfig'
import { vehicles } from '@/data/fleet'

/*
 * Editorial landing page for airport ↔ hotel transfers in Milan.
 *
 * Photos live in public/images/milan-hotel/ and were supplied for THIS page
 * only — don't reuse them elsewhere.
 *
 * Facts come from the site's own data and policies: Malpensa 48 km /
 * 45–60 min to Milan (data/routes.ts), Linate 7 km and Bergamo 45 km from the
 * centre (data/airports.ts), T1/T2 split, name-board meet & greet, flight
 * monitoring, 60 min free waiting and what a quote includes (terms), hotel
 * entrance + luggage assistance (hotel/cruise pages), child seats on request
 * (FAQ), vehicles (data/fleet.ts). No prices.
 */

const PATH = '/milan-hotel-transfer'
const TITLE = 'Milan Hotel Transfer | Private Airport to Hotel Chauffeur'
const DESCRIPTION =
  'Private transfers between Malpensa, Linate or Bergamo airport and your Milan hotel, in either direction. Door to door, sized to your luggage, fixed quote.'

export const metadata: Metadata = {
  // absolute: the layout's "| Italy Taxi Services" suffix would make this too long.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: 'website', siteName: siteConfig.name, url: PATH, title: TITLE, description: DESCRIPTION, images: ['/images/milan-hotel/hero.webp'] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/images/milan-hotel/hero.webp'] },
}

const P = 'images/milan-hotel'
const PHOTOS = {
  hero: { file: `${P}/hero`, size: '1600 × 2000', brief: 'Milan hotel entrance, chauffeur loading luggage, Duomo behind', alt: 'Private chauffeur loading a suitcase into a black Mercedes outside a hotel by Milan Cathedral', position: 'center 60%' },
  doorToDoor: { file: `${P}/door-to-door`, size: '2000 × 1250', brief: 'Van at a hotel entrance, chauffeur unloading, guest walking in', alt: 'Chauffeur unloading suitcases from a Mercedes van as a guest walks into a Milan hotel', position: 'center 60%' },
  arrival: { file: `${P}/airport-arrival`, size: '1400 × 1750', brief: 'Travellers with suitcases meeting a chauffeur at the airport kerb', alt: 'Two travellers with suitcases walking to a waiting van and chauffeur outside an airport terminal', position: 'center 55%' },
  pickup: { file: `${P}/hotel-pickup`, size: '2000 × 1300', brief: 'Chauffeur holding the van door for guests outside a Milan hotel', alt: 'Chauffeur holding the door of a Mercedes van for two guests leaving a Milan hotel', position: 'center 50%' },
  vclass: { file: `${P}/v-class`, size: '2000 × 1300', brief: 'Mercedes V-Class at a hotel entrance, sliding door open', alt: 'Mercedes V-Class for private Milan hotel transfers, parked at a hotel entrance near the Duomo', position: 'center 55%' },
  luggage: { file: `${P}/luggage`, size: '1400 × 1750', brief: 'Suitcases packed in the van boot at a hotel door', alt: 'Large suitcases and cabin bags packed into the boot of a van outside a hotel', position: 'center 60%' },
}

const INK = '#1a1410'
const GOLD = '#8B7340'
const BRIGHT_GOLD = '#C9A84C'
const IVORY = '#FAF7F2'
const PAPER = '#F4EFE6'
const LINE = '#E3DBCD'
const BODY = '#5a5248'
const MUTED = '#8a8076'
const serif = { fontFamily: 'var(--font-serif), Georgia, serif' }
const eyebrow = 'text-[11px] uppercase tracking-[0.28em] font-semibold'
const link = 'underline underline-offset-4 decoration-1 hover:decoration-2'

const faqs = [
  {
    question: 'How much is a private hotel transfer in Milan?',
    answer:
      'It is quoted per journey, because it depends on the airport, your hotel, the vehicle and the time. The quote is fixed and includes motorway tolls and VAT where applicable. Send your details through the form and you will have the price before you book.',
  },
  {
    question: 'Can I book a transfer from Malpensa Airport to my Milan hotel?',
    answer:
      'Yes. The driver meets you in the arrivals hall at Terminal 1 or Terminal 2 and drives you directly to your hotel. Allow roughly 45–60 minutes to central Milan, more in heavy traffic.',
  },
  {
    question: 'Do you provide transfers from Linate Airport?',
    answer: 'Yes. Linate is the closest airport to the city, about 7 km from the centre, so it is the shortest of the three hotel transfers.',
  },
  {
    question: 'Can I book from Bergamo Airport to a Milan hotel?',
    answer:
      'Yes. Bergamo Orio al Serio (BGY) is about 45 km from central Milan and is where many Ryanair and other low-cost flights arrive. The pickup works the same way as at Malpensa.',
  },
  {
    question: 'Can I book a Mercedes V-Class?',
    answer:
      'Yes — the Premium Van is a Mercedes-Benz V-Class or similar, for up to seven passengers. Choose it in the vehicle field, or describe your luggage and we will suggest it if it is needed.',
  },
  {
    question: 'Can I book a Milan hotel to airport transfer?',
    answer:
      'Yes. Give us the hotel, your flight time and the airport, and we will agree a pickup time. Choose Round Trip in the form to quote your arrival and departure together.',
  },
  {
    question: 'What information do I need to provide for a quote?',
    answer:
      'The airport and your hotel name and address, the date and time (or flight number), number of passengers, how many suitcases and cabin bags, and anything special such as child seats.',
  },
  {
    question: 'Can I book an early-morning or late-night transfer?',
    answer: 'Yes, subject to availability — so book early-morning departures and late arrivals in advance rather than on the day.',
  },
]

export default function MilanHotelTransferPage() {
  const van = vehicles.find((v) => v.id === 'van')!
  const others = vehicles.filter((v) => v.id !== 'van')

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Milan hotel transfer',
    serviceType: 'Private airport to hotel transfer',
    description: DESCRIPTION,
    url: `${siteConfig.domain}${PATH}`,
    provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.domain, email: siteConfig.email },
    areaServed: [
      { '@type': 'City', name: 'Milan', containedInPlace: { '@type': 'AdministrativeArea', name: 'Lombardy' } },
      { '@type': 'Airport', name: 'Milan Malpensa Airport', iataCode: 'MXP' },
      { '@type': 'Airport', name: 'Milan Linate Airport', iataCode: 'LIN' },
      { '@type': 'Airport', name: 'Bergamo Orio al Serio Airport', iataCode: 'BGY' },
    ],
  }

  return (
    <div style={{ background: IVORY }}>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: siteConfig.domain },
          { name: 'Hotel Transfers', url: `${siteConfig.domain}/hotel-transfers` },
          { name: 'Milan Hotel Transfer', url: `${siteConfig.domain}${PATH}` },
        ])}
      />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema(faqs)} />

      {/* ───────────────── HERO ───────────────── */}
      <section className="pt-28 lg:pt-36 pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <nav className="flex flex-wrap items-center gap-2 text-xs mb-10" style={{ color: MUTED }} aria-label="Breadcrumb">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href="/hotel-transfers" className="hover:underline">Hotel Transfers</Link>
              <span>/</span>
              <span style={{ color: GOLD }}>Milan</span>
            </nav>
            <p className={`${eyebrow} mb-6`} style={{ color: GOLD }}>Airport → Milan Hotel</p>
            <h1 className="font-bold text-balance leading-[1.02] mb-7" style={{ ...serif, color: INK, fontSize: 'clamp(2.5rem, 5.4vw, 4.6rem)', letterSpacing: '-0.015em' }}>
              Milan Hotel Transfer
            </h1>
            <p className="text-lg leading-relaxed mb-10 max-w-md" style={{ color: BODY }}>
              Private, door-to-door transfers between Milan’s airports and hotels across the city, arranged around your
              arrival, departure and luggage.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="#quote-form" className="group inline-flex items-center gap-3 text-sm font-semibold px-8 py-4" style={{ background: INK, color: IVORY, letterSpacing: '0.06em' }}>
                Get a Fixed Quote
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="#booking" className={`text-sm font-medium ${link}`} style={{ color: INK }}>
                Book Your Transfer
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <ImageSlot {...PHOTOS.hero} priority className="aspect-[4/3] lg:aspect-[4/5] w-full" sizes="(min-width: 1024px) 45vw, 100vw" tone="dark" />
          </div>
        </div>
      </section>

      {/* ───────────────── ROUTE INDICATOR ───────────────── */}
      <section aria-label="Airports served" className="border-y" style={{ borderColor: LINE, background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-8 lg:py-10 grid md:grid-cols-[1fr_auto_auto_auto_auto] items-center gap-5 md:gap-8">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            {[['MXP', 'Malpensa'], ['LIN', 'Linate'], ['BGY', 'Bergamo']].map(([code, name]) => (
              <p key={code} className="text-sm" style={{ color: BODY }}>
                <span className="text-2xl lg:text-3xl font-bold mr-2" style={{ ...serif, color: INK }}>{code}</span>
                <span className="hidden sm:inline">{name} Airport</span>
              </p>
            ))}
          </div>
          <ArrowRight aria-hidden="true" className="hidden md:block w-5 h-5" style={{ color: GOLD }} />
          <ArrowDown aria-hidden="true" className="md:hidden w-5 h-5" style={{ color: GOLD }} />
          <p className="text-sm font-semibold tracking-wide" style={{ color: INK }}>Private chauffeur</p>
          <ArrowRight aria-hidden="true" className="hidden md:block w-5 h-5" style={{ color: GOLD }} />
          <ArrowDown aria-hidden="true" className="md:hidden w-5 h-5" style={{ color: GOLD }} />
          <p className="text-2xl lg:text-3xl font-bold" style={{ ...serif, color: INK }}>Your Milan hotel</p>
        </div>
      </section>

      {/* ───────────────── IN SHORT (direct answers) ───────────────── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10">
          <h2 className="lg:col-span-3 text-2xl font-bold" style={{ ...serif, color: INK }}>In short</h2>
          <dl className="lg:col-span-9 grid sm:grid-cols-2 gap-x-12 gap-y-8">
            {[
              ['What is a Milan hotel transfer?', 'A private, pre-booked car and driver taking you between a Milan airport and your hotel or other accommodation — only your party in the vehicle.'],
              ['Which airports?', 'Milan Malpensa (MXP), Milan Linate (LIN) and Bergamo Orio al Serio (BGY).'],
              ['Straight from Malpensa to my hotel?', 'Yes. The driver meets you in arrivals and drives directly to the hotel address you give us.'],
              ['And back to the airport?', 'Yes — hotel to airport transfers work the same way, and both can be quoted together.'],
            ].map(([q, a]) => (
              <div key={q} className="border-t pt-4" style={{ borderColor: LINE }}>
                <dt className="font-semibold mb-2" style={{ ...serif, color: INK }}>{q}</dt>
                <dd className="text-sm leading-relaxed" style={{ color: BODY }}>{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────────────── DOOR TO DOOR ───────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <ImageSlot {...PHOTOS.doorToDoor} className="lg:col-span-7 aspect-[16/10] w-full" sizes="(min-width: 1024px) 55vw, 100vw" />
          <div className="lg:col-span-5 its-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-8" style={{ ...serif, color: INK }}>From the Airport Door to Your Hotel Door</h2>
            <ol className="space-y-5">
              {[
                ['You land', 'Passport control, then the baggage hall. Nobody is rushing you — the driver’s time is set from your actual landing.'],
                ['Your driver is in arrivals', 'Holding a board with your name, inside the arrivals hall rather than somewhere outside.'],
                ['Bags go in once', 'The driver helps with the luggage and loads it; you don’t lift it again until the hotel.'],
                ['Straight to the hotel', 'No stops on the way and nobody else to drop off first.'],
                ['Out at the entrance', 'Cases unloaded at the hotel door, and you’re at reception.'],
              ].map(([t, d], i) => (
                <li key={t} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="text-xs pt-1" style={{ color: GOLD }}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="font-semibold" style={{ ...serif, color: INK }}>{t}</p>
                    <p className="text-sm leading-relaxed" style={{ color: BODY }}>{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ───────────────── THREE AIRPORTS ───────────────── */}
      <section className="py-20 lg:py-28" style={{ background: INK }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-6 mb-14">
            <h2 className="lg:col-span-6 text-3xl lg:text-4xl font-bold text-balance leading-tight" style={{ ...serif, color: IVORY }}>Milan’s Three Main Airports</h2>
            <p className="lg:col-span-5 lg:col-start-8 text-base leading-relaxed self-end" style={{ color: 'rgba(250,247,242,0.6)' }}>
              Which airport you land at changes the journey more than anything else — from a short city run to most of an hour on the motorway.
            </p>
          </div>
          <div className="grid md:grid-cols-3 border-t" style={{ borderColor: 'rgba(201,168,76,0.3)' }}>
            {[
              {
                code: 'MXP', name: 'Milan Malpensa', href: '/malpensa-airport-transfer', anchor: 'Malpensa pickups in detail',
                facts: 'About 48 km from the city · usually 45–60 min',
                text: 'The largest airport in northern Italy and where most long-haul and international flights land. Terminal 1 handles most international flights; Terminal 2 is used mainly by easyJet.',
              },
              {
                code: 'LIN', name: 'Milan Linate', href: '/linate-airport-transfer', anchor: 'transfers from Linate',
                facts: 'About 7 km from the centre',
                text: 'Milan’s city airport, mostly domestic and European flights. The shortest hotel transfer of the three — convenient if you’re staying centrally or have a meeting soon after landing.',
              },
              {
                code: 'BGY', name: 'Bergamo Orio al Serio', href: '/bergamo-airport-transfer', anchor: 'Bergamo Airport transfers',
                facts: 'About 45 km from central Milan',
                text: 'A major low-cost hub used by Ryanair and others. Many travellers staying in Milan arrive here; the pickup works exactly as it does at Malpensa.',
              },
            ].map((a, i) => (
              <div key={a.code} className={`pt-8 pb-10 md:pr-8 ${i > 0 ? 'md:border-l md:pl-8 border-t md:border-t-0' : ''}`} style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
                <p className="font-bold leading-none mb-4" style={{ ...serif, color: BRIGHT_GOLD, fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}>{a.code}</p>
                <h3 className="text-lg font-semibold mb-1" style={{ ...serif, color: IVORY }}>{a.name}</h3>
                <p className="text-xs mb-4" style={{ color: 'rgba(250,247,242,0.45)' }}>{a.facts}</p>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(250,247,242,0.7)' }}>{a.text}</p>
                <Link href={a.href} className={`text-sm ${link}`} style={{ color: BRIGHT_GOLD }}>{a.anchor}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── ACROSS MILAN ───────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4 its-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-6" style={{ ...serif, color: INK }}>Hotel Transfers Across Milan</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: BODY }}>
              We drive to hotels and private addresses throughout the city. What matters is the exact address: Milan has
              several hotels with similar names, and parts of the historic centre are pedestrianised, so the right drop-off
              point isn’t always the street the hotel’s name suggests.
            </p>
            <p className="text-base leading-relaxed" style={{ color: BODY }}>
              Staying near the Duomo, in Brera or by Porta Nuova? Give us the hotel name and street address when you ask for a quote.
            </p>
          </div>
          <dl className="lg:col-span-7 lg:col-start-6 grid sm:grid-cols-2 gap-x-10">
            {[
              ['Duomo & Montenapoleone', 'The historic centre and the fashion district around it.'],
              ['Brera', 'Galleries and narrow streets just north of the Duomo.'],
              ['Porta Nuova', 'The business district around Garibaldi station.'],
              ['CityLife & MiCo', 'The towers and the MiCo convention centre on the west side.'],
              ['Navigli', 'The canal district south-west of the centre.'],
              ['Bicocca', 'North Milan — university, offices and hotels.'],
              ['Fiera Milano (Rho)', 'The trade fair grounds north-west of the city, on the Malpensa side.'],
              ['Anywhere else', 'Private addresses, apartments and hotels outside the centre.'],
            ].map(([area, note]) => (
              <div key={area} className="py-4 border-b" style={{ borderColor: LINE }}>
                <dt className="font-semibold" style={{ ...serif, color: INK }}>{area}</dt>
                <dd className="text-sm" style={{ color: BODY }}>{note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────────────── ARRIVING ───────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <ImageSlot {...PHOTOS.arrival} className="lg:col-span-5 aspect-[4/5] w-full max-w-md lg:max-w-none" sizes="(min-width: 1024px) 40vw, 100vw" />
          <div className="lg:col-span-6 lg:col-start-7 its-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-6" style={{ ...serif, color: INK }}>Arriving in Milan?</h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: BODY }}>
              Your flight is monitored, so the pickup follows a delay or an early landing without you calling anyone. The
              driver waits in the arrivals hall with your name on a board, and waits up to 60 minutes after the updated
              landing time at no extra charge — normally plenty for passport control and bags.
            </p>
            <p className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: MUTED }}>When booking, tell us</p>
            <ul className="grid grid-cols-2 gap-x-6 text-sm" style={{ color: INK }}>
              {['Airport (and terminal)', 'Flight number', 'Arrival date', 'Landing time', 'Hotel or address', 'Passengers', 'Suitcases & cabin bags', 'Child seats, if any'].map((i) => (
                <li key={i} className="py-2.5 border-b" style={{ borderColor: LINE }}>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────────────── HOTEL PICKUP ───────────────── */}
      <section className="py-20 lg:py-28" style={{ background: PAPER }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-5 lg:order-2 its-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-6" style={{ ...serif, color: INK }}>Your Hotel Pickup</h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: BODY }}>
              Going the other way, the driver comes to your hotel entrance at the agreed time and helps with the bags. Large
              hotels sometimes have more than one entrance or a separate drop-off lane — if yours does, or the concierge has
              told you where cars wait, include it.
            </p>
            <dl className="text-sm">
              {[
                ['Hotel', 'name and full street address'],
                ['When', 'pickup date and time'],
                ['Who', 'number of passengers'],
                ['Luggage', 'suitcases and cabin bags'],
                ['Where to', 'Malpensa, Linate or Bergamo — and your flight time'],
              ].map(([t, d]) => (
                <div key={t} className="flex justify-between gap-6 py-3 border-b" style={{ borderColor: LINE }}>
                  <dt className="font-semibold" style={{ color: INK }}>{t}</dt>
                  <dd className="text-right" style={{ color: BODY }}>{d}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ImageSlot {...PHOTOS.pickup} className="lg:col-span-7 lg:order-1 aspect-[3/2] w-full" sizes="(min-width: 1024px) 55vw, 100vw" />
        </div>
      </section>

      {/* ───────────────── HOTEL → AIRPORT ───────────────── */}
      <section className="py-20 lg:py-28" style={{ background: INK }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className={`${eyebrow} mb-5`} style={{ color: BRIGHT_GOLD }}>The return</p>
            <h2 className="font-bold leading-[1.05] mb-10" style={{ ...serif, color: IVORY, fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Hotel <span style={{ color: BRIGHT_GOLD }}>→</span> Airport
            </h2>
            <ol className="relative pl-8">
              <span aria-hidden="true" className="absolute left-[6px] top-2 bottom-2 w-px its-line-y" style={{ background: BRIGHT_GOLD }} />
              {['Your Milan hotel', 'Private pickup at the entrance', 'Malpensa, Linate or Bergamo', 'Check-in and departure'].map((s, i, all) => (
                <li key={s} className="relative pb-7 last:pb-0">
                  <span aria-hidden="true" className="absolute -left-8 top-1.5 w-[13px] h-[13px] rounded-full" style={{ background: i === 0 || i === all.length - 1 ? BRIGHT_GOLD : INK, border: `1px solid ${BRIGHT_GOLD}` }} />
                  <p className="text-lg" style={{ ...serif, color: IVORY }}>{s}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-16 its-reveal">
            <p className="text-base leading-relaxed mb-5" style={{ color: 'rgba(250,247,242,0.72)' }}>
              We’ll agree the pickup time with you, working back from your flight. The things to allow for: checking out
              and getting the bags down, Milan traffic at that hour — the drive to Malpensa or Bergamo is the longer one —
              then your airline’s check-in and bag-drop deadline, security, and passport control if you’re flying outside
              the Schengen area.
            </p>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(250,247,242,0.72)' }}>
              Not sure what time to leave? Send the flight details and we’ll suggest one.
            </p>
            <Link href="#quote-form" className="group inline-flex items-center gap-3 text-sm font-semibold px-8 py-4" style={{ background: BRIGHT_GOLD, color: INK, letterSpacing: '0.06em' }}>
              Book Your Airport Transfer
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── SCENARIOS ───────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-5 lg:px-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-12" style={{ ...serif, color: INK }}>Who books a hotel transfer in Milan</h2>
          <div className="border-t" style={{ borderColor: INK }}>
            {[
              ['International arrival', 'Landing at Malpensa after a long flight with checked bags, and going straight to a hotel in the centre without working out trains.'],
              ['Family arrival', 'Two adults, children, four suitcases and a pushchair — one vehicle with room for all of it, child seats fitted.'],
              ['Business trip', 'Landing at Linate and heading to a hotel near Porta Nuova or CityLife, with a meeting the same afternoon.'],
              ['Late arrival', 'The last flight of the evening into Bergamo, and a car already arranged rather than a queue for whatever is left.'],
              ['Onward connection', 'A night or two in Milan before a cruise or the next leg of the trip — we can arrange the onward transfer too.'],
            ].map(([label, text]) => (
              <div key={label} className="grid md:grid-cols-[14rem_1fr] gap-2 md:gap-10 py-6 border-b" style={{ borderColor: LINE }}>
                <p className="text-[11px] uppercase tracking-[0.22em] pt-1 font-semibold" style={{ color: GOLD }}>{label}</p>
                <p className="text-base leading-relaxed" style={{ color: BODY }}>{text}</p>
              </div>
            ))}
          </div>
          <p className="text-sm mt-6" style={{ color: BODY }}>
            Sailing from Venice? See our <Link href="/milan-to-fusina-cruise-terminal-transfer" className={link} style={{ color: GOLD }}>Milan to Fusina cruise terminal transfer</Link>.
          </p>
        </div>
      </section>

      {/* ───────────────── VEHICLES ───────────────── */}
      <section id="vehicles" className="py-20 lg:py-28 scroll-mt-24" style={{ background: PAPER }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-12 max-w-2xl" style={{ ...serif, color: INK }}>Choose the Right Vehicle for Your Luggage</h2>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
            <ImageSlot {...PHOTOS.vclass} className="lg:col-span-8 aspect-[16/10] w-full" sizes="(min-width: 1024px) 62vw, 100vw" />
            <div className="lg:col-span-4 its-reveal">
              <p className={`${eyebrow} mb-4`} style={{ color: GOLD }}>Families, groups, lots of bags</p>
              <h3 className="text-3xl font-bold leading-tight mb-2" style={{ ...serif, color: INK }}>Mercedes V-Class</h3>
              <p className="text-sm mb-6" style={{ color: MUTED }}>{van.name} · {van.model} · up to {van.passengers} passengers</p>
              <p className="text-base leading-relaxed" style={{ color: BODY }}>
                The one to choose when the bags outnumber the people, or when everyone needs to travel together. The right
                vehicle depends on passengers, suitcases, cabin bags and how much room you’d like.
              </p>
            </div>
          </div>
          <div className="mt-14 grid sm:grid-cols-3 border-t" style={{ borderColor: LINE }}>
            {others.map((v, i) => (
              <div key={v.id} className={`pt-6 pb-2 ${i > 0 ? 'sm:border-l sm:pl-6' : ''} sm:pr-6`} style={{ borderColor: LINE }}>
                <p className="font-semibold" style={{ ...serif, color: INK }}>{v.name}</p>
                <p className="text-xs mb-2" style={{ color: GOLD }}>{v.model}</p>
                <p className="text-sm" style={{ color: BODY }}>Up to {v.passengers} passengers, lighter luggage.</p>
              </div>
            ))}
          </div>
          <p className="text-sm mt-6" style={{ color: BODY }}>
            More on each car on the <Link href="/fleet" className={link} style={{ color: GOLD }}>fleet page</Link>.
          </p>
        </div>
      </section>

      {/* ───────────────── LUGGAGE ───────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 its-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-6" style={{ ...serif, color: INK }}>Travelling With More Than a Carry-On?</h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: BODY }}>
              Seats are rarely the problem on an airport run — boot space is. Three people fit easily in a sedan; three
              people with three large suitcases and three cabin bags often don’t. A family’s luggage for a week, or a
              business traveller’s sample cases, change the answer again.
            </p>
            <p className="text-base leading-relaxed" style={{ color: BODY }}>
              So when you ask for a quote, count the bags as well as the people: large suitcases, cabin bags, and anything
              awkward like a pushchair or golf clubs. We’ll quote a car they fit in.
            </p>
          </div>
          <ImageSlot {...PHOTOS.luggage} className="lg:col-span-5 lg:col-start-8 aspect-[4/5] w-full max-w-md lg:max-w-none" sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
      </section>

      {/* ───────────────── COMPARISON ───────────────── */}
      <section className="py-20 lg:py-24" style={{ background: PAPER }}>
        <div className="max-w-5xl mx-auto px-5 lg:px-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-4" style={{ ...serif, color: INK }}>Why Book a Private Hotel Transfer?</h2>
          <p className="text-base leading-relaxed mb-12 max-w-2xl" style={{ color: BODY }}>
            Milan’s airports are well served by trains and buses, and they’re cheaper. Here’s the practical difference.
          </p>
          <div className="grid md:grid-cols-2 gap-10 md:gap-0">
            <div className="md:pr-10">
              <p className="text-lg font-semibold pb-4 mb-2 border-b" style={{ ...serif, color: INK, borderColor: INK }}>Private transfer</p>
              <ul className="text-sm" style={{ color: INK }}>
                {['Direct, airport to hotel', 'Door to door', 'Pre-booked, pickup follows your flight', 'Luggage loaded once', 'No change of train or bus', 'One vehicle for a family or group'].map((i) => (
                  <li key={i} className="py-3 border-b" style={{ borderColor: LINE }}>{i}</li>
                ))}
              </ul>
            </div>
            <div className="md:pl-10 md:border-l" style={{ borderColor: LINE }}>
              <p className="text-lg font-semibold pb-4 mb-2 border-b" style={{ ...serif, color: MUTED, borderColor: LINE }}>Public transport</p>
              <ul className="text-sm" style={{ color: MUTED }}>
                {['Usually train or bus, then metro, taxi or a walk', 'Ends at a station or stop', 'Runs to a timetable', 'Bags carried between services', 'Stations and stops to navigate', 'Cheaper per person, especially travelling light'].map((i) => (
                  <li key={i} className="py-3 border-b" style={{ borderColor: LINE }}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── PRICE + BOOKING ───────────────── */}
      <section id="booking" className="py-20 lg:py-28 scroll-mt-24" style={{ background: INK }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-6" style={{ ...serif, color: IVORY }}>How Much Does a Milan Hotel Transfer Cost?</h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(250,247,242,0.65)' }}>
              It depends on the airport, your hotel, the vehicle, the number of passengers and bags, the date and time, and
              anything extra you need. We quote each journey as a fixed price, which includes motorway tolls and VAT where
              applicable. It doesn’t include parking the driver has to pay on site, stops not agreed when booking, or
              waiting beyond 60 minutes at the airport.
            </p>
            <p className="text-[11px] uppercase tracking-[0.22em] mb-5 mt-10" style={{ color: BRIGHT_GOLD }}>How booking works</p>
            <ol className="space-y-4">
              {[
                ['Your details', 'where we collect you: the airport, or your hotel'],
                ['Your journey', 'where you’re going: your hotel, or the airport'],
                ['Your vehicle', 'how many passengers, and how much luggage'],
                ['Your quote', 'a fixed price, normally within two hours'],
                ['Confirm', 'accept the quote to book; nothing to pay when you ask'],
              ].map(([t, d], i) => (
                <li key={t} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="text-xs pt-1" style={{ color: BRIGHT_GOLD }}>{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-sm" style={{ color: 'rgba(250,247,242,0.85)' }}>
                    <span className="font-semibold" style={{ color: IVORY }}>{t}</span> · {d}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 w-full max-w-[480px] mx-auto lg:max-w-none">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* ───────────────── FAQ ───────────────── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold leading-tight mb-4" style={{ ...serif, color: INK }}>Questions</h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: BODY }}>
              Something else? Email <a href={`mailto:${siteConfig.email}`} className={link} style={{ color: GOLD }}>{siteConfig.email}</a> or use the{' '}
              <Link href="/contact" className={link} style={{ color: GOLD }}>contact page</Link>.
            </p>
            <p className="text-xs leading-relaxed" style={{ color: MUTED }}>
              Going further than Milan? <Link href="/malpensa-to-lake-como" className={link}>Lake Como</Link>,{' '}
              <Link href="/malpensa-to-bellagio" className={link}>Bellagio</Link>,{' '}
              <Link href="/malpensa-to-bergamo" className={link}>Bergamo</Link> and{' '}
              <Link href="/malpensa-to-turin" className={link}>Turin</Link> from Malpensa, or a{' '}
              <Link href="/milan-chauffeur-service" className={link}>private driver in Milan</Link> by the hour.
            </p>
          </div>
          <div className="lg:col-span-8 border-t" style={{ borderColor: INK }}>
            {faqs.map((f) => (
              <details key={f.question} className="group border-b" style={{ borderColor: LINE }}>
                <summary className="cursor-pointer list-none flex justify-between items-center gap-6 py-5">
                  <h3 className="text-base font-semibold" style={{ ...serif, color: INK }}>{f.question}</h3>
                  <span aria-hidden="true" className="shrink-0 text-xl leading-none transition-transform duration-300 group-open:rotate-45" style={{ color: GOLD }}>+</span>
                </summary>
                <p className="pb-6 pr-10 text-sm leading-relaxed" style={{ color: BODY }}>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <StickyQuoteBar label="Get a Quote" hint="Airport ↔ Milan hotel · private transfer" />
    </div>
  )
}
