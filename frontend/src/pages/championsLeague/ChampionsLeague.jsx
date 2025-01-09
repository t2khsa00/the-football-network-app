import { useState } from 'react';
import ChampionLeagueTable from './ChampionLeagueTable';
import ChampionLeagueTeams from './ChampionLeagueTeams';
import ChampionLeagueStats from './ChampionLeagueStats';
import ChampionLeagueFixtures from './ChampionLeagueFixtures';
import './ChampionsLeague.css';

const ChampionsLeaguePage = () => {
  const [activeTab, setActiveTab] = useState('fixtures');

  return (
    <div className="champions-league-page">
      <div className="champions-league-header">
        <div className="champions-league-logo">
          <img src="/image.png" alt="Champions League Logo" className="logo-img" />
        </div>
        <div className="tabs">
          <button
            onClick={() => setActiveTab('fixtures')}
            className={activeTab === 'fixtures' ? 'tab active' : 'tab'}
          >
            Fixtures
          </button>
          <button
            onClick={() => setActiveTab('table')}
            className={activeTab === 'table' ? 'tab active' : 'tab'}
          >
            Table
          </button>
          <button
            onClick={() => setActiveTab('teams')}
            className={activeTab === 'teams' ? 'tab active' : 'tab'}
          >
            Teams
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={activeTab === 'stats' ? 'tab active' : 'tab'}
          >
            Stats
          </button>
        </div>
      </div>

      <div className="tab-content">
        <div style={{ display: activeTab === 'fixtures' ? 'block' : 'none' }}>
          <ChampionLeagueFixtures />
        </div>
        <div style={{ display: activeTab === 'table' ? 'block' : 'none' }}>
          <ChampionLeagueTable />
        </div>
        <div style={{ display: activeTab === 'teams' ? 'block' : 'none' }}>
          <ChampionLeagueTeams />
        </div>
        <div style={{ display: activeTab === 'stats' ? 'block' : 'none' }}>
          <ChampionLeagueStats />
        </div>
      </div>
    </div>
  );
};

export default ChampionsLeaguePage;
