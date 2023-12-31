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
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function NavbarIn() {
  const { data: session } = useSession();

  const userSessionId = session?.user?.id;
  

  const [userData, setUserData] = useState({
    img: "",
    name: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    adress: "",
    codeP: "",
    province: "",
    city: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userSessionId) {
          const response = await fetch("/api/users/" + userSessionId);

          if (response.ok) {
            const userData = await response.json();
            console.log("Datos del usuario obtenidos:", userData.img);
          } else {
            console.error("Error al obtener los datos del usuario");
          }
        }
      } catch (error) {
        console.error("Error de red al obtener los datos del usuario", error);
      }
    };
    fetchUserData();

    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, [userSessionId]);

  ;

 
  
  return (
    <nav className="NavBarIn">
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
            <Link href="/adoption" className="user-navBar-link">
              <PawPrint size={20} className="icon-list" />
              Adopciones
            </Link>
          </li>
          <li>
            <Link href="/petcare" className="user-navBar-link">
              <Scissors size={20} className="icon-list" />
              Peluqueria
            </Link>
          </li>

          {/** USER NAVBAR **/}
          <li className="user-navBar-btn">
            <section className="details-user-navBar hidden">
              <details>
                <summary>
                  <Image
                    src={userData.img}
                    alt="user"
                    width={20}
                    height={20}
                    className="rounded-full scale-125"
                  />
                  <p>
                    {userData.name}
                    <CaretUp
                      size={20}
                      className="caret-user-details"
                      weight="bold"
                    />
                  </p>
                </summary>
                <ListUser userImg={userData.img} setModalOpen={() => setModalOpen(true)}/>
              </details>
            </section>
            <section className="list-user-navBar block">
              <input type="checkbox" id="check-user" />
              <Tippy content="Cuenta">
                <label htmlFor="check-user" className="user-navBar">
                  <Image
                    src={userData.img}
                    alt="user"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  {userData.name}
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
          <Link href= "/logout" className="user-navBar-link">
              <SignOut size={20} className="icon-list" />
              Cerrar Sesion
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}
