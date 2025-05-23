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

export const sendEmail = async (to: string, subject: string) => {
  const info = await transporter.sendMail({
    from: `"Mi App" <${process.env.EMAIL_USER}>`,

    to,
    subject : `BIENVENIDO A LA APP 
    ESPERAMOS QUE SEA CONFORTANTE TU ESTANCIA ${subject}`
    
  });
  console.log("email enviado", info.messageId);
};
