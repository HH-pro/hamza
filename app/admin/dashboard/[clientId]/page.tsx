'use client'
import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  getClient, updateClient, getProjects, addProject, updateProject, deleteProject,
  type Client, type Project, type BusinessEmail, type CustomField,
  type SocialAccount, type ThirdPartyService,
} from '@/lib/firestore'

const blankHosting    = { provider: '', plan: '', expiryDate: '', cost: '', loginUrl: '', username: '', password: '' }
const blankDomainInfo = { registrar: '', expiryDate: '', autoRenew: '', loginUrl: '', username: '', password: '' }
const blankAppStores  = { playStoreUrl: '', playStoreAccount: '', playStorePassword: '', appStoreUrl: '', appStoreAccount: '', appStorePassword: '' }
const blankDatabase   = { type: '', provider: '', notes: '' }
const blankEmailHosting = { provider: '', plan: '', expiryDate: '', cost: '', loginUrl: '', adminEmail: '', adminPassword: '' }

const blankProject: Omit<Project, 'id' | 'createdAt'> = {
  name: '', type: 'website', status: 'development', domain: '',
  domainInfo: blankDomainInfo,
  hosting: blankHosting,
  appStores: blankAppStores,
  database: blankDatabase,
  emailHosting: blankEmailHosting,
  techStack: [],
  socialAccounts: [],
  services: [],
  businessEmails: [],
  customFields: [],
  notes: '',
}

export default function ClientDetail() {
  const { clientId } = useParams() as { clientId: string }
  const router = useRouter()

  const [client, setClient]   = useState<Client | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading]  = useState(true)

  const [showProjForm, setShowProjForm] = useState(false)
  const [editingProj, setEditingProj]   = useState<Project | null>(null)
  const [pForm, setPForm] = useState<Omit<Project, 'id' | 'createdAt'>>(blankProject)
  const [techInput, setTechInput] = useState('')
  const [saving, setSaving] = useState(false)

  const [expanded, setExpanded] = useState<string | null>(null)
  const [copied, setCopied]     = useState<string | null>(null)

  const [editingClient, setEditingClient] = useState(false)
  const [cForm, setCForm] = useState({ name: '', company: '', email: '', portalPassword: '' })

  const load = useCallback(async () => {
    setLoading(true)
    const [c, p] = await Promise.all([getClient(clientId), getProjects(clientId)])
    if (!c) { router.replace('/admin/dashboard'); return }
    setClient(c)
    setProjects(p)
    setCForm({ name: c.name, company: c.company, email: c.email, portalPassword: c.portalPassword })
    setLoading(false)
  }, [clientId, router])

  useEffect(() => { load() }, [load])

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2500)
  }

  function portalUrl() { return `${window.location.origin}/portal/${clientId}` }

  async function saveClient(e: React.FormEvent) {
    e.preventDefault(); setSaving(true)
    await updateClient(clientId, cForm)
    setEditingClient(false); await load(); setSaving(false)
  }

  function openAddProj() {
    setEditingProj(null); setPForm(blankProject); setTechInput(''); setShowProjForm(true)
  }

  function openEditProj(p: Project) {
    setEditingProj(p)
    setPForm({
      name: p.name, type: p.type, status: p.status, domain: p.domain,
      domainInfo:   { ...blankDomainInfo,   ...(p.domainInfo   || {}) },
      hosting:      { ...blankHosting,      ...(p.hosting      || {}) },
      appStores:    { ...blankAppStores,    ...(p.appStores    || {}) },
      database:     { ...blankDatabase,     ...(p.database     || {}) },
      emailHosting: { ...blankEmailHosting, ...(p.emailHosting || {}) },
      techStack:      [...(p.techStack      || [])],
      socialAccounts: (p.socialAccounts  || []).map(s => ({ ...s })),
      services:       (p.services        || []).map(s => ({ ...s })),
      businessEmails: (p.businessEmails  || []).map(e => ({ ...e })),
      customFields:   (p.customFields    || []).map(f => ({ ...f })),
      notes: p.notes || '',
    })
    setTechInput(''); setShowProjForm(true)
  }

  async function submitProject(e: React.FormEvent) {
    e.preventDefault(); setSaving(true)
    try {
      if (editingProj?.id) await updateProject(clientId, editingProj.id, pForm)
      else await addProject(clientId, pForm)
      setShowProjForm(false); await load()
    } finally { setSaving(false) }
  }

  async function delProject(p: Project) {
    if (!confirm(`Delete project "${p.name}"? This cannot be undone.`)) return
    await deleteProject(clientId, p.id!); await load()
  }

  // Tech Stack
  function addTech() {
    const t = techInput.trim()
    if (!t || pForm.techStack.includes(t)) { setTechInput(''); return }
    setPForm(p => ({ ...p, techStack: [...p.techStack, t] })); setTechInput('')
  }
  function removeTech(t: string) {
    setPForm(p => ({ ...p, techStack: p.techStack.filter(x => x !== t) }))
  }

  // Business Emails
  function addEmail() {
    setPForm(p => ({ ...p, businessEmails: [...p.businessEmails, { email: '', provider: '', password: '', purpose: '' }] }))
  }
  function updEmail(i: number, field: keyof BusinessEmail, val: string) {
    setPForm(p => { const a = [...p.businessEmails]; a[i] = { ...a[i], [field]: val }; return { ...p, businessEmails: a } })
  }
  function removeEmail(i: number) {
    setPForm(p => ({ ...p, businessEmails: p.businessEmails.filter((_, idx) => idx !== i) }))
  }

  // Social Accounts
  function addSocial() {
    setPForm(p => ({ ...p, socialAccounts: [...(p.socialAccounts || []), { platform: '', url: '', username: '', email: '', password: '' }] }))
  }
  function updSocial(i: number, field: keyof SocialAccount, val: string) {
    setPForm(p => { const a = [...(p.socialAccounts || [])]; a[i] = { ...a[i], [field]: val }; return { ...p, socialAccounts: a } })
  }
  function removeSocial(i: number) {
    setPForm(p => ({ ...p, socialAccounts: (p.socialAccounts || []).filter((_, idx) => idx !== i) }))
  }

  // Third-party Services
  function addService() {
    setPForm(p => ({ ...p, services: [...(p.services || []), { name: '', type: '', loginUrl: '', username: '', password: '', apiKey: '' }] }))
  }
  function updService(i: number, field: keyof ThirdPartyService, val: string) {
    setPForm(p => { const a = [...(p.services || [])]; a[i] = { ...a[i], [field]: val }; return { ...p, services: a } })
  }
  function removeService(i: number) {
    setPForm(p => ({ ...p, services: (p.services || []).filter((_, idx) => idx !== i) }))
  }

  // Custom Fields
  function addCustomField() {
    setPForm(p => ({ ...p, customFields: [...(p.customFields || []), { label: '', value: '', type: 'text' as const }] }))
  }
  function updCustomField(i: number, field: keyof CustomField, val: string) {
    setPForm(p => { const a = [...(p.customFields || [])]; a[i] = { ...a[i], [field]: val }; return { ...p, customFields: a } })
  }
  function removeCustomField(i: number) {
    setPForm(p => ({ ...p, customFields: (p.customFields || []).filter((_, idx) => idx !== i) }))
  }

  const statusColors: Record<string, string> = {
    active: '#22c55e', development: '#f59e0b', maintenance: '#3b82f6', paused: '#6b7280',
  }

  if (loading) return <div className="admin-loading-full"><div className="admin-spinner" /></div>
  if (!client) return null

  const h = (s: string) => <div className="aform-section">{s}</div>

  return (
    <div className="admin-page">
      <nav className="admin-nav">
        <div className="admin-nav-left">
          <Link href="/admin/dashboard" className="btn-back">← Back</Link>
          <span className="admin-nav-brand">{client.company}</span>
        </div>
      </nav>

      <div className="admin-body">
        {/* ── Client Info Card ── */}
        <div className="info-card">
          {editingClient ? (
            <form onSubmit={saveClient} className="aform">
              <div className="aform-row">
                <div className="aform-group">
                  <label>Contact Name</label>
                  <input required value={cForm.name} onChange={e => setCForm(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div className="aform-group">
                  <label>Company Name</label>
                  <input required value={cForm.company} onChange={e => setCForm(p => ({ ...p, company: e.target.value }))} />
                </div>
              </div>
              <div className="aform-row">
                <div className="aform-group">
                  <label>Email</label>
                  <input type="email" required value={cForm.email} onChange={e => setCForm(p => ({ ...p, email: e.target.value }))} />
                </div>
                <div className="aform-group">
                  <label>Portal Password</label>
                  <input required value={cForm.portalPassword} onChange={e => setCForm(p => ({ ...p, portalPassword: e.target.value }))} />
                </div>
              </div>
              <div className="aform-actions">
                <button type="button" className="btn-cancel" onClick={() => setEditingClient(false)}>Cancel</button>
                <button type="submit" className="btn-save" disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</button>
              </div>
            </form>
          ) : (
            <>
              <div className="info-card-head">
                <div>
                  <h2 className="info-client-name">{client.name}</h2>
                  <span className="info-client-company">{client.company}</span>
                </div>
                <button className="btn-edit" onClick={() => setEditingClient(true)}>Edit</button>
              </div>
              <div className="info-rows">
                <div className="info-row">
                  <span className="info-label">Email</span>
                  <span className="info-val">{client.email}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Portal Password</span>
                  <span className="info-val info-cred">
                    {client.portalPassword}
                    <button className="btn-copy" onClick={() => copy(client.portalPassword, 'cpwd')}>{copied === 'cpwd' ? '✓' : 'Copy'}</button>
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Portal Link</span>
                  <span className="info-val info-link">
                    {portalUrl()}
                    <button className="btn-copy" onClick={() => copy(portalUrl(), 'plink')}>{copied === 'plink' ? '✓ Copied' : 'Copy Link'}</button>
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── Projects Header ── */}
        <div className="section-row">
          <h3 className="section-title">Projects <span className="count-badge">{projects.length}</span></h3>
          <button className="btn-add" onClick={openAddProj}>+ Add Project</button>
        </div>

        {projects.length === 0 ? (
          <div className="admin-empty">
            <div className="empty-icon">📁</div>
            <p>No projects yet. Add the first project above.</p>
          </div>
        ) : (
          <div className="proj-list">
            {projects.map(proj => (
              <div key={proj.id} className="proj-card">
                <div className="proj-card-head" onClick={() => setExpanded(expanded === proj.id ? null : proj.id!)}>
                  <div className="proj-title-row">
                    <h4 className="proj-name">{proj.name}</h4>
                    <div className="proj-badges">
                      <span className="badge-type">{proj.type}</span>
                      <span className="badge-status" style={{ background: statusColors[proj.status] + '22', color: statusColors[proj.status], borderColor: statusColors[proj.status] + '44' }}>
                        {proj.status}
                      </span>
                    </div>
                    {proj.domain && <span className="proj-domain">{proj.domain}</span>}
                  </div>
                  <div className="proj-head-right" onClick={e => e.stopPropagation()}>
                    <button className="btn-edit" onClick={() => openEditProj(proj)}>Edit</button>
                    <button className="btn-delete" onClick={() => delProject(proj)}>Delete</button>
                    <span className="toggle-icon">{expanded === proj.id ? '▲' : '▼'}</span>
                  </div>
                </div>

                {expanded === proj.id && (
                  <div className="proj-body">

                    {/* Domain Registrar */}
                    {(proj.domainInfo?.registrar || proj.domainInfo?.loginUrl) && (
                      <div className="detail-block">
                        <div className="detail-block-title">🌍 Domain Registrar</div>
                        <div className="detail-grid">
                          {proj.domainInfo.registrar && <div className="dg-item"><span>Registrar</span><strong>{proj.domainInfo.registrar}</strong></div>}
                          {proj.domain && <div className="dg-item"><span>Domain Name</span><strong>{proj.domain}</strong></div>}
                          {proj.domainInfo.expiryDate && <div className="dg-item"><span>Expiry</span><strong>{proj.domainInfo.expiryDate}</strong></div>}
                          {proj.domainInfo.autoRenew && <div className="dg-item"><span>Auto Renew</span><strong>{proj.domainInfo.autoRenew}</strong></div>}
                          {proj.domainInfo.loginUrl && <div className="dg-item dg-full"><span>Login URL</span><strong><a href={proj.domainInfo.loginUrl} target="_blank" rel="noopener noreferrer">{proj.domainInfo.loginUrl}</a></strong></div>}
                          {proj.domainInfo.username && <div className="dg-item"><span>Username</span><strong className="cred-field">{proj.domainInfo.username}<button className="btn-copy" onClick={() => copy(proj.domainInfo.username, `du-${proj.id}`)}>{copied === `du-${proj.id}` ? '✓' : 'Copy'}</button></strong></div>}
                          {proj.domainInfo.password && <div className="dg-item"><span>Password</span><strong className="cred-field">{proj.domainInfo.password}<button className="btn-copy" onClick={() => copy(proj.domainInfo.password, `dp-${proj.id}`)}>{copied === `dp-${proj.id}` ? '✓' : 'Copy'}</button></strong></div>}
                        </div>
                      </div>
                    )}

                    {/* Hosting */}
                    <div className="detail-block">
                      <div className="detail-block-title">🌐 Hosting</div>
                      <div className="detail-grid">
                        {proj.hosting.provider && <div className="dg-item"><span>Provider</span><strong>{proj.hosting.provider}</strong></div>}
                        {proj.hosting.plan && <div className="dg-item"><span>Plan</span><strong>{proj.hosting.plan}</strong></div>}
                        {proj.hosting.expiryDate && <div className="dg-item"><span>Expiry</span><strong>{proj.hosting.expiryDate}</strong></div>}
                        {proj.hosting.cost && <div className="dg-item"><span>Cost</span><strong>{proj.hosting.cost}</strong></div>}
                        {proj.hosting.loginUrl && <div className="dg-item dg-full"><span>Login URL</span><strong><a href={proj.hosting.loginUrl} target="_blank" rel="noopener noreferrer">{proj.hosting.loginUrl}</a></strong></div>}
                        {proj.hosting.username && <div className="dg-item"><span>Username</span><strong className="cred-field">{proj.hosting.username}<button className="btn-copy" onClick={() => copy(proj.hosting.username, `hu-${proj.id}`)}>{copied === `hu-${proj.id}` ? '✓' : 'Copy'}</button></strong></div>}
                        {proj.hosting.password && <div className="dg-item"><span>Password</span><strong className="cred-field">{proj.hosting.password}<button className="btn-copy" onClick={() => copy(proj.hosting.password, `hp-${proj.id}`)}>{copied === `hp-${proj.id}` ? '✓' : 'Copy'}</button></strong></div>}
                      </div>
                    </div>

                    {/* App Stores */}
                    {(proj.appStores?.playStoreUrl || proj.appStores?.appStoreUrl || proj.appStores?.playStoreAccount) && (
                      <div className="detail-block">
                        <div className="detail-block-title">📱 App Stores</div>
                        <div className="detail-grid">
                          {proj.appStores.playStoreUrl && <div className="dg-item dg-full"><span>Google Play Store</span><strong><a href={proj.appStores.playStoreUrl} target="_blank" rel="noopener noreferrer">{proj.appStores.playStoreUrl}</a></strong></div>}
                          {proj.appStores.playStoreAccount && <div className="dg-item"><span>Play Console Account</span><strong className="cred-field">{proj.appStores.playStoreAccount}</strong></div>}
                          {proj.appStores.playStorePassword && <div className="dg-item"><span>Play Console Password</span><strong className="cred-field">{proj.appStores.playStorePassword}<button className="btn-copy" onClick={() => copy(proj.appStores.playStorePassword, `gpp-${proj.id}`)}>{copied === `gpp-${proj.id}` ? '✓' : 'Copy'}</button></strong></div>}
                          {proj.appStores.appStoreUrl && <div className="dg-item dg-full"><span>Apple App Store</span><strong><a href={proj.appStores.appStoreUrl} target="_blank" rel="noopener noreferrer">{proj.appStores.appStoreUrl}</a></strong></div>}
                          {proj.appStores.appStoreAccount && <div className="dg-item"><span>Apple ID / Dev Account</span><strong className="cred-field">{proj.appStores.appStoreAccount}</strong></div>}
                          {proj.appStores.appStorePassword && <div className="dg-item"><span>Apple Account Password</span><strong className="cred-field">{proj.appStores.appStorePassword}<button className="btn-copy" onClick={() => copy(proj.appStores.appStorePassword, `app-${proj.id}`)}>{copied === `app-${proj.id}` ? '✓' : 'Copy'}</button></strong></div>}
                        </div>
                      </div>
                    )}

                    {/* Database */}
                    {(proj.database.type || proj.database.provider || proj.database.notes) && (
                      <div className="detail-block">
                        <div className="detail-block-title">🗄️ Database</div>
                        <div className="detail-grid">
                          {proj.database.type && <div className="dg-item"><span>Type</span><strong>{proj.database.type}</strong></div>}
                          {proj.database.provider && <div className="dg-item"><span>Provider</span><strong>{proj.database.provider}</strong></div>}
                          {proj.database.notes && <div className="dg-item dg-full"><span>Notes</span><strong style={{ whiteSpace: 'pre-wrap', fontWeight: 400 }}>{proj.database.notes}</strong></div>}
                        </div>
                      </div>
                    )}

                    {/* Email Hosting */}
                    {(proj.emailHosting?.provider || proj.emailHosting?.loginUrl) && (
                      <div className="detail-block">
                        <div className="detail-block-title">📧 Email Hosting</div>
                        <div className="detail-grid">
                          {proj.emailHosting.provider && <div className="dg-item"><span>Provider</span><strong>{proj.emailHosting.provider}</strong></div>}
                          {proj.emailHosting.plan && <div className="dg-item"><span>Plan</span><strong>{proj.emailHosting.plan}</strong></div>}
                          {proj.emailHosting.expiryDate && <div className="dg-item"><span>Expiry</span><strong>{proj.emailHosting.expiryDate}</strong></div>}
                          {proj.emailHosting.cost && <div className="dg-item"><span>Cost</span><strong>{proj.emailHosting.cost}</strong></div>}
                          {proj.emailHosting.loginUrl && <div className="dg-item dg-full"><span>Admin Login URL</span><strong><a href={proj.emailHosting.loginUrl} target="_blank" rel="noopener noreferrer">{proj.emailHosting.loginUrl}</a></strong></div>}
                          {proj.emailHosting.adminEmail && <div className="dg-item"><span>Admin Email</span><strong className="cred-field">{proj.emailHosting.adminEmail}<button className="btn-copy" onClick={() => copy(proj.emailHosting.adminEmail, `ehe-${proj.id}`)}>{copied === `ehe-${proj.id}` ? '✓' : 'Copy'}</button></strong></div>}
                          {proj.emailHosting.adminPassword && <div className="dg-item"><span>Admin Password</span><strong className="cred-field">{proj.emailHosting.adminPassword}<button className="btn-copy" onClick={() => copy(proj.emailHosting.adminPassword, `ehp-${proj.id}`)}>{copied === `ehp-${proj.id}` ? '✓' : 'Copy'}</button></strong></div>}
                        </div>
                      </div>
                    )}

                    {/* Tech Stack */}
                    {proj.techStack.length > 0 && (
                      <div className="detail-block">
                        <div className="detail-block-title">⚡ Tech Stack</div>
                        <div className="tech-tags">
                          {proj.techStack.map(t => <span key={t} className="tech-tag">{t}</span>)}
                        </div>
                      </div>
                    )}

                    {/* Social Media */}
                    {proj.socialAccounts && proj.socialAccounts.length > 0 && (
                      <div className="detail-block">
                        <div className="detail-block-title">📲 Social Media</div>
                        {proj.socialAccounts.map((s, i) => (
                          <div key={i} className="email-row">
                            <div className="email-row-left">
                              <strong>{s.platform}</strong>
                              {s.url && <a href={s.url} target="_blank" rel="noopener noreferrer" className="email-provider">{s.url}</a>}
                              {s.username && <span className="email-tag">@{s.username}</span>}
                              {s.email && <span className="email-provider">{s.email}</span>}
                            </div>
                            {s.password && (
                              <div className="email-row-right">
                                <span className="cred-field">{s.password}</span>
                                <button className="btn-copy" onClick={() => copy(s.password, `sp-${i}-${proj.id}`)}>{copied === `sp-${i}-${proj.id}` ? '✓' : 'Copy'}</button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Third-party Services */}
                    {proj.services && proj.services.length > 0 && (
                      <div className="detail-block">
                        <div className="detail-block-title">🔌 Services & APIs</div>
                        {proj.services.map((s, i) => (
                          <div key={i} className="detail-grid" style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #2a2a35' }}>
                            {s.name && <div className="dg-item"><span>Service</span><strong>{s.name}</strong></div>}
                            {s.type && <div className="dg-item"><span>Type</span><strong>{s.type}</strong></div>}
                            {s.loginUrl && <div className="dg-item dg-full"><span>Login URL</span><strong><a href={s.loginUrl} target="_blank" rel="noopener noreferrer">{s.loginUrl}</a></strong></div>}
                            {s.username && <div className="dg-item"><span>Username / Email</span><strong className="cred-field">{s.username}<button className="btn-copy" onClick={() => copy(s.username, `su-${i}-${proj.id}`)}>{copied === `su-${i}-${proj.id}` ? '✓' : 'Copy'}</button></strong></div>}
                            {s.password && <div className="dg-item"><span>Password</span><strong className="cred-field">{s.password}<button className="btn-copy" onClick={() => copy(s.password, `sv-${i}-${proj.id}`)}>{copied === `sv-${i}-${proj.id}` ? '✓' : 'Copy'}</button></strong></div>}
                            {s.apiKey && <div className="dg-item dg-full"><span>API Key</span><strong className="cred-field">{s.apiKey}<button className="btn-copy" onClick={() => copy(s.apiKey, `sk-${i}-${proj.id}`)}>{copied === `sk-${i}-${proj.id}` ? '✓' : 'Copy'}</button></strong></div>}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Business Emails */}
                    {proj.businessEmails.length > 0 && (
                      <div className="detail-block">
                        <div className="detail-block-title">✉️ Business Emails</div>
                        {proj.businessEmails.map((em, i) => (
                          <div key={i} className="email-row">
                            <div className="email-row-left">
                              <strong>{em.email}</strong>
                              {em.purpose && <span className="email-tag">{em.purpose}</span>}
                              {em.provider && <span className="email-provider">{em.provider}</span>}
                            </div>
                            {em.password && (
                              <div className="email-row-right">
                                <span className="cred-field">{em.password}</span>
                                <button className="btn-copy" onClick={() => copy(em.password, `ep-${i}-${proj.id}`)}>{copied === `ep-${i}-${proj.id}` ? '✓' : 'Copy'}</button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Custom Fields */}
                    {proj.customFields && proj.customFields.length > 0 && (
                      <div className="detail-block">
                        <div className="detail-block-title">✨ Custom Fields</div>
                        <div className="detail-grid">
                          {proj.customFields.map((field, i) => (
                            <div key={i} className={`dg-item ${field.type === 'url' ? 'dg-full' : ''}`}>
                              <span>{field.label}</span>
                              <strong className={field.type === 'password' ? 'cred-field' : ''}>
                                {field.type === 'url' ? <a href={field.value} target="_blank" rel="noopener noreferrer">{field.value}</a> : field.value}
                                {(field.type === 'password' || field.type === 'url') && (
                                  <button className="btn-copy" onClick={() => copy(field.value, `cf-${i}-${proj.id}`)}>{copied === `cf-${i}-${proj.id}` ? '✓' : 'Copy'}</button>
                                )}
                              </strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {proj.notes && (
                      <div className="detail-block">
                        <div className="detail-block-title">📝 Notes</div>
                        <div className="notes-text">{proj.notes}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Project Form Modal ── */}
      {showProjForm && (
        <div className="adm-overlay" onClick={() => setShowProjForm(false)}>
          <div className="adm-modal adm-modal-lg" onClick={e => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h3>{editingProj ? 'Edit Project' : 'Add New Project'}</h3>
              <button className="modal-x" onClick={() => setShowProjForm(false)}>✕</button>
            </div>
            <form onSubmit={submitProject} className="aform">

              {/* ── Basic Info ── */}
              {h('📋 Basic Info')}
              <div className="aform-row">
                <div className="aform-group">
                  <label>Project Name *</label>
                  <input required value={pForm.name} onChange={e => setPForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Main Website, Customer App" />
                </div>
                <div className="aform-group">
                  <label>Domain / Website</label>
                  <input value={pForm.domain} onChange={e => setPForm(p => ({ ...p, domain: e.target.value }))} placeholder="example.com" />
                </div>
              </div>
              <div className="aform-row">
                <div className="aform-group">
                  <label>Project Type</label>
                  <select value={pForm.type} onChange={e => setPForm(p => ({ ...p, type: e.target.value as Project['type'] }))}>
                    <option value="website">Website</option>
                    <option value="app">Mobile App</option>
                    <option value="both">Website + Mobile App</option>
                  </select>
                </div>
                <div className="aform-group">
                  <label>Status</label>
                  <select value={pForm.status} onChange={e => setPForm(p => ({ ...p, status: e.target.value as Project['status'] }))}>
                    <option value="active">Active (Live)</option>
                    <option value="development">In Development</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              </div>

              {/* ── Domain Registrar ── */}
              {h('🌍 Domain Registrar')}
              <div className="aform-row">
                <div className="aform-group">
                  <label>Registrar</label>
                  <input value={pForm.domainInfo.registrar} onChange={e => setPForm(p => ({ ...p, domainInfo: { ...p.domainInfo, registrar: e.target.value } }))} placeholder="e.g. Namecheap, GoDaddy, Cloudflare" />
                </div>
                <div className="aform-group">
                  <label>Expiry Date</label>
                  <input type="date" value={pForm.domainInfo.expiryDate} onChange={e => setPForm(p => ({ ...p, domainInfo: { ...p.domainInfo, expiryDate: e.target.value } }))} />
                </div>
              </div>
              <div className="aform-row">
                <div className="aform-group">
                  <label>Auto Renew</label>
                  <select value={pForm.domainInfo.autoRenew} onChange={e => setPForm(p => ({ ...p, domainInfo: { ...p.domainInfo, autoRenew: e.target.value } }))}>
                    <option value="">— Not set —</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="aform-group">
                  <label>Login URL</label>
                  <input value={pForm.domainInfo.loginUrl} onChange={e => setPForm(p => ({ ...p, domainInfo: { ...p.domainInfo, loginUrl: e.target.value } }))} placeholder="https://..." />
                </div>
              </div>
              <div className="aform-row">
                <div className="aform-group">
                  <label>Username / Email</label>
                  <input value={pForm.domainInfo.username} onChange={e => setPForm(p => ({ ...p, domainInfo: { ...p.domainInfo, username: e.target.value } }))} />
                </div>
                <div className="aform-group">
                  <label>Password</label>
                  <input value={pForm.domainInfo.password} onChange={e => setPForm(p => ({ ...p, domainInfo: { ...p.domainInfo, password: e.target.value } }))} />
                </div>
              </div>

              {/* ── Hosting ── */}
              {h('🌐 Web Hosting')}
              <div className="aform-row">
                <div className="aform-group">
                  <label>Provider</label>
                  <input value={pForm.hosting.provider} onChange={e => setPForm(p => ({ ...p, hosting: { ...p.hosting, provider: e.target.value } }))} placeholder="e.g. Vercel, Hostinger, AWS, DigitalOcean" />
                </div>
                <div className="aform-group">
                  <label>Plan</label>
                  <input value={pForm.hosting.plan} onChange={e => setPForm(p => ({ ...p, hosting: { ...p.hosting, plan: e.target.value } }))} placeholder="e.g. Pro, Business, Starter" />
                </div>
              </div>
              <div className="aform-row">
                <div className="aform-group">
                  <label>Expiry Date</label>
                  <input type="date" value={pForm.hosting.expiryDate} onChange={e => setPForm(p => ({ ...p, hosting: { ...p.hosting, expiryDate: e.target.value } }))} />
                </div>
                <div className="aform-group">
                  <label>Monthly Cost</label>
                  <input value={pForm.hosting.cost} onChange={e => setPForm(p => ({ ...p, hosting: { ...p.hosting, cost: e.target.value } }))} placeholder="e.g. $20/month, PKR 5000/year" />
                </div>
              </div>
              <div className="aform-group">
                <label>Control Panel / Login URL</label>
                <input value={pForm.hosting.loginUrl} onChange={e => setPForm(p => ({ ...p, hosting: { ...p.hosting, loginUrl: e.target.value } }))} placeholder="https://..." />
              </div>
              <div className="aform-row">
                <div className="aform-group">
                  <label>Username</label>
                  <input value={pForm.hosting.username} onChange={e => setPForm(p => ({ ...p, hosting: { ...p.hosting, username: e.target.value } }))} />
                </div>
                <div className="aform-group">
                  <label>Password</label>
                  <input value={pForm.hosting.password} onChange={e => setPForm(p => ({ ...p, hosting: { ...p.hosting, password: e.target.value } }))} />
                </div>
              </div>

              {/* ── App Stores (shown for app/both) ── */}
              {(pForm.type === 'app' || pForm.type === 'both') && (
                <>
                  {h('📱 App Stores')}
                  <div className="aform-group">
                    <label>Google Play Store URL</label>
                    <input value={pForm.appStores.playStoreUrl} onChange={e => setPForm(p => ({ ...p, appStores: { ...p.appStores, playStoreUrl: e.target.value } }))} placeholder="https://play.google.com/store/apps/details?id=..." />
                  </div>
                  <div className="aform-row">
                    <div className="aform-group">
                      <label>Play Console Account (Email)</label>
                      <input value={pForm.appStores.playStoreAccount} onChange={e => setPForm(p => ({ ...p, appStores: { ...p.appStores, playStoreAccount: e.target.value } }))} placeholder="developer@gmail.com" />
                    </div>
                    <div className="aform-group">
                      <label>Play Console Password</label>
                      <input value={pForm.appStores.playStorePassword} onChange={e => setPForm(p => ({ ...p, appStores: { ...p.appStores, playStorePassword: e.target.value } }))} />
                    </div>
                  </div>
                  <div className="aform-group">
                    <label>Apple App Store URL</label>
                    <input value={pForm.appStores.appStoreUrl} onChange={e => setPForm(p => ({ ...p, appStores: { ...p.appStores, appStoreUrl: e.target.value } }))} placeholder="https://apps.apple.com/app/..." />
                  </div>
                  <div className="aform-row">
                    <div className="aform-group">
                      <label>Apple ID / Developer Account</label>
                      <input value={pForm.appStores.appStoreAccount} onChange={e => setPForm(p => ({ ...p, appStores: { ...p.appStores, appStoreAccount: e.target.value } }))} placeholder="appleid@email.com" />
                    </div>
                    <div className="aform-group">
                      <label>Apple Account Password</label>
                      <input value={pForm.appStores.appStorePassword} onChange={e => setPForm(p => ({ ...p, appStores: { ...p.appStores, appStorePassword: e.target.value } }))} />
                    </div>
                  </div>
                </>
              )}

              {/* ── Database ── */}
              {h('🗄️ Database')}
              <div className="aform-row">
                <div className="aform-group">
                  <label>Database Type</label>
                  <input value={pForm.database.type} onChange={e => setPForm(p => ({ ...p, database: { ...p.database, type: e.target.value } }))} placeholder="e.g. PostgreSQL, MongoDB, MySQL, Firebase" />
                </div>
                <div className="aform-group">
                  <label>Provider / Host</label>
                  <input value={pForm.database.provider} onChange={e => setPForm(p => ({ ...p, database: { ...p.database, provider: e.target.value } }))} placeholder="e.g. Supabase, Railway, PlanetScale, Atlas" />
                </div>
              </div>
              <div className="aform-group">
                <label>Connection Info / Notes</label>
                <textarea rows={3} value={pForm.database.notes} onChange={e => setPForm(p => ({ ...p, database: { ...p.database, notes: e.target.value } }))} placeholder="Connection string, credentials, backup info..." />
              </div>

              {/* ── Email Hosting ── */}
              {h('📧 Email Hosting')}
              <div className="aform-row">
                <div className="aform-group">
                  <label>Provider</label>
                  <input value={pForm.emailHosting.provider} onChange={e => setPForm(p => ({ ...p, emailHosting: { ...p.emailHosting, provider: e.target.value } }))} placeholder="e.g. Google Workspace, Zoho, Titan, cPanel Mail" />
                </div>
                <div className="aform-group">
                  <label>Plan</label>
                  <input value={pForm.emailHosting.plan} onChange={e => setPForm(p => ({ ...p, emailHosting: { ...p.emailHosting, plan: e.target.value } }))} placeholder="e.g. Business Starter, Free" />
                </div>
              </div>
              <div className="aform-row">
                <div className="aform-group">
                  <label>Expiry Date</label>
                  <input type="date" value={pForm.emailHosting.expiryDate} onChange={e => setPForm(p => ({ ...p, emailHosting: { ...p.emailHosting, expiryDate: e.target.value } }))} />
                </div>
                <div className="aform-group">
                  <label>Monthly Cost</label>
                  <input value={pForm.emailHosting.cost} onChange={e => setPForm(p => ({ ...p, emailHosting: { ...p.emailHosting, cost: e.target.value } }))} placeholder="e.g. $6/user/month" />
                </div>
              </div>
              <div className="aform-group">
                <label>Admin Login URL</label>
                <input value={pForm.emailHosting.loginUrl} onChange={e => setPForm(p => ({ ...p, emailHosting: { ...p.emailHosting, loginUrl: e.target.value } }))} placeholder="https://admin.google.com or https://mail.zoho.com" />
              </div>
              <div className="aform-row">
                <div className="aform-group">
                  <label>Admin Email / Username</label>
                  <input value={pForm.emailHosting.adminEmail} onChange={e => setPForm(p => ({ ...p, emailHosting: { ...p.emailHosting, adminEmail: e.target.value } }))} placeholder="admin@company.com" />
                </div>
                <div className="aform-group">
                  <label>Admin Password</label>
                  <input value={pForm.emailHosting.adminPassword} onChange={e => setPForm(p => ({ ...p, emailHosting: { ...p.emailHosting, adminPassword: e.target.value } }))} />
                </div>
              </div>

              {/* ── Tech Stack ── */}
              {h('⚡ Tech Stack')}
              <div className="aform-group">
                <label>Add Technologies (press Enter or click Add)</label>
                <div className="tag-input-row">
                  <input
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTech() } }}
                    placeholder="e.g. Next.js, React Native, TypeScript, Tailwind CSS, Node.js..."
                  />
                  <button type="button" className="btn-tag-add" onClick={addTech}>Add</button>
                </div>
                {pForm.techStack.length > 0 && (
                  <div className="tech-tags" style={{ marginTop: 10 }}>
                    {pForm.techStack.map(t => (
                      <span key={t} className="tech-tag tech-tag-rm">
                        {t} <button type="button" onClick={() => removeTech(t)}>×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Social Media ── */}
              {h('📲 Social Media Accounts')}
              {(pForm.socialAccounts || []).map((s, i) => (
                <div key={i} className="email-form-block">
                  <div className="aform-row">
                    <div className="aform-group">
                      <label>Platform</label>
                      <input value={s.platform} onChange={e => updSocial(i, 'platform', e.target.value)} placeholder="e.g. Facebook, Instagram, LinkedIn, YouTube" />
                    </div>
                    <div className="aform-group">
                      <label>Profile URL</label>
                      <input value={s.url} onChange={e => updSocial(i, 'url', e.target.value)} placeholder="https://facebook.com/pagename" />
                    </div>
                  </div>
                  <div className="aform-row">
                    <div className="aform-group">
                      <label>Username / Handle</label>
                      <input value={s.username} onChange={e => updSocial(i, 'username', e.target.value)} placeholder="@handle" />
                    </div>
                    <div className="aform-group">
                      <label>Login Email</label>
                      <input value={s.email} onChange={e => updSocial(i, 'email', e.target.value)} placeholder="email@example.com" />
                    </div>
                  </div>
                  <div className="aform-row">
                    <div className="aform-group">
                      <label>Password</label>
                      <input value={s.password} onChange={e => updSocial(i, 'password', e.target.value)} />
                    </div>
                    <div className="aform-group" style={{ justifyContent: 'flex-end' }}>
                      <button type="button" className="btn-remove-email" style={{ marginTop: 24 }} onClick={() => removeSocial(i)}>− Remove Account</button>
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" className="btn-add-email" onClick={addSocial}>+ Add Social Account</button>

              {/* ── Third-party Services ── */}
              {h('🔌 Services & APIs')}
              <p style={{ margin: '-8px 0 12px', fontSize: 12, color: 'var(--amuted)' }}>
                Add third-party services like Stripe, Google Analytics, Mailchimp, Firebase, AWS, etc.
              </p>
              {(pForm.services || []).map((s, i) => (
                <div key={i} className="email-form-block">
                  <div className="aform-row">
                    <div className="aform-group">
                      <label>Service Name</label>
                      <input value={s.name} onChange={e => updService(i, 'name', e.target.value)} placeholder="e.g. Stripe, Google Analytics, Firebase" />
                    </div>
                    <div className="aform-group">
                      <label>Type / Category</label>
                      <input value={s.type} onChange={e => updService(i, 'type', e.target.value)} placeholder="e.g. Payments, Analytics, Push Notifications" />
                    </div>
                  </div>
                  <div className="aform-group">
                    <label>Login / Dashboard URL</label>
                    <input value={s.loginUrl} onChange={e => updService(i, 'loginUrl', e.target.value)} placeholder="https://dashboard.stripe.com" />
                  </div>
                  <div className="aform-row">
                    <div className="aform-group">
                      <label>Username / Email</label>
                      <input value={s.username} onChange={e => updService(i, 'username', e.target.value)} />
                    </div>
                    <div className="aform-group">
                      <label>Password</label>
                      <input value={s.password} onChange={e => updService(i, 'password', e.target.value)} />
                    </div>
                  </div>
                  <div className="aform-row">
                    <div className="aform-group" style={{ flex: 1 }}>
                      <label>API Key / Secret Key</label>
                      <input value={s.apiKey} onChange={e => updService(i, 'apiKey', e.target.value)} placeholder="sk_live_... or any API key" />
                    </div>
                    <div className="aform-group" style={{ justifyContent: 'flex-end' }}>
                      <button type="button" className="btn-remove-email" style={{ marginTop: 24 }} onClick={() => removeService(i)}>− Remove</button>
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" className="btn-add-email" onClick={addService}>+ Add Service / API</button>

              {/* ── Business Emails ── */}
              {h('✉️ Business Email Accounts')}
              {pForm.businessEmails.map((em, i) => (
                <div key={i} className="email-form-block">
                  <div className="aform-row">
                    <div className="aform-group">
                      <label>Email Address</label>
                      <input value={em.email} onChange={e => updEmail(i, 'email', e.target.value)} placeholder="hello@company.com" />
                    </div>
                    <div className="aform-group">
                      <label>Purpose</label>
                      <input value={em.purpose} onChange={e => updEmail(i, 'purpose', e.target.value)} placeholder="e.g. Main, Support, Sales, Info" />
                    </div>
                  </div>
                  <div className="aform-row">
                    <div className="aform-group">
                      <label>Email Provider</label>
                      <input value={em.provider} onChange={e => updEmail(i, 'provider', e.target.value)} placeholder="e.g. Google Workspace, Zoho, Outlook" />
                    </div>
                    <div className="aform-group">
                      <label>Password</label>
                      <input value={em.password} onChange={e => updEmail(i, 'password', e.target.value)} />
                    </div>
                  </div>
                  <button type="button" className="btn-remove-email" onClick={() => removeEmail(i)}>− Remove Email</button>
                </div>
              ))}
              <button type="button" className="btn-add-email" onClick={addEmail}>+ Add Email Account</button>

              {/* ── Custom Fields ── */}
              {h('✨ Custom Fields')}
              <p style={{ margin: '-8px 0 12px', fontSize: 12, color: 'var(--amuted)' }}>
                Add any additional fields — FTP, cPanel, API keys, extra credentials, etc.
              </p>
              {(pForm.customFields || []).map((field, i) => (
                <div key={i} className="custom-field-block">
                  <div className="aform-row">
                    <div className="aform-group">
                      <label>Field Label</label>
                      <input value={field.label} onChange={e => updCustomField(i, 'label', e.target.value)} placeholder="e.g. FTP Host, cPanel URL, Webhook Secret" />
                    </div>
                    <div className="aform-group" style={{ maxWidth: 150 }}>
                      <label>Field Type</label>
                      <select value={field.type} onChange={e => updCustomField(i, 'type', e.target.value as CustomField['type'])}>
                        <option value="text">Text</option>
                        <option value="url">URL / Link</option>
                        <option value="password">Password / Key</option>
                      </select>
                    </div>
                  </div>
                  <div className="aform-row" style={{ alignItems: 'flex-end' }}>
                    <div className="aform-group" style={{ flex: 1 }}>
                      <label>Value</label>
                      <input value={field.value} onChange={e => updCustomField(i, 'value', e.target.value)} placeholder="Enter value…" />
                    </div>
                    <button type="button" className="btn-remove-email" style={{ marginBottom: 0, height: 40, alignSelf: 'flex-end' }} onClick={() => removeCustomField(i)}>− Remove</button>
                  </div>
                </div>
              ))}
              <button type="button" className="btn-add-email" onClick={addCustomField}>+ Add Custom Field</button>

              {/* ── Notes ── */}
              {h('📝 Notes')}
              <div className="aform-group">
                <textarea rows={4} value={pForm.notes} onChange={e => setPForm(p => ({ ...p, notes: e.target.value }))} placeholder="Any additional notes about this project..." />
              </div>

              <div className="aform-actions aform-actions-sticky">
                <button type="button" className="btn-cancel" onClick={() => setShowProjForm(false)}>Cancel</button>
                <button type="submit" className="btn-save" disabled={saving}>
                  {saving ? 'Saving…' : editingProj ? 'Save Changes' : 'Add Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
