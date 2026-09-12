import type { Metadata } from 'next'
import CityPageTemplate from '@/components/templates/CityPageTemplate'
import { getCityBySlug } from '@/data/cities'

export const metadata: Metadata = {
  title: 'Private Chauffeur Service Milan | NCC Milan | Italy Taxi Services',
  description: 'Professional private chauffeur and NCC service in Milan. Malpensa, Linate, Bergamo airport transfers. Lake Como, corporate travel, city rides. Fixed prices, licensed operators.',
}

const city = getCityBySlug('milan')!

export default function MilanChauffeurPage() {
  return (
    <CityPageTemplate
      city={city}
      highlights={[
        'Malpensa, Linate & Bergamo airports',
        'Lake Como direct transfers',
        'Corporate & VIP chauffeur',
        'Fixed prices — no meters',
      ]}
      about={`Milan is Italy's financial, fashion, and design capital — and one of the busiest travel hubs in Europe. Whether you're arriving at Malpensa International, Linate City Airport, or Bergamo Orio al Serio, our professional NCC chauffeurs ensure a seamless, stress-free transfer from the moment you land.

We provide private chauffeur service throughout the Greater Milan area, from the historic centre and business districts to the lakeside towns of Como, Varenna, Bellagio, and Menaggio. Whether you need an airport pickup, a corporate chauffeur for back-to-back meetings, or a private transfer to the Italian Alps, our licensed NCC partners deliver exceptional service every time.

All our Milan chauffeurs are professional, English-speaking, and fully licensed under Italy's NCC (Noleggio con Conducente) regulations. Vehicles are immaculately presented, ranging from business sedans (Mercedes E-Class) to executive vehicles (S-Class) and spacious passenger vans (V-Class) for groups and families.`}
      services={[
        {
          title: 'Malpensa Airport Transfer',
          description: 'Private NCC transfers from Milan Malpensa (MXP) to Milan city centre, Lake Como, and beyond. Meet & greet, flight monitoring, fixed price.',
        },
        {
          title: 'Linate Airport Transfer',
          description: 'Fast private transfers from Linate (LIN) to the city. Only 7km from Milan centre — ideal for business travellers.',
        },
        {
          title: 'Bergamo Airport Transfer',
          description: 'Private transfers from Bergamo Orio al Serio (BGY) to Milan and the surrounding region. No taxis, no shared shuttles.',
        },
        {
          title: 'Lake Como Private Transfer',
          description: 'Direct private transfers from Milan airports and city to Lake Como — Como, Bellagio, Varenna, Menaggio, Lenno, Tremezzo.',
        },
        {
          title: 'Milan Corporate Chauffeur',
          description: 'Discreet, professional corporate chauffeur service in Milan. Hourly hire, full-day hire, multi-stop corporate travel.',
        },
        {
          title: 'Milan to Other Cities',
          description: 'Long-distance private transfers from Milan to Venice, Florence, Rome, Turin, Verona, and beyond.',
        },
      ]}
    />
  )
}
