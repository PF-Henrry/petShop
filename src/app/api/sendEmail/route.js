import { NextResponse } from "next/server";
import { sendEmail } from '../../../libs/emailUtils';

export async function POST(req) {
  try {
    
    const { email, username } =  await req.json()
    const result = await sendEmail(email, username);
    return NextResponse.json({ message: 'Correo enviado exitosamente' });
  } catch (error) {
    console.error('Error al enviar el correo desde el backend', error);
    return NextResponse.error({ statusCode: 500, message: 'Error interno del servidor' });
  }
}