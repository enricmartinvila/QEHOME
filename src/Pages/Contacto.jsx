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
                  href="https://www.google.com/maps/place/Carrer+dels+Doctor+Esteve,+9,+08242+Manresa,+Barcelona/@41.7321756,1.8221344,642m/data=!3m2!1e3!4b1!4m6!3m5!1s0x12a4580e89667183:0x4602d658f740760c!8m2!3d41.7321716!4d1.8247093!16s%2Fg%2F11c1_g_k13?entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-300 transition"
                >
                  Carrer Doctor Esteve 9, 1r 2a<br />08242 Manresa
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
            </ul>
          </div>

          {/* ---- Tarjeta Check availability ---- */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full sm:w-[420px] flex flex-col items-center border border-white/20">
            <p className="text-2xl font-semibold mb-6 text-yellow-300">
              Check for availability!
            </p>

            {/* ---- Botones de reserva ---- */}
            <div className="w-full flex flex-col gap-4">
              {/* Botón Booking.com */}
              <a
                href="https://www.booking.com/hotel/es/qehome-confort-y-parquing-en-el-centro-de-manresa.es.html" // TODO: pon aquí tu enlace real
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full rounded-full bg-blue-600/90 hover:bg-blue-500 text-white font-semibold py-3 px-5 shadow-lg shadow-black/40 transition transform hover:-translate-y-0.5"
              >
                {/* <img
                  src="/icons/booking.svg"
                  alt="Booking.com"
                  className="h-6 w-6"
                /> */}
                <BookingIcon className="h-6 w-6 text-white" />
                <span>Booking</span>
              </a>

              {/* Botón Airbnb */}
              <a
                href="https://www.airbnb.es/rooms/1292748522071548966?check_in=2025-12-08&check_out=2025-12-13&guests=1&adults=1&s=67&unique_share_id=b6b9d7b4-1f01-4b86-a168-28586f98d015" // TODO: pon aquí tu enlace real
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full rounded-full bg-[#FF5A5F]/90 hover:bg-[#FF7A7F] text-white font-semibold py-3 px-5 shadow-lg shadow-black/40 transition transform hover:-translate-y-0.5"
              >
               <AirbnbIcon className="h-6 w-6 text-white" />
                <span>Airbnb</span>
              </a>

              {/* Botón reserva directa / web propia */}
              <a
                href="#reserva" // o una URL externa a tu motor de reservas
                className="inline-flex items-center justify-center gap-3 w-full rounded-full bg-yellow-400/90 hover:bg-yellow-300 text-black font-semibold py-3 px-5 shadow-lg shadow-black/40 transition transform hover:-translate-y-0.5"
              >
                {/* Si quieres, aquí puedes poner un icono de calendario propio */}
                <span>{translations.contacto.ask_for}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}