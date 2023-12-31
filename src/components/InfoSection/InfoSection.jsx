import React from "react";
import { Storefront, Truck } from "@phosphor-icons/react";
import Image from "next/image";
import MP from "@/public/assets/mp.png";
import Card from "@/public/assets/tarjeta.png";
import Cash from "@/public/assets/efectivo.png";
import "./InfoSection.css";

const InfoSection = () => {
  return (
    <div className="info-section-container">
      <div className="payment-container">
        <p className="payment-title">Todos los medios de pago:</p>
        <div className="flex items-center justify-center gap-4">
          <Image src={MP} alt="MP logo" className="payment-logo" />
          <Image src={Card} alt="Card logo" className="payment-logo" />
          <Image src={Cash} alt="Cash logo" className="payment-logo" />
        </div>
      </div>

      <div className="pickup-container">
        <Storefront size={48} className="icon-info" />
        <div>
          <p>Retiro gratis en nuestra sucursal </p>
          <p>de lunes a sábados de 9 a 21hs</p>
        </div>
      </div>

      <div className="delivery-container">
        <Truck size={48} className="icon-info" />
        <div>
          <p>Envío gratis en el día</p>
          <p>de lunes a sábados de 9 a 21hs</p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
