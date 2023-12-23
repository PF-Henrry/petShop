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
  { src: "https://i.imgur.com/m696SBy.png", link: "/ruta-1" },
  { src: "https://i.imgur.com/mFesy5s.png", link: "/ruta-2" },
  { src: "https://i.imgur.com/nDpy21j.png", link: "/ruta-3" },
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
            width={1000}
            height={500}
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

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 items-center bg-[rgba(255,250,242,0.5)] rounded-xl p-[6px] backdrop-blur">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full duration-500 ${
              index === currentIndex ? "scale-125 bg-[#143146]" : "bg-[#eee0dd]"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
