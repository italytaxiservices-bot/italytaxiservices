export type VehicleCategory = 'sedan' | 'business' | 'luxury' | 'van'
export type LeadStatus = 'new' | 'contacted' | 'quoted' | 'waiting' | 'confirmed' | 'completed' | 'cancelled' | 'lost'

export interface City {
  id: string
  name: string
  slug: string
  region: string
  description: string
  airportCodes: string[]
  metaTitle: string
  metaDescription: string
}

export interface Airport {
  code: string
  name: string
  slug: string
  citySlug: string
  cityName: string
  region: string
  description: string
  metaTitle: string
  metaDescription: string
}

export interface Route {
  id: string
  fromSlug: string
  fromName: string
  toSlug: string
  toName: string
  slug: string
  estimatedTime: string
  priceFrom: number
  distance?: string
  description: string
  highlights: string[]
  metaTitle: string
  metaDescription: string
}

export interface Vehicle {
  id: string
  name: string
  slug: string
  model: string
  passengers: number
  luggage: number
  description: string
  features: string[]
  category: VehicleCategory
  priceMultiplier: number
}

export interface QuoteFormData {
  pickup: string
  dropoff: string
  date: string
  time: string
  passengers: string
  vehicle: string
  name: string
  phone: string
  email: string
  notes?: string
}

export interface Lead {
  name: string
  phone: string
  email: string
  pickup: string
  dropoff: string
  date: string
  time: string
  passengers: number
  vehicle?: string
  notes?: string
  source_url?: string
  status: LeadStatus
}
