'use client'
import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { getClient, getProjects, type Client, type Project } from '@/lib/firestore'

type Theme = 'light' | 'dark'
type StatusFilter = 'all' | 'active' | 'development' | 'maintenance' | 'paused'
type SortKey = 'newest' | 'name' | 'status'
type ToastTone = 'success' | 'info' | 'warn'
interface Toast { id: number; text: string; tone: ToastTone }

const AUTO_LOCK_MS = 15 * 60 * 1000

/* ── Icons ────────────────────────────────────────────────── */
const I = {
  Sun: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  ),
  Moon: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  ),
  Chevron: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M6 9l6 6 6-6"/>
    </svg>
  ),
  Eye: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  EyeOff: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/>
    </svg>
  ),
  Copy: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  ),
  Check: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  External: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
    </svg>
  ),
  Lock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  ),
  Warn: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  Print: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
    </svg>
  ),
  LogOut: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  Expand: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  Collapse: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  ),
  X: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  ),
  Globe: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  ),
  Server: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="7" rx="2"/><rect x="2" y="14" width="20" height="7" rx="2"/>
      <line x1="6" y1="6.5" x2="6.01" y2="6.5"/><line x1="6" y1="17.5" x2="6.01" y2="17.5"/>
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Phone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  ),
  Apple: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 12.04a4.5 4.5 0 012.16-3.77 4.6 4.6 0 00-3.62-1.96c-1.52-.16-2.97.9-3.74.9-.79 0-1.96-.88-3.23-.86A4.84 4.84 0 004.4 8.87C2.66 11.9 3.95 16.36 5.63 18.8c.83 1.2 1.81 2.54 3.09 2.49 1.24-.05 1.71-.8 3.2-.8 1.5 0 1.92.8 3.23.78 1.33-.02 2.18-1.21 3-2.41a10.6 10.6 0 001.36-2.81 4.36 4.36 0 01-2.46-3.96zM14.61 4.42A4.41 4.41 0 0015.59 1a4.5 4.5 0 00-2.93 1.5 4.2 4.2 0 00-1.03 3.32 3.74 3.74 0 002.98-1.4z"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Info: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  ),
  Arrow: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
}

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
}
const listItem = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease } },
}

const statusLabel: Record<string, string> = {
  active: 'Live', development: 'In Development', maintenance: 'Maintenance', paused: 'Paused',
}
const statusDescription: Record<string, string> = {
  active: 'Up and running for your visitors',
  development: 'We are still building this',
  maintenance: 'Receiving updates and fixes',
  paused: 'On hold for now',
}
const statusColor: Record<string, string> = {
  active: '#059669', development: '#d97706', maintenance: '#2563eb', paused: '#6b7280',
}

/* ── Helpers ──────────────────────────────────────────────── */
function getInitials(name: string) {
  return name.split(' ').filter(Boolean).map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

function daysUntil(iso: string): number | null {
  if (!iso) return null
  const d = new Date(iso)
  if (isNaN(d.getTime())) return null
  const now = new Date(); now.setHours(0, 0, 0, 0)
  return Math.round((d.getTime() - now.getTime()) / 86400000)
}

function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function expiryTone(days: number | null): 'expired' | 'soon' | 'warn' | 'ok' | null {
  if (days === null) return null
  if (days < 0) return 'expired'
  if (days <= 14) return 'soon'
  if (days <= 60) return 'warn'
  return 'ok'
}

function expiryLabel(days: number | null): string {
  if (days === null) return ''
  if (days < 0) return `Expired ${Math.abs(days)}d ago`
  if (days === 0) return 'Expires today'
  if (days === 1) return 'Expires tomorrow'
  return `Expires in ${days}d`
}

function nextExpiryDays(p: Project): { days: number | null; label: string } {
  const candidates = [p.domainInfo?.expiryDate, p.hosting?.expiryDate, p.emailHosting?.expiryDate]
    .map(daysUntil).filter((d): d is number => d !== null)
  if (!candidates.length) return { days: null, label: '' }
  const min = Math.min(...candidates)
  return { days: min, label: expiryLabel(min) }
}

interface RenewalItem {
  key: string; projectId: string; projectName: string;
  kind: 'Domain' | 'Hosting' | 'Email'; iso: string; days: number;
}
function collectRenewals(projects: Project[], windowDays = 90): RenewalItem[] {
  const out: RenewalItem[] = []
  projects.forEach(p => {
    const pid = p.id || p.name
    const checks: [RenewalItem['kind'], string | undefined][] = [
      ['Domain', p.domainInfo?.expiryDate],
      ['Hosting', p.hosting?.expiryDate],
      ['Email', p.emailHosting?.expiryDate],
    ]
    checks.forEach(([kind, iso]) => {
      if (!iso) return
      const days = daysUntil(iso)
      if (days === null || days > windowDays) return
      out.push({ key: `${pid}-${kind}`, projectId: pid, projectName: p.name, kind, iso, days })
    })
  })
  return out.sort((a, b) => a.days - b.days)
}

const sectionMeta: Record<string, { subtitle: string }> = {
  Website:             { subtitle: 'Your public site address' },
  'Quick Access':      { subtitle: 'One-click logins to everything you own' },
  'Domain Registrar':  { subtitle: 'Where the domain name is registered' },
  'Web Hosting':       { subtitle: 'Where your website is stored online' },
  'App Stores':        { subtitle: 'Where your mobile app is listed' },
  Database:            { subtitle: 'Where your app data lives' },
  'Email Hosting':     { subtitle: 'Your business email service' },
  'Tech Stack':        { subtitle: 'The technologies we built it with' },
  'Social Media':      { subtitle: 'Your social accounts and logins' },
  'Services & APIs':   { subtitle: 'Connected third-party tools' },
  'Business Email Accounts': { subtitle: 'Email addresses on your domain' },
  'Additional Information':  { subtitle: 'Other details we track for you' },
  Notes:               { subtitle: 'Project notes from our team' },
}

/* ── SectionHeader ───────────────────────────────────────── */
function SectionHeader({ icon, title }: { icon: string; title: string }) {
  const sub = sectionMeta[title]?.subtitle
  return (
    <div className="pcl-section-header">
      <div className="pcl-section-icon">{icon}</div>
      <div className="pcl-section-titles">
        <div className="pcl-section-title">{title}</div>
        {sub && <div className="pcl-section-sub">{sub}</div>}
      </div>
    </div>
  )
}

/* ── QuickActionCard ─────────────────────────────────────── */
function QuickActionCard({
  href, icon, label, sub, tone = 'default',
}: { href: string; icon: React.ReactNode; label: string; sub: string; tone?: 'default' | 'website' | 'host' | 'domain' | 'mail' | 'play' | 'apple' }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`pcl-qa-card pcl-qa-${tone}`}>
      <span className="pcl-qa-icon">{icon}</span>
      <span className="pcl-qa-body">
        <span className="pcl-qa-label">{label}</span>
        <span className="pcl-qa-sub">{sub}</span>
      </span>
      <span className="pcl-qa-arrow"><I.Arrow/></span>
    </a>
  )
}

/* ── CredValue: masked + reveal + copy ───────────────────── */
function CredValue({
  value, copyKey, masked = true, copy, revealed, toggleReveal,
}: {
  value: string; copyKey: string; masked?: boolean
  copy: (v: string, k: string) => void
  revealed: Record<string, boolean>
  toggleReveal: (k: string) => void
}) {
  const isRevealed = !masked || !!revealed[copyKey]
  return (
    <span className="pcl-cred-row">
      <span className={`pcl-cred ${isRevealed ? '' : 'pcl-cred-masked'}`}>
        {isRevealed ? value : '••••••••••••'}
      </span>
      {masked && (
        <button
          type="button"
          className="pcl-cred-eye"
          onClick={() => toggleReveal(copyKey)}
          aria-label={isRevealed ? 'Hide' : 'Reveal'}
          title={isRevealed ? 'Hide' : 'Reveal'}
        >
          {isRevealed ? <I.EyeOff/> : <I.Eye/>}
        </button>
      )}
      <button
        type="button"
        className="pcl-copy-inline"
        onClick={() => copy(value, copyKey)}
        aria-label="Copy"
        title="Copy"
      >
        <I.Copy/>
      </button>
    </span>
  )
}

/* ── LinkValue ───────────────────────────────────────────── */
function LinkValue({ url }: { url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="pcl-ext-link">
      <span className="pcl-ext-url">{url}</span>
      <I.External/>
    </a>
  )
}

/* ── ExpiryBadge ─────────────────────────────────────────── */
function ExpiryBadge({ iso, compact = false }: { iso: string; compact?: boolean }) {
  const days = daysUntil(iso)
  const tone = expiryTone(days)
  if (!tone || tone === 'ok') return null
  return (
    <span className={`pcl-expiry-pill pcl-expiry-${tone} ${compact ? 'pcl-expiry-compact' : ''}`}>
      <I.Warn/>
      {compact ? expiryLabel(days).replace('Expires ', '') : expiryLabel(days)}
    </span>
  )
}

export default function ClientPortal() {
  const { clientId } = useParams() as { clientId: string }
  const [step, setStep] = useState<'loading' | 'password' | 'view' | 'error'>('loading')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [pwdError, setPwdError] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [client, setClient] = useState<Client | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')
  const [theme, setTheme] = useState<Theme>('light')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sortBy, setSortBy] = useState<SortKey>('newest')
  const [sortOpen, setSortOpen] = useState(false)
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const [toasts, setToasts] = useState<Toast[]>([])
  const [scrolled, setScrolled] = useState(false)
  const [welcomeOpen, setWelcomeOpen] = useState(false)
  const [renewalsCollapsed, setRenewalsCollapsed] = useState(false)
  const searchRef = useRef<HTMLInputElement | null>(null)
  const inactivityRef = useRef<number | null>(null)
  const toastIdRef = useRef(1)

  const pushToast = useCallback((text: string, tone: ToastTone = 'success') => {
    const id = toastIdRef.current++
    setToasts(prev => [...prev, { id, text, tone }])
    window.setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2200)
  }, [])

  const loadAndShow = useCallback(async () => {
    const [c, p] = await Promise.all([getClient(clientId), getProjects(clientId)])
    if (!c) { setStep('error'); return }
    setClient(c); setProjects(p); setStep('view')
  }, [clientId])

  /* Theme bootstrap */
  useEffect(() => {
    const saved = localStorage.getItem('pcl-theme') as Theme | null
    if (saved === 'light' || saved === 'dark') setTheme(saved)
    else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) setTheme('dark')
  }, [])

  /* Auth bootstrap */
  useEffect(() => {
    const wasAuth = sessionStorage.getItem(`portal-${clientId}`) === '1'
    if (wasAuth) loadAndShow(); else setStep('password')
  }, [clientId, loadAndShow])

  /* Welcome banner bootstrap (once per client) */
  useEffect(() => {
    const dismissed = localStorage.getItem(`pcl-welcome-${clientId}`) === '1'
    setWelcomeOpen(!dismissed)
  }, [clientId])

  function dismissWelcome() {
    localStorage.setItem(`pcl-welcome-${clientId}`, '1')
    setWelcomeOpen(false)
  }

  /* Scroll detection for sticky header */
  useEffect(() => {
    if (step !== 'view') return
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [step])

  /* Auto-lock on inactivity */
  const resetInactivity = useCallback(() => {
    if (inactivityRef.current) window.clearTimeout(inactivityRef.current)
    inactivityRef.current = window.setTimeout(() => {
      sessionStorage.removeItem(`portal-${clientId}`)
      setRevealed({})
      setExpanded(new Set())
      setStep('password')
      setPassword('')
      pushToast('Session locked due to inactivity', 'warn')
    }, AUTO_LOCK_MS)
  }, [clientId, pushToast])

  useEffect(() => {
    if (step !== 'view') return
    resetInactivity()
    const events: (keyof WindowEventMap)[] = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']
    events.forEach(e => window.addEventListener(e, resetInactivity, { passive: true }))
    return () => {
      events.forEach(e => window.removeEventListener(e, resetInactivity))
      if (inactivityRef.current) window.clearTimeout(inactivityRef.current)
    }
  }, [step, resetInactivity])

  /* Keyboard shortcuts */
  useEffect(() => {
    if (step !== 'view') return
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const inField = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA'
      if (e.key === '/' && !inField) {
        e.preventDefault(); searchRef.current?.focus()
      } else if (e.key === 'Escape') {
        if (inField && target === searchRef.current) {
          setSearch(''); ;(target as HTMLInputElement).blur()
        } else if (expanded.size > 0) setExpanded(new Set())
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step, expanded])

  function toggleTheme() {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('pcl-theme', next)
  }

  const isDark = theme === 'dark'

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault()
    setVerifying(true); setPwdError('')
    try {
      const c = await getClient(clientId)
      if (!c) { setStep('error'); return }
      if (password !== c.portalPassword) {
        setPwdError('Incorrect password. Please try again.')
        setVerifying(false); return
      }
      setClient(c)
      const p = await getProjects(clientId)
      setProjects(p)
      sessionStorage.setItem(`portal-${clientId}`, '1')
      setStep('view')
    } catch { setStep('error') }
  }

  function copy(text: string, _key?: string) {
    void _key
    if (!text) return
    navigator.clipboard?.writeText(text).then(
      () => pushToast('Copied to clipboard'),
      () => pushToast('Copy failed', 'warn')
    )
  }

  function toggleReveal(key: string) {
    setRevealed(r => ({ ...r, [key]: !r[key] }))
  }

  function toggleExpand(id: string) {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function expandAll() { setExpanded(new Set(filteredProjects.map(p => p.id!).filter(Boolean))) }
  function collapseAll() { setExpanded(new Set()) }

  function lockNow() {
    sessionStorage.removeItem(`portal-${clientId}`)
    setRevealed({})
    setExpanded(new Set())
    setPassword('')
    setStep('password')
  }

  function printPortal() { window.print() }

  /* Filter + sort */
  const filteredProjects = useMemo(() => {
    let list = projects
    if (statusFilter !== 'all') list = list.filter(p => p.status === statusFilter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.domain?.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q) ||
        p.techStack?.some(t => t.toLowerCase().includes(q))
      )
    }
    const sorted = [...list]
    if (sortBy === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name))
    else if (sortBy === 'status') {
      const order = { active: 0, development: 1, maintenance: 2, paused: 3 } as Record<string, number>
      sorted.sort((a, b) => (order[a.status] ?? 99) - (order[b.status] ?? 99))
    }
    return sorted
  }, [projects, search, statusFilter, sortBy])

  const activeCount = projects.filter(p => p.status === 'active').length
  const devCount    = projects.filter(p => p.status === 'development').length
  const maintCount  = projects.filter(p => p.status === 'maintenance').length
  const pausedCount = projects.filter(p => p.status === 'paused').length

  const expiringSoon = useMemo(() => projects.filter(p => {
    const { days } = nextExpiryDays(p)
    return days !== null && days <= 30
  }).length, [projects])

  const renewals = useMemo(() => collectRenewals(projects, 90), [projects])

  const stylesheet = <link rel="stylesheet" href="/styles/portal-client.css" />

  /* Toasts portal */
  const ToastStack = (
    <div className="pcl-toast-stack" aria-live="polite">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            className={`pcl-toast pcl-toast-${t.tone}`}
            initial={{ opacity: 0, y: -14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.25, ease }}
          >
            <span className="pcl-toast-icon">
              {t.tone === 'warn' ? <I.Warn/> : <I.Check/>}
            </span>
            <span>{t.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )

  /* ── Loading ── */
  if (step === 'loading') return (
    <>
      {stylesheet}
      <div data-theme={theme}>
        <motion.div className="pcl-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.05 }}>
            <div className="pcl-spinner"/>
          </motion.div>
          <motion.div className="pcl-loading-text" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}>
            Loading your portal…
          </motion.div>
        </motion.div>
        <motion.button className="pcl-theme-float" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, type: 'spring', damping: 15 }} onClick={toggleTheme} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Toggle theme">
          {isDark ? <I.Sun/> : <I.Moon/>}
        </motion.button>
      </div>
    </>
  )

  /* ── Error ── */
  if (step === 'error') return (
    <>
      {stylesheet}
      <div data-theme={theme}>
        <motion.div className="pcl-center pcl-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <motion.div className="pcl-error-icon" initial={{ scale: 0.5, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', damping: 12, delay: 0.1 }}>⚠️</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Portal Not Found</motion.h2>
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>This link may be invalid or expired. Please contact your team.</motion.p>
        </motion.div>
        <motion.button className="pcl-theme-float" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} onClick={toggleTheme} aria-label="Toggle theme">
          {isDark ? <I.Sun/> : <I.Moon/>}
        </motion.button>
      </div>
    </>
  )

  /* ── Password Screen ── */
  if (step === 'password') return (
    <>
      {stylesheet}
      <div data-theme={theme}>
        <div className="pcl-auth-page">
          <div className="pcl-orbs" aria-hidden="true">
            <motion.div className="pcl-orb pcl-orb-1" animate={{ y: [-25, 25, -25], scale: [1, 1.08, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}/>
            <motion.div className="pcl-orb pcl-orb-2" animate={{ y: [20, -30, 20], x: [-15, 15, -15] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}/>
            <motion.div className="pcl-orb pcl-orb-3" animate={{ y: [-18, 22, -18], x: [12, -12, 12] }} transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut' }}/>
          </div>

          <motion.div className="pcl-auth-card" initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.55, ease }}>
            <motion.div className="pcl-auth-logo" initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.2, type: 'spring', damping: 10, stiffness: 180 }}>
              <I.Lock/>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.45, ease }}>
              Client Portal
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.4, ease }}>
              Enter your password to access your projects
            </motion.p>

            <motion.form className="pcl-auth-form" onSubmit={handlePassword} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.4, ease }}>
              <div className="pcl-pwd-wrap">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password…"
                  required autoFocus autoComplete="current-password"
                />
                <button type="button" className="pcl-pwd-toggle" onClick={() => setShowPwd(v => !v)} aria-label="Toggle visibility">
                  {showPwd ? <I.EyeOff/> : <I.Eye/>}
                </button>
              </div>

              <AnimatePresence>
                {pwdError && (
                  <motion.div className="pcl-auth-error" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.28 }}>
                    <motion.div style={{ display: 'flex', alignItems: 'center', gap: 8 }} animate={{ x: [-8, 8, -6, 6, -3, 3, 0] }} transition={{ duration: 0.5 }}>
                      <I.Warn/>
                      {pwdError}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button type="submit" className="pcl-auth-submit" disabled={verifying} whileHover={!verifying ? { scale: 1.02, y: -1 } : {}} whileTap={!verifying ? { scale: 0.98 } : {}}>
                {verifying
                  ? <span className="pcl-btn-loading"><span className="pcl-btn-spinner"/>Verifying…</span>
                  : 'Access Portal →'
                }
              </motion.button>
            </motion.form>

            <motion.p className="pcl-auth-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.58, duration: 0.5 }}>
              <I.Lock/> <span>This portal contains confidential project information.</span>
            </motion.p>
          </motion.div>

          <motion.button className="pcl-theme-float" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: 'spring', damping: 15 }} onClick={toggleTheme} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }} aria-label="Toggle theme">
            {isDark ? <I.Sun/> : <I.Moon/>}
          </motion.button>
        </div>
      </div>
    </>
  )

  /* ── Main Portal ── */
  return (
    <>
      {stylesheet}
      <div data-theme={theme}>
        {ToastStack}
        <motion.div className="pcl-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>

          {/* Header */}
          <motion.header className={`pcl-header ${scrolled ? 'pcl-header-condensed' : ''}`} initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease }}>
            <div className="pcl-header-inner">
              <motion.div className="pcl-company-avatar" initial={{ scale: 0, rotate: -20, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ delay: 0.1, type: 'spring', damping: 12, stiffness: 200 }}>
                {getInitials(client?.company || 'C')}
              </motion.div>
              <motion.div className="pcl-header-info" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.5, ease }}>
                <h1>{client?.company}</h1>
                <p>{client?.name} · Client Project Portal</p>
              </motion.div>
              <motion.div className="pcl-header-right" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5, ease }}>
                <motion.button className="pcl-icon-btn pcl-no-print" onClick={printPortal} aria-label="Print portal" title="Print"
                  initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.36, type: 'spring', damping: 12 }}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}>
                  <I.Print/>
                </motion.button>
                <motion.button className="pcl-icon-btn pcl-no-print" onClick={lockNow} aria-label="Lock portal" title="Lock portal"
                  initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4, type: 'spring', damping: 12 }}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}>
                  <I.LogOut/>
                </motion.button>
                <motion.button className="pcl-icon-btn pcl-no-print" onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme"
                  initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.44, type: 'spring', damping: 12 }}
                  whileHover={{ scale: 1.12, rotate: 12 }} whileTap={{ scale: 0.9 }}>
                  <AnimatePresence mode="wait">
                    <motion.span key={isDark ? 'sun' : 'moon'} initial={{ opacity: 0, rotate: -90, scale: 0.7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0.7 }} transition={{ duration: 0.22 }} style={{ display: 'flex' }}>
                      {isDark ? <I.Sun/> : <I.Moon/>}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </div>

            {/* Stat strip */}
            {projects.length > 0 && (
              <motion.div className="pcl-stat-strip" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.45, ease }}>
                <div className="pcl-stat-card">
                  <div className="pcl-stat-num">{projects.length}</div>
                  <div className="pcl-stat-lbl">Total projects</div>
                </div>
                <div className="pcl-stat-card pcl-stat-active">
                  <div className="pcl-stat-num">{activeCount}</div>
                  <div className="pcl-stat-lbl">Live</div>
                </div>
                <div className="pcl-stat-card pcl-stat-dev">
                  <div className="pcl-stat-num">{devCount}</div>
                  <div className="pcl-stat-lbl">In development</div>
                </div>
                {expiringSoon > 0 && (
                  <div className="pcl-stat-card pcl-stat-warn">
                    <div className="pcl-stat-num">{expiringSoon}</div>
                    <div className="pcl-stat-lbl">Expiring ≤ 30d</div>
                  </div>
                )}
              </motion.div>
            )}
          </motion.header>

          {/* Welcome banner */}
          <AnimatePresence>
            {welcomeOpen && projects.length > 0 && (
              <motion.div
                className="pcl-welcome pcl-no-print"
                initial={{ opacity: 0, y: -12, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.32, ease }}
              >
                <div className="pcl-welcome-inner">
                  <div className="pcl-welcome-icon"><I.Info/></div>
                  <div className="pcl-welcome-body">
                    <h3>Welcome{client?.name ? `, ${client.name.split(' ')[0]}` : ''}</h3>
                    <p>
                      Every card below is one of your projects.
                      {renewals.length > 0 ? ' Anything renewing soon is shown above so you don\'t miss it.' : ''}
                    </p>
                  </div>
                  <button className="pcl-welcome-close" onClick={dismissWelcome} aria-label="Dismiss"><I.X/></button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Renewals coming up */}
          {renewals.length > 0 && (
            <motion.div
              className="pcl-renewals pcl-no-print"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.4, ease }}
            >
              <div className="pcl-renewals-inner">
                <button
                  className="pcl-renewals-head"
                  onClick={() => setRenewalsCollapsed(v => !v)}
                  aria-expanded={!renewalsCollapsed}
                >
                  <span className="pcl-renewals-icon"><I.Calendar/></span>
                  <span className="pcl-renewals-titles">
                    <strong>Coming up</strong>
                    <span>{renewals.length} renewal{renewals.length === 1 ? '' : 's'} in the next 90 days</span>
                  </span>
                  <motion.span animate={{ rotate: renewalsCollapsed ? 0 : 180 }} transition={{ duration: 0.25 }} className="pcl-renewals-chev">
                    <I.Chevron/>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {!renewalsCollapsed && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <ul className="pcl-renewals-list">
                        {renewals.map(r => {
                          const tone = expiryTone(r.days) || 'ok'
                          return (
                            <li key={r.key} className={`pcl-renewals-item pcl-renewals-${tone}`}>
                              <button
                                className="pcl-renewals-row"
                                onClick={() => {
                                  setExpanded(prev => { const n = new Set(prev); n.add(r.projectId); return n })
                                  document.getElementById(`pcl-proj-${r.projectId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                }}
                              >
                                <span className="pcl-renewals-kind">{r.kind}</span>
                                <span className="pcl-renewals-name">{r.projectName}</span>
                                <span className="pcl-renewals-date">{formatDate(r.iso)}</span>
                                <span className={`pcl-renewals-days pcl-renewals-days-${tone}`}>
                                  {r.days < 0 ? `${Math.abs(r.days)}d ago` : r.days === 0 ? 'Today' : `in ${r.days}d`}
                                </span>
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Toolbar */}
          {projects.length > 0 && (
            <motion.div className="pcl-toolbar pcl-no-print" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.45, ease }}>
              <div className="pcl-toolbar-inner">
                <div className="pcl-search">
                  <I.Search/>
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search projects, domains, tech…"
                  />
                  <kbd className="pcl-kbd">/</kbd>
                </div>

                <div className="pcl-filter-row">
                  {([
                    ['all', `All · ${projects.length}`],
                    ['active', `Live · ${activeCount}`],
                    ['development', `Dev · ${devCount}`],
                    ['maintenance', `Maint · ${maintCount}`],
                    ['paused', `Paused · ${pausedCount}`],
                  ] as [StatusFilter, string][]).filter(([k]) => {
                    if (k === 'all') return true
                    if (k === 'active') return activeCount > 0
                    if (k === 'development') return devCount > 0
                    if (k === 'maintenance') return maintCount > 0
                    if (k === 'paused') return pausedCount > 0
                    return false
                  }).map(([k, lbl]) => (
                    <button
                      key={k}
                      className={`pcl-chip ${statusFilter === k ? 'pcl-chip-on' : ''} pcl-chip-${k}`}
                      onClick={() => setStatusFilter(k)}
                    >
                      {k !== 'all' && <span className={`pcl-chip-dot pcl-chip-dot-${k}`}/>}
                      {lbl}
                    </button>
                  ))}
                </div>

                <div className="pcl-toolbar-actions">
                  <div className="pcl-sort">
                    <button className="pcl-sort-btn" onClick={() => setSortOpen(v => !v)}>
                      Sort: <strong>{sortBy === 'newest' ? 'Newest' : sortBy === 'name' ? 'Name' : 'Status'}</strong>
                      <I.Chevron/>
                    </button>
                    <AnimatePresence>
                      {sortOpen && (
                        <>
                          <div className="pcl-sort-scrim" onClick={() => setSortOpen(false)}/>
                          <motion.div
                            className="pcl-sort-menu"
                            initial={{ opacity: 0, y: -6, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.98 }}
                            transition={{ duration: 0.18 }}
                          >
                            {([['newest', 'Newest first'], ['name', 'Name A–Z'], ['status', 'Status']] as [SortKey, string][]).map(([k, lbl]) => (
                              <button
                                key={k}
                                className={`pcl-sort-item ${sortBy === k ? 'pcl-sort-item-on' : ''}`}
                                onClick={() => { setSortBy(k); setSortOpen(false) }}
                              >
                                {sortBy === k && <I.Check/>}
                                <span>{lbl}</span>
                              </button>
                            ))}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  {filteredProjects.length > 0 && (
                    <button
                      className="pcl-action-btn"
                      onClick={expanded.size === filteredProjects.length ? collapseAll : expandAll}
                      title={expanded.size === filteredProjects.length ? 'Collapse all' : 'Expand all'}
                    >
                      {expanded.size === filteredProjects.length ? <I.Collapse/> : <I.Expand/>}
                      <span>{expanded.size === filteredProjects.length ? 'Collapse all' : 'Expand all'}</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Projects */}
          <main className="pcl-main">
            <AnimatePresence mode="wait">
              {filteredProjects.length === 0 ? (
                <motion.div key="empty" className="pcl-empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                  <div className="pcl-empty-icon">{search || statusFilter !== 'all' ? '🔍' : '📭'}</div>
                  <p>{search || statusFilter !== 'all' ? 'No projects match your filters.' : 'No projects yet. Please contact your team.'}</p>
                  {(search || statusFilter !== 'all') && (
                    <button className="pcl-action-btn" onClick={() => { setSearch(''); setStatusFilter('all') }}>Clear filters</button>
                  )}
                </motion.div>
              ) : (
                <motion.div key="list" className="pcl-projects" variants={listContainer} initial="hidden" animate="visible">
                  {filteredProjects.map(proj => {
                    const isOpen = expanded.has(proj.id!)
                    const expiry = nextExpiryDays(proj)
                    return (
                      <motion.div key={proj.id} id={`pcl-proj-${proj.id}`} className={`pcl-project pcl-project-${proj.status}`} variants={listItem} whileHover={{ y: -2, transition: { duration: 0.2 } }}>

                        <div className="pcl-proj-head" onClick={() => toggleExpand(proj.id!)}>
                          <div className="pcl-proj-head-left">
                            <div className={`pcl-status-dot pcl-status-dot-${proj.status}`}/>
                            <div className="pcl-proj-name-wrap">
                              <h2>{proj.name}</h2>
                              <div className="pcl-proj-meta">
                                {proj.domain && (
                                  <a href={`https://${proj.domain}`} target="_blank" rel="noopener noreferrer" className="pcl-domain-small" onClick={e => e.stopPropagation()}>
                                    {proj.domain}
                                  </a>
                                )}
                                {expiry.days !== null && expiry.days <= 60 && (
                                  <span className={`pcl-expiry-pill pcl-expiry-${expiryTone(expiry.days)} pcl-expiry-compact`}>
                                    <I.Warn/>{expiry.label}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="pcl-proj-head-right">
                            <span className="pcl-badge-type">{proj.type}</span>
                            <span className="pcl-badge-status" style={{ color: statusColor[proj.status], borderColor: statusColor[proj.status] + '40' }}>
                              <span className={`pcl-status-dot pcl-status-dot-${proj.status}`} style={{ width: 6, height: 6 }}/>
                              {statusLabel[proj.status]}
                            </span>
                            <motion.button className="pcl-toggle-btn" aria-label="Toggle details" animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>
                              <I.Chevron/>
                            </motion.button>
                          </div>
                        </div>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} style={{ overflow: 'hidden' }}>
                              <motion.div className="pcl-proj-body" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.3 }}>

                                {/* Status summary line */}
                                <div className="pcl-status-line">
                                  <span className={`pcl-status-pill pcl-status-pill-${proj.status}`}>
                                    <span className={`pcl-status-dot pcl-status-dot-${proj.status}`}/>
                                    {statusLabel[proj.status]}
                                  </span>
                                  <span className="pcl-status-desc">{statusDescription[proj.status]}</span>
                                </div>

                                {/* Quick Access — one-tap logins */}
                                {(proj.domain || proj.hosting?.loginUrl || proj.domainInfo?.loginUrl || proj.emailHosting?.loginUrl || proj.appStores?.playStoreUrl || proj.appStores?.appStoreUrl) && (
                                  <div className="pcl-section">
                                    <SectionHeader icon="⚡" title="Quick Access"/>
                                    <div className="pcl-qa-grid">
                                      {proj.domain && (
                                        <QuickActionCard tone="website" href={`https://${proj.domain}`} icon={<I.Globe/>}
                                          label="Visit Website" sub={proj.domain}/>
                                      )}
                                      {proj.hosting?.loginUrl && (
                                        <QuickActionCard tone="host" href={proj.hosting.loginUrl} icon={<I.Server/>}
                                          label="Open Hosting" sub={proj.hosting.provider || 'Login to manage hosting'}/>
                                      )}
                                      {proj.domainInfo?.loginUrl && (
                                        <QuickActionCard tone="domain" href={proj.domainInfo.loginUrl} icon={<I.Globe/>}
                                          label="Open Domain Panel" sub={proj.domainInfo.registrar || 'Login to manage domain'}/>
                                      )}
                                      {proj.emailHosting?.loginUrl && (
                                        <QuickActionCard tone="mail" href={proj.emailHosting.loginUrl} icon={<I.Mail/>}
                                          label="Open Email Admin" sub={proj.emailHosting.provider || 'Manage email accounts'}/>
                                      )}
                                      {proj.appStores?.playStoreUrl && (
                                        <QuickActionCard tone="play" href={proj.appStores.playStoreUrl} icon={<I.Phone/>}
                                          label="Google Play" sub="Public app listing"/>
                                      )}
                                      {proj.appStores?.appStoreUrl && (
                                        <QuickActionCard tone="apple" href={proj.appStores.appStoreUrl} icon={<I.Apple/>}
                                          label="App Store" sub="Public app listing"/>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {/* Website */}
                                {proj.domain && (
                                  <div className="pcl-section">
                                    <SectionHeader icon="🔗" title="Website"/>
                                    <div className="pcl-domain-row">
                                      <a href={`https://${proj.domain}`} target="_blank" rel="noopener noreferrer" className="pcl-domain-link">
                                        {proj.domain}<I.External/>
                                      </a>
                                      <button className="pcl-copy-btn" onClick={() => copy(proj.domain, `d-${proj.id}`)}>
                                        <I.Copy/> Copy URL
                                      </button>
                                    </div>
                                  </div>
                                )}

                                {/* Domain Registrar */}
                                {(proj.domainInfo?.registrar || proj.domainInfo?.loginUrl) && (
                                  <div className="pcl-section">
                                    <SectionHeader icon="🌍" title="Domain Registrar"/>
                                    <div className="pcl-info-grid">
                                      {proj.domainInfo.registrar && <div className="pcl-info-item"><span>Registrar</span><strong>{proj.domainInfo.registrar}</strong></div>}
                                      {proj.domainInfo.expiryDate && <div className="pcl-info-item"><span>Expiry Date</span><strong>{formatDate(proj.domainInfo.expiryDate)}<ExpiryBadge iso={proj.domainInfo.expiryDate} compact/></strong></div>}
                                      {proj.domainInfo.autoRenew && <div className="pcl-info-item"><span>Auto Renew</span><strong>{proj.domainInfo.autoRenew}</strong></div>}
                                      {proj.domainInfo.loginUrl && <div className="pcl-info-item pcl-info-full"><span>Login URL</span><strong><LinkValue url={proj.domainInfo.loginUrl}/></strong></div>}
                                      {proj.domainInfo.username && <div className="pcl-info-item"><span>Username</span><strong><CredValue value={proj.domainInfo.username} masked={false} copyKey={`du-${proj.id}`} copy={copy} revealed={revealed} toggleReveal={toggleReveal}/></strong></div>}
                                      {proj.domainInfo.password && <div className="pcl-info-item"><span>Password</span><strong><CredValue value={proj.domainInfo.password} copyKey={`dp-${proj.id}`} copy={copy} revealed={revealed} toggleReveal={toggleReveal}/></strong></div>}
                                    </div>
                                  </div>
                                )}

                                {/* Web Hosting */}
                                {(proj.hosting?.provider || proj.hosting?.loginUrl) && (
                                  <div className="pcl-section">
                                    <SectionHeader icon="🌐" title="Web Hosting"/>
                                    <div className="pcl-info-grid">
                                      {proj.hosting.provider && <div className="pcl-info-item"><span>Provider</span><strong>{proj.hosting.provider}</strong></div>}
                                      {proj.hosting.plan && <div className="pcl-info-item"><span>Plan</span><strong>{proj.hosting.plan}</strong></div>}
                                      {proj.hosting.expiryDate && <div className="pcl-info-item"><span>Expiry Date</span><strong>{formatDate(proj.hosting.expiryDate)}<ExpiryBadge iso={proj.hosting.expiryDate} compact/></strong></div>}
                                      {proj.hosting.cost && <div className="pcl-info-item"><span>Cost</span><strong>{proj.hosting.cost}</strong></div>}
                                      {proj.hosting.loginUrl && <div className="pcl-info-item pcl-info-full"><span>Login URL</span><strong><LinkValue url={proj.hosting.loginUrl}/></strong></div>}
                                      {proj.hosting.username && <div className="pcl-info-item"><span>Username</span><strong><CredValue value={proj.hosting.username} masked={false} copyKey={`hu-${proj.id}`} copy={copy} revealed={revealed} toggleReveal={toggleReveal}/></strong></div>}
                                      {proj.hosting.password && <div className="pcl-info-item"><span>Password</span><strong><CredValue value={proj.hosting.password} copyKey={`hp-${proj.id}`} copy={copy} revealed={revealed} toggleReveal={toggleReveal}/></strong></div>}
                                    </div>
                                  </div>
                                )}

                                {/* App Stores */}
                                {(proj.appStores?.playStoreUrl || proj.appStores?.appStoreUrl || proj.appStores?.playStoreAccount) && (
                                  <div className="pcl-section">
                                    <SectionHeader icon="📱" title="App Stores"/>
                                    <div className="pcl-info-grid">
                                      {proj.appStores.playStoreUrl && <div className="pcl-info-item pcl-info-full"><span>Google Play Store</span><strong><LinkValue url={proj.appStores.playStoreUrl}/></strong></div>}
                                      {proj.appStores.playStoreAccount && <div className="pcl-info-item"><span>Play Console Account</span><strong><CredValue value={proj.appStores.playStoreAccount} masked={false} copyKey={`gpa-${proj.id}`} copy={copy} revealed={revealed} toggleReveal={toggleReveal}/></strong></div>}
                                      {proj.appStores.playStorePassword && <div className="pcl-info-item"><span>Play Console Password</span><strong><CredValue value={proj.appStores.playStorePassword} copyKey={`gpp-${proj.id}`} copy={copy} revealed={revealed} toggleReveal={toggleReveal}/></strong></div>}
                                      {proj.appStores.appStoreUrl && <div className="pcl-info-item pcl-info-full"><span>Apple App Store</span><strong><LinkValue url={proj.appStores.appStoreUrl}/></strong></div>}
                                      {proj.appStores.appStoreAccount && <div className="pcl-info-item"><span>Apple ID / Dev Account</span><strong><CredValue value={proj.appStores.appStoreAccount} masked={false} copyKey={`apa-${proj.id}`} copy={copy} revealed={revealed} toggleReveal={toggleReveal}/></strong></div>}
                                      {proj.appStores.appStorePassword && <div className="pcl-info-item"><span>Apple Account Password</span><strong><CredValue value={proj.appStores.appStorePassword} copyKey={`app-${proj.id}`} copy={copy} revealed={revealed} toggleReveal={toggleReveal}/></strong></div>}
                                    </div>
                                  </div>
                                )}

                                {/* Database */}
                                {(proj.database?.type || proj.database?.provider) && (
                                  <div className="pcl-section">
                                    <SectionHeader icon="🗄️" title="Database"/>
                                    <div className="pcl-info-grid">
                                      {proj.database.type && <div className="pcl-info-item"><span>Type</span><strong>{proj.database.type}</strong></div>}
                                      {proj.database.provider && <div className="pcl-info-item"><span>Provider</span><strong>{proj.database.provider}</strong></div>}
                                      {proj.database.notes && <div className="pcl-info-item pcl-info-full"><span>Notes</span><strong style={{whiteSpace:'pre-wrap',fontFamily:'inherit',fontWeight:400,fontSize:'13px'}}>{proj.database.notes}</strong></div>}
                                    </div>
                                  </div>
                                )}

                                {/* Email Hosting */}
                                {(proj.emailHosting?.provider || proj.emailHosting?.loginUrl) && (
                                  <div className="pcl-section">
                                    <SectionHeader icon="📧" title="Email Hosting"/>
                                    <div className="pcl-info-grid">
                                      {proj.emailHosting.provider && <div className="pcl-info-item"><span>Provider</span><strong>{proj.emailHosting.provider}</strong></div>}
                                      {proj.emailHosting.plan && <div className="pcl-info-item"><span>Plan</span><strong>{proj.emailHosting.plan}</strong></div>}
                                      {proj.emailHosting.expiryDate && <div className="pcl-info-item"><span>Expiry Date</span><strong>{formatDate(proj.emailHosting.expiryDate)}<ExpiryBadge iso={proj.emailHosting.expiryDate} compact/></strong></div>}
                                      {proj.emailHosting.cost && <div className="pcl-info-item"><span>Cost</span><strong>{proj.emailHosting.cost}</strong></div>}
                                      {proj.emailHosting.loginUrl && <div className="pcl-info-item pcl-info-full"><span>Admin Login URL</span><strong><LinkValue url={proj.emailHosting.loginUrl}/></strong></div>}
                                      {proj.emailHosting.adminEmail && <div className="pcl-info-item"><span>Admin Email</span><strong><CredValue value={proj.emailHosting.adminEmail} masked={false} copyKey={`ehe-${proj.id}`} copy={copy} revealed={revealed} toggleReveal={toggleReveal}/></strong></div>}
                                      {proj.emailHosting.adminPassword && <div className="pcl-info-item"><span>Admin Password</span><strong><CredValue value={proj.emailHosting.adminPassword} copyKey={`ehp-${proj.id}`} copy={copy} revealed={revealed} toggleReveal={toggleReveal}/></strong></div>}
                                    </div>
                                  </div>
                                )}

                                {/* Tech Stack */}
                                {proj.techStack?.length > 0 && (
                                  <div className="pcl-section">
                                    <SectionHeader icon="⚡" title="Tech Stack"/>
                                    <div className="pcl-tech-tags">
                                      {proj.techStack.map(t => <span key={t} className="pcl-tech-tag">{t}</span>)}
                                    </div>
                                  </div>
                                )}

                                {/* Social Media */}
                                {proj.socialAccounts?.length > 0 && (
                                  <div className="pcl-section">
                                    <SectionHeader icon="📲" title="Social Media"/>
                                    {proj.socialAccounts.map((s, i) => (
                                      <div key={i} className="pcl-email-row">
                                        <div className="pcl-email-left">
                                          <strong>{s.platform}</strong>
                                          {s.url && <a href={s.url} target="_blank" rel="noopener noreferrer" className="pcl-email-provider">{s.url}</a>}
                                          {s.username && <span className="pcl-email-tag">@{s.username}</span>}
                                          {s.email && <span className="pcl-email-provider">{s.email}</span>}
                                        </div>
                                        {s.password && (
                                          <div className="pcl-email-right">
                                            <CredValue value={s.password} copyKey={`sp-${i}-${proj.id}`} copy={copy} revealed={revealed} toggleReveal={toggleReveal}/>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Services & APIs */}
                                {proj.services?.length > 0 && (
                                  <div className="pcl-section">
                                    <SectionHeader icon="🔌" title="Services & APIs"/>
                                    <div className="pcl-services-list">
                                      {proj.services.map((s, i) => (
                                        <div key={i} className="pcl-service-card">
                                          <div className="pcl-service-head">
                                            <strong>{s.name}</strong>
                                            {s.type && <span className="pcl-service-type">{s.type}</span>}
                                          </div>
                                          <div className="pcl-info-grid">
                                            {s.loginUrl && <div className="pcl-info-item pcl-info-full pcl-info-flat"><span>Dashboard URL</span><strong><LinkValue url={s.loginUrl}/></strong></div>}
                                            {s.username && <div className="pcl-info-item pcl-info-flat"><span>Username / Email</span><strong><CredValue value={s.username} masked={false} copyKey={`su-${i}-${proj.id}`} copy={copy} revealed={revealed} toggleReveal={toggleReveal}/></strong></div>}
                                            {s.password && <div className="pcl-info-item pcl-info-flat"><span>Password</span><strong><CredValue value={s.password} copyKey={`sv-${i}-${proj.id}`} copy={copy} revealed={revealed} toggleReveal={toggleReveal}/></strong></div>}
                                            {s.apiKey && <div className="pcl-info-item pcl-info-full pcl-info-flat"><span>API Key</span><strong><CredValue value={s.apiKey} copyKey={`sk-${i}-${proj.id}`} copy={copy} revealed={revealed} toggleReveal={toggleReveal}/></strong></div>}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Business Emails */}
                                {proj.businessEmails?.length > 0 && (
                                  <div className="pcl-section">
                                    <SectionHeader icon="✉️" title="Business Email Accounts"/>
                                    {proj.businessEmails.map((em, i) => (
                                      <div key={i} className="pcl-email-row">
                                        <div className="pcl-email-left">
                                          <strong>{em.email}</strong>
                                          {em.purpose && <span className="pcl-email-tag">{em.purpose}</span>}
                                          {em.provider && <span className="pcl-email-provider">{em.provider}</span>}
                                        </div>
                                        {em.password && (
                                          <div className="pcl-email-right">
                                            <CredValue value={em.password} copyKey={`ep-${i}-${proj.id}`} copy={copy} revealed={revealed} toggleReveal={toggleReveal}/>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Custom Fields */}
                                {proj.customFields?.length > 0 && (
                                  <div className="pcl-section">
                                    <SectionHeader icon="✨" title="Additional Information"/>
                                    <div className="pcl-custom-grid">
                                      {proj.customFields.map((field, i) => (
                                        <div key={i} className="pcl-custom-item">
                                          <div className="pcl-custom-label">{field.label}</div>
                                          <div className={`pcl-custom-value ${field.type==='password'?'pcl-custom-value-mono':''}`}>
                                            {field.type==='url'
                                              ? <LinkValue url={field.value}/>
                                              : field.type==='password'
                                                ? <CredValue value={field.value} copyKey={`cf-${i}-${proj.id}`} copy={copy} revealed={revealed} toggleReveal={toggleReveal}/>
                                                : field.value}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Notes */}
                                {proj.notes && (
                                  <div className="pcl-section">
                                    <SectionHeader icon="📝" title="Notes"/>
                                    <div className="pcl-notes">{proj.notes}</div>
                                  </div>
                                )}

                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          <motion.footer className="pcl-footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
            <p><I.Lock/> <span>This portal is strictly confidential — do not share this link or its contents.</span></p>
            <p className="pcl-footer-hint pcl-no-print">Tip: press <kbd className="pcl-kbd">/</kbd> to search · <kbd className="pcl-kbd">Esc</kbd> to clear</p>
          </motion.footer>

        </motion.div>
      </div>
    </>
  )
}
