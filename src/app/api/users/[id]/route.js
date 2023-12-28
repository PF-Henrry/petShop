import { NextResponse } from "next/server"

import { connectDB, conn } from "@/libs/mongodb";
import userDB from '@/models/users';
import { PASSWORD_CHECKED } from "@/utils/regex";
import { postImage } from "@/libs/cloudinary";

export async function DELETE(request, {params}) {
    try {
        if(!conn.isConnected) connectDB();

       const _id = params.id

        const deleteUser = await userDB.findByIdAndDelete(_id);

        return NextResponse.json({mensaje: "Usuario eliminado"},{status:200})

    } catch (error) {
        return NextResponse.json({mensaje: "Usuario no encontrado"}, {
            status:400
        })
    }
}

export async function GET(request,{params}){
    try {
        if(!conn.isConnected) connectDB()
        const _id = params.id
        const findUser = await userDB.findOne({_id:_id},{password:0});

        if(findUser) return NextResponse.json(findUser,{status:200})
        throw Error('User no encontrado');
    } catch (error) {
        return NextResponse.json(error.message,
            {status:400})
    }
}

export async function PUT(request, {params}){  //         /api/users [PUT]
    
        try {
            
            if(!conn.isConnected) connectDB();
            const _id = params.id
            const data = await request.json()
            const {password, dataSinPass} = data;
            const findUser = await userDB.findOne({_id:_id});

            if(findUser){
                
                const newImagen = await postImage(dataSinPass.img,_id);
                if(password){
                    findUser.password = password;
                    await findUser.save()
                }
                if(dataSinPass && newImagen){
                    const result = await userDB.findOneAndUpdate(
                        { _id: _id },
                        { $set: { ...dataSinPass, img: newImagen.url } },
                        { new: true }
                      );
                //    result.img = newImagen.url;
                //     result.save();
                  if(result) return NextResponse.json(result,{status:200});
                } 
            }


        }catch(err){
                return NextResponse.json(err.message,{status:400});
        }
    }