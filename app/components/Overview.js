import React from "react";
import Image from "next/image";

function Overview({ image, weather, current, feels, high, low }) {
  return (
    <div className="flex flex-row bg-black bg-opacity-50 rounded-lg">
      <Image src={image} alt="weather" width={100} height={100} />
      <div className="flex flex-row">
        <p className="text-9xl">{current}</p>
        <p className="mt-3 text-3xl">°C</p>
      </div>
      <div className="flex flex-col ml-5 mt-3 text-2xl">
        <p>{weather}</p>
        <p>Feels {feels}</p>
        <p>
          H:{high}° L{low}°
        </p>
      </div>
    </div>
  );
}

export default Overview;
