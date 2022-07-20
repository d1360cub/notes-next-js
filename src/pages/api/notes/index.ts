import {NextApiRequest, NextApiResponse} from 'next';
import {connectDB} from './../../../utils/database';

async function notes(req: NextApiRequest, res: NextApiResponse)  {
  const {method, body} = req;

  switch (method) {
    case 'GET':
      return res.status(200).json('getting all notes');
      case 'POST':
        const {title, content} = body;
        const query = 'INSERT INTO notes(title, content) VALUES ($1, $2) RETURNING *';
        const values = [title, content];
        const response = await connectDB.query(query, values);
        return res.status(201).json(response.rows[0]);
    default:
      return res.status(400).json('method not allowed')
  }
}

export default notes;