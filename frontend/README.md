# The Football Network

This is the backend API for the **Football Network** project. It provides access to football-related data such as player statistics, team statistics, fixtures, and standings using the [API-Football](https://www.api-football.com/) service.

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [Endpoints](#endpoints)
   - [Players](#players)
   - [Teams](#teams)
   - [Fixtures](#fixtures)
   - [Standings](#standings)
3. [Rate Limits](#rate-limits)
4. [Caching](#caching)
5. [WebSocket Support](#websocket-support)
6. [Contributing](#contributing)

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v10 or higher)
- API-Football API key (from [API-Football](https://www.api-football.com/))

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/football-network-backend.git
   cd football-network-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your API key:
   ```env
   API_FOOTBALL_KEY=your_api_key_here
   API_FOOTBALL_HOST=https://v3.football.api-sports.io
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`.

---

## Endpoints

### Players

#### 1. Get General Player Stats
- **Endpoint**: `GET /api/players/stats`
- **Description**: Fetch general statistics for a specific player.
- **Parameters**:
  - `playerId` (required): The ID of the player.
  - `league` (required): The ID of the league.
  - `season` (required): The season year (e.g., 2023).
- **Example**:
  ```
  GET /api/players/stats?playerId=276&league=39&season=2023
  ```

#### 2. Get Top 10 Players by Goals
- **Endpoint**: `GET /api/players/top-goals`
- **Description**: Fetch the top 10 players by goals in a league and season.
- **Parameters**:
  - `league` (required): The ID of the league.
  - `season` (required): The season year (e.g., 2023).
- **Example**:
  ```
  GET /api/players/top-goals?league=39&season=2023
  ```

#### 3. Get Top 10 Players by Assists
- **Endpoint**: `GET /api/players/top-assists`
- **Description**: Fetch the top 10 players by assists in a league and season.
- **Parameters**:
  - `league` (required): The ID of the league.
  - `season` (required): The season year (e.g., 2023).
- **Example**:
  ```
  GET /api/players/top-assists?league=39&season=2023
  ```

#### 4. Get Top 10 Players by Passes
- **Endpoint**: `GET /api/players/top-passes`
- **Description**: Fetch the top 10 players by passes in a league and season.
- **Parameters**:
  - `league` (required): The ID of the league.
  - `season` (required): The season year (e.g., 2023).
- **Example**:
  ```
  GET /api/players/top-passes?league=39&season=2023
  ```

#### 5. Get Top 10 Players by Dribbles
- **Endpoint**: `GET /api/players/top-dribbles`
- **Description**: Fetch the top 10 players by successful dribbles in a league and season.
- **Parameters**:
  - `league` (required): The ID of the league.
  - `season` (required): The season year (e.g., 2023).
- **Example**:
  ```
  GET /api/players/top-dribbles?league=39&season=2023
  ```

#### 6. Get Top 10 Players by Cards
- **Endpoint**: `GET /api/players/top-cards`
- **Description**: Fetch the top 10 players by yellow/red cards in a league and season.
- **Parameters**:
  - `league` (required): The ID of the league.
  - `season` (required): The season year (e.g., 2023).
- **Example**:
  ```
  GET /api/players/top-cards?league=39&season=2023
  ```

#### 7. Get Top 10 Players by Appearances
- **Endpoint**: `GET /api/players/top-appearances`
- **Description**: Fetch the top 10 players by appearances in a league and season.
- **Parameters**:
  - `league` (required): The ID of the league.
  - `season` (required): The season year (e.g., 2023).
- **Example**:
  ```
  GET /api/players/top-appearances?league=39&season=2023
  ```

#### 8. Get Top 10 Players by Shots
- **Endpoint**: `GET /api/players/top-shots`
- **Description**: Fetch the top 10 players by total shots in a league and season.
- **Parameters**:
  - `league` (required): The ID of the league.
  - `season` (required): The season year (e.g., 2023).
- **Example**:
  ```
  GET /api/players/top-shots?league=39&season=2023
  ```

#### 9. Get Top 10 Players by Tackles
- **Endpoint**: `GET /api/players/top-tackles`
- **Description**: Fetch the top 10 players by tackles in a league and season.
- **Parameters**:
  - `league` (required): The ID of the league.
  - `season` (required): The season year (e.g., 2023).
- **Example**:
  ```
  GET /api/players/top-tackles?league=39&season=2023
  ```

#### 10. Get Top 10 Players by Penalties
- **Endpoint**: `GET /api/players/top-penalties`
- **Description**: Fetch the top 10 players by penalties scored in a league and season.
- **Parameters**:
  - `league` (required): The ID of the league.
  - `season` (required): The season year (e.g., 2023).
- **Example**:
  ```
  GET /api/players/top-penalties?league=39&season=2023
  ```

#### 11. Get Top 10 Goalkeepers by Saves
- **Endpoint**: `GET /api/players/top-saves`
- **Description**: Fetch the top 10 goalkeepers by saves in a league and season.
- **Parameters**:
  - `league` (required): The ID of the league.
  - `season` (required): The season year (e.g., 2023).
- **Example**:
  ```
  GET /api/players/top-saves?league=39&season=2023
  ```

---

### Teams

#### 1. Get Team Statistics
- **Endpoint**: `GET /api/teams/particular-stats`
- **Description**: Fetch detailed statistics for a specific team in a league and season.
- **Parameters**:
  - `league` (required): The ID of the league.
  - `season` (required): The season year (e.g., 2023).
  - `team` (required): The ID of the team.
- **Example**:
  ```
  GET /api/teams/particular-stats?league=39&season=2023&team=33
  ```

---

### Fixtures

#### 1. Get Fixtures
- **Endpoint**: `GET /api/fixtures`
- **Description**: Fetch fixtures for a league and season.
- **Parameters**:
  - `league` (required): The ID of the league.
  - `season` (required): The season year (e.g., 2023).
- **Example**:
  ```
  GET /api/fixtures?league=39&season=2023
  ```

---

### Standings

#### 1. Get Standings
- **Endpoint**: `GET /api/standings`
- **Description**: Fetch league standings for a league and season.
- **Parameters**:
  - `league` (required): The ID of the league.
  - `season` (required): The season year (e.g., 2023).
- **Example**:
  ```
  GET /api/standings?league=39&season=2023
  ```

---

## Rate Limits
The API uses the [API-Football](https://www.api-football.com/) service, which has rate limits:
- **Free Plan**: 100 requests/day.
- **Paid Plans**: Higher limits (check API-Football documentation).

---

## Caching
- Responses are cached for **30 minutes** to reduce API calls and improve performance.
- Cache keys are based on the endpoint and parameters.

---

## WebSocket Support
- The API supports real-time updates via WebSocket.
- Events are emitted when data is updated (e.g., `fixturesUpdate`, `standingsUpdate`).

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

---