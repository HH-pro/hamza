import "../public/assets/css/vendors/bootstrap.min.css"
import "../public/assets/css/vendors/swiper-bundle.min.css"
import "../public/assets/css/vendors/carouselTicker.css"
import "../public/assets/css/vendors/magnific-popup.css"
import "../public/assets/fonts/remixicon/remixicon.css"
import "../public/assets/css/main.css"
import "../public/assets/css/hm.css"


import type { Metadata } from "next"
import { Urbanist, Playfair_Display, DM_Mono } from "next/font/google"
import { SITE, ogImageUrl } from "@/lib/seo"

const urbanist = Urbanist({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	variable: "--urbanist",
	display: 'swap',
})
const playfair_display = Playfair_Display({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	variable: "--playpair",
	display: 'swap',
})
const dmMono = DM_Mono({
	weight: ['300', '400', '500'],
	subsets: ['latin'],
	variable: "--dmMono",
	display: 'swap',
})
export const metadata: Metadata = {
	metadataBase: new URL(SITE.url),
	title: {
		default: SITE.title,
		template: `%s · ${SITE.brand}`,
	},
	description: SITE.description,
	keywords: [...SITE.keywords],
	applicationName: SITE.brand,
	authors: [{ name: SITE.name, url: SITE.url }],
	creator: SITE.name,
	publisher: SITE.name,
	alternates: { canonical: "/" },
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
	openGraph: {
		type: "website",
		url: SITE.url,
		siteName: SITE.brand,
		title: SITE.title,
		description: SITE.description,
		locale: SITE.locale,
		images: [
			{
				url: ogImageUrl(),
				width: 1200,
				height: 630,
				alt: SITE.title,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: SITE.title,
		description: SITE.description,
		creator: SITE.twitter,
		images: [ogImageUrl()],
	},
	icons: {
		icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
		apple: [{ url: "/icon.svg" }],
	},
	category: "technology",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" data-bs-theme="light">
			<body className={`hm ${urbanist.variable} ${playfair_display.variable} ${dmMono.variable}`}>
				<script
					dangerouslySetInnerHTML={{
						__html:
							"try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.body.classList.add('reveal-ready')}}catch(e){}",
					}}
				/>
				{children}
			</body>
		</html>
	)
}
