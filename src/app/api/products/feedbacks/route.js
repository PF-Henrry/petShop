import { NextResponse } from "next/server";
import { connectDB,conn } from "@/libs/mongodb";
import FeedBacks from "@/models/feedbacks";
import { Types } from "mongoose";

export async function GET(request, {params}){
    try {
        

        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.search);
        const id = searchParams.get('id')
     
        if(!id) throw TypeError('Id is undefined');
        if(!conn.isConnected) await connectDB();
        const idProduct = new Types.ObjectId(id);     
        const findFeedProduct = await FeedBacks.findOne({productId:idProduct}).populate('feed.userID',{
            name:1,
            lastname:1,
            _id:1,
            img:1,
            province:1,
            city:1,
        });

        if(!findFeedProduct) throw TypeError('Feed is not found');

        return NextResponse.json(findFeedProduct,{status:200});

    } catch (error) {
        return NextResponse.json(error.message,{status:400})
    }
}


export async function POST(request){
    try {
        const data = await request.json();
        if(!conn.isConnected) await connectDB();
        const {userID,idProduct,text,rating} = data;
    
        if(userID && idProduct && text){
            const findFeedBacks = await FeedBacks.findOne({productId:idProduct});

            if(!findFeedBacks){
                console.log('entro a la creacion del feedback')
                const newFeed = await FeedBacks.create(
                    {
                        productId: new Types.ObjectId(idProduct),
                        feed:[{
                            userID: new Types.ObjectId(userID),
                            text,
                            rating: parseInt(rating)
                        }]
                    })
                    newFeed.save();
                    return NextResponse.json(newFeed,{status:200});
            } else {

               const feedback = await FeedBacks.findOneAndUpdate({productId:idProduct},
                { $push: {
                    feed:{
                        userID: new Types.ObjectId(userID),
                        text,
                        rating: parseInt(rating)
                    } 
                 } },
                { new: true })

                if(!feedback) throw TypeError('Error')
                 
                return NextResponse.json(feedback,{status:200});
            }


    
        } else throw TypeError('Invalid params');
        
    } catch (error) {
        return NextResponse.json(error.message,{status:400})
    }
}