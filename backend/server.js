const express = require('express');
const app = express();

const {
  getCityListItem,
  getCityWeather,
  getFiveDayForecast
} = require('./resources');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const axios = require('axios');

//Mongoose
const mongoose = require('mongoose');
const { CityListItem } = require('./models')

if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
} else {
	console.log('process.env ', process.env.MONGODB_URI);
}

mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
  console.log('Process.env.port ', process.env.PORT);
  console.log('Process.env.serverport ', process.env.SERVER_PORT);
});
mongoose.connection.on('error', function(err) {
  console.log('Error connecting to MongoDb: ' + err);
  process.exit(1);
});

mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.json({success: true, message: 'Your server is online. Hello World.🌎'})
});

app.get('/getWeather/location', async (req, res) => {
  try {
    let lat, long, city, cityListItem, cityWeatherObj;
    lat = req.query.lat;
    long = req.query.long;

    /*
    // create a string template for the location api url using
    //latitude and longitude data dynamically loaded from the front end.
    //Then make an async request to get the location data from api.
    */
    const locationApiUrl = `https://us1.locationiq.org/v1/reverse.php?key=${process.env.LOCATION_IQ_TOKEN}&lat=${lat}&lon=${long}&format=json`;
    const locationResponse = await axios.get(locationApiUrl)
    city = locationResponse.data.address.city;

    /*
    //Make a request to the database to try and load an
    //openweathermap object that matches the city name.
    */
    getCityListItem(city)
    .then(cityListItem => getCityWeather(cityListItem))
    .then(cityWeather => {
      cityWeatherObj = cityWeather.data;
      getFiveDayForecast(cityWeather.data.id)
      //dont do this here. Make a route that is called from front end that is requested upon forecast container component did mount
      .then(fiveDayForecast => {
        console.log('5day forecast obj ', fiveDayForecast)
        console.log('cityWeather object avail after getting five day? ', cityWeatherObj);
      })
    })
    // res.json({ success: true, message: 'found city list item ', cityItemFromDb: cityItem, cityId: cityItem.id, cityDataFromApi: locationResponse.data });

  } catch(e) {
    console.log('the error was caught ', e);
  }

});

var SERVER_PORT = process.env.SERVER_PORT || 8080;
app.listen(SERVER_PORT, error => {
    error
    ? console.error('error connecting', process.env)
    : console.info(`🌎\nListening on port ${SERVER_PORT}. Visit http://localhost:${SERVER_PORT}/ in your browser.`);
});
