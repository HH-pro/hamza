'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  addProject, updateProject,
  type Project, type BusinessEmail, type CustomField,
  type SocialAccount, type ThirdPartyService,
} from '@/lib/firestore'
import { Icons as I } from '@/components/ui/Icons'

const blankHosting      = { provider: '', plan: '', expiryDate: '', cost: '', loginUrl: '', username: '', password: '' }
const blankDomainInfo   = { registrar: '', expiryDate: '', autoRenew: '', loginUrl: '', username: '', password: '' }
const blankAppStores    = { playStoreUrl: '', playStoreAccount: '', playStorePassword: '', appStoreUrl: '', appStoreAccount: '', appStorePassword: '' }
const blankDatabase     = { type: '', provider: '', notes: '' }
const blankEmailHosting = { provider: '', plan: '', expiryDate: '', cost: '', loginUrl: '', adminEmail: '', adminPassword: '' }

export const blankProject: Omit<Project, 'id' | 'createdAt'> = {
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

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

function Section({ icon, title }: { icon: React.ReactNode; title: string }) {
  return <div className="pe-section">{icon}<span>{title}</span></div>
}

export default function ProjectEditor({
  clientId, editing, onClose, onSaved,
}: {
  clientId: string
  editing: Project | null
  onClose: () => void
  onSaved: (msg: string) => void
}) {
  const [pForm, setPForm] = useState<Omit<Project, 'id' | 'createdAt'>>(() =>
    editing
      ? {
          name: editing.name, type: editing.type, status: editing.status, domain: editing.domain || '',
          domainInfo:   { ...blankDomainInfo,   ...(editing.domainInfo   || {}) },
          hosting:      { ...blankHosting,      ...(editing.hosting      || {}) },
          appStores:    { ...blankAppStores,    ...(editing.appStores    || {}) },
          database:     { ...blankDatabase,     ...(editing.database     || {}) },
          emailHosting: { ...blankEmailHosting, ...(editing.emailHosting || {}) },
          techStack:      [...(editing.techStack      || [])],
          socialAccounts: (editing.socialAccounts || []).map(s => ({ ...s })),
          services:       (editing.services       || []).map(s => ({ ...s })),
          businessEmails: (editing.businessEmails || []).map(e => ({ ...e })),
          customFields:   (editing.customFields   || []).map(f => ({ ...f })),
          notes: editing.notes || '',
        }
      : { ...blankProject },
  )
  const [techInput, setTechInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const isApp = pForm.type === 'app' || pForm.type === 'both'

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!pForm.name.trim()) { setError('Project name is required.'); return }
    setSaving(true); setError('')
    try {
      if (editing?.id) { await updateProject(clientId, editing.id, pForm); onSaved(`“${pForm.name}” updated`) }
      else { await addProject(clientId, pForm); onSaved(`“${pForm.name}” added`) }
    } catch (err) {
      const code = (err as { code?: string })?.code || ''
      setError(code.includes('permission')
        ? 'Permission denied — your owner session may have expired. Sign in again.'
        : 'Could not save. Please try again.')
      setSaving(false)
    }
  }

  /* Tech stack */
  function addTech() {
    const t = techInput.trim()
    if (!t || pForm.techStack.includes(t)) { setTechInput(''); return }
    setPForm(p => ({ ...p, techStack: [...p.techStack, t] })); setTechInput('')
  }
  const removeTech = (t: string) => setPForm(p => ({ ...p, techStack: p.techStack.filter(x => x !== t) }))

  /* Business emails */
  const addEmail = () => setPForm(p => ({ ...p, businessEmails: [...p.businessEmails, { email: '', provider: '', password: '', purpose: '' }] }))
  const updEmail = (i: number, f: keyof BusinessEmail, v: string) => setPForm(p => { const a = [...p.businessEmails]; a[i] = { ...a[i], [f]: v }; return { ...p, businessEmails: a } })
  const removeEmail = (i: number) => setPForm(p => ({ ...p, businessEmails: p.businessEmails.filter((_, x) => x !== i) }))

  /* Social */
  const addSocial = () => setPForm(p => ({ ...p, socialAccounts: [...(p.socialAccounts || []), { platform: '', url: '', username: '', email: '', password: '' }] }))
  const updSocial = (i: number, f: keyof SocialAccount, v: string) => setPForm(p => { const a = [...(p.socialAccounts || [])]; a[i] = { ...a[i], [f]: v }; return { ...p, socialAccounts: a } })
  const removeSocial = (i: number) => setPForm(p => ({ ...p, socialAccounts: (p.socialAccounts || []).filter((_, x) => x !== i) }))

  /* Services */
  const addService = () => setPForm(p => ({ ...p, services: [...(p.services || []), { name: '', type: '', loginUrl: '', username: '', password: '', apiKey: '' }] }))
  const updService = (i: number, f: keyof ThirdPartyService, v: string) => setPForm(p => { const a = [...(p.services || [])]; a[i] = { ...a[i], [f]: v }; return { ...p, services: a } })
  const removeService = (i: number) => setPForm(p => ({ ...p, services: (p.services || []).filter((_, x) => x !== i) }))

  /* Custom fields */
  const addCustom = () => setPForm(p => ({ ...p, customFields: [...(p.customFields || []), { label: '', value: '', type: 'text' as const }] }))
  const updCustom = (i: number, f: keyof CustomField, v: string) => setPForm(p => { const a = [...(p.customFields || [])]; a[i] = { ...a[i], [f]: v }; return { ...p, customFields: a } })
  const removeCustom = (i: number) => setPForm(p => ({ ...p, customFields: (p.customFields || []).filter((_, x) => x !== i) }))

  return (
    <div className="pe-overlay" onMouseDown={onClose}>
      <motion.div
        className="pe-modal"
        onMouseDown={e => e.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.32, ease }}
      >
        <div className="pe-head">
          <div className="pe-head-titles">
            <h3>{editing ? 'Edit project' : 'Add new project'}</h3>
            <span>{editing ? editing.name : 'Fill in whatever you have — every field is optional except the name.'}</span>
          </div>
          <button type="button" className="pe-x" onClick={onClose} aria-label="Close"><I.X/></button>
        </div>

        <form onSubmit={submit} className="pe-form">
          <div className="pe-body">

            <Section icon={<I.Folder/>} title="Basic info"/>
            <div className="pe-row">
              <label className="pe-field">
                <span>Project name *</span>
                <input value={pForm.name} onChange={e => setPForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Main Website, Customer App" autoFocus/>
              </label>
              <label className="pe-field">
                <span>Domain / website</span>
                <input value={pForm.domain} onChange={e => setPForm(p => ({ ...p, domain: e.target.value }))} placeholder="example.com"/>
              </label>
            </div>
            <div className="pe-row">
              <label className="pe-field">
                <span>Type</span>
                <select value={pForm.type} onChange={e => setPForm(p => ({ ...p, type: e.target.value as Project['type'] }))}>
                  <option value="website">Website</option>
                  <option value="app">Mobile App</option>
                  <option value="both">Website + Mobile App</option>
                </select>
              </label>
              <label className="pe-field">
                <span>Status</span>
                <select value={pForm.status} onChange={e => setPForm(p => ({ ...p, status: e.target.value as Project['status'] }))}>
                  <option value="active">Active (Live)</option>
                  <option value="development">In Development</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="paused">Paused</option>
                </select>
              </label>
            </div>

            <Section icon={<I.Globe/>} title="Domain registrar"/>
            <div className="pe-row">
              <label className="pe-field"><span>Registrar</span><input value={pForm.domainInfo.registrar} onChange={e => setPForm(p => ({ ...p, domainInfo: { ...p.domainInfo, registrar: e.target.value } }))} placeholder="e.g. Namecheap, Cloudflare"/></label>
              <label className="pe-field"><span>Expiry date</span><input type="date" value={pForm.domainInfo.expiryDate} onChange={e => setPForm(p => ({ ...p, domainInfo: { ...p.domainInfo, expiryDate: e.target.value } }))}/></label>
            </div>
            <div className="pe-row">
              <label className="pe-field">
                <span>Auto renew</span>
                <select value={pForm.domainInfo.autoRenew} onChange={e => setPForm(p => ({ ...p, domainInfo: { ...p.domainInfo, autoRenew: e.target.value } }))}>
                  <option value="">— Not set —</option><option value="Yes">Yes</option><option value="No">No</option>
                </select>
              </label>
              <label className="pe-field"><span>Login URL</span><input value={pForm.domainInfo.loginUrl} onChange={e => setPForm(p => ({ ...p, domainInfo: { ...p.domainInfo, loginUrl: e.target.value } }))} placeholder="https://…"/></label>
            </div>
            <div className="pe-row">
              <label className="pe-field"><span>Username / Email</span><input value={pForm.domainInfo.username} onChange={e => setPForm(p => ({ ...p, domainInfo: { ...p.domainInfo, username: e.target.value } }))}/></label>
              <label className="pe-field"><span>Password</span><input value={pForm.domainInfo.password} onChange={e => setPForm(p => ({ ...p, domainInfo: { ...p.domainInfo, password: e.target.value } }))}/></label>
            </div>

            <Section icon={<I.Server/>} title="Web hosting"/>
            <div className="pe-row">
              <label className="pe-field"><span>Provider</span><input value={pForm.hosting.provider} onChange={e => setPForm(p => ({ ...p, hosting: { ...p.hosting, provider: e.target.value } }))} placeholder="e.g. Vercel, Hostinger, AWS"/></label>
              <label className="pe-field"><span>Plan</span><input value={pForm.hosting.plan} onChange={e => setPForm(p => ({ ...p, hosting: { ...p.hosting, plan: e.target.value } }))} placeholder="e.g. Pro, Business"/></label>
            </div>
            <div className="pe-row">
              <label className="pe-field"><span>Expiry date</span><input type="date" value={pForm.hosting.expiryDate} onChange={e => setPForm(p => ({ ...p, hosting: { ...p.hosting, expiryDate: e.target.value } }))}/></label>
              <label className="pe-field"><span>Cost</span><input value={pForm.hosting.cost} onChange={e => setPForm(p => ({ ...p, hosting: { ...p.hosting, cost: e.target.value } }))} placeholder="e.g. $20/month"/></label>
            </div>
            <label className="pe-field"><span>Control panel / Login URL</span><input value={pForm.hosting.loginUrl} onChange={e => setPForm(p => ({ ...p, hosting: { ...p.hosting, loginUrl: e.target.value } }))} placeholder="https://…"/></label>
            <div className="pe-row">
              <label className="pe-field"><span>Username</span><input value={pForm.hosting.username} onChange={e => setPForm(p => ({ ...p, hosting: { ...p.hosting, username: e.target.value } }))}/></label>
              <label className="pe-field"><span>Password</span><input value={pForm.hosting.password} onChange={e => setPForm(p => ({ ...p, hosting: { ...p.hosting, password: e.target.value } }))}/></label>
            </div>

            {isApp && (
              <>
                <Section icon={<I.Phone/>} title="App stores"/>
                <label className="pe-field"><span>Google Play Store URL</span><input value={pForm.appStores.playStoreUrl} onChange={e => setPForm(p => ({ ...p, appStores: { ...p.appStores, playStoreUrl: e.target.value } }))} placeholder="https://play.google.com/…"/></label>
                <div className="pe-row">
                  <label className="pe-field"><span>Play Console account</span><input value={pForm.appStores.playStoreAccount} onChange={e => setPForm(p => ({ ...p, appStores: { ...p.appStores, playStoreAccount: e.target.value } }))} placeholder="developer@gmail.com"/></label>
                  <label className="pe-field"><span>Play Console password</span><input value={pForm.appStores.playStorePassword} onChange={e => setPForm(p => ({ ...p, appStores: { ...p.appStores, playStorePassword: e.target.value } }))}/></label>
                </div>
                <label className="pe-field"><span>Apple App Store URL</span><input value={pForm.appStores.appStoreUrl} onChange={e => setPForm(p => ({ ...p, appStores: { ...p.appStores, appStoreUrl: e.target.value } }))} placeholder="https://apps.apple.com/…"/></label>
                <div className="pe-row">
                  <label className="pe-field"><span>Apple ID / Dev account</span><input value={pForm.appStores.appStoreAccount} onChange={e => setPForm(p => ({ ...p, appStores: { ...p.appStores, appStoreAccount: e.target.value } }))} placeholder="appleid@email.com"/></label>
                  <label className="pe-field"><span>Apple account password</span><input value={pForm.appStores.appStorePassword} onChange={e => setPForm(p => ({ ...p, appStores: { ...p.appStores, appStorePassword: e.target.value } }))}/></label>
                </div>
              </>
            )}

            <Section icon={<I.Database/>} title="Database"/>
            <div className="pe-row">
              <label className="pe-field"><span>Type</span><input value={pForm.database.type} onChange={e => setPForm(p => ({ ...p, database: { ...p.database, type: e.target.value } }))} placeholder="e.g. PostgreSQL, Firestore"/></label>
              <label className="pe-field"><span>Provider / Host</span><input value={pForm.database.provider} onChange={e => setPForm(p => ({ ...p, database: { ...p.database, provider: e.target.value } }))} placeholder="e.g. Supabase, Firebase"/></label>
            </div>
            <label className="pe-field"><span>Connection info / Notes</span><textarea rows={3} value={pForm.database.notes} onChange={e => setPForm(p => ({ ...p, database: { ...p.database, notes: e.target.value } }))} placeholder="Connection string, region, backup info…"/></label>

            <Section icon={<I.Mail/>} title="Email hosting"/>
            <div className="pe-row">
              <label className="pe-field"><span>Provider</span><input value={pForm.emailHosting.provider} onChange={e => setPForm(p => ({ ...p, emailHosting: { ...p.emailHosting, provider: e.target.value } }))} placeholder="e.g. Google Workspace, Zoho"/></label>
              <label className="pe-field"><span>Plan</span><input value={pForm.emailHosting.plan} onChange={e => setPForm(p => ({ ...p, emailHosting: { ...p.emailHosting, plan: e.target.value } }))} placeholder="e.g. Business Starter"/></label>
            </div>
            <div className="pe-row">
              <label className="pe-field"><span>Expiry date</span><input type="date" value={pForm.emailHosting.expiryDate} onChange={e => setPForm(p => ({ ...p, emailHosting: { ...p.emailHosting, expiryDate: e.target.value } }))}/></label>
              <label className="pe-field"><span>Cost</span><input value={pForm.emailHosting.cost} onChange={e => setPForm(p => ({ ...p, emailHosting: { ...p.emailHosting, cost: e.target.value } }))} placeholder="e.g. $6/user/month"/></label>
            </div>
            <label className="pe-field"><span>Admin login URL</span><input value={pForm.emailHosting.loginUrl} onChange={e => setPForm(p => ({ ...p, emailHosting: { ...p.emailHosting, loginUrl: e.target.value } }))} placeholder="https://admin.google.com"/></label>
            <div className="pe-row">
              <label className="pe-field"><span>Admin email</span><input value={pForm.emailHosting.adminEmail} onChange={e => setPForm(p => ({ ...p, emailHosting: { ...p.emailHosting, adminEmail: e.target.value } }))} placeholder="admin@company.com"/></label>
              <label className="pe-field"><span>Admin password</span><input value={pForm.emailHosting.adminPassword} onChange={e => setPForm(p => ({ ...p, emailHosting: { ...p.emailHosting, adminPassword: e.target.value } }))}/></label>
            </div>

            <Section icon={<I.Cpu/>} title="Tech stack"/>
            <div className="pe-tag-row">
              <input
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTech() } }}
                placeholder="e.g. Next.js, Swift, Node.js — press Enter"
              />
              <button type="button" className="pe-btn-ghost" onClick={addTech}>Add</button>
            </div>
            {pForm.techStack.length > 0 && (
              <div className="pe-chips">
                {pForm.techStack.map(t => (
                  <span key={t} className="pe-chip">{t}<button type="button" onClick={() => removeTech(t)} aria-label={`Remove ${t}`}>×</button></span>
                ))}
              </div>
            )}

            <Section icon={<I.Share2/>} title="Social media accounts"/>
            {(pForm.socialAccounts || []).map((s, i) => (
              <div key={i} className="pe-block">
                <div className="pe-row">
                  <label className="pe-field"><span>Platform</span><input value={s.platform} onChange={e => updSocial(i, 'platform', e.target.value)} placeholder="e.g. Instagram"/></label>
                  <label className="pe-field"><span>Profile URL</span><input value={s.url} onChange={e => updSocial(i, 'url', e.target.value)} placeholder="https://…"/></label>
                </div>
                <div className="pe-row">
                  <label className="pe-field"><span>Username / Handle</span><input value={s.username} onChange={e => updSocial(i, 'username', e.target.value)} placeholder="@handle"/></label>
                  <label className="pe-field"><span>Login email</span><input value={s.email} onChange={e => updSocial(i, 'email', e.target.value)}/></label>
                </div>
                <div className="pe-row pe-row-end">
                  <label className="pe-field"><span>Password</span><input value={s.password} onChange={e => updSocial(i, 'password', e.target.value)}/></label>
                  <button type="button" className="pe-btn-remove" onClick={() => removeSocial(i)}><I.Trash/> Remove</button>
                </div>
              </div>
            ))}
            <button type="button" className="pe-btn-add" onClick={addSocial}><I.Plus/> Add social account</button>

            <Section icon={<I.Plug/>} title="Services & APIs"/>
            {(pForm.services || []).map((s, i) => (
              <div key={i} className="pe-block">
                <div className="pe-row">
                  <label className="pe-field"><span>Service name</span><input value={s.name} onChange={e => updService(i, 'name', e.target.value)} placeholder="e.g. Stripe, Firebase"/></label>
                  <label className="pe-field"><span>Type / Category</span><input value={s.type} onChange={e => updService(i, 'type', e.target.value)} placeholder="e.g. Payments, Analytics"/></label>
                </div>
                <label className="pe-field"><span>Login / Dashboard URL</span><input value={s.loginUrl} onChange={e => updService(i, 'loginUrl', e.target.value)} placeholder="https://…"/></label>
                <div className="pe-row">
                  <label className="pe-field"><span>Username / Email</span><input value={s.username} onChange={e => updService(i, 'username', e.target.value)}/></label>
                  <label className="pe-field"><span>Password</span><input value={s.password} onChange={e => updService(i, 'password', e.target.value)}/></label>
                </div>
                <div className="pe-row pe-row-end">
                  <label className="pe-field"><span>API key / Secret</span><input value={s.apiKey} onChange={e => updService(i, 'apiKey', e.target.value)} placeholder="sk_live_…"/></label>
                  <button type="button" className="pe-btn-remove" onClick={() => removeService(i)}><I.Trash/> Remove</button>
                </div>
              </div>
            ))}
            <button type="button" className="pe-btn-add" onClick={addService}><I.Plus/> Add service / API</button>

            <Section icon={<I.AtSign/>} title="Business email accounts"/>
            {pForm.businessEmails.map((em, i) => (
              <div key={i} className="pe-block">
                <div className="pe-row">
                  <label className="pe-field"><span>Email address</span><input value={em.email} onChange={e => updEmail(i, 'email', e.target.value)} placeholder="hello@company.com"/></label>
                  <label className="pe-field"><span>Purpose</span><input value={em.purpose} onChange={e => updEmail(i, 'purpose', e.target.value)} placeholder="e.g. Support, Sales"/></label>
                </div>
                <div className="pe-row pe-row-end">
                  <label className="pe-field"><span>Provider</span><input value={em.provider} onChange={e => updEmail(i, 'provider', e.target.value)} placeholder="e.g. Google Workspace"/></label>
                  <label className="pe-field"><span>Password</span><input value={em.password} onChange={e => updEmail(i, 'password', e.target.value)}/></label>
                </div>
                <button type="button" className="pe-btn-remove pe-btn-remove-row" onClick={() => removeEmail(i)}><I.Trash/> Remove email</button>
              </div>
            ))}
            <button type="button" className="pe-btn-add" onClick={addEmail}><I.Plus/> Add email account</button>

            <Section icon={<I.Sparkles/>} title="Custom fields"/>
            {(pForm.customFields || []).map((field, i) => (
              <div key={i} className="pe-block">
                <div className="pe-row">
                  <label className="pe-field"><span>Field label</span><input value={field.label} onChange={e => updCustom(i, 'label', e.target.value)} placeholder="e.g. Bundle ID, Webhook Secret"/></label>
                  <label className="pe-field pe-field-narrow">
                    <span>Field type</span>
                    <select value={field.type} onChange={e => updCustom(i, 'type', e.target.value as CustomField['type'])}>
                      <option value="text">Text</option><option value="url">URL / Link</option><option value="password">Password / Key</option>
                    </select>
                  </label>
                </div>
                <div className="pe-row pe-row-end">
                  <label className="pe-field"><span>Value</span><input value={field.value} onChange={e => updCustom(i, 'value', e.target.value)} placeholder="Enter value…"/></label>
                  <button type="button" className="pe-btn-remove" onClick={() => removeCustom(i)}><I.Trash/> Remove</button>
                </div>
              </div>
            ))}
            <button type="button" className="pe-btn-add" onClick={addCustom}><I.Plus/> Add custom field</button>

            <Section icon={<I.FileText/>} title="Notes"/>
            <label className="pe-field"><textarea rows={4} value={pForm.notes} onChange={e => setPForm(p => ({ ...p, notes: e.target.value }))} placeholder="Any additional notes about this project…"/></label>

          </div>

          {error && <div className="pe-error"><I.Warn/> {error}</div>}

          <div className="pe-foot">
            <button type="button" className="pe-btn-cancel" onClick={onClose} disabled={saving}>Cancel</button>
            <button type="submit" className="pe-btn-save" disabled={saving}>
              {saving ? <><span className="pe-spin"/> Saving…</> : editing ? <><I.Check/> Save changes</> : <><I.Plus/> Add project</>}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
