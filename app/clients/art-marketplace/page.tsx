import type { Metadata } from "next"
import Layout from "@/components/layout/Layout"

export const metadata: Metadata = {
	title: "Project Proposal — Art Marketplace",
	description: "Private project proposal for ArtSpace.",
	robots: { index: false, follow: false },
}

const proposalCss = `
	.proposal-doc *, .proposal-doc *::before, .proposal-doc *::after { box-sizing: border-box; margin: 0; padding: 0; }

	.proposal-doc {
		--blue: #B8D8F0;
		--blue-deep: #7BAFD4;
		--blue-soft: #E8F4FB;
		--pink: #F2C4D0;
		--pink-deep: #D98EA0;
		--pink-soft: #FBF0F3;
		--ink: #2C2C3A;
		--ink-light: #6B6B7E;
		--ink-faint: #A8A8B8;
		--white: #FDFCFC;
		--cream: #FAF8F6;

		font-family: 'DM Sans', sans-serif;
		background: var(--white);
		color: var(--ink);
		font-size: 15px;
		line-height: 1.7;
		-webkit-font-smoothing: antialiased;
		scroll-behavior: smooth;
	}

	.proposal-doc .cover {
		min-height: 100vh;
		background: linear-gradient(160deg, var(--blue-soft) 0%, var(--white) 45%, var(--pink-soft) 100%);
		display: flex;
		flex-direction: column;
		padding: 0;
		position: relative;
		overflow: hidden;
		page-break-after: always;
	}
	.proposal-doc .cover-top-bar { display: flex; justify-content: space-between; align-items: center; padding: 32px 56px; }
	.proposal-doc .logo-mark { display: flex; align-items: center; gap: 10px; font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 500; color: var(--ink); letter-spacing: 0.02em; }
	.proposal-doc .logo-leaf { width: 28px; height: 28px; }
	.proposal-doc .date-tag { font-size: 12px; font-weight: 400; color: var(--ink-light); letter-spacing: 0.08em; text-transform: uppercase; }

	.proposal-doc .deco-leaf { position: absolute; top: -20px; left: -20px; width: 260px; opacity: 0.18; transform: rotate(-15deg); pointer-events: none; }
	.proposal-doc .blob { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.35; pointer-events: none; }
	.proposal-doc .blob-1 { width: 380px; height: 380px; background: var(--blue); top: -80px; right: -60px; }
	.proposal-doc .blob-2 { width: 300px; height: 300px; background: var(--pink); bottom: 60px; right: 80px; }
	.proposal-doc .blob-3 { width: 200px; height: 200px; background: var(--blue-deep); bottom: 100px; left: 40px; opacity: 0.2; }

	.proposal-doc .cover-center { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 40px 56px; position: relative; z-index: 2; }
	.proposal-doc .cover-label { font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue-deep); margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
	.proposal-doc .cover-label::before { content: ''; display: block; width: 32px; height: 1px; background: var(--blue-deep); }
	.proposal-doc .cover-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(52px, 7vw, 88px); font-weight: 300; line-height: 1.05; color: var(--ink); margin-bottom: 8px; letter-spacing: -0.01em; }
	.proposal-doc .cover-title em { font-style: italic; color: var(--pink-deep); }
	.proposal-doc .cover-subtitle { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; color: var(--ink-light); margin-bottom: 48px; font-style: italic; }

	.proposal-doc .cover-pills { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 64px; }
	.proposal-doc .pill { font-size: 12px; font-weight: 400; padding: 6px 16px; border-radius: 40px; border: 1px solid; letter-spacing: 0.03em; }
	.proposal-doc .pill-blue { border-color: var(--blue-deep); color: var(--blue-deep); background: rgba(184,216,240,0.15); }
	.proposal-doc .pill-pink { border-color: var(--pink-deep); color: var(--pink-deep); background: rgba(242,196,208,0.15); }
	.proposal-doc .pill-ink  { border-color: var(--ink-faint); color: var(--ink-light); background: transparent; }

	.proposal-doc .cover-footer { padding: 28px 56px; display: flex; justify-content: space-between; align-items: flex-end; position: relative; z-index: 2; }
	.proposal-doc .cover-footer-label { font-size: 11px; color: var(--ink-faint); letter-spacing: 0.06em; text-transform: uppercase; }
	.proposal-doc .cover-footer-name { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 400; color: var(--ink); font-style: italic; }

	.proposal-doc .page { max-width: 860px; margin: 0 auto; padding: 72px 56px; }

	.proposal-doc .sec-eyebrow { font-size: 10px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--pink-deep); margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
	.proposal-doc .sec-eyebrow::after { content: ''; flex: 1; height: 1px; background: var(--pink); }
	.proposal-doc .sec-title { font-family: 'Cormorant Garamond', serif; font-size: 38px; font-weight: 400; line-height: 1.15; color: var(--ink); margin-bottom: 28px; }
	.proposal-doc .sec-title em { font-style: italic; color: var(--blue-deep); }

	.proposal-doc .page-divider { border: none; border-top: 1px solid #EDE8E4; margin: 60px 0; }

	.proposal-doc .overview-box { background: linear-gradient(135deg, var(--blue-soft) 0%, var(--pink-soft) 100%); border-radius: 20px; padding: 40px 44px; margin-bottom: 48px; border: 1px solid rgba(184,216,240,0.4); position: relative; overflow: hidden; }
	.proposal-doc .overview-box::before { content: '\\201C'; font-family: 'Cormorant Garamond', serif; font-size: 160px; color: var(--blue); position: absolute; top: -20px; left: 20px; line-height: 1; opacity: 0.4; pointer-events: none; }
	.proposal-doc .overview-text { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; line-height: 1.6; color: var(--ink); font-style: italic; position: relative; z-index: 1; }

	.proposal-doc .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 48px; }
	.proposal-doc .col-card { border-radius: 16px; padding: 28px 30px; }
	.proposal-doc .col-card-blue { background: var(--blue-soft); border: 1px solid rgba(123,175,212,0.25); }
	.proposal-doc .col-card-pink { background: var(--pink-soft); border: 1px solid rgba(217,142,160,0.25); }
	.proposal-doc .col-card-label { font-size: 10px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 12px; }
	.proposal-doc .col-card-label-blue { color: var(--blue-deep); }
	.proposal-doc .col-card-label-pink { color: var(--pink-deep); }
	.proposal-doc .col-card-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 500; color: var(--ink); margin-bottom: 10px; line-height: 1.2; }
	.proposal-doc .col-card p { font-size: 13.5px; color: var(--ink-light); line-height: 1.65; }

	.proposal-doc .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-bottom: 48px; }
	.proposal-doc .feature-card { background: var(--cream); border: 1px solid #EDE8E4; border-radius: 14px; padding: 24px 22px; position: relative; overflow: hidden; transition: border-color 0.2s; }
	.proposal-doc .feature-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; border-radius: 0 0 14px 14px; }
	.proposal-doc .feature-card.blue::after { background: var(--blue-deep); }
	.proposal-doc .feature-card.pink::after { background: var(--pink-deep); }
	.proposal-doc .feature-card.mix::after  { background: linear-gradient(90deg, var(--blue-deep), var(--pink-deep)); }
	.proposal-doc .feature-num { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; color: var(--blue); line-height: 1; margin-bottom: 8px; }
	.proposal-doc .feature-card.pink .feature-num { color: var(--pink); }
	.proposal-doc .feature-title { font-size: 14px; font-weight: 500; color: var(--ink); margin-bottom: 6px; }
	.proposal-doc .feature-desc { font-size: 12.5px; color: var(--ink-light); line-height: 1.6; }

	.proposal-doc .pages-list { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 48px; }
	.proposal-doc .page-item { display: flex; align-items: flex-start; gap: 14px; padding: 16px 18px; background: var(--white); border: 1px solid #EDE8E4; border-radius: 12px; }
	.proposal-doc .page-num { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 500; flex-shrink: 0; margin-top: 1px; }
	.proposal-doc .page-num-blue { background: var(--blue-soft); color: var(--blue-deep); }
	.proposal-doc .page-num-pink { background: var(--pink-soft); color: var(--pink-deep); }
	.proposal-doc .page-item-title { font-size: 13.5px; font-weight: 500; color: var(--ink); margin-bottom: 2px; }
	.proposal-doc .page-item-desc  { font-size: 12px; color: var(--ink-light); line-height: 1.5; }

	.proposal-doc .tech-row { display: flex; align-items: center; gap: 16px; padding: 16px 0; border-bottom: 1px solid #EDE8E4; }
	.proposal-doc .tech-row:last-child { border-bottom: none; }
	.proposal-doc .tech-layer-label { font-size: 10px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-faint); width: 110px; flex-shrink: 0; }
	.proposal-doc .tech-name { font-size: 14px; font-weight: 500; color: var(--ink); width: 160px; flex-shrink: 0; }
	.proposal-doc .tech-why { font-size: 12.5px; color: var(--ink-light); line-height: 1.5; }
	.proposal-doc .tech-badge { font-size: 10px; font-weight: 500; padding: 3px 9px; border-radius: 20px; margin-left: auto; flex-shrink: 0; letter-spacing: 0.04em; }
	.proposal-doc .tb-blue { background: var(--blue-soft); color: var(--blue-deep); }
	.proposal-doc .tb-pink { background: var(--pink-soft); color: var(--pink-deep); }

	.proposal-doc .timeline { position: relative; padding-left: 32px; margin-bottom: 48px; }
	.proposal-doc .timeline::before { content: ''; position: absolute; left: 8px; top: 8px; bottom: 8px; width: 1px; background: linear-gradient(to bottom, var(--blue-deep), var(--pink-deep)); }
	.proposal-doc .tl-item { position: relative; margin-bottom: 28px; }
	.proposal-doc .tl-item:last-child { margin-bottom: 0; }
	.proposal-doc .tl-dot { position: absolute; left: -28px; top: 6px; width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--white); }
	.proposal-doc .tl-dot-blue { background: var(--blue-deep); }
	.proposal-doc .tl-dot-pink { background: var(--pink-deep); }
	.proposal-doc .tl-dot-mix  { background: linear-gradient(135deg, var(--blue-deep), var(--pink-deep)); }
	.proposal-doc .tl-phase { font-size: 10px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-faint); margin-bottom: 4px; }
	.proposal-doc .tl-title { font-size: 16px; font-weight: 500; color: var(--ink); margin-bottom: 4px; }
	.proposal-doc .tl-desc { font-size: 13px; color: var(--ink-light); line-height: 1.6; }

	.proposal-doc .design-palette { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
	.proposal-doc .swatch { display: flex; flex-direction: column; align-items: center; gap: 6px; }
	.proposal-doc .swatch-circle { width: 52px; height: 52px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.06); }
	.proposal-doc .swatch-name { font-size: 10px; color: var(--ink-faint); letter-spacing: 0.05em; }

	.proposal-doc .closing-box { background: linear-gradient(135deg, var(--ink) 0%, #3A3A52 100%); border-radius: 20px; padding: 48px 52px; color: white; position: relative; overflow: hidden; }
	.proposal-doc .closing-box::before { content: ''; position: absolute; top: -60px; right: -60px; width: 240px; height: 240px; border-radius: 50%; background: var(--blue); opacity: 0.12; }
	.proposal-doc .closing-box::after { content: ''; position: absolute; bottom: -40px; left: -40px; width: 180px; height: 180px; border-radius: 50%; background: var(--pink); opacity: 0.12; }
	.proposal-doc .closing-title { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; font-style: italic; color: white; margin-bottom: 16px; line-height: 1.2; position: relative; z-index: 1; }
	.proposal-doc .closing-body { font-size: 14px; color: rgba(255,255,255,0.7); line-height: 1.75; max-width: 560px; margin-bottom: 32px; position: relative; z-index: 1; }
	.proposal-doc .closing-sig { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 400; font-style: italic; color: var(--blue); position: relative; z-index: 1; }

	@media print {
		.proposal-doc .cover { page-break-after: always; min-height: 100vh; }
		.proposal-doc .page { padding: 48px 40px; }
		.proposal-doc .blob { filter: none; }
	}

	@media (max-width: 680px) {
		.proposal-doc .cover-top-bar, .proposal-doc .cover-center, .proposal-doc .cover-footer { padding-left: 28px; padding-right: 28px; }
		.proposal-doc .page { padding: 48px 28px; }
		.proposal-doc .two-col, .proposal-doc .features-grid, .proposal-doc .pages-list { grid-template-columns: 1fr; }
		.proposal-doc .cover-title { font-size: 44px; }
		.proposal-doc .tech-row { flex-wrap: wrap; }
		.proposal-doc .tech-layer-label, .proposal-doc .tech-name { width: auto; }
		.proposal-doc .tech-badge { margin-left: 0; }
		.proposal-doc .closing-box { padding: 32px 28px; }
	}
`

export default function ArtMarketplaceProposal() {
	return (
		<Layout headerStyle={1} footerStyle={1}>
			<link
				href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap"
				rel="stylesheet"
			/>
			<style dangerouslySetInnerHTML={{ __html: proposalCss }} />

			<div className="proposal-doc">
				{/* COVER */}
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
							ArtSpace
						</div>
						<div className="date-tag">Project Proposal · 2026</div>
					</div>

					<div className="cover-center">
						<div className="cover-label">Prepared for our valued client</div>
						<h1 className="cover-title">A Home for<br /><em>Human Art</em></h1>
						<p className="cover-subtitle">Where artists are seen, and their work finds a home.</p>
						<div className="cover-pills">
							<span className="pill pill-blue">Art Marketplace</span>
							<span className="pill pill-pink">Human-Made Only</span>
							<span className="pill pill-ink">Web Platform</span>
							<span className="pill pill-ink">List · Sell · Earn</span>
						</div>
					</div>

					<div className="cover-footer">
						<div>
							<div className="cover-footer-label">Prepared by</div>
							<div className="cover-footer-name">Hamza Manzoor</div>
						</div>
						<div style={{ textAlign: "right" }} />
					</div>
				</div>

				{/* PAGE 1 — VISION */}
				<div className="page">
					<div className="sec-eyebrow">01 — Vision</div>
					<h2 className="sec-title">The Problem<br />We Are <em>Solving</em></h2>

					<div className="overview-box">
						<p className="overview-text">
							&quot;It is currently very difficult for amateur, hobbyist, and professional artists to sell their art online and support themselves from it. We are building the platform that changes this — simple, beautiful, and built for human art alone.&quot;
						</p>
					</div>

					<div className="two-col">
						<div className="col-card col-card-blue">
							<div className="col-card-label col-card-label-blue">The Problem</div>
							<div className="col-card-title">Artists are lost in the noise</div>
							<p>Existing platforms like Etsy or DeviantArt are crowded with digital prints, AI-generated images, and mass-produced goods. A painter or illustrator&apos;s original canvas work gets buried. There is no dedicated, clean space for human-made art.</p>
						</div>
						<div className="col-card col-card-pink">
							<div className="col-card-label col-card-label-pink">Our Answer</div>
							<div className="col-card-title">A focused, artist-first marketplace</div>
							<p>A simple, elegant platform exclusively for human-created artwork. Less crowded. More targeted. Where a buyer already knows they are looking for original, handmade art — and where artists can be found and earn from their work.</p>
						</div>
					</div>

					<hr className="page-divider" />

					<div className="sec-eyebrow">02 — What We&apos;re Building</div>
					<h2 className="sec-title">Core <em>Features</em></h2>

					<div className="features-grid">
						<div className="feature-card blue">
							<div className="feature-num">01</div>
							<div className="feature-title">Artist Profile Page</div>
							<p className="feature-desc">Every artist gets a clean, beautiful portfolio page. Their story, their gallery, their prices — all in one place.</p>
						</div>
						<div className="feature-card pink">
							<div className="feature-num">02</div>
							<div className="feature-title">Artwork Listings</div>
							<p className="feature-desc">Upload artwork with high-quality images, title, medium, size, and price. Simple and fast to list.</p>
						</div>
						<div className="feature-card mix">
							<div className="feature-num">03</div>
							<div className="feature-title">Browse &amp; Discover</div>
							<p className="feature-desc">Buyers can browse by style, medium, or price. Search is clean and uncluttered — no digital noise.</p>
						</div>
						<div className="feature-card pink">
							<div className="feature-num">04</div>
							<div className="feature-title">Secure Checkout</div>
							<p className="feature-desc">Buyers purchase directly. Payments are handled securely through Stripe. Artists receive their earnings with minimal friction.</p>
						</div>
						<div className="feature-card blue">
							<div className="feature-num">05</div>
							<div className="feature-title">Human-Only Verification</div>
							<p className="feature-desc">A simple onboarding process ensures every piece on the platform is genuinely human-made. This is our promise.</p>
						</div>
						<div className="feature-card mix">
							<div className="feature-num">06</div>
							<div className="feature-title">Artist Dashboard</div>
							<p className="feature-desc">Manage listings, track views, and see sales — all from a straightforward, easy-to-use dashboard.</p>
						</div>
						<div className="feature-card blue" style={{ gridColumn: "1 / -1" }}>
							<div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
								<div>
									<div className="feature-num">07</div>
									<div className="feature-title">Admin Panel</div>
									<p className="feature-desc">A secure, private control panel for the platform owner. Manage all users, approve or remove artwork listings, monitor transactions, view platform analytics, and control site-wide settings — all from one place. The admin can feature specific artists on the homepage, handle disputes, and keep the platform human-art-only through listing review.</p>
								</div>
							</div>
						</div>
					</div>

					<hr className="page-divider" />

					<div className="sec-eyebrow">03 — Pages &amp; Screens</div>
					<h2 className="sec-title">What Gets <em>Built</em></h2>

					<div className="pages-list">
						<div className="page-item">
							<div className="page-num page-num-blue">1</div>
							<div>
								<div className="page-item-title">Home / Landing Page</div>
								<p className="page-item-desc">Featured artworks, artist spotlights, and a clear call to browse or sell.</p>
							</div>
						</div>
						<div className="page-item">
							<div className="page-num page-num-pink">2</div>
							<div>
								<div className="page-item-title">Browse / Gallery</div>
								<p className="page-item-desc">Full catalogue with filters — medium, style, size, price range.</p>
							</div>
						</div>
						<div className="page-item">
							<div className="page-num page-num-blue">3</div>
							<div>
								<div className="page-item-title">Artwork Detail Page</div>
								<p className="page-item-desc">Full image, description, artist info, and buy button.</p>
							</div>
						</div>
						<div className="page-item">
							<div className="page-num page-num-pink">4</div>
							<div>
								<div className="page-item-title">Artist Profile Page</div>
								<p className="page-item-desc">Portfolio of all their works, bio, and contact/follow option.</p>
							</div>
						</div>
						<div className="page-item">
							<div className="page-num page-num-blue">5</div>
							<div>
								<div className="page-item-title">Sell / Upload Page</div>
								<p className="page-item-desc">Artist-facing listing form — images, title, price, medium, dimensions.</p>
							</div>
						</div>
						<div className="page-item">
							<div className="page-num page-num-pink">6</div>
							<div>
								<div className="page-item-title">Artist Dashboard</div>
								<p className="page-item-desc">Manage active listings, mark items as sold, view earnings.</p>
							</div>
						</div>
						<div className="page-item">
							<div className="page-num page-num-blue">7</div>
							<div>
								<div className="page-item-title">Checkout &amp; Payment</div>
								<p className="page-item-desc">Secure payment flow — card, PayPal, or Apple/Google Pay.</p>
							</div>
						</div>
						<div className="page-item">
							<div className="page-num page-num-pink">8</div>
							<div>
								<div className="page-item-title">Sign Up / Log In</div>
								<p className="page-item-desc">Simple authentication for artists and buyers. Email or social login.</p>
							</div>
						</div>
						<div
							className="page-item"
							style={{
								gridColumn: "1 / -1",
								background: "linear-gradient(135deg, var(--blue-soft) 0%, var(--pink-soft) 100%)",
								borderColor: "rgba(123,175,212,0.3)",
							}}
						>
							<div className="page-num page-num-blue">9</div>
							<div>
								<div className="page-item-title">
									Admin Panel{" "}
									<span
										style={{
											fontSize: 11,
											fontWeight: 400,
											color: "var(--blue-deep)",
											background: "var(--blue-soft)",
											padding: "2px 8px",
											borderRadius: 20,
											marginLeft: 6,
										}}
									>
										Platform Owner Only
									</span>
								</div>
								<p className="page-item-desc">Full control dashboard — manage all artist accounts, review and approve listings, remove content, view sales analytics, feature artists on the homepage, and control platform-wide settings. Accessible only to verified admins.</p>
							</div>
						</div>
					</div>
				</div>

				{/* PAGE 2 */}
				<div className="page" style={{ paddingTop: 0 }}>
					<hr className="page-divider" style={{ marginTop: 0 }} />

					<div className="sec-eyebrow">04 — Tech Stack</div>
					<h2 className="sec-title">How We <em>Build It</em></h2>

					<div style={{ marginBottom: 48 }}>
						<div className="tech-row">
							<div className="tech-layer-label">Frontend</div>
							<div className="tech-name">Next.js + React</div>
							<div className="tech-why">Fast, SEO-friendly pages so buyers can find art through Google searches.</div>
							<span className="tech-badge tb-blue">Recommended</span>
						</div>
						<div className="tech-row">
							<div className="tech-layer-label">Styling</div>
							<div className="tech-name">Tailwind CSS</div>
							<div className="tech-why">Ensures the soft pink &amp; blue palette stays consistent across every page.</div>
							<span className="tech-badge tb-pink">Design</span>
						</div>
						<div className="tech-row">
							<div className="tech-layer-label">Database</div>
							<div className="tech-name">PostgreSQL / Supabase</div>
							<div className="tech-why">Reliable, relational database for users, listings, and orders. Free tier to start.</div>
							<span className="tech-badge tb-blue">Recommended</span>
						</div>
						<div className="tech-row">
							<div className="tech-layer-label">Image Storage</div>
							<div className="tech-name">Firebase Storage</div>
							<div className="tech-why">Artwork images are stored and served via Firebase Storage — reliable, scalable, and integrates seamlessly with the rest of the stack.</div>
							<span className="tech-badge tb-pink">Essential</span>
						</div>
						<div className="tech-row">
							<div className="tech-layer-label">Payments</div>
							<div className="tech-name">Stripe / PayPal</div>
							<div className="tech-why">Secure checkout. Stripe Connect splits payments between platform and artist automatically.</div>
							<span className="tech-badge tb-blue">Secure</span>
						</div>
					</div>

					<hr className="page-divider" />

					<div className="sec-eyebrow">05 — Design Direction</div>
					<h2 className="sec-title">Look &amp; <em>Feel</em></h2>

					<div className="design-palette">
						<div className="swatch"><div className="swatch-circle" style={{ background: "#B8D8F0" }} /><div className="swatch-name">Sky Blue</div></div>
						<div className="swatch"><div className="swatch-circle" style={{ background: "#7BAFD4" }} /><div className="swatch-name">Deep Blue</div></div>
						<div className="swatch"><div className="swatch-circle" style={{ background: "#E8F4FB" }} /><div className="swatch-name">Mist</div></div>
						<div className="swatch"><div className="swatch-circle" style={{ background: "#F2C4D0" }} /><div className="swatch-name">Blossom</div></div>
						<div className="swatch"><div className="swatch-circle" style={{ background: "#D98EA0" }} /><div className="swatch-name">Rose</div></div>
						<div className="swatch"><div className="swatch-circle" style={{ background: "#FBF0F3" }} /><div className="swatch-name">Petal</div></div>
						<div className="swatch"><div className="swatch-circle" style={{ background: "#2C2C3A" }} /><div className="swatch-name">Ink</div></div>
						<div className="swatch"><div className="swatch-circle" style={{ background: "#FAF8F6" }} /><div className="swatch-name">Cream</div></div>
					</div>

					<div className="two-col" style={{ marginTop: 20 }}>
						<div className="col-card col-card-blue">
							<div className="col-card-label col-card-label-blue">Visual Identity</div>
							<div className="col-card-title">Soft, airy, gallery-like</div>
							<p>Light backgrounds. Generous white space. Artwork takes center stage — the interface steps back and lets the art breathe. A leaf motif in the top-left corner gives the brand a gentle, organic signature.</p>
						</div>
						<div className="col-card col-card-pink">
							<div className="col-card-label col-card-label-pink">Typography</div>
							<div className="col-card-title">Cormorant + DM Sans</div>
							<p>A refined serif for headings gives the platform a fine-art gallery feeling. A clean sans-serif for body text keeps reading comfortable and modern. Together they feel both elegant and accessible.</p>
						</div>
					</div>

					<hr className="page-divider" />

					<div className="sec-eyebrow">06 — Project Roadmap</div>
					<h2 className="sec-title">How We Get <em>There</em></h2>

					<div className="timeline">
						<div className="tl-item">
							<div className="tl-dot tl-dot-blue" />
							<div className="tl-phase">Phase 1 — Foundation</div>
							<div className="tl-title">Setup, Design &amp; Core Pages</div>
							<p className="tl-desc">Project setup, design system in Tailwind, home page, artist profile, and artwork listing pages. Database schema and authentication.</p>
						</div>
						<div className="tl-item">
							<div className="tl-dot tl-dot-pink" />
							<div className="tl-phase">Phase 2 — Marketplace Core</div>
							<div className="tl-title">Upload, Browse &amp; Buy</div>
							<p className="tl-desc">Artist upload dashboard, full browse/filter gallery, artwork detail pages with purchase flow, and Stripe/PayPal checkout integration.</p>
						</div>
						<div className="tl-item">
							<div className="tl-dot tl-dot-mix" />
							<div className="tl-phase">Phase 3 — Polish &amp; Launch</div>
							<div className="tl-title">Testing, SEO &amp; Go Live</div>
							<p className="tl-desc">Mobile responsiveness, performance optimization, SEO for artwork pages, image watermarking, Firebase Storage integration, and final deployment.</p>
						</div>
						<div className="tl-item">
							<div className="tl-dot tl-dot-blue" />
							<div className="tl-phase">Phase 4 — Growth</div>
							<div className="tl-title">Feedback &amp; Iteration</div>
							<p className="tl-desc">Gather artist and buyer feedback. Introduce categories, featured artists, and improved discovery. Expand payment options as needed.</p>
						</div>
					</div>

					<hr className="page-divider" />

					<div className="sec-eyebrow">07 — Our Commitment</div>
					<div className="closing-box">
						<div className="closing-title">Simplicity is the point.<br />The art does the talking.</div>
						<p className="closing-body">
							This platform will not compete on features. It will compete on focus. A clean, beautiful, trustworthy space where artists can list their work and buyers can find it — without noise, without distraction, without AI-generated clutter.
							<br /><br />
							We will build with care, launch lean, and grow with the community it serves. In sha Allah, the success will follow naturally — because the platform will genuinely help people.
						</p>
						<div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32, position: "relative", zIndex: 1 }}>
							<span style={{ fontSize: 12, padding: "6px 14px", borderRadius: 30, border: "1px solid rgba(184,216,240,0.4)", color: "rgba(255,255,255,0.7)" }}>Human art only</span>
							<span style={{ fontSize: 12, padding: "6px 14px", borderRadius: 30, border: "1px solid rgba(242,196,208,0.4)", color: "rgba(255,255,255,0.7)" }}>Simplicity first</span>
							<span style={{ fontSize: 12, padding: "6px 14px", borderRadius: 30, border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}>Artists supported</span>
							<span style={{ fontSize: 12, padding: "6px 14px", borderRadius: 30, border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}>Built with purpose</span>
						</div>
						<div className="closing-sig">Ready to build something meaningful.</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
