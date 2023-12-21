import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const images = [
  { src: 'images/assets/banner_catalogo.png', link: '/ruta-1' },
  { src: 'images/assets/banner_adopciones.png', link: '/ruta-2' },
  { src: '/images/assets/banner_pelu.png', link: '/ruta-3' }
  ];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full overflow-hidden">
      <img
        key={currentIndex}
        src={images[currentIndex].src}
        alt={`Imagen ${currentIndex + 1}`}
        className="w-full h-[350px] object-cover transition-transform duration-500 ease-in-out transform translate-x-0"
      />
      <div className="absolute top-3/4 left-1/4 transform -translate-x-1/2">
        <Link href={images[currentIndex].link} passHref>
          <button className="bg-purple-700 text-white px-10 py-5 rounded-md shadow-lg bg-opacity-90 text-opacity-100">
            <span>Ver Detalles</span>
          </button>
        </Link>
      </div>
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <button
          onClick={goToPrevious}
          className="text-white text-4xl p-4 focus:outline-none z-10"
        >
          &#8249;
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <button
          onClick={goToNext}
          className="text-white text-4xl p-4 focus:outline-none z-10"
        >
          &#8250;
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-4 w-4 rounded-full bg-gray-300 ${
              index === currentIndex ? 'bg-gray-700' : 'bg-gray-400'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;