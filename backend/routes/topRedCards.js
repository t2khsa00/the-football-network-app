import express from 'express';
import { fetchCards } from '../services/apiService.js';

const router = express.Router();

// Fetch top red cards for a specific season
router.get('/:seasonId', async (req, res) => {
  try {
    const { seasonId } = req.params;
    const topRedCards = await fetchCards(seasonId);
    res.json(topRedCards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top red cards' });
  }
});

export default router;