import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Dribbles.css";
import { fetchPlayerStats } from "../api/cl_api/ClApi";

const Dribbles = ({ leagueId, season }) => {
  const [topDribblers, setTopDribblers] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDribblers = async () => {
      setLoading(true);
      try {
        const data = await fetchPlayerStats(leagueId, season, "topdribblers");
        setTopDribblers(data);
      } catch (error) {
        console.error("Failed to fetch top dribblers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDribblers();
  }, [leagueId, season]);

  const renderTopPlayer = () => {
    if (loading || topDribblers.length === 0) {
      return <p>Loading...</p>;
    }

    const topPlayer = topDribblers[0].player;
    return (
      <div className="top-player-card dribble">
        <div className="dribble-rank-badge"># 1</div>
        <div className="dribble-top-player-content">
          <div className="dribble-top-player-details">
            <h2 className="dribble-top">{topPlayer.name}</h2>
            <p className="dribble-team-name">{topDribblers[0].statistics[0].team.name}</p>
            <p className="dribble-stat-value">{topDribblers[0].statistics[0].dribbles.success} Successful Dribbles</p>
          </div>
          <img src={topPlayer.photo} alt={topPlayer.name} className="dribble-top-player-image" />
        </div>
      </div>
    );
  };

  const renderTable = () => {
    if (loading || topDribblers.length === 0) {
      return <p>Loading...</p>;
    }

    const playersToShow = showMore ? topDribblers.slice(1) : topDribblers.slice(1, 5);
    return (
      <>
        <table className="dribble-table">
          <tbody>
            {playersToShow.map((entry, index) => (
              <tr key={index}>
                <td>{index + 2}</td>
                <td>{entry.player.name}</td>
                <td>{entry.statistics[0].team.name}</td>
                <td>{entry.statistics[0].dribbles.success}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="dribble-button" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Close" : "View All"}
        </button>
      </>
    );
  };

  return (
    <div className="stat-box dribble">
      <h3 className="dribble-h3">Dribbles</h3>
      {renderTopPlayer()}
      {renderTable()}
    </div>
  );
};

Dribbles.propTypes = {
  leagueId: PropTypes.number.isRequired,
  season: PropTypes.string.isRequired,
};

export default Dribbles;
