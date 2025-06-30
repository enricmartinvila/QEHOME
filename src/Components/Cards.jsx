import { useEffect, useState } from "react";

export default function Cards({ title, description, type }) {
    const [isClicked, setIsClicked] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    let imgArray = [];
    switch (type) {
        case "caseta":
            imgArray = ["/fotosTargetes/fotosCaseta/SliderHab1.jpg","/fotosTargetes/fotosCaseta/SliderHab3.jpg", "/fotosTargetes/fotosCaseta/SliderLav3.jpg", "/fotosTargetes/fotosCaseta/SliderMen2.jpg", "/fotosTargetes/fotosCaseta/SliderMen4.jpg" ];
            break;
        case "exterior":
            imgArray = ["/fotosTargetes/fotosExterior/SliderExterior1.jpg", "/fotosTargetes/fotosExterior/SliderExterior2.jpg", "/fotosTargetes/fotosExterior/SliderExterior3.jpg", "/fotosTargetes/fotosExterior/SliderExterior4.jpg", "/fotosTargetes/fotosExterior/SliderExterior5.jpg", "/fotosTargetes/fotosExterior/SliderExterior6.jpg", "/fotosTargetes/fotosExterior/SliderExterior7.jpg", "/fotosTargetes/fotosExterior/SliderExterior8.jpg", "/fotosTargetes/fotosExterior/SliderExterior9.jpg", "/fotosTargetes/fotosExterior/SliderBbq1.jpg", "/fotosTargetes/fotosExterior/SliderBbq2.jpg"   ];
            break;
        case "placeta":
            imgArray = ["/fotosTargetes/fotosPlaceta/SliderPlac1.jpg", "/fotosTargetes/fotosPlaceta/SliderPlac2.jpg", "/fotosTargetes/fotosPlaceta/SliderPlac3.jpg", "/fotosTargetes/fotosPlaceta/SliderPlac4.jpg", "/fotosTargetes/fotosPlaceta/SliderPlac5.jpg" ];
            break;
        case "horta":
            imgArray = ["/fotosTargetes/fotosHorta/SliderTerra1.jpg", "/fotosTargetes/fotosHorta/SliderTerra2.jpg", "/fotosTargetes/fotosHorta/SliderTerra3.jpg", "/fotosTargetes/fotosHorta/SliderTerra4.JPG" ];
            break;
        default:
            break;
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imgArray.length);
        }, 4000);
        return () => clearInterval(intervalId);
    }, [imgArray]);

    return (
        <>
            <div className={"w-[270px] h-[420px] border rounded-xl relative overflow-hidden shadow-md cursor-pointer sm:w-[200px] sm:h-[320px] md:w-[250px] md:h-[400px] lg:w-[300px] lg:h-[480px] xl:w-[350px] xl:h-[550px]"}>
                <div className="h-full w-full rounded-xl">
                    <img
                        src={imgArray[currentImageIndex]}	
                        alt="Imagen"
                        onClick={() => setIsClicked(!isClicked)}
                        className="object-cover rounded-lg h-full w-full shadow-md hover:filter hover:grayscale transition-transform duration-600"
                    />
                </div>
                {!isClicked ? (
                    <div className="absolute bottom-0 left-0 right-0 text-center z-10">
                        <div className="bg-black bg-opacity-45">
                            <p className="text-2xl text-white py-2">
                                {title}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="absolute bottom-0 left-0 right-0 text-center z-10">
                        <div className="bg-black bg-opacity-25">
                            <p className="text-2xl text-white py-2">
                                {description}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
