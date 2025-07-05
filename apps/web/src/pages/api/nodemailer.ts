import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  // @ts-ignore
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER_LOGIN,
    pass: process.env.SMTP_USER_PASSWORD,
  },
});
