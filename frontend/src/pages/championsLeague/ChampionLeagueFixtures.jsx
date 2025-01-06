import './ChampionLeagueFixtures.css';
import { useState, useEffect, useRef } from 'react';

const ChampionLeagueFixtures = () => {
  const [matchesByMonth, setMatchesByMonth] = useState({});
  const [showCurrentButton, setShowCurrentButton] = useState(false);
  const [clickedCurrent, setClickedCurrent] = useState(false);
  const [allTeams, setAllTeams] = useState([]); // <-- NEW state for all unique teams
  const [selectedTeam, setSelectedTeam] = useState('All'); // <-- NEW state for the team filter

  const currentMonthRef = useRef(null);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await fetch(
          'https://api-football-v1.p.rapidapi.com/v3/fixtures?league=2&season=2024',
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key': 'cc3966ad8amsh022b69077598bc1p1762acjsn9db201a954ca',
              'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // 1. Group matches by month
        const groupedMatches = groupMatchesByMonth(data.response);

        // 2. Extract all unique teams
        const teams = new Set();
        data.response.forEach((match) => {
          teams.add(match.teams.home.name);
          teams.add(match.teams.away.name);
        });

        setMatchesByMonth(groupedMatches);
        setAllTeams(['All', ...Array.from(teams).sort()]); // Sort teams alphabetically
      } catch (error) {
        console.error(`Error fetching Champions League data: ${error.message}`);
      }
    };

    fetchFixtures();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

   /* Hides the "Current" button after 4 seconds if it's shown and not clicked.
   */
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
    const currentBox = currentMonthRef.current.getBoundingClientRect();
    // Show button only if not currently viewing the current month or if scrolled away after clicking
    if (currentBox.top > window.innerHeight || currentBox.bottom < 0) {
      setShowCurrentButton(true);
      setClickedCurrent(false); // Reset once the user scrolls away
    } else {
      setShowCurrentButton(false);
    }
  };

  const scrollToCurrentMonth = () => {
    currentMonthRef.current?.scrollIntoView({ behavior: 'smooth' });
    setClickedCurrent(true); // Hide button after click
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

  // 3. Filter the matches by selected team
  const filteredMatchesByMonth = Object.keys(matchesByMonth).reduce((acc, month) => {
    // Filter out matches if a specific team is selected
    const filteredMatches = matchesByMonth[month].filter((match) => {
      if (selectedTeam === 'All') return true;
      return match.home === selectedTeam || match.away === selectedTeam;
    });

    if (filteredMatches.length) {
      acc[month] = filteredMatches;
    }
    return acc;
  }, {});

  return (
    <div className="cl-fixtures">
      {/* Dropdown for selecting a team */}
      <div className="team-filter">
        <label htmlFor="team-select">Filter by team</label>
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

      {/* The "Current" button, which hides itself if not clicked after 5 seconds */}
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
