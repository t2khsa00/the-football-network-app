import { fetchData } from '../services/apiFootballService.js';
import { withCacheAndSocket } from '../utils/cacheWrapper.js';

const getStandings = async (req, res) => {
  const { league, season } = req.query;

  if (!league || !season) {
    return res.status(400).json({ error: "Missing league or season" });
  }

  const cacheKey = `standings_${league}_${season}`;

  try {
    const standingsData = await withCacheAndSocket(
      cacheKey,
      async () => {
        const response = await fetchData('/standings', {
          league,
          season: season || 2024,
        });

        if (!response.response || response.response.length === 0) {
          throw new Error('No standings found.');
        }

        // Reverse the form string for each team (if needed)
        const updatedResponse = response.response.map(item => {
          if (item.league && Array.isArray(item.league.standings)) {
            item.league.standings = item.league.standings.map(group =>
              group.map(team => {
                if (team.form && typeof team.form === 'string') {
                  team.form = team.form.split('').reverse().join('');
                }
                return team;
              })
            );
          }
          return item;
        });

        return updatedResponse;
      },
      req,
      'standingsUpdate' // Socket event name to emit updates
    );

    res.json(standingsData);
  } catch (error) {
    console.error('Error fetching standings:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch standings' });
  }
};

export { getStandings };
