import axios from "axios";

const BASE_URL = "https://api.weatherapi.com/v1";

export const getWeather = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        q: `${lat},${lon}`,
        days: 3,
        key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather from OpenWeather:", error);
    throw error;
  }
};

export const getCurrentLocationWeather = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        q: "auto:ip",
        days: 3,
        key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather from OpenWeather:", error);
    throw error;
  }
};
