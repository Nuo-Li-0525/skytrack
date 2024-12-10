"use client";

import Popular from "./components/Popular";
import { useEffect, useState } from "react";
import CityList from "./CityList";
import WeatherCard from "./components/WeatherCard";
import { getCurrentLocationWeather, getWeather } from "./api/weather";
import { searchCities } from "./api/trimble";
import Search from "./Search";
import CurrentWeather from "./CurrentWeather";
import { useRouter } from "next/router";

export default function Home() {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState(null);

  useEffect(() => {
    async function fetchCurrentCity() {
      try {
        // Get current location weather including city name
        const weather = await getCurrentLocationWeather();

        if (weather) {
          const data = await searchCities(weather.location.name);

          const locations = data ? data.Locations : [];
          console.log("Locations:", locations);
          setCurrentCity(locations.length > 0 ? locations[0] : null);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
      return () => {};
    }
    fetchCurrentCity();
  }, []);
  const addCity = (city) => {
    setCities((prevCities) => [...prevCities, city]);
  };

  const handleCityClick = (city) => {
    const { Lat: lat, Lon: lon } = city.Coords;
    const cityName = city.Address.City;

    window.location.href = `/city?city=${cityName}&lat=${lat}&lon=${lon}`;
  };

  return (
    <main className="flex flex-col items-center justify-center bg-white  text-black">
      <header className="mb-10">
        <h1 className="text-5xl">Skytrack</h1>
      </header>
      <div className="flex flex-row">
        <div>
          {/* Search */}
          <Search onSelect={addCity} />

          {/* Popular */}
          <div className="flex flex-row gap-2 items-center mb-10">
            <h2 className="pr-5">Popular</h2>
            <Popular city="Toronto" province="ON" temperature={22} />
            <Popular city="Calgary" province="AB" temperature={22} />
          </div>

          {/* current location */}
          {currentCity && (
            <div
              onClick={() => handleCityClick(currentCity)}
              className="cursor-pointer"
            >
              <h2>Current: {currentCity.Address.City}</h2>
              <WeatherCard city={currentCity} />
            </div>
          )}

          {/* city list */}
          <CityList cities={cities} onCityClick={handleCityClick} />
        </div>
        <div className="ml-10">
          {currentCity && <CurrentWeather city={currentCity} />}
        </div>
      </div>
      <footer>
        <p></p>
      </footer>
    </main>
  );
}
