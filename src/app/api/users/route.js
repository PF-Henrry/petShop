import { NextResponse } from "next/server";
import { addUser } from "@/libs/createUserWithRelation";
import { connectDB, conn } from "@/libs/mongodb";
import userDB from '@/models/users';


export async function GET(request){ 

  try {
  
  if(!conn.isConnected) connectDB();    
  const users = await userDB.find({ }, {password: 0,token:0})
  
  if(users.length === 0) {
    return NextResponse.json({mensaje: "No se encontró ningún usuario"}, {
      status: 405
  })
  }
  
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
    const dataUser = await request.json()
    const newUser = await addUser(dataUser)
    const findUser = await userDB.findOne({_id:newUser._id})
    if(findUser) return NextResponse.json(findUser,{
      status:200
   })

  } catch(error){
    return NextResponse.json({mensaje: error.message}, {
      status: 404
  })
  }
}
