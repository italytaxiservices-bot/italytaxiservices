import Link from 'next/link'
import Image from 'next/image'
import { Mail } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'

const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'info@italytaxiservices.com'

const socials = [
  {
    name: 'Instagram',
    href: siteConfig.socials.instagram,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: siteConfig.socials.youtube,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '393148932631'}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
]

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
    { name: 'All Routes',                href: '/routes' },
  ],
  Destinations: [
    { name: 'Lake Como',       href: '/destinations/lake-como' },
    { name: 'Tuscany',         href: '/destinations/tuscany' },
    { name: 'Amalfi Coast',    href: '/destinations/amalfi-coast' },
    { name: 'Sicily',          href: '/destinations/sicily' },
    { name: 'Cinque Terre',    href: '/destinations/cinque-terre' },
    { name: 'All Destinations', href: '/destinations' },
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

              {/* Social icons */}
              <div className="flex items-center gap-3 pt-2">
                {socials.map(({ name, href, icon }) => (
                  href && href !== '#' ? (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="w-9 h-9 rounded-sm flex items-center justify-center transition-all hover:-translate-y-0.5 hover:text-gold social-icon"
                      style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.12)', color: 'rgba(255,255,255,0.5)' }}
                    >
                      {icon}
                    </a>
                  ) : (
                    <div
                      key={name}
                      title={`${name} coming soon`}
                      className="w-9 h-9 rounded-sm flex items-center justify-center cursor-not-allowed"
                      style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.08)', color: 'rgba(255,255,255,0.2)' }}
                    >
                      {icon}
                    </div>
                  )
                ))}
              </div>
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
              { name: 'FAQ',            href: '/faq' },
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
