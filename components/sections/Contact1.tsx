import ContactForm from "@/components/elements/ContactForm"
import SectionHead from "@/components/hm/SectionHead"
import { CONTACT } from "@/lib/proof"

export default function Contact1() {
	return (
		<section className="hm-section hm-section--sunk" id="contact">
			<div className="hm-wrap">
				<SectionHead
					eyebrow="Start here"
					title={
						<>
							Tell me what you&apos;re <span className="hm-accent">building</span>
						</>
					}
					lede="What it is, who it's for, and roughly when you need it live. I reply to everything within a day."
				/>

				<div className="hm-contact-grid" data-reveal data-reveal-stagger>
					<div>
						<a className="hm-contact-item" href={`mailto:${CONTACT.email}`}>
							<i className="ri-mail-line" aria-hidden="true" />
							<span>
								<span className="hm-contact-item__label">Email</span>
								<span className="hm-contact-item__value">{CONTACT.email}</span>
							</span>
						</a>

						<a className="hm-contact-item" href={CONTACT.phoneHref}>
							<i className="ri-phone-line" aria-hidden="true" />
							<span>
								<span className="hm-contact-item__label">Phone</span>
								<span className="hm-contact-item__value">{CONTACT.phone}</span>
							</span>
						</a>

						<a
							className="hm-contact-item"
							href={CONTACT.whatsapp}
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="ri-whatsapp-line" aria-hidden="true" />
							<span>
								<span className="hm-contact-item__label">WhatsApp</span>
								<span className="hm-contact-item__value">Message directly</span>
							</span>
						</a>

						<a
							className="hm-contact-item"
							href={CONTACT.mapsUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="ri-map-pin-line" aria-hidden="true" />
							<span>
								<span className="hm-contact-item__label">Based in</span>
								<span className="hm-contact-item__value">{CONTACT.location}</span>
							</span>
						</a>

						<div className="hm-contact-item">
							<i className="ri-time-line" aria-hidden="true" />
							<span>
								<span className="hm-contact-item__label">Working hours</span>
								<span className="hm-contact-item__value">
									PKT, with overlap for UK &amp; US mornings
								</span>
							</span>
						</div>
					</div>

					<div className="hm-form-panel">
						<ContactForm
							withLabels
							inputClass="form-control"
							buttonClass="hm-btn hm-btn--primary mt-3"
							labelClass=""
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
