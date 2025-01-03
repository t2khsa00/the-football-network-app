import './LastSeasonChampions.css'; // Add custom styles for this section

const LastSeasonChampions = () => {
  const champions = [
    {
      id: 1,
      league: 'Premier League',
      championTeam: 'Manchester City',
      image: '/Manchester_City_FC_badge.svg', // Replace with actual team image/logo path
    },
    {
      id: 2,
      league: 'La Liga',
      championTeam: 'Real Madrid',
      image: '/Real_Madrid_CF.svg.webp', // Replace with actual team image/logo path
    },
    {
      id: 3,
      league: 'Bundesliga',
      championTeam: 'Bayern Munich',
      image: '/FC_Bayern_München_logo_(2024).svg.png', // Replace with actual team image/logo path
    },
    {
      id: 4,
      league: 'Serie A',
      championTeam: 'Inter Milan',
      image: '/FC_Internazionale_Milano_2021.svg.png', // Replace with actual team image/logo path
    },
    {
      id: 5,
      league: 'Ligue 1',
      championTeam: 'Paris Saint-Germain',
      image: '/Paris_Saint-Germain_F.C..svg.png', // Replace with actual team image/logo path
    },
  ];

  return (
    <div className="champions-container">
      <h2 className="champions-title">Last Season Champions of Top 5 Leagues</h2>
      <div className="champions-grid">
        {champions.map((champion) => (
          <div className="champion-card" key={champion.id}>
            <h3>{champion.league}</h3>
            <p className="champion-name">{champion.championTeam}</p>
            <img src={champion.image} alt={`${champion.championTeam} logo`} className="champion-logo" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastSeasonChampions;
