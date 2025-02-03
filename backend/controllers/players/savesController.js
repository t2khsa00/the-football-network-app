import { fetchData } from '../../services/apiFootballService.js';
import { fetchAllPages } from '../../utils/helpers.js';

const getTopKeepersBySaves = async (req, res) => {
  const { league, season } = req.query;
  if (!league || !season) {
    return res.status(400).json({ error: "Missing league or season" });
  }
  try {
    const allPlayers = await fetchAllPages(fetchData.bind(null, '/players'), { league, season });
    const keepersWithSaves = allPlayers
      .filter(player => 
        player.statistics[0]?.goals?.saves !== null &&
        player.statistics[0]?.games?.position === "Goalkeeper"
      )
      .sort((a, b) => b.statistics[0].goals.saves - a.statistics[0].goals.saves)
      .slice(0, 10);
    res.json(keepersWithSaves);
  } catch (error) {
    console.error('Error fetching top saves:', error);
    res.status(500).json({ error: 'Failed to fetch top saves' });
  }
};

export { getTopKeepersBySaves };
