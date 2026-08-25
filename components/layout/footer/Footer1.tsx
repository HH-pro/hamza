import Link from 'next/link'
import { CONTACT } from '@/lib/proof'
import { services } from '@/lib/services'

export default function Footer1() {
	return (
		<footer className="hm-footer">
			<div className="hm-wrap">
				<div className="hm-footer__grid">
					<div>
						<Link className="hm-footer__brand" href="/">
							Hamza Manzoor
						</Link>
						<p className="hm-footer__pitch">
							Design, web, mobile and backend — built and launched by one person.
						</p>
						<a className="hm-footer__mail" href={`mailto:${CONTACT.email}`}>
							{CONTACT.email}
						</a>
					</div>

					<div>
						<h2 className="hm-footer__label">Site</h2>
						<ul className="hm-footer__list">
							<li><Link href="/">Home</Link></li>
							<li><Link href="/services">Services</Link></li>
							<li><Link href="/work">Portfolio</Link></li>
							<li><Link href="/website-plans">Plans &amp; pricing</Link></li>
							<li><Link href="/#faq">FAQ</Link></li>
							<li><Link href="/#contact">Contact</Link></li>
						</ul>
					</div>

					<div>
						<h2 className="hm-footer__label">Services</h2>
						<ul className="hm-footer__list">
							{services.map((s) => (
								<li key={s.slug}>
									<Link href={`/services#${s.slug}`}>{s.title}</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h2 className="hm-footer__label">Elsewhere</h2>
						<ul className="hm-footer__list">
							<li>
								<a href="https://zynhive.com" target="_blank" rel="noopener noreferrer">
									ZynHive ↗
								</a>
							</li>
							<li>
								<a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
									WhatsApp ↗
								</a>
							</li>
							<li><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
							<li>
								<a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer">
									{CONTACT.location}
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="hm-footer__base">
					<span>© {new Date().getFullYear()} Hamza Manzoor</span>
					<span>Built with Next.js — the same stack I build client work in.</span>
				</div>
			</div>
		</footer>
	)
}
