import React from "react";
import React, { useEffect, useState } from "react";
import { getWeather } from "../api/weather";

function Detail({ city }) {
  const {
    Address: { City: cityName },
    Coords: { Lat: lat, Lon: lon },
  } = city;

  const [weather, setWeather] = useState(null);

  // Fetch weather data
  useEffect(() => {
    async function fetchWeather() {
      try {
        const weather = await getWeather(lat, lon);
        console.log("Weather:", weather);
        // Handle weather data here, e.g., update state
        setWeather(weather);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }

    fetchWeather();
  }, [lat, lon]);
  return <div></div>;
}

export default Detail;
