"use client";
import React, { Suspense, useEffect, useState } from "react";
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

import { useSession } from "next-auth/react";

import "./ShopStyles.css";
import Loading from "../loading";

export default function UnificadoShop() {
  const { data: session, status: sessionStatus } = useSession();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [ratings, setRatings] = useState([]);
  const {
    getProducts,
    setProducts: setProductsStore,
    getArrayPage,
    getFilter,
    setFilter,
    updateFavorites,
    getTotalPages,
    getCurrentPage,
    setCurrentPage,
    sortOrder,
  } = useProductStore();
  const currentPage = useCurrentPage();
  const originalProducts = useOriginalProducts();
  const [originalProductsCopy, setOriginalProductsCopy] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storeProducts = localStorage.getItem("products");
        const storedRatings = localStorage.getItem("ratings");
        const userID = session?.user?.id;
        if (userID) {
          updateFavorites(userID);
        }

       
          const response = await fetch("api/products");
          const data = await response.json();

          setOriginalProductsCopy(data);
          if (storeProducts) {
            // setRatings(JSON.parse(storedRatings));
  
            setProductsStore(JSON.parse(storeProducts));
            // setFilteredProducts(getArrayPage());
            // setOriginalProductsCopy(JSON.parse(storeProducts));
          }   else {
            setProductsStore(data)
          }

          if (!storedRatings) {
            const randomRatings = data.map(() => generateRandomRating());
            setRatings(randomRatings);
            localStorage.setItem("ratings", JSON.stringify(randomRatings));
          }

          setFilteredProducts(getArrayPage());
          // setOriginalProductsCopy(data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setProductsStore]);

  useEffect(() => {
    setFilteredProducts(getArrayPage());
  }, [currentPage, getArrayPage, sortOrder]);

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
    setProductsStore(filtered);
    setFilteredProducts(getArrayPage());
    localStorage.setItem("filteredProducts", JSON.stringify(filtered));
  };

  const handleClear = () => {
    setFilter({ name: "name", value: "" });
    setProductsStore(originalProductsCopy);
    setFilteredProducts(getArrayPage());
    localStorage.removeItem("filteredProducts");
  };
  
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Backspace") {
        handleClear();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleClear]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    if (value && name) setFilter({ name, value });
  };

  const handleOnClick = () => {
    const filters = getFilter();
    const requestFilter = { query: {} };

    ["category", "species", "brand"].forEach((key) => {
      if (filters[key]) requestFilter.query[key] = [{ _id: filters[key] }];
    });

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

        setFilteredProducts(getArrayPage());
      });
  };

  const generateRandomRating = () => Math.floor(Math.random() * 5) + 1;

  return (
    <div className="relative container-shop">
      <CatalogCarousel />
      <InfoSection />
      <SearchBar onSearch={handleSearch} onClear={handleClear} />
      <NavPages />
      <div className="w-full products-container">
        <Filter handleOnChange={handleOnChange} handleOnClick={handleOnClick} />
        <div className="flex flex-wrap items-center justify-around gap-10">
        {filteredProducts.length ? (
        filteredProducts
          .filter(product => product.active) // Filtra productos activos
          .map((product, index) => (
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
                stock={product?.stock}
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
