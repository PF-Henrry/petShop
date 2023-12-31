"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Ordenes from "@/components/Ordenes/Ordenes";
import Image from "next/image";
import Link from "next/link";
import "./Orders.css";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { Breadcrumbs, Typography } from "@mui/material";

function Orders() {
  const { data: session, status } = useSession();
  const id = session?.user?.id;
  const name = session?.user?.name;
  const image = session?.user?.image;
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return (
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
              <Image src={image} alt={name} width={40} height={40} />
            </figure>
            <p>{name}</p>
          </Link>
        </section>
        <p className="orders-title">Mi historial de pedidos</p>
      </span>
      <Ordenes id={id} />
    </div>
  );
}

export default Orders;
