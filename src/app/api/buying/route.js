import { NextResponse } from "next/server";
import mercadopago from "mercadopago"

mercadopago.configure({
    access_token: process.env.NEXT_ACCESS_TOKEN
});

export async function POST(request){
    try {
        const products = await request.json();
        const items = products.map((product) => ({
            title: product.name,
            unit_price: Number(product.price),
            quantity: Number(product.quantity),
            currency_id: "ARS"
        }));

        const preference = {
            items:[
                ...items
            ],
            back_urls:{
                "success": "http:localhost:3000",
                "failure": "http:localhost:3000",
                "pending": "http:localhost:3000"
            },
            auto_return:"approved",
            notification_url: "http:localhost:3000/api/notify",
        };

        const respon = await mercadopago.preferences.create(preference)
	

        return NextResponse.json({url:respon.body.init_point},{status:200});
    } catch (error) {
        return NextResponse.json(error.message,{status:400})
    }
}