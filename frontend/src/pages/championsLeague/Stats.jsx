import { useState, useEffect } from 'react';

const Stats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // Mock data or API call to fetch stats
    const mockStats = [
      { player: 'Erling Haaland', goals: 10 },
      { player: 'Lionel Messi', goals: 8 },
      // Add more mock data
    ];
    setStats(mockStats);
  }, []);

  return (
    <div className="stats">
      <h2>Stats</h2>
      <ul>
        {stats.map((stat, index) => (
          <li key={index}>{stat.player}: {stat.goals} Goals</li>
        ))}
      </ul>
    </div>
  );
};

export default Stats;
