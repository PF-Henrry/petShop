"use client";

import { useEffect } from "react";
import toastNotify from "@/libs/toast";
import Carousel from "@/components/Carousel/Carousel";
import CategoryCards from "@/components/CategoryCards/CategoryCards";
import InfoCards from "@/components/InfoCards/InfoCards";
import UserRate from "@/components/UserRate/UserRate";

export default function Home() {
  const { showNotify, ToastContainer } = toastNotify();

  useEffect(() => {
    var toastMessage = localStorage.getItem("ToasNotify");

    if (toastMessage) {
      const toastParse = JSON.parse(toastMessage);
      showNotify(toastParse.type, toastParse.message);
      localStorage.removeItem("ToasNotify");
    }
  }, [showNotify]);

  const handleSendMailClick = async () => {
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        const result = await response.json();
        showNotify('success', 'Correo enviado correctamente');
        console.log('Correo enviado exitosamente desde la página');
      } else {
        console.error('Error al enviar el correo desde la página', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar el correo desde la página', error);
    }
  };

  return (
    <main className="main-container flex min-h-screen flex-col items-center justify-between px-28 py-0 gap-10">
      <ToastContainer />
      <Carousel />
      <CategoryCards />
      <InfoCards />
      <UserRate />
      <button onClick={handleSendMailClick}>
        Send Email
      </button>
    </main>
  );
}
