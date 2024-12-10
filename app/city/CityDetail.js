"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { getWeather } from "../api/weather";
import SevenDays from "../components/SevenDays";
import Observation from "./Observation";
import Hourly from "./Hourly";

// force render on client
export const dynamic = "force-dynamic";

function CityDetail() {
  const searchParams = useSearchParams();
  const cityName = searchParams.get("city");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  const [weather, setWeather] = useState(null);

  // Fetch weather data
  useEffect(() => {
    if (!lat || !lon) return;
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

  if (weather == null) {
    return <p>Loading...</p>;
  }
  const hourlyData = weather.forecast.forecastday[0]?.hour || [];

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="bg-slate-400 rounded-2xl flex justify-center items-center h-20">
        <h1 className="text-5xl">
          {weather.location.name}, {weather.location.region},{" "}
          {weather.location.country}
        </h1>
      </div>
      {/* 7 days */}
      <div className="mt-10">
        <h1 className="text-5xl text-center mb-5">7 Days</h1>
        <SevenDays weather={weather} />
      </div>

      {/* observation */}
      <div className="mt-10">
        <h1 className="text-5xl text-center mb-5">Observations</h1>
        <Observation weather={weather} />
      </div>

      {/* Hourly */}
      <div className="mt-10">
        <h1 className="text-5xl text-center">Hourly</h1>
        <div className="flex flex-col gap-4 mt-5">
          {hourlyData.map((hour, index) => (
            <Hourly
              key={index}
              image={`https:${hour.condition.icon}`}
              time={hour.time}
              weather={hour.condition.text}
              temperature={hour.temp_c}
              feels={hour.feelslike_c}
              wind={hour.wind_kph}
              windGust={hour.gust_kph}
              pop={hour.pop}
              snow={hour.chance_of_snow || 0}
              rain={hour.chance_of_rain || 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CityDetail;
