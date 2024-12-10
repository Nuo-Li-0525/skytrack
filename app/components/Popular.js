import React, { useEffect, useState } from "react";

import { getWeather } from "../api/weather";

function Popular({ city, onClick }) {
  const {
    Address: { City: cityName, State: state },
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

  return (
    <div
      className="flex flex-row items-center justify-center bg-slate-400 bg-opacity-50 text-white p-5 rounded-full h-10 whitespace-nowrap cursor-pointer"
      onClick={() => onClick(city)}
    >
      {weather == null && <p>Loading...</p>}
      {weather && (
        <>
          <p className="whitespace-nowrap">
            {cityName}, {state}
          </p>
          <p className="bold ml-2 whitespace-nowrap">
            {weather.current.temp_c}°C
          </p>
        </>
      )}
    </div>
  );
}

export default Popular;
