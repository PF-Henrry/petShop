import { NextResponse } from "next/server";
import species from "@/models/species";
import category from "@/models/category";
import { connectDB, conn } from "@/libs/mongodb";


export async function GET(){
    try {
        
        if(!conn.isConnected) await connectDB();

        const Allcategory = await category.find({});
        const Allspecie = await category.find({});

        const result = {category: [...Allcategory], specie: [...Allspecie]}
        
        return NextResponse.json(result,{status:200});
    } catch (error) {
        return NextResponse.json(error.message,{status:400});
    }
}