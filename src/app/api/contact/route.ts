import { NextRequest, NextResponse } from 'next/server'
import { sendContactNotification } from '@/lib/mailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    try {
      await sendContactNotification({
        name: String(name).trim(),
        email: String(email).trim(),
        message: String(message).trim(),
      })
    } catch (err) {
      console.error('Contact email notification error:', err)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
