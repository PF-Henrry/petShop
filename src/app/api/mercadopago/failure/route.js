import { NextResponse } from "next/server";



export async function GET(request){
    try {
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.search);
        const urlfront = process.env.NEXT_URL_FRONT || 'http://localhost:3000/'

        const redirec = new URL(urlfront);

        return NextResponse.redirect(redirec);

    } catch (error) {
        return NextResponse.json(error.message,{status:400})
    }
    
}