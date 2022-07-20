import { NextApiRequest, NextApiResponse } from 'next';

function id (req: NextApiRequest, res: NextApiResponse) {
  const {method, query} = req;

  switch (method) {
    case 'GET':
      return res.status(200).json(`getting note with id: ${query}`);
    case 'PATCH':
      return res.status(200).json(`updating note with id: ${query}`);
    case 'DELETE':
      return res.status(200).json(`deleting note with id: ${query}`);
    default:
      return res.status(400).json('method not allowed')
  }
}

export default id;