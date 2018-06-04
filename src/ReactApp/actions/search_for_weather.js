import * as types from './actionTypes';

export const fetchWeatherBegin = () => ({
	console.log("attempting to get the weather for the searched input ");
	type: types.FETCH_WEATHER_BEGIN,
})

export const fetchWeatherSuccess = (weather) => ({
	console.log("weather fetch successful ", weather);
	type: types.FETCH_WEATHER_SUCCESS,
	payload: { weather }
})

export const fetchWeatherFailure = (error) => ({
	console.log("There was an error while fetching the weather input ", error);
	type: types.FETCH_WEATHER_FAILURE,
	payload: { error }
})
