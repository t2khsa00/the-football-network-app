import './Fixtures.css';

const Fixtures = () => {
  const games = [
    { team1Logo: "../../../public/Real_Madrid_CF.svg.webp", team2Logo: "../../../public/FC_Barcelona_(crest).svg.webp", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "../../../public/Real_Madrid_CF.svg.webp", team2Logo: "../../../public/FC_Barcelona_(crest).svg.webp", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "../../../public/Real_Madrid_CF.svg.webp", team2Logo: "../../../public/FC_Barcelona_(crest).svg.webp", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "../../../public/Real_Madrid_CF.svg.webp", team2Logo: "../../../public/FC_Barcelona_(crest).svg.webp", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "../../../public/Real_Madrid_CF.svg.webp", team2Logo: "../../../public/FC_Barcelona_(crest).svg.webp", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "../../../public/Real_Madrid_CF.svg.webp", team2Logo: "../../../public/FC_Barcelona_(crest).svg.webp", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "../../../public/Real_Madrid_CF.svg.webp", team2Logo: "../../../public/FC_Barcelona_(crest).svg.webp", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "../../../public/Real_Madrid_CF.svg.webp", team2Logo: "../../../public/FC_Barcelona_(crest).svg.webp", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "../../../public/Real_Madrid_CF.svg.webp", team2Logo: "../../../public/FC_Barcelona_(crest).svg.webp", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "../../../public/Real_Madrid_CF.svg.webp", team2Logo: "../../../public/FC_Barcelona_(crest).svg.webp", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "../../../public/Real_Madrid_CF.svg.webp", team2Logo: "../../../public/FC_Barcelona_(crest).svg.webp", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "../../../public/Real_Madrid_CF.svg.webp", team2Logo: "../../../public/FC_Barcelona_(crest).svg.webp", date: "Jan 1, 2024", time: "19:00" },


    // Add more games as needed
  ];

  return (
    <div className="fixtures-container">
      <h2 className="section-title">Todays Fixtures</h2>
      <div className="fixtures">
        {games.map((game, index) => (
          <div className="fixture" key={index}>
            <div className="teams">
              <img src={game.team1Logo} alt="Team 1" className="team-logo" />
              <span className="vs">VS</span>
              <img src={game.team2Logo} alt="Team 2" className="team-logo" />
            </div>
            <div className="game-info">
              <span className="score">{game.score}</span>
              <span className="date-time">{`${game.date}, ${game.time}`}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fixtures;