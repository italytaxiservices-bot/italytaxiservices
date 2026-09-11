const featured = {
  name: 'James R.', location: 'London, UK', route: 'Malpensa → Lake Como',
  text: 'Driver was in arrivals the moment we cleared customs — name board, professional, impeccably dressed. The car was spotless. Price was exactly as quoted. The drive through the mountains was one of the most serene hours of our entire trip. I hadn\'t expected a transfer service to feel this effortless.',
}

const others = [
  { name: 'Sarah M.', location: 'New York', route: 'Rome → Amalfi', text: 'Flight delayed two hours. Driver waited, no fuss, no extra charge. Completely stress-free after a nine-hour flight.' },
  { name: 'Marco P.', location: 'Zurich', route: 'Corporate — Milan', text: 'Three back-to-back trips in one week. Identical standard every time. The booking process alone is worth switching for.' },
  { name: 'Elena K.', location: 'Amsterdam', route: 'Fiumicino → Rome', text: 'Family of five with six bags. V-Class with room to spare. After a long-haul flight, that kind of ease is priceless.' },
  { name: 'David T.', location: 'Sydney', route: 'Cruise — Civitavecchia', text: 'Knew exactly which terminal, arrived early. The whole transfer was invisible — exactly what you need before a voyage.' },
]

export default function Reviews() {
  return (
    <section className="py-32" style={{ background: '#F5F0E8' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-line" />
              <span className="section-label">Verified Travellers</span>
            </div>
            <h2 className="font-black leading-[0.95]" style={{ fontSize: 'clamp(2.6rem, 5vw, 4.2rem)', color: '#080808' }}>
              In Their<br />
              <span
                className="italic font-bold text-gold-gradient"
                style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
              >
                Own Words
              </span>
            </h2>
          </div>
          <div className="shrink-0">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5" fill="#C9A84C" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <p className="text-sm font-bold" style={{ color: '#080808' }}>4.9 out of 5</p>
            <p className="text-xs" style={{ color: 'rgba(0,0,0,0.4)' }}>Based on 500+ verified reviews</p>
          </div>
        </div>

        {/* Featured quote */}
        <div className="relative rounded-sm overflow-hidden mb-5 grain" style={{ background: '#080808' }}>
          {/* Decorative serif quote mark */}
          <div
            className="absolute right-10 top-6 font-black select-none pointer-events-none"
            style={{ fontSize: '14rem', lineHeight: 1, color: 'rgba(201,168,76,0.05)', fontFamily: 'Georgia, serif' }}
          >
            &ldquo;
          </div>

          <div className="relative z-10 p-12 sm:p-16">
            <div className="h-[1px] w-12 mb-10" style={{ background: '#C9A84C' }} />

            <blockquote
              className="text-xl sm:text-2xl font-medium leading-relaxed mb-10 max-w-3xl italic"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: 'rgba(255,255,255,0.85)' }}
            >
              &ldquo;{featured.text}&rdquo;
            </blockquote>

            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-base font-black"
                  style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.2)' }}
                >
                  {featured.name[0]}
                </div>
                <div>
                  <p className="font-bold text-sm text-white">{featured.name}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{featured.location} &middot; {featured.route}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="#C9A84C" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Secondary reviews */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {others.map((r) => (
            <div
              key={r.name}
              className="p-7 rounded-sm"
              style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.1)' }}
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3" fill="#C9A84C" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p
                className="text-sm leading-relaxed mb-6 italic"
                style={{ color: 'rgba(0,0,0,0.6)', fontFamily: 'var(--font-serif), Georgia, serif' }}
              >
                &ldquo;{r.text}&rdquo;
              </p>
              <div>
                <p className="text-xs font-bold" style={{ color: '#111' }}>{r.name}</p>
                <p className="text-[11px]" style={{ color: 'rgba(0,0,0,0.38)' }}>{r.location} &middot; {r.route}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
