import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import QuoteForm from '@/components/home/QuoteForm'
import ImageSlot from '@/components/editorial/ImageSlot'
import StickyQuoteBar from '@/components/editorial/StickyQuoteBar'
import { JsonLd, breadcrumbSchema, faqSchema } from '@/components/seo/JsonLd'
import { siteConfig } from '@/lib/siteConfig'
import { vehicles } from '@/data/fleet'

/*
 * Editorial landing page for private transfers between Milan's airports and
 * Milan hotels (both directions), plus hotel-to-address journeys in the city.
 *
 * Photos in public/images/milan-hotel/ were supplied for THIS page only —
 * don't reuse them elsewhere. They are similar shots, so each is used at a
 * different size and crop to keep the rhythm varied.
 *
 * Facts come from the site's own data and policies: Malpensa 48 km /
 * 45–60 min to Milan (data/routes.ts), Linate 7 km and Bergamo 45 km from the
 * centre (data/airports.ts), T1/T2 split, name-board meet & greet, flight
 * monitoring, 60 min free waiting and what a quote includes (terms), hotel
 * entrance + luggage assistance (hotel/cruise pages), child seats on request
 * (FAQ), vehicle categories (data/fleet.ts). No prices, no capacities.
 */

const PATH = '/milan-hotel-transfer'
const TITLE = 'Milan Hotel Transfer | Private Airport & Chauffeur Service'
const DESCRIPTION =
  'Private transfers between Malpensa, Linate or Bergamo airport and your Milan hotel — and back. A chauffeur, a vehicle sized to your luggage, a fixed quote.'

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
    images: ['/images/milan-hotel/milan-hotel-transfer.webp'],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/images/milan-hotel/milan-hotel-transfer.webp'] },
}

const P = 'images/milan-hotel'
const PHOTOS = {
  hero: {
    file: `${P}/milan-hotel-transfer`, size: '2000 × 1300', brief: 'Chauffeur at a Milan hotel entrance with the Duomo',
    alt: 'Chauffeur holding the door of a Mercedes van for a guest outside a hotel near Milan Cathedral', position: '40% center',
  },
  arrive: {
    file: `${P}/milan-airport-hotel-transfer`, size: '2000 × 1300', brief: 'Guests arriving at a Milan hotel with suitcases',
    alt: 'Two guests with suitcases arriving at a Milan hotel as the chauffeur loads their luggage', position: 'center 55%',
  },
  hotelDoor: {
    file: `${P}/milan-hotel-chauffeur`, size: '2400 × 1000', brief: 'Chauffeur loading luggage at a hotel door',
    alt: 'Chauffeur loading luggage outside a Milan hotel', position: 'center 62%',
  },
  vehicle: {
    file: `${P}/milan-private-transfer-vehicle`, size: '1600 × 1200', brief: 'Mercedes V-Class at the kerb',
    alt: 'Black Mercedes van with its sliding door open outside a hotel in central Milan', position: '72% center',
  },
  luggage: {
    file: `${P}/milan-transfer-luggage`, size: '1400 × 1750', brief: 'Suitcases going into the van boot',
    alt: 'Chauffeur placing a suitcase into the boot of a van outside a Milan hotel', position: '60% center',
  },
  closing: {
    file: `${P}/milan-hotel-airport-transfer`, size: '1600 × 1300', brief: 'Evening departure from a Milan hotel',
    alt: 'Evening departure from a Milan hotel, chauffeur waiting beside the van', position: '45% center',
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

const faqs = [
  {
    question: 'Do you provide hotel transfers from Milan Malpensa Airport?',
    answer:
      'Yes. Your driver meets you in the arrivals hall at Terminal 1 or Terminal 2 with a name board and drives you straight to your hotel. Your flight is monitored, and the driver waits up to 60 minutes after the actual landing time at no extra charge.',
  },
  {
    question: 'Can I book a transfer from Linate Airport to my Milan hotel?',
    answer: 'Yes. Linate is about 7 km from the city centre, so it is the shortest of Milan’s airport-to-hotel transfers.',
  },
  {
    question: 'Can you collect me from a Milan hotel and take me to the airport?',
    answer:
      'Yes — to Malpensa, Linate or Bergamo. Give us your hotel, flight time and airport, and we will agree a pickup time with you. Choose Round Trip in the form to book arrival and departure together.',
  },
  {
    question: 'Do you provide transfers to hotels outside central Milan?',
    answer:
      'Yes. Hotels and private addresses outside the centre — Bicocca, Fiera Milano in Rho, or further out — work the same way. Give the full address when you ask for a quote.',
  },
  {
    question: 'Can I book a private vehicle for my family?',
    answer:
      'Yes. The vehicle is booked for your party alone. Child seats can be requested when booking — tell us how many and the children’s ages.',
  },
  {
    question: 'Can I travel with several large suitcases?',
    answer:
      'Yes, as long as we know about them when we quote. Tell us how many large suitcases and cabin bags you have, and we will send a vehicle with room for all of them.',
  },
  {
    question: 'Can I request a Mercedes V-Class or a larger vehicle?',
    answer:
      'Yes. The Premium Van is a Mercedes-Benz V-Class or similar. Choose it in the form; for a bigger group, tell us the numbers and we will quote what fits.',
  },
]

export default function MilanHotelTransferPage() {
  const van = vehicles.find((v) => v.id === 'van')!
  const others = vehicles.filter((v) => v.id !== 'van')

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Milan hotel transfer',
    serviceType: 'Private transfer between Milan airports and hotels',
    description: DESCRIPTION,
    url: `${siteConfig.domain}${PATH}`,
    provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.domain, email: siteConfig.email },
    areaServed: [
      { '@type': 'City', name: 'Milan', alternateName: 'Milano', containedInPlace: { '@type': 'AdministrativeArea', name: 'Lombardy' } },
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

      {/* ───────────────── HERO ─────────────────
          Image-led: the photo takes the larger share; copy sits in a
          narrower column with the trust row underneath. */}
      <section className="pt-28 lg:pt-32 pb-14 lg:pb-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 lg:order-2">
            <ImageSlot {...PHOTOS.hero} priority className="aspect-[4/3] lg:aspect-[5/4] w-full" sizes="(min-width: 1024px) 55vw, 100vw" tone="dark" />
          </div>
          <div className="lg:col-span-5 lg:order-1">
            <nav className="flex flex-wrap items-center gap-2 text-xs mb-8" style={{ color: MUTED }} aria-label="Breadcrumb">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href="/hotel-transfers" className="hover:underline">Hotel Transfers</Link>
              <span>/</span>
              <span style={{ color: GOLD }}>Milan</span>
            </nav>
            <p className={`${eyebrow} mb-5`} style={{ color: GOLD }}>Milano · Malpensa · Linate · Bergamo</p>
            <h1 className="font-bold text-balance leading-[1.02] mb-6" style={{ ...serif, color: INK, fontSize: 'clamp(2.5rem, 5vw, 4.4rem)', letterSpacing: '-0.015em' }}>
              Milan Hotel Transfer
            </h1>
            <p className="text-lg leading-relaxed mb-9 max-w-md" style={{ color: BODY }}>
              Private airport and hotel transfers across Milan, with a chauffeur waiting for you at the right place and the right time.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-10">
              <Link
                href="#booking"
                className="group inline-flex items-center gap-3 text-sm font-semibold px-8 py-4 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ background: INK, color: IVORY, letterSpacing: '0.06em', outlineColor: GOLD }}
              >
                Book Your Transfer
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="#quote-form" className={`text-sm font-medium ${link}`} style={{ color: INK }}>
                Get a Quote
              </Link>
            </div>
            {/* 2×2 on mobile, a single ruled line from sm up */}
            <ul className="grid grid-cols-2 gap-y-2 sm:flex sm:flex-wrap text-xs tracking-wide border-t pt-5" style={{ borderColor: LINE, color: MUTED }}>
              {['Private vehicle', 'Hotel pickup', 'Airport transfers', 'Professional chauffeur'].map((t, i) => (
                <li key={t} className={`py-1 sm:pr-4 ${i > 0 ? 'sm:pl-4 sm:border-l' : ''}`} style={{ borderColor: LINE }}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────────────── THE TRAVEL PROBLEM ───────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 mb-14 lg:mb-20">
            <h2 className="lg:col-span-5 text-3xl lg:text-[2.6rem] font-bold text-balance leading-[1.1] its-reveal" style={{ ...serif, color: INK }}>
              Arrive in Milan. Leave the Airport Behind.
            </h2>
            <div className="lg:col-span-6 lg:col-start-7 space-y-5 text-base leading-relaxed its-reveal" style={{ color: BODY }}>
              <p>
                Malpensa, where most international flights land, is about 48 km from the city. After a long flight and a wait
                at baggage reclaim, the last thing most people want is to work out the airport train, a metro change and
                which exit of the station their hotel is near — with every suitcase, and maybe a child, in tow.
              </p>
              <p>
                The simplest way from a Milan airport to your hotel is a private transfer: one car, booked in advance, that
                takes you from the arrivals hall to the hotel entrance without changing between services. It works the other
                way too — a pickup at your hotel for an early flight, arranged the day before rather than at 5 a.m.
              </p>
            </div>
          </div>
          <ImageSlot {...PHOTOS.arrive} className="w-full aspect-[16/10] lg:aspect-[21/10]" sizes="(min-width: 1280px) 1200px, 100vw" />
        </div>
      </section>

      {/* ───────────────── AIRPORT → HOTEL ───────────────── */}
      <section className="py-20 lg:py-28" style={{ background: INK }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-6" style={{ ...serif, color: IVORY }}>From Milan Airport to Your Hotel</h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(250,247,242,0.65)' }}>
              We provide private transfers from all three airports that serve Milan — Malpensa, Linate and Bergamo — to hotels
              and private addresses throughout the city. Which one you land at decides how long the drive is.
            </p>
            <p className="text-sm" style={{ color: 'rgba(250,247,242,0.5)' }}>
              More on each airport:{' '}
              <Link href="/malpensa-airport-transfer" className={link} style={{ color: BRIGHT_GOLD }}>Malpensa</Link>,{' '}
              <Link href="/linate-airport-transfer" className={link} style={{ color: BRIGHT_GOLD }}>Linate</Link>,{' '}
              <Link href="/bergamo-airport-transfer" className={link} style={{ color: BRIGHT_GOLD }}>Bergamo</Link>.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {[
              {
                code: 'MXP', name: 'Milan Malpensa Airport',
                fact: 'About 48 km · usually 45–60 minutes to the centre',
                text: 'Northern Italy’s largest airport and the arrival point for most long-haul and international flights. Terminal 1 handles most international flights; Terminal 2 is used mainly by easyJet. The driver meets you in arrivals at either.',
              },
              {
                code: 'LIN', name: 'Milan Linate Airport',
                fact: 'About 7 km from the centre',
                text: 'Milan’s city airport, close enough that the transfer to a central hotel is short — useful when you land with a meeting or a dinner booking not long after.',
              },
              {
                code: 'BGY', name: 'Bergamo Airport (Orio al Serio)',
                fact: 'About 45 km from central Milan',
                text: 'A major low-cost hub used by Ryanair and others. Plenty of people staying in Milan fly in here; the pickup and the drive to your hotel work just as they do from Malpensa.',
              },
            ].map((a, i) => (
              <div key={a.code} className={`grid grid-cols-[4.5rem_1fr] sm:grid-cols-[6.5rem_1fr] gap-4 sm:gap-8 py-8 ${i > 0 ? 'border-t' : ''}`} style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
                <p className="font-bold leading-none" style={{ ...serif, color: BRIGHT_GOLD, fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{a.code}</p>
                <div>
                  <h3 className="text-lg font-semibold" style={{ ...serif, color: IVORY }}>{a.name}</h3>
                  <p className="text-xs mb-3 mt-1" style={{ color: 'rgba(250,247,242,0.45)' }}>{a.fact}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(250,247,242,0.72)' }}>{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── HOTELS ACROSS MILAN ───────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-8 mb-12">
            <h2 className="lg:col-span-5 text-3xl lg:text-4xl font-bold text-balance leading-tight its-reveal" style={{ ...serif, color: INK }}>Hotels Across Milan</h2>
            <p className="lg:col-span-6 lg:col-start-7 text-base leading-relaxed its-reveal" style={{ color: BODY }}>
              We collect from and drop off at hotels and private addresses across Milan, as close to the door as vehicle access
              allows. Parts of the historic centre are pedestrianised, and several hotels share similar names — so the full
              street address matters more than the area.
            </p>
          </div>
          <p className="text-lg lg:text-xl leading-[1.9]" style={{ ...serif, color: INK }}>
            The <strong>Duomo</strong> and the streets around it; <strong>Montenapoleone</strong> and the fashion district;{' '}
            <strong>Brera</strong>, just to the north; <strong>Porta Venezia</strong> and its side streets;{' '}
            <strong>Porta Nuova</strong> and the towers around Garibaldi station; <strong>CityLife</strong> and the{' '}
            <strong>MiCo</strong> convention centre on the west side; the canals of the <strong>Navigli</strong>;{' '}
            <strong>Bicocca</strong> in the north; and <strong>Fiera Milano</strong> in Rho, out towards Malpensa.
          </p>
          <p className="text-sm mt-8" style={{ color: BODY }}>
            Staying near the Duomo, in Brera or by Porta Nuova? Give us the hotel name and street address when you ask for a quote.
          </p>
        </div>
      </section>

      {/* ───────────────── HOTEL DOOR (full-bleed) ───────────────── */}
      <section className="bg-white pb-20 lg:pb-28">
        <ImageSlot {...PHOTOS.hotelDoor} className="w-full aspect-[16/10] md:aspect-[21/9]" sizes="100vw" />
        <div className="max-w-7xl mx-auto px-5 lg:px-10 relative -mt-10 md:-mt-24">
          <div className="bg-white max-w-2xl p-8 lg:p-12 its-reveal" style={{ border: `1px solid ${LINE}` }}>
            <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-6" style={{ ...serif, color: INK }}>From the Hotel Door to Your Next Destination</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: BODY }}>
              On the way out, the chauffeur comes to your hotel entrance at the time you agreed and helps with the bags. There’s
              no taxi rank to find and no hoping a car turns up at 5 a.m. — which matters most for early flights and for
              families getting children and luggage out of the door at once.
            </p>
            <p className="text-base leading-relaxed" style={{ color: BODY }}>
              From the hotel it’s a direct drive: to Malpensa, Linate or Bergamo, to another hotel or address in Milan, or
              onward out of the city. For a car at your disposal by the hour, see our{' '}
              <Link href="/milan-chauffeur-service" className={link} style={{ color: GOLD }}>private chauffeur service in Milan</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── ARRIVAL JOURNEY LINE ───────────────── */}
      <section className="py-20 lg:py-24" style={{ background: PAPER }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-6 mb-14">
            <h2 className="lg:col-span-6 text-3xl lg:text-4xl font-bold text-balance leading-tight" style={{ ...serif, color: INK }}>Your Driver, Your Vehicle, No Guesswork</h2>
            <p className="lg:col-span-5 lg:col-start-8 text-base leading-relaxed self-end" style={{ color: BODY }}>
              Your flight is monitored, so the timing follows a delay or an early landing. The driver waits up to 60 minutes
              after the actual landing at no extra charge — enough for passport control and bags.
            </p>
          </div>
          <ol className="relative grid md:grid-cols-5 gap-8 md:gap-6">
            <span aria-hidden="true" className="hidden md:block absolute top-[7px] left-0 right-0 h-px its-line-x" style={{ background: GOLD }} />
            <span aria-hidden="true" className="md:hidden absolute top-2 bottom-2 left-[7px] w-px its-line-y" style={{ background: GOLD }} />
            {[
              ['Your flight lands', 'At Malpensa, Linate or Bergamo.'],
              ['Collect your luggage', 'Take the time you need at baggage reclaim.'],
              ['Meet your chauffeur', 'In the arrivals hall, holding a board with your name.'],
              ['Bags into the car', 'The chauffeur helps with the luggage.'],
              ['To your Milan hotel', 'A direct drive, no other stops.'],
            ].map(([t, d], i, all) => (
              <li key={t} className="relative pl-9 md:pl-0">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 md:static block w-[15px] h-[15px] rounded-full md:mb-5"
                  style={{ background: i === 0 || i === all.length - 1 ? GOLD : PAPER, border: `1px solid ${GOLD}` }}
                />
                <p className="font-semibold mb-1" style={{ ...serif, color: INK, fontSize: '1.1rem' }}>{t}</p>
                <p className="text-sm leading-relaxed" style={{ color: BODY }}>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────────── VEHICLE ───────────────── */}
      <section id="vehicles" className="py-20 lg:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 its-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-6" style={{ ...serif, color: INK }}>A Private Vehicle That Fits Your Journey</h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: BODY }}>
              Every transfer is a private vehicle for your party only. Which one depends on how many of you there are and,
              just as much, on how many bags you’re bringing.
            </p>
            <div className="border-t" style={{ borderColor: INK }}>
              <div className="py-5 border-b" style={{ borderColor: LINE }}>
                <p className="font-semibold" style={{ ...serif, color: INK, fontSize: '1.15rem' }}>{van.name} — Mercedes V-Class</p>
                <p className="text-sm" style={{ color: BODY }}>For families, groups and anyone with plenty of luggage.</p>
              </div>
              {others.map((v) => (
                <div key={v.id} className="py-4 border-b flex flex-wrap justify-between gap-x-6" style={{ borderColor: LINE }}>
                  <p className="font-medium" style={{ color: INK }}>{v.name}</p>
                  <p className="text-sm" style={{ color: MUTED }}>{v.model}</p>
                </div>
              ))}
            </div>
            <p className="text-sm mt-6" style={{ color: BODY }}>
              Specifications for each are on the <Link href="/fleet" className={link} style={{ color: GOLD }}>fleet page</Link>.
            </p>
          </div>
          <ImageSlot {...PHOTOS.vehicle} className="lg:col-span-5 lg:col-start-8 aspect-[4/3] w-full" sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
      </section>

      {/* ───────────────── LUGGAGE ───────────────── */}
      <section className="py-20 lg:py-28" style={{ background: PAPER }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <ImageSlot {...PHOTOS.luggage} className="lg:col-span-4 aspect-[4/5] w-full max-w-sm lg:max-w-none" sizes="(min-width: 1024px) 32vw, 100vw" />
          <div className="lg:col-span-7 lg:col-start-6 its-reveal">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-6" style={{ ...serif, color: INK }}>Travelling With Luggage? We Plan Around It.</h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: BODY }}>
              On an airport run, seats are rarely the problem — the boot is. Two people with two large suitcases and two cabin
              bags is a different car from two people with a carry-on each. A family’s luggage for a week, golf clubs, a
              pushchair or a business traveller’s sample cases change it again.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: BODY }}>
              So when you book, tell us the passengers and the bags, both ways if you’re booking a return. We arrange the
              vehicle around them rather than finding out at the hotel door.
            </p>
            <dl className="grid sm:grid-cols-2 gap-x-10 text-sm">
              {[
                ['Large suitcases', 'how many checked-size cases'],
                ['Cabin bags', 'carry-ons, backpacks, laptop bags'],
                ['Bulky items', 'pushchair, golf clubs, skis'],
                ['Children', 'ages, if child seats are needed'],
              ].map(([t, d]) => (
                <div key={t} className="py-3 border-b" style={{ borderColor: LINE }}>
                  <dt className="font-semibold" style={{ color: INK }}>{t}</dt>
                  <dd style={{ color: BODY }}>{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ───────────────── HOTEL → AIRPORT ───────────────── */}
      <section className="py-20 lg:py-28" style={{ background: INK }}>
        <div className="max-w-6xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className={`${eyebrow} mb-5`} style={{ color: BRIGHT_GOLD }}>The return</p>
            <h2 className="font-bold leading-[1.05] mb-8" style={{ ...serif, color: IVORY, fontSize: 'clamp(2rem, 4vw, 3.1rem)' }}>Hotel to Milan Airport</h2>
            <ul className="space-y-3">
              {['Milan hotel → Malpensa', 'Milan hotel → Linate', 'Milan hotel → Bergamo Airport'].map((r) => (
                <li key={r} className="text-lg pb-3 border-b" style={{ ...serif, color: IVORY, borderColor: 'rgba(201,168,76,0.2)' }}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-16 its-reveal">
            <p className="text-base leading-relaxed mb-5" style={{ color: 'rgba(250,247,242,0.72)' }}>
              The same transfer works in reverse. We set the pickup time with you from your flight details, allowing for
              checking out and bringing the bags down, Milan traffic at that hour — Malpensa and Bergamo are the longer
              drives — and then your airline’s check-in and bag-drop deadlines and security.
            </p>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(250,247,242,0.72)' }}>
              Not sure when to leave? Send the flight and we’ll suggest a pickup time.
            </p>
            <Link
              href="#booking"
              className="group inline-flex items-center gap-3 text-sm font-semibold px-8 py-4 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ background: BRIGHT_GOLD, color: INK, letterSpacing: '0.06em', outlineColor: IVORY }}
            >
              Plan Your Airport Transfer
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── USE CASES ───────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-5 lg:px-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-12" style={{ ...serif, color: INK }}>When a Hotel Transfer Makes Sense</h2>
          <div className="border-t" style={{ borderColor: INK }}>
            {[
              ['Arriving after a long flight', 'Straight from the airport to your hotel without working out trains and metro lines you don’t know.'],
              ['Travelling with children', 'One vehicle for everyone and every bag, with child seats on request.'],
              ['Multiple suitcases', 'Tell us the passengers and the luggage when you book, and the right vehicle is arranged.'],
              ['Early-morning departure', 'A hotel pickup booked ahead of your flight, so the morning starts without hunting for transport.'],
              ['Business travel', 'Direct between Milan hotels, airports, offices and meeting venues such as MiCo or Fiera Milano.'],
            ].map(([label, text]) => (
              <div key={label} className="grid md:grid-cols-[16rem_1fr] gap-1 md:gap-10 py-6 border-b" style={{ borderColor: LINE }}>
                <h3 className="text-base font-semibold" style={{ ...serif, color: INK }}>{label}</h3>
                <p className="text-base leading-relaxed" style={{ color: BODY }}>{text}</p>
              </div>
            ))}
          </div>
          <p className="text-sm mt-8 leading-relaxed" style={{ color: BODY }}>
            Heading beyond Milan from the airport? We also drive{' '}
            <Link href="/malpensa-to-lake-como" className={link} style={{ color: GOLD }}>Malpensa to Lake Como</Link>,{' '}
            <Link href="/malpensa-to-bellagio" className={link} style={{ color: GOLD }}>Bellagio</Link>,{' '}
            <Link href="/malpensa-to-bergamo" className={link} style={{ color: GOLD }}>Bergamo</Link> and{' '}
            <Link href="/malpensa-to-turin" className={link} style={{ color: GOLD }}>Turin</Link> — and from a Milan hotel to the{' '}
            <Link href="/milan-to-fusina-cruise-terminal-transfer" className={link} style={{ color: GOLD }}>Fusina cruise terminal in Venice</Link>.
          </p>
        </div>
      </section>

      {/* ───────────────── BOOKING ───────────────── */}
      <section id="booking" className="py-20 lg:py-28 scroll-mt-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:pt-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance leading-tight mb-6" style={{ ...serif, color: INK }}>Tell Us Where You’re Staying</h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: BODY }}>
              Your airport or pickup point, your hotel or destination, the date and time, how many of you and how much
              luggage. We reply with a fixed quote, normally within two hours — nothing to pay when you send the request.
            </p>
            <div className="py-5 border-y" style={{ borderColor: LINE }}>
              <p className="text-[11px] uppercase tracking-[0.22em] mb-2" style={{ color: GOLD }}>What the quote includes</p>
              <p className="text-sm leading-relaxed" style={{ color: BODY }}>
                The vehicle, the chauffeur, motorway tolls and VAT where applicable. Not included: parking the driver has to pay
                on site, stops not agreed when booking, or waiting beyond 60 minutes at the airport. The price depends on the
                airport, your hotel, the vehicle, passengers, luggage and time — so it’s quoted for your journey rather than published.
              </p>
            </div>
            <p className="text-sm mt-6" style={{ color: BODY }}>
              Prefer email? <a href={`mailto:${siteConfig.email}`} className={link} style={{ color: GOLD }}>{siteConfig.email}</a> · <Link href="/contact" className={link} style={{ color: GOLD }}>contact page</Link>
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 w-full max-w-[480px] mx-auto lg:max-w-none">
            <QuoteForm />
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
                <summary className="cursor-pointer list-none flex justify-between items-center gap-6 py-5 focus-visible:outline-2 focus-visible:outline-offset-2" style={{ outlineColor: GOLD }}>
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
      <section style={{ background: INK }}>
        <div className="grid lg:grid-cols-2 items-stretch">
          <ImageSlot {...PHOTOS.closing} className="aspect-[4/3] lg:aspect-auto lg:min-h-[34rem] w-full" sizes="(min-width: 1024px) 50vw, 100vw" tone="dark" />
          <div className="px-6 py-16 lg:px-16 lg:py-24 flex flex-col justify-center">
            <h2 className="font-bold text-balance leading-[1.08] mb-6" style={{ ...serif, color: IVORY, fontSize: 'clamp(2rem, 3.6vw, 3rem)' }}>
              Your Milan Hotel Transfer, Arranged Properly.
            </h2>
            <p className="text-lg leading-relaxed mb-10 max-w-md" style={{ color: 'rgba(250,247,242,0.7)' }}>
              Tell us your airport, hotel and travel details and we’ll help arrange the right private transfer for your journey.
            </p>
            <Link
              href="#booking"
              className="group self-start inline-flex items-center gap-3 text-sm font-semibold px-8 py-4 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ background: BRIGHT_GOLD, color: INK, letterSpacing: '0.06em', outlineColor: IVORY }}
            >
              Request Your Transfer
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <StickyQuoteBar label="Book Your Transfer" hint="Airport ↔ Milan hotel · private transfer" />
    </div>
  )
}
