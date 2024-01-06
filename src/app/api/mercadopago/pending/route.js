const { NextResponse } = require("next/server");


export async function GET(request){
try {
    console.log(request)
    return NextResponse.json({status:200})
} catch (error) {
    console.log(error)
    return NextResponse.json(error.message, {status:400})
}
}


