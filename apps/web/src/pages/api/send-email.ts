import type { NextApiRequest, NextApiResponse } from "next";

import { sendEmail } from "@/features/SendEmail/send";

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
