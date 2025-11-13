import { useEffect, useState } from "react"
import { useI18n } from "./i18nContext"

export function ScrollCTA() {
	const [scrolled, setScrolled] = useState(false)
	const [showTop, setShowTop] = useState(false)
	const { translations } = useI18n()

	useEffect(() => {
		const handleScroll = () => {
			const y = window.scrollY
			setScrolled(y > 30)
			setShowTop(y > 400)
		}
		window.addEventListener("scroll", handleScroll, { passive: true })
		handleScroll()
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<button
			type="button"
			onClick={() => {
				if (showTop) {
					window.scrollTo({ top: 0, behavior: "smooth" })
				} else {
					document
						.getElementById("descripcionID")
						?.scrollIntoView({ behavior: "smooth" })
				}
			}}
			aria-label={showTop ? "Volver arriba" : "Explorar más"}
			className={`fixed right-10 bottom-6 z-50
        inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
        shadow-lg transition-all duration-500 backdrop-blur-md
        ${
					showTop
						? "bg-[#ECB434] text-white hover:brightness-110"
						: "bg-gradient-to-r from-[#ECB434] to-amber-500 text-white hover:brightness-105"
				}
        ${scrolled && !showTop ? "opacity-0 pointer-events-none translate-y-4" : "opacity-100 translate-y-0"}
      `}
		>
			{showTop ? (
				<svg
					className="h-5 w-5"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				>
					<path d="M18 15l-6-6-6 6" />
				</svg>
			) : (
				<>
					<span className="tracking-wide">{translations.scrollcta.exp}</span>
					<svg
						className="h-4 w-4 transition-transform duration-300"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path d="M6 9l6 6 6-6" />
					</svg>
				</>
			)}
		</button>
	)
}
