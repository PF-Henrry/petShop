import { NextResponse } from "next/server";
import products from "@/models/products";
import mongoose from "mongoose";
import { connectDB,conn } from "@/libs/mongodb";
export async function POST(request){
   try {
      if(!conn.isConnected) connectDB()

      const data = await request.json();

      const {query} = data;

      
      if(!query) throw TypeError('Query is undefined');
      for(const prop in query){
         if(query[prop]?._id){
            query[prop]._id = new mongoose.Types.ObjectId(query[prop]._id);
         }
      }

      console.log(query)
      const res = await products.find({...query});
      if(!res) throw TypeError('Product is not found')
      return NextResponse.json(res,{...query});
   } catch (error) {
      return NextResponse.json(error.message,{status:400})
   }
}
