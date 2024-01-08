'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import MyActivity from "@/components/MyActivity/MyActivity";

function Orders(){
    const {data:session , status } = useSession();
    const router = useRouter();
    if(status!=='authenticated') router.push('/login');
    const id = session?.user?.id


    return (
        <>
        <h1>
            Actividad: 
            <MyActivity id={id} />
        </h1>
        </>
    )
}


export default Orders