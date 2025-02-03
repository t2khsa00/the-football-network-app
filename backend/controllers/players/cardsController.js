import { fetchData } from '../../services/apiFootballService.js';
import { fetchAllPages } from '../../utils/helpers.js';

const getTopPlayersByCards = async (req, res) => {
  const { league, season } = req.query;
  if (!league || !season) {
    return res.status(400).json({ error: "Missing league or season" });
  }
  try {
    const allPlayers = await fetchAllPages(fetchData.bind(null, '/players'), { league, season });
    const playersWithCards = allPlayers
      .filter(player => player.statistics[0]?.cards?.yellow !== null)
      .sort((a, b) => (b.statistics[0].cards.yellow + b.statistics[0].cards.red)
        - (a.statistics[0].cards.yellow + a.statistics[0].cards.red))
      .slice(0, 10);
    res.json(playersWithCards);
  } catch (error) {
    console.error('Error fetching top cards:', error);
    res.status(500).json({ error: 'Failed to fetch top cards' });
  }
};

export { getTopPlayersByCards };
