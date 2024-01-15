import { Resend } from 'resend';
import banner from '@/public/assets/banner _catalogo.png';

const resend = new Resend('re_UrwqDCWg_EJ2ktxQJCpazphSjqFQtJpeQ');

export async function sendEmail(email, username) {
  try {
    console.log(email,username)
    const { data, error } = await resend.emails.send({
      from: 'Kimey <onboarding@resend.dev>',
      to: ["adnmtz1987@gmail.com",email],
      subject: `Biendenivio a Kimey ${username}`,
      html: `<img width="400" heigth="350" src="https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg"><br>
      Bienvenido a nuestro Petshop, en el podras encontrar todos los productos para tu amigo\/a<br>
      desde la pagina podes logearte cada vez que necesites algo o para consultar los productos disponibles<br>
      <strong>Email: </strong>${email}<br>`,
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