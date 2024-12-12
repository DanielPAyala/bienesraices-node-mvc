import nodemailer from 'nodemailer';

const registrationEmail = async ({name, email, token}) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  await transport.sendMail({
    from: 'BienesRaices.com',
    to: email,
    subject: 'Confirma tu cuenta en BienesRaices.com',
    text: 'Confirma tu cuenta en BienesRaices.com',
    html: `
      <h1>Hola ${name}</h1>
      <p>Confirma tu cuenta en BienesRaices.com presionando el siguiente enlace</p>
      <a href="${process.env.SERVER_URL}:${process.env.SERVER_PORT}/auth/confirm-account/${token}">Confirmar cuenta</a>

      <p>Si no creaste una cuenta, ignora este mensaje</p>
    `
  });
};

export { registrationEmail };
