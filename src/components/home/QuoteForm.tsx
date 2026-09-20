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
  { value: 'Business Sedan (E-Class)',    label: 'Business Sedan',    sub: 'Up to 3 pax · 2 bags' },
  { value: 'First Class Sedan (S-Class)', label: 'First Class Sedan', sub: 'Up to 3 pax · 2 bags' },
  { value: 'Premium Van (V-Class)',       label: 'Premium Van',       sub: 'Up to 7 pax · 5 bags' },
  { value: 'Luxury SUV',                  label: 'Luxury SUV',        sub: 'Up to 4 pax · 3 bags' },
]

// ── Palette tokens ──
const INK   = '#1a1410'
const GOLD  = '#8B7340'
const LINE  = '#E4DED3'
const MUTED = '#9a8f83'

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
    `w-full border rounded-sm px-4 py-3 text-sm transition-all focus:outline-none ${
      err
        ? 'border-red-300 bg-red-50 focus:border-red-400'
        : 'bg-white focus:border-amber-500'
    }`
  const inpStyle = (err?: { message?: string }) =>
    err ? {} : { borderColor: LINE, color: INK }

  const lbl = 'block text-[10px] uppercase tracking-[0.16em] font-bold mb-2'

  return (
    <div
      id="quote-form"
      className="rounded-md overflow-hidden bg-white"
      style={{ border: `1px solid ${LINE}`, boxShadow: '0 30px 70px rgba(26,20,16,0.18)' }}
    >
      {/* ── Header ── */}
      <div className="px-7 pt-6 pb-5" style={{ background: '#FAF7F2', borderBottom: `1px solid ${LINE}` }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-black text-base tracking-tight" style={{ color: INK, fontFamily: 'var(--font-serif), Georgia, serif' }}>
              Request a Booking
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: MUTED }}>Free quote · Fixed price · No payment now</p>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2].map((s) => (
              <div
                key={s}
                className="w-7 h-7 rounded-full text-[11px] font-bold flex items-center justify-center transition-all"
                style={
                  step === s
                    ? { background: GOLD, color: '#fff' }
                    : step > s
                    ? { background: 'rgba(139,115,64,0.12)', color: GOLD, border: `1px solid rgba(139,115,64,0.3)` }
                    : { background: '#EDE8E0', color: MUTED }
                }
              >
                {step > s ? '✓' : s}
              </div>
            ))}
          </div>
        </div>

        {/* Trip type toggle */}
        <div className="flex rounded-sm overflow-hidden bg-white" style={{ border: `1px solid ${LINE}` }}>
          {(['one-way', 'round-trip'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setValue('tripType', type)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold transition-all"
              style={
                tripType === type
                  ? { background: GOLD, color: '#fff' }
                  : { background: 'transparent', color: MUTED }
              }
            >
              {type === 'one-way' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeftRight className="w-3.5 h-3.5" />}
              {type === 'one-way' ? 'One Way' : 'Round Trip'}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="mt-4 h-[3px] rounded-full overflow-hidden" style={{ background: '#EDE8E0' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: step === 1 ? '50%' : '100%', background: `linear-gradient(90deg, ${GOLD}, #C9A84C)` }}
          />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-7 py-6">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(139,115,64,0.12)' }}>
              <CheckCircle className="w-7 h-7" style={{ color: GOLD }} />
            </div>
            <p className="font-black mb-1 text-lg" style={{ color: INK, fontFamily: 'var(--font-serif), Georgia, serif' }}>Request received!</p>
            <p className="text-sm mb-5" style={{ color: MUTED }}>
              We&apos;ll email your fixed-price quote within 2 hours.
            </p>
            <button onClick={() => setSubmitted(false)} className="text-xs font-bold" style={{ color: GOLD }}>
              Request another transfer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className={lbl} style={{ color: GOLD }}>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Pickup Location</span>
                  </label>
                  <input {...register('pickup')} placeholder="e.g. Milan Malpensa Airport" className={inp(errors.pickup)} style={inpStyle(errors.pickup)} />
                  {errors.pickup && <p className="text-red-500 text-xs mt-1">{errors.pickup.message}</p>}
                </div>

                <div>
                  <label className={lbl} style={{ color: GOLD }}>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Drop-off Location</span>
                  </label>
                  <input {...register('dropoff')} placeholder="e.g. Lake Como, Bellagio" className={inp(errors.dropoff)} style={inpStyle(errors.dropoff)} />
                  {errors.dropoff && <p className="text-red-500 text-xs mt-1">{errors.dropoff.message}</p>}
                </div>

                {/* Outbound date/time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl} style={{ color: GOLD }}>
                      <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{isRoundTrip ? 'Outbound' : 'Date'}</span>
                    </label>
                    <input type="date" {...register('date')} min={new Date().toISOString().split('T')[0]} className={inp(errors.date)} style={inpStyle(errors.date)} />
                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                  </div>
                  <div>
                    <label className={lbl} style={{ color: GOLD }}>
                      <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Time</span>
                    </label>
                    <input type="time" {...register('time')} className={inp(errors.time)} style={inpStyle(errors.time)} />
                    {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                  </div>
                </div>

                {/* Return date/time */}
                {isRoundTrip && (
                  <div className="grid grid-cols-2 gap-3 rounded-sm p-3" style={{ background: '#FAF7F2', border: `1px solid ${LINE}` }}>
                    <div>
                      <label className={lbl} style={{ color: GOLD }}>
                        <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Return Date</span>
                      </label>
                      <input type="date" {...register('returnDate')} min={new Date().toISOString().split('T')[0]} className={inp()} style={inpStyle()} />
                    </div>
                    <div>
                      <label className={lbl} style={{ color: GOLD }}>
                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Return Time</span>
                      </label>
                      <input type="time" {...register('returnTime')} className={inp()} style={inpStyle()} />
                    </div>
                  </div>
                )}

                {/* Passengers + Vehicle */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl} style={{ color: GOLD }}>
                      <span className="flex items-center gap-1.5"><Users className="w-3 h-3" /> Passengers</span>
                    </label>
                    <select {...register('passengers')} className={inp(errors.passengers) + ' cursor-pointer'} style={inpStyle(errors.passengers)}>
                      <option value="">Select</option>
                      {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Passenger' : 'Passengers'}</option>)}
                      <option value="9+">9+ Passengers</option>
                    </select>
                    {errors.passengers && <p className="text-red-500 text-xs mt-1">{errors.passengers.message}</p>}
                  </div>
                  <div>
                    <label className={lbl} style={{ color: GOLD }}>
                      <span className="flex items-center gap-1.5"><Car className="w-3 h-3" /> Vehicle</span>
                    </label>
                    <select {...register('vehicle')} className={inp(errors.vehicle) + ' cursor-pointer'} style={inpStyle(errors.vehicle)}>
                      <option value="">Select</option>
                      {vehicles.map(v => (
                        <option key={v.value} value={v.value}>{v.label} · {v.sub}</option>
                      ))}
                    </select>
                    {errors.vehicle && <p className="text-red-500 text-xs mt-1">{errors.vehicle.message}</p>}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={goToStep2}
                  className="w-full flex items-center justify-center gap-2 rounded-sm py-4 mt-2 font-bold text-sm transition-all hover:-translate-y-0.5"
                  style={{ background: INK, color: '#FAF7F2', letterSpacing: '0.04em' }}
                >
                  Continue to Contact Details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <button type="button" onClick={() => setStep(1)} className="text-xs flex items-center gap-1 mb-1 font-medium" style={{ color: MUTED }}>
                  ← Back to journey details
                </button>

                {/* Summary */}
                <div className="rounded-sm p-4 text-xs space-y-1.5" style={{ background: '#FAF7F2', border: `1px solid ${LINE}` }}>
                  <span className="inline-flex text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm mb-1" style={{ background: 'rgba(139,115,64,0.12)', color: GOLD }}>
                    {isRoundTrip ? '⇄ Round Trip' : '→ One Way'}
                  </span>
                  <p style={{ color: '#5a5248' }}><span style={{ color: MUTED }}>From: </span>{getValues('pickup')}</p>
                  <p style={{ color: '#5a5248' }}><span style={{ color: MUTED }}>To: </span>{getValues('dropoff')}</p>
                  <p style={{ color: '#5a5248' }}><span style={{ color: MUTED }}>Outbound: </span>{getValues('date')} at {getValues('time')}</p>
                  {isRoundTrip && getValues('returnDate') && (
                    <p style={{ color: '#5a5248' }}><span style={{ color: MUTED }}>Return: </span>{getValues('returnDate')} at {getValues('returnTime')}</p>
                  )}
                  <p style={{ color: '#5a5248' }}><span style={{ color: MUTED }}>Pax: </span>{getValues('passengers')} · {getValues('vehicle')}</p>
                </div>

                <div>
                  <label className={lbl} style={{ color: GOLD }}><span className="flex items-center gap-1.5"><User className="w-3 h-3" /> Your Name</span></label>
                  <input {...register('name')} placeholder="Full name" className={inp(errors.name)} style={inpStyle(errors.name)} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className={lbl} style={{ color: GOLD }}><span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> Phone</span></label>
                  <input {...register('phone')} placeholder="+39 or international number" className={inp(errors.phone)} style={inpStyle(errors.phone)} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className={lbl} style={{ color: GOLD }}><span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> Email</span></label>
                  <input type="email" {...register('email')} placeholder="your@email.com" className={inp(errors.email)} style={inpStyle(errors.email)} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className={lbl} style={{ color: GOLD }}>Special Requirements (optional)</label>
                  <textarea {...register('notes')} placeholder="Flight number, luggage, child seat, special requests..." rows={3} className={inp() + ' resize-none'} style={inpStyle()} />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-sm font-bold text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 disabled:opacity-60"
                  style={{ background: GOLD, color: '#fff', letterSpacing: '0.05em' }}
                >
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Get My Free Quote'}
                </button>
                {submitError && <p className="text-center text-red-500 text-xs">Something went wrong — please try again.</p>}
                <p className="text-center text-[11px]" style={{ color: MUTED }}>We&apos;ll reply within 2 hours. No payment required.</p>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
