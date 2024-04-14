import type { NextApiRequest, NextApiResponse } from 'next';

import { sendEmail } from '@/shared/utils/sendEmail';
 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  sendEmail({to: '', message: ''});

  res.status(200).json({ message: 'Hello from Next.js!' })
}