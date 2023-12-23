import { NextResponse } from "next/server";

import { connectDB, conn } from "@/libs/mongodb";
import userDB from '@/models/users';
import { PASSWORD_CHECKED } from "@/utils/regex";

//tarea: hacer GET y DELETE, y hacer funcionar esa wea, NO HACER POST AUN
//GET por el momento que obtenga a todos normal

export async function GET(request){  //         /api/users [GET]

try {

if(!conn.isConnected) connectDB();    
const users = await userDB.find();

return NextResponse.json(users, {
  status:200
})

} catch (error){
    return NextResponse.json({mensaje: "Algo salió mal"}, {
        status: 405
    })
}
}


