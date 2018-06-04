const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

//Mongoose
const mongoose = require('mongoose');
const CityList = require('./models/models').CityList;

if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
} else {
	console.log('process.env ', process.env.MONGODB_URI);
}

mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
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

app.get('/getWeather/:searchTerm', (req, res) => {
  console.log('the search term ', req.params.searchTerm);
});

var SERVER_PORT = process.env.SERVER_PORT || 8080;
app.listen(SERVER_PORT, error => {
    error
    ? console.error('error connecting', process.env)
    : console.info(`🌎\nListening on port ${SERVER_PORT}. Visit http://localhost:${SERVER_PORT}/ in your browser.`);
});
