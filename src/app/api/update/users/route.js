import { NextResponse } from "next/server";
import { connectDB, conn } from "@/libs/mongodb";
import userDB from '@/models/users';

//ANTES DE HACER UN POST HACER UN BACKUP DE LOS USERS, POR SI LA PROPIEDAD ES MAL TIPEADA

export async function POST(request) {
  try {
    if (!conn.isConnected) connectDB();

    console.log('You are on the update/post path');

    const properties = await request.json();
    const data = await userDB.find({});

    await userDB.deleteMany({});

    
    for (const entry of data) {
      
      entry._doc = { ...entry._doc, ...properties };
    }

    await userDB.insertMany(data)

    return NextResponse.json({ mensaje: "Changes made successfully" }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ mensaje: "Something went wrong" }, { status: 500 });
  }
}







