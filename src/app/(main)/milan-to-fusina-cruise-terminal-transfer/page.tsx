import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import QuoteForm from '@/components/home/QuoteForm'
import ImageSlot from '@/components/editorial/ImageSlot'
import { JsonLd, breadcrumbSchema, faqSchema } from '@/components/seo/JsonLd'
import { siteConfig } from '@/lib/siteConfig'
import { vehicles } from '@/data/fleet'

/*
 * Editorial route page for cruise passengers: Milan hotel → Fusina Cruise
 * Terminal (Venice), and back. Deliberately not built on RoutePageTemplate,
 * and laid out differently from /milan-hotel-transfer: the page reads as the
 * cruise-day story — checkout, luggage, chauffeur, road, Fusina, ship.
 *
 * Photos in public/images/milan-fusina/ were supplied for THIS page only.
 *
 * Facts come from the site's own data and policies: the Milan → Venice road
 * journey (data/routes.ts: 2.5–3 hrs via the A4), what a quote includes
 * (terms), hotel entrance + luggage assistance (hotel/cruise pages), child
 * seats on request (FAQ), vehicle categories (data/fleet.ts). No prices, no
 * capacities, no terminal procedures beyond "check your cruise documents".
 */

const PATH = '/milan-to-fusina-cruise-terminal-transfer'
const TITLE = 'Milan to Fusina Cruise Terminal Transfer | Private Chauffeur'
const DESCRIPTION =
  'Private chauffeur from your Milan hotel to Fusina Cruise Terminal in Venice, planned around your sailing and your cruise luggage. Request a fixed quote.'

export const metadata: Metadata = {
  // absolute: the layout's "| Italy Taxi Services" suffix would make this too long.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    url: PATH,
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/milan-fusina/milan-to-fusina-cruise-terminal-transfer.webp'],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/images/milan-fusina/milan-to-fusina-cruise-terminal-transfer.webp'] },
}

const P = 'images/milan-fusina'
const PHOTOS = {
  hero: {
    file: `${P}/milan-to-fusina-cruise-terminal-transfer`, size: '2000 × 1250', brief: 'Chauffeur loading luggage at a Milan hotel, V-Class and Duomo',
    alt: 'Chauffeur loading a guest’s suitcases into a Mercedes van outside a Milan hotel, with the Duomo behind', position: '58% center',
  },
  story: {
    file: `${P}/chauffeur-milan-cruise-transfer`, size: '1200 × 2300', brief: 'Chauffeur loading the boot while a guest waits with her case',
    alt: 'Chauffeur loading suitcases into the boot of a van while a traveller waits at the hotel entrance', position: 'center 60%',
  },
  pickup: {
    file: `${P}/milan-hotel-cruise-transfer`, size: '2000 × 1300', brief: 'Chauffeur taking a suitcase at the hotel door',
    alt: 'Chauffeur taking a suitcase from a guest at the entrance of a Milan hotel', position: '55% center',
  },
  luggage: {
    file: `${P}/cruise-luggage-transfer-milan`, size: '1600 × 1600', brief: 'Several suitcases going into the boot',
    alt: 'Chauffeur loading several large suitcases into the boot of a van outside a Milan hotel', position: '62% center',
  },
  vehicle: {
    file: `${P}/luxury-van-milan-cruise-transfer`, size: '1600 × 1200', brief: 'Van from behind with the boot open',
    alt: 'Black Mercedes van with the boot open beside a hotel entrance in central Milan', position: '68% center',
  },
  interior: {
    file: `${P}/luxury-van-interior-milan`, size: '2400 × 1100', brief: 'Interior of the van, leather seats, door open to the piazza',
    alt: 'Leather seats inside a Mercedes van, with a travel bag and suitcase aboard and the Duomo seen through the open door', position: 'center 55%',
  },
  closing: {
    file: `${P}/milan-fusina-private-transfer`, size: '2400 × 1300', brief: 'Couple at the hotel as the chauffeur loads the van',
    alt: 'Couple with a suitcase at a Milan hotel while the chauffeur loads their luggage into the van', position: 'center 55%',
  },
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
const link = 'underline underline-offset-4 decoration-1 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2'
const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2'

const faqs = [
  {
    question: 'Can I book a private transfer from Milan to Fusina Cruise Terminal?',
    answer:
      'Yes. We provide private transfers from Milan hotels and addresses to Fusina Cruise Terminal in Venice for passengers joining a cruise. The vehicle is booked for your party only.',
  },
  {
    question: 'Can you pick me up directly from my Milan hotel?',
    answer: 'Yes. The chauffeur comes to your hotel entrance at the agreed time and helps load the luggage before you set off.',
  },
  {
    question: 'Can I travel with several large cruise suitcases?',
    answer:
      'Yes, as long as you tell us when you book. Give the number of large suitcases and cabin bags and we arrange a vehicle with room for them.',
  },
  {
    question: 'Can I request a Mercedes V-Class?',
    answer: 'Yes. Our Premium Van is a Mercedes-Benz V-Class or similar — the usual choice for cruise passengers with a lot of luggage.',
  },
  {
    question: 'Can I book a transfer from Fusina back to Milan?',
    answer:
      'Yes. Give us your ship, disembarkation date and the time on your documents, and we agree a pickup with you — to a Milan hotel, an address in the city, or Malpensa or Linate airport.',
  },
  {
    question: 'How early should I arrange my cruise transfer?',
    answer:
      'As soon as your cruise and hotel are booked. Embarkation days are busy, and booking early means the right vehicle is set aside for your date.',
  },
  {
    question: 'Can families book a private vehicle?',
    answer: 'Yes. One vehicle for the whole family and its luggage, with child seats on request — tell us how many and the children’s ages.',
  },
]

export default function MilanToFusinaPage() {
  const van = vehicles.find((v) => v.id === 'van')!
  const sedan = vehicles.find((v) => v.id === 'sedan')!
  const others = vehicles.filter((v) => v.id !== 'van' && v.id !== 'sedan')

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Private transfer from Milan to Fusina Cruise Terminal',
    serviceType: 'Private cruise terminal transfer',
    description: DESCRIPTION,
    url: `${siteConfig.domain}${PATH}`,
    provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.domain, email: siteConfig.email },
    areaServed: [
      { '@type': 'City', name: 'Milan', alternateName: 'Milano', containedInPlace: { '@type': 'AdministrativeArea', name: 'Lombardy' } },
      {
        '@type': 'Place',
        name: 'Fusina Cruise Terminal',
        containedInPlace: { '@type': 'City', name: 'Venice', containedInPlace: { '@type': 'AdministrativeArea', name: 'Veneto' } },
      },
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
      <section className="pt-28 lg:pt-32 pb-14 lg:pb-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 lg:order-2">
            <ImageSlot {...PHOTOS.hero} priority className="aspect-[4/3] lg:aspect-[5/4] w-full" sizes="(min-width: 1024px) 55vw, 100vw" tone="dark" />
          </div>
          <div className="lg:col-span-5 lg:order-1">
            <nav className="flex flex-wrap items-center gap-2 text-xs mb-8" style={{ color: MUTED }} aria-label="Breadcrumb">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href="/cruise-transfers" className="hover:underline">Cruise Transfers</Link>
              <span>/</span>
              <span style={{ color: GOLD }}>Milan → Fusina</span>
            </nav>
            <p className={`${eyebrow} mb-5`} style={{ color: GOLD }}>Cruise transfer · Milan → Venice</p>
            <h1 className="font-bold text-balance leading-[1.03] mb-6" style={{ ...serif, color: INK, fontSize: 'clamp(2.3rem, 4.4vw, 3.8rem)', letterSpacing: '-0.015em' }}>
              Milan to Fusina Cruise Terminal Transfer
            </h1>
            <p className="text-lg leading-relaxed mb-9 max-w-md" style={{ color: BODY }}>
              Private chauffeur transfers from Milan hotels to Fusina Cruise Terminal, with your vehicle arranged around your cruise departure.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-10">
              <Link href="#booking" className={`group inline-flex items-center gap-3 text-sm font-semibold px-8 py-4 ${focus}`} style={{ background: INK, color: IVORY, letterSpacing: '0.06em', outlineColor: GOLD }}>
                Request Your Transfer
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="#quote-form" className={`text-sm font-medium ${link}`} style={{ color: INK }}>Get a Quote</Link>
            </div>
            {/* The whole journey in one quiet line. */}
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm border-t pt-5" style={{ borderColor: LINE, color: INK, ...serif }}>
              <span>Milan hotel</span>
              <span aria-hidden="true" style={{ color: GOLD }}>→</span>
              <span>Private vehicle</span>
              <span aria-hidden="true" style={{ color: GOLD }}>→</span>
              <span>Fusina Cruise Terminal</span>
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── THE CRUISE PROBLEM ───────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5 lg:px-10">
          <h2 className="font-bold text-balance leading-[1.08] mb-12 max-w-4xl its-reveal" style={{ ...serif, color: INK, fontSize: 'clamp(2rem, 4.2vw, 3.4rem)' }}>
            Your Cruise Has a Departure Time. Your Transfer Should Respect It.
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-14 text-base leading-relaxed its-reveal" style={{ color: BODY }}>
            <p>
              A city transfer can run late and nothing much happens. A ship sails on time. Sailing day also tends to be the day
              you check out of your Milan hotel with everything you’ve packed for one or two weeks at sea — large cases, cabin
              bags, a garment bag for the formal nights.
            </p>
            <p>
              The easiest way from Milan to Fusina Cruise Terminal is a private transfer: one car from your hotel entrance to
              the terminal, with no change of train, station or taxi on the way, and a pickup time worked out from your
              check-in time rather than from a timetable. For couples it’s simpler; for a family with ten bags, it’s the
              practical way to do it.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── HOTEL TO SHIP STORY ───────────────── */}
      <section className="py-20 lg:py-28" style={{ background: PAPER }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <ImageSlot {...PHOTOS.story} className="lg:col-span-4 aspect-[3/4] lg:aspect-[9/16] w-full max-w-sm lg:max-w-none" sizes="(min-width: 1024px) 30vw, 100vw" />
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-10" style={{ ...serif, color: INK }}>From Your Milan Hotel to the Ship</h2>
            <ol className="relative pl-10">
              <span aria-hidden="true" className="absolute left-[7px] top-2 bottom-2 w-px its-line-y" style={{ background: GOLD }} />
              {[
                ['Hotel pickup', 'Your chauffeur meets you at your Milan hotel at the agreed pickup time.'],
                ['Luggage loaded', 'Your cruise luggage goes into the vehicle before you leave — you don’t lift it again until the terminal.'],
                ['Direct journey', 'East out of Milan on the A4 towards Venice, privately and without changing vehicles.'],
                ['Cruise terminal', 'At Fusina, on the edge of the Venice lagoon, ready to check in for your cruise.'],
              ].map(([t, d], i, all) => (
                <li key={t} className="relative pb-9 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute -left-10 top-1 w-[15px] h-[15px] rounded-full"
                    style={{ background: i === 0 || i === all.length - 1 ? GOLD : PAPER, border: `1px solid ${GOLD}` }}
                  />
                  <p className="text-[11px] tracking-[0.2em] mb-1" style={{ color: MUTED }}>{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="text-xl font-semibold mb-1" style={{ ...serif, color: INK }}>{t}</h3>
                  <p className="text-base leading-relaxed max-w-lg" style={{ color: BODY }}>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ───────────────── HOTEL PICKUP ───────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <ImageSlot {...PHOTOS.pickup} className="w-full aspect-[16/10] lg:aspect-[2/1]" sizes="(min-width: 1280px) 1200px, 100vw" />
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 mt-10 lg:mt-14">
            <h2 className="lg:col-span-4 text-3xl lg:text-4xl font-bold text-balance leading-tight its-reveal" style={{ ...serif, color: INK }}>Pickup From Your Milan Hotel</h2>
            <div className="lg:col-span-7 lg:col-start-6 its-reveal">
              <p className="text-base leading-relaxed mb-6" style={{ color: BODY }}>
                The chauffeur comes to your hotel entrance and helps with the bags. Accurate details are what make that work:
                the right hotel, the right time, and a vehicle that actually fits your party and luggage.
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-8 text-sm" style={{ color: INK }}>
                {['Hotel name', 'Hotel address', 'Pickup date', 'Preferred pickup time', 'Number of passengers', 'Luggage — suitcases and cabin bags'].map((i) => (
                  <li key={i} className="py-3 border-b" style={{ borderColor: LINE }}>{i}</li>
                ))}
              </ul>
              <p className="text-sm mt-6" style={{ color: BODY }}>
                Arriving in Milan first? Our <Link href="/milan-hotel-transfer" className={link} style={{ color: GOLD }}>Milan hotel transfers</Link> cover
                the airport to your hotel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── CRUISE LUGGAGE ───────────────── */}
      <section className="py-20 lg:py-28" style={{ background: INK }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 its-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-6" style={{ ...serif, color: IVORY }}>Cruise Luggage Needs More Planning</h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: 'rgba(250,247,242,0.7)' }}>
              People pack differently for a cruise. A long itinerary means more clothes, formal wear, sometimes a second large
              case each — far more than for a few days in Milan. Four passengers can fit comfortably in a car whose boot
              won’t take their suitcases.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(250,247,242,0.7)' }}>
              So tell us the luggage when you book, not just the passengers. We arrange the vehicle around it.
            </p>
            <dl className="text-sm">
              {[
                ['Large suitcases', 'how many checked-size cases'],
                ['Cabin luggage', 'carry-ons, backpacks, garment bags'],
                ['Family luggage', 'children’s bags, pushchair'],
              ].map(([t, d]) => (
                <div key={t} className="flex justify-between gap-6 py-3 border-b" style={{ borderColor: 'rgba(201,168,76,0.18)' }}>
                  <dt className="font-semibold" style={{ color: IVORY }}>{t}</dt>
                  <dd className="text-right" style={{ color: 'rgba(250,247,242,0.6)' }}>{d}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ImageSlot {...PHOTOS.luggage} className="lg:col-span-6 lg:col-start-7 aspect-square w-full" sizes="(min-width: 1024px) 45vw, 100vw" tone="dark" />
        </div>
      </section>

      {/* ───────────────── VEHICLES ───────────────── */}
      <section id="vehicles" className="py-20 lg:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <ImageSlot {...PHOTOS.vehicle} className="lg:col-span-7 aspect-[4/3] w-full" sizes="(min-width: 1024px) 55vw, 100vw" />
          <div className="lg:col-span-5 its-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-6" style={{ ...serif, color: INK }}>Travel Comfortably With Your Luggage</h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: BODY }}>
              Every transfer is a private vehicle for your party only. We match it to the number of passengers and the amount of luggage you give us.
            </p>
            <div className="border-t" style={{ borderColor: INK }}>
              <div className="py-5 border-b" style={{ borderColor: LINE }}>
                <h3 className="font-semibold text-lg" style={{ ...serif, color: INK }}>{van.name} — Mercedes V-Class</h3>
                <p className="text-sm" style={{ color: BODY }}>For couples with plenty of luggage, families and small groups — the usual choice for cruise passengers.</p>
              </div>
              <div className="py-5 border-b" style={{ borderColor: LINE }}>
                <h3 className="font-semibold text-lg" style={{ ...serif, color: INK }}>{sedan.name}</h3>
                <p className="text-sm" style={{ color: BODY }}>{sedan.model}. For one or two travellers with lighter luggage.</p>
              </div>
              <p className="py-4 text-sm" style={{ color: MUTED }}>
                Also available: {others.map((v) => v.name).join(' and ')}. Details on the{' '}
                <Link href="/fleet" className={link} style={{ color: GOLD }}>fleet page</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── INTERIOR (full-bleed) ───────────────── */}
      <section style={{ background: INK }}>
        <ImageSlot {...PHOTOS.interior} className="w-full aspect-[16/10] md:aspect-[21/9]" sizes="100vw" tone="dark" />
        <div className="max-w-6xl mx-auto px-5 lg:px-10 py-16 lg:py-20 grid lg:grid-cols-12 gap-8">
          <h2 className="lg:col-span-5 text-3xl lg:text-4xl font-bold text-balance leading-tight its-reveal" style={{ ...serif, color: IVORY }}>
            A Quiet Space Between Milan and the Cruise Terminal
          </h2>
          <p className="lg:col-span-6 lg:col-start-7 text-base leading-relaxed its-reveal" style={{ color: 'rgba(250,247,242,0.72)' }}>
            After checkout and before the queues at the terminal, there’s the drive. It’s a private car: your own seats, your
            luggage loaded once and kept together with you, nobody else getting on. Time to settle, finish a call, or watch
            Lombardy turn into the Veneto out of the window.
          </p>
        </div>
      </section>

      {/* ───────────────── WHY PRIVATE ───────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-5" style={{ ...serif, color: INK }}>Why Cruise Passengers Often Prefer a Private Transfer</h2>
          <p className="text-base leading-relaxed mb-12 max-w-2xl" style={{ color: BODY }}>
            Trains between Milan and Venice are good, and cheaper. It isn’t always quicker by car. The difference on sailing day is the connections either side.
          </p>
          <div className="grid md:grid-cols-2 gap-10 md:gap-0">
            <div className="md:pr-10">
              <h3 className="text-lg font-semibold pb-4 mb-2 border-b" style={{ ...serif, color: INK, borderColor: INK }}>Private transfer</h3>
              <ul className="text-sm" style={{ color: INK }}>
                {['Pickup at your hotel entrance', 'A private vehicle for your party', 'Help with the luggage', 'One continuous journey to the terminal', 'Pickup time set from your cruise check-in'].map((i) => (
                  <li key={i} className="py-3 border-b" style={{ borderColor: LINE }}>{i}</li>
                ))}
              </ul>
            </div>
            <div className="md:pl-10 md:border-l" style={{ borderColor: LINE }}>
              <h3 className="text-lg font-semibold pb-4 mb-2 border-b" style={{ ...serif, color: MUTED, borderColor: LINE }}>Public transport</h3>
              <ul className="text-sm" style={{ color: MUTED }}>
                {['Taxi or metro to the station, then the train', 'Shared with other travellers', 'Luggage carried through each change', 'A further transfer from Venice out to Fusina', 'Planned around train timetables'].map((i) => (
                  <li key={i} className="py-3 border-b" style={{ borderColor: LINE }}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── FUSINA + ROUTE LINE ───────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5 lg:px-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-12 its-reveal" style={{ ...serif, color: INK }}>Arriving at Fusina Cruise Terminal</h2>

          {/* Minimal route line instead of a map: no distances beyond what the site's own route data supports. */}
          <div className="relative mb-14" aria-label="Route: Milan, A4 motorway through Lombardy and the Veneto, Fusina Cruise Terminal, Venice">
            <span aria-hidden="true" className="hidden md:block absolute top-[7px] left-0 right-0 h-px its-line-x" style={{ background: GOLD }} />
            <ol className="relative grid md:grid-cols-3 gap-6">
              {[
                ['Milan', 'Lombardy — your hotel'],
                ['A4 motorway', 'East through Lombardy into the Veneto'],
                ['Fusina Cruise Terminal', 'Venice — mainland side of the lagoon'],
              ].map(([place, note], i) => (
                <li key={place} className={i === 0 ? 'md:text-left' : i === 2 ? 'md:text-right' : 'md:text-center'}>
                  <span
                    aria-hidden="true"
                    className={`hidden md:block w-[15px] h-[15px] rounded-full mb-4 ${i === 1 ? 'mx-auto' : i === 2 ? 'ml-auto' : ''}`}
                    style={{ background: i === 1 ? '#fff' : GOLD, border: `1px solid ${GOLD}` }}
                  />
                  <p className="font-semibold" style={{ ...serif, color: INK, fontSize: '1.15rem' }}>{place}</p>
                  <p className="text-sm" style={{ color: MUTED }}>{note}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-14 text-base leading-relaxed" style={{ color: BODY }}>
            <p>
              Fusina is in Venice, but not in the historic centre: it sits on the mainland edge of the lagoon, beyond Marghera.
              So a transfer from Milan to Fusina Cruise Terminal never has to reach the city’s bridges and canals — the drive
              goes to the terminal itself.
            </p>
            <p>
              Venice cruise departures don’t all use the same terminal, so the one printed on your cruise documents is the one
              we drive to. For other Venice journeys — from the airport or the city — see our{' '}
              <Link href="/venice-cruise-transfer" className={link} style={{ color: GOLD }}>Venice cruise transfers</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── PLANNING ───────────────── */}
      <section className="py-20 lg:py-28" style={{ background: PAPER }}>
        <div className="max-w-6xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-6" style={{ ...serif, color: INK }}>Planning Your Cruise Transfer</h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: BODY }}>
              We set the pickup time with you, working back from your cruise check-in. Milan to the Venice area is usually two
              and a half to three hours by road; to that we add your hotel checkout and getting the bags down, the traffic on
              the day, and arriving at the terminal in time for boarding.
            </p>
            <p className="text-sm" style={{ color: MUTED }}>Check-in and boarding rules are set by your cruise line — follow your documents.</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[11px] uppercase tracking-[0.22em] mb-4" style={{ color: GOLD }}>Please include when booking</p>
            <ol className="text-sm" style={{ color: INK }}>
              {['Cruise departure date', 'Terminal, as on your cruise documents', 'Cruise line and ship, if you have them', 'Hotel pickup location', 'Desired pickup time', 'Number of passengers', 'Luggage quantity'].map((i, n) => (
                <li key={i} className="grid grid-cols-[2.5rem_1fr] py-3 border-b" style={{ borderColor: LINE }}>
                  <span className="text-xs pt-0.5" style={{ color: GOLD }}>{String(n + 1).padStart(2, '0')}</span>
                  {i}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ───────────────── RETURN ───────────────── */}
      <section className="py-20 lg:py-28" style={{ background: INK }}>
        <div className="max-w-6xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className={`${eyebrow} mb-5`} style={{ color: BRIGHT_GOLD }}>After the cruise</p>
            <h2 className="font-bold leading-[1.05] mb-8" style={{ ...serif, color: IVORY, fontSize: 'clamp(2rem, 4vw, 3.1rem)' }}>Returning From Fusina to Milan</h2>
            <ul>
              {['Fusina → your Milan hotel', 'Fusina → an address in Milan', 'Fusina → Malpensa Airport', 'Fusina → Linate Airport'].map((r) => (
                <li key={r} className="text-lg py-3 border-b" style={{ ...serif, color: IVORY, borderColor: 'rgba(201,168,76,0.2)' }}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-16 text-base leading-relaxed space-y-5 its-reveal" style={{ color: 'rgba(250,247,242,0.72)' }}>
            <p>
              The same transfer runs in reverse. On disembarkation morning you know roughly when the ship docks, not exactly
              when you’ll be through with your luggage — so give us the ship, the date and the disembarkation time on your
              documents, and we’ll agree the pickup time and meeting point with you.
            </p>
            <p>
              From Fusina the chauffeur can take you back to a Milan hotel for another night, to an address in the city, or
              straight to <Link href="/malpensa-airport-transfer" className={link} style={{ color: BRIGHT_GOLD }}>Malpensa</Link> or{' '}
              <Link href="/linate-airport-transfer" className={link} style={{ color: BRIGHT_GOLD }}>Linate</Link> for the flight home.
              Choose Round Trip in the form to quote both journeys together.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── SCENARIOS ───────────────── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-5 lg:px-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-10" style={{ ...serif, color: INK }}>Who Books This Transfer</h2>
          <div className="border-t" style={{ borderColor: INK }}>
            {[
              ['A couple finishing a Milan stay', 'Checking out of their hotel with two large cases each and the cruise luggage on top.'],
              ['A family cruise departure', 'Two adults, children and several suitcases — one private vehicle for all of it.'],
              ['A long cruise itinerary', 'Far more luggage than a short city break, which changes the vehicle you need.'],
              ['A cruise and a flight', 'Coming off the ship and going straight to Malpensa or Linate for the flight home.'],
            ].map(([label, text]) => (
              <div key={label} className="grid md:grid-cols-[17rem_1fr] gap-1 md:gap-10 py-6 border-b" style={{ borderColor: LINE }}>
                <h3 className="text-base font-semibold" style={{ ...serif, color: INK }}>{label}</h3>
                <p className="text-base leading-relaxed" style={{ color: BODY }}>{text}</p>
              </div>
            ))}
          </div>
          <p className="text-sm mt-8 leading-relaxed" style={{ color: BODY }}>
            More time in Lombardy before you sail? We also drive <Link href="/malpensa-to-lake-como" className={link} style={{ color: GOLD }}>to Lake Como</Link>,{' '}
            <Link href="/malpensa-to-bellagio" className={link} style={{ color: GOLD }}>Bellagio</Link>,{' '}
            <Link href="/malpensa-to-bergamo" className={link} style={{ color: GOLD }}>Bergamo</Link> and{' '}
            <Link href="/malpensa-to-turin" className={link} style={{ color: GOLD }}>Turin</Link>, and offer a{' '}
            <Link href="/milan-chauffeur-service" className={link} style={{ color: GOLD }}>private chauffeur service in Milan</Link>.
          </p>
        </div>
      </section>

      {/* ───────────────── BOOKING ───────────────── */}
      <section id="booking" className="py-20 lg:py-28 scroll-mt-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:pt-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-6" style={{ ...serif, color: INK }}>Plan Your Transfer Around Your Cruise</h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: BODY }}>
              Your Milan hotel, the travel date and pickup time, how many of you, and the luggage. Put the cruise line, ship and
              terminal in the special requirements box. We reply with a fixed quote, normally within two hours — nothing to pay
              when you send the request.
            </p>
            <div className="py-5 border-y" style={{ borderColor: LINE }}>
              <p className="text-[11px] uppercase tracking-[0.22em] mb-2" style={{ color: GOLD }}>Your quote</p>
              <p className="text-sm leading-relaxed" style={{ color: BODY }}>
                Depends on your pickup address, passengers, luggage, vehicle, date and terminal. It includes the vehicle, the
                chauffeur, motorway tolls and VAT where applicable; not parking the driver has to pay on site or stops not
                agreed when booking.
              </p>
            </div>
            <p className="text-sm mt-6" style={{ color: BODY }}>
              Rather ask first? <a href={`mailto:${siteConfig.email}?subject=Milan%20to%20Fusina%20transfer`} className={link} style={{ color: GOLD }}>Ask for a quote by email</a>.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 w-full max-w-[480px] mx-auto lg:max-w-none">
            <QuoteForm defaultPickup="Milan" defaultDropoff="Fusina Cruise Terminal, Venice" />
          </div>
        </div>
      </section>

      {/* ───────────────── FAQ ───────────────── */}
      <section className="py-20 lg:py-24" style={{ background: PAPER }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10">
          <h2 className="lg:col-span-4 text-3xl font-bold leading-tight" style={{ ...serif, color: INK }}>Questions</h2>
          <div className="lg:col-span-8 border-t" style={{ borderColor: INK }}>
            {faqs.map((f) => (
              <details key={f.question} className="group border-b" style={{ borderColor: LINE }}>
                <summary className={`cursor-pointer list-none flex justify-between items-center gap-6 py-5 ${focus}`} style={{ outlineColor: GOLD }}>
                  <h3 className="text-base font-semibold" style={{ ...serif, color: INK }}>{f.question}</h3>
                  <span aria-hidden="true" className="shrink-0 text-xl leading-none transition-transform duration-300 group-open:rotate-45" style={{ color: GOLD }}>+</span>
                </summary>
                <p className="pb-6 pr-10 text-sm leading-relaxed" style={{ color: BODY }}>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── CLOSING (cinematic) ───────────────── */}
      <section className="relative" style={{ background: INK }}>
        <ImageSlot {...PHOTOS.closing} className="w-full aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]" sizes="100vw" tone="dark" />
        {/* Legibility scrims: from the bottom on small screens, from the left on desktop, so the couple on the right stays clean. */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none lg:hidden" style={{ background: 'linear-gradient(to top, rgba(15,13,10,0.92) 0%, rgba(15,13,10,0.55) 38%, rgba(15,13,10,0) 65%)' }} />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none hidden lg:block" style={{ background: 'linear-gradient(to right, rgba(15,13,10,0.9) 0%, rgba(15,13,10,0.7) 32%, rgba(15,13,10,0) 58%)' }} />
        <div className="absolute inset-x-0 bottom-0">
          <div className="max-w-7xl mx-auto px-5 lg:px-10 pb-10 lg:pb-16">
            <h2 className="font-bold text-balance leading-[1.06] mb-4 max-w-2xl" style={{ ...serif, color: IVORY, fontSize: 'clamp(1.9rem, 4vw, 3.2rem)' }}>
              Leave Milan. Arrive at the Cruise Terminal Ready.
            </h2>
            <p className="text-base lg:text-lg leading-relaxed mb-7 max-w-xl" style={{ color: 'rgba(250,247,242,0.82)' }}>
              Share your hotel, travel date, passenger details and luggage requirements, and request your private transfer to Fusina Cruise Terminal.
            </p>
            <Link href="#booking" className={`group inline-flex items-center gap-3 text-sm font-semibold px-8 py-4 ${focus}`} style={{ background: BRIGHT_GOLD, color: INK, letterSpacing: '0.06em', outlineColor: IVORY }}>
              Request Your Transfer
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
