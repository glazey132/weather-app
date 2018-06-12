// const { CityListItem } = require('./models');
const axios = require('axios');

// function getCityListItem(cityName) {
// 	return CityListItem.findOne({ name: cityName }, {_id: 0, id: 1, name: 1, country: 1, coord: 1})
// 	.catch(err => console.error('error getting citylist item from db ++ Helper', err))
// }

function getCityWeather(city) {
	const openWeatherMapApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=imperial`;
	return axios.get(openWeatherMapApiUrl)
	.catch(err => console.error('error calling weather api', err))
}

function getFiveDayForecast(cityId) {
	const openWeatherMapApiUrl = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=imperial`;
	return axios.get(openWeatherMapApiUrl)
	.catch(err => console.error('error calling weather 5 day forecast api', err))
}

async function handleFiveDayForecast(fiveDayForecast) {
	let day1 = [];
	let day2 = [];
	let day3 = [];
	let day4 = [];
	let day5 = [];
	let firstDay = fiveDayForecast.data.list[0].dt_txt;
	let firstDate = firstDay[8] + firstDay[9];
	let intDate = parseInt(firstDate);
	fiveDayForecast.data.list.forEach(threeHourForecast => {
		let date = threeHourForecast.dt_txt[8] + threeHourForecast.dt_txt[9];
		date = parseInt(date);
		if (date === intDate) {
			day1.push(threeHourForecast);
		} else if (date === (intDate + 1)) {
			day2.push(threeHourForecast);
		} else if (date === (intDate + 2)) {
			day3.push(threeHourForecast);
		} else if (date === (intDate + 3)) {
			day4.push(threeHourForecast);
		} else if (date === (intDate + 4)) {
			day5.push(threeHourForecast)
		}
	});
	let day1Max;
	day1.forEach(day1Forecast => {
		if (day1Forecast.main.temp > day1Max ||
				day1Max === undefined) {
			day1Max = day1Forecast.main.temp
		}
	})
	let day1Low;
	day1.forEach(day1Forecast => {
		if (day1Forecast.main.temp < day1Low ||
				day1Low === undefined) {
			day1Low = day1Forecast.main.temp
		}
	})

	let day2Max;
	day2.forEach(day2Forecast => {
		if (day2Forecast.main.temp > day2Max ||
				day2Max === undefined) {
			day2Max = day2Forecast.main.temp
		}
	})
	let day2Low;
	day2.forEach(day2Forecast => {
		if (day2Forecast.main.temp < day2Low ||
				day2Low === undefined) {
			day2Low = day2Forecast.main.temp
		}
	})

	let day3Max;
	day3.forEach(day3Forecast => {
		if (day3Forecast.main.temp > day3Max ||
				day3Max === undefined) {
			day3Max = day3Forecast.main.temp
		}
	})
	let day3Low;
	day3.forEach(day3Forecast => {
		if (day3Forecast.main.temp < day3Low ||
				day3Low === undefined) {
			day3Low = day3Forecast.main.temp
		}
	})

	let day4Max;
	day4.forEach(day4Forecast => {
		if (day4Forecast.main.temp > day4Max ||
				day4Max === undefined) {
			day4Max = day4Forecast.main.temp
		}
	})
	let day4Low;
	day4.forEach(day4Forecast => {
		if (day4Forecast.main.temp < day4Low ||
				day4Low === undefined) {
			day4Low = day4Forecast.main.temp
		}
	})

	let day5Max;
	day5.forEach(day5Forecast => {
		if (day5Forecast.main.temp > day5Max ||
				day5Max === undefined) {
			day5Max = day5Forecast.main.temp
		}
	})
	let day5Low;
	day5.forEach(day5Forecast => {
		if (day5Forecast.main.temp < day5Low ||
				day5Low === undefined) {
			day5Low = day5Forecast.main.temp
		}
	})
	let day1Obj = { hi: day1Max, low: day1Low };
	let day2Obj = { hi: day2Max, low: day2Low };
	let day3Obj = { hi: day3Max, low: day3Low };
	let day4Obj = { hi: day4Max, low: day4Low };
	let day5Obj = { hi: day5Max, low: day5Low };
	let fiveDayForecastData = await [
		day1Obj,
		day2Obj,
		day3Obj,
		day4Obj,
		day5Obj
	];

	return fiveDayForecastData;
}

module.exports = {
	// getCityListItem,
	getCityWeather,
	getFiveDayForecast
};
