import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Assists.css";
import { fetchTopAssists } from "../../ApiServices/Api"

const Assists = ({ leagueId, season }) => {
  const [topAssists, setTopAssists] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssists = async () => {
      setLoading(true);
      try {
        const data = await fetchTopAssists(leagueId, season);
        setTopAssists(data);
      } catch (error) {
        console.error("Failed to fetch top assists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssists();
  }, [leagueId, season]);

  const renderTopPlayer = () => {
    if (loading || topAssists.length === 0) {
      return <p>Loading...</p>;
    }

    const topPlayer = topAssists[0].player;
    return (
      <div className="top-player-card assists">
        <div className="assists-rank-badge"># 1</div>
        <div className="assists-top-player-content">
          <div className="assists-top-player-details">
            <h2 className="assists-top">{topPlayer.name}</h2>
            <p className="assists-team-name">{topAssists[0].statistics[0].team.name}</p>
            <p className="assists-stat-value">{topAssists[0].statistics[0].goals.assists} Assists</p>
          </div>
          <img src={topPlayer.photo} alt={topPlayer.name} className="assists-top-player-image" />
        </div>
      </div>
    );
  };

  const renderTable = () => {
    if (loading || topAssists.length === 0) {
      return <p>Loading...</p>;
    }

    const playersToShow = showMore ? topAssists.slice(1) : topAssists.slice(1, 5);
    return (
      <>
        <table className="assists-table">
          <tbody>
            {playersToShow.map((entry, index) => (
              <tr key={index}>
                <td>{index + 2}</td>
                <td>{entry.player.name}</td>
                <td>{entry.statistics[0].team.name}</td>
                <td>{entry.statistics[0].goals.assists}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="assists-button" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Close" : "View All"}
        </button>
      </>
    );
  };

  return (
    <div className="stat-box assists">
      <h3 className="assists-h3">Assists</h3>
      {renderTopPlayer()}
      {renderTable()}
    </div>
  );
};
Assists.propTypes = {
  leagueId: PropTypes.number.isRequired,
  season: PropTypes.string.isRequired,
};

export default Assists;
