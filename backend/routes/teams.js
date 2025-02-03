// routes/teams.js
import express from 'express';
import { getParticularTeamStats } from '../controllers/teamStatsController.js';

const router = express.Router();

// GET /api/teams/particular-stats?league=39&season=2024&team=66
router.get('/particular-stats', getParticularTeamStats);

export default router;
