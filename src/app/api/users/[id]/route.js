import { NextResponse } from "next/server"

import { connectDB, conn } from "@/libs/mongodb";
import userDB from '@/models/users';
import { PASSWORD_CHECKED } from "@/utils/regex";

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

            const { password, ...dataSinPass } = data

            if(data.password){
                if(!PASSWORD_CHECKED.test(data.password)){

                    return NextResponse.json({ mensaje: "El password no cumple con las validaciones."},{
                        status:400
                    })
                }

                const usuarioActualizado = await userDB.findByIdAndUpdate(_id, dataSinPass, {
                    new: true,
                    runValidators: true,
                  });

                const newpass = await userDB.findById(_id)
                newpass.password = data.password;
                newpass.save();

            } else {
                const usuarioActualizado = await userDB.findByIdAndUpdate(_id, data, {
                    new: true,
                    runValidators: true,
                  });
            }

            return NextResponse.json({ mensaje: "Usuario actualizado correctamente"},{
                status:200
            })

        } catch (error) {
            return NextResponse.json({ mensaje: "Hubo un error en las validaciones"},{
                status:404
            })
        }
    }