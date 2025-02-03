// routes/players.js
import express from 'express';
import { getPlayerStats } from '../controllers/players/statsController.js';
import { getTopPlayersByGoals } from '../controllers/players/goalsController.js';
import { getTopPlayersByAssists } from '../controllers/players/assistsController.js';
import { getTopPlayersByPasses } from '../controllers/players/passesController.js';
import { getTopPlayersByDribbles } from '../controllers/players/dribblesController.js';
import { getTopPlayersByCards } from '../controllers/players/cardsController.js';
import { getTopPlayersByAppearances } from '../controllers/players/gamesController.js';
import { getTopPlayersByShots } from '../controllers/players/shotsController.js';
import { getTopPlayersByTackles } from '../controllers/players/tacklesController.js';
import { getTopPlayersByPenalties } from '../controllers/players/penaltiesController.js';
import { getTopKeepersBySaves } from '../controllers/players/savesController.js';

const router = express.Router();

// General player stats
router.get('/stats', getPlayerStats);

// Top 10 endpoints
router.get('/top-goals', getTopPlayersByGoals);
router.get('/top-assists', getTopPlayersByAssists);
router.get('/top-passes', getTopPlayersByPasses);
router.get('/top-dribbles', getTopPlayersByDribbles);
router.get('/top-cards', getTopPlayersByCards);
router.get('/top-appearances', getTopPlayersByAppearances);
router.get('/top-shots', getTopPlayersByShots);
router.get('/top-tackles', getTopPlayersByTackles);
router.get('/top-penalties', getTopPlayersByPenalties);
router.get('/top-saves', getTopKeepersBySaves);

export default router;
