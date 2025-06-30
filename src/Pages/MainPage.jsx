import { useI18n } from "../Components/i18nContext";

export default function MainPage() {
    const { translations } = useI18n();

    return (
        <>
            <div id="main" className="mb-20 sm:pt-10 relative">
                <div className="text-center font-bold relative">
                    <div className="w-full relative">
                        <img 
                            src="/fotosTargetes/fotosBBQ/fotosReplace.jpg" 
                            alt="" 
                            className="object-cover w-full h-[30vh] md:h-[90vh] xl:h-[100vh]" 
                        />
                        <h1 
                            className="text-2xl md:text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
                        >
                            {translations.maintexts.text}
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
}
