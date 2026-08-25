import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { SITE } from "@/lib/seo"

export const runtime = "nodejs"
export const revalidate = 86400

const SATOSHI_DIR = join(process.cwd(), "public/assets/fonts/satoshi/fonts")
const OG_DIR = join(process.cwd(), "public/assets/fonts/og")

/**
 * Social card. Mirrors the site's own identity rather than inventing a second
 * one: light ground, violet accent, and the Playfair-italic half of the
 * wordmark — so the preview and the page a visitor lands on look related.
 */
export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const title = (searchParams.get("title") || SITE.title).slice(0, 120)
	const tag = (searchParams.get("tag") || "").slice(0, 40)
	const subtitle = (searchParams.get("subtitle") || SITE.description).slice(0, 170)

	const [bold, regular, medium, playfair] = await Promise.all([
		readFile(join(SATOSHI_DIR, "Satoshi-Bold.ttf")),
		readFile(join(SATOSHI_DIR, "Satoshi-Regular.ttf")),
		readFile(join(SATOSHI_DIR, "Satoshi-Medium.ttf")),
		readFile(join(OG_DIR, "PlayfairDisplay-Italic.ttf")),
	])

	const domain = SITE.url.replace(/^https?:\/\//, "")
	const titleSize = title.length > 70 ? 56 : title.length > 44 ? 66 : 78

	return new ImageResponse(
		(
			<div
				style={{
					width: "1200px",
					height: "630px",
					display: "flex",
					backgroundColor: "#FBFAFD",
					fontFamily: "Satoshi",
					color: "#12121A",
				}}
			>
				{/* Accent spine */}
				<div style={{ display: "flex", width: "14px", height: "630px", backgroundColor: "#6D4DF2" }} />

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						padding: "64px 68px",
						flex: 1,
					}}
				>
					{/* Wordmark + tag */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							width: "100%",
						}}
					>
						<div style={{ display: "flex", alignItems: "baseline" }}>
							<span style={{ fontSize: "30px", fontWeight: 700, letterSpacing: "-0.8px" }}>
								Hamza
							</span>
							<span
								style={{
									fontFamily: "Playfair",
									fontSize: "31px",
									color: "#6D4DF2",
									marginLeft: "4px",
								}}
							>
								Manzoor
							</span>
						</div>

						{tag ? (
							<div
								style={{
									display: "flex",
									alignItems: "center",
									fontSize: "17px",
									fontWeight: 500,
									letterSpacing: "1.6px",
									textTransform: "uppercase",
									color: "#5334DD",
									padding: "9px 18px",
									borderRadius: "6px",
									backgroundColor: "#EFEBFE",
								}}
							>
								{tag}
							</div>
						) : (
							<div style={{ display: "flex" }} />
						)}
					</div>

					{/* Headline */}
					<div style={{ display: "flex", flexDirection: "column", maxWidth: "980px" }}>
						<div
							style={{
								display: "flex",
								fontSize: `${titleSize}px`,
								fontWeight: 700,
								lineHeight: 1.06,
								letterSpacing: "-2.2px",
								color: "#12121A",
							}}
						>
							{title}
						</div>
						<div
							style={{
								display: "flex",
								marginTop: "22px",
								fontSize: "25px",
								lineHeight: 1.45,
								fontWeight: 400,
								color: "#43435A",
								maxWidth: "880px",
							}}
						>
							{subtitle}
						</div>
					</div>

					{/* Footer */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							width: "100%",
							paddingTop: "26px",
							borderTop: "1px solid #E6E3F1",
						}}
					>
						<span style={{ fontSize: "21px", fontWeight: 500, color: "#12121A" }}>{domain}</span>
						<span style={{ fontSize: "19px", color: "#70708A" }}>
							Design · Web · Mobile · Backend
						</span>
					</div>
				</div>
			</div>
		),
		{
			width: 1200,
			height: 630,
			fonts: [
				{ name: "Satoshi", data: bold, weight: 700, style: "normal" },
				{ name: "Satoshi", data: medium, weight: 500, style: "normal" },
				{ name: "Satoshi", data: regular, weight: 400, style: "normal" },
				{ name: "Playfair", data: playfair, weight: 500, style: "normal" },
			],
			headers: {
				"Cache-Control": "public, immutable, no-transform, max-age=86400",
			},
		},
	)
}
