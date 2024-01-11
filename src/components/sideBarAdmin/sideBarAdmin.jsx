// Importa las bibliotecas necesarias
'use client'
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { User, Storefront, SignOut, House, CurrencyDollar } from "@phosphor-icons/react/dist/ssr"; 

// Define el componente SidebarLink con icono de usuario
const SidebarLink = ({ href, text, isActive, icon }) => {
  return (
    <li>
      <Link href={href}>
        <div
          className={`flex items-center hover:bg-rose-200 px-4 py-2 rounded ${
            isActive ? 'bg-rose-200' : ''
          } text-brown-500`}
        >
          {icon && <span className="mr-2">{icon}</span>}
          {text}
        </div>
      </Link>
    </li>
  );
};

// Define el componente SidebarSubLink
const SidebarSubLink = ({ href, text }) => {
  return (
    <li>
      <Link href={href}>
        <div className="text-gray-400 hover:text-white px-6 py-2 rounded text-brown-500">
          {text}
        </div>
      </Link>
    </li>
  );
};

// Define el componente Sidebar
const Sidebar = () => {
  const { id } = useParams();

  return (
    <div className="relative">
      {/* Barra lateral */}
      <nav className="bg-rose-100 text-brown-500 h-screen w-64">
        
      {/* Título de la barra lateral como un enlace a la página principal del admin */}
      <Link href="/admin">
          <div className="p-4 text-xl font-bold text-brown-500 hover:underline">
            Admin
          </div>
        </Link>

        {/* Enlaces del Sidebar */}
        <ul className="flex flex-col space-y-2 p-4">
          {/* Agrega el icono de usuario al enlace "Usuarios" */}
          <SidebarLink href="/admin/users" text="Usuarios" isActive={false} icon={<User size={32} />} />
          <SidebarLink href="/admin/products" text="Productos" isActive={false} icon={<Storefront size={32} />} />
          <ul className="ml-4">
            <SidebarSubLink href="/admin/products/uploadProducts" text="Agregar Producto" />
          </ul>
          <SidebarLink href="/admin/sales" text="Ventas" isActive={false} icon={<CurrencyDollar size={32} />} />
          {/* ... (resto de tus enlaces) */}
        </ul>

        {/* Línea divisoria */}
        <hr className="border-b my-2 border-rose-200" />

        {/* Enlaces en la parte inferior de la barra lateral */}
        <ul className="mt-auto">
          <SidebarLink href="/admin" text="Inicio" isActive={false} icon={<House size={32} />} />
          <SidebarLink href="/logout" text="Cerrar Sesión" isActive={false} icon={<SignOut size={32} />} />
        </ul>
      </nav>

      {/* No hay botón para mostrar/ocultar la barra lateral ya que es fija */}
    </div>
  );
};

// Exporta el componente Sidebar
export default Sidebar;
