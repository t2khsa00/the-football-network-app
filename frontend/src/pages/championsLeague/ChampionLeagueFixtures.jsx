import  { useState, useEffect, useRef } from 'react';

// Function to group matches by month
const groupMatchesByMonth = (matches) => {
    return matches.reduce((acc, match) => {
        const matchDate = new Date(match.fixture.date);
        const monthYear = matchDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        const day = matchDate.toLocaleString('default', { weekday: 'long' });
        if (!acc[monthYear]) {
            acc[monthYear] = [];
        }
        acc[monthYear].push({
            date: `${day}, ${matchDate.toLocaleDateString()}`,
            time: matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            home: match.teams.home.name,
            away: match.teams.away.name,
            homeLogo: match.teams.home.logo,
            awayLogo: match.teams.away.logo,
            homeScore: match.goals.home,
            awayScore: match.goals.away,
        });
        return acc;
    }, {});
};
import './ChampionLeagueFixtures.css';
import { debounce } from 'lodash'; // Ensure lodash is installed for debouncing

const ChampionLeagueFixtures = () => {
  const [matchesByMonth, setMatchesByMonth] = useState({});
  const [showCurrentButton, setShowCurrentButton] = useState(false);
  const currentMonthRef = useRef(null);
  const autoHideTimer = useRef(null);

  const handleAutoHide = () => {
    if (autoHideTimer.current) {
      clearTimeout(autoHideTimer.current);
    }
    autoHideTimer.current = setTimeout(() => {
      setShowCurrentButton(false);
    }, 5000);
  };

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures?league=2&season=2024', {
          "method": "GET",
          "headers": {
            'x-rapidapi-key': 'cc3966ad8amsh022b69077598bc1p1762acjsn9db201a954ca',
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const groupedMatches = groupMatchesByMonth(data.response);
        setMatchesByMonth(groupedMatches);
      } catch (error) {
        console.error(`Error fetching Champions League data: ${error.message}`);
      }
    };

    fetchFixtures();

    const handleScroll = debounce(() => {
      const currentInView = currentMonthRef.current && currentMonthRef.current.getBoundingClientRect().top < window.innerHeight && currentMonthRef.current.getBoundingClientRect().bottom >= 0;

      if (!currentInView) {
        setShowCurrentButton(true);
        handleAutoHide();
      } else {
        setShowCurrentButton(false);
        clearTimeout(autoHideTimer.current);
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(autoHideTimer.current);
    };
  }, []);

  const scrollToCurrentMonth = () => {
    currentMonthRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowCurrentButton(false);
    clearTimeout(autoHideTimer.current);
  };

  return (
    <div className="cl-fixtures">
      {showCurrentButton && (
        <button 
          className="current-month-button"
          onClick={scrollToCurrentMonth}
          onMouseEnter={() => clearTimeout(autoHideTimer.current)}
          onMouseLeave={handleAutoHide}
        >
          Current
        </button>
      )}
      {Object.keys(matchesByMonth).map(month => (
        <div key={month} ref={month === new Date().toLocaleString('default', { month: 'long', year: 'numeric' }) ? currentMonthRef : null}>
          <div className="cl-month">{month}</div>
          {matchesByMonth[month].map((match, index) => (
            <div key={index} className="cl-match-item">
              <div className="cl-match-info">
                <div className="cl-match-date-time">
                  {match.date} | {match.time}
                </div>
                <div className="cl-match-day">
                  {match.matchDay}
                </div>
              </div>
              <div className="cl-teams-scores">
                <div className="cl-team cl-team-home">
                  <span className="cl-team-name">{match.home}</span>
                </div>
                <img src={match.homeLogo} alt={`${match.home} logo`} className="cl-team-logo" />
                <div className="cl-score-container">
                  {match.homeScore} : {match.awayScore}
                </div>
                <img src={match.awayLogo} alt={`${match.away} logo`} className="cl-team-logo" />
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
