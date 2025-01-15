import Goals from "../../components/Goals";
import Assists from "../../components/Assists";
import './ChampionLeagueStats.css';
import YellowCards from "../../components/YellowCards";
import RedCards from "../../components/RedCards";


const ChampionLeagueStats = () => {
  const leagueId = 2; // Champions League ID
  const season = "2024"; // Example season

  return (
    <div className="stats-page">
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
