"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Ordenes from "@/components/Ordenes/Ordenes";
import Image from "next/image";
import Link from "next/link";
import "./Orders.css";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { Breadcrumbs, Typography } from "@mui/material";
import Loading from "../loading";

function Orders() {
  const { data: session, status: sessionStatus } = useSession();
  const [userData, setData] = useState();
  const id = session?.user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const res = await fetch(`api/users/${id}`);
          if (!res.ok) throw TypeError("Error al obtener los datos");
          const newData = await res.json();
          setData(newData);
        } else {
          console.log("Error al obtener los datos");
        }
      } catch (error) {
        console.error("Error de red al obtener los datos del usuario", error);
      }
    };

    fetchData();
  }, [id]);

  const name = userData?.name;
  const image = userData?.img;

  return (
    <>
      {userData === undefined || sessionStatus === "loading" ? (
        <Loading />
      ) : (
        <div className="orders-container">
          <div className="nav-breadcrumbs">
            <Breadcrumbs
              separator={<CaretRight size={15} />}
              aria-label="breadcrumb"
            >
              <Link underline="hover" color="inherit" href="/">
                Inicio
              </Link>
              <Typography color="text.primary">Pedidos</Typography>
            </Breadcrumbs>
          </div>
          <span className="orders-info">
            <section>
              <Link href="/profile">
                <figure>
                  <Image src={image} alt="Profile" width={40} height={40} />
                </figure>
                <p>{name}</p>
              </Link>
            </section>
            <p className="orders-title">Mi historial de pedidos</p>
          </span>
          <Ordenes id={id} />
        </div>
      )}
    </>
  );
}

export default Orders;
