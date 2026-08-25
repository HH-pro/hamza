import Link from "next/link"
import type { ReactNode } from "react"

interface Props {
	eyebrow?: string
	title: ReactNode
	lede?: ReactNode
	action?: { label: string; href: string }
	center?: boolean
}

/** The shared section heading: eyebrow, headline, lede, optional right-aligned action. */
export default function SectionHead({ eyebrow, title, lede, action, center }: Props) {
	if (center) {
		return (
			<div className="hm-center" data-reveal style={{ marginBottom: "2.75rem" }}>
				{eyebrow && <span className="hm-eyebrow">{eyebrow}</span>}
				<h2 className="hm-h2">{title}</h2>
				{lede && <p className="hm-lede">{lede}</p>}
			</div>
		)
	}

	return (
		<div className="hm-head" data-reveal>
			<div className="hm-head__text">
				{eyebrow && <span className="hm-eyebrow">{eyebrow}</span>}
				<h2 className="hm-h2">{title}</h2>
				{lede && <p className="hm-lede">{lede}</p>}
			</div>
			{action && (
				<Link href={action.href} className="hm-btn hm-btn--ghost">
					{action.label}
					<i className="ri-arrow-right-up-line" />
				</Link>
			)}
		</div>
	)
}
