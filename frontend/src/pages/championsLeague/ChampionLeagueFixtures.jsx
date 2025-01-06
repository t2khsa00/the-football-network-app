import './ChampionLeagueFixtures.css';
import { useState, useEffect, useRef } from 'react';

const ChampionLeagueFixtures = () => {
  const [matchesByMonth, setMatchesByMonth] = useState({});
  const [showCurrentButton, setShowCurrentButton] = useState(false);
  const [clickedCurrent, setClickedCurrent] = useState(false);
  const currentMonthRef = useRef(null);

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
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      }
  }, []);

const handleScroll = () => {
    const currentBox = currentMonthRef.current.getBoundingClientRect();

    // Show button only if not currently viewing the current month or if scrolled away after clicking
    if (currentBox.top > window.innerHeight || currentBox.bottom < 0) {
        setShowCurrentButton(true);
        setClickedCurrent(false);  // Reset once the user scrolls away
    } else {
        setShowCurrentButton(false);
    }
};
const scrollToCurrentMonth = () => {
    currentMonthRef.current?.scrollIntoView({ behavior: 'smooth' });
    setClickedCurrent(true);  // Hide button after click
    setShowCurrentButton(false);
};

  const groupMatchesByMonth = (matches) => {
      return matches.reduce((acc, match) => {
          const date = new Date(match.fixture.date);
          const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });
          const day = date.toLocaleString('default', { weekday: 'long' });
          if (!acc[month]) {
              acc[month] = [];
          }
          acc[month].push({
              date: `${day}, ${date.toISOString().split('T')[0]}`,
              time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
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

  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
      <div className="cl-fixtures">
                {showCurrentButton && !clickedCurrent &&  (
            <button className="current-month-button" onClick={scrollToCurrentMonth}>
                Current
            </button>
        )}
          {Object.keys(matchesByMonth).map(month => (
              <div key={month} ref={month === currentMonth ? currentMonthRef : null}>
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