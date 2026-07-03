'use client'

export default function CvPage() {
	return (
		<>
			<style>{`
				.cv-page * { box-sizing: border-box; }
				.cv-page {
					font-family: var(--urbanist), Arial, sans-serif;
					color: #1c1c22;
					background: #f2f2f5;
					min-height: 100vh;
					padding: 2rem 1rem;
				}
				.cv-toolbar {
					max-width: 850px;
					margin: 0 auto 1rem;
					display: flex;
					justify-content: flex-end;
				}
				.cv-print-btn {
					background: linear-gradient(135deg, #6d4df2, #8c71ff);
					color: #fff;
					border: none;
					padding: 0.65rem 1.4rem;
					border-radius: 8px;
					font-weight: 600;
					font-size: 0.9rem;
					cursor: pointer;
					box-shadow: 0 6px 16px rgba(109, 77, 242, 0.3);
				}
				.cv-sheet {
					width: 210mm;
					min-height: 297mm;
					margin: 0 auto;
					background: #fff;
					box-shadow: 0 10px 40px rgba(0,0,0,0.15);
					display: grid;
					grid-template-columns: 68mm 1fr;
				}
				.cv-sidebar {
					background: #191934;
					color: #e7e6f5;
					padding: 12mm 8mm;
				}
				.cv-name {
					font-family: var(--playpair), serif;
					font-size: 20pt;
					font-weight: 700;
					color: #fff;
					margin: 0 0 2px;
					line-height: 1.15;
				}
				.cv-title {
					font-size: 9.5pt;
					color: #8c71ff;
					font-weight: 600;
					margin: 0 0 14mm;
					letter-spacing: 0.02em;
				}
				.cv-side-section { margin-bottom: 9mm; }
				.cv-side-heading {
					font-size: 8.5pt;
					text-transform: uppercase;
					letter-spacing: 0.08em;
					font-weight: 700;
					color: #8c71ff;
					margin: 0 0 4mm;
					border-bottom: 1px solid rgba(255,255,255,0.15);
					padding-bottom: 2mm;
				}
				.cv-contact-item {
					font-size: 8.7pt;
					line-height: 1.5;
					margin-bottom: 3mm;
					word-break: break-word;
					color: #d6d5ea;
				}
				.cv-contact-label {
					display: block;
					font-size: 7.3pt;
					color: #8c71ff;
					font-weight: 700;
					text-transform: uppercase;
					letter-spacing: 0.04em;
					margin-bottom: 0.5mm;
				}
				.cv-skill-tag {
					display: inline-block;
					font-size: 8pt;
					background: rgba(140,113,255,0.18);
					color: #e7e6f5;
					padding: 1.3mm 2.6mm;
					border-radius: 4px;
					margin: 0 1.5mm 1.5mm 0;
				}
				.cv-tool-row {
					font-size: 8.5pt;
					line-height: 1.6;
					color: #d6d5ea;
				}
				.cv-main {
					padding: 12mm 10mm;
				}
				.cv-section { margin-bottom: 7mm; }
				.cv-main-heading {
					font-size: 10.5pt;
					text-transform: uppercase;
					letter-spacing: 0.08em;
					font-weight: 700;
					color: #6d4df2;
					margin: 0 0 3mm;
					padding-bottom: 1.5mm;
					border-bottom: 1.5px solid #6d4df2;
				}
				.cv-summary {
					font-size: 9.3pt;
					line-height: 1.55;
					color: #3a3a44;
					margin: 0;
				}
				.cv-item { margin-bottom: 5mm; }
				.cv-item:last-child { margin-bottom: 0; }
				.cv-item-row {
					display: flex;
					justify-content: space-between;
					align-items: baseline;
					gap: 6mm;
				}
				.cv-item-title {
					font-size: 9.7pt;
					font-weight: 700;
					color: #191934;
					margin: 0;
				}
				.cv-item-sub {
					font-size: 8.7pt;
					color: #6d4df2;
					font-weight: 600;
					margin: 0 0 1.3mm;
				}
				.cv-item-date {
					font-size: 8.3pt;
					color: #7a7a86;
					font-weight: 600;
					white-space: nowrap;
				}
				.cv-item-desc {
					font-size: 8.7pt;
					line-height: 1.5;
					color: #4a4a54;
					margin: 0;
				}
				.cv-projects-grid {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 3mm 6mm;
				}
				.cv-project-name {
					font-size: 9pt;
					font-weight: 700;
					color: #191934;
					margin: 0 0 0.5mm;
				}
				.cv-project-desc {
					font-size: 8.3pt;
					color: #5a5a64;
					margin: 0;
					line-height: 1.4;
				}
				.cv-footnote {
					margin-top: 8mm;
					padding-top: 3mm;
					border-top: 1px solid #e5e5ec;
					font-size: 8.3pt;
					color: #8a8a94;
				}

				@media print {
					@page { size: A4; margin: 0; }
					.cv-toolbar { display: none !important; }
					.cv-page { background: #fff; padding: 0; }
					.cv-sheet { box-shadow: none; width: 210mm; min-height: 297mm; }
				}
			`}</style>

			<div className="cv-page">
				<div className="cv-toolbar">
					<button type="button" className="cv-print-btn" onClick={() => window.print()}>
						Download PDF
					</button>
				</div>

				<div className="cv-sheet">
					{/* Sidebar */}
					<aside className="cv-sidebar">
						<h1 className="cv-name">Hamza</h1>
						<p className="cv-title">Full Stack Developer</p>

						<div className="cv-side-section">
							<h2 className="cv-side-heading">Contact</h2>
							<div className="cv-contact-item">
								<span className="cv-contact-label">Phone</span>
								+92 311 7836704
							</div>
							<div className="cv-contact-item">
								<span className="cv-contact-label">Email</span>
								Info@hamzamanzoor.online
							</div>
							<div className="cv-contact-item">
								<span className="cv-contact-label">Location</span>
								Narowal, Punjab, Pakistan
							</div>
							<div className="cv-contact-item">
								<span className="cv-contact-label">Portfolio</span>
								hamzamanzoor.online
							</div>
						</div>

						<div className="cv-side-section">
							<h2 className="cv-side-heading">Core Skills</h2>
							<span className="cv-skill-tag">React / Next.js</span>
							<span className="cv-skill-tag">Node.js</span>
							<span className="cv-skill-tag">React Native</span>
							<span className="cv-skill-tag">Flutter</span>
							<span className="cv-skill-tag">TypeScript</span>
							<span className="cv-skill-tag">UI/UX Design</span>
							<span className="cv-skill-tag">AI / ML Integration</span>
							<span className="cv-skill-tag">WordPress</span>
						</div>

						<div className="cv-side-section">
							<h2 className="cv-side-heading">Tools &amp; Platforms</h2>
							<p className="cv-tool-row">
								Firebase, MongoDB, SQL, Git, Figma, TensorFlow Lite
							</p>
						</div>

						<div className="cv-side-section">
							<h2 className="cv-side-heading">Languages</h2>
							<p className="cv-tool-row">
								English — Professional
								<br />
								Urdu — Native
							</p>
						</div>

						<div className="cv-side-section">
							<h2 className="cv-side-heading">Availability</h2>
							<p className="cv-tool-row">
								Open to freelance contracts, long-term partnerships, and full-time
								remote roles.
							</p>
						</div>
					</aside>

					{/* Main */}
					<main className="cv-main">
						<div className="cv-section">
							<h2 className="cv-main-heading">Summary</h2>
							<p className="cv-summary">
								Full-stack developer specializing in scalable web and mobile
								applications, with hands-on expertise in App Development, UI/UX
								design, and integrating advanced technologies such as Artificial
								Intelligence and Machine Learning into production products.
							</p>
						</div>

						<div className="cv-section">
							<h2 className="cv-main-heading">Experience</h2>

							<div className="cv-item">
								<div className="cv-item-row">
									<p className="cv-item-title">Senior Full-Stack Developer (Freelance)</p>
									<span className="cv-item-date">2024 - 2026</span>
								</div>
								<p className="cv-item-sub">Self-Employed</p>
								<p className="cv-item-desc">
									Architecting and shipping full-stack web &amp; mobile products
									end-to-end, including AI-integrated apps and B2B marketplace
									platforms.
								</p>
							</div>

							<div className="cv-item">
								<div className="cv-item-row">
									<p className="cv-item-title">Full-Stack Developer (Freelance)</p>
									<span className="cv-item-date">2022 - 2024</span>
								</div>
								<p className="cv-item-sub">Self-Employed</p>
								<p className="cv-item-desc">
									Delivered production websites and platforms for international
									clients across React/Node stacks and WordPress.
								</p>
							</div>

							<div className="cv-item">
								<div className="cv-item-row">
									<p className="cv-item-title">Web Developer</p>
									<span className="cv-item-date">2020 - 2022</span>
								</div>
								<p className="cv-item-sub">Self-Employed</p>
								<p className="cv-item-desc">
									Built responsive websites and optimized user experience for
									small businesses, laying the foundation in modern JS frameworks.
								</p>
							</div>
						</div>

						<div className="cv-section">
							<h2 className="cv-main-heading">Featured Projects</h2>
							<div className="cv-projects-grid">
								<div>
									<p className="cv-project-name">Wecinema</p>
									<p className="cv-project-desc">Business website for a cinema discovery platform.</p>
								</div>
								<div>
									<p className="cv-project-name">Risby Homes</p>
									<p className="cv-project-desc">Property development website, WordPress.</p>
								</div>
								<div>
									<p className="cv-project-name">GlazeMe</p>
									<p className="cv-project-desc">iOS app — AI glaze generation &amp; gifting.</p>
								</div>
								<div>
									<p className="cv-project-name">MadeInPK</p>
									<p className="cv-project-desc">iOS &amp; Android B2B textile trading marketplace.</p>
								</div>
								<div>
									<p className="cv-project-name">Voting Buddy</p>
									<p className="cv-project-desc">Quiz website for election engagement.</p>
								</div>
								<div>
									<p className="cv-project-name">Xiaomi.kg</p>
									<p className="cv-project-desc">Ecommerce store for retail electronics.</p>
								</div>
							</div>
						</div>

						<p className="cv-footnote">
							Full portfolio and case studies available at hamzamanzoor.online/work
						</p>
					</main>
				</div>
			</div>
		</>
	)
}
