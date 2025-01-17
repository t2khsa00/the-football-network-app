import './ChampionLeagueTable.css';
import { useEffect, useState } from 'react';
import { fetchStandings } from '../../ApiServices/Api';

const ChampionLeagueTable = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const loadStandings = async () => {
      try {
        const data = await fetchStandings(2, '2024');
        setStandings(data[0]?.league?.standings[0] || []);
      } catch (err) {
        console.error('Error fetching standings:', err);
        setError('Failed to load standings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadStandings();
  }, []);

  if (loading) {
    return <div className="cl-standings-container">Loading standings...</div>;
  }

  if (error) {
    return <div className="cl-standings-container">{error}</div>;
  }

  return (
    <div className="cl-standings-container">
      <h2 className="title">Champions League Standings</h2>
      <div className="table-responsive">
        <table className="cl-standings-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Played</th>
              <th>Won</th>
              <th>Draw</th>
              <th>Lost</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => (
              <tr key={index}>
                <td>{team.rank}</td>
                <td className="team">
                  <img src={team.team.logo} alt={team.team.name} className="team-logo" />
                  {team.team.name}
                </td>
                <td>{team.all.played}</td>
                <td>{team.all.win}</td>
                <td>{team.all.draw}</td>
                <td>{team.all.lose}</td>
                <td>{team.all.goals.for}</td>
                <td>{team.all.goals.against}</td>
                <td>{team.goalsDiff}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChampionLeagueTable;
