"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import tippy, { followCursor } from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/svg-arrow.css";
import "./carousel.css";

const images = [
  {
    src: "https://res.cloudinary.com/kimeipetshop/image/upload/v1704005815/Ilustraciones/banner__catalogo_fzfky7.png",
    link: "/shop",
  },
  {
    src: "https://res.cloudinary.com/kimeipetshop/image/upload/v1704005814/Ilustraciones/banner_adopciones_g7vjpl.png",
    link: "/",
  },
  {
    src: "https://res.cloudinary.com/kimeipetshop/image/upload/v1704005810/Ilustraciones/banner_pelu_eovkvn.png",
    link: "/",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Verificar si estamos en un entorno de navegador antes de usar tippy
    if (typeof document !== "undefined") {
      tippy("#tooltip-carousel", {
        content: "Ver más",
        followCursor: true,
        plugins: [followCursor],
        arrow: false,
      });
    }

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel-container">
      {/* Boton de navegación izquierda */}
      <div className="carousel-button" id="prev-button">
        <button onClick={goToPrevious}>
          <CaretLeft size={32} weight="bold" />
        </button>
      </div>
      {/* Boton de navegación izquierda end */}

      <section className="carousel-img-container" id="tooltip-carousel">
        <Link href={images[currentIndex].link} passHref>
          <Image
            key={currentIndex}
            src={images[currentIndex].src}
            width={1440}
            height={560}
            alt={`Imagen ${currentIndex + 1}`}
            className="carousel-image"
          />
        </Link>
      </section>

      {/* Boton de navegación derecha */}
      <div className="carousel-button" id="next-button">
        <button onClick={goToNext}>
          <CaretRight size={32} weight="bold" />
        </button>
      </div>
      {/* Boton de navegación derecha end */}

      <div className="carousel-indicators">
        {images.map((_, index) => (
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

export default Carousel;
