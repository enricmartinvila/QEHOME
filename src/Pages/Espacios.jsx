import React from 'react';
import Cards from '../Components/Cards';
import { useI18n } from "../Components/i18nContext";

export default function Espacios() {
    const { translations } = useI18n();

    const espaciosData = [
        { title: 'Exterior', description: 'Descripción del exterior', type: 'exterior' },
        { title: 'Caseta', description: 'Habitación con cama de matrimonio', type: 'caseta' },
        { title: 'Placeta', description: 'Habitación con cama de matrimonio', type: 'placeta' },
        { title: 'Horta', description: 'Habitación con cama de matrimonio', type: 'horta' },
        // Agrega más objetos según sea necesario para otros espacios
    ];

    return (
        <>
            <div id='espaciosID' className="text-center mx-auto">
                <h1 className="text-4xl font-bold my-24">{translations.titles.spaces}</h1>
                <div className='grid m-8 gap-4 grid-cols-1 justify-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {espaciosData.map((espacio, index) => (
                        <div key={index} className="flex justify-center">
                            <Cards
                                title={espacio.title}
                                description={espacio.description}
                                type={espacio.type}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
