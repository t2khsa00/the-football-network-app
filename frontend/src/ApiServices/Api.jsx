import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Fetch fixtures
export const fetchFixtures = async (leagueId, season) => {
  const response = await axios.get(`${BACKEND_URL}/fixtures`, {
    params: { leagueId, season },
  });
  return response.data;
};

// Fetch standings
export const fetchStandings = async (leagueId, season) => {
  const response = await axios.get(`${BACKEND_URL}/standings`, {
    params: { leagueId, season },
  });
  return response.data;
};

// ...........................//
// Fetch statistics by Players //
//...........................//

// Fetch top scorers
export const fetchTopScorers = async (leagueId, season) => {
  const response = await axios.get(`${BACKEND_URL}/topscorers`, {
    params: { leagueId, season },
  });
  return response.data;
};

// Fetch top assists
export const fetchTopAssists = async (leagueId, season) => {
  const response = await axios.get(`${BACKEND_URL}/topassists`, {
    params: { leagueId, season },
  });
  return response.data;
};

// Fetch yellow cards
export const fetchTopYellowCards = async (leagueId, season) => {
  const response = await axios.get(`${BACKEND_URL}/topyellowcards`, {
    params: { leagueId, season },
  });
  return response.data;
};

// Fetch red cards
export const fetchTopRedCards = async (leagueId, season) => {
  const response = await axios.get(`${BACKEND_URL}/topredcards`, {
    params: { leagueId, season },
  });
  return response.data;
};


// ...........................//
// Fetch statistics by clubs //
//...........................//

export const fetchTeams = async (leagueId, season) => {
  const response = await axios.get(`${BACKEND_URL}/team`, {
    params: { leagueId, season },
  });
  return response.data.response;
};

