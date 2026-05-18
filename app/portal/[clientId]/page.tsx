'use client'
import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { getClient, getProjects, type Client, type Project } from '@/lib/firestore'

type Theme = 'light' | 'dark'

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  )
}
function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M6 9l6 6 6-6"/>
    </svg>
  )
}

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}
const listItem = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease } },
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
  const [expanded, setExpanded] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const saved = localStorage.getItem('pcl-theme') as Theme | null
    if (saved === 'light' || saved === 'dark') setTheme(saved)
    else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) setTheme('dark')
  }, [])

  useEffect(() => {
    const wasAuth = sessionStorage.getItem(`portal-${clientId}`) === '1'
    if (wasAuth) loadAndShow(); else setStep('password')
  }, [clientId])

  function toggleTheme() {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('pcl-theme', next)
  }

  const isDark = theme === 'dark'

  async function loadAndShow() {
    const [c, p] = await Promise.all([getClient(clientId), getProjects(clientId)])
    if (!c) { setStep('error'); return }
    setClient(c); setProjects(p); setStep('view')
  }

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

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2500)
  }

  const statusLabel: Record<string, string> = {
    active: 'Live', development: 'In Development', maintenance: 'Maintenance', paused: 'Paused',
  }
  const statusColor: Record<string, string> = {
    active: '#059669', development: '#d97706', maintenance: '#2563eb', paused: '#6b7280',
  }
  const statusBg: Record<string, string> = {
    active:      isDark ? '#052e16' : '#ecfdf5',
    development: isDark ? '#211504' : '#fffbeb',
    maintenance: isDark ? '#0a1629' : '#eff6ff',
    paused:      isDark ? '#181b2a' : '#f9fafb',
  }

  const filteredProjects = useMemo(() => {
    if (!search.trim()) return projects
    const q = search.toLowerCase()
    return projects.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.domain?.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q) ||
      p.status.toLowerCase().includes(q)
    )
  }, [projects, search])

  const activeCount = projects.filter(p => p.status === 'active').length
  const devCount    = projects.filter(p => p.status === 'development').length

  function getInitials(name: string) {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
  }

  const stylesheet = <link rel="stylesheet" href="/styles/portal-client.css" />

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
          {isDark ? <SunIcon/> : <MoonIcon/>}
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
          {isDark ? <SunIcon/> : <MoonIcon/>}
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

          {/* Floating background orbs */}
          <div className="pcl-orbs" aria-hidden="true">
            <motion.div className="pcl-orb pcl-orb-1" animate={{ y: [-25, 25, -25], scale: [1, 1.08, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}/>
            <motion.div className="pcl-orb pcl-orb-2" animate={{ y: [20, -30, 20], x: [-15, 15, -15] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}/>
            <motion.div className="pcl-orb pcl-orb-3" animate={{ y: [-18, 22, -18], x: [12, -12, 12] }} transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut' }}/>
          </div>

          <motion.div className="pcl-auth-card" initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.55, ease }}>

            <motion.div className="pcl-auth-logo" initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.2, type: 'spring', damping: 10, stiffness: 180 }}>
              <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
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
                  {showPwd
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>

              <AnimatePresence>
                {pwdError && (
                  <motion.div className="pcl-auth-error" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.28 }}>
                    <motion.div style={{ display: 'flex', alignItems: 'center', gap: 8 }} animate={{ x: [-8, 8, -6, 6, -3, 3, 0] }} transition={{ duration: 0.5 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
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
              🔒 This portal contains confidential project information.
            </motion.p>
          </motion.div>

          <motion.button className="pcl-theme-float" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: 'spring', damping: 15 }} onClick={toggleTheme} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }} aria-label="Toggle theme">
            {isDark ? <SunIcon/> : <MoonIcon/>}
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
        <motion.div className="pcl-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>

          {/* Header */}
          <motion.header className="pcl-header" initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease }}>
            <div className="pcl-header-inner">
              <motion.div className="pcl-company-avatar" initial={{ scale: 0, rotate: -20, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ delay: 0.1, type: 'spring', damping: 12, stiffness: 200 }}>
                {getInitials(client?.company || 'C')}
              </motion.div>
              <motion.div className="pcl-header-info" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.5, ease }}>
                <h1>{client?.company}</h1>
                <p>{client?.name} · Client Project Portal</p>
              </motion.div>
              <motion.div className="pcl-header-right" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5, ease }}>
                {activeCount > 0 && (
                  <motion.div className="pcl-stat-chip" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, type: 'spring', damping: 12 }}>
                    <span>Live</span> {activeCount}
                  </motion.div>
                )}
                {devCount > 0 && (
                  <motion.div className="pcl-stat-chip" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.35, type: 'spring', damping: 12 }}>
                    <span>Dev</span> {devCount}
                  </motion.div>
                )}
                <motion.div className="pcl-stat-chip" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4, type: 'spring', damping: 12 }}>
                  <span>Total</span> {projects.length}
                </motion.div>
                <motion.button className="pcl-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.45, type: 'spring', damping: 12 }} whileHover={{ scale: 1.12, rotate: 12 }} whileTap={{ scale: 0.9 }}>
                  <AnimatePresence mode="wait">
                    <motion.span key={isDark ? 'sun' : 'moon'} initial={{ opacity: 0, rotate: -90, scale: 0.7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0.7 }} transition={{ duration: 0.22 }} style={{ display: 'flex' }}>
                      {isDark ? <SunIcon/> : <MoonIcon/>}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </div>
          </motion.header>

          {/* Search */}
          {projects.length > 2 && (
            <motion.div className="pcl-search-wrap" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.45, ease }}>
              <div className="pcl-search">
                <svg className="pcl-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects by name or domain…"/>
              </div>
            </motion.div>
          )}

          {/* Projects */}
          <main className="pcl-main">
            <AnimatePresence mode="wait">
              {filteredProjects.length === 0 ? (
                <motion.div key="empty" className="pcl-empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                  <div className="pcl-empty-icon">{search ? '🔍' : '📭'}</div>
                  <p>{search ? 'No projects match your search.' : 'No projects yet. Please contact your team.'}</p>
                </motion.div>
              ) : (
                <motion.div key="list" className="pcl-projects" variants={listContainer} initial="hidden" animate="visible">
                  {filteredProjects.map(proj => {
                    const isOpen = expanded === proj.id
                    return (
                      <motion.div key={proj.id} className={`pcl-project pcl-project-${proj.status}`} variants={listItem} whileHover={{ y: -2, transition: { duration: 0.2 } }}>

                        <div className="pcl-proj-head" onClick={() => setExpanded(prev => prev === proj.id ? null : proj.id!)}>
                          <div className="pcl-proj-head-left">
                            <div className={`pcl-status-dot pcl-status-dot-${proj.status}`}/>
                            <div className="pcl-proj-name-wrap">
                              <h2>{proj.name}</h2>
                              <div className="pcl-proj-meta">
                                {proj.domain && (
                                  <a href={`https://${proj.domain}`} target="_blank" rel="noopener noreferrer" className="pcl-domain-small" onClick={e => e.stopPropagation()}>
                                    🔗 {proj.domain}
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="pcl-proj-head-right">
                            <span className="pcl-badge-type">{proj.type}</span>
                            <span className="pcl-badge-status" style={{ color: statusColor[proj.status], background: statusBg[proj.status], borderColor: statusColor[proj.status] + '50' }}>
                              {statusLabel[proj.status]}
                            </span>
                            <motion.button className="pcl-toggle-btn" aria-label="Toggle details" animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>
                              <ChevronDownIcon/>
                            </motion.button>
                          </div>
                        </div>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} style={{ overflow: 'hidden' }}>
                              <motion.div className="pcl-proj-body" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.3 }}>

                                {/* Website */}
                                {proj.domain && (
                                  <div className="pcl-section">
                                    <div className="pcl-section-header"><div className="pcl-section-icon">🔗</div><div className="pcl-section-title">Website</div></div>
                                    <div className="pcl-domain-row">
                                      <a href={`https://${proj.domain}`} target="_blank" rel="noopener noreferrer" className="pcl-domain-link">
                                        {proj.domain}
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                                      </a>
                                      <button className={`pcl-copy-btn ${copied===`d-${proj.id}`?'pcl-copy-btn-success':''}`} onClick={()=>copy(proj.domain,`d-${proj.id}`)}>
                                        {copied===`d-${proj.id}`?'✓ Copied':'Copy URL'}
                                      </button>
                                    </div>
                                  </div>
                                )}

                                {/* Domain Registrar */}
                                {(proj.domainInfo?.registrar || proj.domainInfo?.loginUrl) && (
                                  <div className="pcl-section">
                                    <div className="pcl-section-header"><div className="pcl-section-icon">🌍</div><div className="pcl-section-title">Domain Registrar</div></div>
                                    <div className="pcl-info-grid">
                                      {proj.domainInfo.registrar && <div className="pcl-info-item"><span>Registrar</span><strong>{proj.domainInfo.registrar}</strong></div>}
                                      {proj.domainInfo.expiryDate && <div className="pcl-info-item"><span>Expiry Date</span><strong>{proj.domainInfo.expiryDate}</strong></div>}
                                      {proj.domainInfo.autoRenew && <div className="pcl-info-item"><span>Auto Renew</span><strong>{proj.domainInfo.autoRenew}</strong></div>}
                                      {proj.domainInfo.loginUrl && <div className="pcl-info-item pcl-info-full"><span>Login URL</span><strong><a href={proj.domainInfo.loginUrl} target="_blank" rel="noopener noreferrer">{proj.domainInfo.loginUrl}</a></strong></div>}
                                      {proj.domainInfo.username && <div className="pcl-info-item"><span>Username</span><strong className="pcl-cred">{proj.domainInfo.username}<button className={`pcl-copy-inline ${copied===`du-${proj.id}`?'pcl-copy-inline-success':''}`} onClick={()=>copy(proj.domainInfo.username,`du-${proj.id}`)}>{copied===`du-${proj.id}`?'✓':'Copy'}</button></strong></div>}
                                      {proj.domainInfo.password && <div className="pcl-info-item"><span>Password</span><strong className="pcl-cred">{proj.domainInfo.password}<button className={`pcl-copy-inline ${copied===`dp-${proj.id}`?'pcl-copy-inline-success':''}`} onClick={()=>copy(proj.domainInfo.password,`dp-${proj.id}`)}>{copied===`dp-${proj.id}`?'✓':'Copy'}</button></strong></div>}
                                    </div>
                                  </div>
                                )}

                                {/* Web Hosting */}
                                {(proj.hosting?.provider || proj.hosting?.loginUrl) && (
                                  <div className="pcl-section">
                                    <div className="pcl-section-header"><div className="pcl-section-icon">🌐</div><div className="pcl-section-title">Web Hosting</div></div>
                                    <div className="pcl-info-grid">
                                      {proj.hosting.provider && <div className="pcl-info-item"><span>Provider</span><strong>{proj.hosting.provider}</strong></div>}
                                      {proj.hosting.plan && <div className="pcl-info-item"><span>Plan</span><strong>{proj.hosting.plan}</strong></div>}
                                      {proj.hosting.expiryDate && <div className="pcl-info-item"><span>Expiry Date</span><strong>{proj.hosting.expiryDate}</strong></div>}
                                      {proj.hosting.cost && <div className="pcl-info-item"><span>Cost</span><strong>{proj.hosting.cost}</strong></div>}
                                      {proj.hosting.loginUrl && <div className="pcl-info-item pcl-info-full"><span>Login URL</span><strong><a href={proj.hosting.loginUrl} target="_blank" rel="noopener noreferrer">{proj.hosting.loginUrl}</a></strong></div>}
                                      {proj.hosting.username && <div className="pcl-info-item"><span>Username</span><strong className="pcl-cred">{proj.hosting.username}<button className={`pcl-copy-inline ${copied===`hu-${proj.id}`?'pcl-copy-inline-success':''}`} onClick={()=>copy(proj.hosting.username,`hu-${proj.id}`)}>{copied===`hu-${proj.id}`?'✓':'Copy'}</button></strong></div>}
                                      {proj.hosting.password && <div className="pcl-info-item"><span>Password</span><strong className="pcl-cred">{proj.hosting.password}<button className={`pcl-copy-inline ${copied===`hp-${proj.id}`?'pcl-copy-inline-success':''}`} onClick={()=>copy(proj.hosting.password,`hp-${proj.id}`)}>{copied===`hp-${proj.id}`?'✓':'Copy'}</button></strong></div>}
                                    </div>
                                  </div>
                                )}

                                {/* App Stores */}
                                {(proj.appStores?.playStoreUrl || proj.appStores?.appStoreUrl || proj.appStores?.playStoreAccount) && (
                                  <div className="pcl-section">
                                    <div className="pcl-section-header"><div className="pcl-section-icon">📱</div><div className="pcl-section-title">App Stores</div></div>
                                    <div className="pcl-info-grid">
                                      {proj.appStores.playStoreUrl && <div className="pcl-info-item pcl-info-full"><span>Google Play Store</span><strong><a href={proj.appStores.playStoreUrl} target="_blank" rel="noopener noreferrer">{proj.appStores.playStoreUrl}</a></strong></div>}
                                      {proj.appStores.playStoreAccount && <div className="pcl-info-item"><span>Play Console Account</span><strong className="pcl-cred">{proj.appStores.playStoreAccount}</strong></div>}
                                      {proj.appStores.playStorePassword && <div className="pcl-info-item"><span>Play Console Password</span><strong className="pcl-cred">{proj.appStores.playStorePassword}<button className={`pcl-copy-inline ${copied===`gpp-${proj.id}`?'pcl-copy-inline-success':''}`} onClick={()=>copy(proj.appStores.playStorePassword,`gpp-${proj.id}`)}>{copied===`gpp-${proj.id}`?'✓':'Copy'}</button></strong></div>}
                                      {proj.appStores.appStoreUrl && <div className="pcl-info-item pcl-info-full"><span>Apple App Store</span><strong><a href={proj.appStores.appStoreUrl} target="_blank" rel="noopener noreferrer">{proj.appStores.appStoreUrl}</a></strong></div>}
                                      {proj.appStores.appStoreAccount && <div className="pcl-info-item"><span>Apple ID / Dev Account</span><strong className="pcl-cred">{proj.appStores.appStoreAccount}</strong></div>}
                                      {proj.appStores.appStorePassword && <div className="pcl-info-item"><span>Apple Account Password</span><strong className="pcl-cred">{proj.appStores.appStorePassword}<button className={`pcl-copy-inline ${copied===`app-${proj.id}`?'pcl-copy-inline-success':''}`} onClick={()=>copy(proj.appStores.appStorePassword,`app-${proj.id}`)}>{copied===`app-${proj.id}`?'✓':'Copy'}</button></strong></div>}
                                    </div>
                                  </div>
                                )}

                                {/* Database */}
                                {(proj.database?.type || proj.database?.provider) && (
                                  <div className="pcl-section">
                                    <div className="pcl-section-header"><div className="pcl-section-icon">🗄️</div><div className="pcl-section-title">Database</div></div>
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
                                    <div className="pcl-section-header"><div className="pcl-section-icon">📧</div><div className="pcl-section-title">Email Hosting</div></div>
                                    <div className="pcl-info-grid">
                                      {proj.emailHosting.provider && <div className="pcl-info-item"><span>Provider</span><strong>{proj.emailHosting.provider}</strong></div>}
                                      {proj.emailHosting.plan && <div className="pcl-info-item"><span>Plan</span><strong>{proj.emailHosting.plan}</strong></div>}
                                      {proj.emailHosting.expiryDate && <div className="pcl-info-item"><span>Expiry Date</span><strong>{proj.emailHosting.expiryDate}</strong></div>}
                                      {proj.emailHosting.cost && <div className="pcl-info-item"><span>Cost</span><strong>{proj.emailHosting.cost}</strong></div>}
                                      {proj.emailHosting.loginUrl && <div className="pcl-info-item pcl-info-full"><span>Admin Login URL</span><strong><a href={proj.emailHosting.loginUrl} target="_blank" rel="noopener noreferrer">{proj.emailHosting.loginUrl}</a></strong></div>}
                                      {proj.emailHosting.adminEmail && <div className="pcl-info-item"><span>Admin Email</span><strong className="pcl-cred">{proj.emailHosting.adminEmail}<button className={`pcl-copy-inline ${copied===`ehe-${proj.id}`?'pcl-copy-inline-success':''}`} onClick={()=>copy(proj.emailHosting.adminEmail,`ehe-${proj.id}`)}>{copied===`ehe-${proj.id}`?'✓':'Copy'}</button></strong></div>}
                                      {proj.emailHosting.adminPassword && <div className="pcl-info-item"><span>Admin Password</span><strong className="pcl-cred">{proj.emailHosting.adminPassword}<button className={`pcl-copy-inline ${copied===`ehp-${proj.id}`?'pcl-copy-inline-success':''}`} onClick={()=>copy(proj.emailHosting.adminPassword,`ehp-${proj.id}`)}>{copied===`ehp-${proj.id}`?'✓':'Copy'}</button></strong></div>}
                                    </div>
                                  </div>
                                )}

                                {/* Tech Stack */}
                                {proj.techStack?.length > 0 && (
                                  <div className="pcl-section">
                                    <div className="pcl-section-header"><div className="pcl-section-icon">⚡</div><div className="pcl-section-title">Tech Stack</div></div>
                                    <div className="pcl-tech-tags">
                                      {proj.techStack.map(t => <span key={t} className="pcl-tech-tag">{t}</span>)}
                                    </div>
                                  </div>
                                )}

                                {/* Social Media */}
                                {proj.socialAccounts?.length > 0 && (
                                  <div className="pcl-section">
                                    <div className="pcl-section-header"><div className="pcl-section-icon">📲</div><div className="pcl-section-title">Social Media</div></div>
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
                                            <span className="pcl-cred">{s.password}</span>
                                            <button className={`pcl-copy-inline ${copied===`sp-${i}-${proj.id}`?'pcl-copy-inline-success':''}`} onClick={()=>copy(s.password,`sp-${i}-${proj.id}`)}>{copied===`sp-${i}-${proj.id}`?'✓':'Copy'}</button>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Services & APIs */}
                                {proj.services?.length > 0 && (
                                  <div className="pcl-section">
                                    <div className="pcl-section-header"><div className="pcl-section-icon">🔌</div><div className="pcl-section-title">Services & APIs</div></div>
                                    <div className="pcl-custom-grid">
                                      {proj.services.map((s, i) => (
                                        <div key={i} className="pcl-info-grid" style={{gridColumn:'1/-1',background:'var(--surface)',border:'1px solid var(--surface-border)',borderRadius:'var(--radius-sm)',padding:'14px 16px',gap:'10px',marginBottom:4}}>
                                          <div className="pcl-info-item" style={{background:'transparent',border:'none',padding:0}}><span>Service</span><strong>{s.name}{s.type&&<span style={{fontWeight:400,fontSize:12,color:'var(--muted)',marginLeft:6}}>· {s.type}</span>}</strong></div>
                                          {s.loginUrl&&<div className="pcl-info-item pcl-info-full" style={{background:'transparent',border:'none',padding:0}}><span>Dashboard URL</span><strong><a href={s.loginUrl} target="_blank" rel="noopener noreferrer">{s.loginUrl}</a></strong></div>}
                                          {s.username&&<div className="pcl-info-item" style={{background:'transparent',border:'none',padding:0}}><span>Username / Email</span><strong className="pcl-cred">{s.username}<button className={`pcl-copy-inline ${copied===`su-${i}-${proj.id}`?'pcl-copy-inline-success':''}`} onClick={()=>copy(s.username,`su-${i}-${proj.id}`)}>{copied===`su-${i}-${proj.id}`?'✓':'Copy'}</button></strong></div>}
                                          {s.password&&<div className="pcl-info-item" style={{background:'transparent',border:'none',padding:0}}><span>Password</span><strong className="pcl-cred">{s.password}<button className={`pcl-copy-inline ${copied===`sv-${i}-${proj.id}`?'pcl-copy-inline-success':''}`} onClick={()=>copy(s.password,`sv-${i}-${proj.id}`)}>{copied===`sv-${i}-${proj.id}`?'✓':'Copy'}</button></strong></div>}
                                          {s.apiKey&&<div className="pcl-info-item pcl-info-full" style={{background:'transparent',border:'none',padding:0}}><span>API Key</span><strong className="pcl-cred">{s.apiKey}<button className={`pcl-copy-inline ${copied===`sk-${i}-${proj.id}`?'pcl-copy-inline-success':''}`} onClick={()=>copy(s.apiKey,`sk-${i}-${proj.id}`)}>{copied===`sk-${i}-${proj.id}`?'✓':'Copy'}</button></strong></div>}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Business Emails */}
                                {proj.businessEmails?.length > 0 && (
                                  <div className="pcl-section">
                                    <div className="pcl-section-header"><div className="pcl-section-icon">✉️</div><div className="pcl-section-title">Business Email Accounts</div></div>
                                    {proj.businessEmails.map((em, i) => (
                                      <div key={i} className="pcl-email-row">
                                        <div className="pcl-email-left">
                                          <strong>{em.email}</strong>
                                          {em.purpose && <span className="pcl-email-tag">{em.purpose}</span>}
                                          {em.provider && <span className="pcl-email-provider">{em.provider}</span>}
                                        </div>
                                        {em.password && (
                                          <div className="pcl-email-right">
                                            <span className="pcl-cred">{em.password}</span>
                                            <button className={`pcl-copy-inline ${copied===`ep-${i}-${proj.id}`?'pcl-copy-inline-success':''}`} onClick={()=>copy(em.password,`ep-${i}-${proj.id}`)}>{copied===`ep-${i}-${proj.id}`?'✓':'Copy'}</button>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Custom Fields */}
                                {proj.customFields?.length > 0 && (
                                  <div className="pcl-section">
                                    <div className="pcl-section-header"><div className="pcl-section-icon">✨</div><div className="pcl-section-title">Additional Information</div></div>
                                    <div className="pcl-custom-grid">
                                      {proj.customFields.map((field, i) => (
                                        <div key={i} className="pcl-custom-item">
                                          <div className="pcl-custom-label">{field.label}</div>
                                          <div className={`pcl-custom-value ${field.type==='password'?'pcl-custom-value-mono':''}`}>
                                            {field.type==='url'?<a href={field.value} target="_blank" rel="noopener noreferrer">{field.value}</a>:field.value}
                                          </div>
                                          {(field.type==='password'||field.type==='url')&&(
                                            <button className={`pcl-copy-inline ${copied===`cf-${i}-${proj.id}`?'pcl-copy-inline-success':''}`} onClick={()=>copy(field.value,`cf-${i}-${proj.id}`)}>{copied===`cf-${i}-${proj.id}`?'✓':'Copy'}</button>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Notes */}
                                {proj.notes && (
                                  <div className="pcl-section">
                                    <div className="pcl-section-header"><div className="pcl-section-icon">📝</div><div className="pcl-section-title">Notes</div></div>
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
            <p>🔒 This portal is strictly confidential — do not share this link or its contents.</p>
          </motion.footer>

        </motion.div>
      </div>
    </>
  )
}
