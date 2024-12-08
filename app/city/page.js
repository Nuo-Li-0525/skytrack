"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { getWeather } from "../api/weather";

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
  return (
    <div>
      <p>City: {cityName}</p>
      <p>Lat: {lat}</p>
      <p>Lon: {lon}</p>
    </div>
  );
}

export default CityDetail;
