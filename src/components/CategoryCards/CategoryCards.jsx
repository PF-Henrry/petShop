import Image from "next/image";
import accCategory from "@/public/assets/LandingCategoria1.png";
import foodCategory from "@/public/assets/LandingCategoria2.png";
import hygCategory from "@/public/assets/LandingCategoria3.png";
import healthCategory from "@/public/assets/LandingCategoria4.png";

import "./CategoryCards.css";

export default function CategoryCards() {
  return (
    <div className="categoryDiv flex flex-col">
      <p className="flex mb-4 text-[#7A8D9B] text-xs">
        {" "}
        Comprar por categoría{" "}
      </p>
      {/* bg-blue-200 p-4 */}
      <div className="bg-white p-3 shadow-md mb-7 flex space-x-7">
        <div className="flex flex-col items-center transition-transform transform hover:scale-105">
          <Image
            className="p-2 rounded-xl"
            src={accCategory}
            alt="Accessorios"
            width={150}
            height={150}
          />
          <p className="text-black text-sm p-2 rounded-xl">Accessorios</p>
        </div>
        <div className="flex flex-col items-center transition-transform transform hover:scale-105">
          <Image
            className="p-2 rounded-xl"
            src={foodCategory}
            alt="Comida"
            width={150}
            height={150}
          />
          <p className="text-black text-sm p-2 rounded-xl">Comida</p>
        </div>
        <div className="flex flex-col items-center transition-transform transform hover:scale-105">
          <Image
            className="p-2 rounded-xl"
            src={hygCategory}
            alt="Higiene"
            width={150}
            height={150}
          />
          <p className="text-black text-sm p-2 rounded-xl">Higiene</p>
        </div>
        <div className="flex flex-col items-center transition-transform transform hover:scale-105">
          <Image
            className="p-2 rounded-xl"
            src={healthCategory}
            alt="Salud"
            width={150}
            height={150}
          />
          <p className="text-black text-sm p-2 rounded-xl">Salúd</p>
        </div>
      </div>
    </div>
  );
}
