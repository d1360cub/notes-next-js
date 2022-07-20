import {NextApiRequest, NextApiResponse} from 'next';

function notes(req: NextApiRequest, res: NextApiResponse)  {
  const {method} = req;

  switch (method) {
    case 'GET':
      return res.status(200).json('getting all notes');
      case 'POST':
        return res.status(201).json('note created');
    default:
      return res.status(400).json('method not allowed')
  }
}

export default notes;