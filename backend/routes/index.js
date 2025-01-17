import express from "express";
import topScorersRoutes from "./topScorers.js";
import topAssistsRoutes from "./topAssists.js";
import fixturesRoutes from "./fixtures.js";

const router = express.Router();

router.use("/topscorers", topScorersRoutes);
router.use("/topassists", topAssistsRoutes);
router.use("/fixtures", fixturesRoutes);

export default router;