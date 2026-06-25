'use client'
import { useState } from 'react'

type Status = 'idle' | 'sending' | 'success' | 'error'

interface Props {
  /** className applied to inputs/textarea (lets each section keep its own look) */
  inputClass?: string
  /** className applied to the submit button */
  buttonClass?: string
  /** show field labels (Contact1 uses them, Contact2 doesn't) */
  withLabels?: boolean
  labelClass?: string
}

const blank = { name: '', email: '', phone: '', subject: '', message: '' }

export default function ContactForm({
  inputClass = 'form-control border rounded-3',
  buttonClass = 'btn btn-gradient mt-3',
  withLabels = false,
  labelClass = 'mb-1 mt-3 text-dark',
}: Props) {
  const [form, setForm] = useState(blank)
  const [status, setStatus] = useState<Status>('idle')
  const [feedback, setFeedback] = useState('')

  function set(k: keyof typeof blank, v: string) {
    setForm(p => ({ ...p, [k]: v }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending') return

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error'); setFeedback('Please fill in your name, email and message.'); return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setStatus('error'); setFeedback('Please enter a valid email address.'); return
    }

    setStatus('sending'); setFeedback('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('success')
      setFeedback('Thanks! Your message has been sent — I’ll get back to you soon.')
      setForm(blank)
    } catch (err) {
      setStatus('error')
      setFeedback(err instanceof Error ? err.message : 'Could not send your message. Please try again.')
    }
  }

  const L = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) =>
    withLabels ? <label className={labelClass} htmlFor={htmlFor}>{children} <span className="text-primary">*</span></label> : null

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className={withLabels ? 'row mt-3' : 'row g-3'}>
        <div className="col-md-6">
          <L htmlFor="cf-name">Your name</L>
          <input type="text" className={inputClass} id="cf-name" name="name" placeholder="Hamza"
            value={form.name} onChange={e => set('name', e.target.value)} aria-label="name" />
        </div>
        <div className="col-md-6">
          <L htmlFor="cf-email">Email address</L>
          <input type="email" className={inputClass} id="cf-email" name="email" placeholder="you@email.com"
            value={form.email} onChange={e => set('email', e.target.value)} aria-label="email" />
        </div>
        <div className="col-md-6">
          <L htmlFor="cf-phone">Your phone</L>
          <input type="text" className={inputClass} id="cf-phone" name="phone" placeholder="+92 300 0000000"
            value={form.phone} onChange={e => set('phone', e.target.value)} aria-label="phone" />
        </div>
        <div className="col-md-6">
          <L htmlFor="cf-subject">Subject</L>
          <input type="text" className={inputClass} id="cf-subject" name="subject" placeholder="I want to contact for…"
            value={form.subject} onChange={e => set('subject', e.target.value)} aria-label="subject" />
        </div>
        <div className="col-12">
          <L htmlFor="cf-message">Message</L>
          <textarea className={inputClass} id="cf-message" name="message" placeholder="Your message here…"
            value={form.message} onChange={e => set('message', e.target.value)} aria-label="message" rows={5} />
        </div>

        {feedback && (
          <div className="col-12">
            <div
              role="status"
              className={`mt-3 px-3 py-2 rounded-3 fw-medium ${status === 'success' ? 'text-success' : 'text-danger'}`}
              style={{
                background: status === 'success' ? 'rgba(5,150,105,.10)' : 'rgba(220,38,38,.08)',
                border: `1px solid ${status === 'success' ? 'rgba(5,150,105,.30)' : 'rgba(220,38,38,.25)'}`,
                fontSize: 14,
              }}
            >
              {feedback}
            </div>
          </div>
        )}

        <div className="col-12">
          <button type="submit" className={buttonClass} disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send Message'}
            <i className="ri-arrow-right-up-line" />
          </button>
        </div>
      </div>
    </form>
  )
}
