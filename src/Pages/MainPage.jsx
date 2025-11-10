import { useI18n } from "../Components/i18nContext";

export default function MainPage() {
    const { translations } = useI18n();
  
  return (
    <div>
      <section
        className="h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-white"
        style={{ backgroundImage: `url(${"/d/menjador12.jpg"})` }}
      >
        <h1 className="text-6xl font-bold drop-shadow-lg">{translations.maintexts.text}</h1>
        <p className="text-xl mt-4 drop-shadow-md">{translations.maintexts.disfruta}</p>
      </section>    
    </div>
  );
}
