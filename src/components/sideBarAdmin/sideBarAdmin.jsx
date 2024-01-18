"use client";

import Link from "next/link";
import {
  Storefront,
  SignOut,
  House,
  CurrencyDollar,
  UserList,
  ListPlus,
} from "@phosphor-icons/react/dist/ssr";
import "./sideBar.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const SidebarLink = ({ href, text, icon }) => {
  const pathname = usePathname();

  return (
    <li className="sidebar-nav-link">
      <Link
        href={href}
        className={clsx("sidebar-nav-link-btn", {
          "active-link-admin": pathname === href,
        })}
      >
        {icon && <figure>{icon}</figure>}
        {text}
      </Link>
    </li>
  );
};

const SidebarSignOut = ({ href, text, icon }) => {
  return (
    <li className="sidebar-nav-link">
      <Link href={href} className="sidebar-nav-link-btn sing-out-sidebar">
        {icon && <figure>{icon}</figure>}
        {text}
      </Link>
    </li>
  );
};

const Sidebar = () => {
  const [admin, setAdmin] = useState([]);
  const { data: session } = useSession();

  const idAdmin = session?.user?.id;

  useEffect(() => {
    const getAdmin = async () => {
      try {
        const response = await fetch(`/api/users/${idAdmin}`);
        const data = await response.json();
        setAdmin(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAdmin();
  }, [idAdmin]);

  console.log(admin.name);

  return (
    <div className="sidebar-container">
      {/* Barra lateral */}
      <nav className="sidebar-nav-container">
        {/* Título de la barra lateral como un enlace a la página principal del admin */}
        <Link href="/admin">
          <p className="sidebar-title">Hola {admin.name}!</p>
        </Link>

        <ul className="sidebar-nav-links">
          <SidebarLink href="/admin" text="Inicio" icon={<House size={32} />} />
          <SidebarLink
            href="/admin/users"
            text="Usuarios"
            icon={<UserList size={32} />}
          />
          <SidebarLink
            href="/admin/products"
            text="Productos"
            icon={<Storefront size={32} />}
          />
          <SidebarLink
            href="/admin/products/uploadProducts"
            text="Agregar Producto"
            icon={<ListPlus size={32} />}
          />
          <SidebarLink
            href="/admin/sales"
            text="Ventas"
            icon={<CurrencyDollar size={32} />}
          />
        </ul>

        <hr className="my-2 border-b border-[#DABEB6]" />

        <ul className="sidebar-nav-links">
          <SidebarSignOut
            href="/logout"
            text="Cerrar Sesión"
            icon={<SignOut size={32} />}
            className="sing-out-sidebar"
          />
        </ul>
      </nav>

      {/* No hay botón para mostrar/ocultar la barra lateral ya que es fija */}
    </div>
  );
};

export default Sidebar;
