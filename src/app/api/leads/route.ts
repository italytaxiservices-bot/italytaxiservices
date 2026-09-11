import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, phone, email,
      pickup, dropoff,
      date, time, passengers, vehicle,
      notes, source_url,
    } = body

    if (!name || !phone || !pickup || !dropoff || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const lead = {
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: String(email ?? '').trim(),
      pickup: String(pickup).trim(),
      dropoff: String(dropoff).trim(),
      date: String(date),
      time: String(time ?? ''),
      passengers: parseInt(String(passengers), 10) || 1,
      vehicle: String(vehicle ?? ''),
      notes: String(notes ?? '').trim(),
      source_url: String(source_url ?? ''),
      status: 'new',
      created_at: new Date().toISOString(),
    }

    if (supabase) {
      const { error } = await supabase.from('leads').insert(lead)
      if (error) console.error('Supabase insert error:', error)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
