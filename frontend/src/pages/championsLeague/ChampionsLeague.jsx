import { useState } from 'react';
import Table from './Table';
import Teams from './Teams';
import Stats from './Stats';


const ChampionsLeaguePage = () => {
  const [activeTab, setActiveTab] = useState('fixtures'); // Default tab is Fixtures

  const renderTabContent = () => {
    switch (activeTab) {
      case 'table':
        return <Table />;
      case 'teams':
        return <Teams />;
      case 'stats':
        return <Stats />;
    }
  };

  return (
    <div className="champions-league-page">
      <div className="champions-league-header">
        <h1>Champions League</h1>
        <div className="tabs">
          <button onClick={() => setActiveTab('table')} className={activeTab === 'table' ? 'active' : ''}>Table</button>
          <button onClick={() => setActiveTab('teams')} className={activeTab === 'teams' ? 'active' : ''}>Teams</button>
          <button onClick={() => setActiveTab('stats')} className={activeTab === 'stats' ? 'active' : ''}>Stats</button>
        </div>
      </div>
      {renderTabContent()}
    </div>
  );
};

export default ChampionsLeaguePage;
