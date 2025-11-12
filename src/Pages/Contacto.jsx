import { AirbnbIcon } from "../assets/icons/airbnb_icon";
import { BookingIcon } from "../assets/icons/booking_icon";
import { useI18n } from "../Components/i18nContext";
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";

export default function Contacte() {
  const { translations } = useI18n();

  return (
    <div
      id="contacto"
      className="relative flex flex-col items-center justify-center text-center bg-fixed bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: "url('/images/hab3.webp')",
      }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Contenido */}
      <div className="relative z-10 w-full flex flex-col items-center text-white px-4 py-20">
        <h1 className="text-4xl font-bold mb-16 drop-shadow-lg">
          {translations.titles.contact}
        </h1>

        {/* Contenedor de tarjetas */}
        <div className="flex flex-col sm:flex-row gap-10 justify-center items-stretch flex-wrap w-full">
          {/* ---- Tarjeta Quico & Enric ---- */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full sm:w-[420px] flex flex-col items-center border border-white/20">
            <p className="text-2xl font-semibold mb-6 text-yellow-300">
              Quico
            </p>

           <ul className="flex flex-col gap-5 text-lg text-gray-100">
  <li className="flex items-center gap-3">
    <MapPinIcon className="h-6 w-6 text-yellow-400 self-start mt-1" />
    <a
      href="https://www.google.com/maps/place/Carrer+dels+Doctor+Esteve,+9,+08242+Manresa,+Barcelona"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-yellow-300 transition"
    >
      Carrer Doctor Esteve 9, Manresa
    </a>
  </li>

  <li className="flex items-center gap-3">
    <EnvelopeIcon className="h-6 w-6 text-yellow-400" />
    <a
      href="mailto:silos1968@gmail.com"
      className="hover:text-yellow-300 transition"
    >
      silos1968@gmail.com
    </a>
  </li>

  <li className="flex items-center gap-3">
    <PhoneIcon className="h-6 w-6 text-yellow-400" />
    <a
      href="tel:+34640955572"
      className="hover:text-yellow-300 transition"
    >
      640 95 55 72
    </a>
  </li>

  {/* 🔹 Nuevo: WhatsApp con el mismo estilo */}
  <li className="flex items-center gap-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6 text-yellow-400"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.149-.67.15-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.654-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.521.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.204-.242-.58-.487-.5-.67-.51l-.57-.01c-.198 0-.521.074-.794.372s-1.04 1.016-1.04 2.48 1.064 2.876 1.213 3.074c.149.198 2.095 3.2 5.08 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M20.52 3.48A11.9 11.9 0 0 0 12 0C5.372 0 0 5.372 0 12c0 2.11.553 4.163 1.6 5.977L0 24l6.204-1.588A11.89 11.89 0 0 0 12 24c6.627 0 12-5.373 12-12 0-3.192-1.248-6.19-3.48-8.52zM12 21.8a9.76 9.76 0 0 1-4.992-1.367l-.357-.211-3.682.942.983-3.583-.232-.368A9.77 9.77 0 0 1 2.2 12c0-5.408 4.392-9.8 9.8-9.8 2.62 0 5.085 1.02 6.942 2.877A9.72 9.72 0 0 1 21.8 12c0 5.408-4.392 9.8-9.8 9.8z" />
    </svg>
    <a
      href="https://wa.me/34640955572?text=Hola%2C%20quisiera%20más%20información%20sobre%20el%20apartamento."
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-yellow-300 transition"
    >
      WhatsApp
    </a>
  </li>
</ul>
          </div>

          {/* ---- Tarjeta Check availability ---- */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full sm:w-[420px] flex flex-col items-center border border-white/20">
            <p className="text-2xl font-semibold mb-6 text-yellow-300">
              {translations.contacto.check}
            </p>

            {/* ---- Botones de reserva ---- */}
            <div className="w-full flex flex-col gap-4">
              {/* Botón Booking.com */}
              <a
                href="https://www.booking.com/hotel/es/qehome-confort-y-parquing-en-el-centro-de-manresa.es.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full rounded-full bg-blue-600/90 hover:bg-blue-500 text-white font-semibold py-3 px-5 shadow-lg shadow-black/40 transition transform hover:-translate-y-0.5"
              >
                <BookingIcon className="h-6 w-6 text-white" />
                <span>Booking</span>
              </a>

              {/* Botón Airbnb */}
              <a
                href="https://www.airbnb.es/rooms/1292748522071548966"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full rounded-full bg-[#FF5A5F]/90 hover:bg-[#FF7A7F] text-white font-semibold py-3 px-5 shadow-lg shadow-black/40 transition transform hover:-translate-y-0.5"
              >
                <AirbnbIcon className="h-6 w-6 text-white" />
                <span>Airbnb</span>
              </a>

              {/* Botón reserva directa */}
              <a
                href="#reserva"
                className="inline-flex items-center justify-center gap-3 w-full rounded-full bg-yellow-400/90 hover:bg-yellow-300 text-black font-semibold py-3 px-5 shadow-lg shadow-black/40 transition transform hover:-translate-y-0.5"
              >
                <span>{translations.contacto.ask_for}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}