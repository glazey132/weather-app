import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';

const initialState = {
	weather: [],
	coords: [],
	loading: true,
	error: null
};

function weatherReducer(state = initialState, action) {
	switch(action.type) {
		case types.FETCH_WEATHER_BEGIN:
			return [
				...state,
				{
					loading: false,
					coords: [action.payload.lat, action.payload.long]
				}
			]
		case types.FETCH_WEATHER_SUCCESS:
			return {
				...state,
				loading: false,
				weather: action.payload.weather
			};
		case types.FETCH_WEATHER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
				weather: []
			};
		default:
			return state;
	}
}

function geoReducer(state = initialState, action) {
	switch(action.type) {
		case types.GEOLOCATION_SUCCESS:
		console.log('state in geo reducer ', state);
		console.log('action.payload in georeducer ', action.payload);
			return {
				...state,
				coords: [action.payload.lat, action.payload.long],
				loading: false
			};
		case types.GEOLOCATION_FAILURE:
			return {
				...state,
				coords: [],
				loading: false,
				error: action.payload.error
			};
		default:
			return state;
	}
}

export default combineReducers({
	weatherReducer,
	geoReducer
});
