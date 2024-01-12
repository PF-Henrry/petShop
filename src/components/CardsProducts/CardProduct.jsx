"use client";

import Image from "next/image";
import {
  ShoppingCartSimple,
  HeartStraight,
} from "@phosphor-icons/react/dist/ssr";
import { Rating } from "@mui/material";
import Link from "next/link";
import "./CardProduct.css";
import { useProductStore } from "@/hooks/usePages";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function CardProduct({
  id,
  rating,
  name,
  price,
  detail,
  image,
  brand,
  category,
  species,
  stock,
  active
}) {
  const imageUrl = image ? image : "https://via.placeholder.com/150";

  const priceFormatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  const productName = name ? name : "Sin nombre";

  const formattedPrice = priceFormatter.format(price);

  const description = detail ? detail : "Sin descripción";

  const brandName = brand ? brand : "Sin marca";

  const categoryName = category ? category : "Sin categoria";

  const addToCart = useProductStore((state) => state.addToCart);

  const { data: session, status: sessionStatus } = useSession();

  const router = useRouter();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (showSuccessMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000); 
    }
  }, [showSuccessMessage]);

  const handleAddToCart = () => {
    if (session && sessionStatus === "authenticated") {
      const product = {
        id,
        rating,
        name,
        price,
        detail,
        image,
        brand,
        category,
        species,
        stock,
        active
      };
console.log('product', product)
      addToCart(product);
      setShowSuccessMessage(true);
    } else {
      router.push("/login");
    }
  };
  const addToFavorites = useProductStore((state) => state.addToFavorites);
  const removeFromFavorites = useProductStore(
    (state) => state.removeFromFavorites
  );
  const getFavorites = useProductStore((state) => state.getFavorites);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (session && sessionStatus === "authenticated") {
      
     const favorites = getFavorites();
    setIsFavorite(favorites.includes(id));
    }
  }, [getFavorites, id,session,sessionStatus]);

  const handleToggleFavorite = async () => {
    if (session && sessionStatus === "authenticated") {
      const idUser = session?.user?.id

      if (isFavorite) {
        await removeFromFavorites(id,idUser);
      } else {
        await addToFavorites(id,idUser);
      }

      const updatedFavorites = getFavorites();
      setIsFavorite(updatedFavorites.includes(id));
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="card-product">
       {showSuccessMessage && (
        <div className="success-message bg-green-500 text-white p-4 rounded-md absolute top-0 right-0 m-4 shadow-md mt-8">
        <span className="mr-2">✔</span> Producto agregado al carrito con éxito
      </div>
      )}
      <button className="card-product-favorite" onClick={handleToggleFavorite}>
        {isFavorite ? (
          <HeartStraight size={20} weight="fill" color="#ee2130" />
        ) : (
          <HeartStraight size={20} />
        )}
      </button>

      <Link href={`/shop/${id}?rating=${rating}`}>
        <span className="card-product-image-container">
          <Image src={imageUrl} alt={productName} width={150} height={150} />
        </span>
      </Link>
      <p className="card-product-category">{categoryName}</p>
      <Link href={`/shop/${id}?rating=${rating}`}>
        <span className="card-product-info">
          <h1 className="card-product-title">{productName}</h1>
          <p className="card-product-brand">{brandName}</p>
        </span>
      </Link>
      <Rating
        name="read-only"
        value={rating}
        readOnly
        size="small"
        className="px-2"
      />
      <p className="card-product-price">{formattedPrice} ARS</p>
      <button className="card-product-cart" onClick={handleAddToCart}>
        <ShoppingCartSimple size={32} className="card-product-cart-icon" />
        Añadir al carrito
      </button>
     
    </div>
  );
}
