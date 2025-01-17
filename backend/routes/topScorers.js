import { Router } from "express";
import { getCache, setCache } from "../services/cacheService.js";
import { fetchFromApiFootball } from "../services/apiService.js";

const router = Router();

router.get("/", async (req, res) => {
  const { leagueId, season } = req.query;
  const cacheKey = `topscorers_${leagueId}_${season}`;

  try {
    const cachedData = getCache(cacheKey);
    if (cachedData) return res.json(cachedData);

    const data = await fetchFromApiFootball("players/topscorers", { league: leagueId, season });
    setCache(cacheKey, data);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch top scorers" });
  }
});

export default router;
