import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendBookingNotification, sendCustomerBookingConfirmation } from '@/lib/mailer'

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

    // Admin-panel CRM schema: no anon insert policy on `leads` by design
    // (see supabase/migrations/20260909120900_rls.sql), so this uses the
    // service-role client — a public website enquiry is exactly the kind of
    // RLS-crossing write that client exists for. Best-effort: a failure here
    // must never block the booking form, since the emails below are the
    // primary, already-working notification path.
    try {
      const admin = createAdminClient()
      const { error } = await admin.from('leads').insert({
        // Filled in by the assign_lead_number trigger — deliberately omitted
        // at runtime (undefined is dropped by JSON.stringify) so the trigger's
        // `if new.lead_number is null` check fires.
        lead_number: undefined!,
        full_name: lead.name,
        email: lead.email || null,
        phone: lead.phone || null,
        source: 'WEBSITE',
        pickup: lead.pickup,
        dropoff: lead.dropoff,
        trip_date: lead.date || null,
        trip_time: lead.time || null,
        passengers: lead.passengers,
        notes: [
          lead.vehicle ? `Preferred vehicle: ${lead.vehicle}` : null,
          lead.notes || null,
          lead.source_url ? `Source: ${lead.source_url}` : null,
        ].filter(Boolean).join('\n') || null,
      })
      if (error) console.error('Supabase insert error:', error)
    } catch (err) {
      console.error('Supabase insert error:', err)
    }

    try {
      await sendBookingNotification(lead)
    } catch (err) {
      console.error('Booking email notification error:', err)
    }

    try {
      await sendCustomerBookingConfirmation(lead)
    } catch (err) {
      console.error('Customer confirmation email error:', err)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
