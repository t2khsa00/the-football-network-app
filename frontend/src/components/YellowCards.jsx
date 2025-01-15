import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Discipline.css";
import { fetchTopYellowCards } from "../api/cl_api/ClApi";

const YellowCards = ({ leagueId, season }) => {
  const [topYellowCards, setTopYellowCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchYellowCards = async () => {
      setLoading(true);
      try {
        const data = await fetchTopYellowCards(leagueId, season);
        setTopYellowCards(data);
      } catch (error) {
        console.error("Failed to fetch yellow card stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchYellowCards();
  }, [leagueId, season]);

  const renderTopPlayer = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (topYellowCards.length === 0) {
      return <p>No yellow card statistics available for the selected league and season.</p>;
    }

    const topPlayer = topYellowCards[0].player;
    return (
      <div className="top-player-card yellow">
        <div className="yellow-rank-badge">#1</div>
        <div className="yellow-top-player-content">
          <div className="yellow-top-player-details">
            <h2 className="yellow-top">{topPlayer.name}</h2>
            <p className="yellow-team-name">{topYellowCards[0].statistics[0].team.name}</p>
            <p className="yellow-stat-value">{topYellowCards[0].statistics[0].cards.yellow} Yellow Cards</p>
          </div>
          <img src={topPlayer.photo} alt={topPlayer.name} className="yellow-top-player-image" />
        </div>
      </div>
    );
  };

  const renderTable = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (topYellowCards.length === 0) {
      return <p>No yellow card statistics available for the selected league and season.</p>;
    }

    const playersToShow = showMore ? topYellowCards.slice(1) : topYellowCards.slice(1, 5);
    return (
      <>
        <table className="yellow-table">
          <tbody>
            {playersToShow.map((entry, index) => (
              <tr key={index}>
                <td>{index + 2}</td>
                <td>{entry.player.name}</td>
                <td>{entry.statistics[0].team.name}</td>
                <td>{entry.statistics[0].cards.yellow}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="yellow-button" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Close" : "View All"}
        </button>
      </>
    );
  };

  return (
    <div className="stat-box yellow">
      <h3 className="yellow-h3">Yellow Cards</h3>
      {renderTopPlayer()}
      {renderTable()}
    </div>
  );
};

YellowCards.propTypes = {
  leagueId: PropTypes.number.isRequired,
  season: PropTypes.string.isRequired,
};

export default YellowCards;
