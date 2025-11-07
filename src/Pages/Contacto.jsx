import { useI18n } from "../Components/i18nContext";
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";

export default function Contacte() {
  const { translations } = useI18n();

  return (
    <div
      id="contacto"
      className="relative flex flex-col items-center justify-center text-center bg-fixed bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: "url('/d/hab3.jpg')",
      }}
    >
      {/* Overlay oscuro para contraste */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Contenido */}
      <div className="relative z-10 w-full flex flex-col items-center text-white px-4 py-20">
        <h1 className="text-4xl font-bold mb-16 drop-shadow-lg">
          {translations.titles.contact}
        </h1>

        {/* ---- Tarjeta de contacto ---- */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-[90%] sm:w-[500px] flex flex-col items-center border border-white/20">
          {/* Nombre */}
          <p className="text-2xl font-semibold mb-6 text-yellow-300">Alba</p>

          {/* Iconos + info */}
          <ul className="flex flex-col gap-5 text-lg text-gray-100">
            <li className="flex items-center gap-3">
              <MapPinIcon className="h-6 w-6 text-yellow-400" />
              <a
                href="https://maps.app.goo.gl/5RJqMXFDqSaJkfdMA"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300 transition"
              >
                Raval del Sellarês, Cal Masses, s/n  
                <br />
                08253 St. Salvador de Guardiola
              </a>
            </li>
            <li className="flex items-center gap-3">
              <EnvelopeIcon className="h-6 w-6 text-yellow-400" />
              <a
                href="mailto:calmasses@gmail.com"
                className="hover:text-yellow-300 transition"
              >
                calmasses@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <PhoneIcon className="h-6 w-6 text-yellow-400" />
              <a
                href="tel:+34690332521"
                className="hover:text-yellow-300 transition"
              >
                +34 690 332 521
              </a>
            </li>
          </ul>

          {/* ---- Mapa embebido dentro de la tarjeta ---- */}
          <div className="w-full mt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2979.978258593224!2d1.7557528760743542!3d41.67781297126447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDQwJzQwLjEiTiAxwrA0NSczMC4wIkU!5e0!3m2!1ses!2ses!4v1713543105295!5m2!1ses!2ses"
              className="rounded-lg shadow-lg w-full h-64 border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
