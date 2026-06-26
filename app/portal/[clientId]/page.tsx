'use client'
import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { getClient, getProjects, deleteProject, type Client, type Project } from '@/lib/firestore'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { Icons as I } from '@/components/ui/Icons'
import ProjectEditor from '@/components/portal/ProjectEditor'

type Theme = 'light' | 'dark'
type StatusFilter = 'all' | 'active' | 'development' | 'maintenance' | 'paused'
type SortKey = 'newest' | 'name' | 'status'
type ToastTone = 'success' | 'info' | 'warn'
interface Toast { id: number; text: string; tone: ToastTone }

const AUTO_LOCK_MS = 15 * 60 * 1000

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
function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
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

/* ── WebsitePreview: og:image + title + description ──────── */
interface OgPreview {
  title: string
  description: string
  image: string
  siteName: string
  favicon: string
  finalUrl: string
}
function WebsitePreview({ domain, onCopy }: { domain: string; onCopy: () => void }) {
  const url = `https://${domain}`
  const [data, setData] = useState<OgPreview | null>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [imgOk, setImgOk] = useState(true)

  useEffect(() => {
    let cancelled = false
    setState('loading')
    setImgOk(true)
    fetch(`/api/og-preview?url=${encodeURIComponent(url)}`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: OgPreview) => { if (!cancelled) { setData(d); setState('ready') } })
      .catch(() => { if (!cancelled) setState('error') })
    return () => { cancelled = true }
  }, [url])

  if (state === 'loading') {
    return (
      <div className="pcl-og-card pcl-og-loading">
        <div className="pcl-og-thumb pcl-og-skeleton"/>
        <div className="pcl-og-body">
          <div className="pcl-og-skeleton-line pcl-og-skeleton" style={{ width: '60%' }}/>
          <div className="pcl-og-skeleton-line pcl-og-skeleton" style={{ width: '90%' }}/>
          <div className="pcl-og-skeleton-line pcl-og-skeleton" style={{ width: '40%' }}/>
        </div>
      </div>
    )
  }

  if (state === 'error' || !data) {
    return (
      <div className="pcl-domain-row">
        <a href={url} target="_blank" rel="noopener noreferrer" className="pcl-domain-link">
          {domain}<I.External/>
        </a>
        <button className="pcl-copy-btn" onClick={onCopy}>
          <I.Copy/> Copy URL
        </button>
      </div>
    )
  }

  return (
    <a href={data.finalUrl || url} target="_blank" rel="noopener noreferrer" className="pcl-og-card">
      {data.image && imgOk ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="pcl-og-thumb" src={data.image} alt={data.title} loading="lazy" onError={() => setImgOk(false)}/>
      ) : (
        <div className="pcl-og-thumb pcl-og-thumb-fallback">
          {data.favicon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.favicon} alt="" onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}/>
          ) : <I.Globe/>}
        </div>
      )}
      <div className="pcl-og-body">
        <div className="pcl-og-site">
          {data.favicon && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="pcl-og-favicon" src={data.favicon} alt="" onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}/>
          )}
          <span>{data.siteName || domain}</span>
        </div>
        {data.title && <div className="pcl-og-title">{data.title}</div>}
        {data.description && <div className="pcl-og-desc">{data.description}</div>}
        <div className="pcl-og-url">
          <I.External/>
          <span>{domain}</span>
          <button
            className="pcl-og-copy"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onCopy() }}
            aria-label="Copy URL"
            title="Copy URL"
          >
            <I.Copy/>
          </button>
        </div>
      </div>
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  /* Owner (edit) mode */
  const [owner, setOwner] = useState(false)
  const [ownerModal, setOwnerModal] = useState(false)
  const [ownerEmail, setOwnerEmail] = useState('')
  const [ownerPass, setOwnerPass] = useState('')
  const [ownerBusy, setOwnerBusy] = useState(false)
  const [ownerError, setOwnerError] = useState('')
  const [editorProject, setEditorProject] = useState<Project | null>(null)
  const [editorOpen, setEditorOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
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

  const refreshProjects = useCallback(async () => {
    setProjects(await getProjects(clientId))
  }, [clientId])

  /* Owner auth — reflects an existing Firebase admin session */
  useEffect(() => onAuthStateChanged(auth, u => setOwner(!!u)), [])

  async function ownerSignIn(e: React.FormEvent) {
    e.preventDefault()
    setOwnerBusy(true); setOwnerError('')
    try {
      await signInWithEmailAndPassword(auth, ownerEmail.trim(), ownerPass)
      setOwnerModal(false); setOwnerPass(''); setOwnerEmail('')
      pushToast('Owner mode unlocked — you can now edit projects')
    } catch {
      setOwnerError('Wrong email or password.')
    } finally { setOwnerBusy(false) }
  }

  async function ownerSignOut() {
    await signOut(auth)
    setEditorOpen(false)
    pushToast('Owner mode locked', 'info')
  }

  function openAddProject() {
    setEditorProject(null); setEditorOpen(true); setSidebarOpen(false)
  }
  function openEditProject(p: Project) {
    setEditorProject(p); setEditorOpen(true)
  }
  async function handleDeleteProject(p: Project) {
    if (!p.id) return
    if (!window.confirm(`Delete project “${p.name}”? This cannot be undone.`)) return
    setDeletingId(p.id)
    try {
      await deleteProject(clientId, p.id)
      await refreshProjects()
      pushToast(`“${p.name}” deleted`, 'info')
    } catch {
      pushToast('Could not delete — owner session may have expired', 'warn')
    } finally { setDeletingId(null) }
  }

  /* Theme bootstrap */
  useEffect(() => {
    const saved = localStorage.getItem('pcl-theme') as Theme | null
    if (saved === 'light' || saved === 'dark') setTheme(saved)
    else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) setTheme('dark')
  }, [])

  /* Sidebar collapse bootstrap (desktop, persisted) */
  useEffect(() => {
    setSidebarCollapsed(localStorage.getItem('pcl-sidebar-collapsed') === '1')
  }, [])
  function toggleSidebarCollapsed() {
    setSidebarCollapsed(v => {
      const next = !v
      localStorage.setItem('pcl-sidebar-collapsed', next ? '1' : '0')
      return next
    })
  }

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

  /* Scroll detection — only toggles a subtle shadow on the header.
     The header height is constant (stats live outside it), so this never
     changes layout and cannot cause the scroll/reflow blink. */
  useEffect(() => {
    if (step !== 'view') return
    let ticking = false
    const update = () => { ticking = false; setScrolled(window.scrollY > 8) }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(update)
    }
    update()
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

  const stylesheet = (
    <>
      <link rel="stylesheet" href="/styles/design-system.css" />
      <link rel="stylesheet" href="/styles/portal-client.css" />
    </>
  )

  /* Jump to a project from the sidebar: expand it, scroll to it, close drawer */
  const jumpToProject = useCallback((pid: string) => {
    setExpanded(prev => { const n = new Set(prev); n.add(pid); return n })
    setSidebarOpen(false)
    requestAnimationFrame(() => {
      document.getElementById(`pcl-proj-${pid}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

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
        <div className="pcl-auth">

          {/* Brand panel (hidden on small screens) */}
          <div className="pcl-auth-aside" aria-hidden="true">
            <div className="pcl-orbs">
              <motion.div className="pcl-orb pcl-orb-1" animate={{ y: [-25, 25, -25], scale: [1, 1.08, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}/>
              <motion.div className="pcl-orb pcl-orb-2" animate={{ y: [20, -30, 20], x: [-15, 15, -15] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}/>
              <motion.div className="pcl-orb pcl-orb-3" animate={{ y: [-18, 22, -18], x: [12, -12, 12] }} transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut' }}/>
            </div>
            <motion.div className="pcl-auth-aside-inner" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease }}>
              <div className="pcl-auth-brand">
                <div className="pcl-auth-logo"><I.Lock/></div>
                <span>Client Portal</span>
              </div>
              <div className="pcl-auth-hero">
                <h2>Everything about your projects, in one secure place.</h2>
                <p>Live status, logins, credentials and renewal reminders — organised and always at hand.</p>
                <ul className="pcl-auth-feats">
                  <li><span className="pcl-auth-feat-ic"><I.Globe/></span>Live status &amp; one-click links</li>
                  <li><span className="pcl-auth-feat-ic"><I.Lock/></span>Credentials, safely stored</li>
                  <li><span className="pcl-auth-feat-ic"><I.Calendar/></span>Domain &amp; hosting renewal reminders</li>
                </ul>
              </div>
              <div className="pcl-auth-aside-foot"><I.Lock/> Confidential — please don&apos;t share this link.</div>
            </motion.div>
          </div>

          {/* Sign-in panel */}
          <div className="pcl-auth-main">
            <motion.div className="pcl-auth-card" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
              <motion.div className="pcl-auth-card-logo" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, type: 'spring', damping: 11, stiffness: 180 }}>
                <I.Lock/>
              </motion.div>

              <h1>Welcome back</h1>
              <p>Enter your password to access your projects</p>

              <form className="pcl-auth-form" onSubmit={handlePassword}>
                <div className="pcl-field">
                  <label className="pcl-field-label" htmlFor="pcl-pwd">Password</label>
                  <div className="pcl-pwd-wrap">
                    <span className="pcl-field-ic"><I.Lock/></span>
                    <input
                      id="pcl-pwd"
                      type={showPwd ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password…"
                      required autoFocus autoComplete="current-password"
                    />
                    <button type="button" className="pcl-pwd-toggle" onClick={() => setShowPwd(v => !v)} aria-label={showPwd ? 'Hide password' : 'Show password'}>
                      {showPwd ? <I.EyeOff/> : <I.Eye/>}
                    </button>
                  </div>
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

                <motion.button type="submit" className="pcl-auth-submit" disabled={verifying} whileHover={!verifying ? { y: -1 } : {}} whileTap={!verifying ? { scale: 0.98 } : {}}>
                  {verifying
                    ? <span className="pcl-btn-loading"><span className="pcl-btn-spinner"/>Verifying…</span>
                    : <>Access Portal <I.Arrow/></>
                  }
                </motion.button>
              </form>

              <p className="pcl-auth-note">
                <I.Lock/> <span>This portal contains confidential project information.</span>
              </p>
            </motion.div>
          </div>

          <motion.button className="pcl-theme-float" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, type: 'spring', damping: 15 }} onClick={toggleTheme} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }} aria-label="Toggle theme">
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
      <div data-theme={theme} className="pcl-root">
        {ToastStack}
        <div className={`pcl-shell ${sidebarCollapsed ? 'pcl-collapsed' : ''}`}>

          {/* ── Sidebar ── */}
          <aside className={`pcl-sidebar pcl-no-print ${sidebarOpen ? 'pcl-sidebar-open' : ''}`}>
            <div className="pcl-sidebar-head">
              <div className="pcl-brand">
                <div className="pcl-company-avatar">{getInitials(client?.company || 'C')}</div>
                <div className="pcl-header-info">
                  <h1>{client?.company}</h1>
                  <p>{client?.name}</p>
                </div>
              </div>
              <button
                className="pcl-icon-btn pcl-sidebar-collapse"
                onClick={toggleSidebarCollapsed}
                aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <span className="pcl-collapse-ic" style={{ display: 'flex', transition: 'transform .26s var(--ease)', transform: sidebarCollapsed ? 'rotate(180deg)' : 'none' }}>
                  <I.PanelLeft/>
                </span>
              </button>
              <button className="pcl-icon-btn pcl-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
                <I.X/>
              </button>
            </div>

            <nav className="pcl-sidebar-nav">
              {projects.length > 0 && (
                <div className="pcl-nav-group">
                  <div className="pcl-nav-label">Filter by status</div>
                  {([
                    ['all', 'All projects', projects.length],
                    ['active', 'Live', activeCount],
                    ['development', 'In development', devCount],
                    ['maintenance', 'Maintenance', maintCount],
                    ['paused', 'Paused', pausedCount],
                  ] as [StatusFilter, string, number][]).filter(([k, , c]) => k === 'all' || c > 0).map(([k, lbl, c]) => (
                    <button
                      key={k}
                      className={`pcl-nav-item ${statusFilter === k ? 'pcl-nav-item-on' : ''}`}
                      onClick={() => setStatusFilter(k)}
                      title={`${lbl} (${c})`}
                    >
                      <span className={`pcl-nav-dot pcl-nav-dot-${k}`}/>
                      <span className="pcl-nav-text">{lbl}</span>
                      <span className="pcl-nav-count">{c}</span>
                    </button>
                  ))}
                </div>
              )}

              {filteredProjects.length > 0 && (
                <div className="pcl-nav-group pcl-nav-group-jump">
                  <div className="pcl-nav-label">Jump to project</div>
                  <div className="pcl-nav-projects">
                    {filteredProjects.map(p => (
                      <button key={p.id} className="pcl-nav-proj" onClick={() => jumpToProject(p.id!)} title={p.name}>
                        <span className={`pcl-status-dot pcl-status-dot-${p.status}`}/>
                        <span className="pcl-nav-proj-name">{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </nav>

            {/* Owner mode banner */}
            <div className="pcl-owner-bar">
              {owner ? (
                <>
                  <button className="pcl-owner-add" onClick={openAddProject} title="Add a new project">
                    <I.Plus/><span>Add project</span>
                  </button>
                  <div className="pcl-owner-status">
                    <span className="pcl-owner-pill"><span className="pcl-owner-dot"/>Owner mode</span>
                    <button className="pcl-owner-signout" onClick={ownerSignOut} title="Lock owner mode">Sign out</button>
                  </div>
                </>
              ) : (
                <button className="pcl-owner-signin" onClick={() => setOwnerModal(true)} title="Sign in to edit projects">
                  <I.Lock/><span>Owner sign-in</span>
                </button>
              )}
            </div>

            <div className="pcl-sidebar-foot">
              <button className="pcl-icon-btn" onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={isDark ? 'sun' : 'moon'} initial={{ opacity: 0, rotate: -90, scale: 0.7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0.7 }} transition={{ duration: 0.2 }} style={{ display: 'flex' }}>
                    {isDark ? <I.Sun/> : <I.Moon/>}
                  </motion.span>
                </AnimatePresence>
              </button>
              <button className="pcl-icon-btn" onClick={printPortal} aria-label="Print portal" title="Print"><I.Print/></button>
              <button className="pcl-btn-lock" onClick={lockNow} title="Lock portal"><I.LogOut/><span>Lock</span></button>
            </div>
          </aside>

          {/* Mobile drawer overlay */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                className="pcl-overlay pcl-no-print"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </AnimatePresence>

          {/* ── Main column ── */}
          <div className="pcl-main-col">

          {/* Topbar — sticky, fixed height (shadow only on scroll → no blink) */}
          <header className={`pcl-topbar pcl-no-print ${scrolled ? 'pcl-topbar-scrolled' : ''}`}>
            <button className="pcl-icon-btn pcl-hamburger" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><I.Menu/></button>
            {projects.length > 0 ? (
              <>
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
                <div className="pcl-topbar-actions">
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
                      <span className="pcl-action-label">{expanded.size === filteredProjects.length ? 'Collapse all' : 'Expand all'}</span>
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="pcl-topbar-title">Client Portal</div>
            )}
          </header>

          <div className="pcl-content">

          {/* Stats */}
          {projects.length > 0 && (
            <motion.div className="pcl-stats" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
              <div className="pcl-stats-inner">
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
              </div>
            </motion.div>
          )}

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

          {/* Projects spotlight slider — swipe through projects at a glance */}
          {filteredProjects.length > 1 && (
            <motion.div className="pcl-slider pcl-no-print" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.4, ease }}>
              <div className="pcl-slider-head">
                <div>
                  <h3>Your projects</h3>
                  <span>Swipe through — tap a card to open its full details</span>
                </div>
                <div className="pcl-slider-nav">
                  <button className="pcl-slider-btn pcl-slider-prev" aria-label="Previous"><span style={{ transform: 'rotate(90deg)', display: 'flex' }}><I.Chevron/></span></button>
                  <button className="pcl-slider-btn pcl-slider-next" aria-label="Next"><span style={{ transform: 'rotate(-90deg)', display: 'flex' }}><I.Chevron/></span></button>
                </div>
              </div>
              <Swiper
                modules={[Navigation, Pagination, A11y, Keyboard]}
                navigation={{ prevEl: '.pcl-slider-prev', nextEl: '.pcl-slider-next' }}
                pagination={{ clickable: true }}
                keyboard={{ enabled: true }}
                spaceBetween={14}
                slidesPerView={1.08}
                breakpoints={{ 560: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
                className="pcl-swiper"
              >
                {filteredProjects.map(p => {
                  const exp = nextExpiryDays(p)
                  return (
                    <SwiperSlide key={p.id}>
                      <button
                        className={`pcl-slide-card pcl-slide-${p.status}`}
                        onClick={() => jumpToProject(p.id!)}
                        title={`Open ${p.name}`}
                      >
                        <div className="pcl-slide-top">
                          <span className={`pcl-status-pill pcl-status-pill-${p.status}`}>
                            <span className={`pcl-status-dot pcl-status-dot-${p.status}`}/>
                            {statusLabel[p.status]}
                          </span>
                          <span className="pcl-slide-type">{p.type}</span>
                        </div>
                        <h4 className="pcl-slide-name">{p.name}</h4>
                        {p.domain && <span className="pcl-slide-domain">{p.domain}</span>}
                        <div className="pcl-slide-meta">
                          {p.techStack?.length > 0 && <span><I.Cpu/>{p.techStack.length} tech</span>}
                          {p.services?.length > 0 && <span><I.Plug/>{p.services.length} services</span>}
                          {exp.days !== null && exp.days <= 60 && (
                            <span className={`pcl-slide-expiry pcl-expiry-${expiryTone(exp.days)}`}><I.Warn/>{exp.label}</span>
                          )}
                        </div>
                        <span className="pcl-slide-cta">View details <I.Arrow/></span>
                      </button>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </motion.div>
          )}

          {/* Projects */}
          <main className="pcl-main">
            <AnimatePresence mode="wait">
              {filteredProjects.length === 0 ? (
                <motion.div key="empty" className="pcl-empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                  <div className="pcl-empty-icon">{search || statusFilter !== 'all' ? '🔍' : '📭'}</div>
                  <p>{search || statusFilter !== 'all' ? 'No projects match your filters.' : owner ? 'No projects yet. Add the first one.' : 'No projects yet. Please contact your team.'}</p>
                  {(search || statusFilter !== 'all') ? (
                    <button className="pcl-action-btn" onClick={() => { setSearch(''); setStatusFilter('all') }}>Clear filters</button>
                  ) : owner ? (
                    <button className="pcl-action-btn pcl-action-primary" onClick={openAddProject}><I.Plus/> Add project</button>
                  ) : null}
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
                            {owner && (
                              <div className="pcl-proj-owner-actions" onClick={e => e.stopPropagation()}>
                                <button className="pcl-owner-icon-btn" onClick={() => openEditProject(proj)} title="Edit project" aria-label="Edit project"><I.Pencil/></button>
                                <button className="pcl-owner-icon-btn pcl-owner-icon-danger" onClick={() => handleDeleteProject(proj)} disabled={deletingId === proj.id} title="Delete project" aria-label="Delete project">
                                  {deletingId === proj.id ? <span className="pcl-btn-spinner"/> : <I.Trash/>}
                                </button>
                              </div>
                            )}
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
                                    <SectionHeader icon={<I.Zap/>} title="Quick Access"/>
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
                                    <SectionHeader icon={<I.Link2/>} title="Website"/>
                                    <WebsitePreview
                                      domain={proj.domain}
                                      onCopy={() => copy(proj.domain, `d-${proj.id}`)}
                                    />
                                  </div>
                                )}

                                {/* Domain Registrar */}
                                {(proj.domainInfo?.registrar || proj.domainInfo?.loginUrl) && (
                                  <div className="pcl-section">
                                    <SectionHeader icon={<I.Globe/>} title="Domain Registrar"/>
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
                                    <SectionHeader icon={<I.Server/>} title="Web Hosting"/>
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
                                    <SectionHeader icon={<I.Phone/>} title="App Stores"/>
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
                                    <SectionHeader icon={<I.Database/>} title="Database"/>
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
                                    <SectionHeader icon={<I.Mail/>} title="Email Hosting"/>
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
                                    <SectionHeader icon={<I.Cpu/>} title="Tech Stack"/>
                                    <div className="pcl-tech-tags">
                                      {proj.techStack.map(t => <span key={t} className="pcl-tech-tag">{t}</span>)}
                                    </div>
                                  </div>
                                )}

                                {/* Social Media */}
                                {proj.socialAccounts?.length > 0 && (
                                  <div className="pcl-section">
                                    <SectionHeader icon={<I.Share2/>} title="Social Media"/>
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
                                    <SectionHeader icon={<I.Plug/>} title="Services & APIs"/>
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
                                    <SectionHeader icon={<I.AtSign/>} title="Business Email Accounts"/>
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
                                    <SectionHeader icon={<I.Sparkles/>} title="Additional Information"/>
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
                                    <SectionHeader icon={<I.FileText/>} title="Notes"/>
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

          </div>{/* /pcl-content */}
          </div>{/* /pcl-main-col */}
        </div>{/* /pcl-shell */}

        {/* ── Owner sign-in modal ── */}
        <AnimatePresence>
          {ownerModal && (
            <motion.div className="pe-overlay" onMouseDown={() => setOwnerModal(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
              <motion.div className="pcl-owner-modal" onMouseDown={e => e.stopPropagation()} initial={{ opacity: 0, y: 18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} transition={{ duration: 0.26, ease }}>
                <div className="pcl-owner-modal-logo"><I.Lock/></div>
                <h3>Owner sign-in</h3>
                <p>Only the account owner can add or edit projects. Clients with the portal password stay read-only.</p>
                <form onSubmit={ownerSignIn} className="pcl-owner-form">
                  <label className="pe-field">
                    <span>Admin email</span>
                    <input type="email" value={ownerEmail} onChange={e => setOwnerEmail(e.target.value)} placeholder="you@email.com" autoFocus required/>
                  </label>
                  <label className="pe-field">
                    <span>Admin password</span>
                    <input type="password" value={ownerPass} onChange={e => setOwnerPass(e.target.value)} placeholder="••••••••" required/>
                  </label>
                  {ownerError && <div className="pe-error"><I.Warn/> {ownerError}</div>}
                  <div className="pcl-owner-form-actions">
                    <button type="button" className="pe-btn-cancel" onClick={() => setOwnerModal(false)} disabled={ownerBusy}>Cancel</button>
                    <button type="submit" className="pe-btn-save" disabled={ownerBusy}>
                      {ownerBusy ? <><span className="pe-spin"/> Signing in…</> : <>Unlock editing <I.Arrow/></>}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Project editor ── */}
        <AnimatePresence>
          {editorOpen && owner && (
            <ProjectEditor
              clientId={clientId}
              editing={editorProject}
              onClose={() => setEditorOpen(false)}
              onSaved={async (msg) => { setEditorOpen(false); await refreshProjects(); pushToast(msg) }}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
