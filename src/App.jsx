import React from "react";
import { useState } from "react";
import axios from "axios";
import { FaTemperatureHigh } from "react-icons/fa";
import { TiWeatherCloudy } from "react-icons/ti";
import { BiWind } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import Particles from "./Particles";

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
    
    <div>
       
      <div className="wrapper">
      <Particles />
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
          <div className="empty"></div>
        ) : (
          <div>
            <div className="up">
              <h2>{weatherData.name}</h2>

              <h5>
              {new Date().getDate()}-{new Date().getMonth() + 1}-{new Date().getFullYear()}
                
              </h5>
            </div>
            <div className="mid">
              <h1>{Math.round(weatherData.main.temp)}°C</h1>

              <h3>{weatherData.weather[0].main}</h3>
            </div>
            <div className="bottom">
              <div className="sp">
                <h5>
                  <FaTemperatureHigh />{" "}
                  {Math.round(weatherData.main.feels_like)}°C 
                </h5>
              </div>

              <div className="sp">
                <h5>
                  <BiWind /> {weatherData.wind.speed} km/h
                </h5>
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
