interface PageItem {
  number: number
  title: string
  description: string
  variant: 'blue' | 'pink'
  isAdmin?: boolean
}

interface PagesListProps {
  pages: PageItem[]
}

export default function PagesList({ pages }: PagesListProps) {
  return (
    <div className="pages-list">
      {pages.map((page, i) => (
        <div
          key={i}
          className="page-item"
          style={
            page.isAdmin
              ? {
                  gridColumn: '1 / -1',
                  background: 'linear-gradient(135deg, var(--blue-soft) 0%, var(--pink-soft) 100%)',
                  borderColor: 'rgba(123,175,212,0.3)',
                }
              : {}
          }
        >
          <div className={`page-num page-num-${page.variant}`}>{page.number}</div>
          <div>
            <div className="page-item-title">
              {page.title}
              {page.isAdmin && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    color: 'var(--blue-deep)',
                    background: 'var(--blue-soft)',
                    padding: '2px 8px',
                    borderRadius: 20,
                    marginLeft: 6,
                  }}
                >
                  Platform Owner Only
                </span>
              )}
            </div>
            <p className="page-item-desc">{page.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
