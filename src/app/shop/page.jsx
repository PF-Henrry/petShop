
"use client";
import React, { useEffect, useState } from "react";
import CardProduct from "@/components/CardsProducts/CardProduct";
import SearchBar from "@/components/SearchBar/SearchBarCatalogo";
import CatalogCarousel from "@/components/CatalogCarousel/CatalogCarousel";
import Filter from "@/components/Filter/Filter";
import NavPages from "@/components/NavPages/NavPages";
import InfoSection from "@/components/InfoSection/InfoSection";
import Loader from "@/components/Loader/Loader"

import {
  useProductStore,
  useCurrentPage,
  useOriginalProducts,
} from "@/hooks/usePages";

import { useSession } from "next-auth/react";

import "./ShopStyles.css";

export default function UnificadoShop() {
  const { data: session, status: sessionStatus } = useSession();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    getProducts,
    setProducts: setProductsStore,
    getArrayPage,
    getFilter,
    setFilter,
    getTotalPages,
    getCurrentPage,
    setCurrentPage,
    sortOrder,
  } = useProductStore();
  const currentPage = useCurrentPage();
  const originalProducts = useOriginalProducts();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const storeProducts = localStorage.getItem("storeProducts");
        const storedRatings = localStorage.getItem("ratings");

        if (storeProducts && storedRatings) {
          setRatings(JSON.parse(storedRatings));
          setProductsStore(JSON.parse(storeProducts));
          setFilteredProducts(getArrayPage());
        } else {
          const response = await fetch("api/products");
          const data = await response.json();

          setProductsStore(data);

          if (!storedRatings) {
            const randomRatings = data.map(() => generateRandomRating());
            setRatings(randomRatings);
            localStorage.setItem("ratings", JSON.stringify(randomRatings));
          }

          setFilteredProducts(getArrayPage());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setProductsStore]);

  useEffect(() => {
    setFilteredProducts(getArrayPage());
  }, [currentPage, getArrayPage, sortOrder]);

  const handleSearch = (query) => {
    const filtered = applyFilter(getProducts(), query);
    setProductsStore(filtered);
    setFilteredProducts(getArrayPage());
    localStorage.setItem("filteredProducts", JSON.stringify(filtered));
  };

  const handleClear = () => {
    setFilter({ name: "name", value: "" });
    setProductsStore(originalProducts);
    setFilteredProducts(getArrayPage());
  };

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
    <div className="container-shop relative">
      <CatalogCarousel />
      <InfoSection />
      <SearchBar onSearch={handleSearch} onClear={handleClear} />
      <NavPages />
      {loading ? (
        <Loader />
      ) : (
        <div className="products-container w-full">
          <Filter handleOnChange={handleOnChange} handleOnClick={handleOnClick} />
  
          <div className="products-container w-full">
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
                    stock={product?.stock}
                    active={product?.active}
                  />
                ))
              ) : (
                <p>No products found</p>
              )}
            </div>
          </div>
        </div>
      )}
      <NavPages />
    </div>
  );
 }