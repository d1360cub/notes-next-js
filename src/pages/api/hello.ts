// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from 'src/utils/database';

type Data = {
  time: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await connectDB.query('SELECT NOW()');
  res.status(200).json({ time: response.rows[0].now });
}
