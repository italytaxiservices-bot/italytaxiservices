import nodemailer from 'nodemailer'

const smtpUser = process.env.SMTP_USER ?? ''
const smtpPass = process.env.SMTP_PASS ?? ''

const transporter = smtpUser && smtpPass
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: Number(process.env.SMTP_PORT ?? 465) === 465,
      auth: { user: smtpUser, pass: smtpPass },
    })
  : null

async function send(opts: { to: string[]; replyTo?: string; subject: string; text: string; html: string }) {
  if (!transporter) {
    console.error('SMTP not configured — skipping email:', opts.subject)
    return
  }
  await transporter.sendMail({
    from: `"Italy Taxi Services" <${smtpUser}>`,
    to: opts.to,
    replyTo: opts.replyTo || undefined,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  })
}

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
    to: ['booking@italytaxiservices.com'],
    replyTo: lead.email,
    subject: `New booking request from ${lead.name} — ${lead.pickup} → ${lead.dropoff}`,
    text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
    html: `<h2>New booking request — Italy Taxi Services</h2>${table(rows)}`,
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
    to: ['info@italytaxiservices.com'],
    replyTo: msg.email,
    subject: `New contact message from ${msg.name}`,
    text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
    html: `<h2>New contact message — Italy Taxi Services</h2>${table(rows)}`,
  })
}
