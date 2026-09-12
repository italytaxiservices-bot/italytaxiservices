'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Send } from 'lucide-react'

const schema = z.object({
  name:    z.string().min(2, 'Enter your name'),
  email:   z.string().email('Enter a valid email'),
  message: z.string().min(10, 'Tell us a bit more (10+ characters)'),
})

type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const inp = (err?: { message?: string }) =>
    `w-full border rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none transition-all ${
      err ? 'border-red-400 bg-red-50 focus:border-red-500' : 'border-gray-200 bg-white focus:border-green-400'
    }`

  if (status === 'sent') {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-2xl text-center">
        <p className="font-bold text-gray-900 mb-1">Message sent!</p>
        <p className="text-sm text-gray-600">Thanks for reaching out — we&apos;ll reply within 2 hours.</p>
        <button onClick={() => setStatus('idle')} className="mt-4 text-sm font-semibold text-green-700 hover:underline">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Name</label>
        <input {...register('name')} placeholder="Your full name" className={inp(errors.name)} />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email</label>
        <input type="email" {...register('email')} placeholder="your@email.com" className={inp(errors.email)} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Message</label>
        <textarea {...register('message')} rows={4} placeholder="How can we help?" className={inp(errors.message) + ' resize-none'} />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60 bg-green-600 text-white hover:bg-green-700"
      >
        {status === 'submitting' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        Send Message
      </button>
      {status === 'error' && (
        <p className="text-red-500 text-xs text-center">Something went wrong — please try WhatsApp or email instead.</p>
      )}
    </form>
  )
}
