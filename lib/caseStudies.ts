/**
 * Case studies — long-form write-ups for four shipped products.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * HONESTY BOUNDARY — read before editing.
 *
 * Everything here is grounded in what these products demonstrably do (see
 * lib/projects.ts and the screen galleries). There are deliberately NO
 * performance metrics, revenue figures, user counts, or client quotes,
 * because none of those are verifiable from this repo. Client quotes live in
 * TESTIMONIALS in lib/proof.ts and their block hides while that is empty.
 *
 * The narrative framing — constraints, decisions, tradeoffs, reflections — is
 * written as engineering reasoning about each product's problem space. Hamza
 * should read these through and correct anything that doesn't match how the
 * project actually went. They are written to be edited, not shipped blind.
 * ───────────────────────────────────────────────────────────────────────── */

import { projects, type Project } from "./projects"

export interface CaseStudySection {
	heading: string
	body: string
}

/** A decision with its cost stated. Naming the tradeoff is the whole point. */
export interface Decision {
	decision: string
	why: string
	tradeoff: string
}

export interface Phase {
	label: string
	title: string
	body: string
}

export interface CaseStudy {
	slug: string
	navLabel: string
	title: string
	summary: string
	kind: string
	/** Compact label for the nav dropdown, where space is tight. */
	shortKind: string
	year: string
	role: string[]
	stack: string[]
	platforms: string[]
	/** Opening context: who this is for and what world it lives in. */
	context: string
	/** The core problem, with the stakes made explicit. */
	challenge: string
	/** What made it hard — the real design pressure. */
	constraints: string[]
	/** The decisions that shaped the build, each with its cost. */
	decisions: Decision[]
	/** How the thing actually works. */
	architecture: string
	/** Narrative blocks between the structured sections. */
	sections: CaseStudySection[]
	/** Delivery phases, in order. */
	phases: Phase[]
	shipped: string[]
	/** Honest retrospective. This is what separates a case study from a brochure. */
	reflection: string
	gallery: number[]
}

export const caseStudies: CaseStudy[] = [
	{
		slug: "madeinpk",
		navLabel: "MadeInPK",
		kind: "B2B marketplace · iOS, Android & web",
		shortKind: "B2B marketplace",
		year: "2024",
		title: "A verified B2B textile marketplace, built across three platforms",
		summary:
			"MadeInPK connects Pakistani textile mills with international buyers who have no reliable way to tell a real supplier from a fraudulent one. Apps, web, escrow and admin tooling — designed and built end-to-end.",
		role: ["Product design", "iOS & Android", "Web app", "Backend & APIs"],
		stack: ["React Native", "Next.js", "Node.js", "PostgreSQL", "Stripe"],
		platforms: ["iOS", "Android", "Web"],
		context:
			"Pakistan's textile industry is one of the largest in the world, and almost none of it is reachable online in a way an overseas buyer can act on. Mills advertise on WhatsApp and directory sites with no verification layer. Buyers arrive wanting to place real orders and find no way to distinguish a thirty-year-old family mill from an account created last week.",
		challenge:
			"Cross-border trade runs on trust that does not exist between strangers. A buyer has no way to confirm the mill they are about to wire money to is a registered business; a genuine mill has no way to prove it is. The result is that deals die at exactly the moment money is supposed to move — which means the marketplace does not have a discovery problem, it has a settlement problem. Build the beautiful catalogue and it still fails at the last step.",
		constraints: [
			"Neither side of the transaction trusts the other, and the platform starts with no reputation of its own to lend them",
			"Buyers are often in different time zones and currencies from sellers",
			"Sellers are frequently mobile-only; buyers are frequently desk-based — so neither web-first nor app-first was sufficient",
			"Fraud has to be designed out structurally, not moderated away after the fact",
		],
		decisions: [
			{
				decision: "Verify identity against government records, not documents uploaded by the seller",
				why: "A verified badge that only means 'uploaded a PDF' is worse than no badge, because it transfers false confidence. Checking against CNIC and business registration makes the badge mean one specific, defensible thing.",
				tradeoff:
					"Onboarding is slower and some legitimate sellers drop out during verification. We accepted a smaller, real supply side over a large, unreliable one.",
			},
			{
				decision: "Hold funds in escrow rather than connecting the two parties and stepping back",
				why: "The settlement step is where deals were already failing. Removing that risk is the product; everything else is a catalogue.",
				tradeoff:
					"Significant compliance and operational burden, and a much harder v1. It also makes the platform responsible for dispute outcomes, which is a commitment, not a feature.",
			},
			{
				decision: "Keep negotiation inside the app instead of letting it move to WhatsApp",
				why: "If the conversation leaves, the deal record leaves with it, and the escrow has no context when something is disputed.",
				tradeoff:
					"Fighting a strong existing habit. It required the in-app chat to be genuinely good rather than merely present.",
			},
			{
				decision: "One shared API across iOS, Android and web from day one",
				why: "The escrow state machine is the most delicate part of the system. Implementing it once and consuming it three times was the only way to keep it consistent.",
				tradeoff:
					"Slower start than shipping a single platform first, in exchange for not paying to reconcile three divergent implementations later.",
			},
		],
		architecture:
			"A Node and PostgreSQL core owns the two things that must never disagree: seller verification state and escrow state. Both are modelled as explicit state machines rather than boolean flags, so every transition is auditable and a payment can never be released from a state that should not permit it. React Native handles iOS and Android, Next.js serves the web marketplace and the public listing pages, and all three consume the same API. Admin tooling for verification review is a first-class part of the system rather than a spreadsheet, because a human decision sits in the middle of the flow.",
		sections: [
			{
				heading: "Cutting v1 down to what actually unblocks a deal",
				body: "The initial brief was a full trading platform — logistics, analytics, ratings, financing. Reduced to first principles, only two things stop a deal from happening: the buyer cannot confirm who the seller is, and neither party will move money first. Everything else is optimisation on top of a transaction that is not occurring yet. v1 shipped those two, and the deferred features became a roadmap rather than a delay.",
			},
			{
				heading: "Why the verified badge had to be expensive to earn",
				body: "Trust markers only work if they are costly to obtain. A badge granted for uploading a document is granted to anyone willing to upload a document, including the people it is meant to filter out. Tying it to CNIC and business registration is slower and loses some sellers at the gate — which is precisely the mechanism that makes it worth something to a buyer.",
			},
			{
				heading: "What three platforms actually cost",
				body: "This is the project that best demonstrates the argument the rest of this site makes. An agency would have staffed a mobile team and a web team, and the escrow flow — the part where correctness matters most — would have been specified in a document, interpreted twice, and reconciled in QA. Here it was designed once and consumed three times. The savings were not in typing; they were in not having to make the same decision three times and then make the three answers agree.",
			},
		],
		phases: [
			{
				label: "Weeks 1–2",
				title: "Scope and the state machines",
				body: "Reduced the brief to verification and escrow. Modelled both as explicit state machines before writing interface code, because these are the two places where a bug is a financial event rather than a visual one.",
			},
			{
				label: "Weeks 3–6",
				title: "Core API and admin",
				body: "Built the shared API, the verification review tooling, and the escrow transitions with an audit trail. Admin came early rather than last, since a human review step sits inside the critical path.",
			},
			{
				label: "Weeks 7–12",
				title: "Three clients on one API",
				body: "React Native for iOS and Android, Next.js for the marketplace and public listings. In-app deal chat wired to transaction records.",
			},
			{
				label: "Launch",
				title: "Stores, onboarding and the first real deals",
				body: "App Store and Play Store submission, seller onboarding, and monitoring the first live escrow transactions — the only test that counts for a payments flow.",
			},
		],
		shipped: [
			"Seller verification against CNIC and business registration",
			"Escrow payment flow with release on buyer confirmation",
			"Auditable state machines for verification and settlement",
			"In-app deal chat tied to each transaction record",
			"Category browsing across Pakistani textile listings",
			"Native iOS and Android apps plus the web marketplace",
			"Admin tooling for verification review and dispute handling",
		],
		reflection:
			"The escrow state machine should have been built with dispute resolution modelled from the start rather than added once real disputes appeared. Retrofitting states into a system that is already moving money is far more delicate than designing them in while it is still theoretical. If I built this again, the unhappy paths would get the same up-front attention the happy path did.",
		gallery: [12, 13, 14, 15, 16, 53, 54, 55, 56, 57, 58],
	},

	{
		slug: "glazeme",
		navLabel: "GlazeMe",
		kind: "Social app with payments · iOS",
		shortKind: "Social + payments",
		year: "2025",
		title: "Turning AI-generated compliments into money people actually send",
		summary:
			"A social iOS app where the AI writes the compliment and the sender attaches real money to it. Combining generative text with a working wallet is where nearly all the engineering went.",
		role: ["Product design", "iOS", "AI integration", "Payments & wallet"],
		stack: ["SwiftUI", "OpenAI API", "Stripe", "Node.js"],
		platforms: ["iOS", "Web"],
		context:
			"Two categories that both stall for opposite reasons. Gifting apps stall because writing the message is work, and an empty text field at the moment of sending is where people abandon. Compliment apps stall because a compliment that costs nothing signals nothing — the sentiment is free, so it reads as free.",
		challenge:
			"GlazeMe's bet is that each category fixes the other's failure: the AI removes the writing effort, and the money makes the message mean something. That is a clean product thesis and a demanding build, because it puts a language model directly in the path of a payment. Every second of generation latency and every piece of generic output sits between a user and a transaction.",
		constraints: [
			"A model sitting inside a payment flow makes latency a conversion problem, not just a technical one",
			"Generic AI output reads as spam and destroys the sincerity the product depends on",
			"Money movement has to be correct on the first attempt — trust in a wallet is lost permanently, not temporarily",
			"The entire send interaction has to complete in under a minute or the impulse is gone",
		],
		decisions: [
			{
				decision: "The model drafts; the person always edits before sending",
				why: "Fully automated compliments are indistinguishable from spam, and the sender needs to feel authorship for the gesture to carry meaning. Editing is what converts generated text into something the sender is willing to put money behind.",
				tradeoff:
					"An extra step in a flow being optimised for speed. Worth it — removing it would have made the output feel machine-sent, which is fatal to the premise.",
			},
			{
				decision: "Condition generation on recipient context and the sender's own framing",
				why: "Unconditioned output is generic, and generic is the failure mode that kills the category.",
				tradeoff:
					"More input required before generation, and a more complex prompt path to maintain.",
			},
			{
				decision: "Build the wallet properly rather than delegating to a simple checkout",
				why: "Top-up, balance, send, receive and withdrawal is a real ledger. Treating it as a series of one-off charges would have broken the moment anyone tried to withdraw.",
				tradeoff:
					"The single largest chunk of build time went to the least visible part of the product.",
			},
			{
				decision: "Native SwiftUI rather than cross-platform",
				why: "The whole product is one fast, tactile interaction. Cross-platform overhead would have been felt directly in the part that matters most.",
				tradeoff:
					"iOS only at launch. Android becomes a separate build rather than a flag.",
			},
		],
		architecture:
			"SwiftUI on the front, a Node service in the middle owning both the generation path and the ledger. Generation is conditioned server-side so prompt logic can change without an App Store release. The wallet is a double-entry ledger rather than a balance column — top-ups, sends, receipts and withdrawals are all entries, so a balance is always derived and can always be explained. Stripe handles the money rails in and out; the ledger is the source of truth for everything in between.",
		sections: [
			{
				heading: "Making the AI earn its place",
				body: "A compliment generator is easy to demo and hard to ship. The demo version produces something charming once; the shipped version has to avoid producing something hollow on the fiftieth send. The answer was to stop treating generation as the product and start treating it as a draft — conditioned on real context, always edited, never sent unread. The model removes the blank page, which was the actual barrier. It does not pretend to be the sender.",
			},
			{
				heading: "The invisible half is the hard half",
				body: "Most of the engineering is the wallet, and almost none of the marketing is. Balances that are always correct, sends that cannot double-spend, withdrawals that reconcile — this is the layer that determines whether a user trusts the app after their first transaction. It got the most care precisely because it is the part nobody notices when it works.",
			},
			{
				heading: "Designing for under a minute",
				body: "The interaction is meant to be an impulse: open, pick someone, generate, adjust, attach money, send. Anything that added a screen to that path was cut, and generation latency was budgeted as a product constraint rather than accepted as a technical fact. A companion marketing site carries the job of explaining the concept, so the app never has to spend a screen on it.",
			},
		],
		phases: [
			{
				label: "Weeks 1–2",
				title: "Thesis and the send flow",
				body: "Prototyped the core interaction before any AI or payments work, to confirm the under-a-minute path was achievable at all.",
			},
			{
				label: "Weeks 3–5",
				title: "The ledger",
				body: "Built the wallet as double-entry from the start. Top-up, send, receive and withdraw, with reconciliation, before any of it was visible in the interface.",
			},
			{
				label: "Weeks 6–8",
				title: "Generation, conditioned",
				body: "Server-side prompt path with recipient context, always followed by an edit step. Latency and cost measured against the send flow rather than in isolation.",
			},
			{
				label: "Launch",
				title: "Review, listing and the marketing site",
				body: "App Store submission — a payments-plus-AI app draws more review scrutiny than most — plus the companion site.",
			},
		],
		shipped: [
			"AI compliment generation conditioned on recipient context",
			"Mandatory sender edit step before send",
			"Double-entry wallet: top-up, balance, send, receive",
			"Withdrawal and reconciliation for recipients",
			"Native SwiftUI send flow built for sub-minute completion",
			"Server-side prompt path, updatable without an app release",
			"Companion marketing website",
		],
		reflection:
			"Generation cost per send should have been instrumented from the first build rather than estimated. In an app where every send triggers a model call and only some sends carry money, unit economics are a product constraint — and I was measuring latency long before I was measuring cost per completed transaction.",
		gallery: [7, 8, 9, 10, 11, 47, 48, 49, 50, 51, 52],
	},

	{
		slug: "facemequiz",
		navLabel: "FaceMeQuiz",
		kind: "Game · iOS",
		shortKind: "iOS game",
		year: "2025",
		title: "An iOS memory game designed for week two, not week one",
		summary:
			"A face-and-memory quiz game with daily challenges and head-to-head battles, built around the retention cliff that ends most casual games within days of install.",
		role: ["Game & UI design", "iOS", "Backend", "Marketing site"],
		stack: ["SwiftUI", "Game Center", "Node.js"],
		platforms: ["iOS", "Web"],
		context:
			"Casual quiz games are cheap to build and brutal to retain. The mechanic is rarely the problem — most of them are perfectly fun the first time. What is missing is a reason to open the app on day three, when the novelty is gone and nothing about the game has changed since yesterday.",
		challenge:
			"Design a loop where something is different tomorrow. That is a content problem, a social problem and a difficulty-curve problem simultaneously, and solving only one of them still produces a game people stop playing — just slightly later.",
		constraints: [
			"A session has to be genuinely short — two minutes, not 'about five'",
			"Difficulty must rise with the player or the game becomes trivial exactly as they start caring",
			"No content team, so freshness has to come from structure rather than a production pipeline",
			"Animation and timing feel is the entire product; there is nowhere for roughness to hide",
		],
		decisions: [
			{
				decision: "Three return mechanics rather than one",
				why: "A daily reset, a live opponent and a rising difficulty curve fail in different ways and on different days. Any one alone leaves an obvious reason to stop.",
				tradeoff:
					"More systems to build and balance in v1 than a single-mechanic game would have needed.",
			},
			{
				decision: "Native SwiftUI instead of a cross-platform game layer",
				why: "In a game built on timing, transitions and score feedback, the feel is the product. Tuning that through an abstraction layer would have meant tuning it at a distance.",
				tradeoff:
					"iOS only. For a game whose first job was proving the loop retains, that was an acceptable narrowing.",
			},
			{
				decision: "Difficulty scales with the individual player, not a global curve",
				why: "A fixed curve is too easy for strong players and a wall for everyone else. The interesting band is personal.",
				tradeoff:
					"Harder to reason about and to balance, and it makes leaderboards a more careful design problem.",
			},
			{
				decision: "Treat App Store submission and the marketing site as part of the build",
				why: "This is the phase where most freelance game projects are handed back finished but unlaunched.",
				tradeoff:
					"Time spent on store assets and review is time not spent on gameplay. It is also the difference between a build and a product.",
			},
		],
		architecture:
			"SwiftUI throughout, with a light Node backend for battles, daily challenge state and scoring. The daily challenge is generated server-side so it can change without shipping an app update, which is what allows freshness without a content pipeline. Game Center carries identity and leaderboards rather than a bespoke account system — an unnecessary sign-up screen is a retention cost in a casual game.",
		sections: [
			{
				heading: "Designing against the day-three cliff",
				body: "Install is not the hard part; the third session is. Three mechanics carry the return: a daily challenge that resets, quiz battles that put a real person on the other side, and face-flip rounds that get harder as you improve. None is novel on its own — the work was making the loop between them short enough that playing is a two-minute impulse rather than a decision.",
			},
			{
				heading: "Freshness without a content team",
				body: "The obvious way to keep a quiz game fresh is to keep writing content, which requires a team that did not exist. Generating the daily challenge server-side from existing material means the game changes every day without anyone producing anything, and it can be tuned after launch without an App Store release.",
			},
			{
				heading: "Why the launch half mattered here",
				body: "Store listing, screenshots, review and the marketing site were part of this project rather than a separate phase afterwards. A casual game that is finished but not submitted is worth nothing, and getting through review is a distinct skill from building the thing.",
			},
		],
		phases: [
			{
				label: "Weeks 1–2",
				title: "Core loop prototype",
				body: "Built the face-flip round first and played it until the timing felt right. Everything else waited on that being genuinely fun.",
			},
			{
				label: "Weeks 3–4",
				title: "Return mechanics",
				body: "Daily challenge with server-side generation, head-to-head battles, and per-player difficulty scaling.",
			},
			{
				label: "Weeks 5–6",
				title: "Feel and polish",
				body: "Transitions, score feedback and animation timing tuned directly in SwiftUI — the pass that decides whether a casual game reads as cheap or not.",
			},
			{
				label: "Launch",
				title: "Store and site",
				body: "App Store submission, listing assets, review, and the full marketing website.",
			},
		],
		shipped: [
			"Face-flip memory rounds with per-player difficulty scaling",
			"Server-generated daily challenge, tunable without an app release",
			"Head-to-head quiz battles",
			"Game Center identity and leaderboards",
			"Scoring and progression",
			"App Store submission and listing assets",
			"Full marketing website",
		],
		reflection:
			"I built all three return mechanics before having any evidence about which one people would actually come back for. With hindsight I would have shipped the daily challenge alone, watched real behaviour, and let that decide whether battles were worth building — the same scope discipline I apply to client work, applied less rigorously to a project of my own.",
		gallery: [1, 2, 3, 4, 5, 6, 42, 43, 44, 45, 46],
	},

	{
		slug: "wecinema",
		navLabel: "WeCinema",
		kind: "Two-sided marketplace · Web",
		shortKind: "Video marketplace",
		year: "2024",
		title: "A video marketplace that had to be useful before it had buyers",
		summary:
			"WeCinema lets independent filmmakers buy, sell and share work. Every meaningful decision in the build came from one problem: a two-sided marketplace is worthless to both sides until it already has both sides.",
		role: ["Product design", "Web app", "Backend & APIs", "Business site"],
		stack: ["Next.js", "Node.js", "PostgreSQL", "Video streaming", "Stripe"],
		platforms: ["Web"],
		context:
			"Independent filmmakers have finished work and no distribution. Buyers — brands, agencies, producers — want independent work and have no efficient way to find it. Both sides exist; there is simply no venue where they can see each other.",
		challenge:
			"The cold-start problem in its purest form. Creators will not upload to a marketplace with no buyers, and buyers will not visit a marketplace with no work. Building both sides simultaneously and launching to an empty room is the standard way this fails.",
		constraints: [
			"Neither side has a reason to arrive first, and launching to an empty marketplace burns the only launch you get",
			"Video is heavy: uploads are large, playback must survive poor connections, and both browsing and buying collapse if it does not",
			"Two audiences with opposite priorities have to be addressed by the same marketing site",
			"Creator payouts mean real money leaving the platform, with all the correctness that implies",
		],
		decisions: [
			{
				decision: "Make the creator side worth using with zero buyers present",
				why: "This is the answer to cold start. Upload, organise, present and share your work behind a real page is a portfolio — useful on day one, with no demand side required. Supply accumulates while the marketplace is still empty.",
				tradeoff:
					"Meaningful build effort spent on tools that generate no revenue directly, in service of the marketplace existing at all.",
			},
			{
				decision: "Invest early and disproportionately in video delivery",
				why: "Every other feature is downstream of playback working. A marketplace where the preview stutters does not get to have a conversion problem, because nobody reaches checkout.",
				tradeoff:
					"Transcoding and delivery infrastructure consumed time that could have gone to marketplace features, before any transaction existed to justify it.",
			},
			{
				decision: "Give creators a shareable public page for every piece of work",
				why: "It turns each creator into a distribution channel. They share their own page, which brings their audience to the platform — the least expensive demand generation available.",
				tradeoff:
					"Public pages have to be fast and good-looking enough that a creator is willing to put their name on them, which raises the bar on the whole presentation layer.",
			},
			{
				decision: "Next.js with server rendering for all public work pages",
				why: "Those pages are the acquisition surface. They have to load fast on a shared link and be indexable.",
				tradeoff:
					"More rendering complexity than a client-only app would have needed.",
			},
		],
		architecture:
			"Next.js with server rendering for public creator and work pages — these are the shareable, indexable acquisition surface, so they cannot be client-rendered. Node and PostgreSQL handle listings, transactions and payouts. Video is handled out of band: uploads go straight to storage, transcoding runs asynchronously, and delivery is separated from the application path so a large upload never blocks browsing. Stripe covers payments in and creator payouts out.",
		sections: [
			{
				heading: "Solving the empty room",
				body: "The standard failure is to build both sides at once and launch into a marketplace with no supply and no demand. WeCinema inverts it: the creator tools are a portfolio product that is genuinely useful before a single buyer arrives. Filmmakers upload because it serves them immediately, and the marketplace acquires supply while it is still, technically, empty. The marketplace layer then switches on over a catalogue that already exists.",
			},
			{
				heading: "Video is the part that decides everything else",
				body: "Uploads are large, connections are unreliable, and playback quality determines whether anyone browses at all. This work is invisible when it succeeds and terminal when it fails, so it received attention out of proportion to its visibility — before there was any transaction volume to justify it.",
			},
			{
				heading: "Writing for two audiences at once",
				body: "The business site has to convince a filmmaker and a buyer on the same page, and they want opposite things: creators want reach and control, buyers want selection and licensing clarity. This was a harder writing problem than an engineering one, and it took more revision than any single feature in the build.",
			},
		],
		phases: [
			{
				label: "Weeks 1–3",
				title: "Video pipeline first",
				body: "Upload, transcoding and delivery before any marketplace feature, because everything downstream depends on playback being solid.",
			},
			{
				label: "Weeks 4–7",
				title: "The creator product",
				body: "Upload, organisation, presentation and shareable public work pages — server-rendered, fast, and worth a creator's name.",
			},
			{
				label: "Weeks 8–11",
				title: "Marketplace layer",
				body: "Listings, discovery, buy and sell flows, payments and creator payouts on top of a catalogue that already existed.",
			},
			{
				label: "Launch",
				title: "Business site and go-live",
				body: "The two-audience marketing site, plus launch with real supply already on the platform.",
			},
		],
		shipped: [
			"Creator upload, organisation and presentation tools",
			"Asynchronous video transcoding and delivery pipeline",
			"Server-rendered, shareable public pages for every work",
			"Marketplace listings with buy and sell flows",
			"Payments and creator payouts",
			"Discovery and browsing for buyers",
			"Full two-audience business and marketing site",
		],
		reflection:
			"Licensing terms were treated as a detail and should have been a first-class part of the listing model. Buyers of creative work care about usage rights as much as price, and bolting that on later is far messier than designing listings around it from the beginning.",
		gallery: [21, 22, 23, 24, 25, 26, 27, 28, 29],
	},
]

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
	caseStudies.find((c) => c.slug === slug)

export const getCaseStudyProject = (slug: string): Project | undefined =>
	projects.find((p) => p.slug === slug)

export const caseStudySlugs = caseStudies.map((c) => c.slug)
