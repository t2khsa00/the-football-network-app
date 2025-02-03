import { fetchData } from '../../services/apiFootballService.js';
import { fetchAllPages } from '../../utils/helpers.js';

const getTopPlayersByAssists = async (req, res) => {
  const { league, season } = req.query;
  if (!league || !season) {
    return res.status(400).json({ error: "Missing league or season" });
  }
  try {
    const allPlayers = await fetchAllPages(fetchData.bind(null, '/players'), { league, season });
    const playersWithAssists = allPlayers
      .filter(player => player.statistics[0]?.goals?.assists !== null)
      .sort((a, b) => b.statistics[0].goals.assists - a.statistics[0].goals.assists)
      .slice(0, 10);
    res.json(playersWithAssists);
  } catch (error) {
    console.error('Error fetching top assists:', error);
    res.status(500).json({ error: 'Failed to fetch top assists' });
  }
};

export { getTopPlayersByAssists };
