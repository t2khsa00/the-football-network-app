import { fetchData } from '../services/apiFootballService.js';
import { withCacheAndSocket } from '../utils/cacheWrapper.js';

const getFixtures = async (req, res) => {
  const { league, season } = req.query;

  if (!league || !season) {
    return res.status(400).json({ error: "Missing league or season" });
  }

  // Use consistent parameter names (league, season)
  const cacheKey = `fixtures_${league}_${season}`;

  try {
    // Use our helper to check cache and then fetch data if needed.
    const fixturesData = await withCacheAndSocket(
      cacheKey,
      async () => {
        // Fetch data from the API
        return await fetchData('/fixtures', {
          league,
          season: season || 2024,
        });
      },
      req,
      'fixturesUpdate' // Socket event name to emit updates
    );
    res.json(fixturesData);
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    res.status(500).json({ error: 'Failed to fetch fixtures' });
  }
};

export { getFixtures };
