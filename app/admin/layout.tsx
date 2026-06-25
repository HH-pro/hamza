import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — Client Portal',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-wrap" data-theme="dark">
      <link rel="stylesheet" href="/styles/design-system.css" />
      <link rel="stylesheet" href="/styles/admin.css" />
      {children}
    </div>
  )
}
