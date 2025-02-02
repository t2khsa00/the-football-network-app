import express from 'express';
import { fetchCards } from '../services/apiService.js';

const router = express.Router();

// Fetch top yellow cards for a specific season
router.get('/:seasonId', async (req, res) => {
  try {
    const { seasonId } = req.params;
    const topYellowCards = await fetchCards(seasonId);
    res.json(topYellowCards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top yellow cards' });
  }
});

export default router;