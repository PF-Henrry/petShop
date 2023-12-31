"use client";

import Image from "next/image";
import {
  ShoppingCartSimple,
  HeartStraight,
} from "@phosphor-icons/react/dist/ssr";
import { Rating } from "@mui/material";
import Link from "next/link";
import "./CardProduct.css";
import { useState } from "react";

export default function CardProduct({
  rating,
  name,
  price,
  detail,
  image,
  brand,
  category,
  specie,
}) {
  const imageUrl = image ? image : "https://via.placeholder.com/150";

  const priceFormatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  const formattedPrice = priceFormatter.format(price);

  const description = detail ? detail : "Sin descripción";

  const brandName = brand ? brand : "Sin marca";

  const categoryName = category ? category : "Sin categoria";



  return (
    <div className="card-product">
      <button className="card-product-favorite">
        <HeartStraight size={20} />
      </button>
      

      <Image src={imageUrl} alt={name} width={150} height={150} />
      <p className="card-product-category">{categoryName}</p>
      <span className="card-product-info">
        <Link href={`#`}>
          <h1 className="card-product-title">{name}</h1>
          <p className="card-product-brand">{brandName}</p>
        </Link>
      </span>
      {/* <p className="card-product-description">{description}</p> */}
      <Rating
        name="read-only"
        value={rating}
        readOnly
        size="small"
        className="px-2"
      />
      <p className="card-product-price">{formattedPrice} ARS</p>
      <button className="card-product-cart">
        <ShoppingCartSimple size={32} className="card-product-cart-icon" />
        Añadir al carrito
      </button>
    </div>
  );
}
