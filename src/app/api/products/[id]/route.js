import { NextResponse } from "next/server";
import {conn,connectDB} from "@/libs/mongodb"
import Products from "@/models/products"
// obtener producto por id.

export async function GET(request,{params}) {
    try {
        const id =  params.id
        
        if(!conn.isConnected) connectDB();

        const queryProduct = await Products.findById(id)
        .populate("category",{
            _id:0,
            name:1
        })
        .populate("specie",{
            _id:0,
            name:1,
            age:1,
            size:1,
        })
        .populate("brand",{
            _id:0,
            name:1
        });



        if(!queryProduct) throw TypeError('Product not found');


        return NextResponse.json({queryProduct},{status:200})
        
    } catch (error) {
        return NextResponse.json(error.message,{status:404})
    }
   
}