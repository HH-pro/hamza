'use client'

import { useEffect, useState } from "react"

export default function ThemeSwitch() {
	const [theme, setTheme] = useState<string>("light")

	useEffect(() => {
		// Default to "light" theme and then check localStorage for saved theme
		document.documentElement.setAttribute("data-bs-theme", "light")
		const savedTheme = localStorage?.getItem("theme") || "light"
		setTheme(savedTheme)
		document.documentElement.setAttribute("data-bs-theme", savedTheme)
	}, [])

	useEffect(() => {
		// Update localStorage and HTML tag when theme changes
		localStorage.setItem("theme", theme)
		document.documentElement.setAttribute("data-bs-theme", theme)
	}, [theme])

	const toggleTheme = () => {
		setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"))
	}

	return (
		<div
			className="dark-light-switcher pe-10 pe-lg-0 pe-0 ps-md-5 ps-0 ps-lg-4 pe-lg-4 d-flex justify-content-center align-items-center icon_80"
			onClick={toggleTheme}
			style={{ cursor: "pointer" }}
		>
			<i className={`bi theme-icon ${theme === "light" ? "ri-sun-line text-warning" : "ri-contrast-2-line text-white"}`} />
		</div>
	)
}
