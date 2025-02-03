import { fetchData } from '../../services/apiFootballService.js';
import { fetchAllPages } from '../../utils/helpers.js';

const getTopPlayersByShots = async (req, res) => {
  const { league, season } = req.query;
  if (!league || !season) {
    return res.status(400).json({ error: "Missing league or season" });
  }
  try {
    const allPlayers = await fetchAllPages(fetchData.bind(null, '/players'), { league, season });
    const playersWithShots = allPlayers
      .filter(player => player.statistics[0]?.shots?.total !== null)
      .sort((a, b) => b.statistics[0].shots.total - a.statistics[0].shots.total)
      .slice(0, 10);
    res.json(playersWithShots);
  } catch (error) {
    console.error('Error fetching top shots:', error);
    res.status(500).json({ error: 'Failed to fetch top shots' });
  }
};

export { getTopPlayersByShots };
