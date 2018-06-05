const { CityListItem } = require('./models');
const axios = require('axios');

function getCityListItem(cityName) {
	return CityListItem.findOne({ name: cityName }, {_id: 0, id: 1, name: 1, country: 1, coord: 1})
	.catch(err => console.error('error getting citylist item from db ++ Helper', err))
}

function getCityWeather(cityItemObj) {
	console.log('got city list item from db! and inside helper! ', cityItemObj);
	const cityId = cityItemObj.id;
	console.log('prior to weather api call here is cityListItem id ', cityId);
	const openWeatherMapApiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${process.env.OPEN_WEATHER_MAP_API_KEY}`;
	return axios.get(openWeatherMapApiUrl)
	.catch(err => console.error('error calling weather api', err))
}

function getFiveDayForecast(cityId) {
	const openWeatherMapApiUrl = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${process.env.OPEN_WEATHER_MAP_API_KEY}`;
	return axios.get(openWeatherMapApiUrl)
	.catch(err => console.error('error calling weather 5 day forecast api', err))
}

module.exports = {
	getCityListItem,
	getCityWeather,
	getFiveDayForecast
};
