import Image from "next/image";
import Link from "next/link";
import "./CategoryCards.css";

export default function CategoryCards() {
  const accCategory =
    "https://res.cloudinary.com/kimeipetshop/image/upload/v1704005810/Ilustraciones/LandingCategoria1_yr37tj.png";
  const foodCategory =
    "https://res.cloudinary.com/kimeipetshop/image/upload/v1704005810/Ilustraciones/LandingCategoria2_vyayvc.png";
  const hygCategory =
    "https://res.cloudinary.com/kimeipetshop/image/upload/v1704005810/Ilustraciones/LandingCategoria3_jdgs8m.png";
  const healthCategory =
    "https://res.cloudinary.com/kimeipetshop/image/upload/v1704005810/Ilustraciones/LandingCategoria4_rj3uq8.png";

  return (
    <div className="categoryDiv">
      <p className="tag-category text-[#7A8D9B] text-base ">
        Todo para tu mascota
      </p>
      <div className="cards-container">
        <section className="cards-category-container">
          <div className="card-category-container">
            <Image
              src={accCategory}
              alt="Accessorios"
              width={150}
              height={150}
            />
            <p>Accesorios</p>
          </div>
          <div className="card-category-container">
            <Image src={foodCategory} alt="Comida" width={150} height={150} />
            <p>Alimentos</p>
          </div>
          <div className="card-category-container">
            <Image src={hygCategory} alt="Higiene" width={150} height={150} />
            <p>Higiene</p>
          </div>
          <div className="card-category-container">
            <Image src={healthCategory} alt="Salud" width={150} height={150} />
            <p>Salud</p>
          </div>
        </section>
        <Link href="/shop">
          <button className="button-category">Ir a la tienda</button>
        </Link>
      </div>
    </div>
  );
}
