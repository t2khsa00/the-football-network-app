import { Router } from "express";
import { getCache, setCache } from "../../services/cacheService.js";
import { fetchFromApiFootball } from "../../services/apiService.js";

const router = Router();

router.get("/", async (req, res) => {
  const { leagueId, season } = req.query;

  if (!leagueId || !season) {
    return res.status(400).json({ error: "Missing leagueId or season" });
  }

  const cacheKey = `teams_${leagueId}_${season}`;

  try {
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      return res.json({ response: cachedData });
    }
    const data = await fetchFromApiFootball("teams", {
      league: leagueId,
      season: season,
    });

    setCache(cacheKey, data);
    res.json({ response: data });
  } catch (error) {
    console.error("Error fetching teams:", error.message);
    res.status(500).json({ error: "Failed to fetch teams." });
  }
});

export default router;
