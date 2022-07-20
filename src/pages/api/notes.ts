import {NextApiRequest, NextApiResponse} from 'next';

function notes(req: NextApiRequest, res: NextApiResponse) {
  return res.json('notes');
}

export default notes;