import nodemailer from 'nodemailer'

const smtpUser = process.env.SMTP_USER ?? ''
const smtpPass = process.env.SMTP_PASS ?? ''

// booking@/info@ are forwarding aliases that redirect back to smtpUser's own
// inbox. Sending notifications there (from that same account) creates a
// send-to-self loop that Gmail silently drops or spam-flags due to DMARC
// misalignment on the forwarded copy — so notifications go straight to the
// real mailbox instead.
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || smtpUser

const transporter = smtpUser && smtpPass
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: Number(process.env.SMTP_PORT ?? 465) === 465,
      auth: { user: smtpUser, pass: smtpPass },
    })
  : null

async function send(opts: { to: string[]; bcc?: string[]; replyTo?: string; subject: string; text: string; html: string }) {
  if (!transporter) {
    console.error('SMTP not configured — skipping email:', opts.subject)
    return
  }
  await transporter.sendMail({
    from: `"Italy Taxi Services" <${smtpUser}>`,
    to: opts.to,
    bcc: opts.bcc,
    replyTo: opts.replyTo || undefined,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  })
}

const TRUSTPILOT_BCC = 'italytaxiservices.com+72f371d7d9@invite.trustpilot.com'

function table(rows: [string, string][]) {
  return `<table cellpadding="6" style="border-collapse:collapse">${rows.map(([label, value]) => `
    <tr>
      <td style="font-weight:bold;border:1px solid #ddd">${label}</td>
      <td style="border:1px solid #ddd">${value}</td>
    </tr>
  `).join('')}</table>`
}

export async function sendBookingNotification(lead: {
  name: string
  phone: string
  email: string
  pickup: string
  dropoff: string
  date: string
  time: string
  passengers: number
  vehicle: string
  notes: string
  source_url: string
}) {
  const rows: [string, string][] = [
    ['Name', lead.name],
    ['Phone', lead.phone],
    ['Email', lead.email || '—'],
    ['Pickup', lead.pickup],
    ['Dropoff', lead.dropoff],
    ['Date', lead.date],
    ['Time', lead.time || '—'],
    ['Passengers', String(lead.passengers)],
    ['Vehicle', lead.vehicle || '—'],
    ['Notes', lead.notes || '—'],
    ['Source page', lead.source_url || '—'],
  ]

  await send({
    to: [NOTIFY_EMAIL],
    replyTo: lead.email,
    subject: `New booking request from ${lead.name} — ${lead.pickup} → ${lead.dropoff}`,
    text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
    html: `<h2>New booking request — Italy Taxi Services</h2>${table(rows)}`,
  })
}

export async function sendCustomerBookingConfirmation(lead: {
  name: string
  email: string
  pickup: string
  dropoff: string
  date: string
  time: string
  passengers: number
  vehicle: string
}) {
  if (!lead.email) return

  const html = `
    <p>Hi ${lead.name},</p>
    <p>Thanks for booking with Italy Taxi Services! We've received your transfer request and will confirm your fixed price within 2 hours.</p>
    <table cellpadding="6" style="border-collapse:collapse">
      <tr><td style="font-weight:bold;border:1px solid #ddd">Pickup</td><td style="border:1px solid #ddd">${lead.pickup}</td></tr>
      <tr><td style="font-weight:bold;border:1px solid #ddd">Dropoff</td><td style="border:1px solid #ddd">${lead.dropoff}</td></tr>
      <tr><td style="font-weight:bold;border:1px solid #ddd">Date</td><td style="border:1px solid #ddd">${lead.date}</td></tr>
      <tr><td style="font-weight:bold;border:1px solid #ddd">Time</td><td style="border:1px solid #ddd">${lead.time || '—'}</td></tr>
      <tr><td style="font-weight:bold;border:1px solid #ddd">Passengers</td><td style="border:1px solid #ddd">${lead.passengers}</td></tr>
      <tr><td style="font-weight:bold;border:1px solid #ddd">Vehicle</td><td style="border:1px solid #ddd">${lead.vehicle || '—'}</td></tr>
    </table>
    <p>Questions in the meantime? Just reply to this email.</p>
    <p>— Italy Taxi Services</p>
  `

  await send({
    to: [lead.email],
    bcc: [TRUSTPILOT_BCC],
    subject: 'Booking Received — Italy Taxi Services',
    text: `Hi ${lead.name},\n\nThanks for booking with Italy Taxi Services! We've received your transfer request and will confirm your fixed price within 2 hours.\n\nPickup: ${lead.pickup}\nDropoff: ${lead.dropoff}\nDate: ${lead.date}\nTime: ${lead.time || '—'}\nPassengers: ${lead.passengers}\nVehicle: ${lead.vehicle || '—'}\n\nQuestions in the meantime? Just reply to this email.\n\n— Italy Taxi Services`,
    html,
  })
}

export async function sendContactNotification(msg: {
  name: string
  email: string
  message: string
}) {
  const rows: [string, string][] = [
    ['Name', msg.name],
    ['Email', msg.email],
    ['Message', msg.message],
  ]

  await send({
    to: [NOTIFY_EMAIL],
    replyTo: msg.email,
    subject: `New contact message from ${msg.name}`,
    text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
    html: `<h2>New contact message — Italy Taxi Services</h2>${table(rows)}`,
  })
}
