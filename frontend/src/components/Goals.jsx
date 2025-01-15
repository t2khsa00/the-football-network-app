import { useEffect, useState } from "react";
import "./Goals.css";
import { fetchTopScorers } from "../api/cl_api/ClApi";
import PropTypes from "prop-types";

const Goal = ({ leagueId, season }) => {
  const [topScorers, setTopScorers] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScorers = async () => {
      setLoading(true);
      try {
        const data = await fetchTopScorers(leagueId, season);
        setTopScorers(data);
      } catch (error) {
        console.error("Failed to fetch top scorers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScorers();
  }, [leagueId, season]);

  const renderTopPlayer = () => {
    if (loading || topScorers.length === 0) {
      return <p>Loading...</p>;
    }

    const topPlayer = topScorers[0].player;
    return (
      <div className="top-player-card goal">
        <div className="goal-rank-badge"># 1</div>
        <div className="goal-top-player-content">
          <div className="goal-top-player-details">
            <h2 className="goal-top">{topPlayer.name}</h2>
            <p className="goal-team-name">{topScorers[0].statistics[0].team.name}</p>
            <p className="goal-stat-value">{topScorers[0].statistics[0].goals.total} Goals</p>
          </div>
          <img src={topPlayer.photo} alt={topPlayer.name} className="goal-top-player-image" />
        </div>
      </div>
    );
  };

  const renderTable = () => {
    if (loading || topScorers.length === 0) {
      return <p>Loading...</p>;
    }

    const playersToShow = showMore ? topScorers.slice(1) : topScorers.slice(1, 5);
    return (
      <>
        <table className="goal-table">
          <tbody>
            {playersToShow.map((entry, index) => (
              <tr key={index}>
                <td>{index + 2}</td>
                <td>{entry.player.name}</td>
                <td>{entry.statistics[0].team.name}</td>
                <td>{entry.statistics[0].goals.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="goal-button" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Close" : "View All"}
        </button>
      </>
    );
  };

  return (
    <div className="stat-box goal">
      <h3 className="goal-h3">Goals</h3>
      {renderTopPlayer()}
      {renderTable()}
    </div>
  );
};
Goal.propTypes = {
  leagueId: PropTypes.number.isRequired, // Ensures leagueId is a required number
  season: PropTypes.string.isRequired,  // Ensures season is a required string
};
export default Goal;
