import React from "react";
import { useState } from "react";
import axios from "axios";
import { FaTemperatureHigh } from "react-icons/fa";
import { TiWeatherCloudy } from "react-icons/ti";
import { BiWind } from "react-icons/bi";

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
      <div className="info">
        {typeof weatherData.main === "undefined" ? (
          <div className="empty">
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
          </div>
        ) : (
          <div>
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
            <div className="up">
              <h2>{weatherData.name}</h2>

              <h2>{Math.round(weatherData.main.temp)}°C</h2>

              <h2>{weatherData.weather[0].main}</h2>
            </div>
            <div className="bottom">
              <div className="sp">
                <h2>
                  <FaTemperatureHigh />{" "}
                  {Math.round(weatherData.main.feels_like)}°C Feel
                </h2>
              </div>

              <div className="sp">
                <h2>
                  <BiWind /> {weatherData.wind.speed} Speed
                </h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
