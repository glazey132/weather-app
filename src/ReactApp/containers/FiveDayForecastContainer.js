import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Forecast from "../components/Forecast.js";

class FiveDayForecastContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fiveDayData: null,
      loading: true
    };
  }

  async displayFiveDayForecast() {
    try {
      const fiveDayData = await this.props.fiveDayData;
      this.setState({
        fiveDayData: fiveDayData,
        loading: false
      });
    } catch (err) {
      console.log("frontend error in fivedayforecast container ", err);
    }
  }

  componentDidMount() {
    this.displayFiveDayForecast();
  }

  render() {
    if (!this.state.loading) {
      return (
        <div className="five-day-container">
          {this.state.fiveDayData.map((forecast, index) => (
            <Forecast
              key={index}
              className="forecast"
              imageDescription={forecast.weather[0]}
              hiTemp={forecast.hi}
              lowTemp={forecast.low}
            />
          ))}
        </div>
      );
    } else {
      return <div>loading...</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    fiveDayData: state.weatherReducer.fiveDayForecast
  };
};

FiveDayForecastContainer.propTypes = {
  fiveDayData: PropTypes.array
};

export default connect(
  mapStateToProps,
  null
)(FiveDayForecastContainer);
