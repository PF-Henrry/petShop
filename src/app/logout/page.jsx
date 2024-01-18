"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const data = await signOut({ redirect: false });

      if (data.error) {
        console.error("Error during logout:", data.error);
      } else {
        localStorage.removeItem("userData");
        router.push("/login");
      }
    } catch (error) {
      console.error("Unexpected error during logout:", error);
    }
  };

  const handleConfirm = () => {
    handleLogout();
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div
    className="flex items-center justify-center h-screen "
    style={{
      position: "relative",
      backgroundColor: "rgba(0, 0, 0, 0.5)", 
      zIndex: 1,
    }}
  >
      <div className="text-center flex flex-col items-center p-8 rounded shadow border border-gray-300 bg-customPrimary relative">
        <button
          onClick={handleCancel}
          className="absolute top-2 right-2  cursor-pointer"
        >
          ❌
        </button>
        <p className="mb-4 text-3xl  font-bold p-2">¿Ya te vas?</p>
        <div className="flex gap-4">
          <Button
            type="submit"
            variant="outlined"
            onClick={handleConfirm}
            style={{ borderColor: "grey" }}
            className={`text-black
                  py-2 px-4 rounded focus:outline-none focus:shadow-outline
                  active:shadow-md active:translate-y-1 block mx-auto  mt-8 hover:bg-customSecondary w-40 text-lg`}
          >
            Sí, Salir
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={handleCancel}
            style={{ borderColor: "grey" }}
            className={`text-black
                  py-2 px-4 rounded focus:outline-none focus:shadow-outline
                  active:shadow-md active:translate-y-1 block mx-auto  mt-8 hover:bg-customSecondary w-40 text-lg`}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
