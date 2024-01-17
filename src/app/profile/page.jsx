"use client";
import React, { useState, useEffect } from "react";
import EditProfileForm from "@/components/EditProfile/EditProfileForm";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  CaretUp,
  CheckCircle,
  Heart,
  ShoppingBag,
  ShoppingCartSimple,
  WarningCircle,
} from "@phosphor-icons/react/dist/ssr";
import "./Profile.css";

const Profile = () => {
  const [editable, setEditable] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [buys, setBuys] = useState([]);
  const { data: session } = useSession();

  const defaultImage =
    "http://res.cloudinary.com/kimeipetshop/image/upload/v1703619038/rzhvjkorlhzd8nkp8h6n.png";

  const idUser = session?.user?.id;

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(`/api/users/${idUser}`);
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getProfile();
  }, [idUser]);

  useEffect(() => {
    const getBuys = async () => {
      try {
        const response = await fetch(`/api/users/carts?id=${idUser}`);
        const data = await response.json();
        setBuys(data);
      } catch (error) {
        console.error(error);
      }
    };
    getBuys();
  }, [idUser]);

  const initialValues = {
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
  };

  useEffect(() => {
    setShowSuccessMessage(false);
  }, [editable]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error submitting changes:", error);
    } finally {
      setSubmitting(false);
      setEditable(false);
    }
  };

  const handleEditClick = () => {
    setEditable(!editable); // Cambia el estado de editable al hacer clic
  };

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(date).toLocaleDateString("es-AR", options);
  };

  const priceFormatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const lastname =
    profileData?.lastname === "Unknown" || profileData?.lastname === undefined
      ? "---"
      : profileData?.lastname;

  const address =
    profileData?.adress === "Unknown" ? "---" : profileData?.adress;

  const codeP = profileData?.codeP <= 0 ? "---" : profileData?.codeP;

  const province =
    profileData?.province?.name === "Unknown"
      ? "---"
      : profileData?.province?.name;

  const city =
    profileData?.city?.name === "Unknown" ? "---" : profileData?.city?.name;

  return (
    <div className={`profile-container ${editable ? "editable" : ""}`}>
      {showSuccessMessage && (
        <div className="px-4 py-2 mt-4 text-center text-white bg-green-500 rounded">
          Cambios guardados exitosamente. Haga click en cancelar para salir del
          modo de edición.
          {goToTop()}
        </div>
      )}
      <section className="profile-header-container">
        <div className="profile-header">
          <figure className="profile-header-img-container">
            <Image
              src={profileData?.img || defaultImage}
              alt={profileData?.name}
              width={100}
              height={100}
            />
          </figure>
          <span className="profile-header-data">
            <span className="data-names-container">
              <h1 className="data-name">{profileData?.name}</h1>
              <h1 className="data-username">{profileData?.username}</h1>
            </span>
            <p className="data-id">#{profileData?._id}</p>
            <h1 className="data-email">{profileData?.email}</h1>
          </span>
        </div>

        <div className="data-edit-button-container">
          <button onClick={handleEditClick}>
            {editable ? (
              <p className="cancel-button">Cancelar</p>
            ) : (
              "Editar Perfil"
            )}
            <div
              className={`${
                editable ? "block" : "hidden"
              } absolute w-full h-full top-0 left-0`}
            >
              <ul className="circles-container">
                <li className="circle-1"></li>
                <li className="circle-2"></li>
                <li className="circle-3"></li>
              </ul>
            </div>
          </button>
        </div>
      </section>

      <div className={`profile-edit ${editable ? "" : "hidden"}`}>
        <EditProfileForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          editable={editable}
          setShowSuccessMessage={setShowSuccessMessage}
        />
      </div>

      <div className={`flex flex-col gap-10 ${editable ? "hidden" : "block"}`}>
        <div className="profile-links-container">
          <Link href="/orders">
            Mis pedidos
            <ShoppingBag size={25} className="profile-links-orders-icon" />
          </Link>
          <Link href="/cart">
            Mi carrito
            <ShoppingCartSimple
              size={25}
              className="profile-links-orders-icon"
            />
          </Link>
          <Link href="/favorites">
            Mis favoritos
            <Heart size={25} className="profile-links-orders-icon" />
          </Link>
        </div>

        <div className="profile-info-container">
          <section className="profile-info-personal">
            <h1 className="profile-info-orders-title">
              Información del perfil
            </h1>
            <ul className="profile-info-personal-data">
              <li>
                Nombre
                <p>{profileData?.name}</p>
              </li>
              <li>
                Apellido
                <p>{lastname}</p>
              </li>
              <li>
                Usuario
                <p>{profileData?.username}</p>
              </li>
              <li>
                Correo
                <p>{profileData?.email}</p>
              </li>
              <li>
                Dirección
                <p>{address}</p>
              </li>
              <li>
                Código Postal
                <p>{codeP}</p>
              </li>
              <li>
                Provincia
                <p>{province}</p>
              </li>
              <li>
                Ciudad
                <p>{city}</p>
              </li>
            </ul>
          </section>

          <section className="profile-info-orders">
            <span className="profile-info-orders-title">
              Pedidos realizados:
              <p className="underline">
                {Array.isArray(buys) && buys.length > 0 ? buys.length : 0}
              </p>
            </span>
            <span className="profile-info-orders-data">
              {Array.isArray(buys) && buys.length > 0 ? (
                buys.map((buy, index) => {
                  const totalText = buy.status ? "Total:" : "Total pendiente:";
                  return (
                    <div key={index} className="profile-info-orders-card">
                      <span>
                        Fecha:
                        <p>{formatDate(buy.fecha)}</p>
                      </span>
                      <span>
                        Articulos:
                        <p>{buy.items.length}</p>
                      </span>
                      <span>
                        Estado:
                        {buy.status ? (
                          <p className="profile-info-orders-completed">
                            Completado
                            <CheckCircle size={15} />
                          </p>
                        ) : (
                          <p className="profile-info-orders-pending">
                            Pendiente
                            <WarningCircle size={15} />
                          </p>
                        )}
                      </span>
                      <span>
                        {totalText}
                        <p>{priceFormatter.format(buy.amount)}</p>
                      </span>
                    </div>
                  );
                })
              ) : (
                <p className="profile-info-no-orders">No hay pedidos</p>
              )}
            </span>
            <Link href="/orders" className="profile-info-orders-button">
              Ir a pedidos
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
