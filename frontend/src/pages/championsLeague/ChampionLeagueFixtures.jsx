import './ChampionLeagueFixtures.css';
import { useState, useEffect, useRef } from 'react';
import { fetchFixtures } from '../../ApiServices/Api';

const ChampionLeagueFixtures = () => {
  const [matchesByMonth, setMatchesByMonth] = useState({});
  const [showCurrentButton, setShowCurrentButton] = useState(false);
  const [clickedCurrent, setClickedCurrent] = useState(false);
  const [allTeams, setAllTeams] = useState([]); 
  const [selectedTeam, setSelectedTeam] = useState('All');
  const currentMonthRef = useRef(null);

 
  useEffect(() => {
    
    const savedUI = localStorage.getItem('clFixturesUI');
    if (savedUI) {
      const { savedSelectedTeam, savedClickedCurrent, savedShowCurrentButton } =
        JSON.parse(savedUI);

    
      if (savedSelectedTeam) setSelectedTeam(savedSelectedTeam);
      if (typeof savedClickedCurrent === 'boolean') {
        setClickedCurrent(savedClickedCurrent);
      }
      if (typeof savedShowCurrentButton === 'boolean') {
        setShowCurrentButton(savedShowCurrentButton);
      }
    }

  
    const fetchAndGroupFixtures = async () => {
      try {
        const leagueId = 2; 
        const season = '2024';
        const data = await fetchFixtures(leagueId, season);

      
        const groupedMatches = groupMatchesByMonth(data);

        const teamsSet = new Set();
        data.forEach((match) => {
          teamsSet.add(match.teams.home.name);
          teamsSet.add(match.teams.away.name);
        });
        const sortedTeams = ['All', ...Array.from(teamsSet).sort()];

        
        setMatchesByMonth(groupedMatches);
        setAllTeams(sortedTeams);
      } catch (error) {
        console.error(`Error fetching Champions League data: ${error.message}`);
      }
    };

    fetchAndGroupFixtures();

  
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    const uiState = {
      savedSelectedTeam: selectedTeam,
      savedClickedCurrent: clickedCurrent,
      savedShowCurrentButton: showCurrentButton,
    };
    localStorage.setItem('clFixturesUI', JSON.stringify(uiState));
  }, [selectedTeam, clickedCurrent, showCurrentButton]);


  useEffect(() => {
    let timer;
    if (showCurrentButton && !clickedCurrent) {
      timer = setTimeout(() => {
        setShowCurrentButton(false);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [showCurrentButton, clickedCurrent]);


  const handleScroll = () => {
    if (!currentMonthRef.current) return;
    const currentBox = currentMonthRef.current.getBoundingClientRect();

   
    if (currentBox.top > window.innerHeight || currentBox.bottom < 0) {
      setShowCurrentButton(true);
      setClickedCurrent(false);
    } else {
      setShowCurrentButton(false);
    }
  };

  const scrollToCurrentMonth = () => {
    currentMonthRef.current?.scrollIntoView({ behavior: 'smooth' });
    setClickedCurrent(true);
    setShowCurrentButton(false);
  };

  const groupMatchesByMonth = (matches) => {
    return matches.reduce((acc, match) => {
      const date = new Date(match.fixture.date);
      const month = date.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      });
      const day = date.toLocaleString('default', { weekday: 'long' });

      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push({
        date: `${day}, ${date.toISOString().split('T')[0]}`,
        time: date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        matchDay: match.league.round,
        home: match.teams.home.name,
        away: match.teams.away.name,
        homeScore: match.score.fulltime.home,
        awayScore: match.score.fulltime.away,
        homeLogo: match.teams.home.logo,
        awayLogo: match.teams.away.logo,
      });
      return acc;
    }, {});
  };
  const currentMonth = new Date().toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });
  const filteredMatchesByMonth = Object.keys(matchesByMonth).reduce(
    (acc, month) => {
      const filteredMatches = matchesByMonth[month].filter((m) => {
        if (selectedTeam === 'All') return true;
        return m.home === selectedTeam || m.away === selectedTeam;
      });
      if (filteredMatches.length) {
        acc[month] = filteredMatches;
      }
      return acc;
    },
    {}
  );
  return (
    <div className="cl-fixtures">
      {/* Dropdown for selecting a team */}
      <div className="team-filter">
        <label htmlFor="team-select">Teams:</label>
        <select
          id="team-select"
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          {allTeams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      {showCurrentButton && !clickedCurrent && (
        <button className="current-month-button" onClick={scrollToCurrentMonth}>
          Current
        </button>
      )}

      {/* Render the filtered matches */}
      {Object.keys(filteredMatchesByMonth).map((month) => (
        <div key={month} ref={month === currentMonth ? currentMonthRef : null}>
          <div className="cl-month">{month}</div>
          {filteredMatchesByMonth[month].map((match, index) => (
            <div key={index} className="cl-match-item">
              <div className="cl-match-info">
                <div className="cl-match-date-time">
                  {match.date} | {match.time}
                </div>
                <div className="cl-match-day">{match.matchDay}</div>
              </div>
              <div className="cl-teams-scores">
                <div className="cl-team cl-team-home">
                  <span className="cl-team-name">{match.home}</span>
                </div>
                <img
                  src={match.homeLogo}
                  alt={`${match.home} logo`}
                  className="cl-team-logo"
                />
                <div className="cl-score-container">
                  {match.homeScore} : {match.awayScore}
                </div>
                <img
                  src={match.awayLogo}
                  alt={`${match.away} logo`}
                  className="cl-team-logo"
                />
                <div className="cl-team cl-team-away">
                  <span className="cl-team-name">{match.away}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChampionLeagueFixtures;
