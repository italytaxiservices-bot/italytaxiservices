import type { Vehicle } from '@/types'

export const vehicles: Vehicle[] = [
  {
    id: 'sedan',
    name: 'Business Sedan',
    slug: 'business-sedan',
    model: 'Mercedes-Benz E-Class or similar',
    passengers: 3,
    luggage: 3,
    description: 'The perfect balance of comfort and professionalism. Ideal for airport transfers, city rides, and business travel.',
    features: ['WiFi on request', 'Chilled water', 'Leather seats', 'Air conditioning', 'USB charging', 'Newspaper'],
    category: 'sedan',
    priceMultiplier: 1,
  },
  {
    id: 'business',
    name: 'First Class Sedan',
    slug: 'first-class-sedan',
    model: 'Mercedes-Benz S-Class or similar',
    passengers: 3,
    luggage: 3,
    description: 'The pinnacle of executive travel. Unmatched comfort and presence for VIP clients and senior executives.',
    features: ['WiFi', 'Premium drinks', 'Massage seats', 'Privacy glass', 'Climate control zones', 'Wireless charging'],
    category: 'business',
    priceMultiplier: 1.45,
  },
  {
    id: 'van',
    name: 'Premium Van',
    slug: 'premium-van',
    model: 'Mercedes-Benz V-Class or similar',
    passengers: 7,
    luggage: 7,
    description: 'Spacious, comfortable, and elegant. Perfect for families, groups, and passengers with extra luggage.',
    features: ['WiFi on request', 'Chilled water', 'Individual captain seats', 'Extra luggage space', 'Air conditioning', 'USB charging'],
    category: 'van',
    priceMultiplier: 1.5,
  },
  {
    id: 'luxury',
    name: 'Luxury SUV',
    slug: 'luxury-suv',
    model: 'BMW X5 / Range Rover / Mercedes GLE',
    passengers: 4,
    luggage: 4,
    description: 'Commanding presence combined with supreme comfort. Perfect for those who want it all — style, space, and luxury.',
    features: ['WiFi', 'Premium sound', 'Panoramic roof', 'Heated seats', 'Privacy glass', 'Wireless charging'],
    category: 'luxury',
    priceMultiplier: 1.65,
  },
]

export const getVehicleBySlug = (slug: string) => vehicles.find(v => v.slug === slug)
