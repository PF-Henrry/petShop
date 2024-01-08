import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config({ path: './.env.local' });

console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY);

const resend = new Resend(process.env.RESEND_API_KEY);

(async function () {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['adnmtz1987@gmail.com'],
    subject: 'Hello World',
    html: '<strong>Funciona!!!! configuracion de dotenv y script modificado</strong>',
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
})();