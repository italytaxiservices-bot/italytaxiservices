import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const steps = [
  { num: '01', title: 'Submit Details', body: 'Fill in your route, date, and vehicle preference. Takes under two minutes.' },
  { num: '02', title: 'Receive Fixed Quote', body: 'We confirm your exact price before any commitment. No meters, no surprises.' },
  { num: '03', title: 'Driver Finds You', body: 'Name board in arrivals. We track your flight so delays are handled automatically.' },
  { num: '04', title: 'Enjoy the Journey', body: 'Sit back in a premium, clean vehicle. Door to door, exactly as agreed.' },
]

export default function HowItWorks() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-[1fr_1fr] gap-20 items-center">

          {/* Left — heading + CTA */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase font-medium mb-5" style={{ color: '#C9A84C' }}>
              — Simple Process
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-[1.1] mb-6">
              Booked in<br />
              <span
                className="italic font-bold"
                style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#A07830' }}
              >
                Four Steps
              </span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-sm">
              From first enquiry to confirmed transfer — typically under five minutes via WhatsApp or our quote form.
            </p>
            <Link
              href="/#quote-form"
              className="btn-gold-shimmer inline-flex items-center gap-2 font-bold px-8 py-4 rounded-lg text-sm tracking-wide"
            >
              Start Your Booking
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right — numbered steps */}
          <div className="space-y-0">
            {steps.map(({ num, title, body }, i) => (
              <div
                key={num}
                className="group flex gap-6 py-7"
                style={i < steps.length - 1 ? { borderBottom: '1px solid #f3f4f6' } : {}}
              >
                {/* Number */}
                <div className="shrink-0 pt-0.5">
                  <span
                    className="font-black text-3xl leading-none"
                    style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: 'rgba(201,168,76,0.3)' }}
                  >
                    {num}
                  </span>
                </div>
                {/* Content */}
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-amber-800 transition-colors">{title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{body}</p>
                </div>
                {/* Gold dot on active step */}
                <div className="shrink-0 pt-2 ml-auto">
                  <div className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: '#C9A84C' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
