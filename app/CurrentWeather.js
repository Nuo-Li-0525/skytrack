import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getWeather } from "./api/weather";

function CurrentWeather({ city }) {
  const {
    Address: { City: cityName, StateName: state, CountryFullName: country },
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
    <div className="flex flex-col justify-center items-center bg-slate-400 rounded-2xl border-red-400">
      {/* header */}
      <div className="flex flex-row justify-center text-3xl">
        {weather == null && <p>Loading...</p>}
        {weather && (
          <h2>
            {cityName}, {state}, {country}
          </h2>
        )}
      </div>
      {/* information */}
      {weather && (
        <div>
          <div className="flex flex-row justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <Image
                src={`https:${weather.current.condition.icon}`}
                alt="weather"
                width={150}
                height={10}
              />
            </div>

            <div className="ml-5 justify-center items-center">
              <p>{weather.current.condition.text}</p>
              <p className="text-3xl">{weather.current.temp_c}°C</p>
            </div>

            <div className="ml-5">
              <p>Wind: {weather.current.wind_kph} kmph</p>
              <p>Precip: {weather.current.precip_mm} mm</p>
              <p>Pressure: {weather.current.pressure_mb} mb</p>
            </div>
          </div>

          {/* forecast */}
          <div className="flex flex-col items-center">
            <h2 className="text-center text-3xl">Forecast</h2>
            <div className="flex flex-row justify-center items-center">
              {weather.forecast.forecastday.map((day, index) => (
                <div key={index} className="flex flex-col items-center mx-4">
                  <p className="text-2xl">{getWeekday(day.date)}</p>
                  <Image
                    src={`https:${day.day.condition.icon}`}
                    alt="icon"
                    width={100}
                    height={100}
                  />
                  <p>{day.day.avgtemp_c}°C</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getWeekday(timeString) {
  const isoString = `${timeString}T00:00:00Z`; // 假设时间是 UTC 时间
  const date = new Date(isoString);
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekdays[date.getDay()];
}

export default CurrentWeather;
