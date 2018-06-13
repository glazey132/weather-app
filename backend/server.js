/**
//Express server config and axios.
**/
const express = require("express");
const app = express();
const axios = require("axios");

/**
//helper functions loaded from resources file.
**/
const { getCityWeather, getFiveDayForecast } = require("./resources");

/**
//body parser config
**/
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
// ROUTES
**/

/**
//Test route for backend
**/
app.get("/", (req, res) => {
  res.json({ success: true, message: "Your server is online. Hello World.🌎" });
});

/**
//Main route to get weather info based on user location
**/
app.get("/getWeather/location", async (req, res) => {
  try {
    let lat, long, city, state, country, cityListItem, cityWeatherObj;
    lat = req.query.lat;
    long = req.query.long;

    /*
    // create a string template for the location api url using
    //latitude and longitude data dynamically loaded from the front end.
    //Then make an async request to get the location data from api.
    */
    const locationApiUrl = `https://us1.locationiq.org/v1/reverse.php?key=${
      process.env.LOCATION_IQ_TOKEN
    }&lat=${lat}&lon=${long}&format=json`;
    const locationResponse = await axios.get(locationApiUrl);

    //parse location object to get city name to search in our database.
    if (locationResponse.data.address.hasOwnProperty("village")) {
      console.log(
        "location is in a village ",
        locationResponse.data.address.village
      );
      city = locationResponse.data.address.village;
    } else if (locationResponse.data.address.hasOwnProperty("city")) {
      console.log("location is in a city ", locationResponse.data.address.city);
      city = locationResponse.data.address.city;
    } else if (
      locationReponse.data.address.hasOwnProperty("village") &&
      locationResponse.data.address.hasOwnProperty("city")
    ) {
      console.log(
        "location obj has a city and village field ... find a way to handle this.",
        locationResponse.data.address
      );
    } else {
      console.log(
        "unable to correctly parse location object thus the database search for city id did not work."
      );
    }

    state = locationResponse.data.address.state;
    country = locationResponse.data.address.country;
    let location = [city, state, country];

    /*
    //Make a request to the database to try and load an
    //openweathermap object that matches the city name.
    */
    getCityWeather(city).then(cityWeather => {
      cityWeatherObj = cityWeather.data;
      let windData = cityWeather.data.wind;
      getFiveDayForecast(cityWeather.data.id)
        //dont do this here. import helper
        .then(fiveDayForecast => {
          if (fiveDayForecast.data.cod === "200") {
            let day1 = [];
            let day1WeatherCount = [];
            let day2 = [];
            let day2WeatherCount = [];
            let day3 = [];
            let day3WeatherCount = [];
            let day4 = [];
            let day4WeatherCount = [];
            let day5 = [];
            let day5WeatherCount = [];
            let firstDay = fiveDayForecast.data.list[0].dt_txt;
            let firstDate = firstDay[8] + firstDay[9];
            let intDate = parseInt(firstDate);
            fiveDayForecast.data.list.forEach(threeHourForecast => {
              let date =
                threeHourForecast.dt_txt[8] + threeHourForecast.dt_txt[9];
              date = parseInt(date);
              if (date === intDate) {
                day1.push(threeHourForecast);
              } else if (date === intDate + 1) {
                day2.push(threeHourForecast);
              } else if (date === intDate + 2) {
                day3.push(threeHourForecast);
              } else if (date === intDate + 3) {
                day4.push(threeHourForecast);
              } else if (date === intDate + 4) {
                day5.push(threeHourForecast);
              }
            });
            let day1Max;
            day1.forEach(day1Forecast => {
              day1WeatherCount.push(day1Forecast.weather);
              if (day1Forecast.main.temp > day1Max || day1Max === undefined) {
                day1Max = day1Forecast.main.temp;
              }
            });
            let day1Low;
            day1.forEach(day1Forecast => {
              if (day1Forecast.main.temp < day1Low || day1Low === undefined) {
                day1Low = day1Forecast.main.temp;
              }
            });

            let day2Max;
            day2.forEach(day2Forecast => {
              day2WeatherCount.push(day2Forecast.weather);
              if (day2Forecast.main.temp > day2Max || day2Max === undefined) {
                day2Max = day2Forecast.main.temp;
              }
            });
            let day2Low;
            day2.forEach(day2Forecast => {
              if (day2Forecast.main.temp < day2Low || day2Low === undefined) {
                day2Low = day2Forecast.main.temp;
              }
            });

            let day3Max;
            day3.forEach(day3Forecast => {
              day3WeatherCount.push(day3Forecast.weather);
              if (day3Forecast.main.temp > day3Max || day3Max === undefined) {
                day3Max = day3Forecast.main.temp;
              }
            });
            let day3Low;
            day3.forEach(day3Forecast => {
              if (day3Forecast.main.temp < day3Low || day3Low === undefined) {
                day3Low = day3Forecast.main.temp;
              }
            });

            let day4Max;
            day4.forEach(day4Forecast => {
              day4WeatherCount.push(day4Forecast.weather);
              if (day4Forecast.main.temp > day4Max || day4Max === undefined) {
                day4Max = day4Forecast.main.temp;
              }
            });
            let day4Low;
            day4.forEach(day4Forecast => {
              if (day4Forecast.main.temp < day4Low || day4Low === undefined) {
                day4Low = day4Forecast.main.temp;
              }
            });

            let day5Max;
            day5.forEach(day5Forecast => {
              day5WeatherCount.push(day5Forecast.weather);
              if (day5Forecast.main.temp > day5Max || day5Max === undefined) {
                day5Max = day5Forecast.main.temp;
              }
            });
            let day5Low;
            day5.forEach(day5Forecast => {
              if (day5Forecast.main.temp < day5Low || day5Low === undefined) {
                day5Low = day5Forecast.main.temp;
              }
            });
            let day1Obj = {
              hi: day1Max,
              low: day1Low,
              weather: day1WeatherCount
            };
            let day2Obj = {
              hi: day2Max,
              low: day2Low,
              weather: day2WeatherCount
            };
            let day3Obj = {
              hi: day3Max,
              low: day3Low,
              weather: day3WeatherCount
            };
            let day4Obj = {
              hi: day4Max,
              low: day4Low,
              weather: day4WeatherCount
            };
            let day5Obj = {
              hi: day5Max,
              low: day5Low,
              weather: day5WeatherCount
            };
            let fiveDayForecastData = [
              day1Obj,
              day2Obj,
              day3Obj,
              day4Obj,
              day5Obj
            ];
            res.json({
              success: true,
              message: "backend call successful ",
              location: location,
              currentWeatherData: cityWeatherObj,
              windData: windData,
              fiveDayForecast: fiveDayForecastData
            });
          }
        });
    });
  } catch (e) {
    console.log("the error was caught in get weather ", e);
  }
});

/**
//Route to get icon information
**/
app.get("/getWeather/icon", async (req, res) => {
  try {
    let icon = req.query.icon;
    const mapIconApiUrl = `http://openweathermap.org/img/w/${icon}.png`;
    let iconResponse = await axios.get(mapIconApiUrl);
    let iconSrc = iconResponse;
    res.send(iconSrc);
  } catch (e) {
    console.log("the error was caught in getweather icon ", e);
  }
});

/**
//check server connection
**/
var SERVER_PORT = process.env.SERVER_PORT || 8080;
app.listen(SERVER_PORT, error => {
  error
    ? console.error("error connecting", process.env)
    : console.info(
        `🌎\nListening on port ${SERVER_PORT}. Visit http://localhost:${SERVER_PORT}/ in your browser.`
      );
});
