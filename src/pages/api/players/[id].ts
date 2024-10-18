import { NextApiRequest, NextApiResponse } from 'next';
import { playerApi } from '@/utils/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;
  const { page = '1', limit = '20' } = req.query;

  try {
    if (typeof id === 'string' && id.includes(',')) {
      const playerIds = id.split(',').map(Number);
      const response = await playerApi.getPlayers(
        playerIds,
        Number(page),
        Number(limit)
      );
      return res.status(200).json(response);
    }

    const response = await playerApi.getPlayer(Number(id));
    return res.status(200).json(response);
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ message: 'Internal server error' }); 
  }
}
