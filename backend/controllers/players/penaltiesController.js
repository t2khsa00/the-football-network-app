import { fetchData } from '../../services/apiFootballService.js';
import { fetchAllPages } from '../../utils/helpers.js';

const getTopPlayersByPenalties = async (req, res) => {
  const { league, season } = req.query;
  if (!league || !season) {
    return res.status(400).json({ error: "Missing league or season" });
  }
  try {
    const allPlayers = await fetchAllPages(fetchData.bind(null, '/players'), { league, season });
    const playersWithPenalties = allPlayers
      .filter(player => player.statistics[0]?.penalty?.scored !== null)
      .sort((a, b) => b.statistics[0].penalty.scored - a.statistics[0].penalty.scored)
      .slice(0, 10);
    res.json(playersWithPenalties);
  } catch (error) {
    console.error('Error fetching top penalties:', error);
    res.status(500).json({ error: 'Failed to fetch top penalties' });
  }
};

export { getTopPlayersByPenalties };
