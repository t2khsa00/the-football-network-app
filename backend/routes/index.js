import express from "express";
import fixturesRoutes from "./fixtures.js";
import standingsRoutes from "./standings.js";

// for Players //
import topScorersRoutes from "./topScorers.js";
import topAssistsRoutes from "./topAssists.js";
import topYellowCardsRoutes from "./topYellowCards.js";
import topRedCardsRoutes from "./topRedCards.js";

// for clubs //
import teamRoutes from "./clubs/Team.js";

const router = express.Router();


router.use("/fixtures", fixturesRoutes);
router.use("/standings", standingsRoutes);
// for Players //
router.use("/topscorers", topScorersRoutes);
router.use("/topassists", topAssistsRoutes);
router.use("/topyellowcards", topYellowCardsRoutes);
router.use("/topredcards", topRedCardsRoutes);

// for Clubs //
router.use("/team", teamRoutes);

export default router;