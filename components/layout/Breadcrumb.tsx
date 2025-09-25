'use client'
import Link from "next/link"

interface BreadcrumbProps {
  breadcrumbTitle: string
  backgroundImage?: string
}

export default function Breadcrumb({ breadcrumbTitle, backgroundImage }: BreadcrumbProps) {
  return (
    <section
      className="breadcrumb-area py-5 border-bottom text-white"
      style={{
        background: backgroundImage
          ? `url(${backgroundImage}) center/cover no-repeat`
          : "#f9f9f9",
      }}
    >
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
          {/* Page Title */}
          <h2 className={`mb-2 mb-md-0 fw-bold ${backgroundImage ? "text-white" : "text-dark"}`}>
            {breadcrumbTitle}
          </h2>

          {/* Breadcrumb Trail */}
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link
                  href="/"
                  className={backgroundImage ? "text-white text-decoration-none" : "text-primary text-decoration-none"}
                >
                  Home
                </Link>
              </li>
              <li
                className={`breadcrumb-item ${backgroundImage ? "text-light" : "text-secondary"}`}
                aria-current="page"
              >
                {breadcrumbTitle}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  )
}
