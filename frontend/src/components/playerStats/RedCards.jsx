import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Discipline.css"; // Reuse the same CSS file as YellowCards
import { fetchTopRedCards } from "../../ApiServices/Api";

const RedCards = ({ leagueId, season }) => {
  const [topRedCards, setTopRedCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchRedCards = async () => {
      setLoading(true);
      try {
        const data = await fetchTopRedCards(leagueId, season);
        setTopRedCards(data);
      } catch (error) {
        console.error("Failed to fetch red card stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRedCards();
  }, [leagueId, season]);

  const renderTopPlayer = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (topRedCards.length === 0) {
      return <p>No red card statistics available for the selected league and season.</p>;
    }

    const topPlayer = topRedCards[0].player;
    return (
      <div className="top-player-card red">
        <div className="red-rank-badge">#1</div>
        <div className="red-top-player-content">
          <div className="red-top-player-details">
            <h2 className="red-top">{topPlayer.name}</h2>
            <p className="red-team-name">{topRedCards[0].statistics[0].team.name}</p>
            <p className="red-stat-value">{topRedCards[0].statistics[0].cards.red} Red Cards</p>
          </div>
          <img src={topPlayer.photo} alt={topPlayer.name} className="red-top-player-image" />
        </div>
      </div>
    );
  };

  const renderTable = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (topRedCards.length === 0) {
      return <p>No red card statistics available for the selected league and season.</p>;
    }

    const playersToShow = showMore ? topRedCards.slice(1) : topRedCards.slice(1, 5);
    return (
      <>
        <table className="red-table">
          <tbody>
            {playersToShow.map((entry, index) => (
              <tr key={index}>
                <td>{index + 2}</td>
                <td>{entry.player.name}</td>
                <td>{entry.statistics[0].team.name}</td>
                <td>{entry.statistics[0].cards.red}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="red-button" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Close" : "View All"}
        </button>
      </>
    );
  };

  return (
    <div className="stat-box red">
      <h3 className="red-h3">Red Cards</h3>
      {renderTopPlayer()}
      {renderTable()}
    </div>
  );
};

RedCards.propTypes = {
  leagueId: PropTypes.number.isRequired,
  season: PropTypes.string.isRequired,
};

export default RedCards;
