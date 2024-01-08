import { conn, connectDB } from "@/libs/mongodb";
import orderPaymet from "@/models/orderPaymet";
import { Types } from "mongoose";
import { NextResponse } from "next/server";



export async function GET(request,{params}){
    try {
      if(!conn.isConnected) await connectDB();
        const id = params.id;
        const orderID = new Types.ObjectId(id);
        const findOrder = await orderPaymet.findById(orderID)
        .populate('items',{
            _id:1,
            name:1,
            price:1,
            detail:1,
            image:1,
            stock:1
        })
        .populate('userID',{
            name:1,
            lastname:1,
            username:1,
            email:1,
            adress:1,
            _id:1
        })

        if(!findOrder) throw TypeError('Error id order no found');

        return NextResponse.json(findOrder,{status:200})
    } catch (error) {
        
        return NextResponse.json(error.message,{status:400})
    }

}