import type { NextApiRequest, NextApiResponse } from "next";

import { transporter } from "./nodemailer";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    res.status(404).json({ message: "NOT FOUND" });

    return;
  }

  const { message } = JSON.parse(req.body);

  try {
    await sendEmail({ message });

    res.status(200).json({ message: "SUCCESS" });
  } catch (error) {
    throw error;
  }
}

interface EmailOptions {
  message: string;
}

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
