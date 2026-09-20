import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const services = [
  { title: 'Airport Transfers',       href: '/airport-transfers',            img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80', desc: 'Fixed-price NCC transfers from every major Italian airport. Meet & greet, flight monitoring, door-to-door.' },
  { title: 'City-to-City Transfers',  href: '/city-to-city-transfers',       img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80', desc: 'Rome to Florence, Milan to Venice, Naples to Amalfi. Direct, comfortable, fixed price.' },
  { title: 'Cross-Border Transfers',  href: '/international-border-crossing-transfers', img: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=600&q=80', desc: 'Italy to Switzerland, France, Austria, Slovenia. Licensed cross-border NCC service.' },
  { title: 'Hourly & Chauffeur Hire', href: '/hourly-chauffeur-italy',       img: 'https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?auto=format&fit=crop&w=600&q=80', desc: 'Book a professional chauffeur by the hour for meetings, sightseeing, or flexible itineraries.' },
  { title: 'Events & Weddings',       href: '/wedding-chauffeur-italy',      img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80', desc: 'Luxury transfer solutions for weddings, events, and special occasions across Italy.' },
  { title: 'Sea & Harbour Transfers', href: '/cruise-transfers',             img: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=600&q=80', desc: 'Cruise port transfers from Civitavecchia, Venice, Naples, Genoa and beyond.' },
]

export default function AirportTransfers() {
  return (
    <section style={{ background: '#FAF7F2', padding: '96px 0' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.25em] font-medium mb-4" style={{ color: '#C9A84C' }}>
            What We Offer
          </p>
          <h2
            className="font-black leading-[1.05]"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#1a1410' }}
          >
            One service, the whole country<br />
            <span style={{ fontStyle: 'italic', color: '#6b5c3e' }}>— and beyond.</span>
          </h2>
        </div>

        {/* Service cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(({ title, href, img, desc }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white flex flex-col overflow-hidden transition-all hover:shadow-lg"
              style={{ border: '1px solid #E8E2D9', borderRadius: '4px' }}
            >
              {/* Real image */}
              <div className="relative overflow-hidden" style={{ height: '160px' }}>
                <Image
                  src={img}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3
                  className="font-bold text-base mb-2 group-hover:text-amber-800 transition-colors"
                  style={{ color: '#1a1410', fontFamily: 'var(--font-serif), Georgia, serif' }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: '#7a7268' }}>
                  {desc}
                </p>
                <span className="flex items-center gap-1.5 text-xs font-semibold group-hover:gap-3 transition-all" style={{ color: '#8B7340' }}>
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
