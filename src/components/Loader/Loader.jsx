"use client";
import React from "react";
import Image from "next/image";
import "./loader.css";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-[#fffaf2] z-50">
      <div className="relative text-center">
        <div className="loader">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="http://res.cloudinary.com/kimeipetshop/image/upload/v1705104942/gmu4xxhzr5pty9hr6v2t.png"
              width={120}
              height={120}
              alt="bone"
              className="mx-auto my-auto"
            />
          </div>
        </div>

        <div>
          <h2 className="mt-2 loaderText animate-dots">Cargando...</h2>
        </div>
      </div>
    </div>
  );
};

export default Loader;
