"use client";

import { useEffect, useState } from "react";
import LayoutAdmin from "@/components/LayoutAdmin/LayoutAdmin";
import Loader from "@/components/Loader/Loader";

const SalesPage = () => {
  const [totalVentas, setTotalVentas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCarts = async () => {
      try {
        const response = await fetch("../api/users/carts");
        if(response.ok){
          const newCarts = await response.json();
          if(Array.isArray(newCarts))
          setTotalVentas(newCarts);
        }
      } catch (error) {
        console.error("Error al obtener usuarios: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCarts();
  }, []);

  return (
    <>
      <div>
        {!totalVentas && !Array.isArray(totalVentas) && !totalVentas?.length ? (
          <Loader />
        ) : (
          <>
            <h1>Lista de Ventas</h1>
            <p>
              Total de ventas:{" "}
              {Array.isArray(totalVentas) && totalVentas.length
                ?.filter((item) => item.status === true)
                ?.map((item) => item.items.length)
                ?.reduce((a, b) => a + b)}
            </p>

            <section className="flex flex-wrap gap-5">
              {Array.isArray(totalVentas) && totalVentas.length
                  .filter((item) => item?.status === true)
                  .map((item) => (
                    <div
                      key={item?._id}
                      className="p-10 bg-white rounded-lg shadow-md"
                    >
                      <p>Order ID: {item?.orderID}</p>
                      <p>Cart ID: {item?._id}</p>
                      <span>
                        <p>User Data</p>
                        <p>ID: {item?.userID?._id}</p>
                        <p>Name: {item?.userID?.name}</p>
                      </span>
                      <p>Created at: {item?.fecha}</p>
                      <p>Items count: {item?.items?.length}</p>
                      <p>Amount: {item?.amount}</p>
                    </div>
                  ))}
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default SalesPage;
