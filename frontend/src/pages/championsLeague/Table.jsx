import { useState, useEffect } from 'react';

const Table = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Mock data or API call to fetch table data
    const mockTable = [
      { team: 'Real Madrid', points: 12, goals: 25, matches: 6 },
      { team: 'Manchester City', points: 10, goals: 22, matches: 6 },
      // Add more mock data
    ];
    setTableData(mockTable);
  }, []);

  return (
    <div className="table">
      <h2>Standings</h2>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Points</th>
            <th>Goals</th>
            <th>Matches</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.team}</td>
              <td>{row.points}</td>
              <td>{row.goals}</td>
              <td>{row.matches}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
