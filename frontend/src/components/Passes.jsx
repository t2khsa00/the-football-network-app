
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Passes.css";
import { fetchPlayerStatistics } from "../api/cl_api/ClApi";

const Passes = ({ leagueId, season }) => {
  const [topPassers, setTopPassers] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPassers = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchPlayerStatistics(leagueId, season);
        const passers = data
          .map((entry) => ({
            player: entry.player,
            team: entry.statistics[0]?.team?.name || "Unknown Team",
            passesAccuracy: entry.statistics[0]?.passes?.accuracy || 0,
          }))
          .sort((a, b) => b.passesAccuracy - a.passesAccuracy)
          .slice(0, 15); // Top 15 passers
        setTopPassers(passers);
      } catch (error) {
        console.error("Failed to fetch top passers:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPassers();
  }, [leagueId, season]);

  const renderTopPlayer = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Failed to load data. Please try again later.</p>;
    if (topPassers.length === 0) return <p>No data available.</p>;

    const topPlayer = topPassers[0]?.player;
    return (
      <div className="top-player-card passes">
        <div className="passes-rank-badge"># 1</div>
        <div className="passes-top-player-content">
          <div className="passes-top-player-details">
            <h2 className="passes-top">{topPlayer?.name || "Unknown Player"}</h2>
            <p className="passes-team-name">{topPassers[0]?.team || "Team Unavailable"}</p>
            <p className="passes-stat-value">{topPassers[0]?.passesAccuracy}% Pass Accuracy</p>
          </div>
          {topPlayer?.photo && (
            <img
              src={topPlayer.photo}
              alt={topPlayer.name}
              className="passes-top-player-image"
            />
          )}
        </div>
      </div>
    );
  };

  const renderTable = () => {
    if (loading) return <p>Loading...</p>;
    if (topPassers.length === 0) return <p>No data available.</p>;

    const playersToShow = showMore ? topPassers.slice(1) : topPassers.slice(1, 5);
    return (
      <table className="passes-table">
        <tbody>
          {playersToShow.map((entry, index) => (
            <tr key={index}>
              <td>{index + 2}</td>
              <td>{entry.player.name}</td>
              <td>{entry.team}</td>
              <td>{entry.passesAccuracy}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="stat-box passes">
      <h3 className="passes-h3">Passes</h3>
      {renderTopPlayer()}
      {renderTable()}
      <button className="passes-button" onClick={() => setShowMore(!showMore)}>
        {showMore ? "Close" : "View All"}
      </button>
    </div>
  );
};

Passes.propTypes = {
  leagueId: PropTypes.number.isRequired,
  season: PropTypes.string.isRequired,
};

export default Passes;
