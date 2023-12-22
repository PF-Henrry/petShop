"use client";

import logo from "@/public/assets/logoNav.png";
import { jomhuria } from "@/app/layout";
import Image from "next/image";
import Link from "next/link";
import {
  List,
  X,
  User,
  House,
  Storefront,
  PawPrint,
  Scissors,
  CaretDown,
  CaretUp,
  SignOut,
} from "@phosphor-icons/react/dist/ssr";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import ListUser from "./ListUser";
import "./NavbarIn.css";

export default function NavbarIn() {
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
      <input type="checkbox" id="check-menu" name="check-menu-responsive" />
      <input type="checkbox" id="check-userMenu" name="check-menu-responsive" />
      <span className="btn-container">
        <label htmlFor="check-userMenu" className="user-navBar-menu"></label>

        <label htmlFor="check-menu" className="checkbtn">
          <List size={25} weight="bold" className="bars block" />
          <X size={25} weight="bold" className="cross hidden" />
        </label>
      </span>

      <ul>
        <div className="menu">
          <li>
            <Link href="/" className="user-navBar-link">
              <House size={20} className="icon-list" />
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/shop" className="user-navBar-link">
              <Storefront size={20} className="icon-list" />
              Tienda
            </Link>
          </li>
          <li>
            <Link href="/shop" className="user-navBar-link">
              <PawPrint size={20} className="icon-list" />
              Adopciones
            </Link>
          </li>
          <li>
            <Link href="/shop" className="user-navBar-link">
              <Scissors size={20} className="icon-list" />
              Peluqueria
            </Link>
          </li>

          {/** USER NAVBAR **/}
          <li className="user-navBar-btn">
            <section className="details-user-navBar hidden">
              <details>
                <summary>
                  <User size={20} weight="bold" className="scale-125" />
                  <p>
                    Usuario
                    {/* {sessionStorage.getItem("user")} */}
                    <CaretUp
                      size={20}
                      className="caret-user-details"
                      weight="bold"
                    />
                  </p>
                </summary>
                <ListUser />
              </details>
            </section>
            <section className="list-user-navBar block">
              <input type="checkbox" id="check-user" />
              <Tippy content="Cuenta">
                <label htmlFor="check-user" className="user-navBar">
                  <User size={20} weight="bold" />
                  Usuario
                  {/* {sessionStorage.getItem("user")} */}
                  <CaretDown
                    size={15}
                    color="#eee0dd"
                    className="caret-user"
                    weight="bold"
                  />
                </label>
              </Tippy>
              <ListUser />
            </section>
          </li>
          {/** USER NAVBAR **/}

          <li>
            <Link href="/logout" className="user-navBar-link">
              <SignOut size={20} className="icon-list" />
              Cerrar Sesion
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}
