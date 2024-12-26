import './Fixtures.css';

const Fixtures = () => {
  const games = [
    { team1Logo: "/FC_Barcelona_(crest).svg.webp", team2Logo: "/Real_Madrid_CF.svg.webp", score: "2 : 0", date: "Jan 1, 2024", time: "19:00" }, 
    { team1Logo: "/FC_Barcelona_(crest).svg.webp", team2Logo: "/Real_Madrid_CF.svg.webp", score: "5 : 0", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "/FC_Barcelona_(crest).svg.webp", team2Logo: "/Real_Madrid_CF.svg.webp", score: "2 : 3", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "/FC_Barcelona_(crest).svg.webp", team2Logo: "/Real_Madrid_CF.svg.webp", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "/FC_Barcelona_(crest).svg.webp", team2Logo: "/Real_Madrid_CF.svg.webp", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "/FC_Barcelona_(crest).svg.webp", team2Logo: "/Real_Madrid_CF.svg.webp", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "/FC_Barcelona_(crest).svg.webp", team2Logo: "/Real_Madrid_CF.svg.webp", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "/FC_Barcelona_(crest).svg.webp", team2Logo: "/Real_Madrid_CF.svg.webp", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "/FC_Barcelona_(crest).svg.webp", team2Logo: "/Real_Madrid_CF.svg.webp", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "/FC_Barcelona_(crest).svg.webp", team2Logo: "/Real_Madrid_CF.svg.webp", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "/FC_Barcelona_(crest).svg.webp", team2Logo: "/Real_Madrid_CF.svg.webp", date: "Jan 1, 2024", time: "19:00" },
    { team1Logo: "/FC_Barcelona_(crest).svg.webp", team2Logo: "/Real_Madrid_CF.svg.webp", date: "Jan 1, 2024", time: "19:00" },


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
            <div className="score">{game.score}</div>
            <div className="date-time">{`${game.date}, ${game.time}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fixtures;