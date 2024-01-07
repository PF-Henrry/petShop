import React from "react";
import { Storefront, Truck } from "@phosphor-icons/react";
import Image from "next/image";
import "./InfoSection.css";

const InfoSection = () => {
  return (
    <div className="info-section-container">
      <div className="payment-container">
        <p className="payment-title">Todos los medios de pago:</p>
        <div className="flex items-center justify-center gap-4">
          <Image
            src="https://res.cloudinary.com/kimeipetshop/image/upload/v1704005811/mp_ch7xhz.png"
            width={48}
            height={48}
            alt="MP logo"
            className="payment-logo"
          />
          <Image
            src="https://res.cloudinary.com/kimeipetshop/image/upload/v1704005813/tarjeta_c7ggiu.png"
            width={48}
            height={48}
            alt="Card logo"
            className="payment-logo"
          />
          <Image
            src="https://res.cloudinary.com/kimeipetshop/image/upload/v1704005809/efectivo_ocm3j7.png"
            width={48}
            height={48}
            alt="Cash logo"
            className="payment-logo"
          />
        </div>
      </div>

      <div className="pickup-container">
        <Storefront size={10} className="icon-info" />
        <div>
          <p>Retiro gratis en nuestra sucursal </p>
          <p>de lunes a sábados de 9 a 21hs</p>
        </div>
      </div>

      <div className="delivery-container">
        <Truck size={10} className="icon-info" />
        <div>
          <p>Envío gratis en el día</p>
          <p>de lunes a sábados de 9 a 21hs</p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
