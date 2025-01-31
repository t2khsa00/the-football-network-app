import Goals from "../../components/playerStats/Goals";
import Assists from "../../components/playerStats/Assists";
import YellowCards from "../../components/playerStats/YellowCards";
import RedCards from "../../components/playerStats/RedCards";
import "./ChampionLeagueStats.css";

// Player Stats


const ChampionLeagueStats = () => {
  const leagueId = 2;
  const season = "2024";

  return (
    <div className="stats-page">
      <h1>Champion League Stats</h1>
      <div className="main-stats">
        <Goals leagueId={leagueId} season={season} />
        <Assists leagueId={leagueId} season={season} />
        <YellowCards leagueId={leagueId} season={season} />
        <RedCards leagueId={leagueId} season={season} />
      </div>
    </div>
  );
};

export default ChampionLeagueStats;
