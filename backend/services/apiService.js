import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_BASE_URL = "https://api-football-v1.p.rapidapi.com/v3";
const API_HEADERS = {
  "x-rapidapi-key": process.env.API_FOOTBALL_KEY,
  "x-rapidapi-host": process.env.API_FOOTBALL_HOST,
};

export const fetchFromApiFootball = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
      headers: API_HEADERS,
      params,
    });
    return response.data.response;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error.message);
    throw error;
  }
};
