import axios from "axios";

const API_BASE_URL = "https://api-football-v1.p.rapidapi.com/v3";
const API_HEADERS = {
  'x-rapidapi-key': 'cc3966ad8amsh022b69077598bc1p1762acjsn9db201a954ca',
  'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
};

export const fetchTopScorers = async (leagueId, season) => {
  const response = await axios.get(`${API_BASE_URL}/players/topscorers`, {
    headers: API_HEADERS,
    params: { league: leagueId, season },
  });
  return response.data.response;
};

export const fetchTopAssists = async (leagueId, season) => {
  const response = await axios.get(`${API_BASE_URL}/players/topassists`, {
    headers: API_HEADERS,
    params: { league: leagueId, season },
  });
  return response.data.response;
};

// Fetch top yellow cards
export const fetchTopYellowCards = async (leagueId, season) => {
    const response = await axios.get(`${API_BASE_URL}/players/topyellowcards`, {
      headers: API_HEADERS,
      params: { league: leagueId, season },
    });
    return response.data.response;
  };
  
  // Fetch top red cards
  export const fetchTopRedCards = async (leagueId, season) => {
    const response = await axios.get(`${API_BASE_URL}/players/topredcards`, {
      headers: API_HEADERS,
      params: { league: leagueId, season },
    });
    return response.data.response;
  };
  