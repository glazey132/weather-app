import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import CurrentWeatherImage from '../components/CurrentWeatherImage.js';
import CurrentWeatherInfoContainer from '../containers/CurrentWeatherInfoContainer.js';
import FiveDayForecastContainer from '../containers/FiveDayForecastContainer.js';

import {
	fetchWeatherBegin,
	fetchWeatherSuccess,
	fetchWeatherFailure,
} from '../actions/search_for_weather';

class WeatherAppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async getCityInfoByPosition() {
		try {
			axios('/getWeather/location', {
				params: { lat: this.props.latitude, long: this.props.longitude }
			})
			.then(backendCall => {
				if (!backendCall) {
					const error = 'failed to load weather info from backend';
					this.props.onWeatherFail(error)
				} else {
					let currentWeatherData = backendCall.data.currentWeatherData.main;
					let currentWeatherInfo = backendCall.data.currentWeatherData.weather[0];
					let fiveDayForecast = backendCall.data.fiveDayForecast;
					let location = backendCall.data.location;
					let windData = backendCall.data.windData;
					this.props.onWeatherSuccess(currentWeatherData, currentWeatherInfo, fiveDayForecast, location, windData);
				}
			});
		} catch (e) {
			console.error('frontend error on getCityInfoByPosition ', e);
		}
	}

	componentDidMount() {
		this.props.onWeatherFetch();
		this.getCityInfoByPosition();
	}

	//TODO: first load the weather and store in state in an array on
	//page load and user search button click(redux action).
	//Map each element in the array to a jsx <td> element in table-row-two
	render() {
		if(this.props.isWeatherLoading) {
			return (
				<div className='weather-loading-screen'>
					<span style={{
						textAlign: 'center',
						height: '100%',
					}}>Making your weather info aesthetically pleasing. Please wait.</span>
				</div>
			);
		} else if (!this.props.isWeatherLoading) {
			return (
				<div>
					<span>
						{this.props.error}
					</span>
					<div className='weather-container'>
						<div className='top-row'>
							<div className='left-column'>
								<CurrentWeatherImage weatherInfo={this.props.currentWeatherDataInfo}/>
							</div>
							<div className='right-column'>
								<CurrentWeatherInfoContainer/>
							</div>
						</div>
						<div className='five-day-forecast'>
							<FiveDayForecastContainer />
						</div>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		latitude: state.geoReducer.coords[0],
		longitude: state.geoReducer.coords[1],
		isWeatherLoading: state.weatherReducer.isWeatherLoading,
		error: state.weatherReducer.weatherError,
		currentWeatherData: state.weatherReducer.currentWeatherData,
		currentWeatherDataInfo: state.weatherReducer.currentWeatherDataInfo
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onWeatherFetch: () => dispatch(fetchWeatherBegin()),
		onWeatherSuccess: (currentWeatherData, currentWeatherInfo, fiveDayForecast, location, windData) => dispatch(fetchWeatherSuccess(currentWeatherData, currentWeatherInfo, fiveDayForecast, location, windData)),
		onWeatherFailure: (error) => dispatch(fetchWeatherFailure(error))
	}
};

WeatherAppContainer.propTypes = {
	latitude: PropTypes.number,
	longitude: PropTypes.number,
	error: PropTypes.string,
	isWeatherLoading: PropTypes.bool,
	currentWeatherData: PropTypes.object,
	currentWeatherDataInfo: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherAppContainer);
