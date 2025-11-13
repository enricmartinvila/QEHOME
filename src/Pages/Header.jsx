import { useState, useEffect } from "react"
import { useI18n } from "../Components/i18nContext"
import { WhatsappIcon } from "../assets/icons/whatsapp_icon"

export default function Header() {
	const { translations } = useI18n()
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const onScroll = () => setIsScrolled(window.scrollY > 10)
		window.addEventListener("scroll", onScroll, { passive: true })
		onScroll()
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	const whatsappUrl =
		"https://wa.me/34640955572?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20apartamento."

	return (
		<header
			className={`w-full py-3 flex items-center fixed top-0 transition-all duration-300 z-[999]
        ${isScrolled ? "bg-black/10 backdrop-blur-md shadow-md" : "bg-black/10"}
      `}
		>
			{/* ---- MOBILE ---- */}
			<div className="flex w-full items-center justify-between sm:hidden px-4">
				<div className="relative h-8 w-24 flex-shrink-0">
					<img
						src="/logo/logosintexto.webp"
						alt="Logo default"
						className={`absolute inset-0 h-full w-full object-contain transition-all duration-500 ease-in-out pointer-events-none
              ${isScrolled ? "opacity-0 scale-95" : "opacity-100 scale-100"}
            `}
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						style={{ cursor: "pointer" }}
					/>
					<img
						src="/logo/logoshort.webp"
						alt="Logo scrolled"
						className={`absolute inset-0 h-full w-full object-contain transition-all duration-500 ease-in-out pointer-events-none
              ${isScrolled ? "opacity-100 scale-150" : "opacity-0 scale-95"}
            `}
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						style={{ cursor: "pointer" }}
					/>
				</div>

				<button
					className={
						"px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECB434]/60 bg-[#ECB434] text-white hover:bg-[#d3a32e]"
					}
					style={{ minWidth: 90 }}
					onClick={() => {
						const contactSection = document.getElementById("contacto")
						if (contactSection)
							contactSection.scrollIntoView({
								behavior: "smooth",
							})
					}}
				>
					{translations.titles.book_now}
				</button>
			</div>

			{/* ---- DESKTOP ---- */}
			<div className="hidden sm:grid w-full grid-cols-[1fr_auto_1fr] items-center px-0 relative">
				<div />

				{/* LOGO CENTRO */}
				<div className="relative justify-self-center h-8 w-28 sm:h-16 sm:w-40 lg:h-12 lg:w-32 transition-all duration-500">
					<img
						src="/logo/logosintexto.webp"
						alt="Logo default"
						className={`absolute inset-0 h-full w-full object-contain transition-all duration-500 ease-in-out pointer-events-none
              ${isScrolled ? "opacity-0 scale-95" : "opacity-100 scale-100"}
            `}
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						style={{ cursor: "pointer" }}
					/>
					<img
						src="/logo/logoshort.webp"
						alt="Logo scrolled"
						className={`absolute inset-0 h-full w-full object-contain transition-all duration-500 ease-in-out pointer-events-none
              ${isScrolled ? "opacity-100 scale-150" : "opacity-0 scale-95"}
            `}
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						style={{ cursor: "pointer" }}
					/>
				</div>

				{/* ACCIONES DERECHA */}
				<div className="flex items-center justify-self-end mr-12 z-10">
					<a
						className="font-light px-4 py-1 rounded-full w-fit text-lg ml-4 flex gap-2 items-center transition-colors text-white hover:bg-[#ECB434]"
						href={whatsappUrl}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Abrir WhatsApp"
					>
						<WhatsappIcon className="h-6 w-6" />
						{translations.titles.whats}
					</a>

					<button
						className="ml-3 px-4 py-1 rounded-full text-lg font-light transition-all duration-300 text-white bg-[#ECB434] hover:bg-[#d3a32e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECB434]/60"
						onClick={() => {
							const contactSection = document.getElementById("contacto")
							if (contactSection)
								contactSection.scrollIntoView({
									behavior: "smooth",
								})
						}}
					>
						{translations.titles.book_now}
					</button>
				</div>
			</div>
		</header>
	)
}
