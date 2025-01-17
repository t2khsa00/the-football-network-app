import { Router } from "express";
import { getCache, setCache } from "../services/cacheService.js";
import { fetchFromApiFootball } from "../services/apiService.js";

const router = Router();

router.get("/", async (req, res) => {
  const { leagueId, season } = req.query;
  const cacheKey = `topredcards_${leagueId}_${season}`;

  try {
    const cachedData = getCache(cacheKey);
    if (cachedData) return res.json(cachedData);

    const data = await fetchFromApiFootball("players/topredcards", { league: leagueId, season });
    setCache(cacheKey, data);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch red cards" });
  }
});

export default router;
