import { useEffect, useState } from 'react';
import './ChampionLeagueTable.css';

const ChampionLeagueTable = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getGoalDifference = (team) => {
    return team.goalsFor - team.goalsAgainst;
  };

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true);
      setError(null);
      try {
        const cached = localStorage.getItem('clStandings');
        if (cached) {
          const parsedCache = JSON.parse(cached);
          const { data, timestamp } = parsedCache;

          const cacheDuration = 6 * 60 * 60 * 1000;
          const isCacheValid = Date.now() - timestamp < cacheDuration;

          if (isCacheValid) {
            // Use the cached data
            setStandings(data);
            setLoading(false);
            return;
          }
        }
        // Fetch from API-Football (Champions League 2024-2025, league=2, season=2024)
        const response = await fetch(
          'https://api-football-v1.p.rapidapi.com/v3/standings?league=2&season=2024',
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key': 'cc3966ad8amsh022b69077598bc1p1762acjsn9db201a954ca',
              'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const rawStandings =
          data?.response?.[0]?.league?.standings?.[0] || [];

        const transformedStandings = rawStandings.map((item) => ({
          rank: item.rank,
          logo: item.team.logo,
          teamName: item.team.name,
          gp: item.all.played,
          w: item.all.win,
          d: item.all.draw,
          l: item.all.lose,
          goalsFor: item.all.goals.for,
          goalsAgainst: item.all.goals.against,
          points: item.points,
        }));

        localStorage.setItem(
          'clStandings',
          JSON.stringify({
            data: transformedStandings,
            timestamp: Date.now(),
          })
        );

        setStandings(transformedStandings);
      } catch (error) {
        console.error('Error fetching real-time standings:', error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) {
    return <div className="cl-standings-container">Loading standings...</div>;
  }

  if (error) {
    return (
      <div className="cl-standings-container">
        Error fetching standings: {error}
      </div>
    );
  }

  return (
    <div className="cl-standings-container">
      <h2 className="title">STANDINGS</h2>
      <table className="cl-standings-table">
        <thead>
          <tr>
            <th>RANK</th>
            <th>TEAM</th>
            <th>Played</th>
            <th>Won</th>
            <th>Draw</th>
            <th>Lost</th>
            <th>For</th>
            <th>Against</th>
            <th>Difference</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr key={team.rank}>
              <td>{team.rank}.</td>
              <td className="team">
                <img
                  src={team.logo}
                  alt={`${team.teamName} logo`}
                  className="team-logo"
                />
                <span>{team.teamName}</span>
              </td>
              <td>{team.gp}</td>
              <td>{team.w}</td>
              <td>{team.d}</td>
              <td>{team.l}</td>
              <td>{team.goalsFor}</td>
              <td>{team.goalsAgainst}</td>
              <td>{getGoalDifference(team)}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChampionLeagueTable;
