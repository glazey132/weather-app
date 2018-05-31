import React from 'react';
import { withRouter } from 'react-router-dom';

class WeatherContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentDidMount(){

	}

	render() {
		return (
			<table className='weather-container'>
				<tr className='table-row-one'>
					<td>weather image</td>
					<td>daily weather info</td>
				</tr>
				<tr className='table-row-two'>
					<td>Five day forecast</td>
				</tr>
			</table>
		);
	}
}

export default withRouter(WeatherContainer);
