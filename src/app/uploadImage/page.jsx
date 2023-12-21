'use client'

import { useState } from "react"
import Image from "next/image";
import { useSession } from "next-auth/react";
import {  useRouter } from 'next/navigation';
import toastNotify from "@/libs/toast";

function UploadImage(){
    
    const {showNotify,ToastContainer} = toastNotify();

    const [url, setUrl] = useState({
        value:null
    });
    const [data,setData] = useState({})

    const router = useRouter();



    const { data: session, status } = useSession()

    

    const handleOnChange = (e) => {
        try {     
            if(e.target.files.length){
                const file = e.target.files[0];
                const reader = new FileReader();


                reader.onload = (event) => {
                    setUrl({value:event.target.result});
                  };
            
                  reader.readAsDataURL(file);
            } 
        } catch (error) {
            showNotify('error','Error al cargar imagen');
            console.log(error.message);
        }
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            if(url.value !== null){
                if (status === "authenticated"){
                  const response = await  fetch('/api/uploadImage',{
                        method:'POST',
                        headers:{
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            img:url.value,
                            accessToken: session.accessToken
                        })
                    }).then((res) => res.json())
                 console.log(response)
                }
                else router.push('/login');
                }
        } catch (error) {
            showNotify('error','Error al subir a cloudinary')
            console.log(error.message);
        }
    }

    return(

    <section>
      <form onSubmit={(e)=> handleOnSubmit(e)}>
        <input type="file" onChange={(e)=> handleOnChange(e)} />
        <div>
        {
            url.value && <Image src={url.value} alt='image_upload' width={300} height={200} />
        }
        </div>
        <button type="submit">Subir Imagen</button>
      </form>
      <ToastContainer/>
    </section>
    )
}


export default UploadImage