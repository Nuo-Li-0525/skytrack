import Popular from "./components/Popular";
import Overview from "./components/Overview";
import Hourly from "./components/Hourly";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-white  text-black">
      <header className="mb-10">
        <h1 className="text-5xl">Skytrack</h1>
      </header>
      <div>
        {/* Popular */}
        <div className="flex flex-row gap-2 items-center mb-10">
          <h2 className="pr-5">Popular</h2>
          <Popular city="Toronto" province="ON" celsius={22} />
          <Popular city="Calgary" province="AB" celsius={22} />
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
