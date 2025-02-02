import express from 'express';
import axios from 'axios';

const router = express.Router();
const BASE_URL = 'https://api.sportmonks.com/v3/football/standings';

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        api_token: process.env.SPORTSMONK_API_KEY,
        include: 'participant,league',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;