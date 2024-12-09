"use client";

import Popular from "./components/Popular";
import Overview from "./components/Overview";
import Hourly from "./components/Hourly";
import axios from "axios";
import { useState } from "react";
import { searchCities } from "./api/trimble";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    console.log("Query:", query);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const data = await searchCities(value);

      const locations = data ? data.Locations : [];
      console.log("response:", data);
      setResults(locations);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };
  const handleSelect = (city) => {
    setSelectedCity(city);
    setQuery("");
    setResults([]); // Clear results after selection
  };

  return (
    <main className="flex flex-col items-center justify-center bg-white  text-black">
      <header className="mb-10">
        <h1 className="text-5xl">Skytrack</h1>
      </header>
      <div>
        {/* Search */}
        <div className="mb-10">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search for a city"
            className="border border-gray-300 p-2 w-full rounded"
          ></input>
          {results.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded shadow">
              {results.map((result, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(result)}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {result.ShortString}
                </li>
              ))}
            </ul>
          )}
          {selectedCity && (
            <p className="mt-4">Selected City: {selectedCity.ShortString}</p>
          )}
        </div>
        {/* Popular */}
        <div className="flex flex-row gap-2 items-center mb-10">
          <h2 className="pr-5">Popular</h2>
          <Popular city="Toronto" province="ON" temperature={22} />
          <Popular city="Calgary" province="AB" temperature={22} />
        </div>

        {/* current location */}
        <div>
          <h2>Calgary</h2>
          <Overview image={""} weather={"Sunny"} current={5} high={7} low={1} />
        </div>

        {/* hourly */}
        <div>
          <h2>Hourly</h2>
          <Hourly
            time="8am"
            weather={"Sunny"}
            temperature={5}
            feels={6}
            wind="22 km/h"
            windGust="20km/h"
            pop="30%"
            snow="0.1cm"
            rain="0.1mm"
          />
        </div>
      </div>
      <footer>
        <p></p>
      </footer>
    </main>
  );
}
