import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fixturesRoutes from "./routes/fixtures.js";
import standingsRoutes from "./routes/standings.js";
import topScorersRoutes from "./routes/topScorers.js";
import topAssistsRoutes from "./routes/topAssists.js";
import topYellowCardsRoutes from "./routes/topYellowCards.js";
import topRedCardsRoutes from "./routes/topRedCards.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));

// Routes
app.use("/api/fixtures", fixturesRoutes);
app.use("/api/standings", standingsRoutes);
app.use("/api/topscorers", topScorersRoutes);
app.use("/api/topassists", topAssistsRoutes);
app.use("/api/topyellowcards", topYellowCardsRoutes);
app.use("/api/topredcards", topRedCardsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
