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

  return (
    <main className="main-container flex min-h-screen flex-col items-center justify-between px-28 py-0 gap-10">
      <ToastContainer />
      <Carousel />
      <CategoryCards />
      <InfoCards />
      <UserRate />
     
    </main>
  );
}
