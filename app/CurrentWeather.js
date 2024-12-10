import React from "react";

function CurrentWeather({ city }) {
  const {
    Address: { City: city, StateName: state, CountryFullName: country },
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
    <div>
      {/* header */}
      <div>
        <h2>
          {city}, {state}, {country}
        </h2>
      </div>
      {/* information */}
      <div>
        <div>
          <Image
            src={`https:${weather.current.condition.icon}`}
            alt="weather"
            width={100}
            height={100}
          />
          <p>{weather.current.condition.text}</p>
        </div>

        <div>
          <p>{weather.current.temp_c}</p>
          <p>°C</p>
        </div>

        <div>
          <p>Wind: {weather.current.wind_kph} kmph</p>
          <p>Precip: {weather.current.precip_mm} mm</p>
          <p>Pressure: {weather.current.pressure_mb} mb</p>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default CurrentWeather;
