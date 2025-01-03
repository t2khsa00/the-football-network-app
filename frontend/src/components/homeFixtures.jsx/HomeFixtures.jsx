import { useState, useEffect } from 'react';
import './HomeFixtures.css';

const HomeFixtures = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const leagueId = 2; // Champions League league ID (for the API)

    const fetchFixtures = async () => {
        try {
            // Fetching upcoming fixtures for Champions League
            const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${leagueId}&next=18`; // "next=18" fetches upcoming fixtures
            const options = {
                method: 'GET',
                headers: {
                  'x-rapidapi-key': 'cc3966ad8amsh022b69077598bc1p1762acjsn9db201a954ca',
                  'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'      
                },
            };

            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();

            // Check if data.response exists and contains fixtures
            if (data.response && data.response.length > 0) {
                const fixtureData = data.response.map((game) => ({
                    team1Logo: game.teams.home.logo,
                    team2Logo: game.teams.away.logo,
                    score: "TBD", // For upcoming fixtures, use TBD
                    date: new Date(game.fixture.date).toISOString().split('T')[0],
                    time: new Date(game.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }), // Format time as HH:MM
                    status: game.fixture.status // Match status (LIVE, NS, etc.)
                }));
                setGames(fixtureData);
            } else {
                setGames([]); // No fixtures found
            }
        } catch (error) {
            setError(`Error fetching Champions League data: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFixtures();
    }, []);

    return (
        <div className="home-fixtures-container">
            <h2 className="home-fixtures-section-title">Upcoming Champions League Fixtures</h2>

            {loading ? (
                <p>Loading fixtures...</p>
            ) : error ? (
                <p>{error}</p>
            ) : games.length === 0 ? (
                <p>No upcoming fixtures available.</p>
            ) : (
                <div className="home-fixtures">
                    {games.map((game, index) => (
                        <div className="home-fixture" key={index}>
                            <div className="home-fixture-teams">
                                <img src={game.team1Logo} alt="Team 1" className="home-fixture-team-logo" />
                                <span className="home-fixture-vs">VS</span>
                                <img src={game.team2Logo} alt="Team 2" className="home-fixture-team-logo" />
                            </div>
                            <div className="home-fixture-score">{game.score}</div>
                            <div className="home-fixture-date-time">{`${game.date}, ${game.time}`}</div>
                            {/* Live status check */}
                            {game.status === 'LIVE' && <span className="home-fixture-live-indicator">LIVE</span>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomeFixtures;
