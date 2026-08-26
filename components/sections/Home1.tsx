import Link from "next/link"
import Image from "next/image"
import { CONTACT, PROJECTS_DELIVERED } from "@/lib/proof"

export default function Home1() {
	return (
		<section className="hm-hero">
			<div className="hm-wrap">
				<div className="hm-hero__grid">
					<div>
						<span className="hm-status">
							<span className="hm-status__dot" />
							{CONTACT.availability}
						</span>

						<h1 className="hm-h1">
							One person. Design, web, mobile, backend.{" "}
							<span className="hm-accent">Launched.</span>
						</h1>

						<p className="hm-lede">
							I&apos;m Hamza — I take products from an idea to something real people
							use, without you having to assemble a team to do it. Founder of{" "}
							<a
								href="https://zynhive.com"
								target="_blank"
								rel="noopener noreferrer"
								style={{ color: "var(--hm-accent)", fontWeight: 600 }}
							>
								ZynHive
							</a>
							.
						</p>

						<div className="hm-actions">
							<Link href="/#contact" className="hm-btn hm-btn--primary hm-btn--lg">
								Book a Call
								<i className="ri-arrow-right-line" />
							</Link>
							<Link href="/work" className="hm-btn hm-btn--ghost hm-btn--lg">
								See the work
							</Link>
						</div>

						<p className="hm-reassure">
							30-minute call &middot; no commitment &middot; you leave with a real number
						</p>

						<p className="hm-mono hm-hero__stack">
							React &middot; Next.js &middot; React Native &middot; Flutter &middot; Node
							&middot; SwiftUI &middot; AI integration
						</p>
					</div>

					<div className="hm-hero__figure">
						<div className="hm-hero__panel">
							<Image
								src="/assets/imgs/hero/hero-1/profile.png"
								alt="Hamza Manzoor"
								width={500}
								height={500}
								priority
								sizes="(max-width: 900px) 20rem, 26rem"
							/>
						</div>

						{/* Real figure — see PROJECTS_DELIVERED in lib/proof.ts. */}
						<div className="hm-hero__chip">
							<span className="hm-hero__chip-value">{PROJECTS_DELIVERED}</span>
							<span className="hm-hero__chip-label">Projects delivered</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
