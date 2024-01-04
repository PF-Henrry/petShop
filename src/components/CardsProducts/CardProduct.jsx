"use client";
import Image from "next/image";
import {
  ShoppingCartSimple,
  HeartStraight,
} from "@phosphor-icons/react/dist/ssr";
import { Rating } from "@mui/material";
import Link from "next/link";
import "./CardProduct.css";
import { useProductStore } from '@/hooks/usePages';
import { ToastContainer, toast } from 'react-toastify';
import {  useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';

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

  const router = useRouter()

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
      };
  
      addToCart(product);
      toast.success("Producto agregado al carrito con éxito");
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="card-product">
      <button className="card-product-favorite">
        <HeartStraight size={20} />
      </button>

      <Link href={`/shop/${id}`}>
        <span className="card-product-image-container">
          <Image src={imageUrl} alt={productName} width={150} height={150} />
        </span>
      </Link>
      <p className="card-product-category">{categoryName}</p>
      <Link href={`/shop/${id}`}>
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
      <button className="card-product-cart" onClick={handleAddToCart}  >
        <ShoppingCartSimple size={32} className="card-product-cart-icon" />
        Añadir al carrito
      </button>
      <ToastContainer position="top-center" />
    </div>
  );
}
