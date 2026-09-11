'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, Calendar, Clock, Users, Car, User, Phone, Mail, Loader2 } from 'lucide-react'
import { buildWhatsAppUrl, buildLeadMessage } from '@/lib/utils'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+390000000000'

const schema = z.object({
  pickup:     z.string().min(3, 'Enter pickup location'),
  dropoff:    z.string().min(3, 'Enter drop-off location'),
  date:       z.string().min(1, 'Select a date'),
  time:       z.string().min(1, 'Select a time'),
  passengers: z.string().min(1, 'Select passengers'),
  vehicle:    z.string().min(1, 'Select vehicle type'),
  name:       z.string().min(2, 'Enter your name'),
  phone:      z.string().min(7, 'Enter a valid phone number'),
  email:      z.string().email('Enter a valid email'),
  notes:      z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function QuoteForm() {
  const [step, setStep]           = useState<1 | 2>(1)
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, trigger, getValues, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const goToStep2 = async () => {
    const valid = await trigger(['pickup', 'dropoff', 'date', 'time', 'passengers', 'vehicle'])
    if (valid) setStep(2)
  }

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source_url: window.location.href }),
      })
    } catch { /* fire and forget */ }
    const message = buildLeadMessage({ name: data.name, phone: data.phone, pickup: data.pickup, dropoff: data.dropoff, date: data.date, time: data.time, passengers: data.passengers, vehicle: data.vehicle, notes: data.notes })
    window.open(buildWhatsAppUrl(WHATSAPP, message), '_blank')
    setSubmitting(false)
  }

  const inp = (err?: { message?: string }) =>
    `w-full border rounded-sm px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-all ${
      err
        ? 'border-red-500/50 bg-red-500/5 focus:border-red-500'
        : 'border-white/10 bg-white/5 focus:border-amber-500/60 focus:bg-white/8'
    }`

  const lbl = 'block text-[10px] uppercase tracking-[0.18em] font-semibold mb-2'
  const lblStyle = { color: 'rgba(201,168,76,0.8)' }

  return (
    <div
      id="quote-form"
      className="rounded-sm overflow-hidden"
      style={{ background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(201,168,76,0.15)', boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)' }}
    >
      {/* Form header */}
      <div className="px-7 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(201,168,76,0.05)' }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-bold text-sm tracking-wide">Reserve Your Transfer</p>
            <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Free quote · Fixed price · No commitment</p>
          </div>
          {/* Step indicators */}
          <div className="flex items-center gap-2">
            {[1, 2].map((s) => (
              <div
                key={s}
                className="w-7 h-7 rounded-full text-[11px] font-bold flex items-center justify-center transition-all"
                style={
                  step === s
                    ? { background: 'linear-gradient(135deg, #9A7A30, #C9A84C)', color: '#000' }
                    : step > s
                    ? { background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }
                    : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' }
                }
              >
                {step > s ? '✓' : s}
              </div>
            ))}
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-4 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: step === 1 ? '50%' : '100%', background: 'linear-gradient(90deg, #9A7A30, #C9A84C, #E0C070)' }}
          />
        </div>
      </div>

      {/* Form body */}
      <div className="px-7 py-6">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className={lbl} style={lblStyle}>
                  <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Pickup Location</span>
                </label>
                <input {...register('pickup')} placeholder="e.g. Milan Malpensa Airport" className={inp(errors.pickup)} />
                {errors.pickup && <p className="text-red-400 text-xs mt-1">{errors.pickup.message}</p>}
              </div>

              <div>
                <label className={lbl} style={lblStyle}>
                  <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Drop-off Location</span>
                </label>
                <input {...register('dropoff')} placeholder="e.g. Milan City Centre" className={inp(errors.dropoff)} />
                {errors.dropoff && <p className="text-red-400 text-xs mt-1">{errors.dropoff.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={lbl} style={lblStyle}>
                    <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Date</span>
                  </label>
                  <input type="date" {...register('date')} min={new Date().toISOString().split('T')[0]} className={inp(errors.date) + ' [color-scheme:dark]'} />
                  {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>}
                </div>
                <div>
                  <label className={lbl} style={lblStyle}>
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Time</span>
                  </label>
                  <input type="time" {...register('time')} className={inp(errors.time) + ' [color-scheme:dark]'} />
                  {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={lbl} style={lblStyle}>
                    <span className="flex items-center gap-1.5"><Users className="w-3 h-3" /> Passengers</span>
                  </label>
                  <select {...register('passengers')} className={inp(errors.passengers) + ' cursor-pointer'} style={{ background: '#0a0a0a' }}>
                    <option value="">Select</option>
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Passenger' : 'Passengers'}</option>)}
                    <option value="9+">9+ Passengers</option>
                  </select>
                  {errors.passengers && <p className="text-red-400 text-xs mt-1">{errors.passengers.message}</p>}
                </div>
                <div>
                  <label className={lbl} style={lblStyle}>
                    <span className="flex items-center gap-1.5"><Car className="w-3 h-3" /> Vehicle</span>
                  </label>
                  <select {...register('vehicle')} className={inp(errors.vehicle) + ' cursor-pointer'} style={{ background: '#0a0a0a' }}>
                    <option value="">Select</option>
                    <option value="Business Sedan (E-Class)">Business Sedan</option>
                    <option value="First Class Sedan (S-Class)">First Class</option>
                    <option value="Premium Van (V-Class)">Premium Van</option>
                    <option value="Luxury SUV">Luxury SUV</option>
                  </select>
                  {errors.vehicle && <p className="text-red-400 text-xs mt-1">{errors.vehicle.message}</p>}
                </div>
              </div>

              <button type="button" onClick={goToStep2} className="btn-primary w-full justify-center rounded-sm py-4 mt-2">
                Continue to Contact Details
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <button type="button" onClick={() => setStep(1)} className="text-xs flex items-center gap-1 mb-2 transition-colors" style={{ color: 'rgba(255,255,255,0.35)' }}>
                ← Back to journey details
              </button>

              {/* Summary */}
              <div className="rounded-sm p-4 text-xs space-y-1.5" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.12)' }}>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}><span style={{ color: 'rgba(255,255,255,0.35)' }}>From: </span>{getValues('pickup')}</p>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}><span style={{ color: 'rgba(255,255,255,0.35)' }}>To: </span>{getValues('dropoff')}</p>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}><span style={{ color: 'rgba(255,255,255,0.35)' }}>Date: </span>{getValues('date')} at {getValues('time')}</p>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}><span style={{ color: 'rgba(255,255,255,0.35)' }}>Pax: </span>{getValues('passengers')} · {getValues('vehicle')}</p>
              </div>

              <div>
                <label className={lbl} style={lblStyle}><span className="flex items-center gap-1.5"><User className="w-3 h-3" /> Your Name</span></label>
                <input {...register('name')} placeholder="Full name" className={inp(errors.name)} />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className={lbl} style={lblStyle}><span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> Phone / WhatsApp</span></label>
                <input {...register('phone')} placeholder="+39 or international number" className={inp(errors.phone)} />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label className={lbl} style={lblStyle}><span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> Email</span></label>
                <input type="email" {...register('email')} placeholder="your@email.com" className={inp(errors.email)} />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className={lbl} style={lblStyle}>Notes (optional)</label>
                <textarea {...register('notes')} placeholder="Flight number, luggage, special requests..." rows={2} className={inp() + ' resize-none'} />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-sm font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                style={{ background: '#25D366', color: '#fff', boxShadow: '0 4px 20px rgba(37,211,102,0.25)', letterSpacing: '0.05em' }}
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Get My Quote on WhatsApp
                  </>
                )}
              </button>
              <p className="text-center text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>Reply within minutes. No commitment required.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
