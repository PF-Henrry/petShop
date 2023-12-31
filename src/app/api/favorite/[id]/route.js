import { NextResponse } from "next/server";
import { connectDB,conn } from "@/libs/mongodb";
import favorite from "@/models/favorite";
import { Types } from "mongoose";

export async function DELETE(request,{params}){
    try {
        if(!conn.isConnected) connectDB();
        const id =  new Types.ObjectId(params.id);
        const requestQuery = await request.json();
        const {productId} = requestQuery;
        const formatID = new Types.ObjectId(productId);

        const findFavoriteUser = await favorite.findOne({userID:id});
        if(!findFavoriteUser) throw TypeError('user favorite not found');
        
        
        const newFavorite = await favorite.findByIdAndUpdate(
            findFavoriteUser._id,
            { $pull: { products: formatID } },
            { new: true });


            const result = await favorite.findOne({userID:id})
            .populate('products',{
                name:1,
                _id:1})
            .populate('userID',{
                name:1
            });

        if(favorite) return NextResponse.json(result,{status:200})


    } catch (error) {
        return NextResponse.json(error.message,{status:400})
    }
}




export async function POST(request,{params}){
    try {
    if(!conn.isConnected) connectDB();

     const id =  params.id
     const requestQuery = await request.json();
     const {productId} = requestQuery;

     const formatID = new Types.ObjectId(productId);

    if(!id) throw TypeError('Id no proporcionada');
    
    const findFavoriteUser = await favorite.findOne({userID:id});

        if(!findFavoriteUser){
            const newFavorite = await favorite.create({userID:id,products:[]});
            newFavorite.save();
        }


    const updateFavorite = await favorite.findByIdAndUpdate(
         findFavoriteUser._id,
        { $push: { products: formatID } },
        { new: true });



        const result = await favorite.findOne({userID:id})
        .populate('products',{
            name:1,
            _id:1})
        .populate('userID',{
            name:1
        });


     if(favorite) return NextResponse.json({ok:true,result},{status:200})

     throw TypeError('Error inesperado.')

    } catch (error) {
        return NextResponse.json(
            error.message,
            {status:400})
    }

}




export async function GET(request,{params}) {

try {
    if(!conn.isConnected) connectDB();

    const id =  params.id

    if(!id) throw TypeError('Id no proporcionada');
    
    const findUserFavorite = await favorite.findOne({userID:id}).populate('products',{
        name: 1,
        _id:1,
        price:1,
        detail:1,
        image:1
    }).populate('userID',{
        name:1
    });

    if(findUserFavorite) return NextResponse.json(findUserFavorite,{status:200})

} catch (error) {
    return NextResponse.json(
        error.message,
        {status:400})
}

}