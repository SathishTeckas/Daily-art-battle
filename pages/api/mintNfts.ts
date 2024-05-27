import { NextApiRequest, NextApiResponse } from 'next';
import { countVotesAndUpdateBattle } from '../../utils/countVotesAndBattles';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
        await countVotesAndUpdateBattle();
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
