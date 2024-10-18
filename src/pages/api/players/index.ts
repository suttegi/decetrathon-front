import { NextApiRequest, NextApiResponse } from 'next';
import { playerApi } from '@/utils/api';
import { ApiError } from '@/utils/api';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, age, position } = req.body; 
  if (!name || !age || !position) {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  try {
    const response = await playerApi.createOrGet(req.body);
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.status).json({ message: error.message });
    }
    console.error(error); // Log unexpected errors
    return res.status(500).json({ message: 'Internal server error' });
  }
}
