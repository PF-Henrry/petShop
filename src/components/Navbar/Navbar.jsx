"use client";

import logo from "@/public/assets/logoNav.png";
import { jomhuria } from "@/app/layout";
import Image from "next/image";
import Link from "next/link";
import {
  List,
  X,
  House,
  Storefront,
  PawPrint,
  Scissors,
  SignIn,
} from "@phosphor-icons/react/dist/ssr";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "./Navbar.css";
  
export default function Navbar() {
  return (
    <nav>
      <section className="logo-container flex gap-4 overflow-hidden justify-center items-end ml-5">
        <Image
          src={logo}
          alt="logo"
          width={100}
          height={100}
          className="object-contain img"
        />
        <p className={`${jomhuria.className} text-7xl text-[#143146]`}>KIMEY</p>
      </section>
      <input type="checkbox" id="check-menu" />
      <span className="btn-container">
        <Link href="/login" className="login-btn">
          <SignIn size={25} weight="bold" />
        </Link>

        <label htmlFor="check-menu" className="checkbtn">
          <List size={25} weight="bold" className="bars block" />
          <X size={25} weight="bold" className="cross hidden" />
        </label>
      </span>

      <ul>
        <div className="menu">
          <li>
            <Link href="/">
              <House size={20} className="icon-list" />
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/shop">
              <Storefront size={20} className="icon-list" />
              Tienda
            </Link>
          </li>
          <li>
            <Link href="/shop">
              <PawPrint size={20} className="icon-list" />
              Adopciones
            </Link>
          </li>
          <li>
            <Link href="/shop">
              <Scissors size={20} className="icon-list" />
              Peluqueria
            </Link>
          </li>
          <li>
            <Tippy content="Entrar/Registrarse">
              <Link href="/login" className="signin">
                <SignIn size={20} weight="bold" />
                Entrar
              </Link>
            </Tippy>
          </li>
        </div>
      </ul>
    </nav>
  );
}
