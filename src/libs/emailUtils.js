import { Resend } from 'resend';

const resend = new Resend('re_UrwqDCWg_EJ2ktxQJCpazphSjqFQtJpeQ');

export async function sendEmail() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Kimey <onboarding@resend.dev>',
      to: ['adnmtz1987@gmail.com', 'nobileevelyn1@gmail.com'],
      subject: 'Hello World!',
      html: '<strong>Funciona!!</strong>',
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