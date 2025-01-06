import { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Mock data or API call to fetch teams data
    const mockTeams = [
      { name: 'Real Madrid', logo: '/real-madrid-logo.png' },
      { name: 'Manchester City', logo: '/man-city-logo.png' },
      // Add more mock data
    ];
    setTeams(mockTeams);
  }, []);

  return (
    <div className="teams">
      <h2>Teams</h2>
      <div className="teams-list">
        {teams.map((team, index) => (
          <div key={index} className="team-card">
            <img src={team.logo} alt={team.name} className="team-logo" />
            <p>{team.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
