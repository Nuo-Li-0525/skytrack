"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { getWeather } from "../api/weather";

function CityDetail() {
  const searchParams = useSearchParams();
  const cityName = searchParams.get("city");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

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
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <p>City: {cityName}</p>
        <p>Lat: {lat}</p>
        <p>Lon: {lon}</p>
      </div>
    </Suspense>
  );
}

export default CityDetail;
