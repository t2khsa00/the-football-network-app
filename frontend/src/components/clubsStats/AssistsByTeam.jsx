import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Stats.css";
import { fetchAssistsByTeam } from "../../ApiServices/Api";

const AssistsByTeam = ({ leagueId, season }) => {
  const [teams, setTeams] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchAssistsByTeam(leagueId, season);
        setTeams(data);
      } catch (error) {
        console.error("Failed to fetch team goals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [leagueId, season]);

  const renderTopTeam = () => {
    if (loading || teams.length === 0) {
      return <p>Loading...</p>;
    }

    const topTeam = teams[0];
    return (
      <div className="top-player-card goals">
        <div className="goals-rank-badge"># 1</div>
        <div className="goals-top-player-content">
          <div className="goals-top-player-details">
            <h2 className="goals-top">{topTeam.team.name}</h2>
            <p className="goals-stat-value">{topTeam.goals} Goals</p>
          </div>
          <img
            src={topTeam.team.logo}
            alt={topTeam.team.name}
            className="goals-top-player-image"
          />
        </div>
      </div>
    );
  };

  const renderTable = () => {
    if (loading || teams.length === 0) {
      return <p>Loading...</p>;
    }

    const teamsToShow = showMore ? teams.slice(1) : teams.slice(1, 5);
    return (
      <>
        <table className="stats-table">
          <tbody>
            {teamsToShow.map((team, index) => (
              <tr key={index}>
                <td>{index + 2}</td>
                <td>{team.team.name}</td>
                <td>{team.goals}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="stats-button"
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore ? "Close" : "View All"}
        </button>
      </>
    );
  };

  return (
    <div className="stat-box goals">
      <h3 className="goals-h3">Goals by Team</h3>
      {renderTopTeam()}
      {renderTable()}
    </div>
  );
};

AssistsByTeam.propTypes = {
  leagueId: PropTypes.number.isRequired,
  season: PropTypes.string.isRequired,
};

export default AssistsByTeam;
