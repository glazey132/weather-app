import React from 'react';
import { connect } from 'react-redux';
// import cityList from '../citylist/citylist.js';

class WeatherAppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};

		if (navigator.geolocation) {
			this._detectUserLocation = () => {
				console.log('navigator? ', navigator.geolocation);
				// navigator.geolocation.getCurrentPosition();

			}
		}
	}

	componentDidMount(){
		this._detectUserLocation();
	}

	//TODO: first load the weather and store in state in an array on
	//page load and user search button click(redux action).
	//Map each element in the array to a jsx <td> element in table-row-two
	render() {
		return (
			<div className='weather-container'>
				<div className='top-row'>
					<div className='left-column'>
						weather image
					</div>
					<div className='right-column'>
						todays weather
					</div>
				</div>
				<div className='five-day-forecast'>
					Five day forecast
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log('state.geo in mapState to props in weather container? ', state.geoReducer);
	return {
		latitude: state.geoReducer.coords.lat,
		longitude: state.geoReducer.coords.long
	}
}

export default connect(mapStateToProps, null)(WeatherAppContainer);
