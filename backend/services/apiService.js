import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const SPORTMONKS_API_TOKEN = process.env.SPORTMONKS_API_TOKEN;
const BASE_URL = 'https://api.sportmonks.com/v3/football';


// Fetch top scorers
export const fetchTopScorers = async (seasonId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/topscorers/seasons/${seasonId}?api_token=${SPORTMONKS_API_TOKEN}`
    );
    console.log('Top Scorers API Response:', response.data); // Log API response
    return response.data.data;
  } catch (error) {
    console.error('Error fetching top scorers:', error);
    throw error;
  }
};

// Fetch player statistics (including assists)
export const fetchPlayerStatistics = async (playerId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/players/${playerId}?api_token=${SPORTMONKS_API_TOKEN}&include=statistics`
    );
    console.log('Player Stats API Response:', response.data); // Log API response
    return response.data.data;
  } catch (error) {
    console.error('Error fetching player statistics:', error);
    throw error;
  }
};

// Fetch fixtures
export const fetchFixtures = async (seasonId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/fixtures/seasons/${seasonId}?api_token=${SPORTMONKS_API_TOKEN}`
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    throw error;
  }
};

// Fetch standings
export const fetchStandings = async (seasonId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/standings/seasons/${seasonId}?api_token=${SPORTMONKS_API_TOKEN}`
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching standings:', error);
    throw error;
  }
};

// Fetch cards (red and yellow)
export const fetchCards = async (seasonId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/cards/seasons/${seasonId}?api_token=${SPORTMONKS_API_TOKEN}`
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw error;
  }
};