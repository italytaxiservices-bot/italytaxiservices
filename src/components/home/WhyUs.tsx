const features = [
  {
    title: 'Coach-flat Rates',
    body: 'Every price is locked before you travel. No meter, no surge, no traffic surcharges. What you\'re quoted is what you pay — guaranteed.',
    icon: '€',
  },
  {
    title: 'Flight Tracking',
    body: 'We monitor your flight live. If it delays, your driver adapts automatically. No calls, no rescheduling, no extra charge — ever.',
    icon: '✈',
  },
  {
    title: 'Cross-Border Network',
    body: 'From Italy into Switzerland, France, Austria, Slovenia and Croatia. Licensed NCC operators handle cross-border transfers daily.',
    icon: '🗺',
  },
  {
    title: 'Professional Drivers',
    body: 'Every chauffeur holds an official NCC licence, speaks English, and arrives before you do — name board in hand.',
    icon: '✓',
  },
]

export default function WhyUs() {
  return (
    <section style={{ background: '#FAF7F2', borderTop: '1px solid #E8E2D9', padding: '96px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid lg:grid-cols-[1fr_1fr] gap-20 items-center">

          {/* LEFT — blank image placeholder */}
          <div>
            {/* Placeholder */}
            <div style={{ background: '#EDE8E0', borderRadius: '4px', height: '400px', width: '100%', marginBottom: '24px' }} />
          </div>

          {/* RIGHT — content */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-medium mb-5" style={{ color: '#C9A84C' }}>
              Why Choose Us
            </p>
            <h2
              className="font-black leading-[1.05] mb-4"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: '#1a1410' }}
            >
              Premium reliability on<br />
              <span style={{ fontStyle: 'italic', color: '#6b5c3e' }}>every single mile.</span>
            </h2>
            <p className="text-sm leading-relaxed mb-10" style={{ color: '#7a7268', maxWidth: '420px' }}>
              From the moment you book to the moment you arrive, our service is built around one thing: making your transfer seamless.
            </p>

            <div className="space-y-0">
              {features.map(({ title, body, icon }, i) => (
                <div
                  key={title}
                  className="flex gap-5 py-6"
                  style={i < features.length - 1 ? { borderBottom: '1px solid #E8E2D9' } : {}}
                >
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 text-sm font-bold"
                    style={{ background: '#F0EBE1', color: '#8B7340', border: '1px solid #E0D8CC' }}
                  >
                    {icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1.5" style={{ color: '#1a1410', fontFamily: 'var(--font-serif), Georgia, serif' }}>
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#7a7268' }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
