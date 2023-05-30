import React, { useState } from "react";
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

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date().toLocaleDateString("en-GB", options);

  const sunriseTime =
    weatherData.sys && weatherData.sys.sunrise
      ? new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      : "";
  const sunsetTime =
    weatherData.sys && weatherData.sys.sunset
      ? new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      : "";

  const getRandomJoke = () => {
    const jokes = [
      "Why did the fog go to school? Because it wanted to be a little mist-taught!",
      'What did the tornado say to the car? "Want to go for a spin?"',
      "Why did the weatherman bring a ladder to work? Because he wanted to climb the charts!",
      "How does a snowman get around? By riding an 'icicle'!",
      'What do you call a snowman with a six-pack? An "abdominal" snowman!',
      "Why did the sun go to therapy? It had too many rays of issues!",
      "How do weather forecasters stay cool? They always have a few 'degrees'!",
      'What do you call a hot day in Antarctica? A "meltdown"!',
      "Why did the cloud break up with the raindrop? It found someone 'mister'!",
      "What do you call it when it rains ducks and chickens? Fowl weather!",
    ];

    return jokes[Math.floor(Math.random() * jokes.length)];
  };

  return (
    <div className="container">
      <div className="side">
        <div className="search">
          <div className="country">
            <img className="sicon" src="earth.png" alt="" height={20} />
            <h5>Country/City</h5>
          </div>

          <input
            placeholder="Search..."
            value={city}
            onChange={(event) => setCity(event.target.value)}
            onKeyPress={getWeather}
          />
        </div>

        {typeof weatherData.main === "undefined" ? (
          <div className="empty"></div>
        ) : (
          <div>
            <div className="up">
              <h2>{weatherData.name}</h2>
              <p className="second">
                Long/Lat: {weatherData.coord.lon}, {weatherData.coord.lat}
              </p>
            </div>

            <hr />
            <div className="mid">
              <h5>{date} </h5>
              <p className="second">Timezone: {weatherData.sys.country}</p>
            </div>

            <hr />

            <img
              className="iconn"
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt=""
              height={62}
            />
            <div className="weather">
              <h1>{weatherData.main.temp.toFixed(1)}°C</h1>
              <div className="description">
                <h3 className="second">{weatherData.weather[0].description}</h3>
              </div>
            </div>

            <div className="rise">
              <p className="sTime">
                {" "}
                <img className="sicon" src="sun.svg" alt="" height={20} />{" "}
                Sunrise{" "}
              </p>
              <p>{sunriseTime}</p>
            </div>

            <div className="set">
              <p className="sTime">
                {" "}
                <img className="sicon" src="moon.png" alt="" height={20} />
                Sunset{" "}
              </p>
              <p>{sunsetTime}</p>
            </div>
          </div>
        )}
      </div>

      <div className="middle">
        <div className="overview">
          <h3>Today's Overview</h3>
          <h5 className="last-upd">Last Updated: {date} </h5>
          {typeof weatherData.main !== "undefined" && (
            <div className="information">
              <p>
                Good day, viewers! This is Iman, LIVE from the IMAN's
                Weather App, ready to give you a quick summary of today's
                weather in {weatherData.name}.The temperature is{" "}
                {weatherData.main.temp.toFixed(1)} degrees Celsius with a wind speed of{" "}
                {Math.round(weatherData.wind.speed * 3.6)} km/h and wind direction of{" "}
                {weatherData.wind.deg} degrees. The relative humidity is high at{" "}
                {weatherData.main.humidity}% Now for a quick weather joke:{" "}
                {getRandomJoke()},   {weatherData.name}!
              </p>
            </div>
          )}
        </div>

        {typeof weatherData.main !== "undefined" && (
          <div className="max-min">
            <div className="max">
              <h5>Maximum Temperature</h5>
              <h4>{weatherData.main.temp_max.toFixed(1)}°</h4>
            </div>
            <div className="min">
              <h5>Minimum Temperature</h5>
              <h4>{weatherData.main.temp_min.toFixed(1)}°</h4>
            </div>
          </div>
        )}

        {typeof weatherData.wind !== "undefined" && (
          <div className="third">
            <div className="speed">
              <h5>Wind Speed</h5>
              <h4>{Math.round(weatherData.wind.speed * 3.6)} km/h</h4>
            </div>

            {typeof weatherData.main !== "undefined" && (
              <div className="feel">
                <h5>Real Feel</h5>
                <h4>{weatherData.main.feels_like.toFixed(1)}°</h4>
              </div>
            )}

            {typeof weatherData.main !== "undefined" && (
              <div className="humidity">
                <h5>Humidity</h5>
                <h4>{weatherData.main.humidity}%</h4>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
