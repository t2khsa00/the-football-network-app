import { fetchData } from '../../services/apiFootballService.js';
import { fetchAllPages } from '../../utils/helpers.js';

const getTopPlayersByPasses = async (req, res) => {
  const { league, season } = req.query;
  if (!league || !season) {
    return res.status(400).json({ error: "Missing league or season" });
  }
  try {
    const allPlayers = await fetchAllPages(fetchData.bind(null, '/players'), { league, season });
    const playersWithPasses = allPlayers
      .filter(player => player.statistics[0]?.passes?.total !== null)
      .sort((a, b) => b.statistics[0].passes.total - a.statistics[0].passes.total)
      .slice(0, 10);
    res.json(playersWithPasses);
  } catch (error) {
    console.error('Error fetching top passes:', error);
    res.status(500).json({ error: 'Failed to fetch top passes' });
  }
};

export { getTopPlayersByPasses };
