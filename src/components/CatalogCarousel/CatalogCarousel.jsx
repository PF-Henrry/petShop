"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import tippy, { followCursor } from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/svg-arrow.css";
import "./CarouselCatalog.css";

const catalogImages = [
  {
    src: "https://res.cloudinary.com/kimeipetshop/image/upload/v1704005814/banner_catalogo1_oy4inh.jpg",
  },
  {
    src: "https://res.cloudinary.com/kimeipetshop/image/upload/v1704005814/banner_catalogo2_axyayr.jpg",
  },
  {
    src: "https://res.cloudinary.com/kimeipetshop/image/upload/v1704005810/banner_catalogo3_tzpuew.png",
  },
];

const CatalogCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Verificar si estamos en un entorno de navegador antes de usar tippy
    // if (typeof document !== "undefined") {
    //   tippy("#tooltip-carousel", {
    //     content: "Ver más",
    //     followCursor: true,
    //     plugins: [followCursor],
    //     arrow: false,
    //   });
    // }

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === catalogImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? catalogImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === catalogImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel-container-catalog">
      {/* Boton de navegación izquierda */}
      <div className="carousel-button" id="prev-button">
        <button onClick={goToPrevious}>
          <CaretLeft size={32} weight="bold" />
        </button>
      </div>
      {/* Boton de navegación izquierda end */}

      <section className="carousel-img-container" id="tooltip-carousel">
        <Image
          key={currentIndex}
          src={catalogImages[currentIndex].src}
          width={1440}
          height={560}
          alt={`Imagen ${currentIndex + 1}`}
          className="carousel-image"
        />
      </section>

      {/* Boton de navegación derecha */}
      <div className="carousel-button" id="next-button">
        <button onClick={goToNext}>
          <CaretRight size={32} weight="bold" />
        </button>
      </div>
      {/* Boton de navegación derecha end */}

      <div className="carousel-indicators">
        {catalogImages.map((_, index) => (
          <figure
            key={index}
            className={`carousel-indicator ${
              index === currentIndex
                ? "indicator-active scale-125 bg-[#143146]"
                : "bg-[#eee0dd]"
            }`}
          ></figure>
        ))}
      </div>
    </div>
  );
};

export default CatalogCarousel;
