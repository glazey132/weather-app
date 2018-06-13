import React from "react";
import WeatherAppContainer from "./containers/WeatherAppContainer.js";
import { connect } from "react-redux";
// import Button from 'material-ui/Button';

import {
  fetchGeolocationSuccess,
  fetchGeolocationFailure
} from "./actions/get_geolocation";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citySearch: ""
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      if (!position) {
        const err = "could not get position on mount ";
        this.props.onLocationFail(err);
      } else {
        this.props.onLocation(
          position.coords.latitude,
          position.coords.longitude
        );
        // this.getCityInfoByPosition(position);
      }
    });
  }

  render() {
    if (this.props.isLocationLoading) {
      return (
        <div className="location-loading-screen">
          <span
            style={{
              textAlign: "center"
            }}
          >
            <h3>Loading your location...</h3>
          </span>
        </div>
      );
    } else if (!this.props.isLocationLoading) {
      return (
        <div className="app-screen container-fluid">
          <h3> Weather App </h3>
          <span style={{ color: "red" }}>{this.props.error}</span>
          <WeatherAppContainer />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isLocationLoading: state.geoReducer.isLocationLoading,
    error: state.geoReducer.geoError || state.weatherReducer.weatherError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLocation: (lat, long) => dispatch(fetchGeolocationSuccess(lat, long)),
    onLocationFail: error => dispatch(fetchGeolocationFailure(error))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
