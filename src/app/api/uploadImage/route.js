import { NextResponse } from "next/server";
import { postImage } from "@/libs/cloudinary";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { connectDB,conn } from "@/libs/mongodb";
import userDB from '@/models/users';

export async function POST(request){
const {NEXTAUTH_SECRET} = process.env
    try {
        const file =  await request.json();
        const session = await getServerSession();
        // const token = await getToken(request, NEXTAUTH_SECRET);

        console.log(session);
        if(!conn.isConnected) connectDB();
        const id = await userDB.findOne({email:session.email})._id;

        const res = await postImage(file.img,id);
        console.log(res)        
        return NextResponse.json(res.url,{status:200});

    } catch (error) {
        return NextResponse.json(error.message,
            {status:"400"})
    }
}