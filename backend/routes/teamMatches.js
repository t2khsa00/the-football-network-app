import { Router } from 'express';
import { fetchFromApiFootball } from '../services/apiService.js';

const router = Router();

router.get('/', async (req, res) => {
  const { teamId, leagueId, season } = req.query;

  if (!teamId || !leagueId || !season) {
    return res.status(400).json({ error: 'Missing required parameters: teamId, leagueId, season' });
  }

  try {
    const data = await fetchFromApiFootball('fixtures', {
      team: teamId,
      league: leagueId,
      season,
    });
    res.json(data);
  } catch (error) {
    console.error('Error fetching team matches:', error.message);
    res.status(500).json({ error: 'Failed to fetch team matches' });
  }
});

export default router;
