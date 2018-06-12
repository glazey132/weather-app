import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import axios from 'axios';


class CurrentWeatherImage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeOfDay: '',
			path: ''
		};
	}

	async getImageFromWeatherApi() {
		try {
			const icon = await this.props.currentWeatherInfo.icon;
			let iconArr = icon.split('');
			let weatherInfo = this.props.currentWeatherInfo;
			console.log('in current weather image here are icon, iconarr, and weatherinfo: ', icon, iconArr, weatherInfo);

			if (iconArr[2] === 'd') {
				this.setState({ timeOfDay: 'day' })
				switch(weatherInfo.description) {
					case 'clear sky':
						this.setState({
							path:  '../../../weatherImgs/day.svg'
						})
						break;
					case 'few clouds':
						this.setState({
							path:  '../../../weatherImgs/cloudy-day-1.svg'
						})
						break;
					case 'scattered clouds':
						this.setState({
							path:  '../../../weatherImgs/cloudy.svg'
						})
						break;
					case 'broken clouds':
						this.setState({
							path:  '../../../weatherImgs/cloudy.svg'
						})
						break;
					case 'shower rain':
						this.setState({
							path:  '../../../weatherImgs/rainy-6.svg'
						})
						break;
					case 'rain':
						this.setState({
							path:  '../../../rainy-1.svg'
						})
						break;
					case 'thunderstorm':
						this.setState({
							path:  '../../../weatherImgs/thunder.svg'
						})
						break;
					case 'snow':
						this.setState({
							path:  '../../../weatherImgs/snowy1.svg'
						})
						break;
					case 'mist':
						this.setState({
							path:  '../../../weatherImgs/rainy-2.svg'
						})
						break;
					case 'haze':
						this.setState({
							path: '../../../weatherImgs/cloudy.svg'
						})
						break;
					default:
					this.setState({
						path: '../../../weatherImgs/cloudy.svg'
					})
				}
				console.log('the state in current weather image ', this.state)
			} else {
				this.setState({ timeOfDay: 'night' })
				switch(weatherInfo.description) {
					case 'clear sky':
						this.setState({
							path:  '../../../weatherImgs/night.svg'
						})
						break;
					case 'few clouds':
						this.setState({
							path:  '../../../weatherImgs/cloudy-night-1.svg'
						})
						break;
					case 'scattered clouds':
						this.setState({
							path:  '../../../weatherImgs/cloudy-night-3.svg'
						})
						break;
					case 'broken clouds':
						this.setState({
							path:  '../../../weatherImgs/cloudy.svg'
						})
						break;
					case 'shower rain':
						this.setState({
							path:  '../../../weatherImgs/rainy-6.svg'
						})
						break;
					case 'rain':
						this.setState({
							path:  '../../../rainy-4.svg'
						})
						break;
					case 'thunderstorm':
						this.setState({
							path:  '../../../weatherImgs/thunder.svg'
						})
						break;
					case 'snow':
						this.setState({
							path:  '../../../weatherImgs/snowy6.svg'
						})
						break;
					case 'mist':
						this.setState({
							path:  '../../../weatherImgs/rainy-7.svg'
						})
						break;
					case 'haze':
						this.setState({
							path: '../../../weatherImgs/cloudy.svg'
						})
						break;
					default:
					this.setState({
						path: '../../../weatherImgs/cloudy.svg'
					})
				}
				console.log('the state in current weather image ', this.state)
			}
		} catch (err) {
			console.error('frontend error on get icon ', err)
		}
	}

	componentDidMount() {
		this.getImageFromWeatherApi();
	}

	render() {
		if(this.state.iconLoading) {
			return (
				<div className='weather-img-loading-container'>
					<p>Loading...</p>
				</div>
			);
		} else {
				return (
					<div className='main-img-container'>
						<img
							className='main-img'
							src={`${this.state.path}`}
							alt='CurrentWeatherIcon'
						/>
					</div>
				);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		currentWeatherInfo: state.weatherReducer.currentWeatherInfo
	};
};

// CurrentWeatherImage.propTypes = {
// 	currentWeatherDataInfo: PropTypes.array
// };

export default connect(mapStateToProps, null)(CurrentWeatherImage);
