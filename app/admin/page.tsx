'use client'
import { useEffect, useState } from 'react'
import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) router.replace('/admin/dashboard')
      else setChecking(false)
    })
  }, [router])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.replace('/admin/dashboard')
    } catch {
      setError('Email ya password galat hai.')
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <div className="admin-login-page">
        <div className="admin-spinner" />
      </div>
    )
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-icon">⚙</div>
        <h1>Client Portal</h1>
        <p>Admin login</p>
        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="admin-login-field">
            <label>Email</label>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>
          <div className="admin-login-field">
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          {error && <div className="admin-error-box">{error}</div>}
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Logging in…' : 'Login →'}
          </button>
        </form>
      </div>
    </div>
  )
}
