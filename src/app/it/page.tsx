import type { Metadata } from 'next'
import Link from 'next/link'
import { buildWhatsAppUrl } from '@/lib/utils'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+390000000000'

export const metadata: Metadata = {
  title: 'Servizio Chauffeur Privato & Transfer NCC in Italia | Italy Chauffeur',
  description: 'Servizio chauffeur privato NCC in tutta Italia. Transfer aeroporto Milano Malpensa, Roma Fiumicino, Venezia, Firenze. Prezzi fissi, meet & greet incluso. Prenota ora.',
  alternates: { canonical: '/it', languages: { en: '/', it: '/it' } },
}

const airports = [
  { code: 'MXP', name: 'Milano Malpensa', href: '/it/transfer-aeroporto-malpensa', price: '€85' },
  { code: 'FCO', name: 'Roma Fiumicino',  href: '/it/transfer-aeroporto-fiumicino', price: '€65' },
  { code: 'VCE', name: 'Venezia Marco Polo', href: '/it/transfer-aeroporto-venezia', price: '€55' },
  { code: 'LIN', name: 'Milano Linate',   href: '/linate-airport-transfer', price: '€65' },
  { code: 'CIA', name: 'Roma Ciampino',   href: '/ciampino-airport-transfer', price: '€55' },
  { code: 'FLR', name: 'Firenze',         href: '/florence-airport-transfer', price: '€55' },
]

const routes = [
  { from: 'Malpensa', to: 'Milano',             href: '/it/malpensa-milano',            time: '45–55 min', price: '€85' },
  { from: 'Malpensa', to: 'Lago di Como',       href: '/it/malpensa-lago-como',         time: '60–80 min', price: '€130' },
  { from: 'Fiumicino', to: 'Roma',              href: '/it/fiumicino-roma',             time: '35–50 min', price: '€65' },
  { from: 'Fiumicino', to: 'Civitavecchia',     href: '/it/fiumicino-civitavecchia',    time: '60–75 min', price: '€110' },
  { from: 'Roma', to: 'Costiera Amalfitana',    href: '/it/roma-costiera-amalfitana',   time: '3.5–4.5 h', price: '€380' },
  { from: 'Firenze', to: 'Pisa',                href: '/it/firenze-pisa',               time: '50–65 min', price: '€95' },
]

const features = [
  { num: '01', title: 'Operatori NCC Autorizzati', body: 'Tutti i partner sono in possesso di regolare licenza NCC ministeriale. Servizio legale, assicurato e professionale su ogni transfer.' },
  { num: '02', title: 'Prezzi Fissi — Nessun Tassametro', body: 'Il prezzo viene concordato prima della partenza. Nessun sovrapprezzo, nessuna sorpresa. Paghi esattamente quanto preventivato.' },
  { num: '03', title: 'Monitoraggio Volo in Tempo Reale', body: 'Monitoriamo il tuo volo live. In caso di ritardo, l\'autista si adatta automaticamente — senza costi aggiuntivi.' },
  { num: '04', title: 'Meet & Greet in Arrivo', body: 'Il tuo chauffeur ti aspetta in sala arrivi con cartello nominativo. Nessuna ricerca, nessuna confusione.' },
  { num: '05', title: 'Autisti che Parlano Italiano e Inglese', body: 'Comunicazione chiara e professionale. Ogni autista conosce strade, ZTL e aeroporti italiani nei minimi dettagli.' },
  { num: '06', title: '24/7 — Ogni Giorno dell\'Anno', body: 'Atterraggi notturni, giornate festive, prenotazioni dell\'ultimo minuto. Operiamo sempre, secondo il tuo orario.' },
]

const faqs = [
  { q: 'Cos\'è un servizio NCC?', a: 'NCC (Noleggio con Conducente) è il servizio di trasporto privato autorizzato in Italia. Richiede prenotazione anticipata e offre tariffe fisse. I nostri partner hanno tutti licenza NCC in regola.' },
  { q: 'Il prezzo è fisso o a tassametro?', a: 'Il prezzo è sempre fisso e concordato prima del viaggio. Nessuna sorpresa: il preventivo include autista, veicolo, pedaggi e IVA.' },
  { q: 'Il volo è monitorato in caso di ritardo?', a: 'Sì. Per tutti i transfer aeroportuali monitoriamo il volo in tempo reale. In caso di ritardo l\'autista aspetta senza costi aggiuntivi.' },
  { q: 'Quali veicoli sono disponibili?', a: 'Offriamo Mercedes E-Class (berlina business), S-Class (prima classe), V-Class (van premium fino a 7 persone) e SUV di lusso. Tutti i veicoli hanno massimo 4 anni di anzianità.' },
]

export default function ItHomepage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden grain" style={{ background: '#080808' }}>
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center 40%',
            }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.65) 55%, rgba(8,8,8,0.4) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.8) 0%, transparent 55%)' }} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 5%, #C9A84C 40%, #E0C070 60%, #C9A84C 80%, transparent 95%)' }} />

        <div className="relative z-10 flex-1 flex items-center w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-8">
          <div className="w-full grid lg:grid-cols-[1fr_420px] gap-16 items-center">

            {/* Left */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="gold-line" />
                <span className="section-label">Italia · Operatori NCC Autorizzati</span>
              </div>

              <h1 className="mb-8 leading-[0.95] tracking-tight">
                <span className="block text-white font-black" style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}>Il Migliore</span>
                <span
                  className="block italic font-bold text-gold-gradient"
                  style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5rem)', fontFamily: 'var(--font-serif), Georgia, serif', lineHeight: 1.05 }}
                >
                  Servizio Chauffeur
                </span>
                <span className="block text-white font-black" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}>Privato in Italia</span>
              </h1>

              <div className="flex items-center gap-6 mb-8">
                <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, #C9A84C, transparent)' }} />
                <p className="text-sm leading-relaxed max-w-sm italic" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-serif), Georgia, serif' }}>
                  Prezzi fissi. Autisti autorizzati. Meet &amp; greet a ogni aeroporto italiano.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/it#preventivo" className="btn-primary">
                  Richiedi Preventivo
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <a
                  href={buildWhatsAppUrl(WHATSAPP, 'Buongiorno, vorrei richiedere un preventivo per un transfer privato in Italia.')}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm font-semibold px-7 py-4 rounded-sm transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.75)' }}
                >
                  <svg className="w-4 h-4" fill="#25D366" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {['NCC Autorizzato', 'Prezzi Fissi', 'Monitoraggio Volo', 'Meet & Greet'].map((t) => (
                  <div key={t} className="flex items-center gap-2.5">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — contact card */}
            <div
              id="preventivo"
              className="rounded-sm overflow-hidden"
              style={{ background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(201,168,76,0.15)', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}
            >
              <div className="px-7 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(201,168,76,0.05)' }}>
                <p className="text-white font-bold text-sm">Richiedi un Preventivo Gratuito</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Risposta via WhatsApp in pochi minuti · Nessun impegno</p>
                <div className="mt-4 h-[2px] rounded-full" style={{ background: 'linear-gradient(90deg, #9A7A30, #C9A84C, #E0C070)' }} />
              </div>
              <div className="px-7 py-6 space-y-4">
                <a
                  href={buildWhatsAppUrl(WHATSAPP, 'Buongiorno, vorrei richiedere un preventivo per un transfer privato in Italia.')}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-sm font-bold text-sm"
                  style={{ background: '#25D366', color: '#fff' }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Scrivici su WhatsApp
                </a>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {[
                    { label: 'Milano', href: '/it/servizio-chauffeur-milano' },
                    { label: 'Roma', href: '/it/servizio-chauffeur-roma' },
                    { label: 'Venezia', href: '/it/servizio-chauffeur-venezia' },
                    { label: 'Firenze', href: '/it/servizio-chauffeur-firenze' },
                  ].map(({ label, href }) => (
                    <Link key={label} href={href}
                      className="py-3 text-center text-xs font-semibold rounded-sm transition-all"
                      style={{ border: '1px solid rgba(201,168,76,0.15)', color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.03)' }}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
                <p className="text-center text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  Nessuna commissione · Prezzo fisso garantito
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 glass-dark">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {[['10.000+','Transfer'], ['4,9 / 5','Valutazione'], ['30+','Aeroporti'], ['24/7','Disponibile']].map(([v, l], i) => (
                <div key={l} className="py-5 px-6 text-center" style={i < 3 ? { borderRight: '1px solid rgba(201,168,76,0.1)' } : {}}>
                  <p className="font-black text-xl mb-0.5" style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#C9A84C' }}>{v}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.35)' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AEROPORTI ── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="gold-line" />
            <span className="section-label">Transfer Aeroporto</span>
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-12 leading-tight">
            Transfer Privato da Ogni<br />
            <span className="italic font-bold text-gold-gradient" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>Aeroporto Italiano</span>
          </h2>
          <div className="grid lg:grid-cols-3 gap-4 mb-4">
            {airports.slice(0, 3).map((a) => (
              <Link key={a.code} href={a.href}
                className="group relative rounded-sm overflow-hidden flex flex-col justify-between min-h-[200px] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: '#0f0f0f', border: '1px solid rgba(201,168,76,0.12)' }}
              >
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-sm font-black text-sm mb-5"
                  style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C' }}
                >
                  {a.code}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">{a.name}</h3>
                  <p className="text-2xl font-black text-gold-gradient" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>da {a.price}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] transition-all duration-500" style={{ background: 'linear-gradient(90deg, #A07830, #C9A84C)' }} />
              </Link>
            ))}
          </div>
          <div className="rounded-sm overflow-hidden" style={{ border: '1px solid #f3f4f6' }}>
            {airports.slice(3).map((a, i) => (
              <Link key={a.code} href={a.href}
                className="group flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors"
                style={i < airports.slice(3).length - 1 ? { borderBottom: '1px solid #f3f4f6' } : {}}
              >
                <div className="flex items-center gap-5">
                  <span className="text-xs font-black w-10 shrink-0" style={{ color: '#C9A84C', fontFamily: 'var(--font-serif)' }}>{a.code}</span>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-amber-800 transition-colors">{a.name}</p>
                </div>
                <span className="font-bold text-sm" style={{ color: '#A07830' }}>{a.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERCORSI ── */}
      <section className="py-28" style={{ background: '#F5F0E8' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="gold-line" />
            <span className="section-label">Percorsi più Richiesti</span>
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-12 leading-tight">
            Transfer Privato —<br />
            <span className="italic font-bold text-gold-gradient" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>Prezzi Fissi Garantiti</span>
          </h2>
          <div className="rounded-sm overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.12)' }}>
            {routes.map((r, i) => (
              <Link key={i} href={r.href}
                className="group flex items-center gap-6 px-8 py-6 bg-white hover:bg-amber-50/40 transition-colors"
                style={i < routes.length - 1 ? { borderBottom: '1px solid rgba(201,168,76,0.08)' } : {}}
              >
                <span className="shrink-0 font-black text-xl w-8 select-none" style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: 'rgba(201,168,76,0.3)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900 text-sm group-hover:text-amber-800 transition-colors">{r.from}</span>
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="#C9A84C" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    <span className="font-bold text-gray-900 text-sm group-hover:text-amber-800 transition-colors">{r.to}</span>
                  </div>
                  <p className="text-xs text-gray-400">{r.time} · Transfer Privato</p>
                </div>
                <p className="font-black text-lg shrink-0" style={{ fontFamily: 'var(--font-serif), Georgia, serif', color: '#A07830' }}>{r.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERCHÉ SCEGLIERCI ── */}
      <section className="relative overflow-hidden grain py-32" style={{ background: '#080808' }}>
        <div className="h-[1px] absolute top-0 left-0 right-0" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.3) 50%, transparent 95%)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="gold-line" />
            <span className="section-label">I Nostri Standard</span>
          </div>
          <h2 className="text-white font-black mb-20 leading-[0.95]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Nessun Compromesso.<br />
            <span className="text-gold-gradient italic font-bold" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>Mai.</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ num, title, body }, i) => (
              <div key={num} className="group p-10 relative transition-colors duration-300"
                style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderRight: i % 3 !== 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(to bottom, transparent, #C9A84C, transparent)' }} />
                <span className="block font-black mb-6 leading-none" style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '3.5rem', color: 'rgba(201,168,76,0.25)' }}>{num}</span>
                <h3 className="font-bold text-sm mb-3 text-white group-hover:text-amber-300 transition-colors">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="gold-line" />
            <span className="section-label">Domande Frequenti</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-12">Hai domande?</h2>
          <div className="space-y-px">
            {faqs.map((faq, i) => (
              <div key={i} className="py-6" style={i < faqs.length - 1 ? { borderBottom: '1px solid #f3f4f6' } : {}}>
                <h3 className="font-bold text-gray-900 mb-3 text-sm">{faq.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden grain py-32" style={{ background: '#050505' }}>
        <div className="h-[1px] absolute top-0 left-0 right-0" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.4) 50%, transparent 95%)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_300px] gap-20 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="gold-line" />
                <span className="section-label">Prenota Oggi</span>
              </div>
              <h2 className="text-white font-black leading-[0.95] mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)' }}>
                Il Tuo Chauffeur<br />
                <span className="text-gold-gradient italic font-bold" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>Privato</span>
                <br />ti Aspetta.
              </h2>
              <p className="text-lg leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-serif), Georgia, serif' }}>
                Prezzi fissi. NCC autorizzato. Meet &amp; greet in ogni aeroporto italiano.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <a
                href={buildWhatsAppUrl(WHATSAPP, 'Buongiorno, vorrei prenotare un transfer privato in Italia.')}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 font-bold py-5 rounded-sm text-sm"
                style={{ background: '#25D366', color: '#fff' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Scrivici su WhatsApp
              </a>
              <Link href="/" className="flex items-center justify-center gap-2 py-4 rounded-sm text-xs font-medium transition-colors" style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
                🇬🇧 Switch to English
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
