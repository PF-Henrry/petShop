import { NextResponse } from "next/server";
import { addUser } from "@/libs/createUserWithRelation";
import { connectDB, conn } from "@/libs/mongodb";
import userDB from '@/models/users';
import { PASSWORD_CHECKED } from "@/utils/regex";


export async function GET(request){  //         /api/users [GET]

try {

if(!conn.isConnected) connectDB();    
const users = await userDB.find({}, {password: 0})
.populate("province",{
  name:1
})
.populate("city",{
  name:1
})


return NextResponse.json(users, {
  status:200
})

} catch (error){
    return NextResponse.json({mensaje: "Algo salió mal"}, {
        status: 405
    })
}
}


export async function POST(request){
  try {
    if(!conn.isConnected) connectDB()
    console.log('entro aca')
    const dataUser = await request.json()
    const newUser = await addUser(dataUser)
    // await newUser.save()
    const findUser = await userDB.findOne({_id:newUser._id})
    .populate("province",{
      name:1
    })
  .populate("city",{
      name:1
  })
    if(findUser) return NextResponse.json(findUser,{
      status:200
   })

  } catch(error){
    return NextResponse.json({mensaje: error.message}, {
      status: 404
  })
  }
}

