'use client'
import Link from "next/link"

interface BreadcrumbProps {
  breadcrumbTitle: string
}

export default function Breadcrumb({ breadcrumbTitle }: BreadcrumbProps) {
  return (
    <section className="breadcrumb-area py-5 bg-light border-bottom">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
          {/* Page Title */}
          <h2 className="mb-2 mb-md-0 fw-bold text-dark">{breadcrumbTitle}</h2>

          {/* Breadcrumb Trail */}
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link href="/" className="text-decoration-none text-primary">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active text-secondary" aria-current="page">
                {breadcrumbTitle}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  )
}
