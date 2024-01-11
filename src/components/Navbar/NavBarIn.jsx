"use client";
import logo from "@/public/assets/logoNav.png";
import { jomhuria } from "@/app/layout";
import Image from "next/image";
import Link from "next/link";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

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
import { useRouter } from "next/navigation";

const defaultImage =
  "http://res.cloudinary.com/kimeipetshop/image/upload/v1703619038/rzhvjkorlhzd8nkp8h6n.png";

export default function NavbarIn() {
  const { data: session } = useSession();

  const userSessionId = session?.user?.id;
 
  const userRole = session?.user?.role;
  console.log(session)

  const isAdmin = userRole === 2
 
  const [isAdminSwitch, setIsAdminSwitch] = useState(false);
  const router = useRouter();

  const handleAdminSwitchChange = () => {
    console.log("Cambiando isAdminSwitch a:", !isAdminSwitch);
    setIsAdminSwitch(!isAdminSwitch);
  
    if (!isAdminSwitch) {
      console.log("Redirigiendo a /");
      router.push('/');
    } else {
      console.log("Redirigiendo a /admin");
      router.push('/admin');
    }
  };
  
  useEffect(() => {
    if (!isAdminSwitch) {
      router.push('/');
    } else {
      router.push('/admin');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdminSwitch]);
  

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
            setUserData(userData);
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
      {isAdmin && (
            <li>
              <Link href="/admin" className="user-navBar-link">
                <FormControlLabel
                  control={
                    <Switch
                      checked={isAdminSwitch}
                      //onChange={handleAdminSwitchChange}
                      onClick={handleAdminSwitchChange}
                      color="primary"
                    />
                  }
                  label="Admin"
                  labelPlacement="start"
                  className="admin-switch"
                />
              </Link>
            </li>
          )}
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
                <ListUser userImg={userData.img || defaultImage} />
              </details>
            </section>
            <section className="list-user-navBar block">
              <input type="checkbox" id="check-user" />
              <Tippy content="Cuenta">
                <label htmlFor="check-user" className="user-navBar">
                  <Image
                    src={userData.img || defaultImage}
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
