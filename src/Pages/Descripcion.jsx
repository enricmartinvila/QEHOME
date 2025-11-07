import { useI18n } from "../Components/i18nContext";
import { useState, useEffect } from "react";
import { imagesMainPage } from "../constants/mainImagesArray";

export default function Descripcion() {
  const { translations } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- Carrusel automático ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imagesMainPage.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="descripcionID"
      className="text-center mx-auto px-4 py-20 bg-[#ca9b2c] text-white"
    >
      <h1 className="text-4xl font-bold mb-24">
        {translations.titles.aboutus}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center m-4 sm:m-20">
        {/* ---- Texto ---- */}
        <div className="md:order-2 text-left">
          <p className="text-3xl font-bold mb-24 text-center my-auto">
            {translations.aboutustexts.titleinside}
          </p>
          <p className="text-xl mx-4 mb-6">
            {translations.aboutustexts.firstText}
          </p>
          <p className="text-xl mx-4 mb-6">
            {translations.aboutustexts.secondText}
          </p>
          <p className="text-xl mx-4 mb-6">
            {translations.aboutustexts.thirdText}
          </p>
          <p className="text-xl mx-4 mb-6">
            {translations.aboutustexts.fourthText}
          </p>
        </div>

        {/* ---- Carrusel ---- */}
        <div className="relative md:order-1 w-full md:w-[85%] mx-auto overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
          {imagesMainPage.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* ---- Indicadores ---- */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {imagesMainPage.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white scale-110"
                    : "bg-gray-400/60"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
