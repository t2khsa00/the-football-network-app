require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route: Get football standings
app.get("/standings/:league/:season", async (req, res) => {
  const { league, season } = req.params;

  try {
    const response = await axios.get(`https://${process.env.API_HOST}/v3/standings`, {
      params: { league, season },
      headers: {
        "x-rapidapi-host": process.env.API_HOST,
        "x-rapidapi-key": process.env.API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
    res.send("Welcome to The Football Network");
});
  
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
