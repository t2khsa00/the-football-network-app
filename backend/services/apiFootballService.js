import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.API_FOOTBALL_KEY;
const API_HOST = process.env.API_FOOTBALL_HOST;

const apiFootball = axios.create({
  baseURL: API_HOST,
  headers: {
    'x-apisports-key': API_KEY,
  },
});

const fetchData = async (endpoint, params) => {
  try {
    const response = await apiFootball.get(endpoint, { params });
    return response.data; // Return the full response data (includes pagination)
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export { fetchData };