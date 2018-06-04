import * as types from './actionTypes';

export const fetchGeolocation = (lat, long) => {
	return {
		type: types.GEOLOCATION_SUCCESS,
		payload: { lat, long }
	}
}

export const fetchGeolocationFailure = (error) => {
	return {
		type: types.GEOLOCATION_FAILURE,
		payload: { error }
	}
}
