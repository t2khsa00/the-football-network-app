import express from 'express';
import fixtures from './fixtures.js';
import standings from './standings.js';
import team from './team.js';
import topScorers from './topScorers.js';
import topAssists from './topAssists.js';
import topRedCards from './topRedCards.js';
import topYellowCards from './topYellowCards.js';

const router = express.Router();

router.use('/fixtures', fixtures);
router.use('/standings', standings);
router.use('/team', team);
router.use('/top-scorers', topScorers);
router.use('/top-assists', topAssists);
router.use('/top-red-cards', topRedCards);
router.use('/top-yellow-cards', topYellowCards);

export default router;