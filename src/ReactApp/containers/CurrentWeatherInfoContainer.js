import React from 'react';
import { connect } from 'react-redux';

class CurrentWeatherInfoContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			temperatureScale: 'fahrenheit',
			humidity: null,
			temp: null,
			windSpeed: null,
			windDegree: null,
			weatherDescription: null
		};
	}

	async convertInfo() {
		try {
			const weatherData = await this.props.currentWeatherData;
			const windInfo = await this.props.currentWindData;
			const weatherInfo = await this.props.currentWeatherInfo;
			console.log('is the info here? ', weatherInfo);
			console.log('is the wind info here? ', windInfo);
			console.log('is the weather specs here  ? ', weatherInfo);
			let temp = weatherData.temp;
			let humidity = weatherData.humidity;
			let windSpeed = windInfo.speed;
			let windDegree = windInfo.deg;
			let weatherDescription = weatherInfo.main;
			this.setState({
				temp: temp,
				humidity: humidity,
				windSpeed: windSpeed,
				windDegree: windDegree,
				weatherDescription: weatherDescription
			})
		} catch (err) {
			console.log('frontend error in weather info component ', err);
		}
	}

	componentDidMount = () => {
		this.convertInfo();
	}

	render() {
		return (
			<div className='today-weather'>
				<h5>{this.props.location[0]}, {this.props.location[1]}, {this.props.location[2]}</h5>
				{this.state.weatherDescription}
				<br />
				Temperature: {this.state.temp} &deg;
				<div>
					Humidity: {this.state.humidity} %
					<br />
					Wind: {this.state.windSpeed} mph
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log('the state in mapstate 2 props in info container ***&*&* ', state);
	return {
		currentWeatherData: state.weatherReducer.currentWeatherData,
		currentWindData: state.weatherReducer.currentWindData,
		currentWeatherInfo: state.weatherReducer.currentWeatherInfo,
		location: state.weatherReducer.location
	};
};

export default connect(mapStateToProps, null)(CurrentWeatherInfoContainer);
