import './TopScorers.css'; // Your updated CSS file

const TopScorers = () => {
  return (
    <div className="top-scorers-container">
      <h2 className="section-title">Top Scorers around Top 5 Leagues</h2>
      <div className="scorers-grid">
        {/* Premier League */}
        <div className="league-column">
          <h3>Premier League</h3>
          <img src="/2152325380.jpg" alt="Player" />
          <div className="player">
            <span className="player-name">Player Name</span> : <span className="goals">Goals</span>
          </div>
        </div>
        
        {/* La Liga */}
        <div className="league-column">
          <h3>La Liga</h3>
          <img src="/2152325380.jpg" alt="Player" />
          <div className="player">
            <span className="player-name">Player Name</span> : <span className="goals">Goals</span>
          </div>
        </div>
        
        {/* Bundesliga */}
        <div className="league-column">
          <h3>Bundesliga</h3>
          <img src="/2152325380.jpg" alt="Player" />
          <div className="player">
            <span className="player-name">Player Name</span> : <span className="goals">Goals</span>
          </div>
        </div>
        
        {/* League-1 */}
        <div className="league-column">
          <h3>League-1</h3>
          <img src="/2152325380.jpg" alt="Player" />
          <div className="player">
            <span className="player-name">Player Name</span> : <span className="goals">Goals</span>
          </div>
        </div>
        
        {/* Serie A */}
        <div className="league-column">
          <h3>Serie A</h3>
          <img src="/2152325380.jpg" alt="Player" />
          <div className="player">
            <span className="player-name">Player Name</span> : <span className="goals">Goals</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopScorers;
