const features = [
  { num: '01', title: 'Licensed NCC Operators',   body: 'Every partner holds NCC authorisation — Italy\'s licensed private hire standard. Legally compliant and fully insured on every transfer.' },
  { num: '02', title: 'Fixed Prices. No Meters.', body: 'Your price is locked before you travel. No surge, no traffic penalties, no meter running. What you\'re quoted is what you pay.' },
  { num: '03', title: 'Real-Time Flight Tracking', body: 'We monitor your flight live. If it delays, your driver adapts. No rescheduling needed, no extra charge — ever.' },
  { num: '04', title: 'Name Board at Arrivals',   body: 'Your chauffeur is in the arrivals hall holding your name. Step off the plane and step straight into comfort.' },
  { num: '05', title: 'English-Speaking Drivers', body: 'Clear communication, no language barrier. Every chauffeur speaks fluent English and knows Italy\'s roads intimately.' },
  { num: '06', title: '24 / 7 — Every Day',       body: 'Midnight landing? Christmas morning? We operate every hour of every day. Your itinerary sets the schedule — not ours.' },
]

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden grain" style={{ background: '#080808' }}>

      {/* Top gold rule */}
      <div className="h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.3) 40%, rgba(224,192,112,0.5) 60%, rgba(201,168,76,0.3) 80%, transparent 95%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-end mb-24">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="gold-line" />
              <span className="section-label">Our Standards</span>
            </div>
            <h2 className="text-white font-black leading-[0.95]" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}>
              We Don&apos;t<br />
              <span className="text-gold-gradient italic font-bold" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
                Cut Corners.
              </span>
            </h2>
          </div>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-serif), Georgia, serif', fontStyle: 'italic', maxWidth: '400px' }}>
            Six promises we make to every passenger — operational standards our drivers are contractually held to, not marketing language.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ num, title, body }, i) => (
            <div
              key={num}
              className="group p-10 relative transition-colors duration-300"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.05)',
                borderRight: i % 3 !== 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              {/* Hover gold left border */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: 'linear-gradient(to bottom, transparent, #C9A84C, transparent)' }} />

              <span
                className="block font-black mb-6 leading-none"
                style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '3.5rem', color: 'rgba(201,168,76,0.25)', transition: 'color 0.3s' }}
              >
                {num}
              </span>
              <h3 className="font-bold text-sm mb-3 tracking-wide transition-colors duration-300 group-hover:text-amber-300" style={{ color: '#ffffff', letterSpacing: '0.03em' }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>{body}</p>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 mt-24 pt-10" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          {[
            { v: '10,000+', l: 'Transfers Completed' },
            { v: '4.9 / 5', l: 'Average Rating' },
            { v: '50+',     l: 'NCC Partners' },
            { v: '8 yrs',   l: 'In Operation' },
          ].map(({ v, l }, i) => (
            <div key={l} className="text-center py-8" style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <p className="font-black text-3xl mb-1" style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#C9A84C' }}>{v}</p>
              <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.6)' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gold rule */}
      <div className="h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.2) 50%, transparent 95%)' }} />
    </section>
  )
}
