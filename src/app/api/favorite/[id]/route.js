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
        
        console.log('este es el formatID',formatID)
        const findFavoriteUser = await favorite.findOne({userID:id});
        if(!findFavoriteUser) throw TypeError('user favorite not found');
        
        
        const newFavorite = await favorite.findByIdAndUpdate(
            findFavoriteUser._id,
            { $pull: { products: formatID } },
            { new: true });


            const result = await favorite.findOne({userID:id}).populate({
                path: 'products',
                select: 'name price detail image _id',
                populate: {
                path: 'brand species category',
                select: 'name _id'}
              }).populate('userID',{
                  _id:1,
                  name:1
              });

        if(result) return NextResponse.json(result,{status:200})

        throw TypeError('Error inesperado.')

    } catch (error) {
        console.log(error.message)
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

    const idUser = new Types.ObjectId(id)


    const existingFavorite = await favorite.findOne({ userID: idUser, products: formatID });

   if(existingFavorite) throw TypeError('product id is repeat')

    const updateFavorite = await favorite.findOneAndUpdate(
         {userID: idUser},
        { $push: { products: formatID } },
        { new: true });


        const result = await favorite.findOne({userID:idUser}).populate({
            path: 'products',
            select: 'name price detail image _id',
            populate: {
            path: 'brand species category',
            select: 'name _id'}
          }).populate('userID',{
              _id:1,
              name:1
          });


     if(result) return NextResponse.json(result,{status:200})

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
    
    const idUser = new Types.ObjectId(id);
    const findUserFavorite = await favorite.findOne({userID:idUser}).populate({
      path: 'products',
      select: 'name price detail image active stock _id',
      populate: {
      path: 'brand species category',
      select: 'name _id'}
    }).populate('userID',{
        _id:1,
        name:1
    });


    if(findUserFavorite) return NextResponse.json(findUserFavorite,{status:200})

    throw TypeError('User favorite not found');

} catch (error) {
    return NextResponse.json(
        error.message,
        {status:400})
}

}