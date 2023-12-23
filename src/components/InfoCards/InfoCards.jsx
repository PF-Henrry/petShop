import Image from "next/image";
import Link from "next/link";
import shipping from "@/public/assets/envios.png";
import payments from "@/public/assets/mediosDePago.png";
import register from "@/public/assets/registrate.png";
import "./InfoCards.css";

export default function InfoCards() {
  return (
    <div className="infoDiv bg-white p-6 mb-4 shadow-md flex flex-col items-center">
      <div className="flex mb-4">
        <div className="p-1">
          <Image src={shipping} alt="Envios" width={300} height={260} />
        </div>
        <div className="p-1">
          <Image src={payments} alt="Medios de Pago" width={350} height={310} />
        </div>
      </div>
      <div className="relative">
        <Image src={register} alt="Registrate" width={650} height={270} />
        <Link href="/signup">
          <button className="absolute bottom-5 left-14">
            {" "}
            <div className="bg-[#3B7CAC] p-2 rounded text-sm">Registrate</div>
          </button>
        </Link>
      </div>
    </div>
  );
}
