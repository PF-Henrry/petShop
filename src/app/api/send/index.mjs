import { Resend } from 'resend';

const resend = new Resend({apiKey: process.env.RESEND_API_KEY});

await resend.emails.send({
    from: 'Kimey <onboarding@resend.dev>',
    to: ['adnmtz1987@gmail.com'],
    subject: 'Hola, Bienvenido a Kimey',
    html: '<strong>Funciona?</strong><br>Seguro<br>probando con key en .env'
});