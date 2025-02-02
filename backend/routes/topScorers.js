import express from 'express';
import axios from 'axios';

const router = express.Router();
const BASE_URL = 'https://api.sportmonks.com/v3/football/topscorers';

router.get('/', async (req, res) => {
  try {
    const { season_id } = req.query; // Extract season_id from query params

    if (!season_id) {
      return res.status(400).json({ error: 'season_id is required' });
    }

    const response = await axios.get(BASE_URL, {
      params: {
        api_token: process.env.SPORTSMONK_API_KEY,
        include: 'player,team', // Include player and team details
        season_id: season_id, // Use the provided season_id (e.g., 23614)
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;