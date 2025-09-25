'use client'
import Link from "next/link"

interface BreadcrumbProps {
  breadcrumbTitle: string
}

export default function Breadcrumb({ breadcrumbTitle }: BreadcrumbProps) {
  return (
    <section className="py-6 bg-gray-100 border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          
          {/* Page Title */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2 md:mb-0">
            {breadcrumbTitle}
          </h2>

          {/* Breadcrumb Trail */}
          <nav aria-label="breadcrumb">
            <ol className="flex text-sm text-gray-600 space-x-2">
              <li>
                <Link href="/" className="text-blue-600 hover:underline">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-500">{breadcrumbTitle}</li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  )
}
