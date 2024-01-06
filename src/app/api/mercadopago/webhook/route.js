import { NextResponse } from "next/server";
import mercadopago from 'mercadopago';



export async function POST(request){
        try {
            mercadopago.configure({
                access_token:"TEST-2888310693624060-010504-9f0a277f30e529f53801260e864633d8-1624877440"
            });
            
            const url =  new URL(request.url);
            const searchParams =   new URLSearchParams(url.search);

            const type =   searchParams.get('type');
            const data =    searchParams.get('data.id');
            let resultado
            if(type === 'payment' && data){
                resultado =  await mercadopago.payment.findById(data)
            }  
            
           

            return NextResponse.json({status:204})

          



        } catch (error) {
            return NextResponse.json({ message: error.message}, {status: 400 });
        }
    }


    