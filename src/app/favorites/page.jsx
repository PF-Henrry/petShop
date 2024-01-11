"use client";

import React, { useEffect, useState } from "react";
import CardProduct from "@/components/CardsProducts/CardProduct";
import { useProductStore } from "@/hooks/usePages";
import "./Favorites.css";
import {
  ArrowRight,
  CaretRight,
  HeartStraight,
  Storefront,
  WarningCircle,
} from "@phosphor-icons/react/dist/ssr";
import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { useSession } from "next-auth/react";
const FavoriteProducts = () => {

  const { data: session, status: sessionStatus } = useSession();
  
  const favorites = useProductStore((state) => state.getFavorites());
  const updateFavorites = useProductStore((state) => state.updateFavorites);

  // console.log("favorites", favorites);

  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) {
        throw new Error("Error al obtener detalles del producto");
      }
      const productDetails = await response.json();
      return productDetails;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      const userID = session?.user?.id
      if(sessionStatus ==='authenticated')  updateFavorites(userID);
      
      const detailsPromises = favorites.map((productId) =>
        fetchProductDetails(productId)
      );
      const details = await Promise.all(detailsPromises);
      setFavoriteProducts(details.filter((product) => product !== null));
    };

    fetchFavoriteProducts();
  }, [favorites]);

  return (
    <div className="favorites-container">
      <div className="nav-breadcrumbs">
        <Breadcrumbs
          separator={<CaretRight size={15} />}
          aria-label="breadcrumb"
        >
          <Link underline="hover" color="inherit" href="/">
            Inicio
          </Link>
          <Link underline="hover" color="inherit" href="/shop">
            Tienda
          </Link>
          <Typography color="text.primary">Favoritos</Typography>
        </Breadcrumbs>
      </div>
      <h1 className="favorites-title">
        Mis Favoritos <HeartStraight size={32} />
      </h1>

      {favoriteProducts?.length ? (
        <div className="favorite-products-container">
          <span className="favorite-products-info">
            <p className="favorite-products-text">
              Aquí puedes encontrar tus productos favoritos.
            </p>
            <p className="favorite-products-text-2">
              {" "}
              (Haz click sobre el icono de corazón para eliminar de favoritos.)
            </p>
          </span>
          <div className="favorite-products">
            {favoriteProducts.map((product) => (
              <CardProduct
                key={product?._id}
                id={product?._id}
                name={product?.name}
                price={product?.price}
                detail={product?.detail}
                image={product?.image}
                brand={product?.brand?.name}
                specie={product?.species[0]?.name}
                category={product?.category[0]?.name}
              />
            ))}
          </div>
        </div>
      ) : (
        <span className="favorites-empty">
          <p className="empty-title">
            No hay productos favoritos{" "}
            <Tippy content="Debe agregar productos a favoritos">
              <WarningCircle size={32} />
            </Tippy>
          </p>
          <p className="empty-text ">
            Cada vez que agregues un producto a favoritos, aparecerán en esta
            sección.
          </p>
          <Link href="/shop" className="go-to-shop">
            <p>Ir a la tienda</p>
            <span>
              <ArrowRight size={32} />
              <Storefront size={32} />
            </span>
          </Link>
        </span>
      )}
    </div>
  );
};

export default FavoriteProducts;
