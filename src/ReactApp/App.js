import React from 'react';
import WeatherAppContainer from './containers/WeatherAppContainer.js';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux';
import axios from 'axios';
// import Button from 'material-ui/Button';

import {
	fetchGeolocation,
	fetchGeolocationFailure
} from './actions/get_geolocation';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			citySearch: '',
		};
	}

	async getCityNameByPosition(pos) {
		const {
			latitude,
			longitude
		} = pos.coords;

		try {
			let cityName = await axios('/getWeather/location', {
				params: { lat: latitude, long: longitude }
			})
			console.log('await axios data ', cityName);
		} catch (e) {
			console.error(e);
		}
	}



	componentDidMount() {
			navigator.geolocation.getCurrentPosition(position => {
				if (! position) {
					console.log('could not get position on mount ');
					const err = 'could not get position on mount ';
					this.props.onLocationFail(err)
				} else {
					console.log('geo success ', position);
					this.props.onLocation(position.coords.latitude, position.coords.longitude)
					this.getCityNameByPosition(position);
				}
			});
	}

	// onClickSearch() {
	// 	try {
	// 		//axios
	// 		//let weather = axios
	// 		console.log('the props ', this.props);
	// 		console.log('the state ', this.state);
	// 	}
	// 	catch(error) {
	// 		console.log('error on click search ', error);
	// 	}
	// }


	render() {
		if(this.props.loading) {
			return (
				<div className='loading-screen'>
					<span style={{
						textAlign: 'center'
					}}>Loading...</span>
				</div>
			)
		} else {
			return (
				<div className='app-screen container-fluid'>
						<h3> Weather App </h3>
						<TextField
							floatingLabelText="Search for your local weather by entering a city name, zip code or city Id here"
							fullWidth={true}
							onChange={(event) => this.setState({citySearch: event.target.value})}
						/>
						<RaisedButton
							primary={true}
							label="search weather"
							fullWidth={true}
							onClick={(event) => this.onClickSearch(event)}
						/>
						<WeatherAppContainer/>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.geoReducer.loading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLocation: (lat, long) => dispatch(fetchGeolocation(lat, long)),
		onLocationFail: (error) => dispatch(fetchGeolocationFailure(error))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
