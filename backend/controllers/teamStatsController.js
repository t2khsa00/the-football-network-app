import { fetchData } from '../services/apiFootballService.js';
import { withCacheAndSocket } from '../utils/cacheWrapper.js';

const getParticularTeamStats = async (req, res) => {
  const { league, season, team } = req.query;

  // Validate required parameters
  if (!league || !season || !team) {
    return res.status(400).json({
      error: 'Please provide league, season, and team parameters.',
    });
  }

  // Define a unique cache key
  const cacheKey = `teamStats_${league}_${season}_${team}`;

  try {
    // Use the withCacheAndSocket helper to fetch data with caching and optional socket emission.
    const formattedStats = await withCacheAndSocket(
      cacheKey,
      async () => {
        const data = await fetchData('/teams/statistics', { league, season, team });
        if (!data.response) {
          throw new Error('No team statistics found.');
        }
        const stats = data.response;
        
        // Map the API response to a structured object
        return {
          league: stats.league,
          team: stats.team,
          form: stats.form,
          fixtures: {
            played: stats.fixtures.played?.total ?? 0,
            wins: stats.fixtures.wins?.total ?? 0,
            draws: stats.fixtures.draws?.total ?? 0,
            losses: stats.fixtures.loses?.total ?? 0,
          },
          goals: {
            for: {
              total: stats.goals.for?.total ?? 0,
              average: stats.goals.for?.average || "N/A",
              minute: stats.goals.for?.minute || {},
              under_over: stats.goals.for?.under_over || {},
            },
            against: {
              total: stats.goals.against?.total ?? 0,
              average: stats.goals.against?.average || "N/A",
              minute: stats.goals.against?.minute || {},
              under_over: stats.goals.against?.under_over || {},
            },
          },
          cleanSheets: stats.clean_sheet?.total ?? 0,
          penalty: stats.penalty || {},
          lineups: stats.lineups || [],
          cards: stats.cards || {},
          shots: {
            total: stats.shots?.total ?? 0,
            onTarget: stats.shots?.on ?? 0,
          },
          possession: stats.possession || "N/A",
          passes: {
            total: stats.passes?.total ?? 0,
            accuracy: stats.passes?.accuracy || "N/A",
          },
          fouls: {
            committed: stats.fouls?.for ?? 0,
            drawn: stats.fouls?.against ?? 0,
          },
          offsides: stats.offsides?.total ?? 0,
          corners: stats.corners?.total ?? 0,
        };
      },
      req,
      'teamStatsUpdate'  // The event name to emit via WebSocket when data is refreshed
    );

    res.json(formattedStats);
  } catch (error) {
    console.error('Error fetching team statistics:', error);
    res.status(500).json({ error: 'Failed to fetch team statistics.' });
  }
};

export { getParticularTeamStats };
