import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = async (to: string, name: string) => {
  const info = await transporter.sendMail({
    from: `"Mi App" <${process.env.EMAIL_USER}>`,

    to,
    subject: "bienvenido a la plataforma",
    text: `
      Hola ${name},
      Gracias por registrarte en nuestra aplicación.
      ¡Esperamos que disfrutes de la experiencia!
    `,
  });
  console.log("email enviado", info.messageId);
};
