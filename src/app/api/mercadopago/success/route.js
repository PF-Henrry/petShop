import { NextResponse } from "next/server";
import mercadopago from "mercadopago";
import OrderPatmets from "@/models/orderPaymet";
import { connectDB,conn } from "@/libs/mongodb";
export async function GET(request){
    try {
        if(!conn.isConnected) await connectDB()

        mercadopago.configure({
            access_token:"TEST-2888310693624060-010504-9f0a277f30e529f53801260e864633d8-1624877440"
        });

        
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.search);
        console.log(searchParams)
        const status = searchParams.get("status");
        const preference_id = searchParams.get("preference_id");
        const payment = searchParams.get("payment_id");

        if(!preference_id) throw TypeError('Error preference_id is null');

        const findOrder = await OrderPatmets.findOne({orderID:preference_id});

        if(!findOrder) throw TypeError('Error order id not found');

        if(status === "approved"){
           const findPaymet = await mercadopago.payment.findById(payment);
            const amount = findPaymet?.body.transaction_amount;
            await findOrder.changeStatus();
            if(amount) await findOrder.addTotalAmount(amount);

           const urlfront = process.env.NEXT_URL_FRONT || 'http://localhost:3000/'

           const redirec = new URL(urlfront);

           return NextResponse.redirect(redirec);
        }


    
            return NextResponse.json({message:'success'},{status:200})
    } catch (error) {
        return NextResponse.json(error.message,{status:400})
    }
    
}