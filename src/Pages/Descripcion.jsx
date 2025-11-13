import { useI18n } from "../Components/i18nContext"
import { useEffect, useState, useRef } from "react"
import { imagesMainPage } from "../constants/mainImagesArray"

export default function Descripcion() {
    const { translations } = useI18n()
    const t = translations || {}
    const title = t?.titles?.aboutus || "Sobre nosaltres"

    const about = t?.aboutustexts || {}
    const intro = about?.intro || ""
    const highlights = about?.highlights || []

    const [i, setI] = useState(0)
    const timer = useRef(null)

    useEffect(() => {
        if (!imagesMainPage?.length) return
        timer.current = setInterval(
            () => setI((p) => (p + 1) % imagesMainPage.length),
            4500
        )
        return () => clearInterval(timer.current)
    }, [])

    return (
        <section
            id="descripcionID"
            className="bg-[#ca9b2c] text-white py-14 md:py-20"
        >
            <div className="mx-auto max-w-6xl px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 md:mb-16">
                    {title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                    {/* Imatge (altura automàtica) */}
                    <div className="md:col-span-7 w-full h-full">
                        <div className="relative w-full overflow-hidden rounded-2xl shadow-xl aspect-[4/3] md:aspect-auto md:h-full">
                            {imagesMainPage?.map((src, idx) => (
                                <img
                                    key={idx}
                                    src={src}
                                    alt={`QEHOME ${idx + 1}`}
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                                        idx === i ? "opacity-100" : "opacity-0"
                                    }`}
                                    loading="lazy"
                                    decoding="async"
                                />
                            ))}
                            {imagesMainPage?.length > 1 && (
                                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                                    {imagesMainPage.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setI(idx)}
                                            aria-label={`Imatge ${idx + 1}`}
                                            className={`h-2.5 w-2.5 rounded-full transition ${
                                                idx === i
                                                    ? "bg-white"
                                                    : "bg-white/50"
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Targeta informativa */}
                    <div className="md:col-span-5">
                        <div className="bg-black/10 rounded-2xl p-6 md:p-8 backdrop-blur-[1px] shadow-xl flex flex-col h-auto">
                            {intro && (
                                <p className="text-white/95 text-lg leading-relaxed mb-5">
                                    {intro}
                                </p>
                            )}

                            {highlights.length > 0 && (
                                <ul className="space-y-3 text-[15px] leading-relaxed mb-6">
                                    {highlights.map((h, idx) => (
                                        <li key={idx} className="flex gap-3">
                                            <span className="mt-2 inline-block h-2 w-2 rounded-full bg-white/85 flex-shrink-0" />
                                            <span>{h}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
