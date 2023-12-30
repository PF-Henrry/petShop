'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const catalogImages = [
  { src: '/assets/banner_catalogo1.jpg' },
  { src: '/assets/banner_catalogo2.jpg' },
  { src: '/assets/banner_catalogo3.jpg' },
 ];

const CatalogCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === catalogImages.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? catalogImages.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === catalogImages.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Image
        key={currentIndex}
        src={catalogImages[currentIndex].src}
        alt={`Imagen ${currentIndex + 1}`}
        width={1200}
        height={400}
        className="object-cover transition-transform duration-500 ease-in-out transform translate-x-0"
      />
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
        {catalogImages.map((_, index) => (
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

export default CatalogCarousel;
