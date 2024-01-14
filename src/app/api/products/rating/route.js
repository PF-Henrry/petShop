import { NextResponse } from "next/server";
import { connectDB,conn } from "@/libs/mongodb";
import FeedBacks from "@/models/feedbacks";
import { Types } from "mongoose";


export async function GET(request){
    try {
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.search);
        const id = searchParams.get('id');
        
        if(!id) throw TypeError('Id product not found');

        if(!conn.isConnected) await connectDB();

        const idProduct = new Types.ObjectId(id);

        const findAllFeed = await FeedBacks.findOne({productId: idProduct});

        if(!findAllFeed) throw TypeError('Product not found');

        if(!findAllFeed.feed || findAllFeed.feed.length === 0) {
            throw TypeError('Product does not contain sufficient rating');
        }

        let totalRating = findAllFeed.feed.reduce(function(sum, data) {
            return sum + data.rating;
        }, 0);

        const average = totalRating / findAllFeed.feed.length;

        return NextResponse.json({ average }, { status: 200 });
    } catch (error) {
        return NextResponse.json(error.message, { status: 400 });
    }
}
