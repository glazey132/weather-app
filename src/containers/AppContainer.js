import React from 'react';
import { withRouter } from 'react-router-dom';
import WeatherContainer from './WeatherContainer.js'

class AppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	componentDidMount(){
		setTimeout(() => {
			this.setState({
				loading: false
			});
		}, 2000);
	}

	render() {
		if(this.state.loading) {
			return (
				<div className='loading-screen'>
					<span style={{
						textAlign: 'center'
					}}>Loading...</span>
				</div>
			)
		} else {
			return (
				<div className='app-screen'>
					<h3> Weather App </h3>
					<WeatherContainer/>
				</div>
			);
		}

	}
}

export default withRouter(AppContainer);
