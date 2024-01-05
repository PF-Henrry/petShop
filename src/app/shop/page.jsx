// UnificadoShop.jsx
"use client";
import React, { useEffect, useState } from "react";
import CardProduct from "@/components/CardsProducts/CardProduct";
import SearchBar from "@/components/SearchBar/SearchBarCatalogo";
import CatalogCarousel from "@/components/CatalogCarousel/CatalogCarousel";
import Filter from "@/components/Filter/Filter";
import NavPages from "@/components/NavPages/NavPages";
import InfoSection from "@/components/InfoSection/InfoSection";
import {
  useProductStore,
  useCurrentPage,
  useOriginalProducts,
} from "@/hooks/usePages";

import "./ShopStyles.css";

export default function UnificadoShop() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [ratings, setRatings] = useState([]);
  const {
    getProducts,
    setProducts: setProductsStore,
    getArrayPage,
    getFilter,
    setFilter,
    getTotalPages,
    getCurrentPage,
    setCurrentPage,
    setOriginalProducts, // Agregamos esta función
  } = useProductStore();
  const currentPage = useCurrentPage();
  const originalProducts = useOriginalProducts();

  // Usamos useEffect para establecer la lista original de productos
  useEffect(() => {
    const storeProducts = localStorage.getItem("products");

    if (storeProducts) {
      const data = JSON.parse(storeProducts);
      setOriginalProducts(data);
    }
  }, [setOriginalProducts]);

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
  }, [setProductsStore, setOriginalProducts]);

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

    console.log("entro a filter", filtered);

    setProductsStore(filtered);
    const newProducts = getArrayPage();

    console.log("nueva pag", newProducts);
    setFilteredProducts(newProducts);

    localStorage.setItem("filteredProducts", JSON.stringify(filtered));
    localStorage.setItem("filterQuery", query);

    setProductsStore(filtered);
  };

  const handleClear = () => {
    setFilter({ name: "name", value: "" });
    setProductsStore(originalProducts);

    const product = getArrayPage();
    setFilteredProducts(product);
    localStorage.removeItem("filterQuery");
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
    if (filters.brand) requestFilter.query.brand = [{ _id: filters.brand }];

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

        const totalPage = getTotalPages();
        const currentPage = getCurrentPage();

        if (totalPage < currentPage) {
          setCurrentPage(1);
        }

        const page = getArrayPage();
        setFilteredProducts(page);
      });
  };

  const generateRandomRating = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  return (
    <div className="container-shop relative">
      <CatalogCarousel />
      <InfoSection />
      <SearchBar onSearch={handleSearch} onClear={handleClear} />
      <NavPages />
      <div className="products-container w-full">
        <Filter handleOnChange={handleOnChange} handleOnClick={handleOnClick} />
        <div className="flex flex-wrap gap-10 justify-around items-center">
          {filteredProducts.length ? (
            filteredProducts.map((product, index) => (
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
