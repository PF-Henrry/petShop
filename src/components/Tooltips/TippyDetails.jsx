import Image from "next/image";
import "./TippyDetails.css";
import { Storefront, Truck } from "@phosphor-icons/react/dist/ssr";

function TippyDetailsPayment() {
  return (
    <div className="payment-options">
      <p>Paga con:</p>
      <div className="payment-option">
        <figure>
          <Image
            src="https://res.cloudinary.com/kimeipetshop/image/upload/v1704005811/mp_ch7xhz.png"
            width={48}
            height={48}
            alt="MP logo"
            className="payment-logo"
          />
        </figure>
        <p>Mercado Pago</p>
      </div>
      <div className="payment-option">
        <figure>
          <Image
            src="https://res.cloudinary.com/kimeipetshop/image/upload/v1704005813/tarjeta_c7ggiu.png"
            width={48}
            height={48}
            alt="Card logo"
            className="payment-logo"
          />
        </figure>
        <p>Tarjeta</p>
      </div>
      <div className="payment-option">
        <figure>
          <Image
            src="https://res.cloudinary.com/kimeipetshop/image/upload/v1704005809/efectivo_ocm3j7.png"
            width={48}
            height={48}
            alt="Cash logo"
            className="payment-logo"
          />
        </figure>
        <p>Efectivo</p>
      </div>
    </div>
  );
}

function TippyDetailsPickup() {
  return (
    <div className="payment-options">
      <p>Recibe tu compra con:</p>
      <div className="payment-option">
        <figure>
          <Truck size={48} weight="fill" className="icon-pickup" />
        </figure>
        <p>Envio</p>
      </div>
      <div className="payment-option">
        <figure>
          <Storefront size={48} weight="fill" className="icon-pickup" />
        </figure>
        <p>Retiro en sucursal</p>
      </div>
    </div>
  );
}

export { TippyDetailsPayment, TippyDetailsPickup };
