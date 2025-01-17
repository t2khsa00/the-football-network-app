import express from "express";
import topScorersRoutes from "./topScorers.js";
import topAssistsRoutes from "./topAssists.js";
import fixturesRoutes from "./fixtures.js";
import standingsRoutes from "./standings.js";
import topYellowCardsRoutes from "./topYellowCards.js";
import topRedCardsRoutes from "./topRedCards.js";
import teamMatchesRoutes from './teamMatches.js';

const router = express.Router();

router.use("/topscorers", topScorersRoutes);
router.use("/topassists", topAssistsRoutes);
router.use("/fixtures", fixturesRoutes);
router.use("/standings", standingsRoutes);
router.use("/topyellowcards", topYellowCardsRoutes);
router.use("/topredcards", topRedCardsRoutes);
router.use('/team-matches', teamMatchesRoutes);

export default router;