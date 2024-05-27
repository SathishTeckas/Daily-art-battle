import type { NextApiRequest, NextApiResponse } from 'next';
import {createBattle} from '../../utils/battleSelection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
        case 'GET':
          const { queryType } = req.query;
          if(queryType =='battles'){
            const battles =  await createBattle();
            console.log(battles);
            return res.status(200).json(battles);
          }
      default:
        res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: "Server Error" });
  }
}
