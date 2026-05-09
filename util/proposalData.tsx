// Proposal content data - organized and easy to maintain
import type { ReactNode } from "react"

interface FeatureCardData {
  number: number
  title: string
  description: string
  variant: 'blue' | 'pink' | 'mix'
  fullWidth?: boolean
}

interface PageItemData {
  number: number
  title: string
  description: string
  variant: 'blue' | 'pink'
  isAdmin?: boolean
}

interface StatCard {
  value: string
  label: string
  source: string
}

interface RevenueStream {
  title: string
  tag: { text: string; variant: 'primary' | 'secondary' | 'future' }
  description: string
  figure: string
}

interface TechStackItem {
  layer: string
  name: string
  why: string
  badge: string
  badgeVariant: 'blue' | 'pink'
}

interface TimelinePhase {
  phase: string
  title: string
  description: string
  dotVariant: 'blue' | 'pink' | 'mix'
}

interface ColorSwatch {
  name: string
  hex: string
}

interface WhyNowStep {
  num: string
  stat: string
  headline: string
  body: string
  variant: 'cool' | 'warm'
}

interface FutureCard {
  marker: string
  headline: ReactNode
  body: ReactNode
  variant: 'cool' | 'warm' | 'peak'
}

interface CompetitorScore {
  name: string
  detail: string
  score: number // 0-10
  fillVariant: 'weak' | 'mid' | 'strong' | 'us'
  isUs?: boolean
}

interface BentoBenefit {
  tag: string
  title: string
  description: string
  variant: 'cool' | 'warm' | 'feature' | 'dark'
  span: 'span-2' | 'span-3' | 'span-4'
  tall?: boolean
  stat?: string
}

export const proposalData = {
  // Cover section
  cover: {
    logoName: 'ArtSpace',
    date: 'Project Proposal · 2026',
    preparedBy: 'Hamza Manzoor',
    title: <>A Home for<br /><em>Human Art</em></> as ReactNode,
    subtitle: 'Where artists are seen, and their work finds a home.',
    pills: [
      { text: 'Art Marketplace', variant: 'blue' as const },
      { text: 'Human-Made Only', variant: 'pink' as const },
      { text: 'Web Platform', variant: 'ink' as const },
      { text: 'List · Sell · Earn', variant: 'ink' as const },
    ],
  },

  // Vision section
  vision: {
    eyebrow: '01 — Vision',
    title: <>The Problem<br />We Are <em>Solving</em></> as ReactNode,
    overview:
      '"It is currently very difficult for amateur, hobbyist, and professional artists to sell their art online and support themselves from it. We are building the platform that changes this — simple, beautiful, and built for human art alone."',
    problemCard: {
      label: 'The Problem',
      title: 'Artists are lost in the noise',
      description:
        "Existing platforms like Etsy or DeviantArt are crowded with digital prints, AI-generated images, and mass-produced goods. A painter or illustrator's original canvas work gets buried. There is no dedicated, clean space for human-made art.",
    },
    answerCard: {
      label: 'Our Answer',
      title: 'A focused, artist-first marketplace',
      description:
        'A simple, elegant platform exclusively for human-created artwork. Less crowded. More targeted. Where a buyer already knows they are looking for original, handmade art — and where artists can be found and earn from their work.',
    },
  },

  // Features
  features: {
    eyebrow: '02 — What We\'re Building',
    title: <>Core <em>Features</em></> as ReactNode,
    items: [
      {
        number: 1,
        title: 'Artist Profile Page',
        description: 'Every artist gets a clean, beautiful portfolio page. Their story, their gallery, their prices — all in one place.',
        variant: 'blue' as const,
      },
      {
        number: 2,
        title: 'Artwork Listings',
        description: 'Upload artwork with high-quality images, title, medium, size, and price. Simple and fast to list.',
        variant: 'pink' as const,
      },
      {
        number: 3,
        title: 'Browse & Discover',
        description: 'Buyers can browse by style, medium, or price. Search is clean and uncluttered — no digital noise.',
        variant: 'mix' as const,
      },
      {
        number: 4,
        title: 'Secure Checkout',
        description: 'Buyers purchase directly. Payments are handled securely through Stripe. Artists receive their earnings with minimal friction.',
        variant: 'pink' as const,
      },
      {
        number: 5,
        title: 'Human-Only Verification',
        description: 'A simple onboarding process ensures every piece on the platform is genuinely human-made. This is our promise.',
        variant: 'blue' as const,
      },
      {
        number: 6,
        title: 'Artist Dashboard',
        description: 'Manage listings, track views, and see sales — all from a straightforward, easy-to-use dashboard.',
        variant: 'mix' as const,
      },
      {
        number: 7,
        title: 'Admin Panel',
        description:
          'A secure, private control panel for the platform owner. Manage all users, approve or remove artwork listings, monitor transactions, view platform analytics, and control site-wide settings — all from one place. The admin can feature specific artists on the homepage, handle disputes, and keep the platform human-art-only through listing review.',
        variant: 'blue' as const,
        fullWidth: true,
      },
    ] as FeatureCardData[],
  },

  // Pages & Screens
  pages: {
    eyebrow: '03 — Pages & Screens',
    title: <>What Gets <em>Built</em></> as ReactNode,
    items: [
      {
        number: 1,
        title: 'Home / Landing Page',
        description: 'Featured artworks, artist spotlights, and a clear call to browse or sell.',
        variant: 'blue' as const,
      },
      {
        number: 2,
        title: 'Browse / Gallery',
        description: 'Full catalogue with filters — medium, style, size, price range.',
        variant: 'pink' as const,
      },
      {
        number: 3,
        title: 'Artwork Detail Page',
        description: 'Full image, description, artist info, and buy button.',
        variant: 'blue' as const,
      },
      {
        number: 4,
        title: 'Artist Profile Page',
        description: 'Portfolio of all their works, bio, and contact/follow option.',
        variant: 'pink' as const,
      },
      {
        number: 5,
        title: 'Sell / Upload Page',
        description: 'Artist-facing listing form — images, title, price, medium, dimensions.',
        variant: 'blue' as const,
      },
      {
        number: 6,
        title: 'Artist Dashboard',
        description: 'Manage active listings, mark items as sold, view earnings.',
        variant: 'pink' as const,
      },
      {
        number: 7,
        title: 'Checkout & Payment',
        description: 'Secure payment flow — card, PayPal, or Apple/Google Pay.',
        variant: 'blue' as const,
      },
      {
        number: 8,
        title: 'Sign Up / Log In',
        description: 'Simple authentication for artists and buyers. Email or social login.',
        variant: 'pink' as const,
      },
      {
        number: 9,
        title: 'Admin Panel',
        description:
          'Full control dashboard — manage all artist accounts, review and approve listings, remove content, view sales analytics, feature artists on the homepage, and control platform-wide settings. Accessible only to verified admins.',
        variant: 'blue' as const,
        isAdmin: true,
      },
    ] as PageItemData[],
  },

  // Market Opportunity
  market: {
    eyebrow: '04 — Market Opportunity',
    title: <>A Quietly <em>Massive</em><br />Market</> as ReactNode,
    description:
      'The online art world is bigger than most people realise — and the gap for human-made, original work has never been wider. AI-generated images have flooded every existing platform, and serious buyers are actively looking for somewhere they can trust. That somewhere does not yet exist at scale.',
    stats: [
      {
        value: '$<em>13.3B</em>',
        label: 'Global online art market size',
        source: '2024 — Hiscox / Statista',
      },
      {
        value: '<em>14%</em>',
        label: 'Yearly online-art growth rate',
        source: 'Compound annual, 2023–2028',
      },
      {
        value: '<em>72%</em>',
        label: 'Buyers under 40 prefer online discovery',
        source: 'Art Basel / UBS Report',
      },
      {
        value: '<em>3×</em>',
        label: 'Increase in "original art" searches since AI boom',
        source: 'Google Trends, 2022–2025',
      },
    ] as StatCard[],
    callout:
      'Etsy is overrun with mass-production. Saatchi Art is expensive and gallery-locked. Instagram has no checkout. The buyer wants original, human-made art — and there is no clean, focused place to find it. The first platform to claim that position with care will own it.',
  },

  // Revenue Streams
  revenue: {
    eyebrow: '05 — Revenue Streams',
    title: <>How The Platform <em>Earns</em></> as ReactNode,
    description:
      'This is not a one-revenue platform. From day one, the architecture supports multiple income streams — most of which scale automatically as artists and buyers grow. No artist pays to list. The platform earns when artists earn.',
    streams: [
      {
        title: 'Sales Commission',
        tag: { text: 'Primary', variant: 'primary' as const },
        description: 'A clean 10–15% cut on every artwork sold through the platform. Paid automatically by Stripe Connect when the buyer checks out. Scales perfectly — zero extra work per sale.',
        figure: '→ Largest, most predictable income',
      },
      {
        title: 'Featured Listings',
        tag: { text: 'Add-on', variant: 'secondary' as const },
        description: 'Artists can pay a small fee ($5–25) to highlight specific artworks on the homepage, browse page, or category top-spot. Optional, opt-in, completely passive revenue.',
        figure: '→ Recurring micro-payments',
      },
      {
        title: 'Pro Artist Subscription',
        tag: { text: 'Recurring', variant: 'secondary' as const },
        description:
          'An optional monthly tier ($9–19/mo) unlocking analytics, custom storefront URL, priority verification, lower commission, and listing limits removed. Stable monthly recurring revenue.',
        figure: '→ Predictable MRR',
      },
      {
        title: 'Commissioned Artwork',
        tag: { text: 'Add-on', variant: 'secondary' as const },
        description:
          'Buyers can request custom pieces from artists directly through the platform. Higher-value transactions (often $300–2000), platform takes a 15–20% facilitation fee.',
        figure: '→ High-value per transaction',
      },
      {
        title: 'Print-on-Demand',
        tag: { text: 'Phase 2', variant: 'future' as const },
        description:
          'Optional service: artists allow buyers to order prints of their original work. Platform partners with a print provider, takes a margin per print. Inventory-free, scalable.',
        figure: '→ Passive long-tail income',
      },
      {
        title: 'Verified Brand Partnerships',
        tag: { text: 'Phase 3', variant: 'future' as const },
        description:
          'Once the audience grows, brands and galleries pay for curated collections, sponsored exhibitions, and editorial placement. High-margin, low-frequency revenue.',
        figure: '→ Premium B2B income',
      },
    ] as RevenueStream[],
  },

  // Why Now — 3-step narrative
  whyNow: {
    eyebrow: '— The Moment',
    title: <>Why <em>Now</em>, And Not Later</> as ReactNode,
    description:
      'Every great marketplace was built when a quiet shift in the world opened a door. That door is open today — and it will close as the bigger players catch up. Here is the shift, and what it means.',
    steps: [
      {
        num: 'Shift 01',
        stat: '<em>50M+</em>',
        headline: 'AI images flooded every art platform',
        body: 'Etsy, Pinterest, Behance, DeviantArt — all overrun with synthetic images in under 24 months. The signal-to-noise ratio for human art collapsed almost overnight.',
        variant: 'warm' as const,
      },
      {
        num: 'Shift 02',
        stat: '<em>3×</em>',
        headline: 'Buyers started actively searching for "real" art',
        body: 'Google searches for "original art", "human-made painting", and "verified artist" tripled. The demand exists. There is just no clean place to fulfill it yet.',
        variant: 'cool' as const,
      },
      {
        num: 'Shift 03',
        stat: '<em>0</em>',
        headline: 'Major platforms positioned for human-only',
        body: 'Not one of the existing giants has staked the position. The first focused, beautiful platform to claim "verified human art" will own that search, that audience, and that trust.',
        variant: 'cool' as const,
      },
    ] as WhyNowStep[],
  },

  // Comparison with score bars
  comparison: {
    eyebrow: '07 — Why We Win',
    title: <>The Competitive <em>Edge</em></> as ReactNode,
    description:
      'A simple way to read the competitive landscape: how strong is each platform at being a focused, trustworthy place to buy original human-made art? Higher score, better fit. Most are doing something else entirely.',
    competitors: [
      {
        name: 'Etsy',
        detail: 'Open marketplace, AI-flooded, mass-produced',
        score: 3,
        fillVariant: 'weak' as const,
      },
      {
        name: 'Saatchi Art',
        detail: 'Curated, but gallery-priced and slow',
        score: 5,
        fillVariant: 'mid' as const,
      },
      {
        name: 'DeviantArt',
        detail: 'Community-led, AI now allowed, portfolio-first',
        score: 3,
        fillVariant: 'weak' as const,
      },
      {
        name: 'Instagram',
        detail: 'Algorithm-led, no checkout, no verification',
        score: 2,
        fillVariant: 'weak' as const,
      },
      {
        name: 'Society6 / Redbubble',
        detail: 'Prints only, no original artwork sales',
        score: 4,
        fillVariant: 'mid' as const,
      },
      {
        name: 'ArtSpace',
        detail: 'Verified human-made, focused, sales-first',
        score: 9,
        fillVariant: 'us' as const,
        isUs: true,
      },
    ] as CompetitorScore[],
  },

  // Future Vision — 12/24/36 months
  visionFuture: {
    eyebrow: '— The Future',
    title: <>Where This <em>Goes</em></> as ReactNode,
    description:
      'A clear picture of what success looks like, year by year. Not a fantasy — a quietly ambitious, fully achievable trajectory built on the numbers we already trust.',
    cards: [
      {
        marker: '12 Months From Now',
        headline: <>A real, breathing <em>marketplace</em></>,
        body: (
          <>
            <strong>250 active artists</strong> have listed their work. The first <strong>$100K of art</strong> has changed hands. Buyers are landing on Google with intent and converting. The brand is starting to become known in the art Twitter / Pinterest community.
          </>
        ) as ReactNode,
        variant: 'cool' as const,
      },
      {
        marker: '24 Months From Now',
        headline: <>The compounding <em>flywheel</em></>,
        body: (
          <>
            <strong>1,500 artists</strong>. <strong>$500K–$900K GMV</strong>. Featured listings, pro subscriptions, and commissioned artwork all generating recurring monthly income. Press features begin. The first artists report this is their main income.
          </>
        ) as ReactNode,
        variant: 'warm' as const,
      },
      {
        marker: '36 Months From Now',
        headline: <>An <em>asset</em>, not a project</>,
        body: (
          <>
            <strong>6,000+ artists</strong>. <strong>$3M–$6M GMV</strong>. The platform is profitable, defensible, and operationally lean. Acquisition interest from Etsy, Shopify, and creator-economy VCs becomes credible. The platform itself is a <strong>$2M–$6M asset</strong>.
          </>
        ) as ReactNode,
        variant: 'peak' as const,
      },
    ] as FutureCard[],
  },

  // Bento benefits
  bentoBenefits: {
    eyebrow: '08 — Who Benefits',
    title: <>A Win For <em>Everyone</em> Involved</> as ReactNode,
    description:
      'Every successful marketplace works because it lifts every party that touches it. Here is exactly what each side gets, and why they will come back.',
    items: [
      {
        tag: 'For The Owner',
        title: 'A revenue-generating asset that compounds with every artist added.',
        description: 'Six income streams. Low operating cost. Defensible niche. The platform earns when artists earn — fully aligned, fully scalable.',
        variant: 'feature' as const,
        span: 'span-3' as const,
        stat: '$2M–$6M',
      },
      {
        tag: 'For Artists',
        title: 'Finally, a way to actually earn from human-made work.',
        description: 'Without competing against AI prints or mass-produced goods. Clean profile, fast listing, fair commission, real buyers.',
        variant: 'cool' as const,
        span: 'span-3' as const,
      },
      {
        tag: 'For Buyers',
        title: 'One place. Trusted. Curated. Original.',
        description: 'No clutter, no AI, no guesswork — just the human-made art they actually want to live with.',
        variant: 'warm' as const,
        span: 'span-2' as const,
      },
      {
        tag: 'For Galleries',
        title: 'A scouting channel for fresh talent.',
        description: 'Discover and sign artists without running a platform of their own.',
        variant: 'cool' as const,
        span: 'span-2' as const,
      },
      {
        tag: 'The Bigger Picture',
        title: 'Local artists reach global buyers — culture finds an audience it deserves.',
        description: 'Traditional and regional art forms — long ignored by major platforms — finally get a fair stage. This is the part that stays.',
        variant: 'dark' as const,
        span: 'span-2' as const,
      },
    ] as BentoBenefit[],
  },

  // Imagine — motivational closing banner
  imagine: {
    label: 'Imagine This',
    headline: <>One year from now, an artist in a small town sells her first painting to a buyer halfway across the world — <em>through the platform you helped build</em>.</> as ReactNode,
    body:
      'That is the actual product. The marketplace, the dashboard, the checkout — those are just the surface. The thing being built is a quiet engine that makes a creative life possible for thousands of people. Once it exists, it does not go away.',
  },

  // Tech Stack
  tech: {
    eyebrow: '09 — Tech Stack',
    title: <>How We <em>Build It</em></> as ReactNode,
    stack: [
      {
        layer: 'Frontend',
        name: 'Next.js + React',
        why: 'Fast, SEO-friendly pages so buyers can find art through Google searches.',
        badge: 'Recommended',
        badgeVariant: 'blue' as const,
      },
      {
        layer: 'Styling',
        name: 'Tailwind CSS',
        why: 'Ensures the soft pink & blue palette stays consistent across every page.',
        badge: 'Design',
        badgeVariant: 'pink' as const,
      },
      {
        layer: 'Database',
        name: 'PostgreSQL / Supabase',
        why: 'Reliable, relational database for users, listings, and orders. Free tier to start.',
        badge: 'Recommended',
        badgeVariant: 'blue' as const,
      },
      {
        layer: 'Image Storage',
        name: 'Firebase Storage',
        why: 'Artwork images are stored and served via Firebase Storage — reliable, scalable, and integrates seamlessly with the rest of the stack.',
        badge: 'Essential',
        badgeVariant: 'pink' as const,
      },
      {
        layer: 'Payments',
        name: 'Stripe / PayPal',
        why: 'Secure checkout. Stripe Connect splits payments between platform and artist automatically.',
        badge: 'Secure',
        badgeVariant: 'blue' as const,
      },
    ] as TechStackItem[],
  },

  // Timeline
  timeline: {
    eyebrow: '11 — Project Roadmap',
    title: <>How We Get <em>There</em></> as ReactNode,
    phases: [
      {
        phase: 'Phase 1 — Foundation',
        title: 'Setup, Design & Core Pages',
        description:
          'Project setup, design system in Tailwind, home page, artist profile, and artwork listing pages. Database schema and authentication.',
        dotVariant: 'blue' as const,
      },
      {
        phase: 'Phase 2 — Marketplace Core',
        title: 'Upload, Browse & Buy',
        description:
          'Artist upload dashboard, full browse/filter gallery, artwork detail pages with purchase flow, and Stripe/PayPal checkout integration.',
        dotVariant: 'pink' as const,
      },
      {
        phase: 'Phase 3 — Polish & Launch',
        title: 'Testing, SEO & Go Live',
        description:
          'Mobile responsiveness, performance optimization, SEO for artwork pages, image watermarking, Firebase Storage integration, and final deployment.',
        dotVariant: 'mix' as const,
      },
      {
        phase: 'Phase 4 — Growth',
        title: 'Feedback & Iteration',
        description:
          'Gather artist and buyer feedback. Introduce categories, featured artists, and improved discovery. Expand payment options as needed.',
        dotVariant: 'blue' as const,
      },
    ] as TimelinePhase[],
  },

  // Design
  design: {
    eyebrow: '10 — Design Direction',
    title: <>Look & <em>Feel</em></> as ReactNode,
    colors: [
      { name: 'Sky Blue', hex: '#B8D8F0' },
      { name: 'Deep Blue', hex: '#7BAFD4' },
      { name: 'Mist', hex: '#E8F4FB' },
      { name: 'Blossom', hex: '#F2C4D0' },
      { name: 'Rose', hex: '#D98EA0' },
      { name: 'Petal', hex: '#FBF0F3' },
      { name: 'Ink', hex: '#2C2C3A' },
      { name: 'Cream', hex: '#FAF8F6' },
    ] as ColorSwatch[],
  },
}
