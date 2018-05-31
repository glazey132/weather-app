import { combineReducers } from 'redux';

function weatherReducer(state = [], action) {
	switch(action.type) {
		case 'WEATHER_SEARCH':
			return [...state, action.payload];
		default:
			return state;
	}
}

export default combineReducers({ weatherSearch: weatherReducer });
