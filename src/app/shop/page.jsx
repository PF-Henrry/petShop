"use client";

import CardProduct from "@/components/CardsProducts/CardProduct";
import { useEffect, useState } from "react";

export default function Shop() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  console.log(products);
  return (
    <div>
      {products.length &&
        products.map((product) => (
          <CardProduct
            key={product._id}
            name={product.name}
            price={product.price}
            detail={product.detail}
            image={product.image}
            brand={product.brand.name}
            category={product.category.name}
          />
        ))}
    </div>
  );
}
