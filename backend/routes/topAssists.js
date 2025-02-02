import express from 'express';
import { fetchTopScorers, fetchPlayerStatistics } from '../services/apiService.js';

const router = express.Router();

// Fetch top assists for a specific season
router.get('/:seasonId', async (req, res) => {
  try {
    const { seasonId } = req.params;

    // Step 1: Fetch top scorers for the season
    const topScorers = await fetchTopScorers(seasonId);
    console.log('Top Scorers:', topScorers); // Log top scorers

    // Step 2: Fetch statistics for each player and extract assists
    const playersWithAssists = await Promise.all(
      topScorers.map(async (player) => {
        try {
          const playerStats = await fetchPlayerStatistics(player.player_id);
          console.log('Player Stats for', player.player_id, ':', JSON.stringify(playerStats.statistics, null, 2)); // Log full statistics array

          // Extract assists from the statistics array
          const assists = playerStats.statistics?.reduce((total, stat) => {
            return total + (stat.assists || 0); // Adjust based on the actual structure
          }, 0);

          return {
            player_id: player.player_id,
            player_name: player.player_name,
            assists: assists || 0, // Default to 0 if assists are missing
          };
        } catch (error) {
          console.error(`Error fetching stats for player ${player.player_id}:`, error);
          return {
            player_id: player.player_id,
            player_name: player.player_name,
            assists: 0, // Default to 0 if stats fetch fails
          };
        }
      })
    );

    // Step 3: Sort players by assists (descending)
    const topAssists = playersWithAssists.sort((a, b) => b.assists - a.assists);

    res.json(topAssists);
  } catch (error) {
    console.error('Error in /top-assists route:', error); // Log the full error
    res.status(500).json({ error: 'Failed to fetch top assists' });
  }
});

export default router;