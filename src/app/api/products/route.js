import { NextResponse } from "next/server";
import { addProduct } from "@/libs/createProductWithRelation";
import products from "@/models/products";

export async function GET(request){

}

export async function POST(request){
    try {
         
        const dataProduct = await request.json();
        /*
         {
            name: "Correa",
            price:"3000",
            detail:"Correa para gato extendible,etc.",
            image:"http://google.com.ar",
            make:"Pichichu",
            discount:null,
            category:"Correa"
         }
        */
    
         const newProduct = await addProduct(dataProduct)
        
         const findProduct = await products.findOne({_id:newProduct._id}).populate('brand',{
            name:1,
            _id:0
         }).populate('category',{
            name:1,
            _id:0
         })

         if(findProduct) return NextResponse.json(findProduct,{
            status:200
         })
    } catch (error) {
        return NextResponse.json(error,{
            status:400
        })
    }
}

export function DELETE(request){

}

export function PUT(request){

}