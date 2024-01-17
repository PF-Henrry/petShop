import { NextResponse } from "next/server";
import { guardarEnJSON ,leerDesdeJSON} from "@/libs/handleJSON";
import Products from "@/models/products";
import { conn, connectDB } from "@/libs/mongodb";
import { getServerSession } from "next-auth/next"
import Users from "@/models/users";


export async function GET(){ 
    try {
        if(!conn.isConnected) await connectDB();
        const session = await getServerSession();
        if(!session) throw TypeError('Unauthorized access');

         const findUser = await Users.findOne({email:session.user.email});

        if(findUser?.role !== 2) throw TypeError('Unauthorized access');
           const findAllProducts = await Products.find({ }).populate("category",{
            _id:0,
            name:1
        })
        .populate("species",{
            _id:0,
            name:1,
        })
        .populate("brand",{
            _id:0,
            name:1
        });

           if(!findAllProducts.length) throw TypeError('No se encontraron resultados');
           
            guardarEnJSON(findAllProducts,"Products.json");

           const datos = leerDesdeJSON("Products.json");
           return NextResponse.json(datos,{status:200})

    } catch (error) {
        return NextResponse.json(error.message,{status:400})
    }

}