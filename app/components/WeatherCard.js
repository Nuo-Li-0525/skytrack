import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getWeather } from "../api/weather";

function WeatherCard({ city }) {
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

  return (
    <div>
      {weather == null && <p>Loading...</p>}
      {weather && (
        <div className="w-[600px] h-[140px] flex flex-row bg-slate-400 bg-opacity-50 rounded-lg justify-between items-center p-5">
          <div className="flex flex-shrink-0 justify-center items-center h-full">
            <Image
              src={`https:${weather.current.condition.icon}`}
              alt="icon"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
          <div className="flex flex-row">
            <p className="text-8xl">{weather.current.temp_c}</p>
            <p className="mt-3 text-3xl">°C</p>
          </div>
          <div className="flex flex-col ml-10 mt-3 text-2xl gap-2">
            <p>{weather.current.condition.text}</p>
            <p>Feels {weather.current.feelslike_c}</p>
            <p>
              H:{weather.forecast.forecastday[0].day.maxtemp_c}° L
              {weather.forecast.forecastday[0].day.mintemp_c}°
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
