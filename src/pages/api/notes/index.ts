import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from 'src/utils/database';

async function notes(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const query = 'SELECT * FROM notes';
        const response = await connectDB.query(query);
        return res.status(200).json(response.rows);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    case 'POST':
      try {
        const { title, content } = body;
        const query =
          'INSERT INTO notes(title, content) VALUES ($1, $2) RETURNING *';
        const values = [title, content];
        const response = await connectDB.query(query, values);
        return res.status(201).json(response.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    default:
      return res.status(400).json('method not allowed');
  }
}

export default notes;
