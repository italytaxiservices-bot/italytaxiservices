const features = [
  {
    num: '01',
    title: 'Licensed NCC Operators',
    body: 'Every partner holds an official Italian NCC (Noleggio con Conducente) authorisation — the legal standard for private hire. Fully insured and legally compliant on every single transfer.',
  },
  {
    num: '02',
    title: 'Fixed Prices. No Meters.',
    body: 'Your price is locked the moment you confirm. No surge pricing, no traffic penalties, no meter running in jams. What you\'re quoted is exactly what you pay — guaranteed.',
  },
  {
    num: '03',
    title: 'Real-Time Flight Tracking',
    body: 'We monitor your flight live from departure. If it delays, your driver adapts — no calls, no rescheduling, no extra charge. Your driver is always there when you land.',
  },
  {
    num: '04',
    title: 'Name Board at Arrivals',
    body: 'Step out of customs and your chauffeur is waiting with your name. No hunting for taxis, no negotiating prices at the kerb. We collect you — you don\'t find us.',
  },
  {
    num: '05',
    title: 'English-Speaking Drivers',
    body: 'Clear communication, zero language barrier. Every chauffeur speaks fluent English, knows Italy\'s roads intimately, and can advise on your destination.',
  },
  {
    num: '06',
    title: '24 / 7 — Every Single Day',
    body: 'Midnight flight? Christmas morning? Bank holiday? We operate every hour of every day. Your travel schedule sets the time — not our office hours.',
  },
]

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden grain" style={{ background: '#080808' }}>
      <div className="h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.3) 40%, rgba(224,192,112,0.5) 60%, rgba(201,168,76,0.3) 80%, transparent 95%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="gold-line" />
              <span className="section-label">Our Commitment to You</span>
            </div>
            <h2 className="text-white font-black leading-[0.95]" style={{ fontSize: 'clamp(2.6rem, 5vw, 4.2rem)' }}>
              Six Promises.<br />
              <span className="text-gold-gradient italic font-bold" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
                Every Transfer.
              </span>
            </h2>
          </div>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-serif), Georgia, serif', fontStyle: 'italic', maxWidth: '420px' }}>
            These aren&apos;t marketing promises — they are operational standards every driver is contractually held to on every booking, no exceptions.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ num, title, body }, i) => (
            <div
              key={num}
              className="group p-10 relative transition-colors duration-300"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                borderRight: i % 3 !== 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to bottom, transparent, #C9A84C, transparent)' }} />
              <span
                className="block font-black mb-5 leading-none"
                style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '3rem', color: 'rgba(201,168,76,0.45)' }}
              >
                {num}
              </span>
              <h3 className="font-bold text-sm mb-3 tracking-wide group-hover:text-amber-300 transition-colors" style={{ color: '#ffffff', letterSpacing: '0.03em' }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{body}</p>
            </div>
          ))}
        </div>

        {/* Bottom stats — real numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 mt-20 pt-10" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          {[
            { v: '€65',    l: 'Transfers From' },
            { v: '49+',    l: 'City Routes' },
            { v: '< 2 hr', l: 'Quote Reply Time' },
            { v: '100%',   l: 'Fixed Price Guarantee' },
          ].map(({ v, l }, i) => (
            <div key={l} className="text-center py-8" style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <p className="font-black text-3xl mb-1" style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#C9A84C' }}>{v}</p>
              <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.6)' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.2) 50%, transparent 95%)' }} />
    </section>
  )
}
