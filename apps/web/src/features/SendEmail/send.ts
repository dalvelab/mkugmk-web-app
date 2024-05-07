import nodemailer from "nodemailer";

interface EmailOptions {
  message: string;
}

export async function sendEmail(options: EmailOptions) {
  const transporter = nodemailer.createTransport({
    // @ts-ignore
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER_LOGIN,
      pass: process.env.SMTP_USER_PASSWORD,
    },
  });

  const message = {
    from: `MKUGMK - заявка на звонок <${process.env.SMTP_USER_LOGIN}>`,
    to: process.env.EMAIL_FOR_CALL_ORDERS,
    subject: "MKUGMK - заявка на звонок",
    text: options.message,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
}
