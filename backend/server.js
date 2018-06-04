const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

//Mongoose
const mongoose = require('mongoose');
const CityListItem = require('./models').CityListItem;

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

app.get('/getWeather/location', (req, res) => {
  console.log('geo locations in req params?  ', req.query);
    CityListItem.find()
    .limit(10)
    .exec((err, cityItem) => {
      if (err) {
        res.json({ success: false, message: err })
      } else if (cityItem !== null) {
        console.log('cityitem? ', cityItem);
        res.json({ success: true, message: 'found city list item ', cityItem: cityItem })
      } else {
        res.json({ success: false, message: 'could not find city list item ', cityItem: null })
      }
    })

    // .exec((err, cityItem) => {
    //   if (err) {
    //     console.log('there was an error finding the city item in the data base ', err);
    //   } else {
    //     console.log('Server found the cityItem in the database!!!! *** ', cityItem);
    //   }
    // })
});

var SERVER_PORT = process.env.SERVER_PORT || 8080;
app.listen(SERVER_PORT, error => {
    error
    ? console.error('error connecting', process.env)
    : console.info(`🌎\nListening on port ${SERVER_PORT}. Visit http://localhost:${SERVER_PORT}/ in your browser.`);
});
