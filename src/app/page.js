"use client";

import { Suspense, useEffect } from "react";
import toastNotify from "@/libs/toast";
import Carousel from "@/components/Carousel/Carousel";
import CategoryCards from "@/components/CategoryCards/CategoryCards";
import InfoCards from "@/components/InfoCards/InfoCards";
import UserRate from "@/components/UserRate/UserRate";
import Loading from "./loading";

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
    <main className="flex flex-col items-center justify-between min-h-screen gap-10 py-0 main-container px-28">
      <ToastContainer />
      <Suspense fallback={<Loading />}>
        <Carousel />
        <CategoryCards />
        <InfoCards />
        <UserRate />
      </Suspense>
    </main>
  );
}
