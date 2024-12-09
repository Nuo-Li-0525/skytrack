import React, { useState, useEffect, useRef } from "react";
import { searchCities } from "./api/trimble";

function Search({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const inputRef = useRef(null); // For click outside of component

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const data = await searchCities(value);

      const locations = data ? data.Locations : [];
      setResults(locations);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleSelect = (city) => {
    setSelectedCity(city);
    setQuery("");
    setResults([]);

    onSelect(city);
  };

  // Add click outside of component event listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If clicked outside of the input, clear the search results
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setQuery("");
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-2 relative" ref={inputRef}>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a city"
        className="border border-gray-300 p-2 w-full rounded"
      />
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
  );
}

export default Search;
