import { SendOfferToEmailPayload } from "@/features/OfferToBuy/models";
import type { NextApiRequest, NextApiResponse } from "next";

import { transporter } from "./nodemailer";

type ResponseData = {
  message: string;
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "30mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    res.status(404).json({ message: "NOT FOUND" });

    return;
  }

  try {
    const { name, files, message } = JSON.parse(req.body);

    await sendOfferToEmail({ name, message, files });

    res.status(200).json({ message: "SUCCESS" });
  } catch (error) {
    throw error;
  }
}

function getFormattedTimeStamp() {
  const date = new Date();

  date.setHours(date.getHours() + 5);

  const isoDate = date.toISOString();

  const isoDateWithoutTimezone = isoDate.slice(0, isoDate.length - 5);

  return isoDateWithoutTimezone;
}

async function sendOfferToEmail(payload: SendOfferToEmailPayload) {
  const timestamp = getFormattedTimeStamp();

  const attachments = payload.files?.map((attachment) => {
    return {
      ...attachment,
      // @ts-ignore
      content: Buffer.from(attachment.content),
    };
  });

  const message = {
    from: `Музейный комплекс <${process.env.SMTP_USER_LOGIN}>`,
    to: process.env.EMAIL_FOR_CALL_ORDERS,
    subject: `#${timestamp} Предложение о закупке ${payload.name}`,
    text: payload.message,
    attachments,
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
