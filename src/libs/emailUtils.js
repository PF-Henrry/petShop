import { Resend } from 'resend';
import banner from '@/public/assets/banner _catalogo.png';

const resend = new Resend('re_UrwqDCWg_EJ2ktxQJCpazphSjqFQtJpeQ');

export async function sendEmail(email, username) {
  try {
    console.log(email,username)
    const { data, error } = await resend.emails.send({
      from: 'Kimey <onboarding@resend.dev>',
      to: ["adnmtz1987@gmail.com",email],
      subject: `Bienvenido a Kimey ${username}`,
      html: `<img width="450" heigth="350" src="https://res.cloudinary.com/kimeipetshop/image/upload/v1705521633/vxro8pzcokjoissrlzjh.webp">
      <div style="color: #333333; padding: 16px; margin-top: 20px;">
    <p style="font-size: 18px; margin-bottom: 12px;">¡Gracias por unirte a nuestra familia!</p>
    <p style="font-size: 16px;">Ahora lo único que tienes que hacer es echar un vistazo a nuestras ofertas</p>
    <p style="font-size: 16px;">y disfrutar de la mejor calidad en productos para tu amigo peludo desde la comodidad de tu casa.</p>
    <a href="https://pet-shop-peach.vercel.app/" style="background-color: #FBECE7; color: #333333; padding: 8px 16px; border-radius: 4px; text-decoration: none; display: inline-block; margin-top: 20px;">Ir a Kimey</a>
  </div>
  <p style="margin-top: 20px;"><strong>Email: </strong>${email}</p>`,
    })
   

    if(error) {
      console.error( "Error al enviar el correo", error );
      return { error: 'Error al enviar el correo' }
    }
    console.log('Correo enviado correctamente', data);
    return { data };
  } catch (error) {
    console.error('Error al enviar el correo', error);
    return { error: 'Error interno del servidor' };
  }
}