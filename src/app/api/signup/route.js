import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/users";
import { encrypt } from "@/libs/crypt";

export async function POST(request) {
  const dataUser = await request.json();

  try {
    connectDB();
    const findUser = await User.findOne({ email: dataUser.email });
    if (findUser) throw TypeError('user already exists');
    const passwordEncrypt = await encrypt(dataUser.password);

    const newUser = new User({...dataUser,password:passwordEncrypt});
    const saveUser = await newUser.save();

    return NextResponse.json({
        message:'User is created',
        saveUser // para probar
    },{
        status:200
    })

  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
