import React from "react";

function Popular({ city, province, temperature }) {
  return (
    <div className="flex flex-row items-center justify-center bg-black bg-opacity-50 text-white p-5 rounded-full h-10">
      <p>
        {city}, {province}
      </p>
      <p className="bold ml-2">{temperature}°</p>
    </div>
  );
}

export default Popular;
