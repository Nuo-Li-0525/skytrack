import axios from "axios";

const BASE_URL = "https://singlesearch.alk.com/NA/api";

export const searchCities = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        query: query,
        authToken: process.env.NEXT_PUBLIC_TRIMBLE_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cities from Trimble Maps:", error);
    throw error;
  }
};
