import React from "react";
import { useState } from "react";
import axios from "axios";
import { FaTemperatureHigh } from "react-icons/fa";
import { TiWeatherCloudy } from "react-icons/ti";
import { BiWind } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import Particles from "./Particles";

import "./index.css";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");

  const apiKey = "d67299db102cd20ee57ace32d08d0192";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const getWeather = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setWeatherData(response.data);
        console.log(response.data);
      });
    }
  };

  return (
    <div className="container">
    
      <div className="side">
        <div className="search">
          <input
            placeholder="Search City..."
            value={city}
            onChange={(event) => setCity(event.target.value)}
            onKeyPress={getWeather}
          />
          <FaSearch className="search-icon" />
        </div>

        <div className="info">
          {typeof weatherData.main === "undefined" ? (
            <div className="empty"></div>
          ) : (
            <div>
              <div className="up">
                <h2>{weatherData.name}</h2>
                <p>Long/Lat:</p>
                <hr />
                <h5>
                  {new Date().getDate()}-{new Date().getMonth() + 1}-
                  {new Date().getFullYear()}
                </h5>
                <p>Timezone:</p>
              </div>
              <hr />
              <div className="mid">
                <img src={weatherData.weather[0].icon} alt="" />
                <h1>{Math.round(weatherData.main.temp)}°C</h1>
                <h3>{weatherData.weather[0].main}</h3>
                <p>Sunrise:</p>
                <p>Sunset:</p>
              </div>
              <div className="bottom">
                <div className="sp">
                  <FaTemperatureHigh className="icon" />
                  <h5>{Math.round(weatherData.main.feels_like)}°C</h5>
                </div>
                <div className="sp">
                  <BiWind className="icon" />
                  <h5>{weatherData.wind.speed} km/h</h5>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
