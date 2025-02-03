import { fetchData } from '../../services/apiFootballService.js';
import { fetchAllPages } from '../../utils/helpers.js';

const getTopPlayersByDribbles = async (req, res) => {
  const { league, season } = req.query;
  if (!league || !season) {
    return res.status(400).json({ error: "Missing league or season" });
  }
  try {
    const allPlayers = await fetchAllPages(fetchData.bind(null, '/players'), { league, season });
    const playersWithDribbles = allPlayers
      .filter(player => player.statistics[0]?.dribbles?.success !== null)
      .sort((a, b) => b.statistics[0].dribbles.success - a.statistics[0].dribbles.success)
      .slice(0, 10);
    res.json(playersWithDribbles);
  } catch (error) {
    console.error('Error fetching top dribbles:', error);
    res.status(500).json({ error: 'Failed to fetch top dribbles' });
  }
};

export { getTopPlayersByDribbles };
