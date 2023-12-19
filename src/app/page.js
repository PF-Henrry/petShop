'use client'

import { useEffect } from "react"
import toastNotify from '@/libs/toast';


export default function Home() {
  const {showNotify,ToastContainer} = toastNotify();

  useEffect(()=>{
    var toastMessage = localStorage.getItem('ToasNotify');


    if (toastMessage) {
      const toastParse = JSON.parse(toastMessage);
      showNotify(toastParse.type,toastParse.message)
      localStorage.removeItem('ToasNotify');
    }

  },[]);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>HOLA MUNDO</h1>
       
        <ToastContainer/>
    </main>
  )
}
