import React from "react";

function Observation({ weather }) {
  const day1 = weather.forecast.forecastday[0];
  const current = weather.current;
  if (current == null) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex flex-row gap-5 justify-center">
      <div className="bg-slate-400 rounded-2xl p-5 w-60">
        <h1>{day1.date}</h1>
        <p>Sunrise: {day1.astro.sunrise}</p>
        <p>Sunset: {day1.astro.sunset}</p>
        <p>Moonrise: {day1.astro.moonrise}</p>
        <p>Moonset: {day1.astro.moonset}</p>
      </div>

      <div className="bg-slate-400 rounded-2xl p-5 w-30">
        <h1>Wind</h1>
        <p>{current.wind_kph} km/h</p>
        <p>Degree: {current.wind_degree}</p>
        <p>Direction: {current.wind_dir}</p>
        <p>Gust: {current.gust_kph} km/h</p>
      </div>

      <div className="bg-slate-400 rounded-2xl p-5 w-30">
        <h1>Pressure</h1>
        <p>{current.pressure_mb} mb</p>
        <p>{current.pressure_in} in</p>
      </div>

      <div className="bg-slate-400 rounded-2xl p-5 w-30">
        <h1>Humidity</h1>
        <p>{current.humidity}%</p>
      </div>

      <div className="bg-slate-400 rounded-2xl p-5 w-30">
        <h1>Visibility</h1>
        <p>{current.vis_km} km</p>
        <p>{current.vis_miles} miles</p>
      </div>
    </div>
  );
}

export default Observation;
