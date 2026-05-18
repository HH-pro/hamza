'use client'
import { useEffect, useState } from 'react'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (!user) router.replace('/admin')
      else setReady(true)
    })
  }, [router])

  if (!ready) {
    return (
      <div className="admin-loading-full">
        <div className="admin-spinner" />
      </div>
    )
  }

  return <>{children}</>
}
