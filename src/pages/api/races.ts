import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../db/connection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('sci_fi_races_db');

    const races = await db.collection('races').find({}).toArray();
    res.json({ races: races.map(race => race.name) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred while fetching races' });
  }
}