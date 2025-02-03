import { fetchData } from '../../services/apiFootballService.js';
import { fetchAllPages } from '../../utils/helpers.js';

const getTopPlayersByAppearances = async (req, res) => {
  const { league, season } = req.query;
  if (!league || !season) {
    return res.status(400).json({ error: "Missing league or season" });
  }
  try {
    const allPlayers = await fetchAllPages(fetchData.bind(null, '/players'), { league, season });
    const playersWithAppearances = allPlayers
      .filter(player => player.statistics[0]?.games?.appearences !== null)
      .sort((a, b) => b.statistics[0].games.appearences - a.statistics[0].games.appearences)
      .slice(0, 10);
    res.json(playersWithAppearances);
  } catch (error) {
    console.error('Error fetching top appearances:', error);
    res.status(500).json({ error: 'Failed to fetch top appearances' });
  }
};

export { getTopPlayersByAppearances };
