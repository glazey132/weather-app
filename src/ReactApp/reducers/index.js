import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';

const initialState = {
	coords: [],
	location: [],
	currentWeatherData: {},
	currentWeatherInfo: {},
	currentWindData: {},
	fiveDayForecast: [],
	isLocationLoading: true,
	isWeatherLoading: false,
	geoError: null,
	weatherError: null
};

function weatherReducer(state = initialState, action) {
	switch(action.type) {
		case types.FETCH_WEATHER_BEGIN:
			return {
				...state,
				isLocationLoading: false,
				isWeatherLoading: true
			};
		case types.FETCH_WEATHER_SUCCESS:
		console.log('fetch weather success in reducer here is weather data?? --> ** --> ', action.payload);
			return {
				...state,
				isWeatherLoading: false,
				location: action.payload.location,
				currentWeatherData: action.payload.currentWeatherData,
				currentWeatherInfo: action.payload.currentWeatherInfo,
				fiveDayForecast: action.payload.fiveDayForecast,
				currentWindData: action.payload.windData
			};
		case types.FETCH_WEATHER_FAILURE:
			return {
				...state,
				isWeatherLoading: false,
				weatherError: action.payload.error,
				weather: []
			};
		default:
			return state;
	}
}

function geoReducer(state = initialState, action) {
	switch(action.type) {
		case types.GEOLOCATION_SUCCESS:
			return {
				...state,
				coords: [action.payload.lat, action.payload.long],
				isLocationLoading: false
			};
		case types.GEOLOCATION_FAILURE:
			return {
				...state,
				coords: [],
				isLocationLoading: false,
				geoError: action.payload.error
			};
		default:
			return state;
	}
}

export default combineReducers({
	weatherReducer,
	geoReducer
});
