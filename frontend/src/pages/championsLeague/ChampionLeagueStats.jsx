import Goals from "../../components/stats/Goals";
import Assists from "../../components/stats/Assists";
import YellowCards from "../../components/stats/YellowCards";
import RedCards from "../../components/stats/RedCards";
import './ChampionLeagueStats.css';


const ChampionLeagueStats = () => {
  const leagueId = 2;
  const season = "2024";

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
