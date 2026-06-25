
import Link from "next/link"
import ContactForm from "@/components/elements/ContactForm"

export default function Contact1() {
	return (
		<>

			<section id="contact" className="section-contact-1 bg-900 position-relative pt-150 pb-lg-250 pb-150 overflow-hidden">
				<div className="container position-relative z-1">
					<h3 className="ds-3 mt-3 mb-3 text-primary">Get in touch</h3>
					<span className="fs-5 fw-medium text-200">
						I'm always excited to take on new projects and collaborate with innovative minds. If you
						<br />
						have a project in mind or just want to chat about design, feel free to reach out!
					</span>
					<div className="row mt-8">
						<div className="col-lg-4 d-flex flex-column">
							<div className="d-flex align-items-center mb-4 position-relative d-inline-flex">
								<div className="bg-white icon-flip position-relative icon-shape icon-xxl border-linear-2 border-2 rounded-4">
									<i className="ri-phone-fill text-primary fs-26" />
								</div>
								<div className="ps-3">
									<span className="text-400 fs-5">Phone Number</span>
									<h6 className="mb-0">+92 311 7836704</h6>
								</div>
								<Link href="tel:+923117836704" className="position-absolute top-0 start-0 w-100 h-100" />
							</div>
							<div className="d-flex align-items-center mb-4 position-relative d-inline-flex">
								<div className="bg-white icon-flip position-relative icon-shape icon-xxl border-linear-2 border-2 rounded-4">
									<i className="ri-mail-fill text-primary fs-26" />
								</div>
								<div className="ps-3">
									<span className="text-400 fs-">Email</span>
									<h6 className="mb-0">Info@hamzamanzoor.online</h6>
								</div>
								<Link href="mailto:Info@hamzamanzoor.online" className="position-absolute top-0 start-0 w-100 h-100" />
							</div>
							
							<div className="d-flex align-items-center mb-4 position-relative d-inline-flex">
								<div className="bg-white icon-flip position-relative icon-shape icon-xxl border-linear-2 border-2 rounded-4">
									<i className="ri-map-2-fill text-primary fs-26" />
								</div>
								<div className="ps-3">
									<span className="text-400 fs-5">Address</span>
									<h6 className="mb-0">Narowal,Punjab</h6>
								</div>
								<Link href="/https://maps.google.com/maps?q=1st+avenue,New+York" className="position-absolute top-0 start-0 w-100 h-100" />
							</div>
						</div>
						<div className="col-lg-7 offset-lg-1 ps-lg-0 pt-5 pt-lg-0">
							<div className="position-relative">
								<div className="position-relative z-2">
									<h3>Leave a messge</h3>
									<ContactForm withLabels inputClass="form-control border rounded-3" buttonClass="btn btn-gradient mt-3" />
								</div>
								<div className="z-0 bg-primary-dark rectangle-bg z-1 rounded-3" />
							</div>
						</div>
					</div>
				</div>
				<div className="scroll-move-right position-absolute bottom-0 start-50 translate-middle-x bg-900 overflow-hidden">
					<div className="wow img-custom-anim-top">
					</div>
				</div>
			</section>

		</>
	)
}
