import { NextResponse } from "next/server";
import {conn,connectDB} from "@/libs/mongodb"
import Products from "@/models/products"
// obtener producto por id.

export async function GET(request,{params}) {
    try {
        const id =  params.id
         //asd

        if(!conn.isConnected) connectDB();

        const queryProduct = await Products.findOne({_id:id})
        .populate("category",{
            _id:1,
            name:1
        })
        .populate("species",{
            _id:1,
            name:1,
        })
        .populate("brand",{
            _id:1,
            name:1
        });




        if(!queryProduct) throw TypeError('Product not found');

        console.log(queryProduct)
        return NextResponse.json(queryProduct,{status:200})
        
    } catch (error) {
        return NextResponse.json(error.message,{status:404})
    }
   
}