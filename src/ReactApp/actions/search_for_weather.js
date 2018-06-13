import * as types from "./actionTypes";

export const fetchWeatherBegin = () => {
  return {
    type: types.FETCH_WEATHER_BEGIN
  };
};

export const fetchWeatherSuccess = (
  currentWeatherData,
  currentWeatherInfo,
  fiveDayForecast,
  location,
  windData
) => {
  return {
    type: types.FETCH_WEATHER_SUCCESS,
    payload: {
      currentWeatherData,
      currentWeatherInfo,
      fiveDayForecast,
      location,
      windData
    }
  };
};

export const fetchWeatherFailure = error => {
  return {
    type: types.FETCH_WEATHER_FAILURE,
    payload: { error }
  };
};
