import  { useEffect, useState } from "react";
import { fetchTeams } from "../../ApiServices/Api"; // your existing function
import "./ChampionLeagueTeams.css";

const CHAMPIONS_LEAGUE_ID = 2;
const SEASON = 2024;

const ChampionLeagueTeams = () => {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchTeams(CHAMPIONS_LEAGUE_ID, SEASON);
        // data = [{ team: {id, name, logo}, venue: {...} }, ...]

        // Sort teams A–Z
        const sorted = [...data].sort((a, b) =>
          a.team.name.localeCompare(b.team.name)
        );

        setTeams(sorted);
        setFilteredTeams(sorted);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadTeams();
  }, []);

  // Filter teams by search
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredTeams(teams);
      return;
    }

    const filtered = teams.filter((item) =>
      item.team.name.toLowerCase().includes(query)
    );
    setFilteredTeams(filtered);
  };

  if (loading) {
    return <div className="cl-loading">Loading teams...</div>;
  }
  if (error) {
    return <div className="cl-error">Error: {error}</div>;
  }

  return (
    <div className="ucl-teams-page">
      {/* Optional Banner/Header */}
      <div className="ucl-page-header">
        <h1>UEFA Champions League Teams</h1>
      </div>

      {/* Optional Search/Filter */}
      <div className="ucl-search-wrapper">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a team..."
          className="ucl-search-input"
        />
      </div>

      {/* Teams Grid */}
      <div className="ucl-teams-grid">
        {filteredTeams.map(({ team }) => (
          <div key={team.id} className="ucl-team-card">
            <div className="ucl-team-logo-wrapper">
              <img src={team.logo} alt={team.name} className="ucl-team-logo" />
            </div>
            <div className="ucl-team-name">{team.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChampionLeagueTeams;
