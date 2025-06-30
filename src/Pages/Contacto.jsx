import { useI18n } from "../Components/i18nContext";
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";

export default function Contacte() {
  const { translations } = useI18n();

  return (
    <div
      id="contacto"
      className="flex-col items-center justify-center text-center"
    >
      <h1 className="text-3xl m-5 font-bold my-24">
        {translations.titles.contact}
      </h1>
      <div className="flex items-center justify-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2979.978258593224!2d1.7557528760743542!3d41.67781297126447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDQwJzQwLjEiTiAxwrA0NSczMC4wIkU!5e0!3m2!1ses!2ses!4v1713543105295!5m2!1ses!2ses"
          style={{ width: "80%", height: "500px" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="flex-color w-full h-44 items-center justify-center text-center p-6">
        <p className="text-xl font-bold my-3">Alba</p>
        <div className="flex justify-center">
          <ul className="flex flex-col items-center justify-center md:items-start">
            <li className="flex items-center my-2 gap-2">
              <MapPinIcon className="h-6 w-6" />
              <span>
                <a
                  href="https://maps.app.goo.gl/5RJqMXFDqSaJkfdMA"
                  className="font-bold"
                >
                  Raval del Sellarês, Cal Masses, s/n 08253-St. Salvador de
                  Guardiola
                </a>
              </span>
            </li>
            <li className="flex items-center justify-start my-2 gap-2">
              <EnvelopeIcon className="h-6 w-6" />
              <a
                className="cursor-pointer font-semibold"
                href="mailto:calmasses@gmail.com"
              >
                calmasses@gmail.com
              </a>
            </li>
            <li className="flex items-center justify-start my-2 gap-2">
              <PhoneIcon className="h-5 w-5" />
              <a
                className="cursor-pointer font-semibold"
                href="tel:calmasses@gmail.com"
              >
                {" "}
                +34 690332521
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
