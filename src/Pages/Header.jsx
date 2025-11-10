import { useState, useEffect } from "react";
import { useI18n } from "../Components/i18nContext";

export default function Header() {
  const { translations, handleSelectLanguage } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (event) => {
    handleSelectLanguage(event.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full py-3 flex items-center fixed top-0 transition-all duration-300 z-[999]
        ${
          isScrolled
            ? "bg-gray-100/50 backdrop-blur-md shadow-md"
            : "bg-black/10"
        } 
      `}
    >
      {/* ---- MOBILE: Only logo and Book Now ---- */}
      <div className="flex w-full items-center justify-between sm:hidden px-4">
  <div className="relative h-8 w-24 flex-shrink-0 flex justify-start">
          <img
            src="/logo/logosintexto.webp"
            alt="Logo default"
            className={`absolute inset-0 h-full w-full object-contain transition-all duration-500 ease-in-out ${
              isScrolled ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
            style={{ cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
          <img
            src="/logo/logoshort.webp"
            alt="Logo scrolled"
            className={`absolute inset-0 h-full w-full object-contain transition-all duration-500 ease-in-out ${
              isScrolled ? "opacity-100 scale-125" : "opacity-0 scale-95"
            }`}
            style={{ cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        </div>
        <button
          className="text-white bg-[#ECB434] px-3 py-1 rounded-full text-base font-semibold"
          style={{ minWidth: 90 }}
          onClick={() => {
            const contactSection = document.getElementById('contacto');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          {translations.titles.book_now}
        </button>
      </div>

      {/* ---- DESKTOP: Full header ---- */}
  <div className="hidden sm:flex w-full items-center relative">
        {/* ---- MENU ---- */}
        <div className="flex items-center ml-12 relative">
          <button
            onClick={toggleDropdown}
            className="text-[#ECB434] font-bold text-2xl hover:text-[#c79525] focus:outline-none"
          >
            Menu
          </button>

          {isDropdownOpen && (
            <div className="absolute top-10 left-0 bg-white shadow-lg rounded-lg py-2 w-48 z-20">
              <a
                href="#main"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                {translations.menu.main}
              </a>
              <a
                href="#descripcionID"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                {translations.menu.aboutus}
              </a>
              <a
                href="#contacto"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                {translations.menu.contact}
              </a>
            </div>
          )}
        </div>

        {/* ---- LOGO ---- */}
  <div className="mx-auto flex justify-center h-8 w-28 sm:h-16 sm:w-40 lg:h-16 lg:w-32 transition-all duration-500">
          <img
            src="/logo/logosintexto.webp"
            alt="Logo default"
            className={`absolute inset-0 h-full w-full object-contain transition-all duration-500 ease-in-out ${
              isScrolled ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
            style={{ cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
          <img
            src="/logo/logoshort.webp"
            alt="Logo scrolled"
            className={`absolute inset-0 h-full w-full object-contain transition-all duration-500 ease-in-out ${
              isScrolled ? "opacity-100 scale-125" : "opacity-0 scale-95"
            }`}
            style={{ cursor: 'pointer' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        </div>

        {/* ---- SELECTOR IDIOMA + ICONO ---- */}
        <div className="flex items-center mr-12">
          <button
            className="text-white bg-[#ECB434] px-4 py-1 rounded-full text-2xl"
            onClick={() => {
              const contactSection = document.getElementById('contacto');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {translations.titles.book_now}
          </button>
        </div>
      </div>
    </header>
  );
}
