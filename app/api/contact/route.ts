import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'Info@hamzamanzoor.online'
// `from` must be on a domain verified in your Resend account.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Hamza Manzoor <Info@hamzamanzoor.online>'

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}
function esc(v: string) {
  return v.replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string
  ))
}

export async function POST(req: Request) {
  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  const phone = (body.phone || '').trim()
  const subject = (body.subject || '').trim()
  const message = (body.message || '').trim()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Please fill in your name, email and message.' }, { status: 400 })
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return NextResponse.json({ error: 'Email service is not configured yet.' }, { status: 500 })
  }

  const resend = new Resend(apiKey)
  const subjectLine = subject ? `New enquiry: ${subject}` : `New enquiry from ${name}`

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:#14172b">
      <h2 style="margin:0 0 16px;font-size:18px">New contact form submission</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;color:#6b7392;width:90px">Name</td><td style="padding:6px 0"><strong>${esc(name)}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#6b7392">Email</td><td style="padding:6px 0"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        ${phone ? `<tr><td style="padding:6px 0;color:#6b7392">Phone</td><td style="padding:6px 0">${esc(phone)}</td></tr>` : ''}
        ${subject ? `<tr><td style="padding:6px 0;color:#6b7392">Subject</td><td style="padding:6px 0">${esc(subject)}</td></tr>` : ''}
      </table>
      <div style="margin-top:16px;padding-top:16px;border-top:1px solid #e4e8f1">
        <div style="color:#6b7392;font-size:13px;margin-bottom:6px">Message</div>
        <div style="white-space:pre-wrap;line-height:1.6">${esc(message)}</div>
      </div>
    </div>`

  const text = `New contact form submission

Name: ${name}
Email: ${email}${phone ? `\nPhone: ${phone}` : ''}${subject ? `\nSubject: ${subject}` : ''}

Message:
${message}`

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email, // replies go straight to the visitor
      subject: subjectLine,
      html,
      text,
    })
    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Could not send your message. Please try again later.' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact send failed:', err)
    return NextResponse.json({ error: 'Could not send your message. Please try again later.' }, { status: 500 })
  }
}
