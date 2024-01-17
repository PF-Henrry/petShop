import Image from "next/image";
import Link from "next/link";
import accCategory from "@/public/assets/LandingCategoria1.png";
import foodCategory from "@/public/assets/LandingCategoria2.png";
import hygCategory from "@/public/assets/LandingCategoria3.png";
import healthCategory from "@/public/assets/LandingCategoria4.png";

import "./CategoryCards.css";

export default function CategoryCards() {
  return (
    <div className="categoryDiv">
      <p className="tag-category text-[#7A8D9B] text-base ">
        Mirá todo lo que podes encontrar en nuestra tienda:
      </p>
      {/* bg-blue-200 p-4 */}
      <div className="cards-category-container">
        <div className="card-category-container">
          {/* <Link href="/category/1"> */}
            <Image
              src={accCategory}
              alt="Accessorios"
              width={150}
              height={150}
            />
          {/* </Link> */}
          <p>Accesorios</p>
        </div>
        <div className="card-category-container">
          {/* <Link href="/category/2"> */}
            <Image src={foodCategory} alt="Comida" width={150} height={150} />
          {/* </Link> */}
          <p>Alimentos</p>
        </div>
        <div className="card-category-container">
          {/* <Link href="/category/3"> */}
            <Image src={hygCategory} alt="Higiene" width={150} height={150} />
          {/* </Link> */}
          <p>Elementos de Higiene</p>
        </div>
        <div className="card-category-container">
          {/* <Link href="/category/4"> */}
            <Image src={healthCategory} alt="Salud" width={150} height={150} />
          {/* </Link> */}
          <p>Elementos de Salud</p>
        </div>
      </div>
    </div>
  );
}
