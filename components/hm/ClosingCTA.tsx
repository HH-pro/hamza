import Link from "next/link"

interface Props {
	title?: React.ReactNode
	body?: string
	primary?: { label: string; href: string }
	secondary?: { label: string; href: string }
}

/**
 * Every page ends with this. The single biggest conversion gap on most
 * portfolio sites is a page that dead-ends into the footer.
 */
export default function ClosingCTA({
	title = (
		<>
			Have something that needs <span className="hm-accent">building and launching</span>?
		</>
	),
	body = "Tell me what you're making and who it's for. I'll tell you the smallest version worth shipping — and what it costs.",
	primary = { label: "Book a Call", href: "/#contact" },
	secondary = { label: "See the work", href: "/work" },
}: Props) {
	return (
		<section className="hm-section hm-section--tight">
			<div className="hm-wrap">
				<div className="hm-cta" data-reveal>
					<h2 className="hm-h2">{title}</h2>
					<p>{body}</p>
					<div className="hm-actions">
						<Link href={primary.href} className="hm-btn hm-btn--onaccent">
							{primary.label}
							<i className="ri-arrow-right-line" />
						</Link>
						{secondary && (
							<Link
								href={secondary.href}
								className="hm-btn"
								style={{ borderColor: "rgba(255,255,255,.35)", color: "#fff" }}
							>
								{secondary.label}
							</Link>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
