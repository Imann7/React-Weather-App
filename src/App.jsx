import React from "react";
import { useState } from "react";
import axios from "axios";
import { FaTemperatureHigh } from "react-icons/fa";
import { TiWeatherCloudy } from "react-icons/ti";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");

  const apiKey = "d67299db102cd20ee57ace32d08d0192";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const getWeather = (event) => {
    if (event.key == "Enter") {
      axios.get(url).then((response) => {
        setWeatherData(response.data);
        console.log(response.data);
      });
    }
  };

  return (
    <div className="wrapper">
      <div className="name">
        <h1>Your Reliable Weather App</h1>
      </div>

      <div className="search">
        <input
          placeholder="Search City..."
          value={city}
          onChange={(event) => setCity(event.target.value)}
          onKeyPress={getWeather}
        />
      </div>

      <div className="info">
        {typeof weatherData.main === "undefined" ? (
          <div className="empty">
            <p>Discover any location's weather.</p>
          </div>
        ) : (
          <div>
            <div className="up">
              <h2>{weatherData.name}</h2>
              <h2>{Math.round(weatherData.main.temp)}°C</h2>
            </div>
            <div className="bottom">
              <div>
                <h2>
                  <FaTemperatureHigh />{" "}
                  {Math.round(weatherData.main.feels_like)}°C
                </h2>
                <span>Real Feel</span>
              </div>

              <div>
                <h2>
                  <TiWeatherCloudy /> {weatherData.weather[0].main}
                </h2>
                <span>Weather </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
