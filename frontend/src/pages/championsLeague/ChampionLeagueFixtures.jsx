import './ChampionLeagueFixtures.css';
import { useState, useEffect, useRef } from 'react';

const ChampionLeagueFixtures = () => {
  // -----------------------------
  // 1) UI State
  // -----------------------------
  const [matchesByMonth, setMatchesByMonth] = useState({});
  const [showCurrentButton, setShowCurrentButton] = useState(false);
  const [clickedCurrent, setClickedCurrent] = useState(false);
  const [allTeams, setAllTeams] = useState([]); 
  const [selectedTeam, setSelectedTeam] = useState('All');
  const currentMonthRef = useRef(null);

  // -----------------------------
  // 2) On Mount: Restore UI State + Fetch Fixtures
  // -----------------------------
  useEffect(() => {
    // (A) Restore UI-related state from localStorage if present
    const savedUI = localStorage.getItem('clFixturesUI');
    if (savedUI) {
      const { savedSelectedTeam, savedClickedCurrent, savedShowCurrentButton } =
        JSON.parse(savedUI);

      // Only set if they exist; otherwise fallback to defaults
      if (savedSelectedTeam) setSelectedTeam(savedSelectedTeam);
      if (typeof savedClickedCurrent === 'boolean') {
        setClickedCurrent(savedClickedCurrent);
      }
      if (typeof savedShowCurrentButton === 'boolean') {
        setShowCurrentButton(savedShowCurrentButton);
      }
    }

    // (B) Now fetch the fixtures (with caching for the data)
    const fetchFixtures = async () => {
      try {
        // 1. Check localStorage for cached fixture data
        const cached = localStorage.getItem('clFixtures');
        if (cached) {
          const parsedCache = JSON.parse(cached);
          const { data, teams, timestamp } = parsedCache;

          const cacheDuration = 6 * 60 * 60 * 1000; // 6 hours
          const isCacheValid = Date.now() - timestamp < cacheDuration;

          if (isCacheValid) {
            // Use cached fixture data
            setMatchesByMonth(data);
            setAllTeams(teams);
            return; // Skip fetch
          }
        }

        // 2. Fetch from the API if no valid cache
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
        const apiData = await response.json();

        // 3. Group matches by month
        const groupedMatches = groupMatchesByMonth(apiData.response);

        // 4. Extract all unique teams
        const teamsSet = new Set();
        apiData.response.forEach((match) => {
          teamsSet.add(match.teams.home.name);
          teamsSet.add(match.teams.away.name);
        });
        const sortedTeams = ['All', ...Array.from(teamsSet).sort()];

        // 5. Set to component state
        setMatchesByMonth(groupedMatches);
        setAllTeams(sortedTeams);

        // 6. Save fixture data to localStorage
        localStorage.setItem(
          'clFixtures',
          JSON.stringify({
            data: groupedMatches,
            teams: sortedTeams,
            timestamp: Date.now(),
          })
        );
      } catch (error) {
        console.error(`Error fetching Champions League data: ${error.message}`);
      }
    };

    fetchFixtures();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // -----------------------------
  // 3) Save UI-Related State Changes to localStorage
  // -----------------------------
  useEffect(() => {
    const uiState = {
      savedSelectedTeam: selectedTeam,
      savedClickedCurrent: clickedCurrent,
      savedShowCurrentButton: showCurrentButton,
    };
    localStorage.setItem('clFixturesUI', JSON.stringify(uiState));
  }, [selectedTeam, clickedCurrent, showCurrentButton]);

  // -----------------------------
  // 4) "Current" Button Hide Timer
  // -----------------------------
  useEffect(() => {
    let timer;
    if (showCurrentButton && !clickedCurrent) {
      timer = setTimeout(() => {
        setShowCurrentButton(false);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [showCurrentButton, clickedCurrent]);

  // -----------------------------
  // 5) Scroll Logic
  // -----------------------------
  const handleScroll = () => {
    if (!currentMonthRef.current) return;
    const currentBox = currentMonthRef.current.getBoundingClientRect();

    // Show button only if not in view
    if (currentBox.top > window.innerHeight || currentBox.bottom < 0) {
      setShowCurrentButton(true);
      setClickedCurrent(false); // Reset once user scrolls away
    } else {
      setShowCurrentButton(false);
    }
  };

  const scrollToCurrentMonth = () => {
    currentMonthRef.current?.scrollIntoView({ behavior: 'smooth' });
    setClickedCurrent(true);
    setShowCurrentButton(false);
  };

  // -----------------------------
  // 6) Grouping
  // -----------------------------
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

  // -----------------------------
  // 7) Filtering
  // -----------------------------
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

  // -----------------------------
  // 8) Render
  // -----------------------------
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
