import React from "react";
import WeatherCard from "./components/WeatherCard";

function CityList({ cities }) {
  return (
    <ul>
      {cities.map((city, index) => (
        <li key={index}>
          <h2>{city.Address.City}</h2>
          <WeatherCard city={city} />
        </li>
      ))}
    </ul>
  );
}

export default CityList;
