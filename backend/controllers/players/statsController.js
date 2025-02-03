import { fetchData } from '../../services/apiFootballService.js';

const getPlayerStats = async (req, res) => {
  const { playerId, season, league } = req.query;
  if (!playerId || !season || !league) {
    return res.status(400).json({ error: "Missing playerId, league, or season" });
  }
  try {
    const playerStats = await fetchData('/players', {
      id: playerId,
      season,
      league,
    });
    res.json(playerStats);
  } catch (error) {
    console.error('Error fetching player stats:', error);
    res.status(500).json({ error: 'Failed to fetch player stats' });
  }
};

export { getPlayerStats };
