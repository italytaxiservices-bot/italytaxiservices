import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Plane, MapPin, Luggage, Moon, Users, Repeat } from 'lucide-react'
import HeroWithForm from '@/components/booking/HeroWithForm'
import { JsonLd, breadcrumbSchema, faqSchema } from '@/components/seo/JsonLd'
import { siteConfig } from '@/lib/siteConfig'
import { vehicles } from '@/data/fleet'

/*
 * Hand-written route page (not RoutePageTemplate). Every operational claim
 * here is taken from the site's own policies — terms (what a quote
 * includes, 60 min free waiting), refund policy (24 h cancellation), the
 * Malpensa page (both terminals, name board, flight monitoring), the FAQ
 * (child seats on request) and data/fleet.ts (vehicles). No price is shown:
 * quotes for this route depend on the exact Bergamo address.
 */

const PATH = '/malpensa-to-bergamo'
const TITLE = 'Milan Malpensa Airport to Bergamo Transfer | Private Chauffeur'
const DESCRIPTION =
  'Private transfer from Milan Malpensa Airport (MXP) to Bergamo city or Città Alta. Pickup at Terminal 1 or 2, room for luggage, door to door, fixed quote.'

export const metadata: Metadata = {
  // absolute: the layout's "| Italy Taxi Services" suffix would push this past 70 characters.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: 'website', siteName: siteConfig.name, url: PATH, title: TITLE, description: DESCRIPTION, images: ['/logo.webp'] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/logo.webp'] },
}

const INK = '#1a1410'
const GOLD = '#8B7340'
const BRIGHT_GOLD = '#C9A84C'
const CREAM = '#FAF7F2'
const LINE = '#E8E2D9'
const BODY = '#5a5248'
const serif = { fontFamily: 'var(--font-serif), Georgia, serif' }

const faqs = [
  {
    question: 'How long does it take from Milan Malpensa Airport to Bergamo?',
    answer:
      'Usually a little over an hour by car, and longer when the motorways around Milan are busy — weekday mornings and late afternoons are the slowest. Your exact Bergamo address also matters: the lower town is quicker to reach than a hotel inside the walls of Città Alta.',
  },
  {
    question: 'How much is a private transfer from Malpensa to Bergamo?',
    answer:
      'We quote each journey individually because the price depends on the vehicle and where in Bergamo you are going. The quote is fixed and already includes motorway tolls and VAT where applicable. Send your flight details, passengers and luggage through the form and you will receive the price before you commit to anything.',
  },
  {
    question: 'What is the easiest way to get from Malpensa Airport to Bergamo?',
    answer:
      'The simplest option is a pre-booked private car that collects you in the Malpensa arrivals hall and drives straight to your Bergamo address, with no changes on the way. Public transport also works, but it normally involves at least one connection through Milan.',
  },
  {
    question: 'Can I book from Malpensa Terminal 1 or Terminal 2?',
    answer:
      'Yes, pickups run from both terminals. Terminal 1 handles most international flights; Terminal 2 is used mainly by easyJet. Your flight number tells us which one you are arriving at, so there is no need to work it out yourself.',
  },
  {
    question: 'Can you take me directly to Bergamo Città Alta?',
    answer:
      'Yes, as close to your hotel as the roads allow. Some streets in the upper town have restricted vehicle access, so give us the hotel name or exact address when you ask for a quote and we will confirm the drop-off point before the day.',
  },
  {
    question: 'Can I book a Mercedes V-Class from Malpensa to Bergamo?',
    answer:
      'Yes. The Premium Van (Mercedes-Benz V-Class or similar) takes up to seven passengers and is the usual choice for families and groups with several suitcases. Select it in the vehicle field of the form.',
  },
  {
    question: 'Can I book a late-night transfer?',
    answer:
      'Yes. Transfers can be booked for any arrival time, subject to availability, which is why it is worth booking ahead for late flights. If your flight is delayed, the driver follows the new arrival time.',
  },
  {
    question: 'Can I add a child seat?',
    answer:
      'Child seats can be requested when booking. Write the number of seats and the children’s ages in the special requirements box so the right seats are in the car.',
  },
  {
    question: 'What happens if I need to cancel?',
    answer: 'Cancellations made more than 24 hours before pickup receive a full refund. Later cancellations may be charged — the details are in our refund policy.',
  },
  {
    question: 'Do you also cover Bergamo’s own airport?',
    answer:
      'Yes. If you are flying into Orio al Serio (BGY) instead of Malpensa, that is a separate, much shorter transfer — see our Bergamo Airport transfer page.',
  },
]

export default function MalpensaToBergamoPage() {
  const sedan = vehicles.find((v) => v.id === 'sedan')!
  const firstClass = vehicles.find((v) => v.id === 'business')!
  const van = vehicles.find((v) => v.id === 'van')!
  const suv = vehicles.find((v) => v.id === 'luxury')!

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Private transfer from Milan Malpensa Airport to Bergamo',
    serviceType: 'Private airport transfer',
    description: DESCRIPTION,
    url: `${siteConfig.domain}${PATH}`,
    provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.domain, email: siteConfig.email },
    areaServed: [
      { '@type': 'Airport', name: 'Milan Malpensa Airport', iataCode: 'MXP' },
      { '@type': 'City', name: 'Bergamo', containedInPlace: { '@type': 'AdministrativeArea', name: 'Lombardy' } },
    ],
  }

  return (
    <div>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: siteConfig.domain },
          { name: 'Airport Transfers', url: `${siteConfig.domain}/airport-transfers` },
          { name: 'Malpensa to Bergamo', url: `${siteConfig.domain}${PATH}` },
        ])}
      />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema(faqs)} />

      {/* ── HERO ── */}
      <section className="pt-32 pb-16" style={{ background: '#0f0d0a' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <nav className="flex flex-wrap items-center gap-2 text-xs mb-8" style={{ color: 'rgba(250,247,242,0.4)' }} aria-label="Breadcrumb">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/airport-transfers" className="hover:text-amber-400 transition-colors">Airport Transfers</Link>
            <span>/</span>
            <span style={{ color: BRIGHT_GOLD }}>Malpensa → Bergamo</span>
          </nav>

          <HeroWithForm defaultPickup="Milan Malpensa Airport (MXP)" defaultDropoff="Bergamo">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-5" style={{ color: BRIGHT_GOLD }}>
              MXP → Bergamo · Private transfer
            </p>
            <h1 className="font-black leading-[1.05] mb-5" style={{ ...serif, fontSize: 'clamp(2rem, 4vw, 3.1rem)', color: CREAM }}>
              Milan Malpensa Airport to Bergamo Transfer
            </h1>
            <p className="text-base leading-relaxed mb-7 max-w-lg" style={{ color: 'rgba(250,247,242,0.7)' }}>
              A private car from the arrivals hall at Malpensa (MXP) straight to your address in Bergamo — the lower town or
              Città Alta. Your driver meets you at Terminal 1 or 2, loads the luggage and drives you there without a change.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="#quote-form" className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-sm transition-all hover:-translate-y-0.5" style={{ background: BRIGHT_GOLD, color: '#0f0d0a', letterSpacing: '0.04em' }}>
                Get a Transfer Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#how-to-book" className="inline-flex items-center gap-2 font-medium text-sm px-6 py-3.5 rounded-sm" style={{ border: '1px solid rgba(250,247,242,0.2)', color: 'rgba(250,247,242,0.8)' }}>
                Book Your Transfer
              </Link>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 max-w-lg text-sm" style={{ color: 'rgba(250,247,242,0.65)' }}>
              <li className="flex items-center gap-2"><Plane className="w-4 h-4 shrink-0" style={{ color: BRIGHT_GOLD }} /> Terminal 1 and Terminal 2 pickups</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0" style={{ color: BRIGHT_GOLD }} /> Hotel or private address in Bergamo</li>
              <li className="flex items-center gap-2"><Luggage className="w-4 h-4 shrink-0" style={{ color: BRIGHT_GOLD }} /> Vehicle sized to your luggage</li>
              <li className="flex items-center gap-2"><Users className="w-4 h-4 shrink-0" style={{ color: BRIGHT_GOLD }} /> Your own car, never shared</li>
            </ul>
          </HeroWithForm>
        </div>
      </section>

      {/* ── QUICK ANSWERS ── */}
      <section className="py-14" style={{ background: CREAM, borderBottom: `1px solid ${LINE}` }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-sm p-6" style={{ border: `1px solid ${LINE}` }}>
            <h2 className="text-lg font-bold mb-3" style={{ ...serif, color: INK }}>How long does a private transfer from Malpensa to Bergamo take?</h2>
            <p className="text-sm leading-relaxed" style={{ color: BODY }}>
              Usually a little over an hour. Malpensa is north-west of Milan and Bergamo is north-east of it, so the drive follows
              the motorways around the city rather than through it. Traffic near Milan is what makes the difference: allow longer on
              weekday mornings and late afternoons, and a few extra minutes if you are staying inside Città Alta.
            </p>
          </div>
          <div className="bg-white rounded-sm p-6" style={{ border: `1px solid ${LINE}` }}>
            <h2 className="text-lg font-bold mb-3" style={{ ...serif, color: INK }}>What is the easiest way to travel from Malpensa to Bergamo?</h2>
            <p className="text-sm leading-relaxed" style={{ color: BODY }}>
              A pre-booked private transfer: one car from the arrivals hall to your Bergamo address, with no change of train or
              bus on the way. It is the least effort if you land late, travel with children or have more than a couple of
              suitcases. Travelling light and in no hurry, public transport is cheaper.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE JOURNEY ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-black mb-6" style={{ ...serif, color: INK }}>Private Transfer from Malpensa Airport to Bergamo</h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: BODY }}>
            <p>
              Malpensa is Milan’s main international airport, but it sits well outside the city — and Bergamo is on the other
              side of Milan, in the same region of Lombardy. That is why so many arrivals heading to Bergamo end up making the
              journey in stages: airport train into Milan, a second train out to Bergamo, then a taxi or the funicular to the hotel.
            </p>
            <p>
              A private transfer replaces those stages with one car. The driver collects you at Terminal 1 or Terminal 2 and
              takes you to the door you give us: a hotel in the lower town, an apartment, a villa outside the centre, or the
              closest drop-off to your hotel in Città Alta.
            </p>
            <p>
              The car is booked for you alone. It suits couples who would rather not drag cases between platforms, families
              who want one vehicle for everyone, business travellers who need a predictable arrival time at the hotel, and small
              groups who would otherwise need two taxis.
            </p>
          </div>
        </div>
      </section>

      {/* ── AIRPORT PICKUP ── */}
      <section className="py-20" style={{ background: CREAM }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
          <div>
            <h2 className="text-3xl font-black mb-6" style={{ ...serif, color: INK }}>Malpensa Airport Pickup</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: BODY }}>
              Malpensa has two terminals some distance apart. Terminal 1 handles most international flights; Terminal 2 is used
              mainly by easyJet. You don’t need to tell us which one — your flight number does.
            </p>
            <p className="text-base leading-relaxed" style={{ color: BODY }}>
              More on the airport itself is on our{' '}
              <Link href="/malpensa-airport-transfer" className="underline" style={{ color: GOLD }}>Malpensa Airport transfer service</Link> page.
            </p>
          </div>
          <ol className="space-y-4">
            {[
              ['You send your flight number', 'Add it to the special requirements box when you request the quote.'],
              ['We follow the flight', 'Your flight is monitored, so the pickup moves with a delay or an early landing.'],
              ['Your driver waits in arrivals', 'Look for a name board with your name in the arrivals hall of your terminal.'],
              ['Time to collect your bags', 'The driver waits up to 60 minutes after the updated landing time at no extra charge — enough for passport control and baggage reclaim.'],
              ['Straight to Bergamo', 'Help with luggage to the car, then a direct drive to your address.'],
            ].map(([title, text], i) => (
              <li key={title} className="flex gap-4 bg-white rounded-sm p-4" style={{ border: `1px solid ${LINE}` }}>
                <span className="w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: GOLD, color: '#fff' }}>{i + 1}</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: INK }}>{title}</p>
                  <p className="text-sm" style={{ color: BODY }}>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── LOWER TOWN vs CITTÀ ALTA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-black mb-6" style={{ ...serif, color: INK }}>From Malpensa to Bergamo City or Città Alta</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: BODY }}>
            Bergamo is really two towns. The lower town (Città Bassa) is the modern centre, with the railway station, most of the
            business hotels and wide streets a car can reach easily. Città Alta, the walled old town on the hill above, is
            connected to it by road and by funicular.
          </p>
          <h3 className="text-xl font-bold mt-10 mb-3" style={{ ...serif, color: INK }}>Malpensa to Bergamo Città Alta</h3>
          <p className="text-base leading-relaxed mb-4" style={{ color: BODY }}>
            Inside the walls the streets are narrow, some are pedestrian, and vehicle access is restricted in parts of the upper
            town. Whether a car can stop at your hotel’s door depends on exactly where it is. That is why “Bergamo” alone isn’t
            enough when you ask for a quote:
          </p>
          <ul className="space-y-2 text-sm mb-6" style={{ color: BODY }}>
            <li className="flex gap-2"><span style={{ color: GOLD }}>✓</span> give the hotel name or full street address, not just “Città Alta”;</li>
            <li className="flex gap-2"><span style={{ color: GOLD }}>✓</span> if your hotel has told you how guests arrive by car, pass that on;</li>
            <li className="flex gap-2"><span style={{ color: GOLD }}>✓</span> we confirm the drop-off point with you before the day of travel.</li>
          </ul>
          <p className="text-base leading-relaxed" style={{ color: BODY }}>
            Staying in the lower town or outside the centre is simpler: the driver takes you to the address you give.
          </p>
        </div>
      </section>

      {/* ── FAMILIES, GROUPS & VEHICLES ── */}
      <section className="py-20" style={{ background: CREAM }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl font-black mb-6" style={{ ...serif, color: INK }}>Malpensa to Bergamo Transfer for Families and Groups</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: BODY }}>
              Choosing the vehicle by passenger count alone is the most common mistake on airport runs. Four adults on a
              two-week holiday, each with a large case and a carry-on, will not fit comfortably in a sedan that seats them
              easily. Tell us how many suitcases you have — and anything bulky, like a pushchair, golf bag or ski bag — and we
              will suggest the right car.
            </p>
            <p className="text-base leading-relaxed" style={{ color: BODY }}>
              Travelling with children? Child seats can be requested when booking; add the number of seats and the children’s
              ages to your request.
            </p>
          </div>

          <h2 id="vehicles" className="text-2xl font-black mb-6" style={{ ...serif, color: INK }}>Vehicles for Malpensa to Bergamo Transfers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { v: sedan, fits: `Up to ${sedan.passengers} passengers`, bags: 'Suits light to normal airport luggage', best: 'Solo travellers, couples, business trips' },
              { v: firstClass, fits: `Up to ${firstClass.passengers} passengers`, bags: 'Suits light to normal airport luggage', best: 'Executive travel, a more comfortable ride' },
              { v: suv, fits: `Up to ${suv.passengers} passengers`, bags: 'More luggage room than a sedan', best: 'Small families, extra bags' },
              { v: van, fits: `Up to ${van.passengers} passengers`, bags: 'Most space for suitcases and bulky items', best: 'Families, groups, lots of luggage' },
            ].map(({ v, fits, bags, best }) => (
              <div key={v.id} className="bg-white rounded-sm p-5" style={{ border: `1px solid ${LINE}` }}>
                <p className="font-bold" style={{ color: INK }}>{v.name}</p>
                <p className="text-xs mb-3" style={{ color: GOLD }}>{v.model}</p>
                <ul className="space-y-1 text-sm" style={{ color: BODY }}>
                  <li>{fits}</li>
                  <li>{bags}</li>
                  <li className="pt-1 text-xs" style={{ color: '#7a7268' }}>Best for: {best}</li>
                </ul>
              </div>
            ))}
          </div>
          <p className="text-sm mt-4" style={{ color: BODY }}>
            Full details are on the <Link href="/fleet" className="underline" style={{ color: GOLD }}>fleet page</Link>. For more than seven
            passengers, say so in your request and we will quote the right combination of vehicles.
          </p>
        </div>
      </section>

      {/* ── PRIVATE vs PUBLIC TRANSPORT ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-black mb-6" style={{ ...serif, color: INK }}>Private Transfer vs Public Transport from Malpensa to Bergamo</h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: BODY }}>
            Both get you there. Public transport usually means the airport train into Milan, a regional train out to Bergamo
            and then a local connection to your hotel; there are also coaches between Malpensa and Bergamo’s airport at Orio al
            Serio. It costs less per person. What it asks for is time, timetables and carrying your luggage through each change.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ color: BODY }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${LINE}` }}>
                  <th className="text-left py-3 pr-4 font-semibold" style={{ color: INK }}><span className="sr-only">Compare</span></th>
                  <th className="text-left py-3 pr-4 font-semibold" style={{ color: INK }}>Private transfer</th>
                  <th className="text-left py-3 font-semibold" style={{ color: INK }}>Public transport</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Route', 'Arrivals hall to your door', 'Usually via Milan, with at least one change'],
                  ['Luggage', 'Loaded once, at the airport', 'Carried on and off at each change'],
                  ['Timing', 'Pre-booked; follows your flight', 'Fixed timetables; fewer services late at night'],
                  ['Città Alta', 'Closest drop-off to your hotel', 'Extra bus, taxi or funicular from the lower town'],
                  ['Cost', 'One price for the whole vehicle', 'Cheaper per person, especially travelling solo'],
                ].map(([row, priv, pub]) => (
                  <tr key={row} style={{ borderBottom: `1px solid ${LINE}` }}>
                    <td className="py-3 pr-4 font-medium" style={{ color: INK }}>{row}</td>
                    <td className="py-3 pr-4">{priv}</td>
                    <td className="py-3">{pub}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm mt-4" style={{ color: BODY }}>
            Coming from the city instead of the airport? See the{' '}
            <Link href="/distance/milan-to-bergamo-distance" className="underline" style={{ color: GOLD }}>Milan to Bergamo distance guide</Link>.
          </p>
        </div>
      </section>

      {/* ── HOTELS & TRAVEL SCENARIOS ── */}
      <section className="py-20" style={{ background: CREAM }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
          <div>
            <h2 className="text-3xl font-black mb-6" style={{ ...serif, color: INK }}>Malpensa to Bergamo Hotels</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: BODY }}>
              Most journeys on this route end at a hotel. To quote accurately and send the right car, we need:
            </p>
            <ul className="space-y-2 text-sm" style={{ color: BODY }}>
              {['hotel name and street address', 'your flight number and arrival date', 'number of passengers', 'number and size of suitcases', 'anything special — child seats, a pushchair, sports equipment'].map((i) => (
                <li key={i} className="flex gap-2"><span style={{ color: GOLD }}>✓</span> {i}</li>
              ))}
            </ul>
            <p className="text-base leading-relaxed mt-4" style={{ color: BODY }}>
              We cover central Bergamo, Città Alta and addresses in the surrounding area. If you are staying outside the city,
              the exact address is enough.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-black mb-6" style={{ ...serif, color: INK }}>Malpensa to Bergamo Transfer for Different Travel Needs</h2>
            <div className="space-y-3">
              {[
                { icon: Plane, title: 'Landing and going straight to Bergamo', text: 'The most common booking: off the plane, through arrivals and into the car. Nothing to arrange on arrival.' },
                { icon: Luggage, title: 'A family with several suitcases', text: 'One vehicle for everyone and every bag, with child seats on request. Usually the V-Class.' },
                { icon: MapPin, title: 'A business trip', text: 'A known pickup and a direct drive, so you can plan a meeting or check-in time around it.' },
                { icon: Moon, title: 'A late arrival', text: 'Fewer trains and buses run late at night. A pre-booked car is waiting whatever time you land, and moves with any delay.' },
                { icon: Users, title: 'A group travelling together', text: 'Several passengers in one suitable vehicle instead of splitting across taxis.' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4 bg-white rounded-sm p-4" style={{ border: `1px solid ${LINE}` }}>
                  <Icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: GOLD }} />
                  <div>
                    <p className="font-semibold text-sm" style={{ color: INK }}>{title}</p>
                    <p className="text-sm" style={{ color: BODY }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICE ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-black mb-6" style={{ ...serif, color: INK }}>How Much Does a Malpensa to Bergamo Transfer Cost?</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: BODY }}>
            We give a fixed quote for each booking rather than a one-size price, because the cost of this journey depends on:
          </p>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm mb-6" style={{ color: BODY }}>
            {['your exact Bergamo destination', 'the vehicle you need', 'number of passengers and suitcases', 'date and time of travel', 'one way or return', 'special requirements such as child seats'].map((i) => (
              <li key={i} className="flex gap-2"><span style={{ color: GOLD }}>✓</span> {i}</li>
            ))}
          </ul>
          <div className="rounded-sm p-5 mb-6" style={{ background: CREAM, border: `1px solid ${LINE}` }}>
            <p className="text-sm font-semibold mb-2" style={{ color: INK }}>What the quote includes</p>
            <p className="text-sm leading-relaxed" style={{ color: BODY }}>
              The vehicle, the driver, motorway tolls and VAT where applicable — the price you accept is the price you pay. It
              does not cover parking the driver has to pay on site, stops you didn’t agree when booking, or waiting beyond 60
              minutes for an airport pickup.
            </p>
          </div>
          <Link href="#quote-form" className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-sm transition-all hover:-translate-y-0.5" style={{ background: BRIGHT_GOLD, color: '#0f0d0a', letterSpacing: '0.04em' }}>
            Request a Fixed Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── HOW TO BOOK ── */}
      <section id="how-to-book" className="py-20 scroll-mt-24" style={{ background: '#0f0d0a' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-black mb-10" style={{ ...serif, color: CREAM }}>How to Book a Malpensa to Bergamo Transfer</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ['Pickup', 'Malpensa is already filled in — just choose the date and your landing time.'],
              ['Destination', 'Your hotel name or full Bergamo address, including Città Alta if that’s where you’re staying.'],
              ['Passengers, luggage, flight', 'Pick the passenger count and vehicle; add your flight number and suitcases in the requirements box.'],
              ['Your quote', 'We reply with a fixed price, normally within two hours.'],
              ['Confirm', 'Accept the quote to confirm the booking. Nothing is paid when you send the request.'],
              ['Meet your driver', 'In the arrivals hall at Terminal 1 or 2, holding a board with your name.'],
            ].map(([title, text], i) => (
              <li key={title} className="rounded-sm p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)' }}>
                <p className="text-xs font-bold mb-2" style={{ color: BRIGHT_GOLD }}>Step {i + 1}</p>
                <p className="font-semibold mb-1" style={{ color: CREAM }}>{title}</p>
                <p className="text-sm" style={{ color: 'rgba(250,247,242,0.6)' }}>{text}</p>
              </li>
            ))}
          </ol>
          <Link href="#quote-form" className="mt-8 inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-sm transition-all hover:-translate-y-0.5" style={{ background: BRIGHT_GOLD, color: '#0f0d0a', letterSpacing: '0.04em' }}>
            Book Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── RETURN ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-black mb-6" style={{ ...serif, color: INK }}>Returning from Bergamo to Malpensa Airport</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: BODY }}>
            The same journey works in reverse: the driver collects you from your hotel or address in Bergamo and takes you to
            the right terminal at Malpensa. Choose <strong>Round Trip</strong> in the form to book both directions at once, or
            request the return separately later.
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: BODY }}>
            When you pick the pickup time, work backwards from your flight: the drive itself, traffic around Milan at that time
            of day, and your airline’s check-in and bag-drop deadlines. Flights leaving the Schengen area also mean passport
            control. If you are unsure, tell us your flight time and we will suggest a pickup.
          </p>
          <Link href="#quote-form" className="inline-flex items-center gap-2 font-medium text-sm px-6 py-3 rounded-sm" style={{ border: `1px solid ${GOLD}`, color: GOLD }}>
            <Repeat className="w-4 h-4" /> Book a Return Transfer
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20" style={{ background: CREAM }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-black mb-8" style={{ ...serif, color: INK }}>Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.question} className="group bg-white rounded-sm px-5 py-4" style={{ border: `1px solid ${LINE}` }}>
                <summary className="cursor-pointer list-none flex justify-between gap-4" style={{ color: INK }}>
                  <h3 className="text-sm font-semibold">{f.question}</h3>
                  <span className="shrink-0 transition-transform group-open:rotate-45" style={{ color: GOLD }} aria-hidden="true">+</span>
                </summary>
                <p className="text-sm leading-relaxed mt-3" style={{ color: BODY }}>
                  {f.answer}
                  {f.question.startsWith('What happens if I need to cancel') ? (
                    <> See the <Link href="/refund-policy" className="underline" style={{ color: GOLD }}>refund policy</Link>.</>
                  ) : null}
                  {f.question.startsWith('Do you also cover') ? (
                    <> <Link href="/bergamo-airport-transfer" className="underline" style={{ color: GOLD }}>Bergamo Airport (BGY) transfers</Link>.</>
                  ) : null}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── ONWARD / RELATED ── */}
      <section className="py-16 bg-white" style={{ borderTop: `1px solid ${LINE}` }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <h2 className="text-xl font-black mb-5" style={{ ...serif, color: INK }}>Other journeys from Malpensa</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {[
              ['/malpensa-to-milan', 'Malpensa to central Milan'],
              ['/malpensa-to-lake-como', 'transfer options to Lake Como'],
              ['/malpensa-to-bellagio', 'Malpensa to Bellagio'],
              ['/malpensa-to-turin', 'Malpensa to Turin'],
              ['/milan-chauffeur-service', 'a private chauffeur in Milan'],
              ['/bergamo-airport-transfer', 'our Bergamo Airport (BGY) service'],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="px-4 py-2 rounded-sm hover:bg-amber-50 transition-colors" style={{ border: `1px solid ${LINE}`, color: INK }}>
                {label}
              </Link>
            ))}
          </div>
          <p className="text-sm mt-6" style={{ color: BODY }}>
            Questions before booking? Email{' '}
            <a href={`mailto:${siteConfig.email}`} className="underline" style={{ color: GOLD }}>{siteConfig.email}</a> or use our{' '}
            <Link href="/contact" className="underline" style={{ color: GOLD }}>contact page</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
