import { isNotEmpty } from "@/shared";
import nodemailer from "nodemailer";
import { Attachment } from "nodemailer/lib/mailer";

interface EmailOptions {
  message: string;
}

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

export async function sendEmail(options: EmailOptions) {
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

interface SendOfferToEmailPayload {
  name: string;
  message: string;
  files?: Attachment[];
}

function getFormattedTimeStamp() {
  const date = new Date();

  return date.toISOString();
}

export async function sendOfferToEmail(payload: SendOfferToEmailPayload) {
  const timestamp = getFormattedTimeStamp();

  const message = {
    from: `mkugmk <${process.env.SMTP_USER_LOGIN}>`,
    to: process.env.EMAIL_FOR_CALL_ORDERS,
    subject: `#${timestamp} ${payload.name}`,
    text: payload.message,
    attachments: isNotEmpty(payload.files) ? payload.files : undefined,
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
