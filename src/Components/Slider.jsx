import { useState } from 'react';

export default function Slider() {
  const images = ["slider.png","slider.png","slider.png", "slider.png", "slider.png", "slider.png" ];
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrevClick = () => {
    setCurrentImage((prevImage) => (prevImage === 0 ? images.length - 1 : prevImage - 1));
  };

  const handleNextClick = () => {
    setCurrentImage((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1));
  };

  return (
    <>
      <link rel="stylesheet" />
      <div >
        <div className={styles.slider__contenedor__imagenes}>
          <img
            src={`/fotosSlider/${images[currentImage]}`}
            alt={`Imagen ${currentImage}`}
            className={styles.slider__imagen__visible}
          />
        </div>
        <div className={styles.slider__botones}>
          <div className={styles.slider__boton__izquierda} onClick={handlePrevClick}>
            <img src="./svgs/arr2.svg" alt="Flecha izquierda" className={styles.slider__boton_imagen}/>
          </div>
          <div className={styles.slider__boton__derecha} onClick={handleNextClick}>
            <img src="./svgs/arr1.svg" alt="Flecha derecha" className={styles.slider__boton_imagen}/>
          </div>
        </div>
      </div>
    </>
  );
}