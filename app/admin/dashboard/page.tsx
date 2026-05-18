'use client'
import { useState, useEffect, useCallback } from 'react'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'
import { getClients, addClient, updateClient, deleteClient, type Client } from '@/lib/firestore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const blank = { name: '', company: '', email: '', portalPassword: '' }

export default function AdminDashboard() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Client | null>(null)
  const [form, setForm] = useState(blank)
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const router = useRouter()

  const load = useCallback(async () => {
    setLoading(true)
    const data = await getClients()
    setClients(data)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function openAdd() {
    setEditing(null)
    setForm(blank)
    setShowForm(true)
  }

  function openEdit(c: Client) {
    setEditing(c)
    setForm({ name: c.name, company: c.company, email: c.email, portalPassword: c.portalPassword })
    setShowForm(true)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      if (editing?.id) await updateClient(editing.id, form)
      else await addClient(form)
      setShowForm(false)
      await load()
    } finally {
      setSaving(false)
    }
  }

  async function remove(c: Client) {
    if (!confirm(`"${c.name}" ko delete karen? Iske saare projects bhi delete ho jaenge.`)) return
    await deleteClient(c.id!)
    await load()
  }

  function copyLink(clientId: string) {
    navigator.clipboard.writeText(`${window.location.origin}/portal/${clientId}`)
    setCopied(clientId)
    setTimeout(() => setCopied(null), 2500)
  }

  return (
    <div className="admin-page">
      <nav className="admin-nav">
        <span className="admin-nav-brand">⚙ Client Portal</span>
        <div className="admin-nav-right">
          <button className="btn-add" onClick={openAdd}>+ New Client</button>
          <button className="btn-signout" onClick={() => { signOut(auth); router.replace('/admin') }}>
            Sign Out
          </button>
        </div>
      </nav>

      <div className="admin-body">
        <div className="admin-page-header">
          <h2>Clients <span className="count-badge">{clients.length}</span></h2>
        </div>

        {loading ? (
          <div className="admin-loading-full"><div className="admin-spinner" /></div>
        ) : clients.length === 0 ? (
          <div className="admin-empty">
            <div className="empty-icon">👤</div>
            <p>Koi client nahi. Pehla client add karen.</p>
            <button className="btn-add" onClick={openAdd}>+ Add Client</button>
          </div>
        ) : (
          <div className="client-grid">
            {clients.map(c => (
              <div key={c.id} className="client-card">
                <div className="client-card-top">
                  <div className="client-avatar">{c.name.charAt(0).toUpperCase()}</div>
                  <div className="client-info">
                    <h3>{c.name}</h3>
                    <span className="client-company">{c.company}</span>
                    <span className="client-email">{c.email}</span>
                  </div>
                </div>
                <div className="client-card-actions">
                  <Link href={`/admin/dashboard/${c.id}`} className="btn-view">
                    Projects dekhen →
                  </Link>
                  <button className="btn-link-copy" onClick={() => copyLink(c.id!)}>
                    {copied === c.id ? '✓ Copied!' : 'Portal Link Copy'}
                  </button>
                  <div className="client-secondary-actions">
                    <button className="btn-edit" onClick={() => openEdit(c)}>Edit</button>
                    <button className="btn-delete" onClick={() => remove(c)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <div className="adm-overlay" onClick={() => setShowForm(false)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h3>{editing ? 'Client Edit Karen' : 'New Client Add Karen'}</h3>
              <button className="modal-x" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={submit} className="aform">
              <div className="aform-group">
                <label>Client Name</label>
                <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Ahmed Khan" />
              </div>
              <div className="aform-group">
                <label>Company</label>
                <input required value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} placeholder="e.g. TechCorp Pakistan" />
              </div>
              <div className="aform-group">
                <label>Email</label>
                <input type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="ahmed@techcorp.pk" />
              </div>
              <div className="aform-group">
                <label>Portal Password <span className="label-hint">(client yahi enter karega)</span></label>
                <input required value={form.portalPassword} onChange={e => setForm(p => ({ ...p, portalPassword: e.target.value }))} placeholder="Strong password den" />
              </div>
              <div className="aform-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn-save" disabled={saving}>
                  {saving ? 'Saving…' : editing ? 'Save Changes' : 'Client Add Karen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

