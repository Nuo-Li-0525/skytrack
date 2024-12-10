import React from "react";

import Image from "next/image";

function Hourly({
  image,
  time,
  weather,
  temperature,
  feels,
  wind,
  windGust,
  pop,
  snow,
  rain,
}) {
  return (
    <div className="flex flex-row bg-black bg-opacity-50 rounded-lg w-full max-w-[950px] mx-auto items-center justify-center">
      <h2 className="self-start ml-2 mt-2 text-2xl">{time}</h2>
      <Image src={image} alt="icon" width={100} height={100} />
      <div className="flex flex-row">
        <p className="text-6xl">{temperature}</p>
        <p className="mt-1 text-1xl">°C</p>
      </div>
      <div className="flex flex-col ml-5">
        <p>{weather}</p>
        <p>Feels {feels}</p>
      </div>

      <div className="flex flex-col ml-5">
        <p>Wind: {wind}</p>
        <p>Wind Gust: {windGust}</p>
      </div>

      <div className="flex flex-col ml-5">
        <p>POP: {pop}</p>
        <p>Snow: {snow}</p>
        <p>Rain: {rain}</p>
      </div>
    </div>
  );
}

export default Hourly;
