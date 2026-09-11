import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleaned = phone.replace(/\D/g, '')
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`
}

export function buildLeadMessage(data: {
  name: string
  phone: string
  pickup: string
  dropoff: string
  date: string
  time: string
  passengers: string
  vehicle: string
  notes?: string
}): string {
  return `Hello Italy Chauffeur,

I'd like to book a private transfer:

From: ${data.pickup}
To: ${data.dropoff}
Date: ${data.date}
Time: ${data.time}
Passengers: ${data.passengers}
Vehicle: ${data.vehicle}
Name: ${data.name}
Phone: ${data.phone}${data.notes ? `\nNotes: ${data.notes}` : ''}

Please send me a quote. Thank you.`
}

export function formatPrice(price: number): string {
  return `€${price}`
}
