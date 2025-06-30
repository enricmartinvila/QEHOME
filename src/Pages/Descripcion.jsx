import { useI18n } from "../Components/i18nContext";

export default function Descripcion() {
  const { translations } = useI18n();

  return (
    <>
      <div id="descripcionID" className="text-center mx-auto px-4">
        <h1 className="text-4xl font-bold mb-24">{translations.titles.aboutus}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center m-4 sm:m-20">
          <div className="md:order-2 text-left">
            <p className="text-3xl font-bold mb-24 items-start text-center my-auto">
              {translations.aboutustexts.titleinside}
            </p>
            <p className="text-xl mx-4 mb-6">{translations.aboutustexts.firstText}</p>
            <p className="text-xl mx-4 mb-6">{translations.aboutustexts.secondText}</p>
            <p className="text-xl mx-4 mb-6">{translations.aboutustexts.thirdText}</p>
            <p className="text-xl mx-4 mb-6">{translations.aboutustexts.fourthText}</p>
          </div>

          {/* Imagen con ajuste responsivo */}
          <img
            src="/fotos/SliderViny2.jpg"
            alt=""
            className=" rounded-md md:order-1 w-9/10 sm:w-full md:w-[85%] md:h-max md:max-w-[35vw] sm:h-20"
          />
        </div>
      </div>
    </>
  );
}
