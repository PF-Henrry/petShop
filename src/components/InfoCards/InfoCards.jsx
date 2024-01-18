import Image from "next/image";
import Link from "next/link";
import "./InfoCards.css";

export default function InfoCards() {
  const shipping =
    "https://res.cloudinary.com/kimeipetshop/image/upload/v1704005810/Ilustraciones/envios_ubvfeg.png";
  const payments =
    "https://res.cloudinary.com/kimeipetshop/image/upload/v1704005811/Ilustraciones/mediosDePago_gjli54.png";
  const register =
    "https://res.cloudinary.com/kimeipetshop/image/upload/v1704005813/Ilustraciones/registrate_oz8o0v.png";
  return (
    <div className="info-container">
      <div className="cards-info-container">
        <section>
          <div className="card-shipping">
            <Image src={shipping} alt="Envios" width={500} height={300} />
          </div>
          <div className="card-payments">
            <Image
              src={payments}
              alt="Medios de Pago"
              width={500}
              height={300}
            />
          </div>
        </section>
        <div className="relative card-register-container">
          <Image src={register} alt="Registrate" width={1200} height={300} />
          <Link href="/signup">
            <button className="absolute bottom-5 left-14">
              <div className="bg-[#2d638b] duration-200 hover:bg-[#265274] px-4 py-2 rounded text-white">
                Registrate
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
