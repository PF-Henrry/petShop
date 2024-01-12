"use client";

import { useSession } from "next-auth/react";
import { useProductStore } from "@/hooks/usePages";
import { useEffect } from "react";




export default function FavoriteContext() {

    const updateFavorites = useProductStore((state) => state.updateFavorites);
    const {data:session, status} = useSession();
    const idUser = session?.user?.id
    
    useEffect(()=>{
        const getFavorite = async () => {
            if(status === 'authenticated'){
                 updateFavorites(idUser)
            }
        }

        getFavorite();
    },[status])

  return (
    <>
    </>
  );
}