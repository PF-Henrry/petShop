"use client";

import CardProduct from "@/components/CardsProducts/CardProduct";
import { useEffect, useState } from "react";
import { useProductStore } from "@/hooks/usePages";
import NavPages from "@/components/NavPages/NavPages";


export default function Shop() {
  const [products, setProducts] = useState([]);
  const [ratings, setRatings] = useState([]);
  const productsStore = useProductStore();


  useEffect(() => {
    const storedRatings = localStorage.getItem("ratings");
    if (storedRatings) {
      setRatings(JSON.parse(storedRatings));
    }

    fetch("api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {

        productsStore.setProducts(data);
        const Page = productsStore.getArrayPage();

        setProducts(Page);

        if (!storedRatings) {
          const randomRatings = data.map(() => generateRandomRating());
          setRatings(randomRatings);
          localStorage.setItem("ratings", JSON.stringify(randomRatings));
        }
      });
  }, [productsStore]);

  const generateRandomRating = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap gap-10 justify-between items-center p-6">
        {products.length &&
          products.map((product, index) => (
            <CardProduct
              key={product?._id}
              name={product?.name}
              price={product?.price}
              detail={product?.detail}
              image={product?.image}
              brand={product?.brand?.name}
              specie={product?.species[0]?.name}
              category={product?.category[0]?.name}
              rating={ratings[index]}
            />
          ))}
      </div>
      <NavPages />
    </div>
  );
}
