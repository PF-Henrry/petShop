import { NextResponse } from "next/server";
import { addUser } from "@/libs/createUserWithRelation";
import { URL_CHECKED,EMAIL_CHEKED,PASSWORD_CHECKED } from "@/utils/regex";


export async function POST(request) {
  const dataUser = await request.json();
   const {email,password,img} = dataUser;
   let errors = {};
 
  try {


    if(!email || !password || !img) throw TypeError('Email or Password or Image is invalid')
    
    else{
      
      //  if(!EMAIL_CHEKED.test(email)) {
      //   errors.email = 'Email is invalid'
      //  }
      //  if(!PASSWORD_CHECKED.test(password)){
      //   errors.password = 'Password is invalid'
      //  }
      //  if(!URL_CHECKED.test(img)){
      //    errors.image = 'Image url is invalid'
      //  }
       
       
       if(Object.keys(errors).length) return NextResponse.json({Error:{...errors}},{status:400})
       const res = await addUser(dataUser)
        return NextResponse.json({
            message:'User is created',
            userid: res._id
           },{
            status:200
        });
      }
       
    



  } catch (error) {
    console.log(error)
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
