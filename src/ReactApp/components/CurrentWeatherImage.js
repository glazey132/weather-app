import React from 'react';
import { connect } from 'react-redux';
// import dayImg from '../../weatherImgs/day.svg';
// import PropTypes from 'prop-types';
// import axios from 'axios';


class CurrentWeatherImage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeOfDay: '',
			path: '../../../weatherImgs/day.svg'
		};
	}

	async getImageFromWeatherApi() {
		try {
			const icon = await this.props.currentWeatherInfo.icon;
			let iconArr = icon.split('');
			console.log('icon array? ', iconArr);
			// axios.get('getWeather/icon', {
			// 	params: { icon: icon }
			// })
			// .then(iconBackendCall => {
			// 	console.log('the icon backend call response ', iconBackendCall);
			// 	this.setState({
			// 		loadedIcon: iconBackendCall.iconSrc,
			// 		iconLoading: false
			// 	})
			// })
			//
			if (iconArr[2] === 'd') {
				console.log('its day time!! ');
				this.setState({ timeOfDay: 'day' })
				// switch(this.props.currentWeatherInfo.description) {
				// 	case 'clear sky':
				// 		this.setState({ loadedIcon = })
				// 		break;
				// 	case 'few clouds':
				// 		do something
				// 		break;
				// 	case 'scattered clouds':
				// 		do something
				// 		break;
				// 	case 'broken clouds':
				// 		do something
				// 		break;
				// 	case 'shower rain':
				// 		do something
				// 		break;
				// 	case 'rain':
				// 		do something
				// 		break;
				// 	case 'thunderstorm':
				// 		do something
				// 		break;
				// 	case 'snow':
				// 		do something
				// 		break;
				// 	case 'mist':
				// 		do something
				// 		break;
				// }
			} else {
				console.log('its night time!! ');
				this.setState({ timeOfDay: 'night' })
			}
			console.log('this.state ', this.state);
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
