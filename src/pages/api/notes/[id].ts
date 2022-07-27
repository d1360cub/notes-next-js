import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from 'src/utils/database';

async function id(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;

  switch (method) {
    case 'GET':
      try {
        const getQuery = 'SELECT * FROM notes WHERE id = $1';
        const values = [query.id];
        const response = await connectDB.query(getQuery, values);

        if (!response.rows.length) {
          return res.status(404).json(`Note with id: ${values} not found`);
        } else {
          return res.status(200).json(response.rows);
        }
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    case 'PUT':
      try {
        const { title, content } = body;
        const getQuery =
          'UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *';
        const values = [title, content, query.id];
        const response = await connectDB.query(getQuery, values);

        if (!response.rows.length) {
          return res.status(404).json(`Note with id: ${values[2]} not found`);
        } else {
          return res.status(200).json(response.rows);
        }
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    case 'DELETE':
      try {
        const getQuery = 'DELETE FROM notes WHERE id = $1 RETURNING *';
        const values = [query.id];
        const response = await connectDB.query(getQuery, values);

        if (!response.rows.length) {
          return res.status(404).json(`Note with id: ${values} not found`);
        } else {
          return res.status(200).json(response.rows);
        }
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    default:
      return res.status(400).json('method not allowed');
  }
}

export default id;
