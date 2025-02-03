import { fetchData } from '../../services/apiFootballService.js';
import { fetchAllPages } from '../../utils/helpers.js';

const getTopPlayersByGoals = async (req, res) => {
  const { league, season } = req.query;
  if (!league || !season) {
    return res.status(400).json({ error: "Missing league or season" });
  }
  try {
    const allPlayers = await fetchAllPages(fetchData.bind(null, '/players'), { league, season });
    const playersWithGoals = allPlayers
      .filter(player => player.statistics[0]?.goals?.total !== null)
      .sort((a, b) => b.statistics[0].goals.total - a.statistics[0].goals.total)
      .slice(0, 10);
    res.json(playersWithGoals);
  } catch (error) {
    console.error('Error fetching top goals:', error);
    res.status(500).json({ error: 'Failed to fetch top goals' });
  }
};

export { getTopPlayersByGoals };