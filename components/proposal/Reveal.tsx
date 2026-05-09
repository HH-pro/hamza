'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface RevealProps {
	children: ReactNode
	delay?: number
	className?: string
	variant?: 'up' | 'left' | 'right' | 'scale' | 'fade'
}

export default function Reveal({ children, delay = 0, className = '', variant = 'up' }: RevealProps) {
	const ref = useRef<HTMLDivElement>(null)
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const el = ref.current
		if (!el) return

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setVisible(true)
						observer.unobserve(entry.target)
					}
				})
			},
			{ threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
		)

		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	return (
		<div
			ref={ref}
			className={`reveal reveal-${variant} ${visible ? 'in-view' : ''} ${className}`.trim()}
			style={{ transitionDelay: `${delay}ms` }}
		>
			{children}
		</div>
	)
}
