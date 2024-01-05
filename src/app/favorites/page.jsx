'use client';
import React, { useEffect, useState } from "react";
import CardProduct from "@/components/CardsProducts/CardProduct";
import { useProductStore } from "@/hooks/usePages";

const FavoriteProducts = () => {
  const favorites = useProductStore((state) => state.getFavorites());
  console.log('favorites', favorites)

  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) {
        throw new Error('Error al obtener detalles del producto');
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
      const detailsPromises = favorites.map((productId) => fetchProductDetails(productId));
      const details = await Promise.all(detailsPromises);
      setFavoriteProducts(details.filter((product) => product !== null));
    };

    fetchFavoriteProducts();
  }, [favorites]);


  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center mt-6">Tus Productos Favoritos</h1>

      {favoriteProducts?.length ? (
      <div className="flex flex-wrap gap-10 justify-around items-center">
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
    ) : (
      <p className="text-gray-600 flex items-center justify-center h-screen">No hay productos favoritos.</p>
    )}
    </div>
  );
};

export default FavoriteProducts;


