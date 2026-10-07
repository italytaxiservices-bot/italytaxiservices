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
 * Editorial route page — deliberately not built on RoutePageTemplate.
 * Facts come from the site's own data and policies: journey time from the
 * Milan → Venice route (data/routes.ts, 2.5–3 hrs), what a quote includes
 * (terms), luggage assistance and hotel-entrance service (hotel/cruise
 * pages), vehicles (data/fleet.ts). No price is shown, and no terminal
 * procedures are described beyond "check your cruise documents".
 *
 * Photos: drop files into public/images/milan-fusina/ using the names in
 * PHOTOS below (.webp/.jpg/.png); placeholders show until then.
 */

const PATH = '/milan-to-fusina-cruise-terminal-transfer'
const TITLE = 'Milan to Fusina Cruise Terminal Transfer | Private Chauffeur'
const DESCRIPTION =
  'Private transfer from your Milan hotel to Fusina Cruise Terminal in Venice, planned around your embarkation time and cruise luggage. Fixed quote, door to door.'

export const metadata: Metadata = {
  // absolute: the layout's "| Italy Taxi Services" suffix would make this too long.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: 'website', siteName: siteConfig.name, url: PATH, title: TITLE, description: DESCRIPTION, images: ['/logo.webp'] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/logo.webp'] },
}

const P = 'images/milan-fusina'
const PHOTOS = {
  hero: { file: `${P}/hero`, size: '1600 × 2000 (portrait)', brief: 'Milan at early morning — a chauffeur loading suitcases into a dark Mercedes outside a hotel', alt: 'Chauffeur loading cruise luggage into a Mercedes outside a Milan hotel' },
  pickup: { file: `${P}/milan-pickup`, size: '1800 × 1200', brief: 'Milan hotel entrance or street (Brera, Duomo area), car waiting at the kerb', alt: 'Private car waiting outside a hotel in central Milan' },
  vclass: { file: `${P}/v-class`, size: '2000 × 1300', brief: 'Mercedes V-Class, side or three-quarter view, sliding door open, clean background', alt: 'Mercedes-Benz V-Class with the sliding door open' },
  luggage: { file: `${P}/luggage`, size: '1400 × 1750 (portrait)', brief: 'Large suitcases and carry-ons in a van boot, or lined up beside the car', alt: 'Cruise suitcases being loaded into a van' },
  terminal: { file: `${P}/fusina`, size: '2000 × 1100 (wide)', brief: 'Venice lagoon at Fusina — water, a ship on the horizon, soft light', alt: 'The Venice lagoon near Fusina with a cruise ship in the distance' },
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

const faqs = [
  {
    question: 'How do I get from Milan to Fusina Cruise Terminal?',
    answer:
      'By road it is a single motorway journey east on the A4 towards Venice, then onto the mainland edge of the lagoon at Fusina. A private transfer collects you from your Milan hotel and drives you there directly. By rail you would take a train to Venice and then arrange a separate transfer to the terminal.',
  },
  {
    question: 'How much is a private transfer from Milan to Fusina?',
    answer:
      'It is quoted per booking, because the price depends on your Milan pickup address, the vehicle and the date. The quote is fixed and already includes motorway tolls and VAT where applicable. Send your details through the form and you will have the price before you decide.',
  },
  {
    question: 'How long does Milan to Fusina take?',
    answer:
      'Plan on around three hours. The motorway between Milan and Venice takes roughly two and a half to three hours, and traffic on the A4 or getting out of central Milan can add to that. For an embarkation day we work back from your cruise check-in time, not from the average.',
  },
  {
    question: 'Can I book a Mercedes V-Class?',
    answer:
      'Yes — the Premium Van is a Mercedes-Benz V-Class or similar, for up to seven passengers. It is the vehicle most cruise passengers end up choosing, because of the luggage.',
  },
  {
    question: 'Can you take all our cruise luggage?',
    answer:
      'Yes, as long as we know about it when we quote. Tell us how many large suitcases, carry-ons and bulky items you have, and we will send a vehicle with room for all of it.',
  },
  {
    question: 'Do you also do Fusina back to Milan?',
    answer:
      'Yes. Book the return with your ship’s name and the disembarkation date and time, and the driver collects you at the terminal and takes you to your Milan hotel, an address in the city or one of the Milan airports.',
  },
]

export default function MilanToFusinaPage() {
  const van = vehicles.find((v) => v.id === 'van')!
  const others = vehicles.filter((v) => v.id !== 'van')

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Private transfer from Milan to Fusina Cruise Terminal',
    serviceType: 'Private cruise terminal transfer',
    description: DESCRIPTION,
    url: `${siteConfig.domain}${PATH}`,
    provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.domain, email: siteConfig.email },
    areaServed: [
      { '@type': 'City', name: 'Milan', containedInPlace: { '@type': 'AdministrativeArea', name: 'Lombardy' } },
      { '@type': 'Place', name: 'Fusina Cruise Terminal', containedInPlace: { '@type': 'City', name: 'Venice', containedInPlace: { '@type': 'AdministrativeArea', name: 'Veneto' } } },
    ],
  }

  return (
    <div style={{ background: IVORY }}>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: siteConfig.domain },
          { name: 'Cruise Transfers', url: `${siteConfig.domain}/cruise-transfers` },
          { name: 'Milan to Fusina Cruise Terminal', url: `${siteConfig.domain}${PATH}` },
        ])}
      />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema(faqs)} />

      {/* ───────────────── HERO ───────────────── */}
      <section className="pt-28 lg:pt-36 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <nav className="flex flex-wrap items-center gap-2 text-xs mb-10" style={{ color: MUTED }} aria-label="Breadcrumb">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href="/cruise-transfers" className="hover:underline">Cruise Transfers</Link>
              <span>/</span>
              <span style={{ color: GOLD }}>Milan → Fusina</span>
            </nav>
            <p className={`${eyebrow} mb-6`} style={{ color: GOLD }}>Milan → Fusina Cruise Terminal</p>
            <h1 className="font-bold text-balance leading-[1.02] mb-7" style={{ ...serif, color: INK, fontSize: 'clamp(2.3rem, 4.6vw, 3.9rem)', letterSpacing: '-0.015em' }}>
              Milan to Fusina Cruise Terminal Transfer
            </h1>
            <p className="text-lg leading-relaxed mb-10 max-w-md" style={{ color: BODY }}>
              Private door-to-door transportation from your Milan hotel to Fusina Cruise Terminal, arranged around your
              departure time and luggage needs.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="#quote-form"
                className="group inline-flex items-center gap-3 text-sm font-semibold px-8 py-4 transition-colors duration-300"
                style={{ background: INK, color: IVORY, letterSpacing: '0.06em' }}
              >
                Get a Fixed Quote
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="#vehicles" className="text-sm font-medium underline underline-offset-[6px] decoration-1 hover:decoration-2" style={{ color: INK }}>
                View Vehicle Options
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 relative">
            <ImageSlot {...PHOTOS.hero} priority className="aspect-[4/3] lg:aspect-[4/5] w-full" sizes="(min-width: 1024px) 45vw, 100vw" tone="dark" />
            {/* Minimal route overlay */}
            <div className="absolute left-0 bottom-0 m-4 lg:m-6 px-5 py-4" style={{ background: 'rgba(250,247,242,0.94)' }}>
              <p className="text-sm font-semibold" style={{ ...serif, color: INK }}>Milan</p>
              <ArrowDown className="w-3.5 h-3.5 my-1" style={{ color: GOLD }} />
              <p className="text-sm font-semibold" style={{ ...serif, color: INK }}>Fusina Cruise Terminal</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── JOURNEY STORY ───────────────── */}
      <section className="py-20 lg:py-28 border-t" style={{ borderColor: LINE, background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-6 mb-14 lg:mb-20 its-reveal">
            <h2 className="lg:col-span-5 text-3xl lg:text-4xl font-bold text-balance leading-tight" style={{ ...serif, color: INK }}>From Milan to Your Cruise</h2>
            <p className="lg:col-span-6 lg:col-start-7 text-base leading-relaxed self-end" style={{ color: BODY }}>
              One car, one driver, one journey: from the hotel where you spent your last night in Milan to the mainland edge of
              the Venice lagoon at Fusina, roughly three hours east along the A4.
            </p>
          </div>

          {(() => {
            const stops = [
              ['Your Milan hotel', 'Bags down to the entrance at the time we agreed.'],
              ['Private pickup', 'The driver loads the luggage; the car is yours alone.'],
              ['A4 east', 'Through Lombardy into Veneto, past Brescia, Verona and Padua.'],
              ['Fusina Cruise Terminal', 'Dropped at the terminal with your cases.'],
              ['Embarkation', 'Check in with your cruise line.'],
            ]
            return (
              <ol className="relative grid md:grid-cols-5 gap-10 md:gap-6">
                {/* desktop: horizontal line; mobile: vertical line */}
                <span aria-hidden="true" className="hidden md:block absolute top-[7px] left-0 right-0 h-px its-line-x" style={{ background: GOLD }} />
                <span aria-hidden="true" className="md:hidden absolute top-2 bottom-2 left-[7px] w-px its-line-y" style={{ background: GOLD }} />
                {stops.map(([title, text], i) => (
                  <li key={title} className="relative pl-9 md:pl-0">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 md:static block w-[15px] h-[15px] rounded-full md:mb-6"
                      style={{ background: i === 0 || i === stops.length - 1 ? GOLD : '#fff', border: `1px solid ${GOLD}` }}
                    />
                    <p className="text-[11px] tracking-[0.2em] mb-2" style={{ color: MUTED }}>{String(i + 1).padStart(2, '0')}</p>
                    <p className="font-semibold mb-1.5" style={{ ...serif, color: INK, fontSize: '1.15rem' }}>{title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: BODY }}>{text}</p>
                  </li>
                ))}
              </ol>
            )
          })()}
        </div>
      </section>

      {/* ───────────────── THE REAL PROBLEM ───────────────── */}
      <section className="py-20 lg:py-28" style={{ background: PAPER }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-14">
          <blockquote className="lg:col-span-5 its-reveal">
            <p className="text-2xl lg:text-[2.1rem] leading-snug font-bold" style={{ ...serif, color: INK }}>
              “Getting to Fusina with luggage is different from an ordinary city transfer.”
            </p>
          </blockquote>
          <div className="lg:col-span-6 lg:col-start-7 space-y-5 text-base leading-relaxed its-reveal" style={{ color: BODY }}>
            <p>
              A cruise is the one trip where you travel with everything at once — a large case each, carry-ons, often a
              garment bag for the formal nights. Taking that from a Milan hotel to a ship on the Venice lagoon by train means a
              taxi to the station, the train to Venice, then a second transfer out to the terminal. Three handovers, each with
              all the bags.
            </p>
            <p>
              The other thing that’s different is the clock. A ship sails whether or not you’re on it, so the pickup is set from
              your check-in time and works backwards, with room for traffic on the A4.
            </p>
            <p>
              A private transfer takes both problems away: the driver collects you and your luggage from the hotel entrance,
              and the next time you lift a suitcase is at the terminal. For couples it’s comfort; for a family of five with
              ten bags, a Mercedes V-Class is simply the practical way to do it.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── JOURNEY DETAILS ───────────────── */}
      <section className="py-20 lg:py-24" style={{ background: INK }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <p className={`${eyebrow} mb-10`} style={{ color: BRIGHT_GOLD }}>Journey details</p>
          <dl className="grid sm:grid-cols-2 lg:grid-cols-5 border-t" style={{ borderColor: 'rgba(201,168,76,0.25)' }}>
            {[
              ['From', 'Milan', 'Hotel or private address'],
              ['To', 'Fusina Cruise Terminal', 'Venice lagoon, mainland side'],
              ['Service', 'Private, pre-booked transfer', 'Your vehicle, not shared'],
              ['Best for', 'Cruise passengers', 'Couples, families and groups'],
              ['Vehicles', 'Mercedes V-Class', 'E-Class, S-Class or SUV for lighter loads'],
            ].map(([term, value, note], i) => (
              <div key={term} className={`py-7 pr-6 border-b sm:border-b-0 ${i > 0 ? 'lg:border-l lg:pl-6' : ''}`} style={{ borderColor: 'rgba(201,168,76,0.18)' }}>
                <dt className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: 'rgba(250,247,242,0.45)' }}>{term}</dt>
                <dd>
                  <span className="block text-xl leading-snug mb-1.5" style={{ ...serif, color: IVORY }}>{value}</span>
                  <span className="block text-xs" style={{ color: 'rgba(250,247,242,0.5)' }}>{note}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────────────── MILAN PICKUP ───────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <ImageSlot {...PHOTOS.pickup} className="lg:col-span-7 aspect-[3/2] w-full" sizes="(min-width: 1024px) 55vw, 100vw" />
          <div className="lg:col-span-5 its-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-6" style={{ ...serif, color: INK }}>Your Milan Hotel Pickup</h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: BODY }}>
              The driver comes to the Milan address you give us — your hotel entrance, an apartment, a private home — at the
              time we agree, and helps with the luggage. To set that up we need:
            </p>
            <ul className="grid grid-cols-2 gap-x-6 text-sm" style={{ color: INK }}>
              {['Hotel name', 'Full address', 'Pickup date', 'Pickup time', 'Passengers', 'Luggage', 'Cruise line & ship', 'Check-in time'].map((i) => (
                <li key={i} className="py-2.5 border-b" style={{ borderColor: LINE }}>{i}</li>
              ))}
            </ul>
            <p className="text-sm mt-6" style={{ color: BODY }}>
              Flying into Milan the day you sail? We can collect you at the airport instead — see{' '}
              <Link href="/malpensa-airport-transfer" className="underline underline-offset-4" style={{ color: GOLD }}>Malpensa</Link> and{' '}
              <Link href="/linate-airport-transfer" className="underline underline-offset-4" style={{ color: GOLD }}>Linate</Link> pickups.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── VEHICLE ───────────────── */}
      <section id="vehicles" className="py-20 lg:py-28 scroll-mt-24" style={{ background: PAPER }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
            <ImageSlot {...PHOTOS.vclass} className="lg:col-span-8 aspect-[16/10] w-full" sizes="(min-width: 1024px) 62vw, 100vw" />
            <div className="lg:col-span-4 its-reveal">
              <p className={`${eyebrow} mb-4`} style={{ color: GOLD }}>The usual choice for cruise passengers</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-2" style={{ ...serif, color: INK }}>Mercedes V-Class</h2>
              <p className="text-sm mb-8" style={{ color: MUTED }}>{van.name} · {van.model} · up to {van.passengers} passengers</p>
              <p className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: MUTED }}>Ideal for</p>
              <ul className="text-base" style={{ color: INK }}>
                {['Couples with luggage', 'Families', 'Small groups', 'Cruise passengers needing extra luggage space'].map((i) => (
                  <li key={i} className="py-2.5 border-b" style={{ borderColor: LINE, ...serif }}>{i}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 grid sm:grid-cols-3 border-t" style={{ borderColor: LINE }}>
            {others.map((v, i) => (
              <div key={v.id} className={`pt-6 pb-2 ${i > 0 ? 'sm:border-l sm:pl-6' : ''} sm:pr-6`} style={{ borderColor: LINE }}>
                <p className="font-semibold" style={{ ...serif, color: INK }}>{v.name}</p>
                <p className="text-xs mb-2" style={{ color: GOLD }}>{v.model}</p>
                <p className="text-sm" style={{ color: BODY }}>Up to {v.passengers} passengers — for lighter luggage.</p>
              </div>
            ))}
          </div>
          <p className="text-sm mt-6" style={{ color: BODY }}>
            Details of every vehicle are on our <Link href="/fleet" className="underline underline-offset-4" style={{ color: GOLD }}>fleet page</Link>.
          </p>
        </div>
      </section>

      {/* ───────────────── LUGGAGE ───────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 lg:order-2 its-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-6" style={{ ...serif, color: INK }}>Travelling With Cruise Luggage?</h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: BODY }}>
              Passenger numbers decide how many seats you need. Luggage decides the car. Four people can sit comfortably in a
              sedan and still not fit four large suitcases and four carry-ons in the boot — which is exactly what a week or two
              at sea tends to involve.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: BODY }}>When you ask for a quote, tell us:</p>
            <dl className="text-sm">
              {[
                ['Large suitcases', 'how many checked-size cases'],
                ['Carry-ons', 'cabin bags, backpacks, garment bags'],
                ['Bulky items', 'pushchair, wheelchair, golf clubs'],
                ['Who’s travelling', 'adults and children, and child seats if needed'],
              ].map(([t, d]) => (
                <div key={t} className="flex justify-between gap-6 py-3 border-b" style={{ borderColor: LINE }}>
                  <dt className="font-semibold" style={{ color: INK }}>{t}</dt>
                  <dd className="text-right" style={{ color: BODY }}>{d}</dd>
                </div>
              ))}
            </dl>
            <p className="text-sm mt-6" style={{ color: BODY }}>We then quote a vehicle with room for all of it, rather than finding out at the hotel door.</p>
          </div>
          <ImageSlot {...PHOTOS.luggage} className="lg:col-span-5 lg:order-1 aspect-[4/5] w-full max-w-md lg:max-w-none" sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
      </section>

      {/* ───────────────── PRICE + FORM ───────────────── */}
      <section className="py-20 lg:py-28" style={{ background: INK }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:pt-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-6" style={{ ...serif, color: IVORY }}>Your Transfer, Quoted Up Front</h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(250,247,242,0.65)' }}>
              We don’t publish one price for this route, because the right figure depends on your journey. We quote it, you
              see it, and that is the price.
            </p>
            <p className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: BRIGHT_GOLD }}>The quote depends on</p>
            <ul className="text-sm mb-10" style={{ color: 'rgba(250,247,242,0.8)' }}>
              {['Your Milan pickup address', 'Number of passengers', 'Luggage', 'Vehicle', 'Date of travel', 'Exact cruise terminal'].map((i) => (
                <li key={i} className="py-2.5 border-b" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>{i}</li>
              ))}
            </ul>
            <p className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: BRIGHT_GOLD }}>Included</p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(250,247,242,0.65)' }}>
              Vehicle, driver, motorway tolls and VAT where applicable. Not included: parking the driver has to pay on site,
              and stops not agreed when booking.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 w-full max-w-[480px] mx-auto lg:max-w-none">
            <QuoteForm defaultPickup="Milan" defaultDropoff="Fusina Cruise Terminal, Venice" />
          </div>
        </div>
      </section>

      {/* ───────────────── CRUISE TERMINAL ───────────────── */}
      <section className="pb-20 lg:pb-28 bg-white">
        <ImageSlot {...PHOTOS.terminal} className="w-full aspect-[16/9] lg:aspect-[21/8]" sizes="100vw" />
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-14 -mt-16 lg:-mt-28 relative">
          <div className="lg:col-span-7 bg-white p-8 lg:p-12 its-reveal" style={{ border: `1px solid ${LINE}` }}>
            <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-6" style={{ ...serif, color: INK }}>Arriving at Fusina Cruise Terminal</h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: BODY }}>
              Fusina is on the mainland side of the Venice lagoon, beyond Marghera — not in the historic centre, and not the
              same place as the cruise terminals people remember from older trips. Venice departures don’t all use one terminal,
              so the one printed on your cruise documents is the one we drive to.
            </p>
            <p className="text-base leading-relaxed" style={{ color: BODY }}>
              If your plans are still loose, our <Link href="/venice-cruise-transfer" className="underline underline-offset-4" style={{ color: GOLD }}>Venice cruise transfers</Link> page
              covers the other directions — from Venice’s airport and city.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-36 its-reveal">
            <p className="text-[11px] uppercase tracking-[0.22em] mb-4" style={{ color: MUTED }}>Please include when booking</p>
            <ol className="space-y-3 text-sm" style={{ color: INK }}>
              {['Cruise line', 'Ship name', 'Terminal, as printed on your documents', 'Sailing date', 'Check-in window', 'Pickup time you’d like'].map((i, n) => (
                <li key={i} className="flex gap-4">
                  <span className="text-xs w-5 shrink-0 pt-0.5" style={{ color: GOLD }}>{String(n + 1).padStart(2, '0')}</span>
                  {i}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ───────────────── RETURN ───────────────── */}
      <section className="py-20 lg:py-24" style={{ background: PAPER }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 its-reveal">
            <p className={`${eyebrow} mb-5`} style={{ color: GOLD }}>The way home</p>
            <h2 className="font-bold text-balance leading-[1.05]" style={{ ...serif, color: INK, fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Fusina Cruise Terminal <span style={{ color: GOLD }}>→</span> Milan
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 text-base leading-relaxed space-y-4 its-reveal" style={{ color: BODY }}>
            <p>
              Return transfers can be arranged too. Disembarkation morning is the opposite problem to sailing day: you know
              roughly when the ship docks, not exactly when you’ll be through with your bags.
            </p>
            <p>
              Give us the ship, the date and the disembarkation time on your documents, and we’ll agree a pickup time and meeting
              point with you. From there it’s straight back to your Milan hotel, an address in the city, or the airport for your
              flight home. Choose <strong style={{ color: INK }}>Round Trip</strong> in the form to quote both journeys together.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── COMPARISON ───────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-5 lg:px-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-4 its-reveal" style={{ ...serif, color: INK }}>Private transfer, or train and connections?</h2>
          <p className="text-base leading-relaxed mb-12 max-w-2xl" style={{ color: BODY }}>
            The train is a good way to travel from Milan to Venice. With cruise luggage and a fixed check-in time, the
            question is the connections either side of it.
          </p>
          <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)] text-sm">
            <div className="pb-4 border-b" style={{ borderColor: INK }} />
            <div className="pb-4 border-b font-semibold" style={{ borderColor: INK, ...serif, color: INK, fontSize: '1.05rem' }}>Private transfer</div>
            <div className="pb-4 border-b font-semibold" style={{ borderColor: INK, ...serif, color: MUTED, fontSize: '1.05rem' }}>Train + connections</div>
            {[
              ['Journey', 'Hotel to terminal in one car', 'Taxi, train, then a transfer to Fusina'],
              ['Door to door', 'Yes', 'No — station at each end'],
              ['Luggage', 'Loaded once, with help', 'Carried through every change'],
              ['Booking', 'Pre-booked vehicle and driver', 'Separate tickets and transfers'],
              ['Groups', 'One vehicle for everyone', 'Seats and transfers per person'],
              ['Timing', 'Pickup set from your check-in time', 'Fitted around train timetables'],
            ].map(([row, a, b]) => (
              <div key={row} className="contents">
                <div className="py-4 pr-3 border-b font-medium" style={{ borderColor: LINE, color: INK }}>{row}</div>
                <div className="py-4 pr-3 border-b" style={{ borderColor: LINE, color: INK }}>{a}</div>
                <div className="py-4 border-b" style={{ borderColor: LINE, color: MUTED }}>{b}</div>
              </div>
            ))}
          </div>
          <p className="text-sm mt-8" style={{ color: BODY }}>
            Going to Venice itself rather than a ship? See <Link href="/milan-to-venice" className="underline underline-offset-4" style={{ color: GOLD }}>Milan to Venice transfers</Link>.
          </p>
        </div>
      </section>

      {/* ───────────────── FAQ ───────────────── */}
      <section className="py-20 lg:py-24" style={{ background: PAPER }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold text-balance leading-tight mb-4" style={{ ...serif, color: INK }}>Questions</h2>
            <p className="text-sm leading-relaxed" style={{ color: BODY }}>
              Anything else — email <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-4" style={{ color: GOLD }}>{siteConfig.email}</a> or use the{' '}
              <Link href="/contact" className="underline underline-offset-4" style={{ color: GOLD }}>contact page</Link>.
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

      {/* ───────────────── CLOSING ───────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-5 lg:px-10 text-center">
          <h2 className="font-bold text-balance leading-[1.08] mb-6" style={{ ...serif, color: INK, fontSize: 'clamp(2rem, 4.4vw, 3.4rem)' }}>
            Your Cruise Starts Before You Reach the Ship
          </h2>
          <p className="text-lg leading-relaxed mb-10" style={{ color: BODY }}>
            Tell us where you’re staying in Milan, when you need to leave and how much luggage you’re travelling with. We’ll
            provide the vehicle and a clear quote for your journey to Fusina.
          </p>
          <Link
            href="#quote-form"
            className="group inline-flex items-center gap-3 text-sm font-semibold px-9 py-4 transition-colors duration-300"
            style={{ background: INK, color: IVORY, letterSpacing: '0.06em' }}
          >
            Request Your Transfer
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <p className="text-xs mt-10" style={{ color: MUTED }}>
            Also from Milan: <Link href="/milan-chauffeur-service" className="underline underline-offset-4">private chauffeur in Milan</Link> ·{' '}
            <Link href="/hotel-transfers" className="underline underline-offset-4">hotel transfers</Link> ·{' '}
            <Link href="/cruise-transfers" className="underline underline-offset-4">all Italian cruise ports</Link>
          </p>
        </div>
      </section>

      <StickyQuoteBar label="Get a Fixed Quote" hint="Milan → Fusina · private transfer" />
    </div>
  )
}
