import Link from 'next/link'
import Image from 'next/image'
import { Mail } from 'lucide-react'

const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'info@italytaxiservices.com'

const cols = {
  Services: [
    { name: 'Airport Transfers',    href: '/airport-transfers' },
    { name: 'Chauffeur Service',    href: '/chauffeur-service-italy' },
    { name: 'NCC Italy',            href: '/ncc-italy' },
    { name: 'Corporate Travel',     href: '/corporate-chauffeur-italy' },
    { name: 'Cruise Transfers',     href: '/cruise-transfers' },
    { name: 'Wedding Cars',         href: '/wedding-chauffeur-italy' },
    { name: 'Our Fleet',            href: '/fleet' },
  ],
  Cities: [
    { name: 'Milan',    href: '/milan-chauffeur-service' },
    { name: 'Rome',     href: '/rome-chauffeur-service' },
    { name: 'Venice',   href: '/venice-chauffeur-service' },
    { name: 'Florence', href: '/florence-chauffeur-service' },
    { name: 'Naples',   href: '/naples-chauffeur-service' },
    { name: 'Bologna',  href: '/bologna-chauffeur-service' },
  ],
  Airports: [
    { name: 'Malpensa (MXP)',    href: '/malpensa-airport-transfer' },
    { name: 'Fiumicino (FCO)',   href: '/fiumicino-airport-transfer' },
    { name: 'Marco Polo (VCE)', href: '/marco-polo-airport-transfer' },
    { name: 'Linate (LIN)',      href: '/linate-airport-transfer' },
    { name: 'Ciampino (CIA)',    href: '/ciampino-airport-transfer' },
    { name: 'Florence (FLR)',    href: '/florence-airport-transfer' },
  ],
  Routes: [
    { name: 'Malpensa → Milan',          href: '/malpensa-to-milan' },
    { name: 'Malpensa → Lake Como',      href: '/malpensa-to-lake-como' },
    { name: 'Fiumicino → Rome',          href: '/fiumicino-to-rome' },
    { name: 'Rome → Amalfi Coast',       href: '/rome-to-amalfi-coast' },
    { name: 'Milan → Venice',            href: '/milan-to-venice' },
    { name: 'Florence → Pisa',           href: '/florence-to-pisa' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative grain" style={{ background: '#060606' }}>

      {/* Top gold separator */}
      <div className="h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.35) 35%, rgba(224,192,112,0.55) 55%, rgba(201,168,76,0.35) 75%, transparent 95%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-12">

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-16 mb-16">

          {/* Brand column */}
          <div>
            <Link href="/" className="block mb-8">
              <Image
                src="/logo.webp"
                alt="Italy Taxi Services"
                width={64}
                height={64}
                className="h-14 w-14 mb-3"
              />
              <p
                className="font-black text-white text-2xl tracking-tight leading-none mb-2 italic"
                style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
              >
                Italy Taxi Services
              </p>
              <span className="section-label" style={{ fontSize: '0.6rem', letterSpacing: '0.25em' }}>
                Private NCC Transfers
              </span>
            </Link>

            <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-serif), Georgia, serif', fontStyle: 'italic' }}>
              Licensed NCC private transfer service across Italy. Fixed prices, professional chauffeurs, door-to-door.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-3 text-xs transition-colors"
                style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}
              >
                <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.12)' }}>
                  <Mail className="w-3.5 h-3.5" style={{ color: '#C9A84C' }} />
                </div>
                <span className="group-hover:text-amber-400 transition-colors text-white/80">{EMAIL}</span>
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
            {Object.entries(cols).map(([cat, items]) => (
              <div key={cat}>
                <p className="section-label mb-6" style={{ fontSize: '0.6rem', letterSpacing: '0.22em' }}>{cat}</p>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-xs transition-colors hover:text-amber-400"
                        style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '0.02em' }}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
            © {new Date().getFullYear()} Italy Taxi Services. All rights reserved. NCC licensed transfer intermediary.
          </p>
          <div className="flex items-center gap-6">
            {[
              { name: 'About',          href: '/about' },
              { name: 'Contact',        href: '/contact' },
              { name: 'Privacy Policy', href: '/privacy-policy' },
              { name: 'Terms',          href: '/terms' },
              { name: 'About NCC',      href: '/ncc-italy' },
            ].map(({ name, href }) => (
              <Link key={name} href={href} className="text-[11px] transition-colors hover:text-amber-400" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
