import React from "react";
import { Storefront, Truck } from "@phosphor-icons/react";
import Image from "next/image";
import MP from "@/public/assets/mp.png";
import Card from "@/public/assets/tarjeta.png";
import Cash from "@/public/assets/efectivo.png";

const InfoSection = () => {
  return (
    <div className="flex gap-8 border-b pb-8 mb-8 border-slate-400">
      <div className="border-r pr-8  border-slate-400">
        <p className="mb-4">Todos los medios de pago:</p>
 
        <div className="flex items-center justify-center  gap-4">
          <Image
            src={MP}
            alt="MP logo"
            className="w-10 h-9 border border-slate-400 p-1 "
          />
          <Image
            src={Card}
            alt="Card logo"
            className="w-10 h-9 border border-slate-400 p-1 "
          />
          <Image
            src={Cash}
            alt="Cash logo"
            className="w-10 h-9 border border-slate-400 p-1"
          />
        </div>
      </div>

      <div className=" border-r pr-8  border-slate-400">
        <div className="flex items-center gap-2">
          <Storefront size={48} />
          <div>
            <p>Retiro gratis en nuestra sucursal </p>
            <p>de lunes a sábados de 9 a 21hs</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <Truck size={48} />
          <div>
            <p>Envío gratis en el día</p>
            <p>de lunes a sábados de 9 a 21hs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
