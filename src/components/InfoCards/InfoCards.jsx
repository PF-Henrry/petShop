import Image from "next/image";
import Link from "next/link";
import shipping from "@/public/assets/envios.png";
import payments from "@/public/assets/mediosDePago.png";
import register from "@/public/assets/registrate.png";
import "./InfoCards.css";

export default function InfoCards() {
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
        <div className="card-register-container relative">
          <Image src={register} alt="Registrate" width={1200} height={300} />
          <Link href="/signup">
            <button className="absolute bottom-5 left-14">
              <div className="bg-[#3B7CAC] p-2 rounded text-sm">Registrate</div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
