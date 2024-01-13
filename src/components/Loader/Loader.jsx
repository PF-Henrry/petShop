'use client'
import React from 'react';
import Image from 'next/image';
import './loader.css'; 

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center relative">
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
        <h2 className="loaderText mt-2 animate-dots">Cargando...</h2>
        </div>
       
      </div>
    </div>
  );
};

export default Loader;



