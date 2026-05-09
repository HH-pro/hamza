interface ProposalCoverProps {
  logoName: string
  date: string
  preparedBy: string
  title: React.ReactNode
  subtitle: string
  pills: Array<{ text: string; variant: 'blue' | 'pink' | 'ink' }>
}

export default function ProposalCover({
  logoName,
  date,
  preparedBy,
  title,
  subtitle,
  pills,
}: ProposalCoverProps) {
  return (
    <div className="cover">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <svg className="deco-leaf" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 280 C100 280 10 200 10 120 C10 50 60 10 100 10 C140 10 190 50 190 120 C190 200 100 280 100 280Z" fill="#7BAFD4" />
        <path d="M100 280 C100 280 100 150 100 10" stroke="#5A8FB5" strokeWidth="2" opacity="0.5" />
        <path d="M100 160 C100 160 50 130 30 100" stroke="#5A8FB5" strokeWidth="1.5" opacity="0.4" />
        <path d="M100 180 C100 180 150 145 168 115" stroke="#5A8FB5" strokeWidth="1.5" opacity="0.4" />
        <path d="M100 130 C100 130 55 105 42 80" stroke="#5A8FB5" strokeWidth="1.2" opacity="0.3" />
        <path d="M100 145 C100 145 148 118 158 93" stroke="#5A8FB5" strokeWidth="1.2" opacity="0.3" />
      </svg>

      <div className="cover-top-bar">
        <div className="logo-mark">
          <svg className="logo-leaf" viewBox="0 0 40 40" fill="none">
            <path d="M20 36 C20 36 4 26 4 16 C4 8 11 3 20 3 C29 3 36 8 36 16 C36 26 20 36 20 36Z" fill="#B8D8F0" stroke="#7BAFD4" strokeWidth="1" />
            <path d="M20 36 C20 36 20 18 20 3" stroke="#7BAFD4" strokeWidth="1" opacity="0.6" />
            <path d="M20 22 C20 22 12 18 8 14" stroke="#7BAFD4" strokeWidth="0.8" opacity="0.5" />
            <path d="M20 26 C20 26 28 21 32 17" stroke="#7BAFD4" strokeWidth="0.8" opacity="0.5" />
          </svg>
          {logoName}
        </div>
        <div className="date-tag">{date}</div>
      </div>

      <div className="cover-center">
        <div className="cover-label">Prepared for our valued client</div>
        <h1 className="cover-title">{title}</h1>
        <p className="cover-subtitle">{subtitle}</p>
        <div className="cover-pills">
          {pills.map((pill, i) => (
            <span key={i} className={`pill pill-${pill.variant}`}>
              {pill.text}
            </span>
          ))}
        </div>
      </div>

      <div className="cover-footer">
        <div>
          <div className="cover-footer-label">Prepared by</div>
          <div className="cover-footer-name">{preparedBy}</div>
        </div>
        <div style={{ textAlign: "right" }} />
      </div>
    </div>
  )
}
