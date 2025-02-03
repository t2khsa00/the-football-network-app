import { fetchData } from '../../services/apiFootballService.js';
import { fetchAllPages } from '../../utils/helpers.js';

const getTopPlayersByTackles = async (req, res) => {
  const { league, season } = req.query;

  if (!league || !season) {
    return res.status(400).json({ error: "Missing league or season" });
  }
  try {
    const allPlayers = await fetchAllPages(fetchData.bind(null, '/players'), { league, season });
    
    const playersWithTackles = allPlayers
      .filter((player) => player.statistics[0]?.tackles?.total !== null)
      .sort((a, b) => b.statistics[0].tackles.total - a.statistics[0].tackles.total)
      .slice(0, 10);

    res.json(playersWithTackles);
  } catch (error) {
    console.error('Error fetching top tackles:', error);
    res.status(500).json({ error: 'Failed to fetch top tackles' });
  }
};

export { getTopPlayersByTackles };
