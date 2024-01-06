import { NextResponse } from "next/server"
import { iniciarIntervalo } from "@/app/api/softDelete/softDeleteUsers"
import { connectDB, conn } from "@/libs/mongodb";
import userDB from '@/models/users';
import { PASSWORD_CHECKED } from "@/utils/regex";
import { postImage } from "@/libs/cloudinary";
import Provinces from '@/models/provinces';
import { findOrCreateModel } from "@/libs/dbmethods";
import Citys from "@/models/city";

export async function DELETE(request, {params}) {
    try {
        if(!conn.isConnected) connectDB();

        

       const _id = params.id

       await userDB.findOneAndUpdate(
        { _id: _id },
        {
            $set: {
            active: false,
            updatedAt: new Date()
        }
    },
        {new: true}
      );

      const datosInactivos = await userDB.find({ active: false })

      if(datosInactivos.length === 1){
        iniciarIntervalo();
      }

        // const deleteUser = await userDB.findByIdAndDelete(_id);

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
        // const findUser = await userDB.findOne({_id:_id},{password:0});
        const findUser = await userDB
            .findOne({ _id: _id, active: true }, { password: 0 })
            .populate('city', '_id name') 
            .populate('province', '_id name'); 

        if(findUser) return NextResponse.json(findUser,{status:200})
        throw Error('User no encontrado');
    } catch (error) {
        return NextResponse.json(error.message,
            {status:400})
    }
}


export async function PUT(request, {params}) {
    try {
        if (!conn.isConnected) connectDB();
        const idUser = params.id
        const data = await request.json()
        const {password, dataSinPass} = data;
        const findUser = await userDB.findOne({_id: idUser, active: true});

        console.log('Datos recibidos del cliente:', data);

        if (findUser) {
            const newImagen = await postImage(dataSinPass.img, idUser);
            if (password) {
                findUser.password = password;
                await findUser.save();
            }

            if (dataSinPass && newImagen) {
                if (dataSinPass.hasOwnProperty('province')) {
                    const newProvince = await findOrCreateModel(Provinces, {name: dataSinPass.province});
                    dataSinPass.province = newProvince._id;
                }
                if (dataSinPass.hasOwnProperty('city')) {
                    const newCity = await findOrCreateModel(Citys, {name: dataSinPass.city});
                    dataSinPass.city = newCity._id;
                }

                dataSinPass.img = newImagen.url;

                const result = await userDB.findOneAndUpdate(
                    {_id: idUser},
                    {$set: {...dataSinPass}},
                    {new: true} 
                );

                console.log('Datos actualizados en la base de datos:', result);

                if (result) return NextResponse.json(result, {status: 200});
            }
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json(err.message, {status: 400});
    }
}
