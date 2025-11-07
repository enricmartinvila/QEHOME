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
      className={`w-full py-3 flex items-center fixed top-0 z-10 transition-all duration-300 
        ${
          isScrolled
            ? "bg-gray-100/50 backdrop-blur-md shadow-md"
            : "bg-black/10"
        } 
      `}
    >
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
              href="#espaciosID"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsDropdownOpen(false)}
            >
              {translations.menu.spaces}
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
      {/* ---- LOGO ---- */}
      <div className="mx-auto flex justify-center relative h-10 w-36 sm:h-24 sm:w-60 lg:h-20 lg:w-48 transition-all duration-500">
        {/* Original logo */}
        <img
          src="/logo/logosintexto.webp"
          alt="Logo default"
          className={`absolute inset-0 h-full w-full object-contain transition-all duration-500 ease-in-out ${
            isScrolled ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        />

        {/* Scrolled logo */}
        <img
          src="/logo/wewwe.webp"
          alt="Logo scrolled"
          className={`absolute inset-0 h-full w-full object-contain transition-all duration-500 ease-in-out ${
            isScrolled ? "opacity-100 scale-125" : "opacity-0 scale-95"
          }`}
        />
      </div>

      {/* ---- SELECTOR IDIOMA + ICONO ---- */}
      <div className="flex items-center mr-12">
        {/* <select
          className="bg-transparent text-[#ECB434] text-lg font-bold rounded-lg border-2 border-[#ECB434] shadow-sm cursor-pointer p-5 py-2"
          onChange={handleChange}
        >
          <option value="cat">Catalan</option>
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>

        <div className="md:hidden ml-5">
          <button
            className="text-[#ECB434] text-xl focus:outline-none"
            aria-label="Abrir menú"
            onClick={toggleMenu}
          >
            {isMenuOpen ? "✖" : "☰"}
          </button>
        </div> */}
        <button className="text-white bg-[#ECB434] px-4 py-1 rounded-full text-2xl">
            Book Now
        </button>
      </div>
    </header>
  );
}
