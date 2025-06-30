import { useState } from "react";
import { useI18n } from "../Components/i18nContext";

export default function Header() {
  const { translations, handleSelectLanguage } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleChange = (event) => {
    const newLanguage = event.target.value;
    handleSelectLanguage(newLanguage);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <header className="w-full bg-white text-black py-4 flex items-center shadow-md fixed top-0 z-10">
      {/* Logo */}
      <div className="flex items-center ml-5">
        <img
          src="/fotosTargetes/fotosCaseta/logo.webp"
          alt="Logo"
          className={`h-10 w-18 sm:h-12 sm:w-18 scale-150 ${isMenuOpen ? "hidden" : "block"}`}
        />
      </div>

      <div className="mx-auto flex justify-center">
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block transition-transform duration-300 ease-in-out`}
        >
          <ul className="flex justify-between gap-4 2xl:gap-12 flex-col md:flex-row font-bold text-[#556B2F] text-2xl">
            <li>
              <a
                href="#main"
                className='"transition-transform duration-300 ease-in-out transform hover:scale-110'
              >
                {translations.menu.main}
              </a>
            </li>
            <li>
              <a
                href="#descripcionID"
                className='"transition-transform duration-300 ease-in-out transform hover:scale-110'
              >
                {translations.menu.aboutus}
              </a>
            </li>

            <li>
              <a
                href="#espaciosID"
                className='"transition-transform duration-300 ease-in-out transform hover:scale-110'
              >
                {translations.menu.spaces}
              </a>
            </li>
            <li>
              <a
                href="#contacto"
                className='"transition-transform duration-300 ease-in-out transform hover:scale-110'
              >
                {translations.menu.contact}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Selector de idioma y menú hamburguesa */}
      <div className="flex items-center mr-12">
        <select
          className="bg-transparent text-[#556B2F] text-md font-bold rounded-lg py-1 px-1 border-2 border-[#556B2F] shadow-sm cursor-pointer p-2"
          onChange={handleChange}
        >
          <option value="cat">Catalan</option>
          <option value="es">Español 🇪🇸</option>
          <option value="en">English 🇬🇧</option>
        </select>

        {/* Menú hamburguesa */}
        <div className="md:hidden ml-5">
          <button
            className="text-[#556B2F] text-xl focus:outline-none"
            aria-label="Abrir menú"
            onClick={toggleMenu}
          >
            {isMenuOpen ? "✖" : "☰"} {/* Cambia el icono según el estado */}
          </button>
        </div>
      </div>
    </header>
  );
}
