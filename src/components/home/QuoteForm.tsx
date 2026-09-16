'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, Calendar, Clock, Users, Car, User, Phone, Mail, Loader2, CheckCircle, ArrowLeftRight, ArrowRight } from 'lucide-react'

const schema = z.object({
  tripType:       z.enum(['one-way', 'round-trip']),
  pickup:         z.string().min(3, 'Enter pickup location'),
  dropoff:        z.string().min(3, 'Enter drop-off location'),
  date:           z.string().min(1, 'Select a date'),
  time:           z.string().min(1, 'Select a time'),
  returnDate:     z.string().optional(),
  returnTime:     z.string().optional(),
  passengers:     z.string().min(1, 'Select passengers'),
  vehicle:        z.string().min(1, 'Select vehicle type'),
  name:           z.string().min(2, 'Enter your name'),
  phone:          z.string().min(7, 'Enter a valid phone number'),
  email:          z.string().email('Enter a valid email'),
  notes:          z.string().optional(),
})

type FormData = z.infer<typeof schema>

const vehicles = [
  { value: 'Business Sedan (E-Class)',   label: 'Business Sedan',   sub: 'Up to 3 pax · 2 bags' },
  { value: 'First Class Sedan (S-Class)',label: 'First Class Sedan', sub: 'Up to 3 pax · 2 bags' },
  { value: 'Premium Van (V-Class)',      label: 'Premium Van',       sub: 'Up to 7 pax · 5 bags' },
  { value: 'Luxury SUV',                label: 'Luxury SUV',         sub: 'Up to 4 pax · 3 bags' },
]

export default function QuoteForm() {
  const [step, setStep]               = useState<1 | 2>(1)
  const [submitting, setSubmitting]   = useState(false)
  const [submitted, setSubmitted]     = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const { register, handleSubmit, trigger, getValues, watch, reset, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { tripType: 'one-way' },
  })

  const tripType = watch('tripType')
  const isRoundTrip = tripType === 'round-trip'

  const goToStep2 = async () => {
    const fieldsToValidate: (keyof FormData)[] = ['pickup', 'dropoff', 'date', 'time', 'passengers', 'vehicle']
    const valid = await trigger(fieldsToValidate)
    if (valid) setStep(2)
  }

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    setSubmitError(false)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source_url: window.location.href }),
      })
      if (!res.ok) throw new Error('Request failed')
      setSubmitted(true)
      reset()
      setStep(1)
    } catch {
      setSubmitError(true)
    }
    setSubmitting(false)
  }

  const inp = (err?: { message?: string }) =>
    `w-full border rounded-sm px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-all ${
      err
        ? 'border-red-500/50 bg-red-500/5 focus:border-red-500'
        : 'border-white/10 bg-white/5 focus:border-amber-500/60'
    }`

  const lbl = 'block text-[10px] uppercase tracking-[0.18em] font-semibold mb-2'
  const lblStyle = { color: 'rgba(201,168,76,0.8)' }

  return (
    <div
      id="quote-form"
      className="rounded-sm overflow-hidden"
      style={{ background: 'rgba(10,10,10,0.92)', border: '1px solid rgba(201,168,76,0.15)', boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)' }}
    >
      {/* Header */}
      <div className="px-7 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(201,168,76,0.05)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white font-bold text-sm tracking-wide">Reserve Your Transfer</p>
            <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Free quote · Fixed price · No commitment</p>
          </div>
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

        {/* One-way / Round-trip toggle */}
        <div className="flex rounded-sm overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          {(['one-way', 'round-trip'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setValue('tripType', type)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold transition-all"
              style={
                tripType === type
                  ? { background: 'rgba(201,168,76,0.15)', color: '#C9A84C', borderColor: 'rgba(201,168,76,0.3)' }
                  : { background: 'transparent', color: 'rgba(255,255,255,0.35)' }
              }
            >
              {type === 'one-way' ? (
                <ArrowRight className="w-3.5 h-3.5" />
              ) : (
                <ArrowLeftRight className="w-3.5 h-3.5" />
              )}
              {type === 'one-way' ? 'One Way' : 'Round Trip'}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: step === 1 ? '50%' : '100%', background: 'linear-gradient(90deg, #9A7A30, #C9A84C, #E0C070)' }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="px-7 py-6">
        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.12)' }}>
              <CheckCircle className="w-7 h-7" style={{ color: '#C9A84C' }} />
            </div>
            <p className="text-white font-bold mb-1">Request received!</p>
            <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              We&apos;ll email your fixed-price quote within 2 hours.
            </p>
            <button onClick={() => setSubmitted(false)} className="text-xs font-semibold" style={{ color: '#C9A84C' }}>
              Request another transfer
            </button>
          </div>
        ) : (
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

                {/* Outbound date/time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl} style={lblStyle}>
                      <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{isRoundTrip ? 'Outbound Date' : 'Date'}</span>
                    </label>
                    <input type="date" {...register('date')} min={new Date().toISOString().split('T')[0]} className={inp(errors.date) + ' [color-scheme:dark]'} />
                    {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>}
                  </div>
                  <div>
                    <label className={lbl} style={lblStyle}>
                      <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{isRoundTrip ? 'Outbound Time' : 'Time'}</span>
                    </label>
                    <input type="time" {...register('time')} className={inp(errors.time) + ' [color-scheme:dark]'} />
                    {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time.message}</p>}
                  </div>
                </div>

                {/* Return date/time — only shown for round trip */}
                {isRoundTrip && (
                  <div className="grid grid-cols-2 gap-3 rounded-sm p-3" style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.12)' }}>
                    <div>
                      <label className={lbl} style={lblStyle}>
                        <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Return Date</span>
                      </label>
                      <input type="date" {...register('returnDate')} min={new Date().toISOString().split('T')[0]} className={inp() + ' [color-scheme:dark]'} />
                    </div>
                    <div>
                      <label className={lbl} style={lblStyle}>
                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Return Time</span>
                      </label>
                      <input type="time" {...register('returnTime')} className={inp() + ' [color-scheme:dark]'} />
                    </div>
                  </div>
                )}

                {/* Passengers + Vehicle */}
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
                      {vehicles.map(v => (
                        <option key={v.value} value={v.value}>{v.label} · {v.sub}</option>
                      ))}
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
                <button type="button" onClick={() => setStep(1)} className="text-xs flex items-center gap-1 mb-1 transition-colors" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  ← Back to journey details
                </button>

                {/* Summary */}
                <div className="rounded-sm p-4 text-xs space-y-1.5" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.12)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm" style={{ background: isRoundTrip ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.06)', color: isRoundTrip ? '#C9A84C' : 'rgba(255,255,255,0.4)' }}>
                      {isRoundTrip ? '⇄ Round Trip' : '→ One Way'}
                    </span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.6)' }}><span style={{ color: 'rgba(255,255,255,0.35)' }}>From: </span>{getValues('pickup')}</p>
                  <p style={{ color: 'rgba(255,255,255,0.6)' }}><span style={{ color: 'rgba(255,255,255,0.35)' }}>To: </span>{getValues('dropoff')}</p>
                  <p style={{ color: 'rgba(255,255,255,0.6)' }}><span style={{ color: 'rgba(255,255,255,0.35)' }}>Outbound: </span>{getValues('date')} at {getValues('time')}</p>
                  {isRoundTrip && getValues('returnDate') && (
                    <p style={{ color: 'rgba(255,255,255,0.6)' }}><span style={{ color: 'rgba(255,255,255,0.35)' }}>Return: </span>{getValues('returnDate')} at {getValues('returnTime')}</p>
                  )}
                  <p style={{ color: 'rgba(255,255,255,0.6)' }}><span style={{ color: 'rgba(255,255,255,0.35)' }}>Pax: </span>{getValues('passengers')} · {getValues('vehicle')}</p>
                </div>

                <div>
                  <label className={lbl} style={lblStyle}><span className="flex items-center gap-1.5"><User className="w-3 h-3" /> Your Name</span></label>
                  <input {...register('name')} placeholder="Full name" className={inp(errors.name)} />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className={lbl} style={lblStyle}><span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> Phone</span></label>
                  <input {...register('phone')} placeholder="+39 or international number" className={inp(errors.phone)} />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className={lbl} style={lblStyle}><span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> Email</span></label>
                  <input type="email" {...register('email')} placeholder="your@email.com" className={inp(errors.email)} />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className={lbl} style={lblStyle}>Special Requirements (optional)</label>
                  <textarea {...register('notes')} placeholder="Flight number, luggage, child seat, special requests..." rows={3} className={inp() + ' resize-none'} />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-sm font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #9A7A30, #C9A84C, #E0C070)', color: '#000', letterSpacing: '0.05em' }}
                >
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Get My Free Quote'}
                </button>
                {submitError && <p className="text-center text-red-400 text-xs">Something went wrong — please try again.</p>}
                <p className="text-center text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>We&apos;ll reply within 2 hours. No payment required.</p>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
