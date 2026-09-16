import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    num: '01',
    title: 'Submit Your Details',
    body: 'Fill in your route, date, and vehicle preference via our quote form or WhatsApp. Takes under two minutes.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Receive Fixed Quote',
    body: 'We confirm your exact price before any commitment. No meters, no surprises. Price locked — it never changes.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Driver Finds You',
    body: 'Your chauffeur holds a name board in arrivals. We track your flight live — delays handled automatically, no rescheduling needed.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Enjoy the Journey',
    body: 'Sit back in a clean, premium vehicle. Door-to-door, exactly as agreed. No detours, no stress.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.25em] uppercase font-medium mb-4" style={{ color: '#C9A84C' }}>
            — Simple Process
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-[1.1] mb-4">
            Booked in{' '}
            <span className="italic font-bold" style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#A07830' }}>
              Four Steps
            </span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-md mx-auto">
            From first enquiry to confirmed transfer — typically under five minutes.
          </p>
        </div>

        {/* Steps — connected timeline on desktop */}
        <div className="relative">

          {/* Connecting line */}
          <div
            className="hidden lg:block absolute top-14 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.25) 20%, rgba(201,168,76,0.4) 50%, rgba(201,168,76,0.25) 80%, transparent 95%)', zIndex: 0 }}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map(({ num, title, body, icon }) => (
              <div key={num} className="group flex flex-col items-center text-center">

                {/* Icon circle */}
                <div
                  className="w-28 h-28 rounded-full flex flex-col items-center justify-center mb-8 transition-all duration-300 group-hover:scale-105 relative"
                  style={{ background: '#080808', border: '1px solid rgba(201,168,76,0.2)', boxShadow: '0 0 0 8px white' }}
                >
                  {/* Number */}
                  <span
                    className="text-[10px] font-black uppercase tracking-widest mb-1"
                    style={{ color: 'rgba(201,168,76,0.5)' }}
                  >
                    {num}
                  </span>
                  {/* Icon */}
                  <div style={{ color: '#C9A84C' }}>{icon}</div>
                </div>

                {/* Content */}
                <h3 className="font-black text-gray-900 text-base mb-3 group-hover:text-amber-800 transition-colors" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
                  {title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link href="/#quote-form" className="btn-primary">
            Start Your Booking
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-gray-400 mt-4">Free quote · Fixed price · No commitment</p>
        </div>
      </div>
    </section>
  )
}
