import { useState, useEffect } from "react";
import "./HomeFixtures.css";
import { fetchFixtures } from "../../../ApiServices/Api";

const HomeFixtures = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFixtures = async () => {
      try {
        const leagueId = 2; // Champions League
        const season = 2024; // Current season
        const data = await fetchFixtures(leagueId, season);

        if (data.length > 0) {
          // Find the current game week (matchday) from the API data
          const today = new Date();
          const currentGameWeek = data.find((game) => {
            const matchDate = new Date(game.fixture.date);
            return matchDate >= today && game.league.round; // Look for the current matchday
          })?.league?.round;

          if (!currentGameWeek) {
            setGames([]);
            return;
          }

          // Filter matches for the current game week
          const filteredMatches = data.filter(
            (game) => game.league.round === currentGameWeek
          );

          // Map filtered matches into desired structure
          const fixtureData = filteredMatches.map((game) => ({
            team1Logo: game.teams?.home?.logo,
            team2Logo: game.teams?.away?.logo,
            score:
              game.score?.fulltime?.home !== null && game.score?.fulltime?.away !== null
                ? `${game.score.fulltime.home} - ${game.score.fulltime.away}`
                : "TBD",
            date: new Date(game.fixture.date).toISOString().split("T")[0],
            time: new Date(game.fixture.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
            status: game.fixture?.status?.short,
          }));

          setGames(fixtureData);
        } else {
          setGames([]);
        }
      } catch (error) {
        setError(`Error fetching Champions League data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadFixtures();
  }, []);

  return (
    <div className="home-fixtures-container">
      <h2 className="home-fixtures-section-title">Upcoming Champions League Fixtures (Game Week)</h2>

      {loading ? (
        <p>Loading fixtures...</p>
      ) : error ? (
        <p>{error}</p>
      ) : games.length === 0 ? (
        <p>No upcoming fixtures available for this game week.</p>
      ) : (
        <div className="home-fixtures">
          {games.map((game, index) => (
            <div className="home-fixture" key={index}>
              <div className="home-fixture-teams">
                <img src={game.team1Logo} alt="Team 1" className="home-fixture-team-logo" />
                <span className="home-fixture-vs">VS</span>
                <img src={game.team2Logo} alt="Team 2" className="home-fixture-team-logo" />
              </div>
              <div className="home-fixture-score">{game.score}</div>
              <div className="home-fixture-date-time">{`${game.date}, ${game.time}`}</div>
              {game.status === "LIVE" && <span className="home-fixture-live-indicator">LIVE</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeFixtures;
