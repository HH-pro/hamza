import Layout from "@/components/layout/Layout"
import Link from "next/link"

type Plan = {
	projectName: string
	domain: string
	tagline: string
	price: string
	billing: string
	details: string
	features: string[]
	highlight?: boolean
}

const plans: Plan[] = [
	{
		projectName: "Starter Business Site",
		domain: "yourbrand.com",
		tagline: "Best for small businesses & personal brands",
		price: "$199",
		billing: "one-time",
		details:
			"A clean 5-page responsive website built on Next.js + Bootstrap. Includes domain setup, basic SEO and a contact form so customers can reach you instantly.",
		features: [
			"Up to 5 pages (Home, About, Services, Contact, Blog)",
			"Free domain name for 1 year",
			"Mobile responsive design",
			"Basic on-page SEO setup",
			"Contact form + WhatsApp integration",
			"1 month of free support",
		],
	},
	{
		projectName: "Professional Portfolio",
		domain: "yourname.design",
		tagline: "Perfect for freelancers, designers & agencies",
		price: "$399",
		billing: "one-time",
		details:
			"A modern animated portfolio website with custom branding, project showcase, blog and CMS so you can update content yourself anytime.",
		features: [
			"Up to 10 pages with custom animations",
			"Free domain + premium hosting (1 year)",
			"Project / portfolio showcase section",
			"Blog with admin dashboard (CMS)",
			"Advanced SEO + Google Analytics",
			"Social media + WhatsApp integration",
			"3 months of free support",
		],
		highlight: true,
	},
	{
		projectName: "E-Commerce Store",
		domain: "yourstore.shop",
		tagline: "Sell online — products, payments & orders",
		price: "$799",
		billing: "one-time",
		details:
			"A complete online store with product catalog, secure checkout, multiple payment gateways and admin panel to manage orders, stock and customers.",
		features: [
			"Unlimited products & categories",
			"Free domain + business hosting (1 year)",
			"Stripe / PayPal / JazzCash integration",
			"Admin dashboard for orders & inventory",
			"Customer accounts + order tracking",
			"Email notifications & invoices",
			"6 months of free support",
		],
	},
	{
		projectName: "Custom Web Application",
		domain: "yourapp.io",
		tagline: "Tailored SaaS / dashboard / booking systems",
		price: "$1499+",
		billing: "project-based",
		details:
			"Fully custom web application built around your business logic — dashboards, booking systems, CRMs, or SaaS products. Scoped and quoted after a free consultation.",
		features: [
			"Custom UI/UX design from scratch",
			"User authentication & role management",
			"Database design + REST/GraphQL APIs",
			"Admin panel + analytics",
			"Cloud deployment (Vercel / AWS / DO)",
			"12 months of free support & updates",
		],
	},
]

export default function WebsitePlans() {
	return (
		<>
			<Layout headerStyle={1} footerStyle={1}>
				<div>
					<section className="section-pricing-1 pt-130 pb-150">
						<div className="container">
							<div className="row">
								<div className="col-lg-8 mx-lg-auto mb-8">
									<div className="text-center">
										<Link href="/#" className="btn btn-gradient d-inline-block text-uppercase">
											Website Plans
										</Link>
										<h3 className="ds-3 mt-3 mb-4 text-dark">
											Ready-Made <span className="text-300">Website Plans for</span> Every Client
										</h3>
										<p className="text-300 fs-5 mb-0">
											Choose a plan that fits your business — domain, design, development and
											<br />
											deployment, all handled for you.
										</p>
									</div>
								</div>
							</div>

							<div className="row mt-4">
								{plans.map((plan, i) => (
									<div className="col-lg-6 col-md-6 mb-4" key={i}>
										<div
											className={`card-pricing-1 p-6 rounded-4 h-100 d-flex flex-column ${
												plan.highlight ? "border border-2 border-primary" : ""
											}`}
										>
											<div className="d-flex justify-content-between align-items-start mb-2">
												<span className="text-uppercase fs-7 text-primary fw-bold">
													{plan.projectName}
												</span>
												{plan.highlight && (
													<span className="badge bg-primary text-white">Most Popular</span>
												)}
											</div>

											<h3 className="fs-3 fw-semibold text-dark mb-1">{plan.domain}</h3>
											<p className="text-300 fs-6 mb-3">{plan.tagline}</p>

											<h3 className="ds-4 fw-medium text-primary mb-4">
												{plan.price}
												<span className="text-300 fs-5">/{plan.billing}</span>
											</h3>

											<div className="border-top border-600 pt-4 mb-3">
												<p className="fs-7 text-uppercase text-dark fw-bold mb-2">Details</p>
												<p className="text-300 mb-0">{plan.details}</p>
											</div>

											<div className="border-top border-600 pt-4 mb-auto">
												<p className="fs-7 text-uppercase text-dark fw-bold mb-2">What's Included</p>
												<ul className="ps-3 mb-0">
													{plan.features.map((feature, idx) => (
														<li key={idx}>
															<p className="text-300 mb-1">{feature}</p>
														</li>
													))}
												</ul>
											</div>

											<Link
												href="/#contact"
												className="btn btn-primary mt-5 w-100 justify-content-center"
											>
												Get This Plan
												<i className="ri-arrow-right-up-line" />
											</Link>
										</div>
									</div>
								))}
							</div>

							<div className="row mt-8">
								<div className="col-lg-8 mx-lg-auto text-center">
									<h3 className="ds-5 text-dark mb-3">Need something custom?</h3>
									<p className="text-300 fs-5 mb-4">
										Apka project in plans mein fit nahi ho raha? Koi baat nahi — mujhe apni requirements
										batain aur main aapke liye custom quote bana dunga.
									</p>
									<Link href="/#contact" className="btn btn-gradient">
										Request Custom Quote
										<i className="ri-arrow-right-up-line" />
									</Link>
								</div>
							</div>
						</div>
					</section>
				</div>
			</Layout>
		</>
	)
}
