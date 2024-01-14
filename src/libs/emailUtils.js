import { Resend } from 'resend';

const resend = new Resend('re_UrwqDCWg_EJ2ktxQJCpazphSjqFQtJpeQ');

export async function sendEmail(email, password, username) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Kimey <onboarding@resend.dev>',
      to: [email],
      subject: `Biendenivio a Kimey ${username}`,
      html: `<strong>Biendenido</strong>
      Te damos la biendenida a nuestro Petshop, en el podras encontrar todos los productos para tu amimgo/a<br>
      desde la pagina podes loguearte cada vez que necesites algo o para consultar los productos disponibles<br>
      <strong>Email: </strong>${email}<br>
      <strong>Password: </strong>${password}`,
    })

    if(error) {
      console.error( 'Error al enviar el correo', error );
      return { error: 'Error al enviar el correo' }
    }
    console.log('Correo enviado correctamente', data);
    return { data };
  } catch (error) {
    console.error('Error al enviar el correo', error);
    return { error: 'Error interno del servidor' };
  }
}