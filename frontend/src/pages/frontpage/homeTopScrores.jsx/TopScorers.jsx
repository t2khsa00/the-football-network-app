import { useState, useEffect } from "react";
import "./TopScorers.css";
import { fetchTopScorers } from "../../../ApiServices/Api";

const TopScorers = () => {
  const [topScorers, setTopScorers] = useState({
    "Premier League": null,
    "La Liga": null,
    "Bundesliga": null,
    "Ligue 1": null,
    "Serie A": null,
  });

  useEffect(() => {
    const leagueIds = {
      "Premier League": 39,
      "La Liga": 140,
      "Bundesliga": 78,
      "Ligue 1": 61,
      "Serie A": 135,
    };

    const loadTopScorers = async () => {
      const season = "2024"; // Current season

      await Promise.all(
        Object.entries(leagueIds).map(async ([leagueName, leagueId]) => {
          try {
            const data = await fetchTopScorers(leagueId, season);

            if (data.length > 0) {
              const player = data[0].player;
              const goals = data[0].statistics[0].goals.total;

              setTopScorers((prevScorers) => ({
                ...prevScorers,
                [leagueName]: {
                  name: player.name,
                  photo: player.photo,
                  goals: goals,
                },
              }));
            } else {
              console.log(`No top scorer data available for ${leagueName}`);
            }
          } catch (error) {
            console.error(`Error fetching data for ${leagueName}: `, error);
          }
        })
      );
    };

    loadTopScorers();
  }, []);

  return (
    <div className="top-scorers-container">
      <h2 className="top-scorers-title">Top Scorers around Top 5 Leagues</h2>
      <div className="scorers-grid">
        {Object.entries(topScorers).map(
          ([league, scorer]) =>
            scorer && (
              <div key={league} className="scorer-column">
                <h3>{league}</h3>
                <img src={scorer.photo} alt={scorer.name} className="scorer-photo" />
                <div className="scorer-details">
                  <span className="scorer-name">{scorer.name}</span> :{" "}
                  <span className="scorer-goals">{scorer.goals}</span>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default TopScorers;
