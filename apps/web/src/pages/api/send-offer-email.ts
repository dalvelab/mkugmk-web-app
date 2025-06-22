import type { NextApiRequest, NextApiResponse } from "next";

import { sendOfferToEmail } from "@/features/OfferToBuy/send-offer-email";

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

  const { name, files, message } = JSON.parse(req.body);

  try {
    await sendOfferToEmail({ name, message, files });

    res.status(200).json({ message: "SUCCESS" });
  } catch (error) {
    throw error;
  }
}
