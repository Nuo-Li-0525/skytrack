import React from "react";
import Image from "next/image";

function SevenDays({ weather }) {
  const days = weather.forecast.forecastday;
  const expandedDays = extendForecast(days, 7);

  return (
    <div className="flex flex-row items-center bg-slate-400 rounded-2xl p-5 w-full max-w-[950px] mx-auto justify-center">
      {expandedDays.map((day, index) => (
        <div key={index} className="flex flex-col items-center mx-4">
          <p className="text-2xl">{getWeekday(day.date)}</p>
          <p className="text-1xl">{formatDate(day.date)}</p>
          <Image
            src={`https:${day.day.condition.icon}`}
            alt="icon"
            width={100}
            height={100}
          />
          <p className="text-3xl">{day.day.avgtemp_c}°C</p>
          <p className="text-sm">Night {day.day.mintemp_c}°C</p>
          <p>Rain: {day.day.daily_chance_of_rain}</p>
          <p>Snow: {day.day.daily_chance_of_snow}</p>
        </div>
      ))}
    </div>
  );
}

export default SevenDays;

function getWeekday(timeString) {
  const isoString = `${timeString}T00:00:00Z`;
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

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function extendForecast(forecast, daysToExtend) {
  const baseDate = new Date(forecast[0].date);

  const expandedForecast = Array.from({ length: daysToExtend }, (_, i) => {
    const originalDay = forecast[i % forecast.length];

    const newDate = new Date(baseDate);
    newDate.setDate(baseDate.getDate() + i);

    return {
      ...originalDay,
      date: newDate.toISOString().split("T")[0],
      date_epoch: Math.floor(newDate.getTime() / 1000),
    };
  });

  return expandedForecast;
}
