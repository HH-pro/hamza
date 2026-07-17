import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { SITE } from "@/lib/seo"

export const runtime = "nodejs"
export const revalidate = 86400

const FONT_DIR = join(process.cwd(), "public/assets/fonts/satoshi/fonts")

async function loadFont(file: string) {
	return readFile(join(FONT_DIR, file))
}

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const title = (searchParams.get("title") || SITE.title).slice(0, 120)
	const tag = (searchParams.get("tag") || "").slice(0, 40)
	const subtitle = (searchParams.get("subtitle") || SITE.description).slice(0, 160)

	const [bold, regular, medium] = await Promise.all([
		loadFont("Satoshi-Bold.ttf"),
		loadFont("Satoshi-Regular.ttf"),
		loadFont("Satoshi-Medium.ttf"),
	])

	const domain = SITE.url.replace(/^https?:\/\//, "")

	return new ImageResponse(
		(
			<div
				style={{
					width: "1200px",
					height: "630px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "72px",
					backgroundColor: "#0B0B12",
					backgroundImage:
						"radial-gradient(circle at 82% -10%, #312e81 0%, rgba(49,46,129,0) 55%), radial-gradient(circle at 0% 120%, #1e1b4b 0%, rgba(30,27,75,0) 50%)",
					fontFamily: "Satoshi",
					color: "#ffffff",
					position: "relative",
				}}
			>
				{/* top row: brand mark + eyebrow */}
				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
						<div
							style={{
								width: "64px",
								height: "64px",
								borderRadius: "16px",
								background: "linear-gradient(135deg, #6366f1, #4338ca)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: "38px",
								fontWeight: 700,
								boxShadow: "0 8px 32px rgba(99,102,241,0.45)",
							}}
						>
							H
						</div>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<span style={{ fontSize: "26px", fontWeight: 700, letterSpacing: "-0.5px" }}>
								{SITE.brand}
							</span>
							<span style={{ fontSize: "18px", color: "#a5b4fc" }}>Full Stack Developer</span>
						</div>
					</div>
					{tag ? (
						<div
							style={{
								display: "flex",
								alignItems: "center",
								fontSize: "20px",
								fontWeight: 500,
								color: "#c7d2fe",
								padding: "10px 22px",
								borderRadius: "999px",
								border: "1px solid rgba(165,180,252,0.35)",
								background: "rgba(99,102,241,0.12)",
							}}
						>
							{tag}
						</div>
					) : (
						<div style={{ display: "flex" }} />
					)}
				</div>

				{/* headline block */}
				<div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "1000px" }}>
					<div
						style={{
							display: "flex",
							fontSize: title.length > 48 ? "64px" : "78px",
							fontWeight: 700,
							lineHeight: 1.05,
							letterSpacing: "-2px",
							background: "linear-gradient(90deg, #ffffff 0%, #c7d2fe 100%)",
							backgroundClip: "text",
							color: "transparent",
						}}
					>
						{title}
					</div>
					<div
						style={{
							display: "flex",
							fontSize: "28px",
							lineHeight: 1.4,
							fontWeight: 400,
							color: "#c3c8d4",
							maxWidth: "920px",
						}}
					>
						{subtitle}
					</div>
				</div>

				{/* footer */}
				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<span style={{ fontSize: "24px", fontWeight: 500, color: "#e5e7eb" }}>{domain}</span>
					<span style={{ fontSize: "20px", color: "#818cf8" }}>
						Web · Mobile · UI/UX · AI/ML
					</span>
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
			],
			headers: {
				"Cache-Control": "public, immutable, no-transform, max-age=86400",
			},
		},
	)
}
