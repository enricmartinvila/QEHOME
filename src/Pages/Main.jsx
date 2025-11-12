import { useI18n } from "../Components/i18nContext";
import { ScrollCTA } from "../Components/ScrollCTA";

export default function MainPage() {
    const { translations } = useI18n();
  
  return (
    <div>
      <section
        className="h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-white"
        style={{ backgroundImage: `url(${"/images/menjador12.webp"})` }}
      >
      <h1 className="text-6xl font-bold drop-shadow-lg text-center z-[999]">{translations.maintexts.text}</h1>
      <p className="text-xl mt-4 drop-shadow-md text-center">{translations.maintexts.disfruta}</p>
      <ScrollCTA />
      </section>
    </div>
  );
}
