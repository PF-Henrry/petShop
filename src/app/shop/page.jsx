// UnificadoShop.jsx
"use client";

import React, { useEffect, useState } from "react";
import CardProduct from "@/components/CardsProducts/CardProduct";
import SearchBar from "@/components/SearchBar/SearchBarCatalogo";
import CatalogCarousel from "@/components/CatalogCarousel/CatalogCarousel";
import Filter from "@/components/Filter/Filter";
import NavPages from "@/components/NavPages/NavPages";
import { useProductStore, useCurrentPage } from "@/hooks/usePages";

export default function UnificadoShop() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [ratings, setRatings] = useState([]);
  const {
    getProducts,
    setProducts: setProductsStore,
    getArrayPage,
    getFilter,
    setFilter,
  } = useProductStore();
  const currentPage = useCurrentPage();

  useEffect(() => {
    const storeProducts = localStorage.getItem("products");
    const storedRatings = localStorage.getItem("ratings");
    const storedFilterQuery = localStorage.getItem("filterQuery");

    const fetchData = async () => {
      try {
        if (storeProducts && storedRatings) {
          setRatings(JSON.parse(storedRatings));
          setProductsStore(JSON.parse(storeProducts));

          const filtered = applyFilter(
            JSON.parse(storeProducts),
            storedFilterQuery
          );
          setFilteredProducts(filtered);
        } else {
          const response = await fetch("api/products");
          const data = await response.json();

          setProductsStore(data);

          if (!storedRatings) {
            const randomRatings = data.map(() => generateRandomRating());
            setRatings(randomRatings);
            localStorage.setItem("ratings", JSON.stringify(randomRatings));
          }

          const filtered = applyFilter(data, storedFilterQuery || "");
          setFilteredProducts(filtered);

          localStorage.setItem("products", JSON.stringify(data));
          localStorage.setItem("filterQuery", storedFilterQuery || "");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setProductsStore]);

  useEffect(() => {
    const newProducts = getArrayPage();
    setFilteredProducts(newProducts);
  }, [currentPage, getArrayPage]);

  const applyFilter = (data, filterQuery) => {
    if (!filterQuery) {
      return data;
    }

    return data.filter(
      (product) =>
        product.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        product.category[0]?.name
          .toLowerCase()
          .includes(filterQuery.toLowerCase()) ||
        product.brand?.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        product.species[0]?.name
          .toLowerCase()
          .includes(filterQuery.toLowerCase())
    );
  };

  const handleSearch = (query) => {
    const filtered = applyFilter(getProducts(), query);
    setFilteredProducts(filtered);
    localStorage.setItem("filteredProducts", JSON.stringify(filtered));
    localStorage.setItem("filterQuery", query);
  };

  const handleClear = () => {
    setFilteredProducts(getProducts());
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (value && name) setFilter({ name, value });
  };

  const handleOnClick = () => {
    const filters = getFilter();

    const requestFilter = { query: {} };

    if (filters.category)
      requestFilter.query.category = [{ _id: filters.category }];
    if (filters.species)
      requestFilter.query.species = [{ _id: filters.species }];

    fetch("api/products/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestFilter),
    })
      .then((data) => data.json())
      .then((data) => {
        setProductsStore(data);

        const page = getArrayPage();
        setFilteredProducts(page);
      });
  };

  const generateRandomRating = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  return (
    <div className="container mx-auto p-4">
      <CatalogCarousel />
      <SearchBar onSearch={handleSearch} onClear={handleClear} />
      <div className="flex flex-row p-6">
        <Filter handleOnChange={handleOnChange} handleOnClick={handleOnClick} />
        <div className="flex flex-wrap gap-10 justify-between items-center pl-10">
          {filteredProducts.length ? (
            filteredProducts.map((product, index) => (
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
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
      <NavPages />
    </div>
  );
}
