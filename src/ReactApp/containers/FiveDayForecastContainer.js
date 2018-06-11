import React from 'react';
import { connect } from 'react-redux';

class FiveDayForecastContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { }

	}

	async displayFiveDayForecast() {
		try {
			const fiveDayData = await this.props.fiveDayData;
			console.log('the five day data ', fiveDayData);

			//parse data and get five objects to represent each day
			//insert into array and then set state. import fiveday component
			//and we'll map state in this component render.
			// this.setSate({
			// 	fiveDayData
			// })
		} catch (err) {
			console.log('frontend error in fivedayforecast container ', err);
		}
	}

	componentDidMount() {
		this.displayFiveDayForecast();
	}

	render() {
		return (
			<div className='five-day-container'>
				five day
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		fiveDayData: state.weatherReducer.fiveDayForecast
	}
};

export default connect(mapStateToProps, null)(FiveDayForecastContainer);
