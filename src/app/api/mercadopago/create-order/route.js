
import mercadopago from 'mercadopago';
import { NextResponse } from 'next/server';
import users from '@/models/users';
import orderPaymet from '@/models/orderPaymet';
import { Types } from 'mongoose';
import { connectDB , conn } from '@/libs/mongodb';

export async function POST(request){
try {

    if(!conn.isConnected) await connectDB()

    mercadopago.configure({
        access_token:"TEST-2888310693624060-010504-9f0a277f30e529f53801260e864633d8-1624877440"
    });

    // data , para usar esta funcionalidad en local deben cambiar el url, por el que le de ngrok.exe

    const URL_BACK = process.env.NEXT_URL_BACK || "https://8679-181-167-128-66.ngrok-free.app";


    const dataRequest = await request.json();
    
    
     const {userID} = dataRequest
    
    
    
    const itemsProducts = dataRequest.products.map((product) => ({
        title:product.name,
        unit_price: product.price,
        currency_id:"ARS",
        quantity: product.count,
    }));
    
    
    const response = await mercadopago.preferences.create({
        items : [
            ...itemsProducts
        ],
        // back_urls:{
        //     success:`${URL_BACK}/api/mercadopago/success`,
        //     failure:`${URL_BACK}/api/mercadopago/failure`,
        //     pending:`${URL_BACK}/api/mercadopago/pending`,
        // },
        // notification_url: `${URL_BACK}/api/mercadopago/webhook`,
        // auto_return:"approved"
    });
    
    if(!response) throw TypeError('Error')

    console.log(response);

    const findUser = await users.findOne({_id:userID});

    const productsOrder = dataRequest.products.map(product => ({
        _id:  new Types.ObjectId(product._id)
    }))

    const newOrder = await orderPaymet.create({
        userID: findUser._id,
        status:false,
        amount:0,
        orderID:response.body.id,
        fecha:response.body.date_created,
        link: response.body.init_point,
        items:[...productsOrder]
    });

    newOrder.save();
    return NextResponse.json({url:response.body.init_point, id:response.body.id},{status:200})


} catch (error) {
    console.log(error)
    return new NextResponse({state:false, message: error.message},{status:400})
}



}