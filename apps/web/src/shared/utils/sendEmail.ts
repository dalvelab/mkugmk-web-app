import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  message: string;
}

export async function sendEmail(options: EmailOptions) {
  const transporter = nodemailer.createTransport({
    host: "smtp.timeweb.ru",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.PASSWORD,
    },
  });

  console.log(process.env.SMTP_HOST);

  // const message = {
  //   from: "Fairhouse - заявка на расчет <notifications@fairhouse.ru>",
  //   to: process.env.EMAIL_TO,
  //   subject: "Fairhouse - заявка на расчет",
  //   text: options.message,
  // };

  // await transporter.sendMail(message);
};
