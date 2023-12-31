"use client";

import CardProduct from "@/components/CardsProducts/CardProduct";
import { useEffect, useState } from "react";
import { useProductStore,useCurrentPage } from "@/hooks/usePages";
import NavPages from "@/components/NavPages/NavPages";
import Filter from "@/components/Filter/Filter";

export default function Shop() {
  const [productss, setProductss] = useState([]);
  const [ratings, setRatings] = useState([]);
  const {getProducts,setProducts,getArrayPage,getFilter,setFilter,setCurrentPage} = useProductStore();
  const currentPage = useCurrentPage();

  useEffect(() => {
    const storedRatings = localStorage.getItem("ratings");
    if (storedRatings) {
      setRatings(JSON.parse(storedRatings));
    }
    const isEmpty = getProducts()
    if(!isEmpty.length){
      
      fetch("api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
  
          setProducts(data);
          const Page = getArrayPage();
  
          setProductss(Page);
  
          if (!storedRatings) {
            const randomRatings = data.map(() => generateRandomRating());
            setRatings(randomRatings);
            localStorage.setItem("ratings", JSON.stringify(randomRatings));
          }
        });
     } else {
          const newProducts = getArrayPage();
          setProductss(newProducts);
     }
  }, [setProductss,getArrayPage,setProducts,getProducts,currentPage]);

  const generateRandomRating = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  const handleOnChange = (e) => {
    const value =  e.target.value
    const name = e.target.name
    if(value && name)
    setFilter({name,value});
  }



  const handleOnClick = () => {
      const filters = getFilter();


      const requestFilter = {query:{
      }};
      
      if(filters.category)
      requestFilter.query.category = [{ _id: filters.category}];
      if(filters.species)
      requestFilter.query.species = [{_id: filters.species}];

      fetch('api/products/filter',{
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(requestFilter)})
        .then(data => data.json())
        .then(data => {

        
            setProducts(data);

            const page = getArrayPage();
            setProductss(page)

          
        })

  }

  return (
    <div className="container mx-auto p-4">
      <Filter handleOnChange={handleOnChange} handleOnClick={handleOnClick} />
      <div className="flex flex-wrap gap-10 justify-between items-center p-6">
        {productss.length &&
          productss.map((product, index) => (
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
